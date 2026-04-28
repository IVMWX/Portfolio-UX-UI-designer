document.addEventListener('DOMContentLoaded', function () {

  function isMobile() {
    return window.innerWidth <= 425;
  }

  function initCarousel(wrapperSelector, listSelector, cardSelector) {

    const wrapper = document.querySelector(wrapperSelector);
    const slider = document.querySelector(listSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (!wrapper || !slider || cards.length === 0) return;

    const gap = 16;
    const visualOffset = 20;

    let currentIndex = 0;

    function moveTo(index) {

  const card = cards[index];

  if (index === 0) {
    slider.style.transform = `translateX(0px)`;
  }

  else if (index === cards.length - 1) {

    const wrapperWidth = wrapper.offsetWidth;
    const sliderWidth = slider.scrollWidth;

    const maxTranslate = sliderWidth - wrapperWidth;

    slider.style.transform = `translateX(-${maxTranslate}px)`;
  }

  else {

    const cardRect = card.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const cardCenter = cardRect.left + cardRect.width / 2;
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    const diff = cardCenter - wrapperCenter;

    const currentTransform = getComputedStyle(slider).transform;

    let currentX = 0;

    if (currentTransform !== 'none') {
      const matrix = new DOMMatrix(currentTransform);
      currentX = matrix.m41;
    }

    const newTranslate = currentX - diff;

    slider.style.transform = `translateX(${newTranslate}px)`;
  }

  cards.forEach(c => c.classList.remove('active'));
  card.classList.add('active');

  currentIndex = index;
}

    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (isMobile()) return;
        moveTo(index);
      });
    });

    let startX = 0;
    let endX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    wrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;

      const diff = startX - endX;


      if (Math.abs(diff) < 50) return;

      if (diff > 0) {

        if (currentIndex < cards.length - 1) {
          moveTo(currentIndex + 1);
        }
      } else {

        if (currentIndex > 0) {
          moveTo(currentIndex - 1);
        }
      }
    });

    moveTo(0);
  }

  initCarousel('.projects-slider', '.projects-list', '.project-card');
  initCarousel('.achievements-slider', '.achievements-list', '.achievements-card');

  document.querySelectorAll('.project-card_btn').forEach(function (btn) {

    btn.addEventListener('mousedown', function () {
      const card = btn.closest('.project-card');
      if (card) card.classList.add('no-click-anim');
    });

    btn.addEventListener('mouseup', function () {
      const card = btn.closest('.project-card');
      if (card) card.classList.remove('no-click-anim');
    });

    btn.addEventListener('mouseleave', function () {
      const card = btn.closest('.project-card');
      if (card) card.classList.remove('no-click-anim');
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
    });

  });

  const header = document.querySelector('.mobile-header');
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');

  if (header && sidebarWrapper) {
    header.addEventListener('click', () => {
      sidebarWrapper.classList.toggle('active');
    });
  }

});