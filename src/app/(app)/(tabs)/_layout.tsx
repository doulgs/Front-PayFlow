import { Header } from "@/components/header";
import { CustomTabBar } from "@/components/tab";
import { Tabs } from "expo-router";
import { Bell, HelpCircle } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: "Dashboard",
          header: (props) => (
            <Header
              subTitle={"Douglas Domiciano"}
              imageAvatar={"https://avatars.githubusercontent.com/u/54917227?v=4"}
              hideBackButton
              showImageAvatar
              actions={[
                {
                  action: () => {},
                  icon: <HelpCircle size={24} color="white" />,
                },
                {
                  action: () => {},
                  icon: <Bell size={24} color="white" />,
                },
              ]}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(new)/index"
        options={{
          title: "Laucher",
          header: (props) => <Header hideBackButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="(overview)/index"
        options={{
          title: "Overview",
          header: (props) => <Header hideBackButton {...props} />,
        }}
      />
    </Tabs>
  );
}
