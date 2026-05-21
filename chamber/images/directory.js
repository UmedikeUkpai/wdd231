// ── Helpers ───────────────────────────────────────────────────────────────────
function getMembershipInfo(level) {
  if (level === 3) return { label: 'Gold',   cls: 'gold'   };
  if (level === 2) return { label: 'Silver', cls: 'silver' };
  return                  { label: 'Member', cls: 'member' };
}

function renderMembers(members) {
  const container = document.getElementById('members-container');
  container.innerHTML = '';

  members.forEach(function(m) {
    const info = getMembershipInfo(m.membership);

    // Build img via JS so onerror is a real function — no infinite loop
    const img = document.createElement('img');
    img.className = 'member-logo';
    img.alt       = m.name + ' logo';
    img.loading   = 'lazy';
    img.onerror   = function() {
      this.onerror = null;               // detach handler so it never fires twice
      this.src     = 'images/placeholder.svg';
    };
    img.src = 'images/' + m.image;       // assign src AFTER onerror is attached

    const details = document.createElement('div');
    details.className = 'member-info';
    details.innerHTML =
      '<h3>' + m.name + '</h3>' +
      '<p class="member-description">' + m.description + '</p>' +
      '<p>' + m.address + '</p>' +
      '<p>' + m.phone + '</p>' +
      '<a class="member-website" href="' + m.website + '" target="_blank" rel="noopener noreferrer">' +
        m.website.replace('https://www.', '') +
      '</a>' +
      '<span class="membership-badge ' + info.cls + '">' + info.label + '</span>';

    const card = document.createElement('article');
    card.className = 'member-card ' + info.cls;
    card.appendChild(img);
    card.appendChild(details);
    container.appendChild(card);
  });
}

function applyView(view) {
  document.getElementById('members-container').className = view;
  document.getElementById('grid-btn').classList.toggle('active', view === 'grid');
  document.getElementById('list-btn').classList.toggle('active', view === 'list');
}

// ── Fetch members ─────────────────────────────────────────────────────────────
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const members = await response.json();
    renderMembers(members);
  } catch (err) {
    document.getElementById('members-container').innerHTML =
      '<p class="loading-msg">Could not load members. Open via Live Server (http://), not file://.</p>';
    console.error('fetch error:', err);
  }
}

// ── Hamburger ─────────────────────────────────────────────────────────────────
document.getElementById('menu-btn').addEventListener('click', function() {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('open');
  this.textContent = nav.classList.contains('open') ? '✕' : '☰';
  this.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// ── Active nav link ───────────────────────────────────────────────────────────
var page = window.location.pathname.split('/').pop() || 'directory.html';
document.querySelectorAll('nav a').forEach(function(a) {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── Footer ────────────────────────────────────────────────────────────────────
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent  = document.lastModified;

// ── View toggle ───────────────────────────────────────────────────────────────
var currentView = localStorage.getItem('chamberView') || 'grid';
applyView(currentView);

document.getElementById('grid-btn').addEventListener('click', function() {
  currentView = 'grid';
  applyView(currentView);
  localStorage.setItem('chamberView', currentView);
});

document.getElementById('list-btn').addEventListener('click', function() {
  currentView = 'list';
  applyView(currentView);
  localStorage.setItem('chamberView', currentView);
});

// ── Go ────────────────────────────────────────────────────────────────────────
loadMembers();
