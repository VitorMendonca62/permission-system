import axios from 'axios';

const API_URL = 'http://localhost:5275/sales';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: localStorage.getItem('USER_TOKEN'),
  },
});

export const getSales = async (id: number) => {
  try {
    const response = await api.get(`/one/${id}`, {
      headers: { userId: id },
    });
    const { data } = response;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};

export const getAllSales = async () => {
  try {
    const response = await api.get(`/all`);
    const { data } = response;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};
