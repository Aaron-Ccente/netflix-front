import axios from "axios";
import PasswordSegurity from "Components/SignUpComponents/PasswordSegurity";
import { validation } from "Components/SignUpComponents/SignupValidation";
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
        if(res.status === 200) alert('Usuario actualizado correctamente');
        onClose()
      })
      .catch(err=>console.log(err))
      if (onClose) onClose();
    }
  };

  if (!viewModal) return null;

  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 shadow-xl shadow-white border-4 border-white py-10 px-8 rounded-lg w-fit text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p className="text-2xl font-bold text-red-700 pb-4 text-center">
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
            className=" px-4 py-2 text-black rounded-lg w-[350px] focus:outline-none focus:border-4 focus:border-red-900"
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
            className=" px-4 py-2 rounded-lg w-[350px] text-black focus:outline-none focus:border-4 focus:border-red-900"
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
            className=" px-4 py-2 rounded-lg w-[350px] text-black focus:outline-none focus:border-4 focus:border-red-900"
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
            className=" px-4 py-2 rounded-lg w-[350px] text-black focus:outline-none focus:border-4 focus:border-red-900"
          />
        </div>
        <div className="flex justify-center gap-6 pt-4">
          <button
            type="submit"
            className="border-2 border-red-900 px-4 py-1 font-bold rounded-lg hover:bg-white hover:text-red-900"
          >
            Actualizar
          </button>
          <button
            onClick={onClose}
            type="button"
            className="border-2 border-white/40 px-4 py-1 bg-red-900 font-bold rounded-lg hover:bg-white hover:text-red-900"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormEditUser;
