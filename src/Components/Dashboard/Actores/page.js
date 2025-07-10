import React from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
function page() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full  text-black border-separate border-spacing-y-4">
          <thead className='shadow-md shadow-red-600 bg-white rounded-tl-3xl rounded-tr-3xl'>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl">ID</th>
              <th className="py-2 px-4 ">Nombre</th>
              <th className="py-2 px-4 ">Biografía</th>
              <th className="py-2 px-4 rounded-tr-3xl">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            <tr className="border-b border-gray-300">
              <td className="py-2 px-4 text-center">1</td>
              <td className="py-2 px-4 text-center">Juan Pérez</td>
              <td className="py-2 px-4 text-center">juanperez@gmail.com</td>
              <td className="py-2 px-4 text-center flex justify-center">
                <button className="bg-blue-600 text-white px-3 py-1 w-fit rounded mr-2 flex"><EditIcon/>Editar</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded flex"><DeleteIcon/>Eliminar</button>
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-2 px-4 text-center">1</td>
              <td className="py-2 px-4 text-center">Juan Pérez</td>
              <td className="py-2 px-4 text-center">juanperez@gmail.com</td>
              <td className="py-2 px-4 text-center flex justify-center">
                <button className="bg-blue-600 text-white px-3 py-1 w-fit rounded mr-2 flex"><EditIcon/>Editar</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded flex"><DeleteIcon/>Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page