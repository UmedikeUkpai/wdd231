// join.js – nav, footer, form timestamp, membership modals
document.addEventListener('DOMContentLoaded', () => {
  // Footer
  const yr = document.getElementById('copyright-year');
  const mod = document.getElementById('last-modified');
  if (yr) yr.textContent = new Date().getFullYear();
  if (mod) mod.textContent = document.lastModified;
 
  // Hamburger nav
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-menu');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? '✕' : '☰';
    });
  }
 
  // Hidden timestamp field (set when the page loads and again on submit)
  const ts = document.getElementById('timestamp');
  const stamp = () => { if (ts) ts.value = new Date().toISOString(); };
  stamp();
  document.querySelector('.join-form')?.addEventListener('submit', stamp);
 
  // Modals
  document.querySelectorAll('.learn-btn').forEach(b =>
    b.addEventListener('click', () => document.getElementById(b.dataset.modal)?.showModal()));
  document.querySelectorAll('dialog').forEach(d => {
    d.querySelector('.close-btn')?.addEventListener('click', () => d.close());
    d.addEventListener('click', e => { if (e.target === d) d.close(); }); // click backdrop to close
  });
});