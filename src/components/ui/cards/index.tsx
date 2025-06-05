import React from "react";
import { View } from "react-native";
import { clsx } from "clsx";

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const CardRoot: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <View className={clsx("flex-1 rounded-xl overflow-hidden p-4", className)}>{children}</View>;
};

const CardHeader: React.FC<CardSectionProps> = ({ children, className }) => {
  return <View className={clsx("mb-2", className)}>{children}</View>;
};

const CardBody: React.FC<CardSectionProps> = ({ children, className }) => {
  return <View className={clsx("py-2", className)}>{children}</View>;
};

const CardFooter: React.FC<CardSectionProps> = ({ children, className }) => {
  return <View className={clsx("mt-2", className)}>{children}</View>;
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
