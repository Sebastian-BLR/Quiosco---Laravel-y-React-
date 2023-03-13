import {createRef, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {
    
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const {registro} = useAuth({middleware: 'guest', url: '/'});

    const handleSubmit = async e => {
        e.preventDefault();
        
        const datos = {
            name                  : nameRef.current.value,
            email                 : emailRef.current.value,
            password              : passwordRef.current.value,
            password_confirmation : passwordConfirmationRef.current.value,
        }
       registro(datos, setErrores)
    }

    return (
    <>
        <h1 className="text-4xl font-black text-center">Crea tu Cuenta</h1>
        <p className="text-center">Crea tu cuenta llenando el formilario</p>
        <div className="bg-white shadow-xl rounded-md  md:mt-5 px-5 py-10">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="name"
                    >Nombre:</label>
                    <input 
                        type="text"
                        id="name"
                        className="mt-2 w-full p-3 bg-gray-100 rounded-md"
                        name="name"
                        placeholder="Tu Nombre"
                        ref={nameRef}
                        />
                </div>
                
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
                
                <div className="mb-4">
                    <label 
                        className="text-slate-800"
                        htmlFor="password_confirmation"
                    >Repetir Password:</label>
                    <input 
                        type="password"
                        id="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-100 rounded-md"
                        name="password_confirmation"
                        placeholder="Repetir Password"
                        ref={passwordConfirmationRef}
                        />
                </div>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : ''}
                <input 
                    type="submit"
                    value={'Crear Cuenta'}
                    className='bg-indigo-600 hover:bg-indigo-700  text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' 
                />

            </form>
        </div>

        <nav className="mt-5"> 
                <Link to="/auth/login"
                >¿Ya tienes cuenta?, Inicia sesión.</Link>
        </nav>
    </>
  )
}
