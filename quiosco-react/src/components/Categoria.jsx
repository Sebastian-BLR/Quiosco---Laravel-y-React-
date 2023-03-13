import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {
    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const {id , icono, nombre} = categoria
    const resaltarCategoriaActual = categoriaActual.id === id ? "bg-amber-300" : '';
    
    return (
    <button className={`${resaltarCategoriaActual} 
                        flex items-center gap-4 border border-b-0 last:border-b
                        w-full p-3 hover:bg-amber-400 cursor-pointer`}
            type="button"
            onClick={() => handleClickCategoria(id)}>
        
        <img src={`/img/icono_${icono}.svg`}
             alt={`Imagen icono ${icono}`}
             className="w-12" 
        />

        <p className="text-lg font-bold truncate">{nombre}</p>


    </button>
  )
}
