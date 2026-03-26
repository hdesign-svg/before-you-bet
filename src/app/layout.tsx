import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before You Bet",
  description:
    "Understand your bets in minutes. Plain-English game breakdowns and player insights \u2014 no jargon, no confusion.",
};

export const viewport: Viewport = {
  themeColor: "#f4f5f7",
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
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;window.addEventListener("scroll",function(){document.documentElement.classList.add("is-scrolling");clearTimeout(t);t=setTimeout(function(){document.documentElement.classList.remove("is-scrolling")},800)},{passive:true})})()`,
          }}
        />
      </body>
    </html>
  );
}
