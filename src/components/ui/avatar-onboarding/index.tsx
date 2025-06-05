import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";

const gradientOverlayColors = [
  "transparent",
  "rgba(255, 196, 128, 0.46)",
  "rgba(255, 195, 128, 1.0)",
  "rgba(255, 148, 26, 1.0)",
  "rgba(255, 148, 26, 1.0)",
] as const;

export function AvatarOnboarding() {
  return (
    <View className="flex-1">
      <Image source={require("@/assets/images/onboarding.png")} resizeMode="cover" />
      <LinearGradient colors={gradientOverlayColors} style={{ position: "absolute", width: "100%", height: "100%" }} />
    </View>
  );
}
