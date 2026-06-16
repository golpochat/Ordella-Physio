import { redirect } from "next/navigation";

type StartTrialPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StartTrialPage({ searchParams }: StartTrialPageProps) {
  const params = (await searchParams) ?? {};
  const query = new URLSearchParams();

  if (typeof params.plan === "string") {
    query.set("plan", params.plan);
  }

  query.set("cycle", typeof params.cycle === "string" ? params.cycle : "yearly");
  query.set("intent", "trial");

  redirect(`/checkout?${query.toString()}`);
}
