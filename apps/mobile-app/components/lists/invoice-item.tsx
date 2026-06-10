import { Pressable, Text, View } from "react-native";
import { formatCurrency, formatDate } from "@/lib/helpers";

type InvoiceItemProps = {
  patientName: string;
  amount: number;
  status: string;
  dueDate: string;
  onPress?: () => void;
};

export function InvoiceItem({ patientName, amount, status, dueDate, onPress }: InvoiceItemProps) {
  const isOutstanding = status === "outstanding";

  return (
    <Pressable onPress={onPress} className="rounded-2xl border border-border bg-card p-4">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="font-semibold text-foreground">{patientName}</Text>
          <Text className="mt-1 text-sm text-muted-foreground">Due {formatDate(dueDate)}</Text>
        </View>
        <Text className="text-base font-bold text-foreground">{formatCurrency(amount)}</Text>
      </View>
      <View className="mt-3 self-start rounded-full bg-primary/10 px-2 py-1">
        <Text className={`text-xs font-medium capitalize ${isOutstanding ? "text-amber-700" : "text-primary"}`}>
          {status}
        </Text>
      </View>
    </Pressable>
  );
}
