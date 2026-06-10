import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MOCK_NOTES } from "@/lib/fixtures";
import { QUERY_KEYS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";

export default function NotesScreen() {
  const { t } = useTranslation();

  const { data: notes = MOCK_NOTES } = useQuery({
    queryKey: QUERY_KEYS.notes,
    queryFn: () => fetcher<typeof MOCK_NOTES>("/notes").catch(() => MOCK_NOTES),
  });

  return (
    <View className="flex-1 bg-background">
      <Header
        title={t("notes.title")}
        rightSlot={<Button label="+" size="sm" onPress={() => router.push("/add-note")} />}
      />
      <ScrollView contentContainerClassName="gap-4 p-4 pb-10">
        <View className="flex-row gap-2">
          <Button label={t("notes.soap")} size="sm" variant="outline" />
          <Button label={t("notes.clinical")} size="sm" variant="outline" />
        </View>

        {notes.length ? (
          notes.map((note) => (
            <Card key={note.id}>
              <CardTitle>
                {note.patientName} · {note.type}
              </CardTitle>
              <CardDescription>{note.summary}</CardDescription>
              <Text className="mt-2 text-xs text-muted-foreground">{note.updatedAt}</Text>
            </Card>
          ))
        ) : (
          <Text className="text-center text-muted-foreground">{t("notes.empty")}</Text>
        )}
      </ScrollView>
    </View>
  );
}
