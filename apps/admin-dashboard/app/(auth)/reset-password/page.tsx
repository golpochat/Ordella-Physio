"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/forms/input";
import { Form } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/components/i18n-provider";
import { toast } from "@ordella/ui";

type ResetFormValues = {
  email: string;
};

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("auth.resetPassword")}</CardTitle>
          <CardDescription>{t("auth.resetPasswordDescription")}</CardDescription>
        </CardHeader>
        <CardBody>
          <Form<ResetFormValues>
            defaultValues={{ email: "" }}
            onSubmit={async (values) => {
              await resetPassword(values);
              toast({ title: t("auth.resetPasswordSent") });
            }}
            className="space-y-4"
          >
            {(form) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input id="email" type="email" {...form.register("email", { required: true })} />
                </div>
                <Button type="submit" className="w-full">
                  {t("auth.resetPassword")}
                </Button>
              </>
            )}
          </Form>
          <div className="mt-4 text-sm">
            <Link href="/login" className="text-primary hover:underline">
              {t("auth.backToLogin")}
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
