import React from "react";

import { AccountInfo } from "@/components/dashboard/account-info";
import { ActionsBar } from "@/components/dashboard/actions-bar";
import { Activities } from "@/components/dashboard/activities";
import { FloatingMenu } from "@/components/dashboard/floating-menu";
import { Header } from "@/components/dashboard/header";
import { GradientLinear } from "@/components/ui/overlay/gradient-linear";
import { getStatusBarHeight } from "@/utils/safe-area";
import { View } from "react-native";

const Dashboard = () => {
  const top = getStatusBarHeight();
  return (
    <GradientLinear className="flex-1">
      <View style={{ paddingTop: top }} />
      <Header />
      <AccountInfo />
      <ActionsBar />
      <Activities />
      <FloatingMenu />
    </GradientLinear>
  );
};

export default Dashboard;
