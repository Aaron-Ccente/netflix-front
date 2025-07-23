import React, { useEffect, useState } from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
import axios from 'axios';
import FormEditUser from './FormEditUser';
import AddNewUser from './AddNewUser';
import AddIcon from 'Icons/AddIcon';
import { showSuccess } from 'Components/ui/Toast';
function Page() {
  const [users, setUsers] = useState([]);
  const [modalEdit, setModalEdit] = useState({
    info: null,
    view: false
  });
  const [addUser,setAddUser] = useState(false);
  useEffect(() => {
        const url = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/all-users`);
        setUsers(res.data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchData();
  }, [addUser,modalEdit]);

  const handleDeleteUser = async (id) =>{
        const url = process.env.REACT_APP_API_URL;

    await axios.delete(`${url}/delete-user/${id}`)
    try {
        const res = await axios.get(`${url}/all-users`);
        setUsers(res.data)
        showSuccess('Usuario eliminado correctamente')
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
  }
  const openModalWithUser = (id) =>{
    const user = users.find((element)=>element.id === id);
    setModalEdit({
      info: user,
      view:true
    })
  }
  const closeModal = () => {
    setModalEdit({ info: null, view: false });
  }
  const handleAddNewUser = () =>{
    setAddUser(!addUser)
  }

  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-6 text-[#e2e5e5]">Lista de Usuarios</h2>
        <button className='bg-[#176b81] px-4 h-fit py-3 font-bold rounded-lg flex text-[#e2e5e5] gap-2 hover:scale-105 hover:transition-transform ' onClick={handleAddNewUser} ><AddIcon/>Añadir nuevo usuario</button>
      </div>
      {addUser && <AddNewUser viewModal={handleAddNewUser}/>}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate">
          <thead className='text-[#2ec7bc] bg-[#0c161e] rounded-tl-3xl rounded-tr-3xl '>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl border-t-2 border-l-2 border-b-2 border-[#334155]">ID</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Nombre</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Correo</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Celular</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Rol</th>
              <th className="py-2 px-4 rounded-tr-3xl border-2 border-[#334155]">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-[#0c161e] text-[#e2e5e5]'>
            {users.length>0 && 
            users.map((element,index)=>
            <tr key={index}>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.id}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.name}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.email}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.phone}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.role}</td>
              <td className="py-2 px-4 text-center flex justify-center border-x-2 border-b-2 border-[#334155]">
                <button 
                className="relative bg-[#1b3341] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#2ec7bc] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                onClick={()=>openModalWithUser(element.id)}><EditIcon/>Editar</button>
                <button className="relative bg-[#1b3341] text-[#f52926] px-3 py-2 rounded flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#f52926] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full" onClick={()=>handleDeleteUser(element.id)}><DeleteIcon/>Eliminar</button>
              </td>
            </tr>)
            }       
          </tbody>
        </table>
        {modalEdit.view && <FormEditUser data={modalEdit.info} viewModal={modalEdit.view} onClose={closeModal}/>} 
      </div>
    </div>
  )
}

export default Page