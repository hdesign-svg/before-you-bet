import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before You Bet",
  description:
    "Plain-English sports betting intelligence. Understand the game before you place the bet.",
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
