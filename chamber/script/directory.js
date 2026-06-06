/**
 * directory.js – YuuKay Chamber Member Directory
 * Member data is embedded directly — no server/fetch required.
 */

// ── Embedded member data (mirrors data/members.json) ─────────────────────────
const MEMBERS = [
  {
    name: "Pinnacle Tech Solutions",
    address: "142 Innovation Drive, Lawanche, BF 21866",
    phone: "(951) 555-0182",
    website: "https://www.pinnacletech.example.com",
    image: "images/pinnacle-tech.svg",
    membership: 3,
    description: "Full-spectrum IT consulting and cloud infrastructure for growing enterprises."
  },
  {
    name: "Green Valley Organics",
    address: "88 Farm Road, Lawanche, BF 21876",
    phone: "(951) 555-0234",
    website: "https://www.greenvalleyorganics.example.com",
    image: "images/green-valley.svg",
    membership: 2,
    description: "Locally sourced organic produce delivered fresh to your door since 1998."
  },
  {
    name: "Riverside Legal Group",
    address: "500 Court Street Suite 300, Lawanche, BF 21886",
    phone: "(951) 555-0311",
    website: "https://www.riversidelegal.example.com",
    image: "images/riverside-legal.svg",
    membership: 3,
    description: "Comprehensive legal services for businesses and individuals across Southern California."
  },
  {
    name: "Sunrise Financial Solutions",
    address: "220 Commerce Blvd, Lawanche, BF 21896",
    phone: "(951) 555-0478",
    website: "https://www.sunrisefinancial.example.com",
    image: "images/sunrise-financial.svg",
    membership: 2,
    description: "Personalized wealth management and retirement planning for every stage of life."
  },
  {
    name: "Metro Build & Design",
    address: "1050 Industrial Way, Lawanche, BF 21906",
    phone: "(951) 555-0556",
    website: "https://www.metrobuild.example.com",
    image: "images/metro-build.svg",
    membership: 1,
    description: "Residential and commercial construction with over 25 years of trusted craftsmanship."
  },
  {
    name: "Coastal Creative Agency",
    address: "33 Artisan Lane, Lawanche, BF 21916",
    phone: "(951) 555-0629",
    website: "https://www.coastalcreative.example.com",
    image: "images/coastal-creative.svg",
    membership: 2,
    description: "Branding, digital marketing, and web design that makes your business unforgettable."
  },
  {
    name: "Summit Health & Wellness",
    address: "780 Wellness Way, Lawanche, BF 21926",
    phone: "(951) 555-0741",
    website: "https://www.summithealth.example.com",
    image: "images/summit-health.svg",
    membership: 3,
    description: "Integrative healthcare clinics offering primary care, nutrition, and wellness programs."
  },
  {
    name: "Ironclad Security Systems",
    address: "415 Shield Parkway, Lawanche, BF 21936",
    phone: "(951) 555-0893",
    website: "https://www.ironcladsecurity.example.com",
    image: "images/ironclad-security.svg",
    membership: 1,
    description: "Commercial and residential security installations with 24/7 monitoring services."
  }
];

const TIER = {
  3: { label: 'GOLD',   badgeClass: 'badge-gold',   cardClass: 'tier-3' },
  2: { label: 'SILVER', badgeClass: 'badge-silver',  cardClass: 'tier-2' },
  1: { label: 'MEMBER', badgeClass: 'badge-member',  cardClass: 'tier-1' },
};

// ── Footer ────────────────────────────────────────────────────────────────────
function initFooter() {
  const yr  = document.getElementById('copyright-year');
  const mod = document.getElementById('last-modified');
  if (yr)  yr.textContent  = new Date().getFullYear();
  if (mod) mod.textContent = document.lastModified;
}

// ── Hamburger nav ─────────────────────────────────────────────────────────────
function initNav() {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-menu');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '✕' : '☰';
  });
}

// ── Build one card ────────────────────────────────────────────────────────────
function buildCard(m) {
  const tier     = TIER[m.membership] ?? TIER[1];
  const hostname = m.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');

  const card = document.createElement('article');
  card.className = `member-card ${tier.cardClass}`;
  card.innerHTML = `
    <div class="member-logo-wrap">
      <img src="${m.image}" alt="${m.name} logo"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="member-initials-circle" style="display:none">${initials}</div>
    </div>
    <div class="member-info">
      <h4 class="member-name">${m.name}</h4>
      <p class="member-desc">${m.description}</p>
      <p class="member-address">${m.address}</p>
      <p class="member-phone">${m.phone}</p>
      <div class="member-footer">
        <a href="${m.website}" target="_blank" rel="noopener" class="member-website">${hostname}</a>
        <span class="member-badge ${tier.badgeClass}">${tier.label}</span>
      </div>
    </div>`;
  return card;
}

// ── Render members ────────────────────────────────────────────────────────────
function initDirectory() {
  const loadingEl = document.getElementById('dir-loading');
  const gridEl    = document.getElementById('member-grid');

  const fragment = document.createDocumentFragment();
  MEMBERS.forEach(m => fragment.appendChild(buildCard(m)));
  gridEl.appendChild(fragment);

  loadingEl.style.display = 'none';
  gridEl.style.display    = 'grid';
}

// ── Grid / List toggle ────────────────────────────────────────────────────────
function initViewToggle() {
  const gridEl  = document.getElementById('member-grid');
  const btnGrid = document.getElementById('btn-grid');
  const btnList = document.getElementById('btn-list');

  btnGrid.addEventListener('click', () => {
    gridEl.classList.remove('list-view');
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
  });

  btnList.addEventListener('click', () => {
    gridEl.classList.add('list-view');
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  initNav();
  initDirectory();
  initViewToggle();
});
