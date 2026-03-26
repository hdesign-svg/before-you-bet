"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import s from "./FilterToggle.module.css";

type FilterOption = {
  value: string;
  label: string;
};

type FilterToggleProps = {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
};

export function FilterToggle({
  options,
  value,
  onValueChange,
}: FilterToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) onValueChange(v);
      }}
      className={s.group}
    >
      {options.map((opt) => (
        <ToggleGroup.Item
          key={opt.value}
          value={opt.value}
          className={s.item}
        >
          {opt.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
