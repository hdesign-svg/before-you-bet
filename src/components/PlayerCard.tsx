"use client";

import Image from "next/image";
import { getPlayerHeadshot } from "@/data/players";
import s from "./PlayerCard.module.css";

type Projection = {
  label: string;
  value: string;
  range?: string;
};

type PlayerCardProps = {
  name: string;
  position: string;
  team: string;
  matchup?: string;
  verdict: string;
  projections: Projection[];
};

export function PlayerCard({
  name,
  position,
  matchup,
  verdict,
  projections,
}: PlayerCardProps) {
  const headshot = getPlayerHeadshot(name);

  return (
    <div className={s.card}>
      <span className={s.badge}>{position}</span>
      <div className={s.top}>
        {headshot && (
          <Image
            src={headshot}
            alt={name}
            width={44}
            height={33}
            className={s.headshot}
            unoptimized
          />
        )}
        <div>
          <div className={s.name}>{name}</div>
          {matchup && <div className={s.context}>{matchup}</div>}
        </div>
      </div>
      <p className={s.verdict}>{verdict}</p>
      <div className={s.projections}>
        {projections.map((p) => (
          <div key={p.label} className={s.projCell}>
            <div className={s.projPrefix}>Proj.</div>
            <div className={s.projLabel}>{p.label}</div>
            <div className={s.projValue}>{p.value}</div>
            {p.range && <div className={s.projRange}>{p.range}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
