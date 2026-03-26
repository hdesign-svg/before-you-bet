"use client";

import { useState } from "react";
import {
  InsightCard,
  LeanScale,
  PlayerCard,
  GameStrip,
  SlateHeader,
  ConfidenceMeter,
  BetLine,
  GameHero,
  TopTabs,
  TabContent,
  DetailPanel,
  FilterToggle,
  WeekPicker,
  TipProvider,
  Tip,
} from "@/components";
import { teams } from "@/data/teams";
import s from "./page.module.css";

export default function DesignLab() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [posFilter, setPosFilter] = useState("all");
  const [week] = useState(12);

  const kc = teams.KC;
  const buf = teams.BUF;
  const dal = teams.DAL;
  const was = teams.WAS;

  return (
    <TipProvider>
      <div className={s.page}>
        <header className={s.header}>
          <div className={s.wordmark}>Before You Bet</div>
          <p className={s.subtitle}>Component Library — Live Preview</p>
        </header>

        {/* ─── WEEK PICKER ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Week Picker</h2>
          <WeekPicker
            label={`Week ${week}`}
            sublabel="Nov 19–25, 2024"
            hasPrev={week > 1}
            hasNext={week < 18}
          />
        </section>

        {/* ─── TOP TABS ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Top Tabs (Radix)</h2>
          <TopTabs
            tabs={[
              { value: "games", label: "Games", count: 14 },
              { value: "players", label: "Players", count: 52 },
            ]}
            defaultValue="games"
          >
            <TabContent value="games" className={s.tabBody}>
              <p className={s.placeholder}>Games list goes here</p>
            </TabContent>
            <TabContent value="players" className={s.tabBody}>
              <p className={s.placeholder}>Players list goes here</p>
            </TabContent>
          </TopTabs>
        </section>

        {/* ─── FILTER TOGGLE ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Filter Toggle (Radix)</h2>
          <FilterToggle
            options={[
              { value: "all", label: "All" },
              { value: "qb", label: "QB" },
              { value: "rb", label: "RB" },
              { value: "wr", label: "WR" },
              { value: "te", label: "TE" },
            ]}
            value={posFilter}
            onValueChange={setPosFilter}
          />
        </section>

        {/* ─── SLATE HEADER ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Slate Headers</h2>
          <div className={s.stack}>
            <SlateHeader label="Thursday Night" count={1} />
            <SlateHeader label="Sunday Early" count={7} />
            <SlateHeader label="Sunday Late" count={4} />
            <SlateHeader label="Sunday Night" count={1} />
            <SlateHeader label="Monday Night" count={1} />
          </div>
        </section>

        {/* ─── GAME STRIP ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Game Strip</h2>
          <div className={s.stack}>
            <SlateHeader label="Sunday Early" count={2} />
            <GameStrip
              time="1:00"
              period="PM ET"
              awayLogo={dal.logo}
              homeLogo={was.logo}
              awayName="Cowboys"
              homeName="Commanders"
              headline="Washington should win this easily — Dallas has lost five straight."
              confidence={82}
              onClick={() => setDetailOpen(true)}
            />
            <GameStrip
              time="4:25"
              period="PM ET"
              awayLogo={kc.logo}
              homeLogo={buf.logo}
              awayName="Chiefs"
              homeName="Bills"
              headline="Game of the week — a coin flip between the two best teams in football."
              confidence={52}
            />
          </div>
        </section>

        {/* ─── INSIGHT CARD ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Insight Card</h2>
          <InsightCard
            verdict="Washington is the safe bet here"
            summary="Dallas is starting a backup QB and has lost five straight. Washington's rookie Jayden Daniels has been electric — this is one of the more confident picks of the week."
            points={[
              "Dallas has no answer at quarterback with Dak out",
              "Jayden Daniels is a dual-threat nightmare for struggling defenses",
              "Rivalry games can get weird, but the talent gap is too big",
            ]}
          />
        </section>

        {/* ─── LEAN SCALE ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Lean Scale</h2>
          <div className={s.stack}>
            <LeanScale
              awayAbbr="DAL"
              homeAbbr="WAS"
              lean={78}
              dotColor={was.color}
            />
            <LeanScale
              awayAbbr="KC"
              homeAbbr="BUF"
              lean={54}
              dotColor={buf.color}
            />
            <LeanScale
              awayAbbr="PHI"
              homeAbbr="LAR"
              lean={22}
              dotColor={teams.PHI.color}
            />
          </div>
        </section>

        {/* ─── CONFIDENCE METER ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Confidence Meter</h2>
          <div className={s.stack}>
            <ConfidenceMeter value={82} label="Pick Confidence" />
            <ConfidenceMeter value={52} label="Pick Confidence" />
            <ConfidenceMeter value={28} label="Pick Confidence" />
          </div>
        </section>

        {/* ─── BET LINES ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Bet Lines</h2>
          <div className={s.stack}>
            <BetLine type="spread" label="Washington -6.5" value="-110" movement="steady" />
            <BetLine type="moneyline" label="Washington" value="-280" movement="down" />
            <BetLine type="total" label="Over 45.5" value="-105" movement="up" />
          </div>
        </section>

        {/* ─── GAME HERO ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Game Hero (Detail View)</h2>
          <GameHero
            awayName="Cowboys"
            homeName="Commanders"
            awayLogo={dal.logo}
            homeLogo={was.logo}
            awayRecord="3-7"
            homeRecord="7-4"
            awayColor={dal.color}
            homeColor={was.color}
            time="Sun 1:00 PM ET"
            venue="Northwest Stadium"
            network="FOX"
          />
        </section>

        {/* ─── PLAYER CARD ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Player Card</h2>
          <div className={s.cardGrid}>
            <PlayerCard
              name="Jayden Daniels"
              position="QB"
              team="WAS"
              matchup="vs DAL"
              verdict="Dual-threat nightmare for a struggling Dallas defense — expect a big day."
              projections={[
                { label: "Pass Yds", value: "~245", range: "230–260" },
                { label: "Pass TD", value: "~2", range: "1–2" },
                { label: "Rush Yds", value: "~45", range: "40+" },
              ]}
            />
            <PlayerCard
              name="Saquon Barkley"
              position="RB"
              team="PHI"
              matchup="@ LAR"
              verdict="Having a historic season against the worst run defense in football."
              projections={[
                { label: "Carries", value: "~26", range: "25+" },
                { label: "Rush Yds", value: "~145", range: "130–160" },
                { label: "TD", value: "~2", range: "1–2" },
              ]}
            />
          </div>
        </section>

        {/* ─── TOOLTIP ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Tooltip (Radix)</h2>
          <div className={s.row}>
            <Tip content="Projections are estimates based on matchup data, recent performance, and historical averages.">
              <button className={s.tipTarget}>Hover for info</button>
            </Tip>
          </div>
        </section>

        {/* ─── DETAIL PANEL ─── */}
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Detail Panel (Radix Dialog)</h2>
          <button className={s.openBtn} onClick={() => setDetailOpen(true)}>
            Open Detail Panel
          </button>
        </section>

        <DetailPanel
          open={detailOpen}
          onOpenChange={setDetailOpen}
          title="Cowboys at Commanders"
        >
          <GameHero
            awayName="Cowboys"
            homeName="Commanders"
            awayLogo={dal.logo}
            homeLogo={was.logo}
            awayRecord="3-7"
            homeRecord="7-4"
            awayColor={dal.color}
            homeColor={was.color}
            time="Sun 1:00 PM ET"
            venue="Northwest Stadium"
            network="FOX"
          />
          <InsightCard
            verdict="Washington is the safe bet here"
            summary="Dallas is starting a backup QB and has lost five straight."
            points={[
              "Dallas has no answer at quarterback with Dak out",
              "Jayden Daniels is a dual-threat nightmare",
              "Rivalry games can get weird, but the talent gap is too big",
            ]}
          />
          <LeanScale
            awayAbbr="DAL"
            homeAbbr="WAS"
            lean={78}
            dotColor={was.color}
          />
          <ConfidenceMeter value={82} label="Pick Confidence" />
          <div>
            <SlateHeader label="Key Lines" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", marginTop: "var(--sp-2)" }}>
              <BetLine type="spread" label="Washington -6.5" value="-110" />
              <BetLine type="moneyline" label="Washington" value="-280" />
              <BetLine type="total" label="Over 45.5" value="-105" />
            </div>
          </div>
          <TopTabs
            tabs={[
              { value: "intel", label: "Intelligence" },
              { value: "players", label: "Players" },
            ]}
            defaultValue="intel"
          >
            <TabContent value="intel" className={s.tabBody}>
              <p style={{ fontSize: 13, color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                Full game intelligence content would go here — rundown points, trends, weather, injury report.
              </p>
            </TabContent>
            <TabContent value="players" className={s.tabBody}>
              <PlayerCard
                name="Jayden Daniels"
                position="QB"
                team="WAS"
                matchup="vs DAL"
                verdict="Dual-threat nightmare for a struggling Dallas defense."
                projections={[
                  { label: "Pass Yds", value: "~245", range: "230–260" },
                  { label: "Pass TD", value: "~2", range: "1–2" },
                  { label: "Rush Yds", value: "~45", range: "40+" },
                ]}
              />
            </TabContent>
          </TopTabs>
        </DetailPanel>
      </div>
    </TipProvider>
  );
}
