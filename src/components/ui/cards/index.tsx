import React from "react";
import { View, Text, TextProps, GestureResponderEvent, TouchableOpacity, FlatList, FlatListProps } from "react-native";
import { clsx } from "clsx";

type Variant = "default" | "outlined" | "ghost" | "success" | "danger" | "warning" | "info";

interface CardRootProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onPress?: (event: GestureResponderEvent) => void;
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

interface CardTextProps extends TextProps {
  variant?: Variant;
  className?: string;
}

interface CardIconProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onPress?: (event: GestureResponderEvent) => void;
}

interface CardListProps<T> extends FlatListProps<T> {
  className?: string;
}

interface CardMapProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  variant?: Variant;
}

const bgVariantClasses: Record<Variant, string> = {
  default: "bg-light-background-primary dark:bg-dark-background-primary shadow-md",
  outlined:
    "border border-neutral-200 dark:border-neutral-800 bg-light-background-primary dark:bg-dark-background-primary",
  ghost: "bg-transparent",
  success: "bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700",
  danger: "bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700",
  warning: "bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700",
  info: "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700",
};

const textVariantClasses: Record<Variant, string> = {
  default: "text-zinc-800 dark:text-zinc-100",
  outlined: "text-blue-800 dark:text-blue-200",
  ghost: "text-zinc-400 dark:text-zinc-400",
  success: "text-green-800 dark:text-green-200",
  danger: "text-red-800 dark:text-red-200",
  warning: "text-yellow-800 dark:text-yellow-200",
  info: "text-blue-800 dark:text-blue-200",
};

const CardRoot: React.FC<CardRootProps> = ({ children, className, variant = "default", onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  const classNames = clsx(
    "flex-1 rounded-xl overflow-hidden p-4",
    bgVariantClasses[variant],
    textVariantClasses[variant],
    className
  );

  return (
    <Wrapper className={classNames} onPress={onPress}>
      {children}
    </Wrapper>
  );
};

const CardHeader: React.FC<CardSectionProps> = ({ children, className, variant = "ghost" }) => {
  return <View className={clsx("flex-row", textVariantClasses[variant], className)}>{children}</View>;
};

const CardBody: React.FC<CardSectionProps> = ({ children, className, variant = "ghost" }) => {
  return <View className={clsx("py-2", textVariantClasses[variant], className)}>{children}</View>;
};

const CardFooter: React.FC<CardSectionProps> = ({ children, className, variant = "ghost" }) => {
  return <View className={clsx("", textVariantClasses[variant], className)}>{children}</View>;
};

const CardText: React.FC<CardTextProps> = ({ children, variant = "default", className, ...rest }) => {
  return (
    <Text className={clsx("", textVariantClasses[variant], className)} {...rest}>
      {children}
    </Text>
  );
};

const CardIcon: React.FC<CardIconProps> = ({ children, className, variant = "ghost", onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      className={clsx(
        "justify-center items-center rounded-xl overflow-hidden p-2",
        bgVariantClasses[variant],
        className
      )}
      onPress={onPress}
    >
      {children}
    </Wrapper>
  );
};

const CardList = <T,>({ className, ...rest }: CardListProps<T>) => {
  return <FlatList className={clsx("gap-2", className)} showsVerticalScrollIndicator={false} {...rest} />;
};

const CardMap = <T,>({ items, renderItem, className, variant = "default" }: CardMapProps<T>) => {
  return (
    <View className={clsx("gap-2", bgVariantClasses[variant], textVariantClasses[variant], className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </View>
  );
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Text: CardText,
  Icon: CardIcon,
  List: CardList,
  Map: CardMap,
});
