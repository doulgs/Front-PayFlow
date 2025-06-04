import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { clsx } from "clsx";
import { BookMarked, Bot, LayoutDashboard, MessagesSquare, Settings } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const tabs = [
  {
    route: "(dashboard)/index",
    translationKey: "dashboard",
    icon: (color: string, size: number) => <LayoutDashboard color={color} size={size} />,
  },
  {
    route: "(laucher)/index",
    translationKey: "laucher",
    icon: (color: string, size: number) => <MessagesSquare color={color} size={size} />,
  },
  {
    route: "(settings)/index",
    translationKey: "settings",
    icon: (color: string, size: number) => <BookMarked color={color} size={size} />,
  },
];

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { t } = useChangeLanguage();

  return (
    <View className="flex-row bg-light-background-primary dark:bg-dark-background-primary border-t border-slate-300 dark:border-slate-600 py-4 px-2 justify-around">
      {state.routes.map((route, index) => {
        const tabInfo = tabs.find((tab) => route.name.includes(tab.route));
        const isFocused = state.index === index;

        const color = isFocused ? "#6B02ED" : "#a0a0a0";
        const size = 24;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            className="flex items-center justify-center w-[72px]"
          >
            {tabInfo?.icon(color, size)}
            <Text
              className={clsx(
                "text-xs mt-1 text-center",
                isFocused ? "text-light-brand-primary font-semibold" : "text-gray-400"
              )}
            >
              {tabInfo ? t(tabInfo.translationKey) : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export { CustomTabBar };
