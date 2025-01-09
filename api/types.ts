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

export interface MusicianList {
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

export interface MusicianListData {
  totalPages: number;
  totalElements: number;
  content: MusicianList[];
}

export interface ErrorData {
  resource: any;
  code: number;
  message: string;
  stackTrace: string;
  field: string;
}

export interface MusicianPageListData {
  data: MusicianListData;
  code: number;
  message: string;
  path: null;
  status: number;
  success: boolean;
  timestamp: string;
  error?: ErrorData;
}

export interface MusicianDetailData {
  data: MusicianDetailInfo;
  code: number;
  message: string;
  path: null;
  status: number;
  success: boolean;
  timestamp: string;
  error?: ErrorData;
}

export interface MusicianDetailInfo {
  musicianId: string;
  firstName: string;
  lastName: string;
  gender: number;
  latestDraft: string;
  playTimes: number;
  tuneCoins: number;
  avatar: string | number;
  description: string;
  createdDate: string;
  createdUser: string;
  role: string;
  updatedDate: string | null;
  updatedUser: string | null;
  updatedAccount: string | null;
  works: MusicianDateilInfoWork[];
  awards: MusicianDateilInfoAward[];
}

export interface MusicianDateilInfoWork {
  workId: string;
  musicianId: string;
  workStatus: string;
  workName: string;
  playTimes: number;
  tuneCoins: number;
  avatar: string;
  description: string;
}

export interface MusicianDateilInfoAward {
  awardId: string;
  musicianId: string;
  awardName: string;
  avatar: string | null;
  description: string;
}
