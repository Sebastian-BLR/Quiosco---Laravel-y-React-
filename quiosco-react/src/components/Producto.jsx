import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Producto({producto, botonAgregar = false, botonDisponible = false , mutate = null}) {

  const { handleClickModal , handleSetProducto, handleClickProductoAgotado} = useQuiosco();
  const {nombre, imagen, precio, id} = producto

  return (
    <div className="border flex flex-col p-3 shadow bg-white">
      <img 
        src={`/img/${imagen}.jpg`}
        alt={`imagen ${nombre}`} 
        className='w-full'
        loading="lazy"
      />

      <div className="p-1 flex flex-1 flex-col justify-between">
        
        <h3 className="text-xl font-bold mb-1">{nombre}</h3>
        <p className="mt-auto font-black text-4xl text-amber-500 ">{formatearDinero(precio)}</p>
        
        {botonAgregar && (
           <button 
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-2 p-3 uppercase font-bold"
            onClick={() => {
              handleSetProducto(producto);
              handleClickModal();
            }}
          >Agregar</button>)}
       
        {botonDisponible && (
           <button 
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-2 p-3 uppercase font-bold"
            onClick={ async () => { 
              handleClickProductoAgotado(id)
              await mutate()
             
            }}
          >Producto Agotado</button>)}
       

      </div>
    </div>

  
  )
}
