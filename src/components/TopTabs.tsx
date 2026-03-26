"use client";

import * as Tabs from "@radix-ui/react-tabs";
import s from "./TopTabs.module.css";

type Tab = {
  value: string;
  label: string;
  count?: number;
};

type TopTabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

export function TopTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  children,
}: TopTabsProps) {
  return (
    <Tabs.Root
      defaultValue={defaultValue ?? tabs[0]?.value}
      value={value}
      onValueChange={onValueChange}
    >
      <Tabs.List className={s.list}>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className={s.trigger}>
            <span>{tab.label}</span>
            {tab.count != null && (
              <span className={s.count}>{tab.count}</span>
            )}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export const TabContent = Tabs.Content;
