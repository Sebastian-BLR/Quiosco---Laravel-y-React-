import { useEffect } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios"

export const useAuth = ({middleware, url}) => {
    
    let token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    
    const {data: user, error, isLoading, mutate} = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    
    
    const login = async (datos, setErrores) => {
        
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            token = localStorage.getItem('AUTH_TOKEN')
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
            setTimeout(() => setErrores([]), 7000)

        }

    }


    const registro = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            token = localStorage.getItem('AUTH_TOKEN')
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
            setTimeout(() => setErrores([]), 7000)

        }
    }


    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }


    useEffect(() => {

        if(middleware === 'guest'  && url && user){
            navigate(url)
        }
        if(middleware === 'guest'  && user && user.admin){
            navigate('/admin')
        }
        if(middleware === 'admin'  && user && !user.admin){
            navigate('/')
        }

        if(middleware === 'auth' && error){
            navigate('/auth/login')
        
        }

    },[user, error, localStorage.length ])



    // console.log(user)
    // console.log(error)
    // console.log(middleware)
    // console.log(url)
    return {
        login,
        registro,
        logout,
        user,
        error
    }

}