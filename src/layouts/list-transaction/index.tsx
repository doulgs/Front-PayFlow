import ImageNoData from "@/assets/images/research-paper-amico.svg";
import { Button } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { BottomSheetRef, useBottomSheet } from "@/hooks/useBottomSheet";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCurrency } from "@/hooks/useCurrency";
import { useTheme } from "@/hooks/useTheme";
import { useVisibilityStore } from "@/storages/useVisibilityStore";
import { FinanceTransaction } from "@/types/finance";
import { clsx } from "clsx";
import { LayoutList, Trash2 } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

const RECORD_DISPLAY_LIMIT = 7;

type LatestTransactionsProps = {
  data: FinanceTransaction[];
  isLoading?: boolean;
};

const ListTransactions: React.FC<LatestTransactionsProps> = ({ data, isLoading = false }) => {
  const { t } = useChangeLanguage();
  const { palette, iconColor } = useTheme();
  const { formatCurrency } = useCurrency();
  const { isVisible } = useVisibilityStore();

  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<FinanceTransaction | null>(null);

  const { BottomSheet, open } = useBottomSheet(bottomSheetRef);

  const handleOpenDetails = (item: FinanceTransaction) => {
    setSelectedTransaction({ ...item });
  };

  useEffect(() => {
    if (selectedTransaction) open();
  }, [selectedTransaction]);

  const hasNoData = !isLoading && data.length === 0;

  return (
    <>
      <Card variant="outlined">
        <Card.Header className="items-center px-1 gap-2">
          <Card.Icon>
            <LayoutList size={18} color={iconColor} />
          </Card.Icon>
          <Card.Text className="text-lg font-semibold">{t("finance.latest.title")}</Card.Text>
        </Card.Header>

        {isLoading ? (
          <Card.Body className="items-center justify-center my-6">
            <ActivityIndicator size="large" color={palette.brand.primary} />
            <Card.Text className="mt-2 text-sm text-muted">{t("finance.latest.loading")}</Card.Text>
          </Card.Body>
        ) : hasNoData ? (
          <Card.Body className="flex-1 items-center justify-center min-h-[300px]">
            <ImageNoData width={200} height={200} />
            <Card.Footer className="mt-2">
              <Card.Text>{t("finance.latest.empty")}</Card.Text>
            </Card.Footer>
          </Card.Body>
        ) : (
          <>
            <Card.Body>
              <Card.Map
                variant="ghost"
                className="px-1"
                items={data.slice(0, RECORD_DISPLAY_LIMIT)}
                renderItem={(item) => (
                  <TouchableOpacity key={item.id} onPress={() => handleOpenDetails(item)}>
                    <Card.Body className="flex-row items-center justify-between gap-2">
                      <Card.Icon variant="outlined">
                        <Card.Text>
                          {item.title
                            .split(" ")
                            .slice(0, 2)
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("")}
                        </Card.Text>
                      </Card.Icon>

                      <View className="flex-1 mr-4">
                        <Card.Text
                          numberOfLines={1}
                          className={clsx(
                            "text-md font-bold",
                            item.status === "paid" && "text-zinc-300 dark:text-zinc-600 line-through"
                          )}
                        >
                          {item.title}
                        </Card.Text>
                        <Card.Text
                          numberOfLines={1}
                          className={clsx(
                            "text-sm",
                            item.status === "paid" && "text-zinc-300 dark:text-zinc-600 line-through"
                          )}
                        >
                          {item.description}
                        </Card.Text>
                      </View>

                      <View className="items-end">
                        <Card.Text
                          numberOfLines={1}
                          className={clsx(
                            "text-lg font-bold",
                            item.status === "paid" && "text-zinc-300 dark:text-zinc-600 line-through"
                          )}
                        >
                          {isVisible ? "*******" : formatCurrency(item.value)}
                        </Card.Text>
                      </View>
                    </Card.Body>
                  </TouchableOpacity>
                )}
              />
            </Card.Body>

            {data.length > RECORD_DISPLAY_LIMIT && (
              <Card.Footer className="items-center justify-center">
                <Card.Text>{t("finance.latest.see-more")}</Card.Text>
              </Card.Footer>
            )}
          </>
        )}
      </Card>

      <BottomSheet
        title="Detalhes"
        render={
          selectedTransaction && (
            <Card variant="ghost" className="p-0">
              <View className="py-4 px-6 items-center justify-center">
                <Card.Text className="items-center text-center text-2xl">
                  A conta <Card.Text className="font-bold">{selectedTransaction.title}</Card.Text>
                  {"\n"}
                  no valor de{" "}
                  <Card.Text className="font-bold">{formatCurrency(selectedTransaction.value ?? 0)}</Card.Text>
                  {"\n"}
                  foi pago ?
                </Card.Text>
              </View>
              <Card.Body className="flex-row gap-4 my-4">
                <Button className="flex-1" variant="outline" title="Ainda nao" onPress={() => {}} />
                <Button className="flex-1" title="Sim" onPress={() => {}} />
              </Card.Body>
              <Card.Footer className="border-t border-gray-500/20 dark:border-gray-500/20 p-2">
                <Button
                  title="Deletar"
                  variant="ghost"
                  leftIcon={<Trash2 size={18} color={"red"} />}
                  onPress={() => {}}
                />
              </Card.Footer>
            </Card>
          )
        }
      />
    </>
  );
};

export { ListTransactions };
