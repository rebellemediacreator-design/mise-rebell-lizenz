(function () {
  // Smooth scroll
  document.querySelectorAll('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-scroll');
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Accordion
  const root = document.querySelector('[data-accordion]');
  if (!root) return;

  const qs = Array.from(root.querySelectorAll('.faq__q'));
  qs.forEach((q) => {
    q.addEventListener('click', () => {
      const expanded = q.getAttribute('aria-expanded') === 'true';

      qs.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const a = other.nextElementSibling;
        if (a) a.hidden = true;
        const icon = other.querySelector('.faq__icon');
        if (icon) icon.textContent = '+';
      });

      if (!expanded) {
        q.setAttribute('aria-expanded', 'true');
        const a = q.nextElementSibling;
        if (a) a.hidden = false;
        const icon = q.querySelector('.faq__icon');
        if (icon) icon.textContent = '–';
      }
    });
  });
})();

// Lightbox for screens
(function(){
  const grid = document.querySelector('[data-lightbox]');
  if(!grid) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('aria-hidden','true');
  lb.innerHTML = `
    <div class="lightbox__inner" role="dialog" aria-modal="true" aria-label="Screenshot Vorschau">
      <div class="lightbox__bar">
        <div class="lightbox__title">Screenshot</div>
        <button class="lightbox__close" type="button" aria-label="Schließen">Schließen</button>
      </div>
      <img class="lightbox__img" alt="Screenshot groß" />
    </div>
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lightbox__img');
  const titleEl = lb.querySelector('.lightbox__title');
  const closeBtn = lb.querySelector('.lightbox__close');

  const open = (src, title) => {
    imgEl.src = src;
    titleEl.textContent = title || 'Screenshot';
    lb.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
  };
  const close = () => {
    lb.setAttribute('aria-hidden','true');
    imgEl.src = '';
    document.documentElement.style.overflow = '';
  };

  grid.querySelectorAll('[data-img]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-img');
      const fig = btn.closest('figure');
      const cap = fig ? fig.querySelector('figcaption') : null;
      open(src, cap ? cap.textContent.trim() : 'Screenshot');
    });
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', (e)=>{
    if(e.target === lb) close();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') close();
  });
})();
