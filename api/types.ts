// api/types.ts

// 示例：定义用户数据类型
export interface User {
  id: number;
  name: string;
  email: string;
}

// 示例：定义登录请求数据类型
export interface LoginRequest {
  email: string;
  password: string;
}

// 示例：定义登录响应数据类型
export interface LoginResponse {
  token: string;
  user: User;
}