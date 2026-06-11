"use client";

import { getVariant } from "@/app/(marketing)/experiments/ab";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export type ExperimentProps = {
  id: string;
  A: ReactNode;
  B: ReactNode;
  variants?: [string, string];
};

export default function Experiment({ id, A, B, variants = ["A", "B"] }: ExperimentProps) {
  const [variant, setVariant] = useState<string>(variants[0]);

  useEffect(() => {
    setVariant(getVariant(id, variants));
  }, [id, variants]);

  if (variant === variants[1]) {
    return B;
  }

  return A;
}
