import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { clsx } from "clsx";
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  options?: DropdownItem[];
  title?: string;
  clear?: () => void;
}

export const MultiSelectInput = ({
  value,
  onChange,
  placeholder = "Selecionar",
  options = [],
  title = "Selecionar opções",
}: MultiSelectProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%", "60%", "80%", "95%"], []);
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const toggleSelection = (item: DropdownItem) => {
    const alreadySelected = selected.includes(item.value);
    const updated = alreadySelected ? selected.filter((val) => val !== item.value) : [...selected, item.value];
    setSelected(updated);
  };

  const applySelection = () => {
    onChange(selected);
    closeModal();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: DropdownItem }) => {
      const isSelected = selected.includes(item.value);
      return (
        <TouchableOpacity
          className="flex-row justify-between items-center px-4 py-3 border-b border-light-stroke-default dark:border-dark-stroke-default"
          onPress={() => toggleSelection(item)}
        >
          <Text className="text-base text-light-typography-primary dark:text-dark-typography-primary">
            {item.label}
          </Text>
          {isSelected && <Ionicons name="checkmark" size={20} color="#FF941A" />}
        </TouchableOpacity>
      );
    },
    [selected]
  );

  const selectedLabels =
    options
      ?.filter((o) => value.includes(o.value))
      .map((o) => o.label)
      .join(" | ") ?? "";

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text
          className={clsx(
            "flex-1 text-base",
            value.length > 0
              ? "text-light-typography-primary dark:text-dark-typography-primary"
              : "text-light-typography-muted dark:text-dark-typography-muted"
          )}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedLabels || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: "#D1D5DB", // stroke.default
          borderWidth: 1,
        }}
      >
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-light-stroke-default dark:border-dark-stroke-default">
          <Text className="font-bold text-xl text-light-typography-primary dark:text-dark-typography-primary">
            {title}
          </Text>
          <TouchableOpacity
            className="bg-light-brand-primary dark:bg-dark-brand-primary p-2 rounded-lg"
            onPress={applySelection}
          >
            <Text className="text-light-typography-inverse dark:text-dark-typography-inverse text-center font-semibold text-base">
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList data={options} keyExtractor={(item) => item.value} renderItem={renderItem} />
      </BottomSheetModal>
    </>
  );
};
