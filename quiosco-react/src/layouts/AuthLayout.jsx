import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className='max-w-4xl mx-auto mt-5 md:mt-28 flex flex-col md:flex-row items-center '>
        <img src="../img/logo.svg" alt="imagen logotipo" className='max-w-xs mb-10 md:mb-0' />
        
        <div className='p-2 md:p-10 w-full'>
            <Outlet />
        </div>
    </main>
  )
}
