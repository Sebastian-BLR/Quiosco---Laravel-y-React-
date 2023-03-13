import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

export default function Ordenes() {

    const token = localStorage.getItem("AUTH_TOKEN")
    const fetcher = () => clienteAxios('/api/pedidos',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const {handleClickCompletarPedido} = useQuiosco()
    
    const {data, error, isLoading , mutate} = useSWR('/api/pedidos', fetcher, {refreshInterval:5000})
    if(isLoading) return 'Cargando...'
    const dataResult = data.data.data
       
  return (
    <div>
         <h1 className="text-4xl font-black">Ordenes</h1>
         <p className="text-2xl my-7">Administra tus ordenes desde aquí</p>
    
        <div className='grid gap-3 md:grid-cols-2'>
          {dataResult.map(pedido => (
            <div key={pedido.id} className="p-5 bg-white shadow space-y-2">
                <p className='text-xl font-bold text-slate-600'>
                  Contenido del Pedido: 
                </p>
                {pedido.productos.map(producto => (
                  <div 
                    key={producto.id}
                    className="border-b last:border-none border-slate-200 py-4">
                      
                      <p className='text-sm '>ID: {producto.id}</p>
                      <p>{producto.nombre}</p>
                      <p>Cantidad: <span className='font-bold'>{producto.pivot.cantidad}</span></p>


                    
                  </div>
                ))}

                <p className="text-lg font-bold text-slate-600">Cliente: <span className='font-normal'>{pedido.user.name}</span></p>
                <p className="text-lg font-bold text-amber-500">Total a Pagar: <span className='font-normal text-slate-600' >{formatearDinero(pedido.total)}</span></p>
                <button 
                  type="button"
                  className='
                           bg-indigo-600  hover:bg-indigo-700 cursor-pointer
                              rounded uppercase font-bold text-white
                              px-5 py-2 w-full text-center'
                  onClick={async () => {
                    handleClickCompletarPedido(pedido.id)
                    await mutate();

                  }}
                   
                >Completar</button>
            </div>
          ))}
        </div>
    </div>
  )
}
