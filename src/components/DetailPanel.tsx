"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import s from "./DetailPanel.module.css";

type DetailPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export function DetailPanel({
  open,
  onOpenChange,
  title,
  children,
}: DetailPanelProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.panel} aria-describedby={undefined}>
          <VisuallyHidden.Root>
            <Dialog.Title>{title}</Dialog.Title>
          </VisuallyHidden.Root>
          <Dialog.Close className={s.close} aria-label="Close">
            <X size={18} />
          </Dialog.Close>
          <div className={s.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
