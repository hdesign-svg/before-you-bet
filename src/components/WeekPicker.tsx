"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./WeekPicker.module.css";

type WeekPickerProps = {
  label: string;
  sublabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export function WeekPicker({
  label,
  sublabel,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: WeekPickerProps) {
  return (
    <div className={s.picker}>
      <button
        className={s.arrow}
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous week"
        type="button"
      >
        <ChevronLeft size={16} />
      </button>
      <div className={s.center}>
        <span className={s.label}>{label}</span>
        {sublabel && <span className={s.sub}>{sublabel}</span>}
      </div>
      <button
        className={s.arrow}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next week"
        type="button"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
