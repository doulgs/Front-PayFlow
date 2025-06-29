import { Avatar } from "@/components/ui/avatar";
import { useGreeting } from "@/hooks/useGreeting";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const Header = () => {
  const { greeting } = useGreeting();
  return (
    <View className="flex-row justify-between items-center pt-4 px-6">
      <View className="flex-row items-center justify-center gap-2">
        <Avatar fallback="Douglas" imageUrl={"https://avatars.githubusercontent.com/u/211727442?v=4"} />
        <View>
          <Text className="text-bold text-xl text-gray-50">{greeting}</Text>
          <Text className="text-bold text-sm text-gray-50">Douglas Domiciano</Text>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="w-12 h-10 items-end justify-center"
          onPress={() => router.navigate("/(stack)/(screens)/(notification)")}
        >
          <Bell color={"#FFF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
