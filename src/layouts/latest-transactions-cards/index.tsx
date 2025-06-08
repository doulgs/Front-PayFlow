import { Card } from "@/components/ui/cards";
import { useCurrency } from "@/hooks/useCurrency";
import { useTheme } from "@/hooks/useTheme";
import { useVisibilityStore } from "@/storages/useVisibilityStore";
import { FinanceTransaction } from "@/types/finance";
import clsx from "clsx";
import { LayoutList } from "lucide-react-native";
import { View } from "react-native";

const RECORD_DISPLAY_LIMIT = 7;

type LatestTransactionsProps = {
  data: FinanceTransaction[];
};

const LatestTransactions: React.FC<LatestTransactionsProps> = ({ data }) => {
  const { currentTheme } = useTheme();
  const { formatCurrency } = useCurrency();
  const { isVisible } = useVisibilityStore();

  return (
    <>
      <Card variant="outlined">
        <Card.Header className="items-center px-1 gap-2">
          <Card.Icon>
            <LayoutList size={20} color={currentTheme === "dark" ? "white" : "black"} />
          </Card.Icon>
          <Card.Text className="text-lg font-semibold">Ultimos lancamentos</Card.Text>
        </Card.Header>

        <Card.Body>
          <Card.Map
            variant="ghost"
            className="px-1"
            items={data.slice(0, RECORD_DISPLAY_LIMIT)}
            renderItem={(item) => (
              <Card key={item.id} variant="ghost" className="p-0" onPress={() => console.log(`teste`)}>
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
              </Card>
            )}
          />
        </Card.Body>

        {data.length >= RECORD_DISPLAY_LIMIT && (
          <Card.Footer className="items-center justify-center">
            <Card.Text>Ver Mais</Card.Text>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export { LatestTransactions };
