/*
// 使用请求接口方法的案例
import React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { get, post } from '@/api/api';
import { User, LoginRequest, LoginResponse } from '@/api/types';

const MyComponent = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => get<User>('/user/1').then((res) => res.data),
  });

  // 使用 useMutation 处理登录请求

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) =>
      post<LoginResponse>('/login', credentials).then((res) => res.data),
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ email: 'test@example.com', password: 'password' });
  };

  if (isUserLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (userError) {
    return <Text>Error: {userError.message}</Text>;
  }

  return (
    <View>
      <Text>User: {JSON.stringify(userData)}</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default MyComponent;*/
