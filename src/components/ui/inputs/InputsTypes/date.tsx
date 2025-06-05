import React, { useCallback, useMemo, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  clear?: () => void;
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export const DateInput = ({ value, onChange, placeholder }: DateInputProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const formatDisplay = (date: string) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "";
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text
          className={clsx(
            "flex-1 text-base",
            value
              ? "text-light-typography-primary dark:text-dark-typography-primary"
              : "text-light-typography-muted dark:text-dark-typography-muted"
          )}
        >
          {value ? formatDisplay(value) : placeholder || "Selecionar data"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: "#D1D5DB", // equivalente a stroke.default
          borderWidth: 1,
        }}
      >
        <BottomSheetView>
          <Calendar
            onDayPress={(day: DateObject) => {
              onChange(day.dateString);
              closeModal();
            }}
            markedDates={{
              [value]: { selected: true, selectedColor: "#FF941A" }, // brand.primary
            }}
          />
          <TouchableOpacity
            onPress={closeModal}
            className="bg-light-brand-primary dark:bg-dark-brand-primary py-3 mt-4 rounded-xl"
          >
            <Text className="text-light-typography-inverse dark:text-dark-typography-inverse text-center font-semibold text-lg">
              Fechar
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
