import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import UserIcon from '../Icons/UserIcon';
import ActoresIcon from '../Icons/ActorsIcon';
import CategoryIcon from '../Icons/CategoryIcon';
import CompanyIcon from '../Icons/CompanyIcon';
import StadisticIcons from '../Icons/StadisticIcons';
import MoviesIcon from '../Icons/MoviesIcon';
import { useAuth } from '../context/AuthContext';

function DashboardAdmin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // Determina la ruta activa
    const active = (path) => location.pathname.startsWith(path);

    return (
      <div className='w-full min-h-screen relative bg-black'>
        <div className='flex'>
            <div className='float top-0 left-0 min-h-screen max-h-screen bg-gray-200 min-w-[350px] rounded-tr-[50px] rounded-br-[50px]'>
                <div className='h-[300px] grid place-items-center'>
                    <img src='/administradorImage.webp' className='mr-4 mt-10 cursor-pointer' width={300} height={300} alt='imagen del adminstrador'
                    onClick={() => navigate('/dashboard/inicio')}/>
                    <div className='w-full text-start ml-36 grid gap-10 text-xl font-medium mt-10'>
                        <button
                          className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/usuarios') ? 'bg-black text-white' : ''}`}
                          onClick={() => navigate('/dashboard/usuarios')}
                        >
                          <UserIcon/> Usuarios
                        </button>
                        <button className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/peliculas') ? 'bg-black text-white' : ''}`} onClick={() => navigate('/dashboard/peliculas')}><MoviesIcon/> Peliculas</button>
                        <button className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/actores') ? 'bg-black text-white' : ''}`} onClick={() => navigate('/dashboard/actores')}><ActoresIcon/> Actores</button>
                        <button className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/categorias') ? 'bg-black text-white' : ''}`} onClick={() => navigate('/dashboard/categorias')}><CategoryIcon/> Categorias</button>
                        <button className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/productores') ? 'bg-black text-white' : ''}`} onClick={() => navigate('/dashboard/productores')}><CompanyIcon/> Productores</button>
                        <button className={`w-[200px] px-6 py-2 flex gap-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white ${active('/dashboard/estadisticas') ? 'bg-black text-white' : ''}`} onClick={() => navigate('/dashboard/estadisticas')}><StadisticIcons/> Estadisticas</button>
                    </div>
                </div>
            </div>
            <div className='bg-black max-h-screen w-full overflow-auto text-white'>
                <header className='w-full text-white text-lg flex justify-end gap-6 pt-10 px-10'>
                    <div className=''>Bienvenido, {user.name} </div>
                    <button onClick={logout} className='bg-red-600 px-10 py-1 rounded-lg'>Salir</button>
                </header>
                <Outlet />
            </div>
        </div>
    </div>
  );
}

export default DashboardAdmin;