import axios from "axios";

const server = import.meta.env.VITE_API_URL

const clienteAxios = axios.create({
    baseURL:server,
    headers:{
        'Accept' : 'application/json',
        'X-Requested-Wit':'XMLHttpRequest'
    },
    withCredentials:true
})

export default clienteAxios