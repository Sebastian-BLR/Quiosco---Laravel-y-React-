import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
    useAuth({middleware:'admin'})

  return (
    <>    
        <div className='md:flex '>
            <AdminSidebar />
            
            <main className='flex-1 h-screen overflow-y-scroll bg-gray-50 p-4'> 
                <Outlet />
            </main>
        
        </div>

        <ToastContainer />
    
    </>
  )
}
