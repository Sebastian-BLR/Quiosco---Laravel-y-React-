import { createContext, useState , useEffect} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => ( producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
           
            const {data} = await clienteAxios('/api/categorias',  {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() =>{
        obtenerCategorias()
    }, [])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }
    
    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) =>{
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Pedido Actualizado')
          }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
          }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter( producto => id === producto.id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleElimiarProductoPedido = id =>{
        const productoActualizar = pedido.filter( producto => id !== producto.id)
        setPedido(productoActualizar)
        toast.success('Producto Eliminado')
    }
    
    const handleSubmitNuevaOrden = async (logout) =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos',
            {
                total,
                productos : pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message)
            setTimeout(() => setPedido([]), 500)

            // Cerrar la sesion del usuario
            setTimeout(() => logout(), 5000)

        } catch (error) {
            console.error(error)
        }
    }

    const handleClickCompletarPedido = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success('Pedido Completado')
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success('Quitado de la lista')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider 
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            modal,
            handleClickModal,
            producto,
            handleSetProducto,
            pedido,
            handleAgregarPedido,
            handleEditarCantidad,
            handleElimiarProductoPedido,
            total,
            handleSubmitNuevaOrden,
            handleClickCompletarPedido,
            handleClickProductoAgotado,
        }}
        >{children}</QuioscoContext.Provider>
    )
}

export {QuioscoProvider}
export default QuioscoContext