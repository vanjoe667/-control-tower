import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true,
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(new Error(error.message ?? "An error occurred"))
);

// Response interceptor to catch 401s
api.interceptors.response.use(
  (response) => {
    console.log({response})
    return response
},
  (error) => {
    console.log({error})

    if (error.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? "An unknown error occurred"));
  }
);

export default api;