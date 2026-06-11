"use client";

import { useState } from "react";
import { Eye, EyeOff } from "@ordella/shared-icons";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export type PasswordInputProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
};

export function PasswordInput({
  id,
  label = "Password",
  value,
  onChange,
  onBlur,
  error,
  autoComplete = "current-password",
  placeholder,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-field-stack">
      <Label htmlFor={id}>{label}</Label>
      <div className="auth-password-field">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={cn("auth-password-input", error && "border-red-500")}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="auth-field-error">{error}</p> : null}
    </div>
  );
}
