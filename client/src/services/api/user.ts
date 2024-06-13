import axios from 'axios';

const API_URL = 'http://localhost:5275/';

export const api = axios.create({
  baseURL: API_URL,
});

export const signUP = async (dataForms: IUserInput) => {
  try {
    const response = await api.post('/users', dataForms);
    const { data } = response;
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};

export const signIn = async (dataForms: IUserLogin) => {
  try {
    const response = await api.post('/auth/login', dataForms);
    const { data } = response;
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const { data } = err.response;
    return data;
  }
};
