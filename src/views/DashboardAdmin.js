import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import UserIcon from '../Icons/UserIcon';
import ActoresIcon from '../Icons/ActorsIcon';
import CategoryIcon from '../Icons/CategoryIcon';
import CompanyIcon from '../Icons/CompanyIcon';
import StadisticIcons from '../Icons/StadisticIcons';
import MoviesIcon from '../Icons/MoviesIcon';

function DashboardAdmin() {
  const navigate = useNavigate();
  return (
      <div className='w-full min-h-screen relative bg-black'>
        <div className='flex'>
            <div className='float top-0 left-0 min-h-screen max-h-screen bg-gray-200 min-w-[350px] rounded-tr-[50px] rounded-br-[50px]'>
                <div className='h-[300px] grid place-items-center'>
                    <img src='/administradorImage.webp' className='mr-4 mt-10' width={300} height={300} alt='imagen del adminstrador'/>
                    <div className='w-full text-start ml-36 grid gap-10 text-xl font-medium mt-10'>
                        <div
                          className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'
                          onClick={() => navigate('/dashboard/usuarios')}
                        >
                          <UserIcon/> Usuarios
                        </div>
                    <div className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'><MoviesIcon/> Peliculas</div>
                        <div className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'><ActoresIcon/> Actores</div>
                        <div className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'><CategoryIcon/> Categorias</div>
                        <div className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'><CompanyIcon/> Productores</div>
                        <div className='w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white'><StadisticIcons/> Estadisticas</div>
                    </div>
                </div>
            </div>
            <div className='bg-black max-h-screen w-full overflow-auto'>
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DashboardAdmin