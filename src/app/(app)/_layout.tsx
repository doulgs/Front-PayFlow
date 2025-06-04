import { TabHeader } from "@/components/headers/tab-header";
import { CustomTabBar } from "@/components/tabs";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: "Dashboard",
          header: (props) => <TabHeader hideBackButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="(laucher)/index"
        options={{
          title: "Laucher",
          header: (props) => <TabHeader hideBackButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="(settings)/index"
        options={{
          title: "Settings",
          header: (props) => <TabHeader hideBackButton {...props} />,
        }}
      />
    </Tabs>
  );
}
