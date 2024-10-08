import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const client = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

client.interceptors.request.use(authRequestInterceptor);
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    console.error(message);

    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.href = `/login`;
      sessionStorage.clear();
    }

    return Promise.reject(error);
  },
);
