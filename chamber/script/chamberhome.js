/**
 * chamberhome.js – YuuKay Chamber Home Page
 * Member data is embedded — no server needed for spotlights.
 * Weather requires a valid OpenWeatherMap API key.
 */

// ── Config ────────────────────────────────────────────────────────────────────
const CONFIG = {
  weatherApiKey: 'YOUR_OPENWEATHERMAP_API_KEY', // ← paste your key here
  weatherLat:    9.0765,   // Abuja, Nigeria
  weatherLon:    7.3986,
  weatherUnits:  'metric', // °C and m/s
};

const WEATHER_ICONS = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'⛅',
  '03d':'🌥️','03n':'🌥️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌦️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️',
};
const SHORT_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// membership number → display info
const MEMBERSHIP = {
  3: { label: 'GOLD',   cls: 'level-gold'   },
  2: { label: 'SILVER', cls: 'level-silver' },
  1: { label: 'MEMBER', cls: 'level-member' },
};

// ── Embedded member data ──────────────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════════════════
// 1. FOOTER
// ═══════════════════════════════════════════════════════════════════════════
function initFooter() {
  const yr  = document.getElementById('copyright-year');
  const mod = document.getElementById('last-modified');
  if (yr)  yr.textContent  = new Date().getFullYear();
  if (mod) mod.textContent = document.lastModified;
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. HAMBURGER NAV
// ═══════════════════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════════════════
// 3. WEATHER
// ═══════════════════════════════════════════════════════════════════════════
async function initWeather() {
  const loadingEl = document.getElementById('weather-loading');
  const displayEl = document.getElementById('weather-display');
  const errorEl   = document.getElementById('weather-error');

  // If no API key yet, show a clear instruction instead of a broken spinner
  if (!CONFIG.weatherApiKey || CONFIG.weatherApiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    errorEl.textContent     = '🔑 Add your OpenWeatherMap API key in script/chamberhome.js (CONFIG.weatherApiKey) to show live weather for Abuja.';
    return;
  }

  const { weatherApiKey, weatherLat, weatherLon, weatherUnits } = CONFIG;
  const BASE = 'https://api.openweathermap.org/data/2.5';

  try {
    const [curRes, foreRes] = await Promise.all([
      fetch(`${BASE}/weather?lat=${weatherLat}&lon=${weatherLon}&units=${weatherUnits}&appid=${weatherApiKey}`),
      fetch(`${BASE}/forecast?lat=${weatherLat}&lon=${weatherLon}&units=${weatherUnits}&appid=${weatherApiKey}`),
    ]);

    if (!curRes.ok)  throw new Error(`Current weather: ${curRes.status} ${curRes.statusText}`);
    if (!foreRes.ok) throw new Error(`Forecast: ${foreRes.status} ${foreRes.statusText}`);

    const current  = await curRes.json();
    const forecast = await foreRes.json();

    renderCurrentWeather(current);
    renderForecast(forecast);

    loadingEl.style.display = 'none';
    displayEl.style.display = 'block';

  } catch (err) {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    errorEl.textContent     = `⚠️ Weather failed: ${err.message}`;
  }
}

function renderCurrentWeather(data) {
  document.getElementById('weather-location').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('weather-icon').textContent     = WEATHER_ICONS[data.weather[0].icon] ?? '🌡️';
  document.getElementById('weather-temp').textContent     = `${Math.round(data.main.temp)}°C`;
  document.getElementById('weather-desc').textContent     = data.weather[0].description;
  document.getElementById('weather-humidity').textContent = `💧 ${data.main.humidity}% humidity`;
  document.getElementById('weather-wind').textContent     = `💨 ${Math.round(data.wind.speed)} m/s`;
}

function renderForecast(data) {
  const todayStr = new Date().toDateString();
  const seen     = new Set([todayStr]);
  const days     = [];

  for (const item of data.list) {
    const d   = new Date(item.dt * 1000);
    const key = d.toDateString();
    if (!seen.has(key)) {
      seen.add(key);
      days.push({ date: d, item });
    }
    if (days.length === 3) break;
  }

  document.getElementById('forecast-strip').innerHTML = days.map(({ date, item }) => `
    <div class="forecast-day">
      <span class="f-label">${SHORT_DAYS[date.getDay()]}</span>
      <span class="f-icon">${WEATHER_ICONS[item.weather[0].icon] ?? '🌡️'}</span>
      <span class="f-temp">${Math.round(item.main.temp)}°C</span>
      <span class="f-desc">${item.weather[0].description}</span>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. SPOTLIGHTS — uses embedded MEMBERS array, no fetch needed
// ═══════════════════════════════════════════════════════════════════════════
function initSpotlights() {
  const loadingEl = document.getElementById('spotlight-loading');
  const gridEl    = document.getElementById('spotlight-grid');

  // Filter gold (3) and silver (2) only, shuffle, pick 2 or 3
  const eligible = MEMBERS
    .filter(m => m.membership === 3 || m.membership === 2)
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.random() < 0.5 ? 2 : 3);

  gridEl.innerHTML = eligible.map(buildSpotlightCard).join('');

  loadingEl.style.display = 'none';
  gridEl.style.display    = 'grid';
}

function buildSpotlightCard(m) {
  const mem      = MEMBERSHIP[m.membership] ?? MEMBERSHIP[1];
  const hostname = m.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');

  return `
    <div class="spotlight-card">
      <div class="spotlight-logo-wrap">
        <img src="${m.image}" alt="${m.name} logo" class="spotlight-logo"
             onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
        <div class="spotlight-initials" style="display:none">${initials}</div>
      </div>
      <h4 class="spotlight-name">${m.name}</h4>
      <p class="spotlight-desc">${m.description}</p>
      <address class="spotlight-address">
        <span>📍 ${m.address}</span>
        <span>📞 ${m.phone}</span>
      </address>
      <div class="spotlight-footer">
        <a href="${m.website}" target="_blank" rel="noopener" class="spotlight-link">${hostname}</a>
        <span class="spotlight-level ${mem.cls}">${mem.label}</span>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  initNav();
  initWeather();
  initSpotlights();
});
