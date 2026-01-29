/*=============================================
    RESPONSIVE NAVIGATION & INTERACTION SCRIPT
=============================================*/

/* ===== 1. HERO ANIMATION ===== */
const imgs = document.querySelectorAll('.hero-img');
let i = 0;

setInterval(() => {
  imgs[i].classList.remove('active');
  i = (i + 1) % imgs.length;
  imgs[i].classList.add('active');
}, 3000);

/* ===== 2. MOBILE MENU MODAL ===== */
const burgerMenu = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Ouvrir le menu au clic sur le burger
burgerMenu.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Fermer le menu au clic sur le bouton X
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Fermer le menu au clic sur un lien
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Fermer le menu au clic sur le fond
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Gérer le dropdown mobile
const mobileDropdownToggle = document.getElementById('mobile-dropdown-toggle');
const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');

if (mobileDropdownToggle) {
  mobileDropdownToggle.addEventListener('click', () => {
    mobileDropdownMenu.classList.toggle('active');
  });
}

// Fermer le dropdown quand on clique sur un lien
if (mobileDropdownMenu) {
  const mobileDropdownLinks = mobileDropdownMenu.querySelectorAll('.mobile-dropdown-link');
  mobileDropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDropdownMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

/* ===== 3. SCROLL ANIMATION & ACTIVE NAV ===== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['about', 'commitment', 'trade', 'activitie', 'products-services', 'contact'];

function handleScrollAnimation() {
  let currentSection = '';
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const offset = window.innerHeight / 2;
      
      // Si la section est en vue (dans le viewport)
      if (window.scrollY >= sectionTop - offset) {
        currentSection = sectionId;
      }
    }
  });
  
  // Mettre à jour la classe active sur les liens de nav (desktop)
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Mettre à jour la classe active sur les liens de nav (mobile)
  mobileNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
  
  // Ajouter une animation aux sections en vue
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const windowHeight = window.innerHeight;
      
      // Si la section est partiellement visible
      if (window.scrollY + windowHeight > sectionTop && window.scrollY < sectionTop + sectionHeight) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    }
  });
}

// Écouter l'événement scroll avec throttle
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(handleScrollAnimation);
});

// Appeler la fonction au chargement
handleScrollAnimation();

/* ===== 4. SMOOTH SCROLL AU CLIC ===== */
// Tous les liens nav (desktop + mobile)
const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Fermer le menu mobile si ouvert
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Scroll vers la section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ===== 5. RESPONSIVE HEADER ADJUSTMENT ===== */
// Ajuster le comportement du menu sur les petits écrans
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Sur desktop, s'assurer que le menu mobile est fermé
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    burgerMenu.classList.remove('active');
  }
});