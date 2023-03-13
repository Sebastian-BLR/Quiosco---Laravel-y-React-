import  useSWR  from "swr"
import clienteAxios from "../config/axios"
import Producto from "../components/Producto"

export default function Productos() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const {data, error, isLoading, mutate} = useSWR('/api/productos', fetcher, {refreshInterval:10000})
  if(isLoading) return 'Cargando...'
  const productos =  data.data
  
  return (
    <div>
        <h1 className="text-4xl font-black">Productos</h1>
         <p className="text-2xl my-7">Maneja la disponibilidad desde aquí</p>

         <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {productos.map(producto => (
          <Producto 
            key={producto.id}
            producto={producto}
            botonDisponible={true}
            mutate={mutate}
          />
        ))}
      </div>

    </div>
  )
}
