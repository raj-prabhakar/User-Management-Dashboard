import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api'
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  };
  
  export const getUsers = async (page: number) => {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  };
  
  export const getUser = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };
  
  export const updateUser = async (id: number, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  };
  
  export const deleteUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  };
  
  export default api;