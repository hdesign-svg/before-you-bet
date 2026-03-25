import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before You Bet",
  description:
    "Understand your bets in minutes. Plain-English game breakdowns, odds explained simply, and player insights — no jargon, no fluff.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('byb-theme');
                if (t === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
