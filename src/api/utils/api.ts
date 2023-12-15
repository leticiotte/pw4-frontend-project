import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export const fetchData = async (
  endpoint: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await instance.get(endpoint, options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data);
      throw error;
    }
    throw new Error(`Erro na requisição: ${error}`);
  }
};

export const deleteData = async (
  endpoint: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await instance.delete(endpoint, options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data);
      throw error;
    }
    throw new Error(`Erro na requisição: ${error}`);
  }
};

export const postData = async (
  endpoint: string,
  body: any,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await instance.post(endpoint, body, options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data);
      throw error;
    }
    throw new Error(`Erro na requisição: ${error}`);
  }
};

export const updateData = async (
  endpoint: string,
  body: any,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await instance.put(endpoint, body, options);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data);
      throw error;
    }
    throw new Error(`Erro na requisição: ${error}`);
  }
};
