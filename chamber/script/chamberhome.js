/**
 * chamberhome.js – YuuKay Chamber Home Page
 * Member data is embedded — no server needed for spotlights.
 * Weather requires a valid OpenWeatherMap API key.
 */
 
const CONFIG = {
  weatherApiKey: '13bf2fc2b45cb506558ac4b8deeff3e2',
  weatherLat: 9.0765,   // Abuja, Nigeria
  weatherLon: 7.3986,
  weatherUnits: 'metric',
};
 
const WEATHER_ICONS = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'⛅',
  '03d':'🌥️','03n':'🌥️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌦️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️',
};
const SHORT_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
 
const MEMBERSHIP = {
  3: { label: 'GOLD',   cls: 'level-gold'   },
  2: { label: 'SILVER', cls: 'level-silver' },
  1: { label: 'MEMBER', cls: 'level-member' },
};
 
// Addresses and phones use Abuja / +234 for consistency
const MEMBERS = [
  { name: "Pinnacle Tech Solutions", address: "142 Innovation Drive, Abuja, FCT", phone: "(+234) 81-0555-0182",
    website: "https://www.pinnacletech.example.com", image: "images/pinnacle-tech.svg", membership: 3,
    description: "Full-spectrum IT consulting and cloud infrastructure for growing enterprises." },
  { name: "Green Valley Organics", address: "88 Farm Road, Abuja, FCT", phone: "(+234) 81-0555-0234",
    website: "https://www.greenvalleyorganics.example.com", image: "images/green-valley.svg", membership: 2,
    description: "Locally sourced organic produce delivered fresh to your door since 1998." },
  { name: "Riverside Legal Group", address: "500 Court Street Suite 300, Abuja, FCT", phone: "(+234) 81-0555-0311",
    website: "https://www.riversidelegal.example.com", image: "images/riverside-legal.svg", membership: 3,
    description: "Comprehensive legal services for businesses and individuals across Abuja." },
  { name: "Sunrise Financial Solutions", address: "220 Commerce Blvd, Abuja, FCT", phone: "(+234) 81-0555-0478",
    website: "https://www.sunrisefinancial.example.com", image: "images/sunrise-financial.svg", membership: 2,
    description: "Personalized wealth management and retirement planning for every stage of life." },
  { name: "Metro Build & Design", address: "1050 Industrial Way, Abuja, FCT", phone: "(+234) 81-0555-0556",
    website: "https://www.metrobuild.example.com", image: "images/metro-build.svg", membership: 1,
    description: "Residential and commercial construction with over 25 years of trusted craftsmanship." },
  { name: "Coastal Creative Agency", address: "33 Artisan Lane, Abuja, FCT", phone: "(+234) 81-0555-0629",
    website: "https://www.coastalcreative.example.com", image: "images/coastal-creative.svg", membership: 2,
    description: "Branding, digital marketing, and web design that makes your business unforgettable." },
  { name: "Summit Health & Wellness", address: "780 Wellness Way, Abuja, FCT", phone: "(+234) 81-0555-0741",
    website: "https://www.summithealth.example.com", image: "images/summit-health.svg", membership: 3,
    description: "Integrative healthcare clinics offering primary care, nutrition, and wellness programs." },
  { name: "Ironclad Security Systems", address: "415 Shield Parkway, Abuja, FCT", phone: "(+234) 81-0555-0893",
    website: "https://www.ironcladsecurity.example.com", image: "images/ironclad-security.svg", membership: 1,
    description: "Commercial and residential security installations with 24/7 monitoring services." },
];
 
// Escape text before inserting into innerHTML
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 
function initFooter() {
  const yr  = document.getElementById('copyright-year');
  const mod = document.getElementById('last-modified');
  if (yr)  yr.textContent  = new Date().getFullYear();
  if (mod) mod.textContent = document.lastModified;
}
 
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
 
async function initWeather() {
  const loadingEl = document.getElementById('weather-loading');
  const displayEl = document.getElementById('weather-display');
  const errorEl   = document.getElementById('weather-error');
  if (!loadingEl || !displayEl || !errorEl) return;
 
  if (!CONFIG.weatherApiKey || CONFIG.weatherApiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    errorEl.textContent     = '🔑 Add your OpenWeatherMap API key in script/chamberhome.js (CONFIG.weatherApiKey) to show live weather for Abuja.';
    return;
  }
 
  const { weatherApiKey, weatherLat, weatherLon, weatherUnits } = CONFIG;
  const BASE = 'https://api.openweathermap.org/data/2.5';
  const qs = `lat=${weatherLat}&lon=${weatherLon}&units=${weatherUnits}&appid=${weatherApiKey}`;
 
  try {
    const [curRes, foreRes] = await Promise.all([
      fetch(`${BASE}/weather?${qs}`),
      fetch(`${BASE}/forecast?${qs}`),
    ]);
    if (!curRes.ok)  throw new Error(`Current weather: ${curRes.status} ${curRes.statusText}`);
    if (!foreRes.ok) throw new Error(`Forecast: ${foreRes.status} ${foreRes.statusText}`);
 
    renderCurrentWeather(await curRes.json());
    renderForecast(await foreRes.json());
 
    loadingEl.style.display = 'none';
    displayEl.style.display = 'block';
  } catch (err) {
    loadingEl.style.display = 'none';
    errorEl.style.display   = 'block';
    errorEl.textContent     = `⚠️ Weather failed: ${err.message}. (New API keys can take up to 2 hours to activate.)`;
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
  const today = new Date().toDateString();
  const byDay = {};

  for (const item of data.list) {
    const d = new Date(item.dt * 1000);
    const key = d.toDateString();
    if (key === today) continue;
    const distFromNoon = Math.abs(d.getHours() - 12);
    if (!byDay[key] || distFromNoon < byDay[key].dist) {
      byDay[key] = { date: d, item, dist: distFromNoon };
    }
  }

  const days = Object.values(byDay).slice(0, 3);

  document.getElementById('forecast-strip').innerHTML = days.map(({ date, item }) => `
    <div class="forecast-day">
      <span class="f-label">${SHORT_DAYS[date.getDay()]}</span>
      <span class="f-icon">${WEATHER_ICONS[item.weather[0].icon] ?? '🌡️'}</span>
      <span class="f-temp">${Math.round(item.main.temp)}°C</span>
      <span class="f-desc">${esc(item.weather[0].description)}</span>
    </div>`).join('');
}
 
function initSpotlights() {
  const loadingEl = document.getElementById('spotlight-loading');
  const gridEl    = document.getElementById('spotlight-grid');
  if (!loadingEl || !gridEl) return;
 
  const eligible = MEMBERS
    .filter(m => m.membership >= 2)
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
        <img src="${esc(m.image)}" alt="${esc(m.name)} logo" class="spotlight-logo"
             onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
        <div class="spotlight-initials" style="display:none">${esc(initials)}</div>
      </div>
      <h4 class="spotlight-name">${esc(m.name)}</h4>
      <p class="spotlight-desc">${esc(m.description)}</p>
      <address class="spotlight-address">
        <span>📍 ${esc(m.address)}</span>
        <span>📞 ${esc(m.phone)}</span>
      </address>
      <div class="spotlight-footer">
        <a href="${esc(m.website)}" target="_blank" rel="noopener" class="spotlight-link">${esc(hostname)}</a>
        <span class="spotlight-level ${mem.cls}">${mem.label}</span>
      </div>
    </div>`;
}
 
document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  initNav();
  initWeather();
  initSpotlights();
});