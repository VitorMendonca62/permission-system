import axios from 'axios';

const API_URL = 'http://localhost:5275/sales';

export const api = axios.create({
  baseURL: API_URL,
});

export const getSales = async (id: number) => {
  try {
    const response = await api.get(`/one/${id}`, {
      headers: {
        userId: id,
        authorization: localStorage.getItem('USER_TOKEN'),
      },
    });
    const { data } = response as { data: ISale[] };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};

export const getAllSales = async () => {
  try {
    const response = await api.get(`/all`, {
      headers: {
        authorization: localStorage.getItem('USER_TOKEN'),
      },
    });
    const { data } = response as { data: ISale[] };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};

export const addSalesApi = async (dataForms: ISale, id: number) => {
  try {
    const response = await api.post('/', dataForms, {
      headers: {
        userId: id,
        authorization: localStorage.getItem('USER_TOKEN'),
      },
    });
    const { data } = response;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};
