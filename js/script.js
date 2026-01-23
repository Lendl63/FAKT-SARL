/*=============================================
    1. ANIMATION DU HERO
=============================================*/
const imgs = document.querySelectorAll('.hero-img');
let i = 0;

setInterval(() => {
  imgs[i].classList.remove('active');
  i = (i + 1) % imgs.length;
  imgs[i].classList.add('active');
}, 3000);

/*=============================================
    2. SCROLL ANIMATION & ACTIVE NAV
=============================================*/

// Les IDs des sections à surveiller
const sections = ['about', 'commitment', 'trade', 'activitie', 'products-services', 'footer'];
const navLinks = document.querySelectorAll('.nav-link');

// Fonction pour gérer l'affichage des sections et la nav active
function handleScrollAnimation() {
  let currentSection = '';
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Si la section est en vue (dans le viewport)
      if (window.scrollY >= sectionTop - 200) {
        currentSection = sectionId;
      }
    }
  });
  
  // Mettre à jour la classe active sur les liens de nav
  navLinks.forEach(link => {
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

// Smooth scroll au clic sur un lien nav
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});