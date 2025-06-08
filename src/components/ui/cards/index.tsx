import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { clsx } from "clsx";

type Variant = "default" | "outlined" | "ghost";

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
};

type CardRootProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

const CardContext = createContext<{ variant: Variant }>({ variant: "default" });

const CardRoot: React.FC<CardRootProps> = ({ children, className, variant = "default" }) => {
  const variantClasses = {
    default: "bg-white dark:bg-zinc-900 shadow-md",
    outlined: "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900",
    ghost: "bg-transparent",
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <View className={clsx("flex-1 rounded-xl overflow-hidden p-4", variantClasses[variant], className)}>
        {children}
      </View>
    </CardContext.Provider>
  );
};

const CardHeader: React.FC<CardSectionProps> = ({ children, className }) => {
  const { variant } = useContext(CardContext);
  return <View className={clsx("mb-2", `card-header-${variant}`, className)}>{children}</View>;
};

const CardBody: React.FC<CardSectionProps> = ({ children, className }) => {
  const { variant } = useContext(CardContext);
  return <View className={clsx("py-2", `card-body-${variant}`, className)}>{children}</View>;
};

const CardFooter: React.FC<CardSectionProps> = ({ children, className }) => {
  const { variant } = useContext(CardContext);
  return <View className={clsx("mt-2", `card-footer-${variant}`, className)}>{children}</View>;
};

type CardIconProps = {
  children: React.ReactNode;
  className?: string;
};

const CardIcon: React.FC<CardIconProps> = ({ children, className }) => {
  const { variant } = useContext(CardContext);
  return <View className={clsx("justify-center items-center", `card-icon-${variant}`, className)}>{children}</View>;
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Icon: CardIcon,
});
