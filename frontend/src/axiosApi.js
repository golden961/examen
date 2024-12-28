import axios from 'axios';
const apiURL = 'http://localhost:5000';


const axiosApi = axios.create({
    baseURL: apiURL,
});

axiosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default axiosApi;