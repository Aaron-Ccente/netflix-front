import axios from 'axios';
import PasswordSegurity from 'Components/SignUpComponents/PasswordSegurity';
import { validation } from 'Components/SignUpComponents/SignupValidation';
import React, { useState } from 'react'

function AddNewUser({ viewModal }) {
    const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "usuario",
    phone: 0
  });

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors('')
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const validationErrors = validation(values);
        setErrors(validationErrors);
    
        if (
          !validationErrors.name &&
          !validationErrors.email &&
          !validationErrors.password
        ){
            axios.post("http://localhost:8081/signup",values)
            .then((res)=>{
                if(res.status === 200){
                    alert('Usuario creado correctamente')
                    viewModal()
                }
            })
            .catch((err) => console.log(err))
        }
  }
  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        
        <form action="" onSubmit={handleSubmit} className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className='text-2xl font-bold pb-4 px-20 text-[#2ec7bc]'>Crear nuevo usuario</p>
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
              className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
            />
            {errors.name && <span className="text-red-600">{errors.name}</span>}
          </div>
          <div className="mb-3 flex flex-col gap-4">
            <label htmlFor="email">
              <strong>Correo electrónico</strong>
            </label>
            <input
              type="email"
              placeholder="Ejemplo: aronccente@gmail.com"
              name="email"
              id="email"
              onChange={handleInput}
              className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
          </div>
          <div className="mb-3 flex flex-col gap-4">
            <label htmlFor="password">
              <strong>Contraseña</strong>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              id="password"
              onChange={handleInput}
              className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
            />
            <PasswordSegurity password={values.password}/>
            {errors.password && (
              <span className="text-red-600">{errors.password}</span>
            )}
          </div>
          <div className="mb-3 flex flex-col gap-4">
            <label htmlFor="phone">
              <strong>Número de celular</strong>
            </label>
            <input
              type="number"
              placeholder="900000000"
              name="phone"
              id="phone"
              onChange={handleInput}
              min={900000000}
              max={999999999}
              className="p-2 border-2 border-[#334155] bg-[#0c161e] focus:border-[#2ec7bc] focus:outline-none rounded"
            />
            
          </div>
          <div className="flex justify-center gap-4 pb-4">
            <label>
              <input
                type="radio"
                name="role"
                value="usuario"
                checked={values.role === "usuario"}
                onChange={handleInput}
              />
              usuario
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="administrador"
                checked={values.role === "administrador"}
                onChange={handleInput}
              />
              administrador
            </label>
          </div>  
          <div className="flex items-center justify-center gap-4">
            <button
            type="button"
            onClick={viewModal}
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
            <strong>Crear Cuenta</strong>
            </button>     
          </div>
        </form>
    </div>
  )
}

export default AddNewUser