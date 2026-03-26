import s from "./page.module.css";

export default function DesignLab() {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={s.wordmark}>Before You Bet</div>
        <p className={s.subtitle}>Design Lab &mdash; Token Documentation</p>
      </header>

      <section className={s.section}>
        <h2 className={s.sectionLabel}>Design Tokens</h2>
        <p className={s.placeholder}>
          Open the mockup files in this folder to preview the design system:
        </p>
        <ul className={s.list}>
          <li><strong>color-system.mockup.html</strong> &mdash; Full 50&ndash;900 color scales, gradients, semantic tokens</li>
          <li><strong>typography.mockup.html</strong> &mdash; Font families, type scale, weights, usage patterns</li>
        </ul>
      </section>
    </div>
  );
}
