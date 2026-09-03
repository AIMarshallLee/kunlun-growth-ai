import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "AI workflow reliability for lean content teams" },
  description:
    "Turn approved brand material into review-ready content with your own AI accounts, controlled budgets and human approval.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "AI workflow reliability for lean content teams",
    description:
      "A controlled, BYOK content workflow for teams that need consistency, cost visibility and a human approval step.",
    type: "website",
    locale: "en_US",
  },
};

const contactHref =
  "mailto:marshall@kunlungrowth.com?subject=Workflow%20review%20request";

const workflow = [
  ["01", "Brand context", "Rules, approved sources and voice—kept close to the task."],
  ["02", "Brief to draft", "A repeatable route from a clear brief to a useful first version."],
  ["03", "Control layer", "Allowlist, budget threshold and bounded fallback before the call runs."],
  ["04", "Human handoff", "Review, revise and accept a publish-ready package. People stay in charge."],
];

const controlRows = [
  ["Provider", "Allowlist only", "Open routing"],
  ["Spend", "Hard stop", "Hope for the best"],
  ["Records", "Metadata + cost", "Full prompt archive"],
  ["Release", "Human approval", "Auto-publish"],
];

export default function EnglishLandingPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.logo} href="#top" aria-label="Kunlun Growth home">
          <span className={styles.logoMark}>K</span>
          <span>Kunlun Growth<small>AI OPERATIONS</small></span>
        </a>
        <div className={styles.navLinks}>
          <a href="#workflow">Workflow</a>
          <a href="#controls">Controls</a>
          <a href="#pilot">Pilot</a>
        </div>
        <a className={styles.navCta} href={contactHref}>Request a workflow review <span>↗</span></a>
      </nav>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><span className={styles.dot} /> CONTROLLED CONTENT SYSTEMS / 01</p>
          <h1>Make AI content feel like an <em>operating system.</em></h1>
          <p className={styles.lead}>
            Turn approved brand material into review-ready content with your own AI accounts—while budgets, fallbacks and human approval stay under control.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={contactHref}>Book a pilot <span>↗</span></a>
            <a className={styles.secondary} href="#workflow">See the workflow <span>↓</span></a>
          </div>
          <p className={styles.note}>BYOK by default · application access, not a public API · no auto-publish</p>
        </div>
        <div className={styles.heroPanel} aria-label="Illustrative controlled content workflow, not customer production data">
          <div className={styles.panelHeader}><span>ILLUSTRATIVE RUN / CONTENT-042</span><span className={styles.live}><i /> CONTROLLED</span></div>
          <div className={styles.panelBody}>
            <div className={styles.routeLine}><span>BRAND PROFILE</span><b>→</b><span>BRIEF</span><b>→</b><span>DRAFT</span></div>
            <div className={styles.statusCard}><div><span className={styles.statusDot} /> ROUTE STATUS</div><strong>Awaiting human review</strong><small>1 draft · 2 checks passed · 0 publish actions</small></div>
            <div className={styles.meter}><span>BUDGET WINDOW</span><b>68%</b><div><i /></div><small>hard stop armed at customer threshold</small></div>
            <div className={styles.miniGrid}><div><span>MODEL</span><strong>BYOK / allowlist</strong></div><div><span>LOG MODE</span><strong>metadata only</strong></div></div>
          </div>
          <span className={styles.panelStamp}>HUMAN<br />GATE</span>
        </div>
      </section>

      <section className={styles.signalBar} aria-label="Product boundary">
        <span>BUILT FOR TEAMS THAT ALREADY USE AI</span><span>SMALL AGENCIES</span><span>SAAS MARKETING</span><span>PROFESSIONAL SERVICES</span>
      </section>

      <section className={styles.section} id="workflow">
        <div className={styles.sectionIntro}><p className={styles.kicker}>THE WORKFLOW / 02</p><h2>The model is a component.<br /><em>The workflow is the product.</em></h2><p>We configure the path between your source material and an approved draft. OpenCode can orchestrate the work behind the scenes; your team sees a clear, reviewable handoff.</p></div>
        <div className={styles.workflowGrid}>
          {workflow.map(([number, title, text]) => <article key={number}><span className={styles.stepNo}>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`} id="controls">
        <div className={styles.sectionIntro}><p className={styles.kicker}>CONTROL ROOM / 03</p><h2>Reliability you can<br /><em>explain to a client.</em></h2><p>Every run has a boundary. Your credentials remain yours; our job is to make the work observable, economical and recoverable. The provider allowlist and hard budget stop are part of the route.</p></div>
        <div className={styles.controlGrid}><div className={styles.controlTable}><div className={styles.tableHead}><span>CONTROL</span><span>KUNLUN WORKFLOW</span><span>UNCONTROLLED SETUP</span></div>{controlRows.map(([a,b,c]) => <div className={styles.tableRow} key={a}><span>{a}</span><strong>{b}</strong><span>{c}</span></div>)}</div><aside className={styles.controlAside}><span className={styles.bigMark}>◎</span><p>When a provider fails or the budget is reached, the system stops, degrades within bounds or asks for a human handoff. It never silently spends past the limit.</p></aside></div>
      </section>

      <section className={styles.boundaries}>
        <div><p className={styles.kicker}>DATA BOUNDARIES / 04</p><h2>Useful without<br /><em>unnecessary exposure.</em></h2></div>
        <div className={styles.boundaryList}><p><b>BYOK</b><span>Your team connects its own official or trusted model account. Model charges stay with you.</span></p><p><b>METADATA-ONLY LOGS</b><span>We track provider, model, token usage, cost, status and failure reason—not default prompt or source text.</span></p><p><b>LEDGER &amp; FAILOVER</b><span>Each attempt is recorded in an attempt-level cost ledger. Bounded failover can stop at the allowlist boundary or request human help.</span></p><p><b>HUMAN APPROVAL</b><span>Drafts are prepared for review. Publishing remains your team’s action.</span></p></div>
      </section>

      <section className={styles.pilot} id="pilot"><div><p className={styles.kicker}>START SMALL / 05</p><h2>Bring one real workflow.<br /><em>Leave with a measured pilot.</em></h2></div><div className={styles.pilotBody}><p>We start with one brand, one channel and a defined acceptance checklist. Scope and pricing are agreed after a workflow review; there is no unlimited plan or surprise model bill.</p><a className={styles.primary} href={contactHref}>Request a workflow review <span>↗</span></a><small>Model fees are paid directly through your connected account. Pilot availability is reviewed case by case.</small></div></section>

      <footer className={styles.footer}><div><a className={styles.logo} href="#top"><span className={styles.logoMark}>K</span><span>Kunlun Growth<small>AI OPERATIONS</small></span></a><p>Workflow reliability and cost control for lean content teams.</p></div><div className={styles.footerLinks}><a href="#workflow">Workflow</a><a href="#controls">Controls</a><a href={contactHref}>Contact</a></div><p className={styles.footerFine}>© 2026 Kunlun Growth · Paid pilots are subject to scope, data and legal review.</p></footer>
    </main>
  );
}
