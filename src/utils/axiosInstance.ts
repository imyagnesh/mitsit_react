import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  timeoutErrorMessage: 'Timeout. Please try after sometime',
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        return Promise.reject(new Error(error.response?.data));
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
