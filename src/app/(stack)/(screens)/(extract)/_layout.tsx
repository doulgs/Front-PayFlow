import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function ExtractLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Extrato",
          header: (props) => <Header subTitle={"Detalhes das transações"} {...props} />,
        }}
      />
    </Stack>
  );
}
