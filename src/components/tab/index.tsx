import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { clsx } from "clsx";
import { DiamondPlus, PanelsTopLeft, SquareMenu } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const tabs = [
  {
    route: "(dashboard)/index",
    translationKey: "tabs.dashboard",
    icon: (color: string, size: number) => <PanelsTopLeft color={color} size={size} />,
  },
  {
    route: "(new)/index",
    translationKey: "tabs.new",
    icon: (color: string, size: number) => <DiamondPlus color={color} size={size} />,
  },
  {
    route: "(overview)/index",
    translationKey: "tabs.overview",
    icon: (color: string, size: number) => <SquareMenu color={color} size={size} />,
  },
];

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { t } = useTranslation();
  const { to } = useCustomNavigation();

  return (
    <View className="flex-row bg-light-background-primary dark:bg-dark-background-primary border-t border-slate-300 dark:border-slate-600 py-4 px-2 justify-around">
      {state.routes.map((route, index) => {
        const tabInfo = tabs.find((tab) => route.name.includes(tab.route));
        const isFocused = state.index === index;

        const color = isFocused ? "#ff941a" : "#a0a0a0";
        const size = 24;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            if (route.name.includes("(new)/index")) {
              to.app.stacks.launcher.home();
            } else if (!isFocused) {
              navigation.navigate(route.name);
            }
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
              {tabInfo ? t(tabInfo.translationKey as any) : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export { CustomTabBar };
