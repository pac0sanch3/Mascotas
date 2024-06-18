import bycrypt from "bcryptjs";

// encriptar la contraseña que llega por el body de la solicitud
export const encriptarContra = async (password) => {
  const contraEncriptada = await bycrypt.hash(password, 10);
  return contraEncriptada;
};

// compara la contraseña que existe en la base de datos con la que llega del logn
export const compare = async (texto, contraCriptada) => {
  return await bycrypt.compare(texto, contraCriptada);
};