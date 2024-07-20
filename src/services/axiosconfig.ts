import { refreshAccesToken } from "@/api/commonApi";
import axios from "axios";
import { toast } from "sonner";

const Api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true
})



// Add a request interceptor here 

Api.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});




// Add a response interceptor here

Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log('on axios interceptor');
            originalRequest._retry = true;
            try {
                const response = await refreshAccesToken()
                const { accestoken } = response?.data
                localStorage.setItem('accessToken', accestoken)
                originalRequest.headers.Authorization = `Bearer ${accestoken}`
            } catch (error) {
                toast.error("Session timeout! Please login", { position: 'top-center' });
                window.location.href = "/choose-role";
            }
        }
        return Promise.reject(error);
    }

);



export default Api