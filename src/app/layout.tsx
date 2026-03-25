import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before You Bet",
  description:
    "Understand your bets in minutes. Plain-English game breakdowns and player insights \u2014 no jargon, no confusion.",
};

export const viewport: Viewport = {
  themeColor: "#F5F2ED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://a.espncdn.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@100..900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
