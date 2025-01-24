// api/api.ts
import axios, { AxiosHeaders } from 'axios';
import { HeadersDefaults, RawAxiosRequestHeaders } from 'axios/index';
import qs from 'qs';
// 定义 API 的基础 URL
const BASE_URL = 'http://192.168.0.111:8103';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  } as RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>,
});

// 定义通用的响应类型
interface ApiResponse<T> {
  data: T; // 响应数据
  status: number; // HTTP 状态码
  statusText: string; // 状态信息
}

// 封装 GET 请求
export const get = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(url, { params });
    // console.log(response, 'response');
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// 封装 POST 请求
export const post = async <T>(
  url: string, data?: Record<string, any>,  config?: { headers: { 'Content-Type': string } }): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<T>(url, qs.stringify(data), {
      headers: config?.headers, // 传递 headers
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// 封装 PUT 请求
export const put = async <T>(
  url: string,
  data?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.put<T>(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// 封装 DELETE 请求
export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.delete<T>(url);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};
