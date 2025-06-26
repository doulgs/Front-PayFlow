import React, { ReactNode } from "react";
import { Image, Text, View } from "react-native";

type PictureProps = {
  imageUrl?: string;
  icon?: ReactNode;
  fallback?: string;
  size?: number;
  className?: string;
};

export const Picture: React.FC<PictureProps> = ({ imageUrl, icon, fallback, size = 32, className }) => {
  const showImage = !!imageUrl && imageUrl.trim().length > 0;
  const showIcon = !showImage && !!icon;
  const initials = fallback
    ? fallback
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "👤";
  const containerStyle = { width: size, height: size };

  return (
    <View
      className={[
        "items-center justify-center rounded-xl overflow-hidden bg-gray-300/10 dark:bg-light-brand-primary/50",
        !showImage && !showIcon && "border border-gray-600/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={containerStyle}
    >
      {showImage ? (
        <Image
          source={{ uri: imageUrl! }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 0 }}
        />
      ) : showIcon ? (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>{icon}</View>
      ) : (
        <Text
          className="dark:text-light-typography-inverse text-dark-typography-inverse font-bold"
          style={{ fontSize: size / 3 }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};
