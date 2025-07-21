import ActosIconBig from 'Icons/ActosIconBig';
import CategoryIconBig from 'Icons/CategoryIconBig';
import CompanyIconBig from 'Icons/CompanyIconBig';
import MoviesIconBid from 'Icons/MoviesIconBid';
import NextIcon from 'Icons/NextIcon';
import StadisticIconBig from 'Icons/StadisticIconBig';
import UserIconBig from 'Icons/UserIconBig';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

function Page() {
  const bgStyle = `bg-[#0c161e] border-2 border-[#334155] hover:border-2 hover:border-[#2ec7bc] rounded-lg py-4 px-2 transition-colors hover:scale-105 hover:cursor-pointer`;
  const bgStyleInto = `grid grid-cols-3 place-items-center font-bold`
  const navigate = useNavigate();
  const handleChangeView = (pathroute) => {
    navigate(`/dashboard/${pathroute}`)
  }

  return (
    <div className='h-4/5 grid place-items-center text-xl'>
    <div className='grid grid-cols-3 w-9/12 gap-6'>
      <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`${bgStyle} hover:scale-110`} onClick={()=>handleChangeView('usuarios')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Usuarios</p>
          <UserIconBig/>
        </div>
        <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Administrar usuarios</p>
            <p>Ver, Crear, Actualizar y Eliminar</p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('usuarios')}><p>Usuarios</p><NextIcon/></button>
        </div>
      </motion.div>
     <motion.div 
     initial= {{ y: -100, opacity: 0}}
     animate = {{ y:0, opacity:1}}
     transition={{ duration: 1, delay:0.2}}
     className={`${bgStyle}`} onClick={()=>handleChangeView('peliculas')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Peliculas</p>
          <MoviesIconBid/>
        </div>
         <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Administrar peliculas</p>
            <p>Ver, Crear, Actualizar y Eliminar</p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('peliculas')}><p>Peliculas</p><NextIcon/></button>
        </div>
      </motion.div>
    <motion.div 
    initial = {{x:100, opacity: 0}}
    animate = {{x:0, opacity: 1}}
    transition={{duration: 1, delay: 0.4}}
    className={`${bgStyle}`} onClick={()=>handleChangeView('actores')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Actores</p>
          <ActosIconBig/>
        </div>
         <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Administrar actores</p>
            <p>Ver, Crear, Actualizar y Eliminar</p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('actores')}><p>Actores</p><NextIcon/></button>
        </div>
      </motion.div>
   <motion.div 
   initial = {{x:-100, opacity: 0}}
   animate= {{x:0, opacity:1}}
   transition={{duration: 1, delay:0.6}}
   className={`${bgStyle}`} onClick={()=>handleChangeView('categorias')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Categorias</p>
          <CategoryIconBig/>
        </div>
         <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Administrar categorias</p>
            <p>Ver, Crear, Actualizar y Eliminar</p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('categorias')}><p>Categorias</p><NextIcon/></button>
        </div>
      </motion.div>
    <motion.div 
    initial= {{y:100, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration:1, delay:0.8}}
    className={`${bgStyle}`} onClick={()=>handleChangeView('productores')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Productores</p>
          <CompanyIconBig/>
        </div>
         <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Administrar productores</p>
            <p>Ver, Crear, Actualizar y Eliminar</p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('productores')}><p>Productores</p><NextIcon/></button>
        </div>
      </motion.div>
    <motion.div 
    initial={{x:100, opacity:0}}
    animate={{x:0, opacity:1}}
    transition={{duration:1, delay:1}}
    className={`${bgStyle}`} onClick={()=>handleChangeView('estadisticas')}>
        <div className={`${bgStyleInto}`}>
          <p></p>
          <p>Estadistica</p>
          <StadisticIconBig/>
        </div>
         <div className='flex justify-between items-end px-4 py-2 text-lg gap-2'>
          <div>
            <p>Observa las estadisticas</p>
            <p>con gráficos modernos<p className='text-[#0c161e]'>a</p></p>
          </div>
          <button className='bg-[#2ec7bc] border-2 border-[#334155] px-2 h-fit py-1 rounded-lg text-lg flex items-center' onClick={()=>handleChangeView('estadisticas')}><p>Estadisticas</p><NextIcon/></button>
        </div>
      </motion.div>
    </div>
    </div>
  )
}

export default Page