"use client";
import { useState } from "react";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import VariantD from "./variants/VariantD";
import VariantE from "./variants/VariantE";
import { FeedbackOverlay } from "./FeedbackOverlay";

const VARIANTS = [
  { id: "A", label: "Editorial Magazine", desc: "Hero feature game + supporting card grid. The Athletic × Apple.", component: VariantA },
  { id: "B", label: "Scoreboard List", desc: "Dark mode, horizontal scoreboard-style rows. ESPN × Linear.", component: VariantB },
  { id: "C", label: "Split-Panel", desc: "Persistent sidebar list + inline detail panel. Linear × Stripe.", component: VariantC },
  { id: "D", label: "Inline Expansion", desc: "Cards expand in place to show detail. Apple × Stripe.", component: VariantD },
  { id: "E", label: "Bold Poster", desc: "Oversized type, dramatic strips, magazine cover energy. The Athletic × Brutalism.", component: VariantE },
];

export default function DesignLabPage() {
  const [activeTab, setActiveTab] = useState("A");
  const active = VARIANTS.find((v) => v.id === activeTab)!;
  const ActiveComponent = active.component;

  return (
    <div style={{ minHeight: "100dvh", background: "#F5F2ED", fontFamily: '"Geist", -apple-system, sans-serif' }}>
      {/* Lab header */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(245,242,237,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E0DDD6",
        padding: "12px 24px",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#E31837",
              background: "rgba(227,24,55,0.08)",
              padding: "4px 8px",
              borderRadius: 4,
            }}>
              Design Lab
            </span>
            <span style={{ fontSize: 13, color: "#555" }}>
              Before You Bet — Full Redesign
            </span>
          </div>

          {/* Variant tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveTab(v.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: activeTab === v.id ? "#111" : "transparent",
                  color: activeTab === v.id ? "#fff" : "#555",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 150ms ease-out",
                }}
              >
                {v.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active variant description */}
        <div style={{
          maxWidth: 1200,
          margin: "8px auto 0",
          display: "flex",
          gap: 8,
          alignItems: "baseline",
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
            Variant {active.id}: {active.label}
          </span>
          <span style={{ fontSize: 12, color: "#999" }}>{active.desc}</span>
        </div>
      </div>

      {/* Variant content */}
      <div data-variant={activeTab}>
        <ActiveComponent />
      </div>

      {/* Feedback overlay */}
      <FeedbackOverlay targetName="BeforeYouBet" />
    </div>
  );
}
