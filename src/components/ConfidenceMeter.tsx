"use client";

import s from "./ConfidenceMeter.module.css";

type ConfidenceMeterProps = {
  /** 0–100 confidence value */
  value: number;
  label?: string;
};

function getTier(v: number): "high" | "mid" | "low" {
  if (v >= 70) return "high";
  if (v >= 40) return "mid";
  return "low";
}

export function ConfidenceMeter({ value, label }: ConfidenceMeterProps) {
  const tier = getTier(value);

  return (
    <div className={s.container}>
      {label && <div className={s.label}>{label}</div>}
      <div className={s.row}>
        <div className={s.track}>
          <div
            className={`${s.fill} ${s[tier]}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className={`${s.value} ${s[tier]}`}>{value}%</span>
      </div>
    </div>
  );
}
