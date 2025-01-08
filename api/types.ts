// api/types.ts

// 示例：定义用户数据类型
import { number, string } from 'prop-types';

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

export interface MusicianData {
  musicianId: string;
  firstName: string;
  lastName: string;
  gender: number;
  latestDraft: string;
  playTimes: number;
  tuneCoins: number;
  avatar: string;
  description: string;
  createdDate: string;
  createdUser: string;
  createdAccount: string;
  updatedDate: string;
  updatedUser: string;
  updatedAccount: string;
}

export interface ListData {
  totalPages: number;
  totalElements: number;
  content: MusicianData[];
}

export interface ErrorData {
  resource: any;
  code: number;
  message: string;
  stackTrace: string;
  field: string;
}

export interface PageListData {
  data: ListData;
  code: number;
  message: string;
  path: null;
  status: number;
  success: boolean;
  timestamp: string;
  error?: ErrorData;
}
