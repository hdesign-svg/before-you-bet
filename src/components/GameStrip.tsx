"use client";

import Image from "next/image";
import s from "./GameStrip.module.css";

type GameStripProps = {
  time: string;
  period: string;
  awayLogo: string;
  homeLogo: string;
  awayName: string;
  homeName: string;
  headline: string;
  /** 0–100 confidence level for lean indicator */
  confidence?: number;
  onClick?: () => void;
};

export function GameStrip({
  time,
  period,
  awayLogo,
  homeLogo,
  awayName,
  homeName,
  headline,
  confidence,
  onClick,
}: GameStripProps) {
  return (
    <button className={s.strip} onClick={onClick} type="button">
      <div className={s.content}>
        <div className={s.time}>
          <span className={s.timeVal}>{time}</span>
          <span className={s.timePeriod}>{period}</span>
        </div>
        <div className={s.logos}>
          <Image
            src={awayLogo}
            alt=""
            width={28}
            height={28}
            className={s.logo}
            unoptimized
          />
          <Image
            src={homeLogo}
            alt=""
            width={28}
            height={28}
            className={s.logo}
            unoptimized
          />
        </div>
        <div className={s.body}>
          <div className={s.teams}>
            {awayName} at {homeName}
          </div>
          <p className={s.headline}>{headline}</p>
        </div>
        {confidence != null && (
          <div className={s.leanMini}>
            <div className={s.leanBar}>
              <div
                className={s.leanFill}
                style={{
                  height: `${confidence}%`,
                  backgroundColor:
                    confidence >= 70
                      ? "var(--live)"
                      : confidence >= 40
                        ? "var(--caution)"
                        : "var(--error)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
