import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function LaucherLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Transações",
          header: (props) => <Header subTitle={"Detalhes das transações"} {...props} />,
        }}
      />
    </Stack>
  );
}
