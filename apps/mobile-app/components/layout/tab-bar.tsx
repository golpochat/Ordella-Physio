import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

const tabLabels: Record<string, string> = {
  index: "tabs.home",
  appointments: "tabs.appointments",
  patients: "tabs.patients",
  billing: "tabs.billing",
  profile: "tabs.profile",
};

type TabBarProps = NonNullable<ComponentProps<typeof Tabs>["tabBar"]> extends (
  props: infer P,
) => unknown
  ? P
  : never;

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row border-t border-border bg-background px-2 pb-2 pt-2">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const labelKey = tabLabels[route.name] ?? route.name;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            className="flex-1 items-center justify-center py-2"
          >
            <Text className={cn("text-xs font-medium", isFocused ? "text-primary" : "text-muted-foreground")}>
              {t(labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
