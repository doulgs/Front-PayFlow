import { clsx } from "clsx";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { variants, variantText } from "@/styles/variants";
import { CardRootProps } from "./types";

export const Card: React.FC<CardRootProps> = ({ children, className, variant = "default", onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  const classNames = clsx("p-4", variants[variant], variantText[variant], className);

  return (
    <Wrapper className={classNames} onPress={onPress}>
      {children}
    </Wrapper>
  );
};
