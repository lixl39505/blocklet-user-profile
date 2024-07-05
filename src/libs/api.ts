import { createAxios } from '@blocklet/js-sdk';
import { HttpStatusCode } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

// 统一处理后台返回值
api.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    // eslint-disable-next-line no-console
    console.log(`${config.url}:`, res.data);

    if (data.code !== HttpStatusCode.Ok) {
      return Promise.reject(data.payload);
    }

    return data.payload;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
