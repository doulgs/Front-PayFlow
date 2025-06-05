import React from "react";
import { Text, View, ViewProps } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { clsx } from "clsx";

type BadgeProps = ViewProps & {
  variant?: "default" | "success" | "warning" | "error" | "info";
  icon?: LucideIcon;
  children: React.ReactNode;
};

const variantStyles: Record<string, string> = {
  default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white",
  success: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white",
  error: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white",
};

export function Badge({ variant = "default", icon: Icon, children, className, ...props }: BadgeProps) {
  return (
    <View
      className={clsx("flex-row items-center gap-1 rounded-full px-3 py-1", variantStyles[variant], className)}
      {...props}
    >
      {Icon && <Icon size={14} className="mr-1" />}
      <Text className="text-xs font-medium">{children}</Text>
    </View>
  );
}
