import React, { forwardRef, useState } from "react";
import {
  ImageBackground,
  ActivityIndicator,
  useWindowDimensions,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ViewStyle,
  ImageResizeMode,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
};

export const Background = React.memo(
  forwardRef<ImageBackground, Props>(({ source, children, style, imageStyle, resizeMode = "cover" }, ref) => {
    const { width, height } = useWindowDimensions();
    const [loading, setLoading] = useState(true);

    return (
      <ImageBackground
        ref={ref}
        source={source}
        style={[{ width, height }, style]}
        imageStyle={[{ resizeMode }, imageStyle]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        defaultSource={require("../../assets/image/background-login.png")}
      >
        {loading ? (
          <ActivityIndicator size="large" style={[{ position: "absolute", top: height / 2, left: width / 2 }]} />
        ) : (
          children
        )}
      </ImageBackground>
    );
  })
);
