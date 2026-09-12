/* ==========================================================================
   «Дворжики в интернете» — основной скрипт
   Мобильное меню, анимации появления, лайтбокс, ленивая загрузка видео
   Без внешних библиотек
   ========================================================================== */
(function () {
  'use strict';

  /* --- Мобильное меню ---------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var list = document.querySelector('.nav__list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Закрываем меню при клике по ссылке
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Закрываем при клике вне меню
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav') && list.classList.contains('is-open')) {
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Тень шапки при прокрутке ------------------------------------------ */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Анимации появления при скролле ------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* --- Лайтбокс для галерей ---------------------------------------------- */
  function initLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    if (!items.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Закрыть">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Предыдущее фото">&#8249;</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Следующее фото">&#8250;</button>' +
      '<div class="lightbox__caption"></div>';
    document.body.appendChild(box);

    var imgEl = box.querySelector('.lightbox__img');
    var capEl = box.querySelector('.lightbox__caption');
    var current = 0;

    function show(index) {
      current = (index + items.length) % items.length;
      var item = items[current];
      var img = item.querySelector('img');
      var full = item.getAttribute('data-full') || (img ? img.src : '');
      imgEl.src = full;
      imgEl.alt = img ? img.alt : '';
      capEl.textContent = item.getAttribute('data-caption') || (img ? img.alt : '');
    }

    function open(index) {
      show(index);
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function () { open(i); });
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function (e) {
      e.stopPropagation(); show(current - 1);
    });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function (e) {
      e.stopPropagation(); show(current + 1);
    });
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* --- Ленивая загрузка видео (по клику) --------------------------------- */
  function initVideo() {
    var frames = document.querySelectorAll('.video-card__frame[data-video]');
    frames.forEach(function (frame) {
      frame.addEventListener('click', function () {
        var id = frame.getAttribute('data-video');
        if (!id) return;
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
        iframe.title = frame.getAttribute('data-title') || 'Видео';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        frame.innerHTML = '';
        frame.appendChild(iframe);
        frame.style.cursor = 'default';
      }, { once: true });
    });
  }

  /* --- Поиск/фильтр по каталогу историй ---------------------------------- */
  function initFilter() {
    var input = document.querySelector('[data-filter]');
    if (!input) return;
    var targets = document.querySelectorAll('[data-filter-item]');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      targets.forEach(function (el) {
        var text = (el.getAttribute('data-filter-item') || '').toLowerCase();
        el.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
      });
    });
  }

  /* --- Инициализация ----------------------------------------------------- */
  function init() {
    initNav();
    initHeaderScroll();
    initReveal();
    initLightbox();
    initVideo();
    initFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
