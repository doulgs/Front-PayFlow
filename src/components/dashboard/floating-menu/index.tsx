import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react-native";

export const FloatingMenu = () => {
  return (
    <Button
      className="absolute bottom-6 right-6 w-32 h-14 rounded-xl items-center justify-center shadow"
      title="Menu"
      textVariant="default"
      leftIcon={<Menu color={"#FFF"} />}
    />
  );
};
