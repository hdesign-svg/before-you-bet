"use client";

import s from "./LeanScale.module.css";

type LeanScaleProps = {
  awayAbbr: string;
  homeAbbr: string;
  /** 0 = pure away, 50 = even, 100 = pure home */
  lean: number;
  /** Team color for the dot (hex) */
  dotColor?: string;
};

function getLeanLabel(lean: number): { text: string; type: "favor" | "even" } {
  if (lean <= 30 || lean >= 70) return { text: lean < 50 ? "Away favored" : "Home favored", type: "favor" };
  return { text: "Toss-up", type: "even" };
}

export function LeanScale({ awayAbbr, homeAbbr, lean, dotColor }: LeanScaleProps) {
  const { text, type } = getLeanLabel(lean);

  return (
    <div className={s.container}>
      <div className={s.labelRow}>
        <span className={`${s.tag} ${type === "favor" ? s.tagFavor : s.tagEven}`}>
          {text}
        </span>
      </div>
      <div className={s.row}>
        <span className={s.team}>{awayAbbr}</span>
        <div className={s.track}>
          <div className={s.center} />
          <div
            className={s.dot}
            style={{
              left: `${lean}%`,
              backgroundColor: dotColor || "var(--ink-secondary)",
            }}
          />
        </div>
        <span className={s.team}>{homeAbbr}</span>
      </div>
    </div>
  );
}
