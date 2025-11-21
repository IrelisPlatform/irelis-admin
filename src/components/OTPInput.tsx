// /components/OTPInput.tsx
"use client";
import React from "react";

export default function OTPInput({
  value,
  onChange,
  maxLength = 6,
}: {
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <input
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      className="w-full border p-3 rounded-lg text-center tracking-widest text-lg"
      placeholder={"_".repeat(maxLength)}
    />
  );
}
