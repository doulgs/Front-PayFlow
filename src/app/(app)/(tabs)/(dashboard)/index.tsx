import React, { useState } from "react";
import { ScrollView } from "react-native";

import { FinancialTransactionCards } from "@/layouts/financial-transaction-cards";

export default function Index() {
  const [financialMovement, setFinancialMovement] = useState({
    entries: 2500,
    exits: 1250,
  });

  return (
    <ScrollView className="bg-light-background-secondary dark:bg-dark-background-alternative p-4">
      <FinancialTransactionCards entries={financialMovement.entries} exits={financialMovement.exits} />
    </ScrollView>
  );
}
