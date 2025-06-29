import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contas",
          header: (props) => <Header subTitle={"Detalhes das contas"} {...props} />,
        }}
      />
    </Stack>
  );
}
