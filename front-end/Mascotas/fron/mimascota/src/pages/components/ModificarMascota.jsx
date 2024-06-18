import React, { useState, useEffect } from "react";
import axiosCliente from "./api/Axios";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ModificarMascota = ({ id }) => {
  const navegacion = useNavigate();
  const [mascota, setMascota] = useState({});
  const [razas, setRazas] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [generos, setGenero] = useState([]);
  const [foto, setFoto] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);

  useEffect(() => {
    // funcion que permite traer el registro de la mascota que se quiere actualizar
    const mascotaId = async () => {
      try {
        const response = await axiosCliente.get(`/mascotas/listarID/${id}`);
        setMascota(response.data.mascota);
      } catch (error) {
        console.error(error);
      }
    };

    // ejecutamos las funciones que nos permitiran todas la s
    // razas, categorias y generos
    mascotaId();
    getRaza();
    getCategoria();
    getGenero();
  }, [id]);

  const getRaza = async () => {
    try {
      const response = await axiosCliente.get("/razas/listar");
      setRazas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoria = async () => {
    try {
      const response = await axiosCliente.get("/categoria/listar");
      setCategoria(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGenero = async () => {
    try {
      const response = await axiosCliente.get("/generos/listar");
      setGenero(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarMascota = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formMascota = new FormData();
    formMascota.append("name", mascota.nombre);
    formMascota.append("raza_id", mascota.razas);
    formMascota.append("categorias_id", mascota.categorias);
    formMascota.append("generos_id", mascota.generos);
    formMascota.append("img", mascota.foto);

    try {
      const response = await axios.put(
        `http://localhost:3000/mascotas/actualizar/${id}`,
        formMascota,
        config
      );

      if (response.status === 200) {
        alert("mascota actulizada");
        navegacion("/home");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleFileUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const previewUrl = URL.createObjectURL(archivo);
      setMascota({ ...mascota, foto: archivo });
      setPreviewImagen(previewUrl);
    } else {
      setPreviewImagen(null);
    }
  };
  return (
    <>
      <div className="w-96 h-[700px] bg-blue-900 rounded-3xl flex flex-col gap-8">
        <main className="h-full px-4 py-2">
          <div className="inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden ">
              <figure>
                <img
                  src={
                    previewImagen ||
                    `http://localhost:3000/imagenes/${mascota.foto}`
                  }
                  alt=""
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
          <div>
            <ul className="flex flex-col gap-4 items-center h-3/5 pt-11">
              <li className="rounded-2xl bg-name-main bg-no-repeat">
                <section className="flex flex-row bg-white h-12 w-80 rounded-s-2xl">
                  <div className="w-4/12 bg-blue-600 flex items-center pl-8">
                    Nombre
                  </div>
                  <input
                    type="text"
                    className="flex pl-9 items-center w-4/6"
                    value={mascota.nombre}
                    onChange={(e) =>
                      setMascota({ ...mascota, nombre: e.target.value })
                    }
                  />
                </section>
              </li>
              <li>
                <section className="flex flex-row bg-[url('info-race.svg')] bg-no-repeat h-12 w-80">
                  <div className="w-4/12"></div>
                  <select
                    className="appearance-none w-11/12 py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    value={mascota.razas}
                    onChange={(e) =>
                      setMascota({ ...mascota, razas: e.target.value })
                    }
                  >
                    {razas.map((raza) => (
                      <option key={raza._id} value={raza._id}>
                        {raza.name}
                      </option>
                    ))}
                  </select>
                </section>
              </li>
              <li>
                <section className="flex flex-row bg-[url('info-category.svg')] bg-no-repeat h-12 w-80">
                  <div className="w-4/12"></div>
                  <select
                    className="appearance-none w-11/12 py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    value={mascota.categorias}
                    onChange={(e) =>
                      setMascota({ ...mascota, categorias: e.target.value })
                    }
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.name}
                      </option>
                    ))}
                  </select>
                </section>
              </li>
              <li>
                <div>
                  <input
                    type="file"
                    value={""}
                    onChange={handleFileUpload}
                    className="appearance-none w-80 py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
              </li>
              <li>
                <section className="flex flex-row bg-[url('info-gender.svg')] bg-no-repeat h-12 w-80">
                  <div className="w-4/12"></div>
                  <select
                    className="appearance-none w-full py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    value={mascota.generos}
                    onChange={(e) =>
                      setMascota({ ...mascota, generos: e.target.value })
                    }
                  >
                    {generos.map((genero) => (
                      <option key={genero._id} value={genero._id}>
                        {genero.name}
                      </option>
                    ))}
                  </select>
                </section>
              </li>
            </ul>
            <button
              onClick={() => {
                actualizarMascota(mascota.id);
              }}
              className="mt-9 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Modificar
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ModificarMascota;