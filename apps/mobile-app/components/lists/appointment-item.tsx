import { Pressable, Text, View } from "react-native";
import { formatDate, formatTime } from "@/lib/helpers";
import { Avatar } from "@/components/ui/avatar";

type AppointmentItemProps = {
  patientName: string;
  therapistName: string;
  startsAt: string;
  status: string;
  type: string;
  onPress?: () => void;
};

export function AppointmentItem({
  patientName,
  therapistName,
  startsAt,
  status,
  type,
  onPress,
}: AppointmentItemProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <Avatar name={patientName} />
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{patientName}</Text>
        <Text className="text-sm text-muted-foreground">{type}</Text>
        <Text className="mt-1 text-xs text-muted-foreground">
          {formatDate(startsAt)} · {formatTime(startsAt)} · {therapistName}
        </Text>
      </View>
      <View className="rounded-full bg-primary/10 px-2 py-1">
        <Text className="text-xs font-medium capitalize text-primary">{status}</Text>
      </View>
    </Pressable>
  );
}
