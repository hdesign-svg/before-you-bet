"use client";

import s from "./BetLine.module.css";

type BetLineProps = {
  type: "spread" | "moneyline" | "total";
  label: string;
  value: string;
  /** Optional movement indicator: "up" | "down" | "steady" */
  movement?: "up" | "down" | "steady";
};

export function BetLine({ type, label, value, movement }: BetLineProps) {
  return (
    <div className={s.line}>
      <div className={s.type}>{type}</div>
      <div className={s.label}>{label}</div>
      <div className={s.valueRow}>
        <span className={s.value}>{value}</span>
        {movement && movement !== "steady" && (
          <span className={`${s.arrow} ${s[movement]}`}>
            {movement === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </div>
  );
}
