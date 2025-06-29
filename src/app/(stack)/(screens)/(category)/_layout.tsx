import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function CategoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Categorias",
          header: (props) => <Header subTitle={"Gerencia todas as suas categorias"} {...props} />,
        }}
      />
    </Stack>
  );
}
