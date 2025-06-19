import React from "react";
import { ScrollView, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/cards";
import { Bell, Edit2, HelpCircle, Info, Lock, LogOut, Settings } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const { iconColor, palette } = useTheme();
  return (
    <ScrollView className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative p-4">
      <Card className="flex-1 flex-row items-center gap-4 mb-8">
        <Avatar size={70} name="Douglas Souza" className="border border-gray-300" />
        <View>
          <Card.Text className="text-xl font-bold text-gray-900 dark:text-white">Douglas Domiciano</Card.Text>
          <Card.Text className="text-gray-700 dark:text-gray-300">Email: douglas.domiciano</Card.Text>
          <Card.Text className="text-gray-700 dark:text-gray-300">CPF: 116.050.599-35</Card.Text>
        </View>
      </Card>

      <View className="gap-4 mb-8">
        <Card.Text className=" text-lg font-bold">Perfil</Card.Text>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Editar Perfil</Card.Text>
          <Card.Icon>
            <Edit2 size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Trocar Senha</Card.Text>
          <Card.Icon>
            <Lock size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Preferências</Card.Text>
          <Card.Icon>
            <Settings size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
      </View>

      <View className="gap-4 mb-8">
        <Card.Text className="text-lg font-bold">Outros</Card.Text>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Suporte</Card.Text>
          <Card.Icon>
            <HelpCircle size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Notificações</Card.Text>
          <Card.Icon>
            <Bell size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
        <Card className="flex-row items-center justify-between">
          <Card.Text>Sobre o App</Card.Text>
          <Card.Icon>
            <Info size={18} color={palette.brand.primary} />
          </Card.Icon>
        </Card>
      </View>

      <Card className="flex-row items-center justify-between border border-red-300 mt-4">
        <Card.Text variant="danger">Sair da Conta</Card.Text>
        <Card.Icon>
          <LogOut size={18} color={palette.status.danger} />
        </Card.Icon>
      </Card>
    </ScrollView>
  );
}
