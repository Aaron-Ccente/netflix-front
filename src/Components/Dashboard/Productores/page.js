import React, { useEffect, useState } from "react";
import EditIcon from "Icons/EditIcon";
import DeleteIcon from "Icons/DeleteIcon";
import AddIcon from "Icons/AddIcon";
import AddNewCompany from "./AddNewCompany";
import axios from "axios";
import FormEditCompany from "./FormEditCompany";
function Page() {
  const [addNewCompany, setAddNewCompany] = useState(false);
  const [deleteCompany, setDeleteCompany] = useState(false);
  const [editCompany, setEditCompany] = useState({open: false, data: {}});
  const [allCompanies, setAllCompanies] = useState([]);
  const handleAddNewCompany = () => {
    setAddNewCompany(!addNewCompany);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/get-all-companies")
      .then((res) => {
        if (res.status === 200) {
          setAllCompanies(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [addNewCompany, editCompany.open, deleteCompany]);
  const handleEditCompany = ( id, name) =>{
    setEditCompany({open:true, data: {id: id, name: name}})
  }
  const closeEdit = () =>{
    setEditCompany({open: false, data: {}})
  }
  const handleDeleteCompany = (id) =>{
    axios.delete(`http://localhost:8081/delete-company/${id}`)
    .then((res)=>{
      setDeleteCompany(true);
      alert(res.data.message)
    })
    .catch((err)=>console.log(err))
    setDeleteCompany(false);
  }
  return (
    <div className="h-[calc(100vh-78px)] flex flex-col p-8">
    <div className="flex justify-between items-center mb-4 flex-shrink-0">
      <h2 className="text-2xl font-bold">Lista de compañias</h2>
      <button
        className="bg-white px-4 h-fit py-1 font-bold rounded-lg flex text-black gap-2"
        onClick={handleAddNewCompany}
      >
        <AddIcon />
        Añadir nueva compañia
      </button>
    </div>

    {addNewCompany && (<AddNewCompany viewModal={handleAddNewCompany} />)}

    <div className="overflow-x-auto pr-4 scroll-red rounded-b-3xl">
      <table className="min-w-full text-black border-separate border-spacing-y-4">
          <thead className="shadow-md shadow-red-600 bg-white">
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl">ID</th>
              <th className="py-2 px-4 ">Nombre de compañia</th>
              <th className="py-2 px-4 rounded-tr-3xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allCompanies.map((element, index) =>
              <tr className="border-b border-gray-300" key={index}>
                <td className="py-2 px-4 text-center">{element.id}</td>
                <td className="py-2 px-4 text-center">{element.name}</td>
                <td className="py-2 px-4 text-center flex justify-center">
                  <button onClick={()=>handleEditCompany(element.id, element.name)} className="bg-blue-600 text-white px-3 py-1 w-fit rounded mr-2 flex">
                    <EditIcon />
                    Editar
                  </button>
                  <button 
                  onClick={()=>handleDeleteCompany(element.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded flex">
                    <DeleteIcon />
                    Eliminar
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {editCompany.open && <FormEditCompany data={editCompany.data} onClose={closeEdit}/>}
      </div>
    </div>
  );
}
export default Page;