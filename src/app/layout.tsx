import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before You Bet",
  description:
    "Understand your bets in minutes. Plain-English game breakdowns and player insights — no jargon, no confusion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
