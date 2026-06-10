import type { ComponentPropsWithoutRef } from "react";

type MDXComponents = Record<string, React.ComponentType<ComponentPropsWithoutRef<"div">>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="font-display text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold">{children}</h2>,
    p: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
    ...components,
  };
}
