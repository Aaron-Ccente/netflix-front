import React, { useEffect, useState } from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
import MoviesIcon from 'Icons/MoviesIcon';
import AddNewMovie from './AddNewMovie';
import axios from 'axios';
import FormEditMovie from './FormEditMovie';
import { showSuccess } from 'Components/ui/Toast';
function Page() {
  const inputStyle = `relative bg-[#1b3341] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                      after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:origin-center after:transition-all after:duration-300
                      hover:after:left-0 hover:after:w-full`;
  const [modalAddNewMovie, setModalNewMovie] = useState({open: false, update: false});
  const [modalEditMovie, setModalEditMovie] = useState({open: false, update: false});
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [dataMovies, setDataMovie] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8081/get-all-movies")
    .then((res)=>{
      setDataMovie(res.data)
    })
    .catch((err)=>console.log(err))
  },[modalAddNewMovie.update, modalEditMovie.update, deleteMovie])

  const handleNewMovie = (view, update) =>{
    if(view === true && update === false){
      setModalNewMovie({open: true, update: false})
    }
    else if(view === false && update === true){
      setModalNewMovie({open: false, update: true})
    }
    else{
      setModalNewMovie({open:false, update: false})
    }
  }
  const handleEditMovie = (view, update) =>{
    if(view === true && update === false){
      setModalEditMovie({open: true, update: false})
    }
    else if(view === false && update === true){
      setModalEditMovie({open: false, update: true})
    }
    else{
      setModalEditMovie({open:false, update: false})
    }
  }
  const handleDeleteMovie = (id) =>{
    axios.delete(`http://localhost:8081/delete-movie/${id}`)
    .then((res)=>{
      showSuccess(res.data.message)
      setDeleteMovie(true)
    }).catch((err)=>console.log(err))
    setDeleteMovie(false)
  }
  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-6 text-[#e2e5e5]">Lista de peliculas</h2>
        <button 
          onClick={()=>handleNewMovie(true, false)}
          className='bg-[#176b81] px-4 h-fit py-3 font-bold rounded-lg flex text-[#e2e5e5] gap-2 hover:scale-105 hover:transition-transform' ><MoviesIcon/>Añadir nueva pelicula</button>
      </div>
      {modalAddNewMovie.open && <AddNewMovie open = {handleNewMovie}/>}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate">
          <thead className='text-[#2ec7bc] bg-[#0c161e] rounded-tl-3xl rounded-tr-3xl '>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl border-t-2 border-l-2 border-b-2 border-[#334155]">ID</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Título</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Descripción</th>
              <th className="py-2 px-4 rounded-tr-3xl border-2 border-[#334155]">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-[#0c161e] text-[#e2e5e5]'>
            {dataMovies.map((movie, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{movie.id}</td>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{movie.title}</td>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{movie.description}</td>
                <td className="py-2 px-4 text-center border-x-2 border-b-2 border-[#334155]">
                  <div className='flex gap-4'>
                  <button className={`${inputStyle} text-[#e2e5e5] after:bg-[#2ec7bc]`}
                    onClick={() => {
                      setModalEditMovie({open: true, update: false, movie: movie});
                    }}
                  >
                    <EditIcon />
                    Editar
                  </button>
                  <button 
                  onClick={()=>handleDeleteMovie(movie.id)}
                  className={`${inputStyle} text-[#f52926] after:bg-[#f52926]`}>
                    <DeleteIcon />
                    Eliminar
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalEditMovie.open && <FormEditMovie open={handleEditMovie} data={modalEditMovie.movie}/>} 
    </div>
  )
}
export default Page