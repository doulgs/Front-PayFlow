import React from "react";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import { clsx } from "clsx";

type AvatarProps = {
  imageUrl?: string;
  imageLocal?: ImageSourcePropType;
  name?: string;
  size?: number;
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, imageLocal, name, size = 48, className }) => {
  if (imageUrl === "not found") imageUrl = "";

  const initials = name
    ? name
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

  const showBorder = !imageSource;

  return (
    <View
      className={clsx(
        "items-center justify-center rounded-2xl overflow-hidden",
        "bg-light-brand-primary/10 dark:bg-light-brand-primary/50",
        showBorder && "border border-light-brand-primary",
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
