import {createRef, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Login() {
    
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])
    
    const { login } = useAuth({
        middleware: 'guest',
        url:'/'
    })

    const handleSubmit = async e => {
        e.preventDefault();
        
        const datos = {
            email                 : emailRef.current.value,
            password              : passwordRef.current.value,
        }

        login(datos, setErrores);
       
    }

  return (
    <>
        <h1 className="text-4xl font-black text-center">Iniciar Sesión</h1>
        <p className="text-center">Para crear un pedido inica sesión</p>
        <div className="bg-white shadow-xl rounded-md  md:mt-5 px-5 py-10">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="email"
                    >Email:</label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-100 rounded-md"
                        name="email"
                        placeholder="Tu Email"
                        ref={emailRef}
                        />
                </div>

                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="password"
                    >Password:</label>
                    <input 
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-100 rounded-md"
                        name="password"
                        placeholder="Tu Password"
                        ref={passwordRef}
                        />
                </div>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : ''}
                <input 
                    type="submit"
                    value={'Iniciar Sesión'}
                    className='bg-indigo-600 hover:bg-indigo-700  text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' 
                />

            </form>
        </div>

        <nav className="mt-5"> 
                <Link to="/auth/registro"
                >¿No tienes cuenta?, Crea una.</Link>
        </nav>
    </>
  )
}
