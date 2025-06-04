import React from "react";
import { clsx } from "clsx";
import { StatusBar, Text, TouchableOpacity, View, Platform } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/hooks/useTheme";
import { ChevronLeft } from "lucide-react-native";

interface ActionsProps {
  className?: string;
  action: () => void;
  icon: React.ReactNode;
}

interface HeaderProps extends BottomTabHeaderProps {
  label?: string;
  subTitle?: string;
  actions?: ActionsProps[];
  hideBackButton?: boolean;
}

const STATUS_BAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0;

export const TabHeader: React.FC<HeaderProps> = ({
  navigation,
  options,
  route,
  subTitle,
  label,
  actions = [],
  hideBackButton,
}) => {
  const { currentTheme } = useTheme();
  const title = options.title || route.name;

  const canGoBack = !hideBackButton && navigation.canGoBack();

  const iconColor = currentTheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <View
      className="bg-light-background-primary dark:bg-dark-background-primary border-b border-slate-300 dark:border-slate-600"
      style={{
        height: 58 + STATUS_BAR_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        alignSelf: "stretch",
      }}
    >
      <View className="flex-1 flex-row pr-2 pl-4 items-center justify-between">
        <View className="flex-row items-center gap-3">
          {canGoBack && (
            <TouchableOpacity onPress={navigation.goBack} className="p-2">
              <ChevronLeft size={24} color={iconColor} />
            </TouchableOpacity>
          )}

          <View className="">
            {title === "GPT Maker" ? (
              <Text
                className={clsx("text-2xl font-bold dark:text-light-typography-inverse text-dark-typography-inverse")}
              >
                GPT Maker
              </Text>
            ) : (
              <Text
                className={clsx("text-xl font-bold dark:text-light-typography-inverse text-dark-typography-inverse")}
              >
                {title}
              </Text>
            )}

            {!!subTitle && (
              <Text className={clsx("text-sm italic dark:text-light-typography-subtle text-dark-typography-subtle")}>
                {subTitle}
              </Text>
            )}

            {!!label && (
              <Text
                className={clsx("text-[10px] italic dark:text-light-typography-subtle text-dark-typography-subtle")}
              >
                {label}
              </Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center gap-4 mr-1">
          {actions.map((ac, i) => (
            <TouchableOpacity key={i} onPress={ac.action} className={clsx("p-2", ac.className)}>
              {ac.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
