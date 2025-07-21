import axios from "axios";
import PasswordSegurity from "Components/SignUpComponents/PasswordSegurity";
import { validation } from "Components/SignUpComponents/SignupValidation";
import { showError, showSuccess } from "Components/ui/Toast";
import React, { useEffect, useState } from "react";

function FormEditUser({ data, viewModal, onClose }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "usuario",
    phone: 0
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (data) {
      setValues({
        name: data.name || "",
        email: data.email || "",
        password: "",
        role: data.role || "usuario",
        phone: data.phone || 0,
      });
    }
  }, [data]);

  const handleChangeInputs = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (
      !validationErrors.name &&
      !validationErrors.email &&
      !validationErrors.password
    ) {
      axios.put(`http://localhost:8081/update-user/${data.id}`,values)
      .then((res)=>{
        if(res.status === 200) showSuccess('Usuario actualizado correctamente');
        onClose()
      })
      .catch(err=>
      {
        const errorToast = err.response.data.err.sqlMessage;
        showError(errorToast)
      }
      )
      if (onClose) onClose();
    }
  };

  if (!viewModal) return null;

  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form
        onSubmit={handleSubmit}
       className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p className='text-2xl font-bold pb-4 px-20 text-[#2ec7bc]'>
          Actualizar usuario
        </p>
        <div className="flex flex-col py-2 gap-4">
          <label htmlFor="name">
            <strong>Nombre</strong>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChangeInputs}
            className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>
        <div className="flex flex-col py-2 gap-4">
          <label htmlFor="email">
            <strong>Correo electrónico</strong>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="aronccente@gmail.com"
            value={values.email}
            onChange={handleChangeInputs}
            className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col py-2 gap-4">
          <label htmlFor="password">
            <strong>Contraseña</strong>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="contraseña"
            value={values.password}
            onChange={handleChangeInputs}
            className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
          />
          <PasswordSegurity password={values.password}/>
          {errors.password && (
            <span className="text-red-600">{errors.password}</span>
          )}
        </div>
        <div className="flex flex-col py-2 gap-4">
          <label htmlFor="phone">
            <strong>Número de celular</strong>
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="959085189"
            value={values.phone}
            onChange={handleChangeInputs}
            min={900000000}
            max={999999999}
            className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
          />
        </div>
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={onClose}
            type="button"
            className="relative bg-[#f52926] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="relative bg-[#176b81] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormEditUser;
