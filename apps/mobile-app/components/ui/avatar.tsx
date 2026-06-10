import { Text, View } from "react-native";
import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/helpers";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <View
      className={cn(
        "items-center justify-center rounded-full bg-primary/10",
        sizeClasses[size],
        className,
      )}
    >
      <Text className={cn("font-semibold text-primary", textSizeClasses[size])}>{getInitials(name)}</Text>
    </View>
  );
}
