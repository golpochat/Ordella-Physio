import { Text, View, type ViewProps } from "react-native";
import { cn } from "@/lib/cn";

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View className={cn("rounded-2xl border border-border bg-card p-4", className)} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn("text-base font-semibold text-card-foreground", className)}>{children}</Text>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn("mt-1 text-sm text-muted-foreground", className)}>{children}</Text>;
}
