import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const register = async (values: { username: string; email: string; password: string }) => {
  const { data } = await instance.post('/auth/register', values);
  return data;
};

export const login = async (values: { usernameOrEmail: string; password: string }) => {
  const { data } = await instance.post('/auth/login', values);
  return data;
};
