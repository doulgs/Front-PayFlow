import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(greeting)/index" />
      <Stack.Screen name="(login)/index" />
    </Stack>
  );
}
