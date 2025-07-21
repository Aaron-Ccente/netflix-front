import { Link, useNavigate } from "react-router-dom";
import { validation } from "../Components/SignUpComponents/SignupValidation";
import { useState } from "react";
import axios from "axios";
import imageBackground from '../imagenes/backgroundGrande.webp'
import NavInLoginAndRegister from "../Components/NavComponent/NavInLoginAndRegister";
import PasswordSegurity from "../Components/SignUpComponents/PasswordSegurity";
import { useAuth } from "../context/AuthContext";
function Signup() {
  const { login } = useAuth();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "usuario",
    phone: 0
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors('')
  };

  const handleSubmit = (event) => {
    console.log(values)
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (
      !validationErrors.name &&
      !validationErrors.email &&
      !validationErrors.password
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          if(res.statusText === "OK")
          {
            axios
            .post("http://localhost:8081/login", {email: values.email, password: values.password})
            .then((res) => {
              if (res.data.message === "Success") {
                login(res.data.user);
                if(res.data.user.role === "usuario"){         
              navigate("/home");
                  }
                  else if(res.data.user.role === "administrador"){
                    navigate("/dashboard/inicio");
                  }
              } else {
                alert("La cuenta no existe.");
              }
            })
            .catch((err) => console.log(err));
            navigate("/signup")
          }
          console.log(res)
          })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div 
    style={{ backgroundImage: `url(${imageBackground})` }}
    className="flex flex-col items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover relative">
      <NavInLoginAndRegister/>
    <div className="w-full h-screen absolute bg-black/50 "></div>
      <div className="bg-black/60 border-2 px-10 py-6 text-white  border-red-900 p-3 rounded-xl  z-20 shadow-xl shadow-red-900 max-w-[700px]">
        <h2 className="text-center font-bold text-2xl text-red-700 pb-4">Crear Cuenta</h2>
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col gap-4 ">
            <label htmlFor="name">
              <strong>Nombre</strong>
            </label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              onChange={handleInput}
              required
              name="name"
              id="name"
               className="p-2 border-2 border-gray-200 text-black  focus:border-red-900 focus:outline-none rounded"
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
              required
              onChange={handleInput}
              className="p-2 border-2 border-gray-200 text-black  focus:border-red-900 focus:outline-none rounded"
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
              required
              onChange={handleInput}
              className="p-2 border-2 border-gray-200 text-black  focus:border-red-900 focus:outline-none rounded"
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
              required
              onChange={handleInput}
              min={900000000}
              max={999999999}
              className="p-2 border-2 border-gray-200 text-black  focus:border-red-900 focus:outline-none rounded"
            />
            
          </div>
          <div className="flex justify-center gap-4">
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
                required
                value="administrador"
                checked={values.role === "administrador"}
                onChange={handleInput}
              />
              administrador
            </label>
          </div>
          <button
            type="submit"
             className="px-4 py-2 border-2 border-red-900 hover:bg-white hover:text-red-900 text-white rounded  m-auto"
          >
            <strong>Crear Cuenta</strong>
          </button>
          <div className="flex items-center justify-center gap-4">
            <p className="text-center">
            Si ya tienes una cuenta haz click en
          </p>
          <Link
            to="/"
            className="border-b-2 border-white hover:border-red-900"
          >
            Iniciar Sesión
          </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Signup;
