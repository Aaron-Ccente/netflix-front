import React, { useEffect, useState } from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
import axios from 'axios';
function Page() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8081/all-users');
        setUsers(res.data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchData();
  }, [users]);

  const handleDeleteUser = async (id) =>{
    axios.delete(`http://127.0.0.1:8081/delete-user/${id}`)
    try {
        const res = await axios.get('http://127.0.0.1:8081/all-users');
        setUsers(res.data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full  text-black border-separate border-spacing-y-4">
          <thead className='shadow-md shadow-red-600 bg-white rounded-tl-3xl rounded-tr-3xl'>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl">ID</th>
              <th className="py-2 px-4 ">Nombre</th>
              <th className="py-2 px-4 ">Correo</th>
              <th className="py-2 px-4 ">Celular</th>
              <th className="py-2 px-4 ">Rol</th>
              <th className="py-2 px-4 rounded-tr-3xl">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {users.length>0 && 
            users.map((element)=><tr className="border-b border-gray-300">
              <td className="py-2 px-4 text-center">{element.id}</td>
              <td className="py-2 px-4 text-center">{element.name}</td>
              <td className="py-2 px-4 text-center">{element.email}</td>
              <td className="py-2 px-4 text-center">{element.phone}</td>
              <td className="py-2 px-4 text-center">{element.role}</td>
              <td className="py-2 px-4 text-center flex justify-center">
                <button className="bg-blue-600 text-white px-3 py-1 w-fit rounded mr-2 flex"><EditIcon/>Editar</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded flex" onClick={()=>handleDeleteUser(element.id)}><DeleteIcon/>Eliminar</button>
              </td>
            </tr>)
            }       
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page