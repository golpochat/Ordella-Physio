import { Modal as RNModal, Pressable, Text, View, type ModalProps as RNModalProps } from "react-native";
import { Button } from "@/components/ui/button";

type ModalProps = RNModalProps & {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
};

export function Modal({
  title,
  description,
  visible,
  onClose,
  onConfirm,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  children,
  ...props
}: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose} {...props}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <Pressable className="rounded-t-3xl bg-background p-6" onPress={(event) => event.stopPropagation()}>
          <View className="mb-4 h-1 w-12 self-center rounded-full bg-muted" />
          <Text className="text-lg font-semibold text-foreground">{title}</Text>
          {description ? <Text className="mt-1 text-sm text-muted-foreground">{description}</Text> : null}
          <View className="mt-4">{children}</View>
          <View className="mt-6 flex-row gap-3">
            <View className="flex-1">
              <Button label={cancelLabel} variant="outline" onPress={onClose} />
            </View>
            {onConfirm ? (
              <View className="flex-1">
                <Button label={confirmLabel} onPress={onConfirm} />
              </View>
            ) : null}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
