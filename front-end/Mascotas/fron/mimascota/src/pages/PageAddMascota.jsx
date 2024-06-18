import React from "react";

import { Layuot } from "./layout/Layout";

import AddMascota from "./components/AddMascota";

const PageAddMascota = () => {
  return (
    <>
      <Layuot contenido={<AddMascota />} />
    </>
  );
};

export default PageAddMascota;
