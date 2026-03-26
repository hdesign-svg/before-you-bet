"use client";

import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import s from "./GameHero.module.css";

type GameHeroProps = {
  awayName: string;
  homeName: string;
  awayLogo: string;
  homeLogo: string;
  awayRecord?: string;
  homeRecord?: string;
  /** Primary color hex for away team */
  awayColor: string;
  /** Primary color hex for home team */
  homeColor: string;
  time: string;
  venue?: string;
  network?: string;
};

export function GameHero({
  awayName,
  homeName,
  awayLogo,
  homeLogo,
  awayRecord,
  homeRecord,
  awayColor,
  homeColor,
  time,
  venue,
  network,
}: GameHeroProps) {
  return (
    <div className={s.hero}>
      {/* Diagonal team color wash — away left, home right */}
      <div
        className={s.colorWash}
        style={{
          background: `linear-gradient(135deg, ${awayColor}18 0%, transparent 45%, transparent 55%, ${homeColor}18 100%)`,
        }}
      />

      <div className={s.matchup}>
        <div className={s.team}>
          <Image
            src={awayLogo}
            alt={awayName}
            width={48}
            height={48}
            className={s.logo}
            unoptimized
          />
          <div className={s.teamName}>{awayName}</div>
          {awayRecord && <div className={s.record}>{awayRecord}</div>}
        </div>

        <div className={s.vs}>
          <span className={s.atSign}>@</span>
        </div>

        <div className={s.team}>
          <Image
            src={homeLogo}
            alt={homeName}
            width={48}
            height={48}
            className={s.logo}
            unoptimized
          />
          <div className={s.teamName}>{homeName}</div>
          {homeRecord && <div className={s.record}>{homeRecord}</div>}
        </div>
      </div>

      <div className={s.meta}>
        <span className={s.metaItem}>
          <Clock size={12} />
          {time}
        </span>
        {venue && (
          <span className={s.metaItem}>
            <MapPin size={12} />
            {venue}
          </span>
        )}
        {network && <span className={s.metaItem}>{network}</span>}
      </div>
    </div>
  );
}
