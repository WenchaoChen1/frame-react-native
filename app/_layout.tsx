import { AuthProvider } from '@/scripts/context/AuthContext';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Stack } from 'expo-router';
import { useState } from 'react';
import React from 'react';
import { Platform } from 'react-native';
// const queryClient = new QueryClient();
export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);

    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              // 默认设置
              // 设置0以上，以避免在客户端立即重新读取
              staleTime: 60 * 1000,
            },
          },
        })
    );

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
      {Platform.OS === 'web' &&<ReactQueryDevtools initialIsOpen={false} />
}
      <AuthProvider value={value}>
        <Stack initialRouteName="login">
          <Stack.Screen name="login"
                        options={{
                          headerShown: false,
                          headerTitle:'login',
                          headerBackVisible:false,
          }} />
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
