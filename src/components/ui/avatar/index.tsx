import React from "react";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import { clsx } from "clsx";

type AvatarProps = {
  imageUrl?: string;
  imageLocal?: ImageSourcePropType;
  fallback?: string;
  icon?: React.ReactNode;
  size?: number;
  className?: string;
  showBorder?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  imageLocal,
  fallback,
  icon,
  size = 48,
  className,
  showBorder,
}) => {
  if (imageUrl === "not found") imageUrl = "";

  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "👤";

  const imageSource = imageLocal ? imageLocal : imageUrl && imageUrl.trim().length > 0 ? { uri: imageUrl } : null;

  const containerStyle = {
    width: size,
    height: size,
  };

  const border = showBorder ?? !imageSource;

  return (
    <View
      className={clsx(
        "items-center justify-center rounded-xl overflow-hidden",
        "bg-highlight-dark-primary/40",
        border && "border border-highlight-dark-primary",
        className
      )}
      style={containerStyle}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
          }}
        />
      ) : icon ? (
        icon
      ) : (
        <Text className="text-white font-bold" style={{ fontSize: size / 3 }}>
          {initials}
        </Text>
      )}
    </View>
  );
};
