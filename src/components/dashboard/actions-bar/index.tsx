import { Button } from "@/components/ui/button";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowUpDown, Boxes, CreditCard, Settings } from "lucide-react-native";
import { FlatList, View } from "react-native";

interface actionsProps {
  id: string;
  label: string;
  action: () => void;
  icon: React.ReactNode;
}

export const ActionsBar = () => {
  const action: actionsProps[] = [
    {
      id: "1",
      label: "Extrato",
      action: () => router.navigate("/(stack)/(screens)/(extract)"),
      icon: <ArrowUpDown color={"#FFF"} size={18} />,
    },
    {
      id: "2",
      label: "Contas",
      action: () => router.navigate("/(stack)/(screens)/(account)"),
      icon: <CreditCard color={"#FFF"} size={18} />,
    },
    {
      id: "3",
      label: "Categorias",
      action: () => router.navigate("/(stack)/(screens)/(category)"),
      icon: <Boxes color={"#FFF"} size={18} />,
    },
    {
      id: "4",
      label: "Configurações",
      action: () => router.navigate("/(stack)/(screens)/(profile)"),
      icon: <Settings color={"#FFF"} size={18} />,
    },
  ];

  return (
    <View className="bg-highlight-secondary pl-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={action}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <>
              {item.id == "4" && <View className="w-0.5 h-fit mt-4 ml-2 mb-4 bg-gray-300" />}
              <Button
                variant="ghost"
                title={item.label}
                leftIcon={item.icon}
                className="py-6 px-4"
                onPress={item.action}
              />
            </>
          );
        }}
      />
    </View>
  );
};
