"use client";

import { Star } from "lucide-react";
import s from "./InsightCard.module.css";

type InsightCardProps = {
  verdict: string;
  summary: string;
  points: string[];
};

export function InsightCard({ verdict, summary, points }: InsightCardProps) {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <span className={s.label}>Quick Take</span>
      </div>
      <h2 className={s.verdict}>{verdict}</h2>
      <p className={s.summary}>{summary}</p>
      <ul className={s.points}>
        {points.map((point, i) => (
          <li key={i} className={s.point}>
            <Star size={12} className={s.pointIcon} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
