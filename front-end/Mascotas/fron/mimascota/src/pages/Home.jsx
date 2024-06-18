import React from "react";


import { Layuot } from "./layout/Layout";
import ListarMascotas from "./components/ListarMascotas";

const Home = () => {
  

  return (
    <>
      <Layuot contenido={<ListarMascotas />} />
    </>
  );
};

export default Home;
