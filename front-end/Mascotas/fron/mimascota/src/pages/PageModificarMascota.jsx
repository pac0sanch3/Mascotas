import React from "react";
import { useParams } from "react-router-dom";

import ModificarMascota from "../pages/components/ModificarMascota";

import { Layuot } from "./layout/Layout";

const PageModificarMascota = () => {
  const { id } = useParams();

  return (
    <>
      <Layuot contenido={<ModificarMascota id={id} />} />
    </>
  );
};

export default PageModificarMascota;
