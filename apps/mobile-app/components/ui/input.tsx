import { Text, TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/lib/cn";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export function Input({ label, error, containerClassName, className, ...props }: InputProps) {
  return (
    <View className={cn("gap-1.5", containerClassName)}>
      {label ? <Text className="text-sm font-medium text-foreground">{label}</Text> : null}
      <TextInput
        placeholderTextColor="#a1a1aa"
        className={cn(
          "rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground",
          error && "border-destructive",
          className,
        )}
        {...props}
      />
      {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
    </View>
  );
}
