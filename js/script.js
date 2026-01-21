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