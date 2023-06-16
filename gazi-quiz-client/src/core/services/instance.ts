import axios from 'axios';
// import { refreshAuthService } from "../authService";
import { decryptData } from '../cryptoToken';
import localStorageVariables from '../../utils/constants/localStorageVariables';

const baseApiUrl = 'https://localhost:7154/api';

const instance = (isFormData: boolean, isAuth: boolean) => {
    const axiosInstance = axios.create({
        baseURL: baseApiUrl,
        timeout: 10000,
        headers: {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
    });

    if (!isAuth) return axiosInstance;

    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${decryptData(localStorageVariables.token)}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    // axiosInstance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalConfig = error.config;

    //         if (error.response.status === 401 && !originalConfig._retry) {
    //             originalConfig._retry = true;

    //             try {
    //                 const response = await refreshAuthService();
    //                 localStorage.setItem(localStorageToken, JSON.stringify(response?.data.data?.accessToken));
    //                 axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response?.data.data?.accessToken}`;
    //                 return axiosInstance(originalConfig);
    //             } catch (_error: any) {
    //                 return Promise.reject(_error.response && _error.response.data  ? _error.response.data : _error);
    //             }
    //         }

    //         return Promise.reject(error);
    //     }
    // );

    return axiosInstance;
};

export default instance;
