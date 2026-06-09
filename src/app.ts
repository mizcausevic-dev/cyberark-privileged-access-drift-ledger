import { buildDriftSummary, type DriftInput } from "./index.js";

export function renderApp(input: DriftInput): string {
  const summary = buildDriftSummary(input);
  const cards = summary.findings
    .map(
      (lane) => `<article class="card ${lane.posture}">
        <p class="eyebrow">${lane.segment}</p>
        <h2>${lane.laneId}</h2>
        <p>${lane.boardNarrative}</p>
        <dl>
          <div><dt>Drift score</dt><dd>${lane.driftScore}</dd></div>
          <div><dt>Vaulted</dt><dd>${lane.vaultedCoveragePercent}%</dd></div>
          <div><dt>Rotation age</dt><dd>${lane.rotationAgeDays}d</dd></div>
        </dl>
        <strong>${lane.nextAction}</strong>
      </article>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CyberArk Privileged Access Drift Ledger</title>
  <meta name="description" content="CyberArk-aligned privileged access drift ledger for vaulted coverage, rotation age, checkout exposure, and break-glass review." />
  <style>
    :root { color-scheme: dark; --bg:#050812; --panel:#0d1727; --line:#263348; --text:#f4f1ea; --muted:#a8b3c7; --cyan:#25d7ef; --green:#58f0b3; --pink:#ff72b6; --violet:#9d8cff; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Segoe UI", sans-serif; background: radial-gradient(circle at 75% 0%, #15243a 0, transparent 34%), var(--bg); color: var(--text); }
    main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 64px 0; }
    .hero { border: 1px solid var(--line); border-radius: 28px; padding: clamp(28px, 5vw, 64px); background: linear-gradient(135deg, rgba(13,23,39,.98), rgba(9,14,25,.94)); box-shadow: 0 24px 80px rgba(0,0,0,.32); }
    .eyebrow { color: var(--green); text-transform: uppercase; letter-spacing: .18em; font: 700 12px Consolas, monospace; }
    h1 { max-width: 1030px; margin: 18px 0; font: 800 clamp(48px, 8vw, 100px)/.94 "Segoe UI", sans-serif; letter-spacing: -.06em; }
    .lede { max-width: 820px; color: var(--muted); font-size: 22px; line-height: 1.55; }
    .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 38px; }
    .metric, .card, .proof-card { background: rgba(16,28,48,.78); border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
    .metric b { display: block; margin-top: 10px; font-size: 42px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
    .card.escalate { border-color: rgba(255,114,182,.7); }
    .card.watch { border-color: rgba(157,140,255,.65); }
    .card.contained { border-color: rgba(88,240,179,.65); }
    .card h2 { margin: 10px 0; font-size: 27px; }
    .card p { color: var(--muted); line-height: 1.55; }
    dl { display: grid; gap: 10px; margin: 20px 0; }
    dt { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .12em; }
    dd { margin: 3px 0 0; font-weight: 800; }
    strong { color: var(--text); line-height: 1.45; }
    .proof-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 28px; }
    .proof-card h2 { margin: 8px 0 12px; font-size: 25px; }
    .proof-card a { color: var(--cyan); text-decoration: none; }
    footer { margin-top: 28px; color: var(--muted); font-size: 13px; }
    @media (max-width: 820px) { .metrics, .grid, .proof-grid { grid-template-columns: 1fr; } h1 { font-size: 52px; } }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <p class="eyebrow">CyberArk / privileged access</p>
      <h1>Privileged access drift becomes visible before audit turns into board exposure.</h1>
      <p class="lede">CyberArk Privileged Access Drift Ledger turns vaulted coverage, rotation age, checkout-policy exceptions, break-glass review, stale owners, and session recording into one executive-ready PAM posture.</p>
      <div class="metrics">
        <div class="metric"><span class="eyebrow">Aggregate drift</span><b>${summary.aggregateDriftScore}</b></div>
        <div class="metric"><span class="eyebrow">Escalation lanes</span><b>${summary.escalationLanes}</b></div>
        <div class="metric"><span class="eyebrow">Exposed accounts</span><b>${summary.exposedAccountsEstimate}</b></div>
      </div>
    </section>
    <section class="grid">${cards}</section>
    <section class="proof-grid" aria-label="Product depth and shared pattern">
      <article class="proof-card">
        <p class="eyebrow">Product purpose</p>
        <h2>What this product does</h2>
        <p>Turns privileged-account drift, vaulted coverage gaps, rotation age, checkout exceptions, break-glass exposure, and session-recording gaps into one PAM evidence ledger.</p>
      </article>
      <article class="proof-card">
        <p class="eyebrow">Buyer lens</p>
        <h2>Why executives care</h2>
        <p>Privileged access is board risk when the estate cannot prove which accounts are protected, which are stale, and which controls are only assumed instead of evidenced.</p>
      </article>
      <article class="proof-card">
        <p class="eyebrow">Value architecture</p>
        <h2>How it turns into action</h2>
        <p>The page gives teams a remediation sequence: vault the highest-risk accounts, shorten stale rotations, close checkout exceptions, and route ownership before audit or incident pressure rises.</p>
      </article>
      <article class="proof-card">
        <p class="eyebrow">Technical proof</p>
        <h2>What reviewers can inspect</h2>
        <p>The repo keeps typed PAM scoring, synthetic privileged-access fixtures, deterministic rendering, CI checks, and public-safe HTML together so the evidence model is inspectable without secrets.</p>
      </article>
      <article class="proof-card">
        <p class="eyebrow">What these repos have in common</p>
        <h2>Platform complexity becomes board-ready operating proof.</h2>
        <p>Each repo names a buyer pain, exposes an evidence model, produces a reusable decision surface, and keeps the public demo boundary safe with synthetic data instead of credentials or customer exports.</p>
      </article>
      <article class="proof-card">
        <p class="eyebrow">Interlinks</p>
        <h2>Where this fits</h2>
        <p><a href="https://portfolio.kineticgain.com/">Portfolio</a> · <a href="https://kineticgain.com/">Kinetic Gain</a> · <a href="https://github.com/mizcausevic-dev/cyberark-privileged-access-drift-ledger">GitHub</a></p>
      </article>
    </section>
    <footer>CyberArk Privileged Access Drift Ledger · GitHub Pages proof surface · ${summary.asOf}</footer>
  </main>
</body>
</html>`;
}
