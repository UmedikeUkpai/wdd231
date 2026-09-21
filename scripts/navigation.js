const menuButton = document.getElementById('menuBtn');
const primaryNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
