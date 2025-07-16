import React, { useEffect, useState } from 'react'
import EditIcon from 'Icons/EditIcon';
import DeleteIcon from 'Icons/DeleteIcon';
import AddNewActor from './AddNewActor';
import ActorsIcon from 'Icons/ActorsIcon';
import axios from 'axios';
function Page() {
  const [addActor, setAddActor] = useState({view: false, update: false});
  const [actors, setActors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/get-all-actors")
    .then((res)=>{
      setActors(res.data.data);
      console.log(res.data.message);
    }
    ).catch((err)=>{
      console.error("Error fetching actors:", err);
    });
  }, [addActor.update]);

  const handleAddActor = (view, update) =>{
    if(view===false && update === true){
    setAddActor({view: false, update: true});}
    else if(view === true && update === false){
      setAddActor({view: true, update: false})
    }
    else{
      setAddActor({view: false, update: false});}
    }
  const formateDate = (dateString) => {
    const [y, m, d] = dateString.split("-");
    return `${y}-${m}-${d.slice(0,2)}`;
  }
  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-6 text-[#e2e5e5]">Lista de Actores</h2>
        <button className='bg-[#176b81] px-4 h-fit py-3 font-bold rounded-lg flex text-[#e2e5e5] gap-2 hover:scale-105 hover:transition-transform' onClick={()=>handleAddActor(true, false)} ><ActorsIcon/>Añadir nuevo actor</button>
      </div>
      {addActor.view && <AddNewActor viewModal={handleAddActor}/>} 
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate">
          <thead className='text-[#2ec7bc] bg-[#0c161e] rounded-tl-3xl rounded-tr-3xl '>
            <tr>
              <th className="py-2 px-4 rounded-tl-3xl border-t-2 border-l-2 border-b-2 border-[#334155]">ID</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Nombre</th>
              <th className="py-2 px-4 border-t-2 border-l-2 border-b-2 border-[#334155]">Fecha de nacimiento</th>
              <th className="py-2 px-4 rounded-tr-3xl border-2 border-[#334155]">Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-[#0c161e] text-[#e2e5e5]'>
            {actors.map((element, index)=>
            <tr key={index}>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.id}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{element.name}</td>
              <td className="py-2 px-4 text-center border-l-2 border-b-2 border-[#334155]">{formateDate(element.date_of_birth)}</td>
              <td className="py-2 px-4 text-center flex justify-center border-x-2 border-b-2 border-[#334155]">
                <button 
                className="relative bg-[#1b3341] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#2ec7bc] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                ><EditIcon/>Editar</button>
                <button className="relative bg-[#1b3341] text-[#f52926] px-3 py-2 rounded flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#f52926] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                ><DeleteIcon/>Eliminar</button>
              </td>
            </tr>)}     
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page