import React, { useEffect, useState } from "react";
import EditIcon from "Icons/EditIcon";
import DeleteIcon from "Icons/DeleteIcon";
import AddNewCompany from "./AddNewCompany";
import axios from "axios";
import FormEditCompany from "./FormEditCompany";
import CompanyIcon from "Icons/CompanyIcon";
import { showSuccess } from "Components/ui/Toast";
function Page() {
  const [addNewCompany, setAddNewCompany] = useState(false);
  const [deleteCompany, setDeleteCompany] = useState(false);
  const [editCompany, setEditCompany] = useState({open: false, data: {}});
  const [allCompanies, setAllCompanies] = useState([]);
  const handleAddNewCompany = () => {
    setAddNewCompany(!addNewCompany);
  };
  useEffect(() => {
        const url = process.env.REACT_APP_API_URL;

    axios
      .get(`${url}/get-all-companies`)
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
        const url = process.env.REACT_APP_API_URL;

    axios.delete(`${url}/delete-company/${id}`)
    .then((res)=>{
      setDeleteCompany(true);
      showSuccess(res.data.message)
    })
    .catch((err)=>console.log(err))
    setDeleteCompany(false);
  }
  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-6 text-[#e2e5e5]">Lista de Compañías</h2>
        <button className='bg-[#176b81] px-4 h-fit py-3 font-bold rounded-lg flex text-[#e2e5e5] gap-2 hover:scale-105 hover:transition-transform' onClick={handleAddNewCompany} ><CompanyIcon/>Añadir nueva compañía</button>
      </div>
      {addNewCompany && <AddNewCompany viewModal={handleAddNewCompany}/>} 
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate">
          <thead className='text-[#2ec7bc] bg-[#0c161e] rounded-tl-3xl rounded-tr-3xl '>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl border-t-2 border-l-2 border-b-2 border-[#334155]">ID</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Nombre de Compañía</th>
              <th className="py-2 px-4 rounded-tr-3xl border-2 border-[#334155]">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-[#0c161e] text-[#e2e5e5]'>
            {allCompanies.map((element, index) =>
              <tr key={index}>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.id}</td>
                <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.name}</td>
                <td className="py-2 px-4 text-center flex justify-center border-x-2 border-b-2 border-[#334155]">
                  <button onClick={()=>handleEditCompany(element.id, element.name)} className="relative bg-[#1b3341] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#2ec7bc] after:origin-center after:transition-all after:duration-300
                  hover:after:left-0 hover:after:w-full">
                    <EditIcon />Editar
                  </button>
                  <button onClick={()=>handleDeleteCompany(element.id)} className="relative bg-[#1b3341] text-[#f52926] px-3 py-2 rounded flex items-center gap-2 hover:scale-105 transition-transform
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#f52926] after:origin-center after:transition-all after:duration-300
                  hover:after:left-0 hover:after:w-full">
                    <DeleteIcon />Eliminar
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