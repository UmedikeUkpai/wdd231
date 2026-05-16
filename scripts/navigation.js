

    // Hamburger menu toggle
    const menuBtn  = document.getElementById('menuBtn');
    const mainNav  = document.getElementById('mainNav');

    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
    });