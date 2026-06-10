import { Pressable, Text, View } from "react-native";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/helpers";

type PatientItemProps = {
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  onPress?: () => void;
};

export function PatientItem({ name, email, phone, lastVisit, onPress }: PatientItemProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <Avatar name={name} />
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{name}</Text>
        <Text className="text-sm text-muted-foreground">{email}</Text>
        <Text className="text-xs text-muted-foreground">{phone}</Text>
      </View>
      <Text className="text-xs text-muted-foreground">Last visit {formatDate(lastVisit)}</Text>
    </Pressable>
  );
}
