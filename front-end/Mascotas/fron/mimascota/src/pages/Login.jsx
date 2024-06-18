import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [errores, setErrores] = useState("");

  // direccionar a la pagina principal
  const navegacion = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login/login", {
        email: correo,
        password: contrasenia,
      });
      alert(response.data.Mensaje);
      window.localStorage.setItem("token", response.data.token);
      console.log(response.data.Mensaje);
      navegacion("/home");
    } catch (error) {
      setErrores(error.response.data.mensaje);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="bg-hero-main bg-no-repeat max-md:w-2/3 max-lg:w-1/3	max-sm:w-96 sm:w-96">
          <div className="h-3/4">
            <img src="bg-login.svg" alt="" />
          </div>
          <div className="absolute bottom-0  w-96 h-64 z-10">
            <form
              onSubmit={handleSubmit(login)}
              action=""
              className="flex  flex-col gap-4 px-8 "
            >
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  {...register("correo", {
                    required: true,
                    value: correo,
                  })}
                  onChange={(e) => setCorreo(e.target.value)}
                  autoComplete="off"
                />
                {errors.correo?.type === "required" && (
                  <div className="text-red-600">correo es requerido</div>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  {...register("password", { required: true })}
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  autoComplete="off"
                />
                {errors.password?.type === "required" && (
                  <div className="text-red-600">Contraseña es requerida</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full  text-white bg-blue-950 hover:bg-blue-900  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Ingresar
              </button>
            </form>

            {errores && <div className="px-8 text-red-500">{errores}</div>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
