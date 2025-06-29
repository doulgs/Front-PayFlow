import React from "react";
import { Image, Pressable, StatusBar, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { GradientLinear } from "@/components/ui/overlay/gradient-linear";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useGreeting } from "@/hooks/useGreeting";
import { clsx } from "clsx";
import { ChevronLeft } from "lucide-react-native";

interface ActionsProps {
  visible?: boolean;
  className?: string;
  action: () => void;
  icon: React.ReactNode;
}

interface ExtraHeaderProps {
  subTitle?: string;
  label?: string;
  actions?: ActionsProps[];
  hideBackButton?: boolean;
  showImageAvatar?: boolean;
  imageAvatar?: string | null;
  transparentBackground?: boolean;
  gradientBackground?: boolean;
}

interface HeaderProps extends ExtraHeaderProps {
  navigation: {
    goBack?: () => void;
    canGoBack?: () => boolean;
  };
  options: {
    title?: string;
  };
  route: {
    name: string;
  };
}

const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

export const Header: React.FC<HeaderProps> = ({
  navigation,
  options,
  route,
  subTitle,
  label,
  actions = [],
  hideBackButton,
  imageAvatar,
  showImageAvatar = false,
  transparentBackground = false,
  gradientBackground = true,
}) => {
  const { t } = useChangeLanguage();
  const { greeting } = useGreeting();
  const title = options.title || route.name;

  const canGoBack = !hideBackButton && navigation?.canGoBack?.();

  const containerStyle: ViewStyle = {
    alignSelf: "stretch",
    height: 58 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
  };

  const textColorClass = "text-light-typography-inverse";

  const content = (
    <View className="flex-1 flex-row pr-2 pl-4 items-center justify-between">
      <View className="flex-row items-center gap-3">
        {canGoBack && (
          <TouchableOpacity onPress={() => navigation.goBack?.()} className="p-2">
            <ChevronLeft size={24} color={"#FFF"} />
          </TouchableOpacity>
        )}

        {showImageAvatar && imageAvatar && (
          <Pressable>
            <Image source={{ uri: imageAvatar }} className="w-10 h-10 border border-stone-800 rounded-lg" />
          </Pressable>
        )}

        <View>
          <Text className={clsx("text-xl font-bold", textColorClass)}>
            {title === t("tabs.dashboard") ? greeting : title}
          </Text>

          {subTitle && <Text className={clsx("text-sm italic", textColorClass)}>{subTitle}</Text>}

          {label && <Text className={clsx("text-[10px] italic", textColorClass)}>{label}</Text>}
        </View>
      </View>

      <View className="flex-row items-center gap-4 mr-1">
        {actions.map(
          (ac, i) =>
            (ac.visible ?? true) && (
              <TouchableOpacity key={i} onPress={ac.action} className={clsx("p-2", ac.className)}>
                {ac.icon}
              </TouchableOpacity>
            )
        )}
      </View>
    </View>
  );

  if (gradientBackground) {
    return <GradientLinear style={containerStyle}>{content}</GradientLinear>;
  }

  if (transparentBackground) {
    return <View style={containerStyle}>{content}</View>;
  }

  return (
    <View className="bg-light-highlight-primary" style={containerStyle}>
      {content}
    </View>
  );
};
