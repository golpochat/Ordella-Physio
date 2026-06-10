import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/cn";

type HeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
};

export function Header({ title, subtitle, rightSlot, className }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn("border-b border-border bg-background px-4 pb-4", className)}
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-2xl font-bold text-foreground">{title}</Text>
          {subtitle ? <Text className="mt-1 text-sm text-muted-foreground">{subtitle}</Text> : null}
        </View>
        {rightSlot}
      </View>
    </View>
  );
}
