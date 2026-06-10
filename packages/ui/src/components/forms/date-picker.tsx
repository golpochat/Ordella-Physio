import * as React from "react";
import { Input, Label } from "./input";
import { cn } from "../../utils/cn";

export type DatePickerProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function DatePicker({ id, label, value, onChange, className }: DatePickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input id={id} type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
