import React from "react";

// importamos los componentes
import Nav from "../components/Nav";

export const Layuot = ({ contenido }) => {
  {
    /* bg-[url('bg.svg')] */
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 h-[700px] bg-blue-900 rounded-3xl shadow-lg flex flex-col overflow-y-auto gap-8">
          <nav className="">
            <Nav contenido={"Home"} />
          </nav>
          <main className="h-full">{contenido}</main>
        </div>
      </div>
    </>
  );
};
