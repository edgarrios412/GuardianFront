// import flujosTrabajosApi from "../apis/flujosTrabajosApi";

const BASE_URL = "";

export const findUsuario = async () => {
  try {
    const response = await flujosTrabajosApi.get(`${BASE_URL}/listar`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
