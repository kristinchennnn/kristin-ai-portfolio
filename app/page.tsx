import Image from "next/image";
import { Card } from "@/components/ui/card";

const project = {
  number: "01",
  title: "WorkflowLens",
  description: "A live AI opportunity assessment that maps how work happens today, identifies friction, and recommends what to automate, augment, redesign, or keep human.",
  tags: ["Workers AI", "Workflow design", "Human-in-loop", "Next.js"],
  status: "Live product",
  href: "/workflowlens",
};

const experience = [
  { year: "2025—now", role: "Research Assistant", company: "Ivey Business School", detail: "Data preprocessing · predictive analytics · large-scale ML support" },
  { year: "Summer 2025", role: "Consultant & Strategic Data Analyst", company: "MUIN Entertainment", detail: "Forecasting · reporting automation · revenue analysis" },
  { year: "Summer 2023", role: "Supply Chain & Operations Analyst", company: "ByteDance", detail: "Risk analytics · data management · process optimization" },
  { year: "Summer 2024", role: "Investment & Auditing Risks Analyst", company: "China Bohai Bank", detail: "Financial modeling · risk assessment · analytical presentation" },
];

export default function Home() {
  const personLd = { "@context": "https://schema.org", "@type": "Person", name: "Kristin Chen", alternateName: "Zhiying Chen", url: "https://kristinzhiyingchen.com", image: "https://kristinzhiyingchen.com/image.png", jobTitle: "AI Builder and Workflow Consultant", sameAs: ["https://www.linkedin.com/in/zhiying-kristin-chen/"], address: { "@type": "PostalAddress", addressLocality: "Toronto", addressCountry: "CA" } };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <nav className="nav shell">
        <a className="wordmark" href="#top">KC<span>.</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#approach">Approach</a><a href="#about">About</a></div>
        <a className="nav-cta" href="mailto:zchen.msc2026@ivey.ca">Let&apos;s talk <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> AI builder / workflow design</p>
          <h1>Kristin<br /><em>Chen</em></h1>
          <p className="hero-lede">I build practical AI-enabled workflows for better research, analysis, and decisions—grounded in data, designed for people.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span>↓</span></a><a className="text-link" href="mailto:zchen.msc2026@ivey.ca">Get in touch <span>↗</span></a></div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-name" aria-hidden="true">KRISTIN<br />CHEN</div>
          <div className="portrait-wrap"><Image src="/image.png" alt="Portrait of Kristin Chen" fill priority sizes="(max-width: 800px) 70vw, 360px" /></div>
          <div className="visual-note note-top"><span>01</span> People-first<br />AI systems</div>
          <div className="visual-note note-bottom"><span>02</span> Evidence over<br />AI theatre</div>
        </div>
      </section>

      <section className="signal-band"><div className="shell signal-grid"><div><span className="signal-number">500K+</span><span>image extractions<br />cleaned &amp; validated</span></div><div><span className="signal-number">360K+</span><span>dish names<br />standardized</span></div><div><span className="signal-number">$200M+</span><span>projects assessed<br />through financial models</span></div><div><span className="signal-number">4</span><span>languages across<br />global teams</span></div></div></section>

      <section className="intro shell" id="about"><div className="section-label">/ 01 — The point of view</div><div className="intro-content"><h2>AI is not the point.<br /><span>Better work is.</span></h2><div className="intro-text"><p>Technology moves quickly. Good judgment still matters. I work at the intersection of AI, data, and business—finding where intelligent tools can reduce friction without losing the human context.</p><p>My foundation in statistical science, economics, machine learning support, and strategic analysis helps me move from ambiguous problem to useful next step.</p></div></div></section>

      <section className="approach shell" id="approach"><div className="section-label">/ 02 — How I work</div><div className="approach-grid"><div className="approach-card"><span>01</span><h3>Find the friction</h3><p>Understand the task, the people, and the decision before reaching for a tool.</p></div><div className="approach-card active"><span>02</span><h3>Prototype the useful</h3><p>Build a focused workflow quickly, with clear inputs, outputs, and a human review point.</p></div><div className="approach-card"><span>03</span><h3>Make it repeatable</h3><p>Document what works, test the edges, and help the team adopt it with confidence.</p></div></div></section>

      <section className="work shell" id="work">
        <div className="work-heading"><div className="section-label">/ 03 — Selected work</div><h2>Building AI around<br /><em>better work.</em></h2><p>One working product, built to demonstrate how I approach AI opportunity discovery, workflow design, and responsible implementation.</p></div>
        <div className="project-grid project-grid-single">
          <Card className="project-card project-card-featured">
            <div className="project-top"><span className="project-number">{project.number}</span><span className="project-status">{project.status}</span></div>
            <div className="project-feature-body">
              <div className="project-shape project-visual-image">
                <Image
                  src="/workflowlens-portfolio.png"
                  alt="A tangled workflow passing through a lens and becoming a structured, human-reviewed AI process"
                  fill
                  sizes="(max-width: 800px) calc(100vw - 80px), 45vw"
                />
              </div>
              <div className="project-feature-copy"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} className="project-link">Explore live product <span>↗</span></a></div>
            </div>
          </Card>
        </div>
      </section>

      <section className="experience shell"><div className="section-label">/ 04 — The foundation</div><div className="experience-layout"><h2>Data is where<br /><span>I learned to think.</span></h2><div className="timeline">{experience.map((item) => <div className="timeline-row" key={item.company}><div className="timeline-year">{item.year}</div><div><h3>{item.role}</h3><p className="company">{item.company}</p><p>{item.detail}</p></div></div>)}</div></div></section>

      <section className="toolkit shell"><div className="toolkit-copy"><div className="section-label">/ 05 — The toolkit</div><h2>Curious by default.<br /><em>Rigorous by choice.</em></h2></div><div className="tool-list"><div><span>AI &amp; build</span><p>Codex · AI-assisted prototyping · workflow design · research synthesis</p></div><div><span>Data &amp; analytics</span><p>Python · SQL · R · Excel · Power BI · Tableau · SAS</p></div><div><span>Languages</span><p>English · Mandarin · Cantonese · Korean</p></div></div></section>

      <section className="contact shell" id="contact">
        <p className="eyebrow">Have a messy problem?</p>
        <h2>Let&apos;s make it<br /><em>more useful.</em></h2>
        <a className="button button-light" href="mailto:zchen.msc2026@ivey.ca">Start a conversation <span>↗</span></a>
        <div className="contact-footer">
          <span>Kristin Chen</span>
          <span>Toronto, Canada</span>
          <a href="mailto:zchen.msc2026@ivey.ca">zchen.msc2026@ivey.ca ↗</a>
          <a href="https://www.linkedin.com/in/zhiying-kristin-chen/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>
  );
}
