import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { ChevronRight, Eye } from "lucide-react-native";
import { Text, View } from "react-native";

export const AccountInfo = () => {
  const { formatCurrency } = useCurrency();
  return (
    <View className="pt-6 px-6 gap-4">
      <Text className="text-white font-bold text-2xl">Conta Corrente</Text>

      <View className="flex-row items-center justify-between border-b pb-4 border-gray-300">
        <View className="gap-1">
          <Text className="text-gray-200 font-bold text-md">saldo atual</Text>
          <Text className="text-white font-bold text-4xl">{formatCurrency(0)}</Text>
        </View>
        <View>
          <Eye color={"#FFF"} />
        </View>
      </View>

      <View className="mt-2 gap-2 mb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-200 font-semibold text-lg">Saldo de entradas</Text>
          <View className="flex-row gap-1 items-center justify-center">
            <Text className="text-white font-semibold text-lg">{formatCurrency(0)}</Text>
            <ChevronRight color={"#FFF"} size={18} />
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-200 font-semibold text-lg">Saldo de saidas</Text>
          <View className="flex-row gap-1 items-center justify-center">
            <Text className="text-white font-semibold text-lg">{formatCurrency(0)}</Text>
            <ChevronRight color={"#FFF"} size={18} />
          </View>
        </View>
      </View>

      {/* <View className="mt-4 mb-8">
        <Button variant="outline" title="Ir para extrato" className="w-40" />
      </View> */}
    </View>
  );
};
