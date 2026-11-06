/* Page chrome (theme, nav edge, reveal), the finish switcher on the Duo,
   and the iPhone case demo: lift the clasp and the lid swings open around its hinge. */
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  function paintIcon() {
    if (!icon) return;
    const dark = root.classList.contains('dark');
    icon.firstElementChild.setAttribute('href', 'assets/icons.svg' + (dark ? '#i-sun' : '#i-moon'));
    if (toggle) toggle.setAttribute('aria-pressed', String(dark));
  }
  paintIcon();
  if (toggle) {
    toggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      try { localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
      paintIcon();
    });
  }

  const nav = document.querySelector('.nav');
  const sentinel = document.getElementById('nav-top');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => nav.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Finishes: each button swaps the board on the Duo. Images load on first use. ---- */
  document.querySelectorAll('[data-finishes]').forEach((stage) => {
    const screen = stage.querySelector('.screen');
    const name = stage.querySelector('[data-finish-name]');
    const sub = stage.querySelector('[data-finish-sub]');
    const metal = stage.querySelector('[data-finish-metal]');
    const proTag = stage.querySelector('[data-finish-pro]');
    const buttons = stage.querySelectorAll('[data-finish]');
    const shown = new Map();
    screen.querySelectorAll('img[data-key]').forEach((img) => shown.set(img.dataset.key, img));

    function show(btn) {
      const key = btn.dataset.finish;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let img = shown.get(key);
      if (!img) {
        img = new Image();
        img.dataset.key = key;
        img.width = 1800; img.height = 1266;
        img.alt = btn.dataset.alt || '';
        img.src = btn.dataset.src;
        screen.appendChild(img);
        shown.set(key, img);
      }
      const reveal = () => shown.forEach((el, k) => el.classList.toggle('on', k === key));
      if (img.complete) reveal(); else img.addEventListener('load', reveal, { once: true });
      name.textContent = btn.dataset.name;
      sub.textContent = btn.dataset.sub;
      metal.textContent = btn.dataset.metal;
      if (proTag) proTag.hidden = !btn.dataset.pro;
    }
    buttons.forEach((btn) => btn.addEventListener('click', () => show(btn)));
  });

  /* ---- Case demo: the clasp opens the lid; the button closes it again. ---- */
  document.querySelectorAll('[data-case]').forEach((demo) => {
    const clasp = demo.querySelector('.clasp-hit');
    const btn = demo.querySelector('[data-case-toggle]');
    const hint = demo.querySelector('[data-hint]');
    const lid = demo.querySelector('.lid');
    function setOpen(open) {
      demo.classList.toggle('open', open);
      lid.setAttribute('aria-hidden', String(open));
      btn.setAttribute('aria-pressed', String(open));
      btn.textContent = open ? btn.dataset.close : btn.dataset.open;
      if (hint) hint.textContent = open ? hint.dataset.close : hint.dataset.open;
    }
    clasp.addEventListener('click', () => setOpen(true));
    btn.addEventListener('click', () => setOpen(!demo.classList.contains('open')));
  });
})();
