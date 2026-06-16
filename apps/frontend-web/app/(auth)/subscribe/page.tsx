import { redirect } from "next/navigation";

type SubscribePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const params = (await searchParams) ?? {};
  const query = new URLSearchParams();

  if (typeof params.plan === "string") {
    query.set("plan", params.plan);
  }

  query.set("cycle", typeof params.cycle === "string" ? params.cycle : "yearly");
  query.set("intent", "checkout");

  redirect(`/checkout?${query.toString()}`);
}
