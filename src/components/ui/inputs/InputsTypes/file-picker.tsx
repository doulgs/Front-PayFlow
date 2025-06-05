import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { clsx } from "clsx";
interface FilePickerInputProps {
  value: { name: string; base64: string }[];
  onChange: (value: { name: string; base64: string }[]) => void;
  placeholder?: string;
  clear?: () => void;
}

export const FilePickerInput = ({ value, onChange, placeholder = "Selecionar Arquivo" }: FilePickerInputProps) => {
  const handlePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (result.assets && result.assets[0].uri && result.assets[0].name) {
      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name;
      const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: "base64" });
      onChange([...value, { name: fileName, base64 }]);
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        className={clsx("flex-row items-center justify-between p-3 rounded-md", { "border-b-0": value.length > 0 })}
        onPress={handlePick}
      >
        <Text className="text-light-typography-primary dark:text-dark-typography-primary font-semibold text-base">
          {placeholder}
        </Text>
        <View className="bg-light-brand-primary dark:bg-dark-brand-primary rounded-md p-1">
          <Ionicons name="add" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {value.length > 0 && (
        <View className="mt-2 space-y-2">
          {value.map((file, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between px-4 py-2 bg-light-surface-card dark:bg-dark-surface-card rounded-md"
            >
              <Text
                numberOfLines={1}
                className="text-light-typography-secondary dark:text-dark-typography-secondary text-sm flex-1 mr-3"
              >
                {file.name}
              </Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Ionicons name="close" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
