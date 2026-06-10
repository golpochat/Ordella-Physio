"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/forms/input";
import { Form } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/components/i18n-provider";

type LoginFormValues = {
  email: string;
  password: string;
  tenantId: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("auth.login")}</CardTitle>
          <CardDescription>{t("auth.loginDescription")}</CardDescription>
        </CardHeader>
        <CardBody>
          <Form<LoginFormValues>
            defaultValues={{ email: "", password: "", tenantId: "" }}
            onSubmit={(values) => login(values)}
            className="space-y-4"
          >
            {(form) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@clinic.com"
                    {...form.register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input id="password" type="password" {...form.register("password", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantId">{t("auth.tenantId")}</Label>
                  <Input id="tenantId" placeholder="tenant-id" {...form.register("tenantId")} />
                </div>
                <Button type="submit" className="w-full">
                  {t("auth.login")}
                </Button>
              </>
            )}
          </Form>
          <div className="mt-4 text-right text-sm">
            <Link href="/reset-password" className="text-primary hover:underline">
              {t("auth.resetPassword")}
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
