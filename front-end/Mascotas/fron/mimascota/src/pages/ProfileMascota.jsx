import React from "react";

import DetalleMascota from "./components/DetalleMascota";
import { useParams } from "react-router-dom";
import { Layuot } from "./layout/Layout";

const ProfileMascota = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Layuot contenido={<DetalleMascota id={id} />} />
    </>
  );
};

export default ProfileMascota;
