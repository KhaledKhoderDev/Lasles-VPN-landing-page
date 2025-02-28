document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
  });
});
document.querySelector('.header__menu-icon').addEventListener('click', () => {
  document.querySelector('.header__mobile-nav').classList.toggle('active');
});
document.querySelector('.header__close-icon').addEventListener('click', () => {
  document.querySelector('.header__mobile-nav').classList.remove('active');
});
document.querySelectorAll('.header__mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.header__mobile-nav').classList.remove('active');
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor =>
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }),
);
document.addEventListener('DOMContentLoaded', function () {
  const cardsContainer = document.querySelector('.testimonials__cards');
  let cards = Array.from(document.querySelectorAll('.testimonials__card'));
  const prevArrow = document.querySelector('.testimonials__arrow--prev');
  const nextArrow = document.querySelector('.testimonials__arrow--next');
  const dots = document.querySelectorAll('.testimonials__dot');

  const totalCards = cards.length;
  let activeIndex = 0;

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.remove('testimonials__dot--wide');
    });

    if (activeIndex >= 0 && activeIndex < totalCards) {
      dots[activeIndex].classList.add('testimonials__dot--wide');
    }
  }

  function updateActiveCard() {
    cards.forEach(card => card.classList.remove('testimonials__card--active'));
    cards[0].classList.add('testimonials__card--active');
  }

  nextArrow.addEventListener('click', function () {
    const lastcard = cards.pop();
    lastcard.classList.add('move-right');

    setTimeout(() => {
      lastcard.classList.remove('move-right');
      cards.unshift(lastcard);
      updateGrid();
      updateActiveCard();

      activeIndex = (activeIndex + 1) % totalCards;
      updateDots();
    }, 500);
  });

  prevArrow.addEventListener('click', function () {
    const firstCard = cards.shift();
    firstCard.classList.add('move-left');

    setTimeout(() => {
      firstCard.classList.remove('move-left');
      cards.push(firstCard);
      updateGrid();
      updateActiveCard();

      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateDots();
    }, 500);
  });

  function updateGrid() {
    cardsContainer.innerHTML = '';
    cards.forEach(card => cardsContainer.appendChild(card));
  }
  updateActiveCard();
  updateDots();
});
