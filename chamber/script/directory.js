// ===========================
// Chamber of Commerce - directory.js
// Loaded with defer — DOM is ready when this runs
// ===========================

// ---- Membership badge helper ----
function getMembershipInfo(level) {
  switch (level) {
    case 3: return { label: 'Gold',   cls: 'gold'   };
    case 2: return { label: 'Silver', cls: 'silver' };
    default: return { label: 'Member', cls: 'member' };
  }
}

// ---- Render members into the grid/list container ----
function renderMembers(members) {
  const container = document.getElementById('members-container');
  if (!container) return;
  container.innerHTML = '';
  members.forEach(m => {
    const { label, cls } = getMembershipInfo(m.membership);
    const card = document.createElement('article');
    card.className = `member-card ${cls}`;
    card.innerHTML = `
      <img class="member-logo" src="images/${m.image}" alt="${m.name} logo" loading="lazy" onerror="this.src='images/placeholder.png'">
      <div class="member-info">
        <h3>${m.name}</h3>
        <p class="member-description">${m.description}</p>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a class="member-website" href="${m.website}" target="_blank" rel="noopener noreferrer">${m.website.replace('https://www.', '')}</a>
        <span class="membership-badge ${cls}">${label}</span>
      </div>`;
    container.appendChild(card);
  });
}

// ---- View toggle ----
function applyView(view) {
  const container = document.getElementById('members-container');
  const gridBtn   = document.getElementById('grid-btn');
  const listBtn   = document.getElementById('list-btn');
  if (!container) return;
  container.className = view;
  if (gridBtn) gridBtn.classList.toggle('active', view === 'grid');
  if (listBtn) listBtn.classList.toggle('active', view === 'list');
}

// ---- Inline member data (guaranteed fallback, works on file:// too) ----
const MEMBERS = [
  { name: "Pinnacle Tech Solutions",   address: "142 Innovation Drive, Riverside, CA 92501",    phone: "(951) 555-0182", website: "https://www.pinnacletech.example.com",      image: "pinnacle-tech.png",    membership: 3, description: "Full-spectrum IT consulting and cloud infrastructure for growing enterprises." },
  { name: "Green Valley Organics",     address: "88 Farm Road, Riverside, CA 92503",            phone: "(951) 555-0234", website: "https://www.greenvalleyorganics.example.com", image: "green-valley.png",     membership: 2, description: "Locally sourced organic produce delivered fresh to your door since 1998." },
  { name: "Riverside Legal Group",     address: "500 Court Street Suite 300, Riverside, CA 92502", phone: "(951) 555-0311", website: "https://www.riversidelegal.example.com",  image: "riverside-legal.png",  membership: 3, description: "Comprehensive legal services for businesses and individuals across Southern California." },
  { name: "Sunrise Financial Advisors",address: "220 Commerce Blvd, Riverside, CA 92507",      phone: "(951) 555-0478", website: "https://www.sunrisefinancial.example.com",    image: "sunrise-financial.png",membership: 2, description: "Personalized wealth management and retirement planning for every stage of life." },
  { name: "Metro Build & Design",      address: "1050 Industrial Way, Riverside, CA 92509",    phone: "(951) 555-0556", website: "https://www.metrobuild.example.com",           image: "metro-build.png",      membership: 1, description: "Residential and commercial construction with over 25 years of trusted craftsmanship." },
  { name: "Coastal Creative Agency",   address: "33 Artisan Lane, Riverside, CA 92504",        phone: "(951) 555-0629", website: "https://www.coastalcreative.example.com",      image: "coastal-creative.png", membership: 2, description: "Branding, digital marketing, and web design that makes your business unforgettable." },
  { name: "Summit Health & Wellness",  address: "780 Wellness Way, Riverside, CA 92506",       phone: "(951) 555-0741", website: "https://www.summithealth.example.com",         image: "summit-health.png",    membership: 3, description: "Integrative healthcare clinics offering primary care, nutrition, and wellness programs." },
  { name: "Ironclad Security Systems", address: "415 Shield Parkway, Riverside, CA 92508",     phone: "(951) 555-0893", website: "https://www.ironcladsecurity.example.com",    image: "ironclad-security.png",membership: 1, description: "Commercial and residential security installations with 24/7 monitoring services." }
];

// ---- Fetch from JSON, fall back to inline data ----
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    renderMembers(data);
  } catch (err) {
    console.warn('Using inline data (fetch failed):', err.message);
    renderMembers(MEMBERS);
  }
}

// ---- Navigation hamburger ----
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}

// ---- Active nav link ----
const currentPage = window.location.pathname.split('/').pop() || 'directory.html';
document.querySelectorAll('nav a').forEach(function (link) {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ---- Footer: copyright year & last modified ----
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('last-modified');
if (lastModEl) lastModEl.textContent = document.lastModified;

// ---- View toggle buttons ----
let currentView = localStorage.getItem('chamberView') || 'grid';
applyView(currentView);

const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

if (gridBtn) {
  gridBtn.addEventListener('click', function () {
    currentView = 'grid';
    applyView(currentView);
    localStorage.setItem('chamberView', currentView);
  });
}

if (listBtn) {
  listBtn.addEventListener('click', function () {
    currentView = 'list';
    applyView(currentView);
    localStorage.setItem('chamberView', currentView);
  });
}

// ---- Go! ----
loadMembers();
