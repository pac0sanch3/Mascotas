import React, { useState, useEffect } from "react";
import axiosCliente from "./api/Axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ListarMascotas = () => {
  const navegacion = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");

  useEffect(() => {
    getMascotas();
  }, []);

  // Obtener todos los registros de la base de datos
  const getMascotas = async () => {
    try {
      const response = await axiosCliente.get("/mascotas/listar");
      // Captura los registros de la base de datos
      setMascotas(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMensaje("No se encontraron mascotas");
      }
      if (error.response.status === 401 || error.response.status === 403) {
        navegacion("/");
      }
    }
  };

  // Mandar solicitud a back-end para eliminar una mascota
  const eliminarMascota = async (id) => {
    try {
      const response = await axiosCliente.delete(`/mascotas/eliminar/${id}`);
      alert(response.data.mensaje);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {" "}
      <div className="min-h-full h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-auto">
          <div className="flex content-center justify-center pt-6">
            <Link to="/añadir">
              <button className="">
                <img src="btn-add.svg" alt="" />
              </button>
            </Link>
          </div>

          <main>
            <div className="mx-auto  mt-6">
              <ul className=" flex flex-col gap-x-8 gap-y-4 ">
                {mascotas.map((mascota) => (
                  <li className="bg-gray-400  rounded-2xl" key={mascota._id}>
                    <div className="flex flex-row w-full items-center gap-x-3">
                      <div className="flex h-20 w-1/5  items-center justify-center content-center">
                        <img
                          src={`http://localhost:3000/imagenes/${mascota.foto}`}
                          className="h-14 w-16 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="flex  flex-col justify-center h-20 w-2/5 pl-1 ">
                        <span>{mascota.name}</span>
                        <span>{mascota.raza_id.name}</span>
                      </div>
                      <div className="flex   justify-center content-center h-20 w-1/4 gap-x-2">
                        {" "}
                        <figure className="flex justify-center items-center">
                          <Link to={`/detalle/${mascota._id}`}>
                            <img
                              src="btn-show.svg"
                              className="cursor-pointer"
                              alt="btn-show"
                            />
                          </Link>
                        </figure>
                        <figure className="flex justify-center items-center">
                          <Link to={`/editar/${mascota._id}`}>
                            <img
                              src="btn-edit.svg"
                              className="cursor-pointer"
                              alt="btn-edit"
                            />
                          </Link>
                        </figure>
                        <button>
                          <figure className="flex justify-center items-center">
                            <img
                              src="btn-delete.svg"
                              className="cursor-pointer"
                              alt="btn-delete"
                              onClick={() => eliminarMascota(mascota._id)}
                            />
                          </figure>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}

                {errorMensaje && (
                  <li className="flex content-center items-center bg-gray-400 lg:w-full rounded-s-md  h-20 max-md:w-5/6">
                    {errorMensaje && <p>{errorMensaje}</p>}
                  </li>
                )}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ListarMascotas;
