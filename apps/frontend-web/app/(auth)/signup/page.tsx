import { redirect } from "next/navigation";

type SignupPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = (await searchParams) ?? {};
  const query = new URLSearchParams();

  if (typeof params.plan === "string") {
    query.set("plan", params.plan);
  }

  if (typeof params.cycle === "string") {
    query.set("cycle", params.cycle);
  }

  const intent = typeof params.intent === "string" ? params.intent : "trial";
  query.set("intent", intent);

  if (intent === "checkout" || intent === "trial") {
    redirect(`/checkout?${query.toString()}`);
  }

  redirect(`/register?${query.toString()}`);
}
