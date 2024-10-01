import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const client = Axios.create({
  baseURL: 'http://ec2-13-60-49-176.eu-north-1.compute.amazonaws.com/'
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
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  },
);
