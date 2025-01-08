import { AuthProvider } from '@/scripts/context/AuthContext';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import React from 'react';
const queryClient = new QueryClient();
export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);

  // 登录函数
  const login = (username: string) => {
    setUser(username);
  };

  // 登出函数
  const logout = () => {
    setUser(null);
  };

  // 提供的 Context 值
  const value = {
    user,
    login,
    logout,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider value={value}>
        <Stack>
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
          <Stack.Screen
            name="follow-detail/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
