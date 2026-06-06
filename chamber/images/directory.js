/**
 * directory.js
 * YuuKay Chamber – Member Directory Page
 * Handles: member cards · grid/list toggle · footer dates · hamburger nav
 */

const MEMBERS_URL = 'data/members.json';

const TIER = {
  3: { label: 'GOLD',   badgeClass: 'badge-gold',   cardClass: 'tier-3' },
  2: { label: 'SILVER', badgeClass: 'badge-silver',  cardClass: 'tier-2' },
  1: { label: 'MEMBER', badgeClass: 'badge-member',  cardClass: 'tier-1' },
};

// ─── Footer ──────────────────────────────────────────────────────────────────
function initFooter() {
  const yr  = document.getElementById('copyright-year');
  const mod = document.getElementById('last-modified');
  if (yr)  yr.textContent  = new Date().getFullYear();
  if (mod) mod.textContent = document.lastModified;
}

// ─── Hamburger ────────────────────────────────────────────────────────────────
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

// ─── Build one member card ────────────────────────────────────────────────────
function buildCard(m) {
  const tier     = TIER[m.membership] ?? TIER[1];
  const imgPath  = `images/${m.image}`;
  const hostname = m.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');

  const card = document.createElement('article');
  card.className = `member-card ${tier.cardClass}`;
  card.innerHTML = `
    <div class="member-logo-wrap">
      <img src="${imgPath}" alt="${m.name} logo"
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

// ─── Load & render members ────────────────────────────────────────────────────
async function initDirectory() {
  const loadingEl = document.getElementById('dir-loading');
  const errorEl   = document.getElementById('dir-error');
  const gridEl    = document.getElementById('member-grid');

  try {
    const res = await fetch(MEMBERS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    const fragment = document.createDocumentFragment();
    members.forEach(m => fragment.appendChild(buildCard(m)));
    gridEl.appendChild(fragment);

    loadingEl.style.display = 'none';
    gridEl.style.display    = 'grid';

  } catch (err) {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    errorEl.textContent     = `⚠️ Could not load members. Make sure data/members.json exists. (${err.message})`;
  }
}

// ─── Grid / List toggle ───────────────────────────────────────────────────────
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

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  initNav();
  initDirectory();
  initViewToggle();
});
