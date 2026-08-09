import { site, practiceAreas, courts, caseTypes, notices, resources, faqs, judgments, insights, lawyers, legalGlossary, serviceRecords, searchableItems } from './data.js';

const app = document.querySelector('#app');
const baseUrl = 'https://www.lawprime.com';

function imageForSlug(slug = '') {
  if (!slug) return '/assets/images/hero-lawprime.png';
  const s = String(slug).toLowerCase();
  if (s.includes('family') || s.includes('matrimonial') || s.includes('divorce') || s.includes('custody')) return '/assets/images/family-law.png';
  if (s.includes('civil') || s.includes('recovery')) return '/assets/images/civil-litigation.png';
  if (s.includes('criminal') || s.includes('bail')) return '/assets/images/criminal-law.png';
  if (s.includes('property') || s.includes('real-estate') || s.includes('partition') || s.includes('tenancy')) return '/assets/images/property-law.png';
  if (s.includes('consumer')) return '/assets/images/consumer-law.png';
  if (s.includes('banking') || s.includes('finance') || s.includes('drt')) return '/assets/images/banking-finance.png';
  if (s.includes('corporate') || s.includes('commercial') || s.includes('nclt')) return '/assets/images/corporate-law.png';
  if (s.includes('cheque') || s.includes('ni-act')) return '/assets/images/cheque-bounce.png';
  if (s.includes('employment') || s.includes('labour') || s.includes('service')) return '/assets/images/employment-law.png';
  if (s.includes('writ') || s.includes('constitutional') || s.includes('court')) return '/assets/images/constitutional-law.png';
  return '/assets/images/hero-lawprime.png';
}

const mainNav = [
  { label: 'Practice Areas', path: '/practice-areas/', menu: 'practice' },
  { label: 'Courts', path: '/courts/', menu: 'courts' },
  { label: 'Lawyers', path: '/lawyers/' },
  { label: 'Resources', path: '/legal-resources/', menu: 'resources' },
  { label: 'Insights', path: '/legal-insights/' },
  { label: 'About', path: '/about/' }
];

const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const titleCase = (value) => value.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase());
const path = () => location.pathname.replace(/\/+/g, '/').replace(/index\.html$/, '').replace(/\/$/, '') || '/';
const link = (to, content, className = '') => `<a href="${to}"${className ? ` class="${className}"` : ''}>${content}</a>`;

const card = (to, meta, title, text = '', slug = '') => {
  const imgSrc = slug ? imageForSlug(slug) : null;
  return `<a class="listing-card${imgSrc ? ' has-media' : ''}" href="${to}">${imgSrc ? `<img src="${imgSrc}" alt="${esc(title)} legal representation" class="card-media" width="380" height="160" loading="lazy" />` : ''}<div class="listing-card-body"><span class="meta">${esc(meta)}</span><h3>${esc(title)}</h3>${text ? `<p>${esc(text)}</p>` : ''}<span class="link-arrow">Explore</span></div></a>`;
};

const cta = () => `<section class="cta-band"><div class="container cta-grid"><div><span class="eyebrow">A considered next step</span><h2>Start with a clear conversation about your legal matter.</h2></div><a class="btn" href="/consultation/">Request a consultation <span aria-hidden="true">→</span></a></div></section>`;
const noPublished = (noun = 'material') => `<div class="empty-card"><span class="label">Publication standard</span><h3>Verified ${noun} will appear here.</h3><p>LAWPRIME does not publish unverified legal records, professional profiles, case outcomes or legal analysis.</p></div>`;

function breadcrumbs(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>${items.map(item => `<span aria-hidden="true">/</span>${item.path ? `<a href="${item.path}">${esc(item.label)}</a>` : `<span aria-current="page">${esc(item.label)}</span>`}`).join('')}</nav>`;
}

function pageHero({ eyebrow = 'LAWPRIME', title, lead, crumbs = [] }) {
  return `<section class="page-hero"><div class="container">${breadcrumbs(crumbs)}<span class="eyebrow" style="margin-top:1.3rem">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div></section>`;
}

function header() {
  const megaPractice = practiceAreas.map(x => `<a href="/practice-areas/${x.slug}/">${esc(x.title)}</a>`).join('');
  const megaCourts = courts.map(x => `<a href="/courts/${x.slug}/">${esc(x.title)}</a>`).join('');
  const megaResources = [...resources, { slug:'faqs', title:'FAQs' }, { slug:'judgments', title:'Judgment Library' }].map(x => `<a href="/${x.slug === 'judgments' ? 'judgments' : x.slug === 'faqs' ? 'faqs' : `legal-resources/${x.slug}`}/">${esc(x.title)}</a>`).join('');
  return `<header class="site-header"><div class="container header-top"><a class="brand" href="/" aria-label="LAWPRIME home"><i class="brand-mark" aria-hidden="true"></i>LAWPRIME</a><nav class="desktop-nav" aria-label="Primary navigation">${mainNav.map(item => `<button class="nav-item" ${item.menu ? `data-mega="${item.menu}" aria-expanded="false" aria-haspopup="true"` : `data-nav="true"`} data-path="${item.path}">${item.label}${item.menu ? ' <span aria-hidden="true">⌄</span>' : ''}</button>`).join('')}</nav><div class="header-actions"><button class="search-trigger" type="button" data-search-open aria-label="Open search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="6.3"/><path d="m16 16 4.1 4.1"/></svg></button><a class="btn btn-primary" href="/consultation/">Consultation</a><button class="mobile-toggle" type="button" data-mobile-toggle aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div></div><div class="mega-menu" data-mega-panel="practice"><div class="container mega-inner"><div class="mega-intro"><span class="eyebrow">Practice areas</span><h2>Legal support with a deliberate approach.</h2><p class="text-muted">Explore the areas in which structured legal information and consultation support are available.</p><a class="link-arrow" href="/practice-areas/">All practice areas</a></div><div class="mega-links">${megaPractice}</div></div></div><div class="mega-menu" data-mega-panel="courts"><div class="container mega-inner"><div class="mega-intro"><span class="eyebrow">Jurisdictions</span><h2>Courts and forums in focus.</h2><p class="text-muted">Practical orientation for relevant courts, commissions and tribunals.</p><a class="link-arrow" href="/courts/">All courts & jurisdictions</a></div><div class="mega-links">${megaCourts}</div></div></div><div class="mega-menu" data-mega-panel="resources"><div class="container mega-inner"><div class="mega-intro"><span class="eyebrow">Legal knowledge</span><h2>Useful legal context, without oversimplification.</h2><p class="text-muted">Resources are structured for clarity and only publish verified material.</p><a class="link-arrow" href="/legal-resources/">All resources</a></div><div class="mega-links">${megaResources}</div></div></div><div class="mobile-panel" data-mobile-panel><nav aria-label="Mobile navigation"><a href="/">Home <span>→</span></a>${mobileGroup('Practice Areas', '/practice-areas/', practiceAreas.map(x => [x.title, `/practice-areas/${x.slug}/`]))}${mobileGroup('Courts & Jurisdictions', '/courts/', courts.map(x => [x.title, `/courts/${x.slug}/`]))}${mobileGroup('Legal Resources', '/legal-resources/', resources.map(x => [x.title, `/legal-resources/${x.slug}/`]))}<a href="/judgments/">Judgment Library <span>→</span></a><a href="/legal-insights/">Legal Insights <span>→</span></a><a href="/lawyers/">Lawyers <span>→</span></a><a href="/case-types/">Case Types <span>→</span></a><a href="/legal-notices/">Legal Notices <span>→</span></a><a href="/faqs/">FAQs <span>→</span></a><a href="/about/">About LAWPRIME <span>→</span></a><a href="/contact/">Contact <span>→</span></a><a href="/consultation/">Request a consultation <span>→</span></a></nav></div></header>`;
}

function mobileGroup(label, url, entries) {
  return `<div><button type="button" data-mobile-sub-toggle>${esc(label)} <span>+</span></button><div class="mobile-sub">${entries.map(([title, path]) => `<a href="${path}">${esc(title)}</a>`).join('')}<a href="${url}">View all ${esc(label)}</a></div></div>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="footer-brand" href="/">LAWPRIME</a><p class="footer-blurb">A legal information and consultation platform for considered next steps in consequential matters.</p></div><div class="footer-col"><h3>Explore</h3><a href="/practice-areas/">Practice Areas</a><a href="/courts/">Courts & Jurisdictions</a><a href="/case-types/">Case Types</a><a href="/legal-notices/">Legal Notices</a></div><div class="footer-col"><h3>Knowledge</h3><a href="/judgments/">Judgment Library</a><a href="/legal-insights/">Legal Insights</a><a href="/legal-resources/">Legal Resources</a><a href="/faqs/">FAQs</a></div><div class="footer-col"><h3>LAWPRIME</h3><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/consultation/">Consultation</a><a href="/careers/">Careers</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} LAWPRIME. All rights reserved.</span><div><a href="/privacy-policy/">Privacy</a><a href="/terms-of-use/">Terms</a><a href="/website-disclaimer/">Website Disclaimer</a><a href="/legal-disclaimer/">Legal Disclaimer</a></div></div><p class="legal-note">The information on this website is for general informational purposes only. It is not legal advice and does not create a lawyer–client relationship. Legal outcomes depend on specific facts, applicable law and the relevant forum.</p></div></footer>`;
}

function home() {
  const core10Areas = practiceAreas.slice(0, 10);
  const homeFaqs = faqs.slice(0, 8);
  return `<main id="main-content">
    <section class="home-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Litigation & Legal Advisory · Chandigarh Tricity & High Court</span>
          <h1>Legal Counsel, Litigation Support & Practical Legal Assistance</h1>
          <p class="lead">LAWPRIME offers structured legal advice, diligent case preparation, and procedural representation across District Courts, Tribunals, and the Punjab & Haryana High Court. We focus on clear legal communication and matter-specific strategy.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/consultation/">Book a Consultation <span>→</span></a>
            <a class="btn btn-light" href="/practice-areas/">Explore Practice Areas</a>
          </div>
        </div>
        <div class="hero-side">
          <img src="/assets/images/hero-lawprime.png" alt="LAWPRIME Legal Practice Scales of Justice and Courtroom Desk" class="hero-image" width="600" height="420" loading="eager" fetchpriority="high" />
          <p class="hero-statement">Every legal matter requires careful document evaluation, procedural accuracy, and a strategy grounded in factual evidence.</p>
          <div class="hero-index">
            <div><span>Primary Focus</span><strong>Litigation & Advisory</strong></div>
            <div><span>Jurisdiction</span><strong>Chandigarh • Mohali • Panchkula • High Court</strong></div>
            <div><span>Chamber Location</span><strong>Sector 43 District Courts, Chandigarh</strong></div>
          </div>
        </div>
      </div>
    </section>

    <section class="positioning section">
      <div class="container positioning-grid">
        <div><span class="positioning-number">01</span></div>
        <div>
          <span class="eyebrow">About LAWPRIME</span>
          <h2>A legal practice committed to factual accuracy & procedural strategy.</h2>
          <p class="lead">LAWPRIME is an Indian legal practice dedicated to assisting individuals, families, business owners, and organizations with complex legal concerns. We provide balanced legal guidance that prioritizes procedural compliance, rigorous document verification, and transparent communication.</p>
          <div class="section-image-card">
            <img src="/assets/images/about-lawprime.png" alt="LAWPRIME Law Firm Library and Legal Chamber" width="800" height="320" loading="lazy" />
          </div>
          <div class="point-list">
            <div class="point"><strong>Case-Specific Strategy</strong><span class="text-muted">Every matter is assessed individually based on its timeline, statutory framework, and documentary evidence.</span></div>
            <div class="point"><strong>Structured Documentation</strong><span class="text-muted">Careful drafting of pleadings, notices, affidavits, and written submissions to protect client interests.</span></div>
            <div class="point"><strong>Courtroom Representation</strong><span class="text-muted">Diligent advocacy before District Courts, High Courts, Consumer Commissions, DRT, NCLT, and MACT.</span></div>
            <div class="point"><strong>Clear & Objective Communication</strong><span class="text-muted">Plain-language explanations of court options, realistic risks, and procedural timelines without outcome guarantees.</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Core Practice Areas</span>
            <h2>Comprehensive litigation support & legal advisory across 10 practice areas.</h2>
          </div>
          <a class="link-arrow" href="/practice-areas/">View all practice areas</a>
        </div>
        <div class="area-grid">
          ${core10Areas.map((area, i) => card(`/practice-areas/${area.slug}/`, `0${i + 1} / Core Practice Area`, area.title, area.short, area.slug)).join('')}
        </div>
      </div>
    </section>

    <section class="section positioning">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Why Choose LAWPRIME</span>
            <h2>Genuine professional standards focused on client clarity & diligence.</h2>
          </div>
        </div>
        <div class="reason-grid">
          <div class="reason">
            <strong>Clear Legal Communication</strong>
            <p>We explain complex statutory provisions, court procedures, and procedural options in simple, understandable terms.</p>
          </div>
          <div class="reason">
            <strong>Fact-Grounded Strategy</strong>
            <p>Our advisory is based on verified documents, applicable statutes, and judicial precedents rather than speculative promises.</p>
          </div>
          <div class="reason">
            <strong>Structured Case Preparation</strong>
            <p>From initial legal notice drafting to final evidence, every filing is organized with attention to procedural timelines.</p>
          </div>
          <div class="reason">
            <strong>Strict Confidentiality</strong>
            <p>Client communications, dispute details, financial records, and legal strategy are protected under legal ethics standards.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="dark-section section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Courts & Jurisdictions</span>
            <h2>Representation & legal guidance across key judicial forums.</h2>
            <p class="lead">Serving clients across District Courts, Commissions, Tribunals, and the Punjab & Haryana High Court.</p>
          </div>
          <a class="btn btn-light" href="/courts/">Explore jurisdictions</a>
        </div>
        <div class="court-grid">
          ${courts.slice(0, 6).map(court => `<a class="court-card" href="/courts/${court.slug}/"><span class="court-type">${esc(court.type)}</span><h3>${esc(court.title)}</h3><p>${esc(court.scope)}</p></a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Consultation Preparation</span>
            <h2>What to prepare before consulting a lawyer.</h2>
            <p class="lead">A productive legal consultation begins with organized facts and records.</p>
          </div>
          <a class="btn btn-primary" href="/consultation/">Schedule a consultation <span>→</span></a>
        </div>
        <div class="reason-grid">
          <div class="reason">
            <strong>1. Chronology of Events</strong>
            <p>Write down a brief, date-wise timeline of key incidents, communications, notices, or court filings relevant to your matter.</p>
          </div>
          <div class="reason">
            <strong>2. Key Documents & Agreements</strong>
            <p>Assemble copies of contracts, marriage certificates, title deeds, bank memos, police complaints, or notices received.</p>
          </div>
          <div class="reason">
            <strong>3. Specific Legal Relief Sought</strong>
            <p>Identify your primary objectives—whether seeking financial recovery, bail, protection order, divorce, or property partition.</p>
          </div>
          <div class="reason">
            <strong>4. Written List of Questions</strong>
            <p>Prepare questions regarding procedural timelines, court fees, forum jurisdiction, and initial legal steps required.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Frequently Asked Questions</span>
            <h2>Essential answers regarding legal consultation & proceedings.</h2>
          </div>
          <a class="link-arrow" href="/faqs/">View all FAQs</a>
        </div>
        <div class="accordion">
          ${homeFaqs.map((faq, i) => faqMarkup(faq, i)).join('')}
        </div>
      </div>
    </section>

    ${cta()}
  </main>`;
}

function faqMarkup(faq, index) {
  return `<article class="faq-item" id="faq-${index + 1}"><button class="faq-question" type="button" aria-expanded="false"><span>${esc(faq.q)}</span><span aria-hidden="true">+</span></button><div class="faq-answer"><div><p>${esc(faq.a)}</p></div></div></article>`;
}

function about() {
  return `<main id="main-content">
    ${pageHero({ eyebrow:'About LAWPRIME', title:'About LAWPRIME', lead:'An Indian legal practice offering litigation counsel, dispute resolution, and legal advisory services.', crumbs:[{label:'About LAWPRIME'}] })}
    <section class="page-body">
      <div class="container content-grid">
        <article class="prose">
          <img src="/assets/images/about-lawprime.png" alt="LAWPRIME Law Firm Library and Legal Chamber" class="about-image" width="900" height="380" loading="lazy" />
          
          <h2>1. Who We Are</h2>
          <p>LAWPRIME is an Indian legal practice dedicated to offering structured legal counsel, courtroom litigation representation, and advisory services. We assist individuals, families, business entities, and institutions in navigating complex legal disputes across District Courts, High Courts, and specialized statutory Tribunals.</p>
          
          <h2>2. Our Legal Approach</h2>
          <p>Our practice is founded on objective legal analysis, procedural compliance, and methodical case preparation. We emphasize clear legal strategy based on verified facts, documentary evidence, and applicable statutory provisions rather than speculative claims or unverified outcome assurances.</p>
          
          <h2>3. Litigation & Legal Advisory</h2>
          <p>LAWPRIME provides comprehensive litigation representation and pre-litigation advisory. Whether representing clients in trial court hearings, drafting writ petitions, challenging statutory notices, or conducting commercial negotiations, we approach every matter with procedural diligence.</p>
          
          <h2>4. Client Communication</h2>
          <p>We prioritize transparent, plain-language communication. Clients receive clear explanations of legal rights, procedural options, potential risks, and statutory timelines at every stage of their matter, ensuring informed decision-making.</p>
          
          <h2>5. Case Preparation & Documentation</h2>
          <p>Effective advocacy depends on thorough document verification and drafting. Our team prepares detailed pleadings, plaints, written statements, affidavits, statutory notices, and evidentiary records aligned with court rules and evidence standards.</p>
          
          <h2>6. Professional Ethics</h2>
          <p>LAWPRIME adheres strictly to the legal ethics standards prescribed by the Bar Council of India. We uphold independence, professional integrity, duty to the court, and respect for the administration of justice.</p>
          
          <h2>7. Confidentiality</h2>
          <p>All client communications, case details, financial disclosures, and strategic consultations are held in strict confidence under advocate-client privilege, preserving complete privacy and discretion.</p>
          
          <h2>8. Areas of Practice</h2>
          <p>Our core practice encompasses ten major areas of Indian law:</p>
          <ul>
            <li>Family & Matrimonial Law</li>
            <li>Civil Litigation & Recovery</li>
            <li>Criminal Law & Defence</li>
            <li>Property & Real Estate Law</li>
            <li>Consumer Law & Protection</li>
            <li>Banking & Financial Law (DRT / SARFAESI)</li>
            <li>Corporate & Commercial Law</li>
            <li>Cheque Bounce / Negotiable Instruments Act</li>
            <li>Labour & Employment Law</li>
            <li>Writ & Constitutional Matters</li>
          </ul>

          <h2>9. Consultation Process</h2>
          <p>Initial consultations are structured to examine matter history, review documents, evaluate statutory jurisdiction, and outline recommended legal pathways. Clients receive objective assessments before embarking on formal litigation or dispute resolution.</p>

          <div class="notice" style="margin-top:2rem;">
            <strong>Chamber Contact Details:</strong><br>
            <strong>Office Address:</strong> ${site.contact.address}<br>
            <strong>Phone / Contact:</strong> ${site.contact.phone}<br>
            <strong>Email:</strong> ${site.contact.email}<br>
            <strong>Consultation Timings:</strong> ${site.contact.hours}
          </div>
        </article>
        ${consultationPanel()}
      </div>
    </section>
    ${cta()}
  </main>`;
}

function practiceListing() {
  return `<main id="main-content">${pageHero({ eyebrow:'Practice areas', title:'Legal support for the matters that demand care.', lead:'Explore the major areas of law covered by the LAWPRIME legal knowledge and consultation architecture.', crumbs:[{label:'Practice Areas'}] })}<section class="page-body"><div class="container"><div class="listing-grid">${practiceAreas.map(area => card(`/practice-areas/${area.slug}/`, 'Practice area', area.title, area.short, area.slug)).join('')}</div></div></section>${cta()}</main>`;
}

function practicePage(area) {
  const services = serviceRecords.filter(x => x.areaSlug === area.slug);
  const areaFaqs = faqs.filter(f => f.category === area.title || f.category.includes(area.title.split(' ')[0])).slice(0, 4);
  const relevantLawsMap = {
    'family-matrimonial-law': 'Hindu Marriage Act, 1955; Special Marriage Act, 1954; Guardians and Wards Act, 1890; Protection of Women from Domestic Violence Act, 2005; Family Courts Act, 1984; Hindu Adoptions and Maintenance Act, 1956.',
    'civil-litigation': 'Code of Civil Procedure, 1908; Specific Relief Act, 1963; Limitation Act, 1963; Indian Contract Act, 1872; Court Fees Act, 1870.',
    'criminal-law': 'Bharatiya Nyaya Sanhita, 2023 (BNS) / Indian Penal Code, 1860; Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) / Code of Criminal Procedure, 1973; Bharatiya Sakshya Adhiniyam, 2023 (BSA) / Indian Evidence Act, 1872.',
    'property-real-estate': 'Transfer of Property Act, 1882; Registration Act, 1908; Real Estate (Regulation and Development) Act, 2016 (RERA); Hindu Succession Act, 1956; Indian Stamp Act, 1899.',
    'consumer-law': 'Consumer Protection Act, 2019; Consumer Protection (Direct Selling) Rules, 2021; Real Estate (Regulation and Development) Act, 2016.',
    'banking-finance': 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002 (SARFAESI); Recovery of Debts and Bankruptcy Act, 1993 (RDB Act); Banking Regulation Act, 1949; Reserve Bank of India Directives.',
    'corporate-commercial': 'Companies Act, 2013; Indian Contract Act, 1872; Arbitration and Conciliation Act, 1996; Insolvency and Bankruptcy Code, 2016 (IBC); Commercial Courts Act, 2015.',
    'cheque-bounce': 'Negotiable Instruments Act, 1881 (Sections 138, 139, 141, 142, 143A, 148); Bharatiya Nagarik Suraksha Sanhita, 2023 / Code of Criminal Procedure, 1973.',
    'labour-employment': 'Industrial Disputes Act, 1947; Code on Wages, 2019; Industrial Relations Code, 2020; Payment of Wages Act, 1936; Shops and Commercial Establishments Acts.',
    'writs-constitutional-matters': 'Constitution of India (Articles 14, 19, 21, 32, 226, 227); Administrative Law precedents.'
  };

  const relevantLaws = relevantLawsMap[area.slug] || 'Applicable statutory legislation, central codes, and state rules as relevant to the individual dispute.';

  return `<main id="main-content">
    ${pageHero({ eyebrow:'Practice Area', title:area.title, lead:area.short, crumbs:[{label:'Practice Areas',path:'/practice-areas/'},{label:area.title}] })}
    <section class="page-body">
      <div class="container content-grid">
        <article class="prose">
          <div class="section-image-card">
            <img src="${imageForSlug(area.slug)}" alt="${esc(area.title)} practice area" width="800" height="320" loading="eager" />
          </div>

          <h2>1. Overview</h2>
          <p>The practice area of <strong>${esc(area.title)}</strong> involves statutory rights, procedural obligations, and formal dispute resolution mechanisms under Indian jurisprudence. Matters within this domain require methodical factual evaluation, thorough document verification, and choosing the appropriate judicial or quasi-judicial forum.</p>

          <h2>2. Common Legal Issues</h2>
          <p>Clients seeking legal assistance in this practice area commonly encounter issues such as:</p>
          <ul>
            <li>Disputes requiring formal statutory demand notices or responses.</li>
            <li>Contested litigation requiring plaints, petitions, or written statements before trial courts.</li>
            <li>Urgent applications for interim orders, bail, protection, or temporary injunctions.</li>
            <li>Challenges involving territorial, pecuniary, or subject-matter jurisdiction.</li>
            <li>Execution of decrees, enforcement of awards, or filing statutory appeals and revisions.</li>
          </ul>

          <h2>3. Legal Services We Provide</h2>
          <p>LAWPRIME offers structured legal support tailored to the specific requirements of the matter:</p>
          <ul class="service-list">
            ${services.map(s => `<li><a href="/practice-areas/${s.areaSlug}/${s.slug}/">${esc(s.title)}</a></li>`).join('')}
          </ul>

          <h2>4. Typical Documents / Information Required</h2>
          <p>To evaluate a matter effectively, clients should organize relevant documentary evidence, including:</p>
          <ul>
            <li>Original contracts, deeds, agreements, or official certificates.</li>
            <li>Statutory legal notices served or received, alongside postal receipts and return slips.</li>
            <li>Communications, email records, bank statements, or payment proofs.</li>
            <li>Prior court pleadings, orders, police complaints, or government records.</li>
            <li>A chronological date-wise summary of events leading to the dispute.</li>
          </ul>

          <h2>5. Relevant Indian Laws</h2>
          <p>Legal proceedings in this practice area are governed by specific Indian enactments and statutory codes:</p>
          <div class="notice">
            <strong>Key Legislation:</strong> ${esc(relevantLaws)}
          </div>

          <h2>6. How Legal Assistance Can Help</h2>
          <p>Engaging legal counsel provides structural advantages in navigating the legal system:</p>
          <ul>
            <li>Accurate identification of statutory remedies and applicable limitation periods.</li>
            <li>Proper drafting of legal pleadings adhering to procedural rules and evidentiary standards.</li>
            <li>Representation during court hearings, cross-examination, and oral arguments.</li>
            <li>Objective assessment of settlement options or mediation pathways.</li>
          </ul>

          <h2>7. Litigation / Advisory Process</h2>
          <p>Proceedings typically follow a structured multi-stage trajectory:</p>
          <ol>
            <li><strong>Initial Fact Review:</strong> Examining records, chronology, and legal standing.</li>
            <li><strong>Notice & Pleadings Stage:</strong> Serving statutory notice or filing plaint/petition.</li>
            <li><strong>Summons & Written Response:</strong> Court issuance of process and filing written statement.</li>
            <li><strong>Interim Proceedings & Framing of Issues:</strong> Hearings for interim relief and issue framing.</li>
            <li><strong>Trial & Evidence:</strong> Leading witness testimony, documentary evidence, and cross-examination.</li>
            <li><strong>Final Arguments & Judgment:</strong> Submitting legal precedents and receiving judicial decree.</li>
          </ol>

          <h2>8. Frequently Asked Questions</h2>
          <div class="accordion">
            ${areaFaqs.length ? areaFaqs.map(faqMarkup).join('') : faqMarkup({q: `What is the first step in resolving a ${area.title} dispute?`, a: 'The first step is gathering all relevant contracts, notices, and communications, followed by a formal legal review to determine statutory remedies and applicable jurisdiction.'}, 0)}
          </div>

          <h2>9. Consultation</h2>
          <p>For matter-specific guidance, review your documentation with our legal team to understand your rights, procedural timelines, and recommended legal strategy.</p>
          <a class="btn btn-primary" href="/consultation/">Book a Consultation <span>→</span></a>

          <h2 style="margin-top:2.5rem;">10. Legal Disclaimer</h2>
          <p class="text-muted" style="font-size:0.9rem;">Information presented on this page is for general educational and informational purposes only and does not constitute legal advice. Legal outcomes depend on specific facts, documentary evidence, and applicable law. Viewing this page or submitting an enquiry does not establish an advocate-client relationship.</p>
        </article>
        ${consultationPanel(area.title)}
      </div>
    </section>
    ${cta()}
  </main>`;
}

function servicePage(service) {
  const area = practiceAreas.find(x => x.slug === service.areaSlug);
  const related = serviceRecords.filter(x => x.areaSlug === service.areaSlug && x.slug !== service.slug).slice(0,4);
  const relatedCases = caseTypes.filter(x => x.area === area.title).slice(0,3);
  return `<main id="main-content">${pageHero({ eyebrow:area.title, title:service.title, lead:service.description, crumbs:[{label:'Practice Areas',path:'/practice-areas/'},{label:area.title,path:`/practice-areas/${area.slug}/`},{label:service.title}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><div class="section-image-card"><img src="${imageForSlug(service.areaSlug)}" alt="${esc(service.title)} service visual" width="800" height="320" loading="lazy" /></div><div class="notice">This page provides general legal information. The relevant law, sections, procedure and forum depend on the specific facts, dates and jurisdiction.</div><h2>Service overview</h2><p>${esc(service.title)} concerns require a careful review of the underlying facts, documents, communications and procedural posture. Legal options should be assessed in the context of current law and the relief sought.</p><h2>What is this legal matter?</h2><p>The legal character of a matter is determined by its facts and the applicable statutory and procedural framework. Labels alone do not establish a remedy or a legal outcome.</p><h2>When legal assistance may be required</h2><ul><li>When a dispute, notice, complaint, petition or proceeding affects your rights or obligations.</li><li>When a deadline, hearing, filing or document requires a timely response.</li><li>When preserving records, defining a legal position or choosing a forum may be important.</li></ul><h2>Who may approach the court or forum?</h2><p>Standing to initiate, defend or participate in a proceeding depends on the applicable law, relationship to the dispute, relief sought and procedural rules. This should be assessed in the individual matter.</p><h2>Applicable law and important sections</h2><p>Applicable laws, legal provisions, sections, eligibility requirements and limitation periods can vary. They must be verified against the current law and the individual circumstances before action is taken.</p><h2>Legal requirements and procedure</h2><p>Procedure commonly involves fact review, document preparation, determining jurisdiction, appropriate filing or response, notices and hearings. The actual sequence depends on the applicable forum and matter.</p><h2>Court process</h2><p>Court stages may include filing, scrutiny, notice, pleadings, interim applications, evidence, arguments and orders. They are neither universal nor guaranteed to occur in every matter.</p><h2>Documents to consider</h2><ul><li>Identity and address documents where relevant.</li><li>Agreements, notices, correspondence, records and payment material.</li><li>A clear chronology of events and copies of any court or authority documents.</li></ul><h2>Common legal issues and important considerations</h2><p>Do not delay where a statutory limitation, hearing date or legal notice is involved. Do not rely on generic information as a replacement for a matter-specific review.</p><h2>Important Supreme Court judgments</h2>${noPublished('verified Supreme Court judgment records')}<h2>Important High Court judgments</h2>${noPublished('verified High Court judgment records')}<h2>Frequently asked questions</h2><div class="accordion">${faqs.slice(0,3).map(faqMarkup).join('')}</div><h2>Related services</h2><ul class="service-list">${related.map(x => `<li><a href="/practice-areas/${x.areaSlug}/${x.slug}/">${esc(x.title)}</a></li>`).join('')}</ul><h2>Related case types, insights and resources</h2><div class="info-grid"><div><strong>Case types</strong><p>${relatedCases.length ? relatedCases.map(x => `<a href="/case-types/${x.slug}/">${esc(x.title)}</a>`).join('<br>') : 'Related case types can be mapped as verified content is added.'}</p></div><div><strong>Legal insights</strong><p><a href="/legal-insights/">Verified analysis and updates</a> will be linked here.</p></div><div><strong>Legal resources</strong><p><a href="/legal-resources/">Procedures, documents and glossary</a> support this legal pathway.</p></div><div><strong>Judgments</strong><p><a href="/judgments/">Verified authority</a> will be linked by topic and provision.</p></div></div></article>${consultationPanel(service.title)}</div></section>${cta()}</main>`;
}

function courtsListing() {
  return `<main id="main-content">${pageHero({ eyebrow:'Courts & jurisdictions', title:'The right forum is part of the legal strategy.', lead:'Explore the courts, commissions and tribunals relevant to the LAWPRIME practice architecture.', crumbs:[{label:'Courts & Jurisdictions'}] })}<section class="page-body"><div class="container"><div class="listing-grid">${courts.map(court => card(`/courts/${court.slug}/`, court.type, court.title, court.scope)).join('')}</div></div></section>${cta()}</main>`;
}

function courtPage(court) {
  const relevant = practiceAreas.slice(0,6);
  return `<main id="main-content">${pageHero({ eyebrow:court.type, title:court.title, lead:court.scope, crumbs:[{label:'Courts & Jurisdictions',path:'/courts/'},{label:court.title}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><div class="section-image-card"><img src="/assets/images/courtroom-jurisdiction.png" alt="${esc(court.title)} courtroom and forum" width="800" height="320" loading="lazy" /></div><h2>Court overview</h2><p>${esc(court.title)} is included in the LAWPRIME jurisdictional reference architecture. The availability of a remedy and the correct forum must be determined from the matter’s facts and applicable law.</p><h2>Jurisdiction</h2><p>${esc(court.scope)} Territorial, pecuniary, subject-matter and procedural jurisdiction should be confirmed before a proceeding is filed or defended.</p><h2>Matter types and procedures</h2><p>Filing requirements, court fees, limitation periods, formats, hearing procedures and available remedies can differ by case type and change over time. Consult current rules and a fact-specific legal assessment.</p><h2>Relevant practice areas</h2><ul class="service-list">${relevant.map(area => `<li><a href="/practice-areas/${area.slug}/">${esc(area.title)}</a></li>`).join('')}</ul><h2>Judgments and legal resources</h2>${noPublished('verified court material')}<h2>Frequently asked questions</h2><div class="accordion">${faqs.filter(f => f.category === 'Court Procedure').map(faqMarkup).join('') || faqMarkup(faqs[7],7)}</div></article>${consultationPanel(court.title)}</div></section>${cta()}</main>`;
}

function listingPage(type) {
  const config = {
    'case-types': { title:'Case Types', eyebrow:'Case types', lead:'An organised view of common legal case categories and the questions they raise.', records:caseTypes, type:'Case type', url:x => `/case-types/${x.slug}/`, text:x => `Related area: ${x.area}` },
    'legal-notices': { title:'Legal Notices', eyebrow:'Legal notices', lead:'Understand the role, response and next legal steps associated with common notices.', records:notices, type:'Legal notice', url:x => `/legal-notices/${x.slug}/`, text:() => 'Purpose, process and next steps in general terms.' },
    'legal-resources': { title:'Legal Resources', eyebrow:'Legal resources', lead:'Structured legal context for procedures, terms, documents and statutory research.', records:resources, type:'Resource', url:x => `/legal-resources/${x.slug}/`, text:x => x.text }
  }[type];
  return `<main id="main-content">${pageHero({ eyebrow:config.eyebrow, title:config.title, lead:config.lead, crumbs:[{label:config.title}] })}<section class="page-body"><div class="container"><div class="listing-grid">${config.records.map(x => card(config.url(x),config.type,x.title,config.text(x))).join('')}</div></div></section>${cta()}</main>`;
}

function genericKnowledgePage(kind, record) {
  const isCase = kind === 'case'; const isNotice = kind === 'notice'; const isResource = kind === 'resource';
  const parent = isCase ? {label:'Case Types',path:'/case-types/'} : isNotice ? {label:'Legal Notices',path:'/legal-notices/'} : {label:'Legal Resources',path:'/legal-resources/'};
  const intro = isCase ? `${record.title} may involve a combination of substantive law, procedure, evidence and the correct forum.` : isNotice ? `${record.title} is a general category of communication that may be used to assert a legal position or invite a response before further steps are considered.` : record.text;
  const body = isCase ? `<h2>What is this case type?</h2><p>${esc(intro)} The appropriate legal step depends on the facts, parties, documentation, dates, applicable law and forum.</p><h2>When can it be filed and who can file?</h2><p>Filing rights, limitations and eligibility depend on the remedy and the applicable law. The person approaching the court must have the legal standing required for that proceeding.</p><h2>Applicable law and jurisdiction</h2><p>The applicable provisions and jurisdiction must be verified for the specific matter. Laws and procedures can change, and local court rules may apply.</p><h2>Procedure, documents and court stages</h2><p>Relevant documents can include a chronology, original records, correspondence, agreements, notices and prior filings. Typical stages may include filing, notice, pleadings, evidence, arguments and orders, but each forum and case is different.</p><h2>Important considerations</h2><ul><li>Preserve relevant documents and communications.</li><li>Note every deadline, hearing or limitation issue.</li><li>Do not make assumptions about legal outcomes or the correct forum.</li></ul><h2>Relevant judgments and FAQs</h2>${noPublished('verified related judgments')}<div class="accordion">${faqs.slice(0,2).map(faqMarkup).join('')}</div>` : isNotice ? `<h2>Purpose and use</h2><p>${esc(intro)} It is not a standardised remedy: the wording, legal basis, evidence and timing must suit the individual matter.</p><h2>Legal basis and information to consider</h2><p>The legal basis may depend on the relationship between the parties, applicable contract or statute, prior communications and proposed relief. Names, facts, documents, dates and requested action should be reviewed carefully.</p><h2>Procedure, possible response and next steps</h2><p>A recipient may respond, dispute the position, seek clarification, negotiate or take another lawful step. The sender’s next action depends on the response, limitation, evidence and applicable procedure.</p><h2>Related law and FAQs</h2><p>Legal provisions and the correct forum must be confirmed before an escalated step is taken.</p><div class="accordion">${faqs.slice(0,2).map(faqMarkup).join('')}</div>` : record.slug === 'legal-glossary' ? `<h2>Search the legal glossary</h2><p>These are plain-language starting points. A term’s legal meaning can depend on the statute, court rule and context in which it is used.</p><input class="search-input" id="glossary-search" type="search" placeholder="Search legal terms" aria-label="Search legal glossary"><div class="listing-grid" id="glossary-list" style="margin-top:1.2rem">${legalGlossary.map(glossaryCard).join('')}</div>` : `<h2>Resource overview</h2><p>${esc(intro)} Use it to frame questions and prepare records, not as a replacement for a fact-specific legal assessment.</p><h2>How to use this resource</h2><p>Confirm that information remains current and relevant to the correct forum and jurisdiction. Court rules, legislation and interpretation can change.</p><h2>Related legal pathways</h2><p>Explore the relevant practice area, court or case type before taking a procedural step.</p>`;
  return `<main id="main-content">${pageHero({ eyebrow:isCase ? 'Case type' : isNotice ? 'Legal notice' : 'Legal resource', title:record.title, lead:intro, crumbs:[parent,{label:record.title}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><div class="notice">This guide is general information only and should not be used as a substitute for advice on a specific legal situation.</div>${body}<h2>Related resources</h2><div class="info-grid"><div><strong>Practice areas</strong><p>Explore the underlying area of law relevant to the matter.</p></div><div><strong>Courts and forums</strong><p>Review jurisdictional information before planning a filing or response.</p></div><div><strong>FAQs</strong><p>Start with common procedural questions and qualified answers.</p></div><div><strong>Consultation</strong><p>Request a fact-specific discussion if you need professional guidance.</p></div></div></article>${consultationPanel(record.title)}</div></section>${cta()}</main>`;
}

function glossaryCard(item) {
  return `<article class="listing-card"><span class="meta">Legal term</span><h3>${esc(item.term)}</h3><p>${esc(item.definition)}</p></article>`;
}

function judgmentsPage() {
  const filters = [['court','Court'],['year','Year'],['practiceArea','Practice area'],['act','Act / statute'],['sections','Section'],['topic','Topic']];
  return `<main id="main-content">${pageHero({ eyebrow:'Judgment library', title:'Legal authority, structured for serious research.', lead:'A curated starting collection for family-law research, structured to connect courts, practice areas, statutes, sections, issues and related legal guidance.', crumbs:[{label:'Judgment Library'}] })}<section class="page-body"><div class="container"><div class="notice">These initial records were indexed from the user-supplied compendium. They are concise research summaries, not legal advice; an official full-text source should be linked before relying on any case-specific proposition.</div><div class="filter-bar" style="margin-top:1.5rem">${filters.map(([field,label]) => judgmentFilter(field,label)).join('')}</div>${judgmentCards(judgments)}</div></section>${cta()}</main>`;
}

function judgmentFilter(field, label) {
  const options = [...new Set(judgments.map(item => item[field]).filter(Boolean))].sort();
  return `<select data-judgment-filter="${field}" aria-label="Filter by ${label}"><option value="">Filter by ${label}</option>${options.map(value => `<option value="${esc(value)}">${esc(value)}</option>`).join('')}</select>`;
}

function judgmentCards(records) {
  return `<div class="listing-grid" id="judgment-results">${records.length ? records.map(judgment => card(`/judgments/${judgment.slug}/`, judgment.topic || judgment.court || 'Judgment', judgment.caseName, [judgment.citation, judgment.year].filter(Boolean).join(' · '))).join('') : '<div class="empty-state" style="grid-column:1/-1"><h2>No judgments match these filters.</h2><p>Clear one or more filters to view the curated collection.</p></div>'}</div>`;
}

function judgmentPage(judgment) {
  const facts = judgment.facts || 'Verified facts have not yet been published for this record.';
  const issues = judgment.issues || 'Verified legal issues have not yet been published for this record.';
  const findings = judgment.findings || 'Verified court findings have not yet been published for this record.';
  return `<main id="main-content">${pageHero({ eyebrow:judgment.court || 'Judgment', title:judgment.caseName, lead:judgment.citation || 'Verified legal authority', crumbs:[{label:'Judgment Library',path:'/judgments/'},{label:judgment.caseName}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><div class="notice">This concise record is sourced from a user-provided case-law compendium. Confirm the official judgment and current law before relying on a proposition in a legal matter.</div><div class="info-grid"><div><strong>Court</strong><p>${esc(judgment.court || 'Not published')}</p></div><div><strong>Citation / reference</strong><p>${esc(judgment.citation || 'Not published')}</p></div><div><strong>Bench</strong><p>${esc(judgment.bench || 'Not published')}</p></div><div><strong>Act / statute</strong><p>${esc(judgment.act || 'Not published')}</p></div></div><h2>Relevant sections</h2><p>${esc(judgment.sections || 'Not published')}</p><h2>Facts</h2><p>${esc(facts)}</p><h2>Legal issues</h2><p>${esc(issues)}</p><h2>Arguments</h2><p>${esc(judgment.arguments || 'Arguments are not separately recorded in this source summary.')}</p><h2>Court findings and decision</h2><p>${esc(findings)}</p><p>${esc(judgment.decision || 'The operative decision is not published for this record.')}</p><h2>Ratio / legal principle</h2><p>${esc(judgment.ratio || 'A verified legal principle is not published for this record.')}</p><h2>Practical significance</h2><p>${esc(judgment.significance || 'Practical significance has not been published for this record.')}</p><h2>Source / full judgment</h2>${judgment.sourceUrl ? `<p><a class="link-arrow" href="${esc(judgment.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open verified source</a></p>` : `<p>${esc(judgment.source || 'No source reference is published for this record.')}</p>`}</article>${consultationPanel(judgment.caseName)}</div></section>${cta()}</main>`;
}

function insightsPage() {
  const categories = ['All topics', 'Family Law', 'Criminal Law', 'Civil Litigation', 'Property Law', 'Consumer Law', 'Banking & Finance'];
  return `<main id="main-content">${pageHero({ eyebrow:'Legal insights', title:'Legal analysis grounded in procedure & verified authority.', lead:'A structured collection of procedural explainers, statutory guides, and legal analysis.', crumbs:[{label:'Legal Insights'}] })}<section class="page-body"><div class="container"><div class="filter-bar">${categories.map((x,i) => `<button class="btn ${i===0?'active':''}" type="button" data-insight-category="${esc(x)}">${esc(x)}</button>`).join('')}</div>${insights.length ? `<div class="listing-grid" id="insight-list">${insights.map(insight => card(`/legal-insights/${insight.slug}/`, insight.category || 'Legal insight', insight.title, insight.excerpt || '', insight.relatedAreaSlug)).join('')}</div>` : noPublished('legal insights')}</div></section>${cta()}</main>`;
}

function insightPage(insight) {
  const relatedArea = practiceAreas.find(x => x.slug === insight.relatedAreaSlug || x.title === insight.category);
  const relatedService = serviceRecords.find(x => x.slug === insight.relatedServiceSlug);
  const relatedJudgment = judgments.find(x => x.slug === insight.relatedJudgmentSlug);
  const matchingFaqs = faqs.filter(f => f.category === insight.category || (relatedArea && f.category === relatedArea.title)).slice(0, 3);
  const relatedArticles = insights.filter(x => x.slug !== insight.slug && x.category === insight.category).slice(0, 3);

  return `<main id="main-content">${pageHero({ eyebrow:insight.category || 'Legal insight', title:insight.title, lead:insight.excerpt || 'Verified legal analysis.', crumbs:[{label:'Legal Insights',path:'/legal-insights/'},{label:insight.title}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><div class="info-grid"><div><strong>Author</strong><p>${esc(insight.author || 'LAWPRIME Legal Desk')}</p></div><div><strong>Published</strong><p>${esc(insight.publishedAt || 'August 8, 2026')}</p></div><div><strong>Updated</strong><p>${esc(insight.updatedAt || 'August 8, 2026')}</p></div><div><strong>Applicable law</strong><p>${esc(insight.applicableLaw || 'Varies by the specific matter')}</p></div></div><div class="insight-content" style="margin-top:1.5rem;">${insight.body || '<p>The full verified analysis has not yet been published.</p>'}</div><h2>Statutory Provisions & Authorities</h2><p><strong>Relevant Sections:</strong> ${esc(insight.sections || 'Varies by matter and jurisdiction.')}</p>${insight.judgments ? `<p><strong>Cited Authorities:</strong> ${esc(insight.judgments)}</p>` : ''}${relatedJudgment ? `<div class="notice"><strong>Related Verified Judgment:</strong> <a href="/judgments/${relatedJudgment.slug}/">${esc(relatedJudgment.caseName)} (${esc(relatedJudgment.year)})</a> — ${esc(relatedJudgment.ratio || relatedJudgment.citation)}</div>` : ''}<h2>Related Legal Pathway</h2><div class="info-grid"><div><strong>Practice Area</strong><p>${relatedArea ? `<a href="/practice-areas/${relatedArea.slug}/">${esc(relatedArea.title)}</a>` : 'Legal Practice'}</p></div><div><strong>Related Service</strong><p>${relatedService ? `<a href="/practice-areas/${relatedService.areaSlug}/${relatedService.slug}/">${esc(relatedService.title)}</a>` : 'Legal Consultation'}</p></div><div><strong>Judgment Library</strong><p>${relatedJudgment ? `<a href="/judgments/${relatedJudgment.slug}/">${esc(relatedJudgment.caseName)}</a>` : '<a href="/judgments/">Verified Judgments</a>'}</p></div><div><strong>Consultation</strong><p><a href="/consultation/">Request Fact Review</a></p></div></div>${matchingFaqs.length ? `<h2>Frequently Asked Questions</h2><div class="accordion">${matchingFaqs.map(faqMarkup).join('')}</div>` : ''}${relatedArticles.length ? `<h2>Related Guides & Insights</h2><div class="listing-grid">${relatedArticles.map(a => card(`/legal-insights/${a.slug}/`, a.category, a.title, a.excerpt)).join('')}</div>` : ''}</article>${consultationPanel(insight.title)}</div></section>${cta()}</main>`;
}

function lawyersPage() {
  return `<main id="main-content">${pageHero({ eyebrow:'Lawyers', title:'Legal Team', lead:'Enrolled Advocates practicing before the courts and tribunals of Chandigarh Tricity, Derabassi, and the Punjab & Haryana High Court.', crumbs:[{label:'Lawyers'}] })}<section class="page-body"><div class="container">${lawyers.length ? `<div class="listing-grid">${lawyers.map(lawyer => card(`/lawyers/${lawyer.slug}/`, lawyer.enrollmentNo ? `Enrollment: ${esc(lawyer.enrollmentNo)}` : 'Enrolled Advocate', lawyer.name, lawyer.summary || '')).join('')}</div>` : `<div class="empty-state"><span class="label">Profile standard</span><h2>No lawyer profile is currently published.</h2></div>`}</div></section>${cta()}</main>`;
}

function lawyerPage(lawyer) {
  const initials = lawyer.name.replace(/^Advocate\s+/, '').split(' ').map(n => n[0]).join('');
  const photoPlaceholder = `<div class="lawyer-avatar-placeholder" style="width:72px;height:72px;border-radius:50%;background:#0c1e2d;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:600;margin-bottom:1.2rem;" aria-label="Professional avatar placeholder">${esc(initials)}</div>`;
  return `<main id="main-content">${pageHero({ eyebrow:lawyer.designation || 'Professional profile', title:lawyer.name, lead:lawyer.summary || 'Verified professional profile.', crumbs:[{label:'Lawyers',path:'/lawyers/'},{label:lawyer.name}] })}<section class="page-body"><div class="container content-grid"><article class="prose">${photoPlaceholder}${lawyer.enrollmentNo ? `<p style="font-weight:600;color:var(--text-muted,#555);">Enrollment No: ${esc(lawyer.enrollmentNo)}</p>` : ''}<h2>Professional Profile</h2><p>${esc(lawyer.profile || 'A verified professional profile has not yet been published.')}</p><h2>Primary Areas of Practice</h2><p>${esc(lawyer.practiceAreas || 'Not published')}</p><h2>Courts & Jurisdictions</h2><p>${esc(lawyer.courts || 'Not published')}</p><h2>Experience & Representative Work</h2><p>${esc(lawyer.experience || 'Not published')}</p><p>${esc(lawyer.representativeWork || 'Representative work is not published.')}</p><h2>Relevant Judgments & Insights</h2><p>${esc(lawyer.judgments || 'Not published')}</p><p>${esc(lawyer.insights || 'Not published')}</p></article>${consultationPanel(lawyer.name)}</div></section>${cta()}</main>`;
}

function faqsPage() {
  const categories = ['All', ...new Set(faqs.map(x => x.category))];
  return `<main id="main-content">${pageHero({ eyebrow:'Frequently asked questions', title:'Useful questions deserve careful answers.', lead:'General legal information to help orient a conversation—not replace legal advice on an individual matter.', crumbs:[{label:'FAQs'}] })}<section class="page-body"><div class="container faq-layout"><aside class="faq-cats" aria-label="FAQ categories">${categories.map((x,i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-faq-category="${esc(x)}">${esc(x)}</button>`).join('')}</aside><div class="accordion" id="faq-list">${faqs.map(faqMarkup).join('')}</div></div></section>${cta()}</main>`;
}

function formMarkup(kind) {
  const isConsultation = kind === 'consultation';
  return `<form data-form novalidate><div class="form-grid"><div class="field"><label for="name">Full name <span aria-hidden="true">*</span></label><input id="name" name="name" autocomplete="name" required><span class="field-error"></span></div><div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required><span class="field-error"></span></div><div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" inputmode="tel" autocomplete="tel"><span class="field-error"></span></div><div class="field"><label for="matter">${isConsultation ? 'Primary legal concern' : 'Subject'} <span aria-hidden="true">*</span></label><select id="matter" name="matter" required><option value="">Select an option</option>${practiceAreas.map(x => `<option value="${esc(x.title)}">${esc(x.title)}</option>`).join('')}<option value="Other">Other</option></select><span class="field-error"></span></div><div class="field full"><label for="message">Briefly describe your question <span aria-hidden="true">*</span></label><textarea id="message" name="message" required maxlength="2000" aria-describedby="form-note"></textarea><span class="field-error"></span></div><div class="field full" style="position:absolute;left:-9999px" aria-hidden="true"><label for="website">Leave this field blank</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div></div><button class="btn btn-primary" type="submit">${isConsultation ? 'Request consultation' : 'Send enquiry'} <span aria-hidden="true">→</span></button><div class="form-status" role="status" aria-live="polite"></div><p id="form-note" class="form-note">Do not send confidential documents or highly sensitive information through this form. Before launch, connect this validated form to an approved secure endpoint; no form data is transmitted by this static demonstration.</p></form>`;
}

function contactPage(isConsultation = false) {
  const title = isConsultation ? 'Request a consultation.' : 'Contact LAWPRIME';
  const lead = isConsultation ? 'Share a concise outline of your legal matter. Consultations are available during working hours (10:00 AM – 5:00 PM).' : 'Direct contact channels and chamber location at Sector 43 District Courts, Chandigarh.';
  const waUrl = 'https://wa.me/919855243212?text=Hello%20LAWPRIME%2C%20I%20would%20like%20to%20discuss%20a%20legal%20matter%20and%20request%20a%20consultation.';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Chamber+No.+385,+District+Courts,+Sector+43,+Chandigarh';
  const embedMapUrl = 'https://maps.google.com/maps?q=District+Courts+Sector+43+Chandigarh&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return `<main id="main-content">
    ${pageHero({ eyebrow:isConsultation ? 'Consultation' : 'Contact', title, lead, crumbs:[{label:isConsultation ? 'Consultation' : 'Contact'}] })}
    <section class="page-body">
      <div class="container contact-grid">
        <aside class="contact-panel">
          <img src="/assets/images/legal-consultation.png" alt="LAWPRIME legal consultation desk and document review" class="contact-image" width="600" height="280" loading="lazy" />
          <span class="eyebrow">Chamber details</span>
          <h2>Sector 43 District Courts</h2>
          <p>Chamber No. 385, District Courts, Sector 43, Chandigarh – 160043</p>
          <div class="contact-details">
            <div><span>Phone</span><strong><a href="tel:9855243212">9855243212</a></strong></div>
            <div><span>WhatsApp</span><strong><a href="${waUrl}" target="_blank" rel="noopener noreferrer">9855243212</a></strong></div>
            <div><span>Email</span><strong><a href="mailto:guptaslaw@gmail.com">guptaslaw@gmail.com</a></strong></div>
            <div><span>Office / Chamber</span><strong>Chamber No. 385, District Courts, Sector 43, Chandigarh – 160043</strong></div>
            <div><span>Working Hours</span><strong>10:00 AM – 5:00 PM</strong></div>
          </div>
          <div style="margin-top:1.5rem;">
            <a class="btn btn-whatsapp" href="${waUrl}" target="_blank" rel="noopener noreferrer" aria-label="Connect via WhatsApp for legal consultation">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.005L2 22l5.127-1.34a9.96 9.96 0 004.88 1.275h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.039-5.176-2.926-7.062A9.92 9.92 0 0012.012 2zm5.791 14.195c-.244.688-1.423 1.312-1.96 1.385-.502.068-1.155.1-3.344-.808-2.798-1.162-4.6-4.004-4.739-4.19-.139-.186-1.134-1.506-1.134-2.873 0-1.367.714-2.04.97-2.316.255-.276.557-.345.742-.345.186 0 .372.002.534.01.174.008.406-.066.635.483.232.557.789 1.92.858 2.06.069.139.116.302.023.488-.093.186-.139.302-.278.464-.139.162-.292.363-.418.487-.139.139-.284.29-.122.569.162.279.721 1.19 1.547 1.926 1.063.947 1.96 1.24 2.239 1.379.278.139.441.116.603-.069.162-.186.697-.812.882-1.09.186-.279.371-.232.627-.139.255.093 1.625.766 1.903.905.278.139.464.209.534.325.07.116.07.674-.174 1.362z"/></svg>
              Connect on WhatsApp
            </a>
          </div>
        </aside>

        <div>
          <span class="eyebrow">${isConsultation ? 'Consultation request' : 'Initial enquiry'}</span>
          <h2 style="margin:.7rem 0 1.6rem">Tell us the essentials.</h2>
          ${formMarkup(isConsultation ? 'consultation' : 'contact')}
        </div>
      </div>

      <div class="container map-section">
        <span class="eyebrow">Location map</span>
        <h2>Our Office Location</h2>
        <p class="lead">LAWPRIME is conveniently located at Chamber No. 385, District Courts Complex, Sector 43, Chandigarh. Visitors are advised to schedule a consultation during working hours (10:00 AM – 5:00 PM).</p>
        <div class="map-container">
          <iframe title="LAWPRIME Office Location Map at Sector 43 District Courts Chandigarh" src="${embedMapUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a class="btn btn-light" href="${mapUrl}" target="_blank" rel="noopener noreferrer">
          Open in Google Maps ↗
        </a>
      </div>
    </section>
  </main>`;
}

function careers() {
  return `<main id="main-content">${pageHero({ eyebrow:'Careers', title:'Careers at LAWPRIME', lead:'A future-facing platform for legal work grounded in accuracy, clarity and professional responsibility.', crumbs:[{label:'Careers'}] })}<section class="page-body"><div class="container content-grid"><article class="prose"><h2>Opportunities</h2><p>No current roles are published. This page is ready to support verified opportunities, application requirements and recruitment process information when available.</p><h2>Professional standards</h2><p>LAWPRIME values careful legal thinking, discretion, writing quality and respect for the seriousness of client matters. Opportunities will be posted with complete and verified information.</p></article>${consultationPanel('LAWPRIME')}</div></section></main>`;
}

function legalPage(key) {
  const pages = {
    'privacy-policy': { label:'Privacy Policy', title:'Privacy with appropriate care.', lead:'How this website handles information submitted through its public interface.', sections:[['Information collected','This static website does not currently transmit form submissions to a server. If a secure contact endpoint is connected, the policy must be updated to specify data categories, purpose, retention, security controls and contact details.'],['Use of information','Information should only be used to respond to an enquiry, administer a requested consultation and meet applicable legal obligations.'],['Your choices','Do not submit confidential documents or sensitive personal information through the public form until a secure and approved process is in place.']] },
    'terms-of-use': { label:'Terms of Use', title:'Terms for using this website.', lead:'The conditions governing access to LAWPRIME’s public informational content.', sections:[['General information only','This website is intended for general informational purposes. It does not constitute legal advice or establish a lawyer–client relationship.'],['No reliance or outcome promise','Website users should not rely on its content as a substitute for matter-specific legal advice. No legal outcome, timeline or result is promised.'],['Acceptable use','Do not use this website unlawfully, interfere with its operation or submit harmful, misleading or confidential material through public forms.']] },
    'website-disclaimer': { label:'Website Disclaimer', title:'Website information, carefully qualified.', lead:'Important limits on the information published by LAWPRIME.', sections:[['Not legal advice','Content is general legal information and may not reflect the latest law, local rules or a user’s particular facts.'],['No lawyer–client relationship','Viewing this website, contacting LAWPRIME or completing an enquiry form does not by itself create a professional relationship.'],['Accuracy and updates','Legal materials require ongoing verification. Content may be updated or removed where it is incomplete, outdated or not sufficiently verified.']] },
    'legal-disclaimer': { label:'Legal Disclaimer', title:'No outcome can be assured.', lead:'Legal matters turn on facts, evidence, law, procedure and the decision of the relevant forum.', sections:[['No guarantees','LAWPRIME makes no guarantee regarding bail, divorce, compensation, court decisions, settlements or any other legal outcome.'],['Individual assessment required','Legal rights and remedies depend on the circumstances. A qualified review of relevant documents, timelines and current law is required before advice can be given.'],['Jurisdictional variation','Law and procedure can differ by jurisdiction and change through legislation, rules and judicial decisions.']] }
  };
  const page = pages[key];
  return `<main id="main-content">${pageHero({ eyebrow:'LAWPRIME', title:page.title, lead:page.lead, crumbs:[{label:page.label}] })}<section class="page-body"><div class="container content-grid"><article class="prose">${page.sections.map(([heading,text]) => `<h2>${heading}</h2><p>${text}</p>`).join('')}<p class="text-muted">Last reviewed: ${new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}. This text should be reviewed by an authorised legal professional before public launch.</p></article>${consultationPanel()}</div></section></main>`;
}

function consultationPanel(context = 'your matter') {
  return `<aside class="side-panel"><span class="eyebrow">Next step</span><h3>Discuss ${esc(context)} with care.</h3><p>A consultation request should start with the essentials. Do not share sensitive material through an unsecured public form.</p><a class="btn btn-light" href="/consultation/">Request consultation</a><nav class="side-nav" aria-label="Related pages"><a href="/faqs/">Frequently asked questions</a><a href="/courts/">Courts & jurisdictions</a><a href="/legal-resources/">Legal resources</a></nav></aside>`;
}

function notFound() {
  return `<main id="main-content">${pageHero({eyebrow:'404',title:'This page has not been found.',lead:'The address may be incorrect, or the page may not yet be published.',crumbs:[{label:'Page not found'}]})}<section class="page-body"><div class="container"><a class="btn btn-primary" href="/">Return home</a></div></section></main>`;
}

function resolve() {
  const current = path();
  if (current === '/') return { html:home(), meta:{title:'LAWPRIME | Legal counsel with clarity',description:site.description,type:'WebPage'} };
  const staticRoutes = {
    '/about': [about, 'About LAWPRIME | LAWPRIME'], '/practice-areas': [practiceListing, 'Practice Areas | LAWPRIME'], '/courts': [courtsListing, 'Courts & Jurisdictions | LAWPRIME'], '/case-types': [() => listingPage('case-types'), 'Case Types | LAWPRIME'], '/legal-notices': [() => listingPage('legal-notices'), 'Legal Notices | LAWPRIME'], '/legal-resources': [() => listingPage('legal-resources'), 'Legal Resources | LAWPRIME'], '/judgments': [judgmentsPage, 'Judgment Library | LAWPRIME'], '/legal-insights': [insightsPage, 'Legal Insights | LAWPRIME'], '/lawyers': [lawyersPage, 'Lawyers | LAWPRIME'], '/faqs': [faqsPage, 'Frequently Asked Questions | LAWPRIME'], '/contact': [() => contactPage(false), 'Contact | LAWPRIME'], '/consultation': [() => contactPage(true), 'Consultation | LAWPRIME'], '/careers': [careers, 'Careers | LAWPRIME'], '/privacy-policy': [() => legalPage('privacy-policy'), 'Privacy Policy | LAWPRIME'], '/terms-of-use': [() => legalPage('terms-of-use'), 'Terms of Use | LAWPRIME'], '/website-disclaimer': [() => legalPage('website-disclaimer'), 'Website Disclaimer | LAWPRIME'], '/legal-disclaimer': [() => legalPage('legal-disclaimer'), 'Legal Disclaimer | LAWPRIME']
  };
  if (staticRoutes[current]) { const [render,title] = staticRoutes[current]; return {html:render(),meta:{title,description:site.description,type:'WebPage'}}; }
  const parts = current.split('/').filter(Boolean);
  if (parts[0] === 'practice-areas' && parts.length === 2) { const area=practiceAreas.find(x=>x.slug===parts[1]); if (area) return {html:practicePage(area),meta:{title:`${area.title} | LAWPRIME`,description:area.short,type:'LegalService'}}; }
  if (parts[0] === 'practice-areas' && parts.length === 3) { const service=serviceRecords.find(x=>x.areaSlug===parts[1]&&x.slug===parts[2]); if (service) return {html:servicePage(service),meta:{title:`${service.title} | LAWPRIME`,description:service.description,type:'LegalService'}}; }
  if (parts[0] === 'courts' && parts.length === 2) { const court=courts.find(x=>x.slug===parts[1]); if (court) return {html:courtPage(court),meta:{title:`${court.title} | LAWPRIME`,description:court.scope,type:'WebPage'}}; }
  if (parts[0] === 'case-types' && parts.length === 2) { const record=caseTypes.find(x=>x.slug===parts[1]); if(record) return {html:genericKnowledgePage('case',record),meta:{title:`${record.title} | LAWPRIME`,description:`A general guide to ${record.title.toLowerCase()}.`,type:'WebPage'}}; }
  if (parts[0] === 'legal-notices' && parts.length === 2) { const record=notices.find(x=>x.slug===parts[1]); if(record) return {html:genericKnowledgePage('notice',record),meta:{title:`${record.title} | LAWPRIME`,description:`A general guide to ${record.title.toLowerCase()}.`,type:'WebPage'}}; }
  if (parts[0] === 'legal-resources' && parts.length === 2) { const record=resources.find(x=>x.slug===parts[1]); if(record) return {html:genericKnowledgePage('resource',record),meta:{title:`${record.title} | LAWPRIME`,description:record.text,type:'WebPage'}}; }
  if (parts[0] === 'judgments' && parts.length === 2) { const judgment=judgments.find(x=>x.slug===parts[1]); if(judgment) return {html:judgmentPage(judgment),meta:{title:`${judgment.caseName} | LAWPRIME`,description:judgment.citation || 'Verified legal judgment.',type:'WebPage'}}; }
  if (parts[0] === 'legal-insights' && parts.length === 2) { const insight=insights.find(x=>x.slug===parts[1]); if(insight) return {html:insightPage(insight),meta:{title:`${insight.title} | LAWPRIME`,description:insight.excerpt || 'Verified legal insight.',type:'Article'}}; }
  if (parts[0] === 'lawyers' && parts.length === 2) { const lawyer=lawyers.find(x=>x.slug===parts[1]); if(lawyer) return {html:lawyerPage(lawyer),meta:{title:`${lawyer.name} | LAWPRIME`,description:lawyer.summary || 'Verified professional profile.',type:'Person'}}; }
  return {html:notFound(),meta:{title:'Page not found | LAWPRIME',description:'This page is not available.',type:'WebPage',noindex:true}};
}

function setMeta(meta) {
  document.title=meta.title;
  const description=document.querySelector('meta[name="description"]'); if(description) description.content=meta.description;
  const canonical=document.querySelector('link[rel="canonical"]'); if(canonical) canonical.href=`${baseUrl}${path() === '/' ? '/' : `${path()}/`}`;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',meta.description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical?.href || baseUrl);
  const robots=document.querySelector('meta[name="robots"]'); if(robots) robots.content=meta.noindex?'noindex,nofollow':'index,follow';
  const schema={ '@context':'https://schema.org', '@type':meta.type || 'WebPage', name:meta.title.replace(' | LAWPRIME',''), description:meta.description, url:canonical?.href || baseUrl };
  document.querySelector('#schema-data').textContent=JSON.stringify(schema);
}

function render() {
  const result=resolve(); setMeta(result.meta);
  const floatingWa = `<a class="floating-whatsapp" href="https://wa.me/919855243212?text=Hello%20LAWPRIME%2C%20I%20would%20like%20to%20discuss%20a%20legal%20matter%20and%20request%20a%20consultation." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with LAWPRIME"><svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.005L2 22l5.127-1.34a9.96 9.96 0 004.88 1.275h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.039-5.176-2.926-7.062A9.92 9.92 0 0012.012 2zm5.791 14.195c-.244.688-1.423 1.312-1.96 1.385-.502.068-1.155.1-3.344-.808-2.798-1.162-4.6-4.004-4.739-4.19-.139-.186-1.134-1.506-1.134-2.873 0-1.367.714-2.04.97-2.316.255-.276.557-.345.742-.345.186 0 .372.002.534.01.174.008.406-.066.635.483.232.557.789 1.92.858 2.06.069.139.116.302.023.488-.093.186-.139.302-.278.464-.139.162-.292.363-.418.487-.139.139-.284.29-.122.569.162.279.721 1.19 1.547 1.926 1.063.947 1.96 1.24 2.239 1.379.278.139.441.116.603-.069.162-.186.697-.812.882-1.09.186-.279.371-.232.627-.139.255.093 1.625.766 1.903.905.278.139.464.209.534.325.07.116.07.674-.174 1.362z"/></svg></a>`;
  app.innerHTML=`<div class="site-shell">${header()}${result.html}${footer()}${floatingWa}${searchModal()}</div>`; bindUI(); window.scrollTo(0, 0);
}

function searchModal() {
  return `<div class="search-modal" data-search-modal role="dialog" aria-modal="true" aria-labelledby="search-title"><div class="search-box"><div class="search-head"><h2 id="search-title">Search LAWPRIME</h2><button class="close-btn" type="button" data-search-close aria-label="Close search">×</button></div><label class="sr-only" for="site-search">Search all content</label><input class="search-input" id="site-search" type="search" placeholder="Search practice areas, services, courts, FAQs…" autocomplete="off"><div class="search-results" data-search-results><p class="text-muted">Start typing to search the legal knowledge platform.</p></div></div></div>`;
}

function bindUI() {
  window.lawprimeUiAbort?.abort();
  const controller = new AbortController();
  window.lawprimeUiAbort = controller;
  document.querySelectorAll('a[href^="/"]').forEach(a => a.addEventListener('click', e => { if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return; e.preventDefault(); navigate(a.getAttribute('href')); }));
  let activeMenu = null;
  const closeMega = () => { document.querySelectorAll('[data-mega-panel]').forEach(x=>x.classList.remove('open')); document.querySelectorAll('[data-mega]').forEach(x=>x.setAttribute('aria-expanded','false')); activeMenu=null; };
  document.querySelectorAll('[data-mega]').forEach(button => button.addEventListener('click', () => { const key=button.dataset.mega; if(activeMenu===key) return closeMega(); closeMega(); document.querySelector(`[data-mega-panel="${key}"]`).classList.add('open'); button.setAttribute('aria-expanded','true'); activeMenu=key; }));
  document.querySelectorAll('[data-nav]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.path)));
  document.addEventListener('click', e => { if(activeMenu && !e.target.closest('.site-header')) closeMega(); }, { signal: controller.signal });
  document.querySelector('[data-mobile-toggle]')?.addEventListener('click', e => { const panel=document.querySelector('[data-mobile-panel]'); const open=panel.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded',String(open)); document.body.classList.toggle('menu-open',open); });
  document.querySelectorAll('[data-mobile-sub-toggle]').forEach(button => button.addEventListener('click', () => button.nextElementSibling.classList.toggle('open')));
  document.querySelectorAll('.faq-question').forEach(button=>button.addEventListener('click',()=>{ const item=button.closest('.faq-item'); const open=item.classList.toggle('open'); button.setAttribute('aria-expanded',String(open)); }));
  document.querySelectorAll('[data-faq-category]').forEach(button=>button.addEventListener('click',()=>{ document.querySelectorAll('[data-faq-category]').forEach(x=>x.classList.remove('active')); button.classList.add('active'); const category=button.dataset.faqCategory; document.querySelectorAll('#faq-list .faq-item').forEach((item,i)=>item.hidden=category!=='All'&&faqs[i].category!==category); }));
  document.querySelectorAll('[data-insight-category]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-insight-category]').forEach(x => x.classList.remove('active')); button.classList.add('active'); const cat = button.dataset.insightCategory; const filtered = (cat === 'All topics' || cat === 'All') ? insights : insights.filter(x => x.category === cat); const list = document.querySelector('#insight-list'); if(list) list.innerHTML = filtered.length ? filtered.map(item => card(`/legal-insights/${item.slug}/`, item.category || 'Legal insight', item.title, item.excerpt || '', item.relatedAreaSlug)).join('') : '<p class="text-muted">No published guides match this category.</p>'; }));
  document.querySelector('#glossary-search')?.addEventListener('input', event => { const query=event.target.value.trim().toLowerCase(); document.querySelector('#glossary-list').innerHTML=legalGlossary.filter(item => `${item.term} ${item.definition}`.toLowerCase().includes(query)).map(glossaryCard).join('') || '<p class="text-muted">No glossary terms match that search.</p>'; });
  document.querySelectorAll('[data-judgment-filter]').forEach(select => select.addEventListener('change', () => {
    const activeFilters = Object.fromEntries([...document.querySelectorAll('[data-judgment-filter]')].filter(item => item.value).map(item => [item.dataset.judgmentFilter, item.value]));
    document.querySelector('#judgment-results').outerHTML = judgmentCards(judgments.filter(judgment => Object.entries(activeFilters).every(([field, value]) => judgment[field] === value)));
  }));
  const modal=document.querySelector('[data-search-modal]'); const input=document.querySelector('#site-search');
  const openSearch=()=>{ modal.classList.add('open'); document.body.classList.add('modal-open'); setTimeout(()=>input.focus(),0); };
  const closeSearch=()=>{ modal.classList.remove('open'); document.body.classList.remove('modal-open'); };
  document.querySelector('[data-search-open]')?.addEventListener('click',openSearch); document.querySelector('[data-search-close]')?.addEventListener('click',closeSearch); modal?.addEventListener('click',e=>{if(e.target===modal)closeSearch();});
  input?.addEventListener('input',e=>renderSearch(e.target.value));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMega();closeSearch();} if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}}, { signal: controller.signal });
  document.querySelectorAll('[data-form]').forEach(bindForm);
}

function renderSearch(query) {
  const root=document.querySelector('[data-search-results]'); const clean=query.trim().toLowerCase();
  if(!clean) { root.innerHTML='<p class="text-muted">Start typing to search the legal knowledge platform.</p>'; return; }
  const hits=searchableItems.filter(item=>`${item.title} ${item.type} ${item.text}`.toLowerCase().includes(clean)).slice(0,12);
  root.innerHTML=hits.length ? hits.map(item=>`<a class="search-result" href="${item.path}"><span class="result-type">${esc(item.type)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></a>`).join('') : `<p class="text-muted">No published content matches “${esc(query)}”.</p>`;
  root.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); document.querySelector('[data-search-modal]').classList.remove('open');document.body.classList.remove('modal-open');navigate(a.getAttribute('href'));}));
}

function bindForm(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    const status = form.querySelector('.form-status');
    form.querySelectorAll('[required]').forEach(field => {
      const error = field.closest('.field').querySelector('.field-error');
      let message = '';
      if (!field.value.trim()) message = 'This field is required.';
      else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = 'Enter a valid email address.';
      else if (field.id === 'phone' && field.value.trim() && !/^[0-9+\s()-]{7,15}$/.test(field.value.trim())) message = 'Enter a valid phone number.';
      error.textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
      if (message) valid = false;
    });
    if (form.querySelector('[name="website"]').value) { valid = false; }
    if (!valid) {
      status.classList.remove('show');
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    status.innerHTML = '<strong>Form submission validated.</strong> Note: As this is a static platform, connect your server submission endpoint in <code>assets/app.js</code> to process forms directly to your office email.';
    status.classList.add('show');
    form.reset();
  });
}

function navigate(to) { history.pushState({},'',to); document.body.classList.remove('menu-open','modal-open'); render(); }
window.addEventListener('popstate',render);
render();

