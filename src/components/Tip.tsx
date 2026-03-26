"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import s from "./Tip.module.css";

type TipProps = {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

export function TipProvider({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={300}>{children}</Tooltip.Provider>
  );
}

export function Tip({ content, children, side = "top" }: TipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={s.content} side={side} sideOffset={6}>
          {content}
          <Tooltip.Arrow className={s.arrow} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
