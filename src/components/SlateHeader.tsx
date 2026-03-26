"use client";

import s from "./SlateHeader.module.css";

type SlateHeaderProps = {
  label: string;
  count?: number;
};

export function SlateHeader({ label, count }: SlateHeaderProps) {
  return (
    <div className={s.header}>
      <span className={s.label}>{label}</span>
      {count != null && <span className={s.count}>{count}</span>}
    </div>
  );
}
