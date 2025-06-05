import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { clsx } from "clsx";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { colors as tokens } from "@/styles/colors";
import { Check } from "lucide-react-native";

export type DropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: DropdownItem[];
  title?: string;
  clear?: () => void;
  onSelect?: (item: DropdownItem) => void;
  defaultValue?: string;
}

export const SelectInput = ({
  value,
  onChange,
  placeholder = "Selecione",
  options = [],
  title = "Selecionar uma opção",
  onSelect,
  defaultValue,
}: SelectProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? tokens.dark : tokens.light;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%", "60%", "80%", "95%"], []);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  useEffect(() => {
    if (!value && defaultValue) {
      const defaultItem = options.find((o) => o.value === defaultValue);
      if (defaultItem) {
        onChange(defaultItem.value);
        onSelect?.(defaultItem);
      }
    }
  }, [value, defaultValue, options]);

  const handleSelect = (item: DropdownItem) => {
    onChange("");
    setTimeout(() => {
      onChange(item.value);
      onSelect?.(item);
      closeModal();
    }, 10);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: DropdownItem }) => {
      const isSelected = item.value === value;
      return (
        <TouchableOpacity
          className="flex-row justify-between items-center px-4 py-3 border-b border-slate-500"
          onPress={() => handleSelect(item)}
        >
          <View className="flex-1 flex-row items-center">
            {item.icon && <View className="mr-2">{item.icon}</View>}
            <Text style={{ color: theme.typography.primary, fontSize: 16 }}>{item.label}</Text>
          </View>
          {isSelected && <Check color={theme.brand.primary} />}
        </TouchableOpacity>
      );
    },
    [value, theme]
  );

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text
          className={clsx("flex-1 text-base")}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: value ? theme.typography.primary : theme.typography.muted,
          }}
        >
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.typography.muted} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        backgroundStyle={{
          backgroundColor: theme.background.alternative,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="font-bold text-xl" style={{ color: theme.typography.primary }}>
            {title}
          </Text>
        </View>

        <BottomSheetFlatList
          data={options}
          keyExtractor={(item, index) => String(item.value + item.label + index)}
          renderItem={renderItem}
        />
      </BottomSheetModal>
    </>
  );
};
