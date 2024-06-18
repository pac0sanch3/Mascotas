import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CrearAdmin = () => {
  //iniciamos la variable para crear el registro de admin
  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  //redirigir al login, cuando se cree un administrador
  const navigate = useNavigate();

  // libreria que permitira validar campos vacios
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const CrearAdmin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/usuario", admin);
      console.log(response);
      alert(response.data.mensaje);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handChange = (evento) => {
    setAdmin({
      ...admin,
      [evento.target.name]: evento.target.value,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="bg-hero-main bg-no-repeat max-md:w-2/3 max-lg:w-1/3	max-sm:w-96 sm:w-96">
          <div className="h-3/4">
            <img src="bg-login.svg" alt="" />
          </div>
          <div className="absolute bottom-0 p-5 w-96 h-64 z-10">
            <form
              onSubmit={handleSubmit(CrearAdmin)}
              className="flex flex-col gap-3"
            >
              <div className="">
                <input
                  type="text"
                  {...register("fullName", {
                    required: true,
                    value: admin.fullName,
                  })}
                  onChange={handChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nombre"
                />
                {errors.fullName?.type === "required" && (
                  <div>Nombre es requerido</div>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...register("email", { required: true, value: admin.email })}
                  onChange={handChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Correo"
                />
                {errors.email?.type === "required" && (
                  <div>Correo es requerido</div>
                )}
              </div>
              <div>
                <input
                  type="pasword"
                  {...register("password", {
                    required: true,
                    value: admin.password,
                  })}
                  onChange={handChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Contraseña"
                />
                {errors.password?.type === "required" && (
                  <div>Contraseña es requerida</div>
                )}
              </div>
              <input
                type="submit"
                value={"Registrar"}
                className="w-full  text-white bg-blue-950 hover:bg-blue-900  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              />
            </form>
            <Link to={"/"}>regresar</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearAdmin;
