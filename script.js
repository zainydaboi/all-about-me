// Smooth scroll enhancement (native CSS handles basic smooth behavior)
document.querySelectorAll('.nav-link, .btn, .back-top')
  .forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu after click
          hideMobileMenu();
        }
      }
    });
  });

// Intersection Observer to set active nav link
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.55 });

sections.forEach(sec => observer.observe(sec));

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

function hideMobileMenu() {
  navMenu.classList.remove('show');
  toggleBtn.setAttribute('aria-expanded', 'false');
}

toggleBtn.addEventListener('click', () => {
  const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  toggleBtn.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', e => {
  if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
    hideMobileMenu();
  }
});

// Close on escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideMobileMenu();
});
