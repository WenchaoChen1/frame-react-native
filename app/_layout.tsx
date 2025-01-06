import { Stack } from "expo-router";
import Home from "@/app-example-example/app-example/home";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import HomeScreen from "@/app-example-example/app-example/(tabs)";

export default function RootLayout() {
  // return <Stack />;
  // return <Stack>
  //   <Stack.Screen name="index" options={{ title: "Home" }} />
  //   <Stack.Screen name="about" options={{ title: "About" }} />
  // </Stack>

  return (
      <Stack>
        <Stack.Screen name="(tab)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
  )
}
