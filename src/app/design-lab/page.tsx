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
          <li><strong>radii.mockup.html</strong> &mdash; Border radius token scale and usage</li>
          <li><strong>borders.mockup.html</strong> &mdash; Border colors, widths, divider patterns</li>
          <li><strong>shadows.mockup.html</strong> &mdash; Elevation scale for light and dark themes</li>
          <li><strong>components.mockup.html</strong> &mdash; Active UI patterns and component specimens</li>
        </ul>
      </section>
    </div>
  );
}
