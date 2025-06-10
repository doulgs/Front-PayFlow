import { Card } from "@/components/ui/cards";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { View, X } from "lucide-react-native";
import React, { RefObject, useCallback } from "react";

interface BottomSheetProps {
  hideHeader?: boolean;
  title?: string;
  render: React.ReactNode;
}

type BottomSheetHook = {
  open: () => void;
  close: () => void;
  BottomSheet: React.FC<BottomSheetProps>;
};

export const useBottomSheet = (externalRef?: RefObject<BottomSheetModal | null>): BottomSheetHook => {
  const ref = externalRef ?? React.useRef<BottomSheetModal>(null);

  const open = () => ref.current?.present();
  const close = () => ref.current?.dismiss();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  const BottomSheet: React.FC<BottomSheetProps> = ({ hideHeader = false, title, render }) => (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose={true}
      enableDismissOnClose={true}
      animateOnMount={true}
      handleComponent={() => null}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        {hideHeader ? (
          <>{render}</>
        ) : (
          <Card>
            <Card.Header className="items-center justify-between">
              <Card.Text className="text-2xl">{title}</Card.Text>
              <Card.Icon onPress={close}>
                <X size={20} />
              </Card.Icon>
            </Card.Header>
            {render}
          </Card>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );

  return {
    open,
    close,
    BottomSheet,
  };
};

// Exemplo de como usar

// import { useBottomSheet } from "@/hooks/useBottomSheet";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import React, { useRef } from "react";
// import { Button, Text, View } from "react-native";

// export default function Index() {
//   const ref1 = useRef<BottomSheetModal>(null);
//   const ref2 = useRef<BottomSheetModal>(null);

//   const { BottomSheet: Sheet1, open: open1, close: close1 } = useBottomSheet(ref1);
//   const { BottomSheet: Sheet2, open: open2, close: close2 } = useBottomSheet(ref2);

//   return (
//     <>
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
//         <>
//           <Button title="Abrir Sheet 1" onPress={open1} />
//           <Button title="Abrir Sheet 2" onPress={open2} />

//           <Sheet1 title="Primeiro" render={<Text>Oi Sheet 1</Text>} />
//           <Sheet2 title="Segundo" render={<Text>Oi Sheet 2</Text>} />
//         </>
//       </View>
//     </>
//   );
// }
