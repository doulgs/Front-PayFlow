import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Configurações",
          header: (props) => <Header subTitle={"Controle tudo em um só lugar"} {...props} />,
        }}
      />
    </Stack>
  );
}
