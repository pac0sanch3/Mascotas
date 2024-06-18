import axios from "axios";

const axiosCliente = axios.create({
  baseURL: "http://localhost:3000",
});

axiosCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Content-Type"] = "multipart/form-data";
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosCliente.interceptors.response.use((response) => {
  return response;
});

export default axiosCliente;
