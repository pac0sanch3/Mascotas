import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// importamos la base ruta de el servidor
import axiosCliente from "./api/Axios";

// componentes

const AddMascota = () => {
  const [razas, setRazas] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [generos, setGenero] = useState([]);
  const [name, setNombre] = useState("");
  const [idRaza, setIdRaza] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [img, setFoto] = useState(null);
  const [idGenero, setIdGenero] = useState("");
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagenPredeterminada, setImagenPredeterminada] =
    useState(" icon-camera.svg");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navegacion = useNavigate();

  useEffect(() => {
    getCategoria();
    getGenero();
    getRaza();
  }, []);

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

  const handleFileUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const previewUrl = URL.createObjectURL(archivo);
      setFoto(archivo);
      setPreviewImagen(previewUrl);
    } else {
      setPreviewImagen(null);
    }
  };

  const registrarMascota = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("raza_id", idRaza);
    data.append("categorias_id", idCategoria);
    data.append("generos_id", idGenero);
    data.append("img", img);

    if (img) {
      try {
        const response = await axiosCliente.post("/mascotas/register", data);
        if (response) {
          alert("Tu nuevo amigo");
          navegacion("/home");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("foto es requerida");
    }
  };

  return (
    <>
      <div className="bg-blue-900">
        <main>
          <div className="flex justify-center h-2/5">
            <figure className="bg-white w-64 h-64  rounded-full border-blue-500 flex items-center justify-center">
              {/* icon-camera.svg */}
              {previewImagen && (
                <img
                  src={previewImagen || imagenPredeterminada}
                  alt="icon-camera"
                  className="rounded-full w-full h-full"
                />
              )}
            </figure>
          </div>
          <div className="flex flex-col items-center h-3/5  pt-9">
            <div className="flex flex-col justify-center items-center content-center w-11/12">
              <form
                onSubmit={handleSubmit(registrarMascota)}
                className="flex flex-col gap-6"
              >
                <label>
                  <input
                    {...register("name", { required: true })}
                    value={name}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    className="block w-full p-3 text-gray-900  rounded-2xl  text-xs focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
                  {errors.nombre?.type === "required" && (
                    <div className="text-white text-2xl font-bold">
                      Nombre de mascota es requerido
                    </div>
                  )}
                </label>

                <label htmlFor="">
                  <div className="relative">
                    <select
                      name=""
                      id=""
                      {...register("raza", { required: true })}
                      value={idRaza}
                      onChange={(e) => setIdRaza(e.target.value)}
                      className="appearance-none w-full py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                      <option value="" disabled>
                        {" "}
                        Seleccione una raza
                      </option>
                      {razas.map((raza) => (
                        <option key={raza._id} value={raza._id}>
                          {raza.name}
                        </option>
                      ))}
                    </select>
                    {errors.raza?.type === "required" && (
                      <div className="text-white text-2xl font-bold">
                        Seleccione la raza
                      </div>
                    )}
                  </div>
                </label>

                <label htmlFor="">
                  <div className="relative">
                    <select
                      name=""
                      id="cateforia"
                      {...register("categoria", { required: true })}
                      value={idCategoria}
                      onChange={(e) => setIdCategoria(e.target.value)}
                      className="appearance-none w-full py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                      <option value="">Selecciona una Categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria._id} value={categoria._id}>
                          {categoria.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoria?.type === "required" && (
                      <div className="text-white text-2xl font-bold">
                        requerida
                      </div>
                    )}
                  </div>
                </label>

                <div>
                  <input
                    type="file"
                    value={""}
                    onChange={handleFileUpload}
                    className="appearance-none w-full py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <select
                    name=""
                    id="genero"
                    {...register("genero", { required: true })}
                    value={idGenero}
                    onChange={(e) => setIdGenero(e.target.value)}
                    className="appearance-none w-full py-2 px-4 pr-8 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="">Selecciona una Genero</option>
                    {generos.map((genero) => (
                      <option key={genero._id} value={genero._id}>
                        {genero.name}
                      </option>
                    ))}
                  </select>
                  {errors.genero?.type === "required" && (
                    <div className="text-white text-2xl font-bold">
                      genero es requerido
                    </div>
                  )}
                </div>

                <div>
                  <button>
                    <img src="btn-save.svg" alt="btn-save" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddMascota;
