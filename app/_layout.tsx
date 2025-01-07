import { AuthProvider } from "@/scripts/context/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";

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
    <AuthProvider value={value}>
      <Stack>
        <Stack.Screen name="(tab)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
    </AuthProvider>
  )
}
