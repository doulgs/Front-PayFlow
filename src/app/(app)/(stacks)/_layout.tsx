import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(launcher)/index"
        options={{
          title: "Lançamento",
          header: (props) => <Header subTitle="Realizar lançamento" {...props} />,
        }}
      />
      <Stack.Screen
        name="(notification)/index"
        options={{
          title: "Notificações",
          header: (props) => <Header subTitle="Acompanhe suas notificações" {...props} />,
        }}
      />
      <Stack.Screen
        name="(profile)/index"
        options={{
          title: "Perfil",
          header: (props) => <Header subTitle="Detalhes do perfil do usuário" {...props} />,
        }}
      />
    </Stack>
  );
}
