import React, { useEffect, useState } from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
import axios from 'axios';
import AddNewCategory from './AddNewCategory';
import FormEditCategory from './FormEditCategory';
import CategoryIcon from 'Icons/CategoryIcon';
import { showSuccess } from 'Components/ui/Toast';
function Page() {
  const [genre, setGenres] = useState([]);
  const [addGenre, SetAddGenre] = useState(false);
  const [editGenre, setEditGenre] = useState({open: false, data: {}});
  const [deleteGenre,setDeleteGenre] = useState(false);
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-all-genres`)
    .then((res)=>{
      console.log(res.data.message)
      setGenres(res.data.data)
    })
    .catch((error)=>console.log(error.message))
  },[addGenre, deleteGenre, editGenre.open])

  const handleViewModalAddGenre = () =>{
    SetAddGenre(!addGenre)
  }
  const handleEditGenre = (id, name) =>{
    setEditGenre({open:true, data:{id:id, name:name}})
  }
  const closeEdit = () =>{
    setEditGenre({open: false, data: {}})
  }
  const handleDeleteGenre = (id) =>{
    setDeleteGenre(!deleteGenre)
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete-genre/${id}`)
    .then((res)=>{
        showSuccess(res.data.message)
      })
    .catch((err)=>console.log(err))
    setDeleteGenre(!deleteGenre)
  }
  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-6 text-[#e2e5e5]">Lista de Categorías</h2>
        <button className='bg-[#176b81] px-4 h-fit py-3 font-bold rounded-lg flex text-[#e2e5e5] gap-2 hover:scale-105 hover:transition-transform' onClick={handleViewModalAddGenre} ><CategoryIcon/>Añadir nueva categoría</button>
      </div>
      {addGenre && <AddNewCategory viewModal={handleViewModalAddGenre}/>} 
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate">
          <thead className='text-[#2ec7bc] bg-[#0c161e] rounded-tl-3xl rounded-tr-3xl '>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl border-t-2 border-l-2 border-b-2 border-[#334155]">ID</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Nombre de Categoría</th>
              <th className="py-2 px-4 rounded-tr-3xl border-2 border-[#334155]">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-[#0c161e] text-[#e2e5e5]'>
            {genre.map((element, index)=>
              <tr key={index}>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.id}</td>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.name}</td>
                <td className="py-2 px-4 text-center flex justify-center border-x-2 border-b-2 border-[#334155]">
                  <button 
                  className="relative bg-[#1b3341] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#2ec7bc] after:origin-center after:transition-all after:duration-300
                  hover:after:left-0 hover:after:w-full"
                  onClick={()=>handleEditGenre(element.id,element.name)}><EditIcon/>Editar</button>
                  <button className="relative bg-[#1b3341] text-[#f52926] px-3 py-2 rounded flex items-center gap-2 hover:scale-105 transition-transform
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#f52926] after:origin-center after:transition-all after:duration-300
                  hover:after:left-0 hover:after:w-full" onClick={()=>handleDeleteGenre(element.id)}><DeleteIcon/>Eliminar</button>
                </td>
              </tr>)}
          </tbody>
        </table>
        {editGenre.open && <FormEditCategory data={editGenre.data} onClose={closeEdit}/>}
      </div>
    </div>
  )
}

export default Page