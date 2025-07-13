import axios from "axios";
import React, { useState } from "react";

function AddNewCompany({ viewModal }) {
  const [values, setValues] = useState({
    name: "",
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
      .post("http://localhost:8081/create-company", values)
      .then((res) => {
        if (res.status === 200) {
          alert("Compañia creado correctamente ", res.data.message, res.status);
          viewModal();
        }
        
      })
     .catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        setErrors(err.response.data.error)
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
        className="bg-black/80 shadow-xl shadow-white border-4 border-white py-10 px-8 rounded-lg w-fit text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p className="text-2xl font-bold pb-4 px-20 text-red-700">
          Crear nueva compalia de produccion
        </p>
        <div className="mb-3 flex flex-col gap-4 ">
          <label htmlFor="name">
            <strong>Nombre</strong>
          </label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            onChange={handleInput}
            name="name"
            id="name"
            className="p-2 border-2 border-gray-200 text-black  focus:border-red-900 focus:outline-none rounded"
          />
          {errors && <span className="text-red-600">{errors}</span>}
        </div>

        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={viewModal}
            className="px-4 py-2 border-2 border-white/40 bg-red-900 hover:bg-white hover:text-red-900 text-white rounded "
          >
            <strong>Cancelar</strong>
          </button>
          <button
            type="submit"
            className="px-4 py-2 border-2 border-red-900 hover:bg-white hover:text-red-900 text-white rounded"
          >
            <strong>Crear compañia</strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewCompany;
