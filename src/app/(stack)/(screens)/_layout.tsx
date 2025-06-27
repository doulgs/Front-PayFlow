import React from "react";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(dashboard)" />
      <Stack.Screen name="(extract)" />
      <Stack.Screen name="(laucher)" />
      <Stack.Screen name="(notification)" />
      <Stack.Screen name="(profile)" />
    </Stack>
  );
}
