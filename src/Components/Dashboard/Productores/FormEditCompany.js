import axios from "axios";
import { showError, showSuccess } from "Components/ui/Toast";
import React, { useState } from "react";

function FormEditCompany({ data, onClose }) {
  const [values, setValues] = useState({
    name: data.name,
    id: data.id
  });

  const [errors, setErrors] = useState('');
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update-company", values)
      .then((res) => {
        if (res.status === 200) {
          showSuccess(res.data.message);
          onClose();
        }
      })
     .catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        const errorToast = err.response.data.error;
        showError(errorToast)
        setErrors(errorToast)
      } else {
        setErrors("Error inesperado: " + err.message);
      }
    });
  };

  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p className='text-2xl font-bold pb-4 px-20 text-[#2ec7bc]'>Editar compañía de producción</p>
        <div className="mb-3 flex flex-col gap-4 ">
          <label htmlFor="name">
            <strong>Nombre</strong>
          </label>
          <input
            type="text"
            placeholder="Ingrese el nombre de la compañia"
            onChange={handleInput}
            name="name"
            id="name"
            value={values.name}
            className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
          />
          {errors && <span className="text-red-600">{errors}</span>}
        </div>
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="relative bg-[#f52926] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
          >
            <strong>Cancelar</strong>
          </button>
          <button
            type="submit"
            className="relative bg-[#176b81] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
          >
            <strong>Actualizar compañía</strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormEditCompany