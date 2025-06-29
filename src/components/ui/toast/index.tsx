import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { clsx } from "clsx";
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

export interface ShowToastProps {
  type: "success" | "danger" | "info" | "warning";
  text: string;
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
  position?: "top" | "bottom";
  timeout?: number;
}

export const TOAST_STYLES = {
  success: {
    bg: "bg-status-success dark:bg-status-success",
    icon: "check-circle",
  },
  danger: {
    bg: "bg-status-danger dark:bg-status-danger",
    icon: "exclamation-circle",
  },
  info: {
    bg: "bg-status-info dark:bg-status-info",
    icon: "info-circle",
  },
  warning: {
    bg: "bg-status-warning dark:bg-status-warning",
    icon: "exclamation-triangle",
  },
};

export interface ToastHandle {
  show: (props: ShowToastProps) => void;
}

const ToastMessage = forwardRef<ToastHandle>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastData, setToastData] = useState<ShowToastProps | null>(null);
  const timeoutRef = useRef<number | null>(null); // ✅ Corrigido

  const showToast = (props: ShowToastProps) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setToastData(props);
    setIsVisible(true);

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, props.timeout ?? 3000);
  };

  const closeToast = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({ show: showToast }));

  if (!isVisible || !toastData) return null;

  return (
    <Animated.View
      className={clsx(
        "absolute mx-6 max-w-md w-auto p-4 flex-row items-center rounded-lg shadow-lg",
        TOAST_STYLES[toastData.type]?.bg,
        toastData.position === "bottom" ? "bottom-24" : "top-14"
      )}
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
    >
      {
        {
          success: <CheckCircle size={30} color="#fff" />,
          danger: <XCircle size={30} color="#fff" />,
          info: <Info size={30} color="#fff" />,
          warning: <AlertTriangle size={30} color="#fff" />,
        }[toastData.type]
      }

      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-lg">{String(toastData.text ?? "")}</Text>

        {!!toastData.description && <Text className="text-white text-sm mt-1">{String(toastData.description)}</Text>}
      </View>

      {!!toastData.buttonText && (
        <TouchableOpacity
          className="ml-4 bg-highlight-primary dark:bg-dark-highlight-primary px-4 py-2 rounded-lg"
          onPress={() => {
            toastData.buttonAction?.();
            closeToast();
          }}
        >
          <Text className="text-white font-semibold">{String(toastData.buttonText)}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity className="ml-2" onPress={closeToast}>
        <X size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
});

export { ToastMessage };
