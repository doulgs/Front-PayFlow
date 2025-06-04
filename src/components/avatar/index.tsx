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
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "👤";

  const imageSource = imageLocal ? imageLocal : imageUrl ? { uri: imageUrl } : null;

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const showBorder = !imageSource;

  return (
    <View
      className={clsx(
        "items-center justify-center rounded-full overflow-hidden",
        "bg-light-background-alternative dark:bg-dark-background-primary",
        showBorder && "border border-purple-500",
        className
      )}
      style={containerStyle}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          resizeMode="cover"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
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
