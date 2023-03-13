import Categoria from "./Categoria"
import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {
    const { categorias} = useQuiosco()
    const {logout, user} = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img 
            src="img/logo.svg" 
            alt="ìmagen logotipo"
            className="w-40" 
            />
        </div>

        <p className="text-xl text-center mt-2 font-bold bg-yellow-400  py-1">Hola <span className="text-gray-600">{user?.name}</span></p>

        <div className="mt-5">
            {categorias.map( categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </div>

        <div className="my-5 px-2">
            <button
                type="button"
                className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                onClick={() => logout()}
                >Cancelar Orden</button>
        </div>        

    </aside>
  )
}
