/* RP // NETWORK OPERATIONS — boot, interface HUD, scène Three.js, topologie, modales, terminal.
   Script classique (defer) : aucune dépendance obligatoire, THREE est optionnel. */
(function () {
  'use strict';

  /* =========================================================
     Contexte & utilitaires
     ========================================================= */
  const P = window.PORTFOLIO || {};
  const ID = P.identity || {};
  const body = document.body;
  const pageStart = Date.now();

  const media = query => { try { return window.matchMedia(query).matches; } catch (e) { return false; } };
  const reducedMotion = media('(prefers-reduced-motion: reduce)');
  const isBot = navigator.webdriver === true;
  const staticMode = reducedMotion || isBot;
  const finePointer = media('(hover: hover) and (pointer: fine)');

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad = (n, len) => String(n).padStart(len, '0');
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = list => list[Math.floor(Math.random() * list.length)];

  function safe(fn, label) {
    try { return fn(); } catch (err) {
      if (window.console) console.warn('[rp] ' + (label || fn.name || 'init') + ' a échoué :', err);
      return undefined;
    }
  }

  const store = {
    get(key) { try { return window.sessionStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { window.sessionStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ } }
  };

  const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => HTML_ESCAPES[c]);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  const isTypingTarget = target => Boolean(target && target.closest && target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));

  /* Boucle rAF partagée pour toutes les animations 2D. */
  const animationLoop = {
    tasks: new Set(),
    frame: 0,
    add(task) {
      this.tasks.add(task);
      if (!this.frame) this.frame = requestAnimationFrame(time => this.tick(time));
    },
    remove(task) { this.tasks.delete(task); },
    has(task) { return this.tasks.has(task); },
    tick(time) {
      this.tasks.forEach(task => {
        try { task(time); } catch (err) { this.tasks.delete(task); if (window.console) console.warn('[rp] tâche animée retirée :', err); }
      });
      this.frame = this.tasks.size ? requestAnimationFrame(next => this.tick(next)) : 0;
    }
  };

  /* Scroll : toutes les lectures de layout, puis toutes les écritures, une fois par frame. */
  const scrollScheduler = {
    tasks: [],
    pending: false,
    add(task) { this.tasks.push(task); this.request(); },
    request() {
      if (this.pending) return;
      this.pending = true;
      requestAnimationFrame(() => this.run());
    },
    run() {
      this.pending = false;
      const ctx = { y: window.scrollY || window.pageYOffset || 0, vh: window.innerHeight, vw: window.innerWidth };
      const reads = this.tasks.map(task => { try { return task.read(ctx); } catch (e) { return undefined; } });
      this.tasks.forEach((task, i) => { if (reads[i] !== undefined) safe(() => task.write(reads[i], ctx), 'scroll'); });
    }
  };

  /* API partagée entre modules (terminal → modale, konami → matrix…). */
  const api = {
    openDetail: () => false,
    openTerminal: () => {},
    closeTerminal: () => {},
    runMatrix: () => {}
  };

  /* =========================================================
     Toast
     ========================================================= */
  let toastTimer = 0;
  let toastReturnTimer = 0;
  function toast(message) {
    const node = document.getElementById('toast');
    if (!node) return;
    // Un <dialog> modal est dans le top layer : le toast doit y entrer pour rester visible.
    const openDialog = document.querySelector('dialog[open]');
    const host = openDialog || body;
    clearTimeout(toastReturnTimer);
    if (node.parentNode !== host) host.appendChild(node);
    node.textContent = message;
    node.classList.remove('is-visible');
    void node.offsetWidth; // relance la transition si un toast est déjà affiché
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      node.classList.remove('is-visible');
      toastReturnTimer = setTimeout(() => { if (node.parentNode !== body) body.appendChild(node); }, 450);
    }, 2600);
  }

  /* =========================================================
     Effet "decrypt" (scramble)
     ========================================================= */
  const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01';
  const scrambleTasks = new WeakMap();
  const scrambleLabels = new WeakMap();

  function scramble(node, options) {
    if (!node) return;
    const opts = options || {};
    const finalText = opts.text != null ? String(opts.text) : (node.dataset.scrambleText || node.textContent);
    node.dataset.scrambleText = finalText;
    const previous = scrambleTasks.get(node);
    if (previous) animationLoop.remove(previous);
    if (staticMode || !finalText) {
      node.textContent = finalText;
      return;
    }
    const duration = opts.duration || 700;
    if (!previous) scrambleLabels.set(node, node.getAttribute('aria-label'));
    node.setAttribute('aria-label', finalText);
    const start = performance.now();
    let lastStep = -1;
    const task = now => {
      const progress = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(progress * finalText.length);
      const step = Math.floor((now - start) / 45);
      if (progress < 1 && step === lastStep) return;
      lastStep = step;
      let out = finalText.slice(0, resolved);
      for (let i = resolved; i < finalText.length; i++) {
        const ch = finalText[i];
        out += ch === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      node.textContent = out;
      if (progress >= 1) {
        node.textContent = finalText;
        const own = scrambleLabels.get(node);
        if (own) node.setAttribute('aria-label', own); else node.removeAttribute('aria-label');
        scrambleLabels.delete(node);
        animationLoop.remove(task);
        scrambleTasks.delete(node);
      }
    };
    scrambleTasks.set(node, task);
    animationLoop.add(task);
  }

  /* =========================================================
     Boot
     ========================================================= */
  const BOOT_KEY = 'rp-boot-seen';
  const bootState = { done: false, queue: [] };

  function onBootDone(fn) {
    if (bootState.done) safe(fn);
    else bootState.queue.push(fn);
  }

  function completeBoot() {
    if (bootState.done) return;
    bootState.done = true;
    body.classList.remove('is-booting');
    bootState.queue.splice(0).forEach(fn => safe(fn));
  }

  function dismissBootOverlay(node) {
    if (!node) return;
    node.classList.add('is-done');
    let removed = false;
    const remove = () => { if (!removed) { removed = true; node.remove(); } };
    node.addEventListener('transitionend', event => { if (event.target === node) remove(); });
    setTimeout(remove, 900);
  }

  // Filet de sécurité absolu : quoi qu'il arrive, l'écran de boot disparaît.
  setTimeout(() => {
    if (bootState.done) return;
    dismissBootOverlay(document.getElementById('boot'));
    completeBoot();
  }, 5000);

  function initBoot() {
    const overlay = document.getElementById('boot');
    const skip = !overlay || staticMode || location.hash.length > 1 || store.get(BOOT_KEY) === '1';
    if (skip) {
      if (overlay) overlay.remove();
      completeBoot();
      return;
    }

    const log = document.getElementById('bootLog');
    const bar = document.getElementById('bootBar');
    const percent = document.getElementById('bootPercent');
    const lines = Array.isArray(P.bootLines) && P.bootLines.length ? P.bootLines : ['RP-OS — initialisation', 'SYSTEM READY'];
    const offsets = [];
    let total = 0;
    lines.forEach(line => { offsets.push(total); total += line.length; });

    const TYPE_MS = 1700;
    const HOLD_MS = 280;
    const rows = [];
    const rendered = [];
    let start = 0;
    let raf = 0;
    let finished = false;

    const finish = event => {
      if (event && event.type === 'keydown') event.rpBootSkip = true; // la touche ne déclenche pas d'autre raccourci
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      window.removeEventListener('keydown', finish, true);
      overlay.removeEventListener('pointerdown', finish);
      store.set(BOOT_KEY, '1');
      dismissBootOverlay(overlay);
      completeBoot();
    };
    const failsafe = setTimeout(finish, 4000);

    const renderLine = (index, text, complete) => {
      let row = rows[index];
      if (!row) {
        row = el('div', 'boot-line');
        rows[index] = row;
        if (log) log.appendChild(row);
        if (index > 0 && rows[index - 1]) rows[index - 1].classList.remove('is-typing');
      }
      if (rendered[index] === text.length && !complete) return;
      rendered[index] = text.length;
      row.classList.toggle('is-typing', !complete);
      const okAt = complete ? text.lastIndexOf('[OK]') : -1;
      if (okAt >= 0) {
        row.textContent = '> ' + text.slice(0, okAt);
        row.appendChild(el('span', 'boot-ok', '[OK]'));
        row.appendChild(document.createTextNode(text.slice(okAt + 4)));
      } else {
        row.textContent = '> ' + text;
      }
    };

    const tick = now => {
      if (finished) return;
      if (!start) start = now;
      const progress = Math.min((now - start) / TYPE_MS, 1);
      const typed = Math.round(progress * total);
      lines.forEach((line, i) => {
        const shown = clamp(typed - offsets[i], 0, line.length);
        if (shown > 0 || (i === 0)) renderLine(i, line.slice(0, shown), shown === line.length);
      });
      const pct = Math.round(progress * 100);
      if (bar) bar.style.width = pct + '%';
      if (percent) percent.textContent = pad(pct, 3) + '%';
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, HOLD_MS);
    };

    window.addEventListener('keydown', finish, true);
    overlay.addEventListener('pointerdown', finish);
    raf = requestAnimationFrame(tick);
  }

  /* =========================================================
     Menu mobile
     ========================================================= */
  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('navLinks');
    if (!burger || !nav) return;
    const setOpen = open => {
      burger.classList.toggle('open', open);
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('click', event => {
      if (nav.classList.contains('open') && !event.target.closest('#navbar')) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* =========================================================
     Interface de scroll : progression, navbar, lien actif, rail HUD
     ========================================================= */
  function initScrollInterface() {
    const progress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const hudSection = document.getElementById('hudSection');
    const links = $$('.nav-link');
    const linkById = {};
    links.forEach(link => {
      const id = (link.getAttribute('href') || '').replace('#', '');
      if (id) linkById[id] = link;
    });
    const sections = $$('main section[id]');
    let lastNav = null;
    let lastHud = null;
    let lastScrolled = null;

    scrollScheduler.add({
      read({ y, vh }) {
        const max = document.documentElement.scrollHeight - vh;
        const threshold = vh * 0.35;
        const atBottom = max > 0 && y >= max - 4;
        let navId = sections.length ? sections[0].id : null;
        let hud = null;
        sections.forEach(section => {
          const top = section.getBoundingClientRect().top;
          if (top <= threshold || atBottom) {
            if (linkById[section.id]) navId = section.id;
            if (section.dataset.hud) hud = section.dataset.hud;
          }
        });
        if (!hud && sections[0]) hud = sections[0].dataset.hud || null;
        return { ratio: max > 0 ? clamp(y / max, 0, 1) : 0, scrolled: y > 30, navId, hud };
      },
      write({ ratio, scrolled, navId, hud }) {
        if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
        if (navbar && scrolled !== lastScrolled) { navbar.classList.toggle('is-scrolled', scrolled); lastScrolled = scrolled; }
        if (navId !== lastNav) {
          lastNav = navId;
          links.forEach(link => {
            const on = link === linkById[navId];
            link.classList.toggle('active', on);
            if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
          });
        }
        if (hudSection && hud && hud !== lastHud) {
          lastHud = hud;
          scramble(hudSection, { text: hud, duration: 380 });
        }
      }
    });
  }

  function initHudClock() {
    const clock = document.getElementById('hudClock');
    if (!clock) return;
    let last = '';
    const update = () => {
      const now = new Date();
      const text = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2);
      if (text !== last) { clock.textContent = text; last = text; }
    };
    update();
    setInterval(update, 1000);
  }

  function initHudCoords() {
    const coords = document.getElementById('hudCoords');
    if (!coords) return;
    let x = 0;
    let y = 0;
    let pending = false;
    window.addEventListener('pointermove', event => {
      x = event.clientX;
      y = event.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        coords.textContent = 'X ' + pad(Math.round(x), 4) + ' · Y ' + pad(Math.round(y), 4);
      });
    }, { passive: true });
  }

  /* =========================================================
     Apparition au scroll + scramble des titres
     ========================================================= */
  function scrambleWithin(node, delay) {
    const targets = node.matches('[data-scramble]') ? [node] : $$('[data-scramble]', node);
    targets.forEach(target => setTimeout(() => scramble(target), (delay || 0) + 140));
  }

  function initReveal() {
    const elements = $$('[data-reveal]');
    const revealAll = () => elements.forEach(node => node.classList.add('revealed'));
    if (staticMode || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }
    try {
      body.classList.add('motion-ready');
      elements.forEach(node => node.style.setProperty('--reveal-delay', node.dataset.revealDelay || '0'));
      const reveal = node => {
        node.classList.add('revealed');
        scrambleWithin(node, Number(node.dataset.revealDelay) || 0);
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          reveal(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      const heroItems = elements.filter(node => node.closest('.hero'));
      elements.filter(node => !node.closest('.hero')).forEach(node => observer.observe(node));
      // Le hero se dévoile en cascade seulement une fois le boot terminé.
      onBootDone(() => heroItems.forEach(node => observer.observe(node)));
    } catch (err) {
      revealAll();
      throw err;
    }
  }

  /* =========================================================
     Curseur HUD
     ========================================================= */
  function initCursor() {
    if (staticMode || !finePointer) return;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    const HOVER = 'a, button, [data-open], [data-tilt], input, textarea, select, label, [role="button"], .topo-node--hub';
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    const follow = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      ring.style.transform = 'translate3d(' + current.x.toFixed(1) + 'px,' + current.y.toFixed(1) + 'px,0)';
      if (Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1) animationLoop.remove(follow);
    };
    window.addEventListener('pointermove', event => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      target.x = event.clientX;
      target.y = event.clientY;
      dot.style.transform = 'translate3d(' + target.x + 'px,' + target.y + 'px,0)';
      if (!body.classList.contains('cursor-ready')) {
        current.x = target.x;
        current.y = target.y;
        body.classList.add('cursor-ready');
      }
      if (!animationLoop.has(follow)) animationLoop.add(follow);
    }, { passive: true });
    document.addEventListener('pointerover', event => {
      body.classList.toggle('cursor-hover', Boolean(event.target.closest && event.target.closest(HOVER)));
    }, { passive: true });
    document.addEventListener('pointerdown', () => body.classList.add('cursor-down'), { passive: true });
    document.addEventListener('pointerup', () => body.classList.remove('cursor-down'), { passive: true });
    document.addEventListener('mouseout', event => {
      if (!event.relatedTarget) body.classList.remove('cursor-ready', 'cursor-down');
    });
  }

  /* =========================================================
     Boutons magnétiques, compteurs, rôle tapé, tilt
     ========================================================= */
  function initMagnetic() {
    if (staticMode || !finePointer) return;
    $$('.magnetic').forEach(node => {
      node.addEventListener('pointermove', event => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
        node.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      }, { passive: true });
      node.addEventListener('pointerleave', () => { node.style.transform = ''; });
    });
  }

  function initCounters() {
    const counters = $$('.counter[data-value]');
    if (!counters.length || staticMode || !('IntersectionObserver' in window)) return;
    const run = counter => {
      const target = Number(counter.dataset.value) || 0;
      const duration = target > 100 ? 1400 : 950;
      const started = performance.now();
      const step = now => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress >= 1) animationLoop.remove(step);
      };
      animationLoop.add(step);
    };
    counters.forEach(counter => { counter.textContent = '0'; });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        run(entry.target);
      });
    }, { threshold: 0.4 });
    onBootDone(() => counters.forEach(counter => observer.observe(counter)));
  }

  function initTypedRole() {
    const node = document.getElementById('typedRole');
    const roles = Array.isArray(P.roles) ? P.roles.filter(Boolean) : [];
    if (!node || !roles.length) return;
    if (staticMode || roles.length < 2) {
      node.textContent = roles[0];
      return;
    }
    let index = 0;
    let text = roles[0];
    node.textContent = text;
    const wait = (fn, ms) => setTimeout(() => { if (document.hidden) wait(fn, 400); else fn(); }, ms);
    const erase = () => {
      if (text.length) {
        text = text.slice(0, -1);
        node.textContent = text;
        wait(erase, 28);
      } else {
        index = (index + 1) % roles.length;
        wait(type, 260);
      }
    };
    const type = () => {
      const full = roles[index];
      if (text.length < full.length) {
        text = full.slice(0, text.length + 1);
        node.textContent = text;
        wait(type, rand(42, 78));
      } else {
        wait(erase, 1900);
      }
    };
    onBootDone(() => wait(erase, 2200));
  }

  function initTilt() {
    if (staticMode || !finePointer) return;
    $$('.project-card[data-tilt]').forEach(card => {
      let frame = 0;
      let px = 0.5;
      let py = 0.5;
      const apply = () => {
        frame = 0;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 9).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 10).toFixed(2) + 'deg) translateY(-5px)';
      };
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        if (!frame) frame = requestAnimationFrame(apply);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        card.style.transform = '';
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }

  /* =========================================================
     Scène Three.js du hero
     ========================================================= */
  const COLORS = { cyan: 0x00f3ff, acid: 0x8bffc8, acidDeep: 0x27e58a, blue: 0x0066ff, white: 0xeafcff, ink: 0x02060c };

  function initHero3D() {
    const hero = document.getElementById('home');
    const mount = document.getElementById('hero3d');
    if (!hero || !mount) return;
    const heroState = { progress: 0 };
    let fadeTarget = null;

    // Fondu de la scène à mesure que le hero sort de l'écran.
    scrollScheduler.add({
      read() {
        const rect = hero.getBoundingClientRect();
        return clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      },
      write(progress) {
        heroState.progress = progress;
        if (fadeTarget) fadeTarget.style.opacity = clamp(1 - progress * 1.15, 0, 1).toFixed(3);
      }
    });

    const useFallback = () => {
      hero.classList.add('hero--fallback');
      fadeTarget = safe(() => initNetworkCanvas(hero), 'fallback-canvas') || null;
    };

    if (!window.THREE) { useFallback(); return; }
    try {
      fadeTarget = createHeroScene(hero, mount, heroState, () => {
        fadeTarget = null;
        useFallback();
      });
    } catch (err) {
      mount.textContent = '';
      useFallback();
      if (window.console) console.warn('[rp] WebGL indisponible, repli 2D :', err);
    }
  }

  function makeGlowTexture(T) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.16, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.42, 'rgba(255,255,255,0.25)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(canvas);
  }

  function uniqueVertices(geometry) {
    const pos = geometry.attributes.position;
    const seen = new Set();
    const out = [];
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const key = x.toFixed(2) + ',' + y.toFixed(2) + ',' + z.toFixed(2);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(x, y, z);
    }
    return out;
  }

  function createHeroScene(hero, mount, heroState, onContextLost) {
    const T = window.THREE;
    const narrowAtStart = window.innerWidth < 820;

    // Lève une exception si WebGL est indisponible → repli 2D.
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: staticMode });
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    mount.appendChild(canvas);

    // Matériaux construits par affectation : pas d'avertissement si une propriété n'existe pas en r128.
    const material = (Ctor, props) => {
      const m = new Ctor();
      Object.keys(props).forEach(key => {
        if (key === 'color') m.color.set(props.color);
        else m[key] = props[key];
      });
      return m;
    };
    const glow = (props) => Object.assign({ transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false }, props);
    const glowTexture = makeGlowTexture(T);
    const sprite = (color, opacity, size) => {
      const s = new T.Sprite(material(T.SpriteMaterial, glow({ map: glowTexture, color, opacity })));
      s.scale.set(size, size, 1);
      return s;
    };

    const scene = new T.Scene();
    scene.fog = new T.FogExp2(COLORS.ink, 0.0019);
    const camera = new T.PerspectiveCamera(52, 1, 1, 3000);
    const cam = { x: 0, y: 34, z: 320, baseZ: 320 };
    camera.position.set(cam.x, cam.y, cam.z);
    const lookTarget = new T.Vector3(0, -8, 0);

    const world = new T.Group();
    scene.add(world);
    const coreRig = new T.Group();
    world.add(coreRig);

    /* --- Noyau --- */
    const R = 56;
    const shellGeometry = new T.IcosahedronGeometry(R, 1);
    const shell = new T.LineSegments(new T.WireframeGeometry(shellGeometry), material(T.LineBasicMaterial, glow({ color: COLORS.cyan, opacity: 0.55 })));
    const vertexGeometry = new T.BufferGeometry();
    vertexGeometry.setAttribute('position', new T.Float32BufferAttribute(uniqueVertices(shellGeometry), 3));
    shell.add(new T.Points(vertexGeometry, material(T.PointsMaterial, glow({ color: COLORS.cyan, map: glowTexture, size: 10, sizeAttenuation: true, opacity: 0.95 }))));
    coreRig.add(shell);

    const outerShell = new T.LineSegments(new T.WireframeGeometry(new T.IcosahedronGeometry(R * 1.42, 2)), material(T.LineBasicMaterial, glow({ color: COLORS.blue, opacity: 0.16 })));
    coreRig.add(outerShell);

    const innerGeometry = new T.IcosahedronGeometry(R * 0.46, 0);
    const inner = new T.Mesh(innerGeometry, material(T.MeshBasicMaterial, glow({ color: COLORS.acid, opacity: 0.2, side: T.DoubleSide })));
    inner.add(new T.LineSegments(new T.WireframeGeometry(innerGeometry), material(T.LineBasicMaterial, glow({ color: COLORS.acid, opacity: 0.95 }))));
    coreRig.add(inner);

    // Faux bloom : halos additifs.
    const halo = sprite(COLORS.cyan, 0.36, R * 5.4);
    const heart = sprite(COLORS.acid, 0.55, R * 1.9);
    coreRig.add(halo, heart);

    /* --- Anneaux orbitaux + satellites --- */
    const ringDefs = [
      { radius: R * 1.78, tilt: [1.18, 0.12, 0], speed: 0.46, color: COLORS.cyan, sats: 2 },
      { radius: R * 2.2, tilt: [1.72, -0.58, 0.32], speed: -0.3, color: COLORS.acid, sats: 1 },
      { radius: R * 2.62, tilt: [0.52, 0.86, -0.22], speed: 0.19, color: COLORS.cyan, sats: 3 }
    ];
    const rings = ringDefs.map(def => {
      const pivot = new T.Group();
      pivot.rotation.set(def.tilt[0], def.tilt[1], def.tilt[2]);
      coreRig.add(pivot);
      pivot.add(new T.Mesh(new T.TorusGeometry(def.radius, 0.42, 6, 200), material(T.MeshBasicMaterial, glow({ color: def.color, opacity: 0.26 }))));
      const spin = new T.Group();
      pivot.add(spin);
      const ARC = 0.95;
      const arc = new T.Mesh(new T.TorusGeometry(def.radius, 0.75, 6, 64, ARC), material(T.MeshBasicMaterial, glow({ color: def.color, opacity: 0.72 })));
      arc.rotation.z = def.speed > 0 ? -ARC : 0; // la traînée suit le satellite de tête
      spin.add(arc);
      for (let k = 0; k < def.sats; k++) {
        const angle = (k / def.sats) * Math.PI * 2;
        const sat = sprite(k === 0 ? COLORS.white : def.color, 1, k === 0 ? 20 : 13);
        sat.position.set(Math.cos(angle) * def.radius, Math.sin(angle) * def.radius, 0);
        spin.add(sat);
      }
      spin.rotation.z = Math.random() * Math.PI * 2;
      return { pivot, spin, speed: def.speed };
    });

    /* --- Constellation réseau --- */
    const constellation = new T.Group();
    world.add(constellation);
    const NODE_COUNT = narrowAtStart ? 46 : 72;
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - ((i + 0.5) / NODE_COUNT) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = i * 2.399963 + rand(-0.12, 0.12);
      const radius = rand(R * 3.1, R * 4.2);
      nodes.push(new T.Vector3(Math.cos(theta) * ring * radius, y * radius * 0.78, Math.sin(theta) * ring * radius));
    }
    const edgeKeys = new Set();
    const adjacency = nodes.map(() => []);
    nodes.forEach((node, a) => {
      nodes
        .map((other, b) => ({ b, d: a === b ? Infinity : node.distanceToSquared(other) }))
        .sort((m, n) => m.d - n.d)
        .slice(0, 3)
        .forEach(({ b }) => {
          const key = a < b ? a + '-' + b : b + '-' + a;
          if (edgeKeys.has(key)) return;
          edgeKeys.add(key);
          adjacency[a].push(b);
          adjacency[b].push(a);
        });
    });
    const edgePositions = [];
    edgeKeys.forEach(key => {
      const parts = key.split('-');
      const a = nodes[+parts[0]];
      const b = nodes[+parts[1]];
      edgePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    // Quelques liaisons montantes du noyau vers le maillage.
    for (let i = 0; i < 8; i++) {
      const target = nodes[Math.floor((i / 8) * NODE_COUNT + rand(0, NODE_COUNT / 8))] || nodes[0];
      const from = target.clone().setLength(R * 1.5);
      edgePositions.push(from.x, from.y, from.z, target.x, target.y, target.z);
    }
    const edgeGeometry = new T.BufferGeometry();
    edgeGeometry.setAttribute('position', new T.Float32BufferAttribute(edgePositions, 3));
    constellation.add(new T.LineSegments(edgeGeometry, material(T.LineBasicMaterial, { color: COLORS.cyan, transparent: true, opacity: 0.17, depthWrite: false, blending: T.AdditiveBlending })));

    const nodePositions = [];
    const nodeColors = [];
    const cCyan = new T.Color(COLORS.cyan);
    const cAcid = new T.Color(COLORS.acid);
    nodes.forEach((node, i) => {
      nodePositions.push(node.x, node.y, node.z);
      const c = i % 5 === 0 ? cAcid : cCyan;
      nodeColors.push(c.r, c.g, c.b);
    });
    const nodeGeometry = new T.BufferGeometry();
    nodeGeometry.setAttribute('position', new T.Float32BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new T.Float32BufferAttribute(nodeColors, 3));
    constellation.add(new T.Points(nodeGeometry, material(T.PointsMaterial, { map: glowTexture, size: 7, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: T.AdditiveBlending })));

    // Paquets : suivent une arête puis choisissent un voisin (routage).
    const PACKET_COUNT = narrowAtStart ? 5 : 10;
    const packetArray = new Float32Array(PACKET_COUNT * 3);
    const packetGeometry = new T.BufferGeometry();
    packetGeometry.setAttribute('position', new T.BufferAttribute(packetArray, 3));
    const packetMaterial = material(T.PointsMaterial, { map: glowTexture, color: COLORS.acid, size: 13, sizeAttenuation: true, transparent: true, opacity: 1, depthWrite: false, blending: T.AdditiveBlending });
    constellation.add(new T.Points(packetGeometry, packetMaterial));
    const packets = [];
    for (let i = 0; i < PACKET_COUNT; i++) {
      let a = Math.floor(Math.random() * NODE_COUNT);
      if (!adjacency[a].length) a = 0;
      packets.push({ a, b: pick(adjacency[a]) || 0, t: Math.random(), speed: rand(0.5, 0.95) });
    }
    const updatePackets = dt => {
      packets.forEach((packet, i) => {
        packet.t += dt * packet.speed;
        if (packet.t >= 1) {
          const options = adjacency[packet.b].filter(n => n !== packet.a);
          packet.a = packet.b;
          packet.b = options.length ? pick(options) : (adjacency[packet.b][0] || 0);
          packet.t = 0;
          packet.speed = rand(0.5, 0.95);
        }
        const from = nodes[packet.a];
        const to = nodes[packet.b];
        packetArray[i * 3] = lerp(from.x, to.x, packet.t);
        packetArray[i * 3 + 1] = lerp(from.y, to.y, packet.t);
        packetArray[i * 3 + 2] = lerp(from.z, to.z, packet.t);
      });
      packetGeometry.attributes.position.needsUpdate = true;
    };

    /* --- Poussière --- */
    const DUST = narrowAtStart ? 320 : 820;
    const dustPositions = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustPositions[i * 3] = rand(-700, 700);
      dustPositions[i * 3 + 1] = rand(-140, 460);
      dustPositions[i * 3 + 2] = rand(-700, 500);
    }
    const dustGeometry = new T.BufferGeometry();
    dustGeometry.setAttribute('position', new T.BufferAttribute(dustPositions, 3));
    const dust = new T.Points(dustGeometry, material(T.PointsMaterial, { map: glowTexture, color: 0x6fdcff, size: 2.6, sizeAttenuation: true, transparent: true, opacity: 0.6, depthWrite: false, blending: T.AdditiveBlending }));
    scene.add(dust);

    /* --- Sol : grille défilante + ondes radar --- */
    const GRID_SIZE = 2400;
    const GRID_DIV = 60;
    const cell = GRID_SIZE / GRID_DIV;
    const grid = new T.GridHelper(GRID_SIZE, GRID_DIV, COLORS.cyan, 0x0a3d6b);
    grid.position.y = -150;
    grid.material.transparent = true;
    grid.material.opacity = 0.34;
    grid.material.depthWrite = false;
    scene.add(grid);

    const pings = [0, 1.4, 2.8].map(offset => {
      const mesh = new T.Mesh(new T.RingGeometry(0.97, 1, 96), material(T.MeshBasicMaterial, { color: COLORS.cyan, transparent: true, opacity: 0, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide }));
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -149;
      scene.add(mesh);
      return { mesh, offset };
    });

    /* --- Entrées --- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    if (!staticMode) {
      window.addEventListener('pointermove', event => {
        pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }

    /* --- Mise en page : noyau à droite sur grand écran, centré et réduit sur mobile --- */
    const textRight = node => {
      if (!node) return 0;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      return rect.width ? rect.right : 0;
    };
    const layout = () => {
      const width = mount.clientWidth || hero.clientWidth || window.innerWidth;
      const height = mount.clientHeight || hero.clientHeight || window.innerHeight;
      const narrow = width < 820;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      cam.baseZ = narrow ? 380 : 320;
      const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * cam.baseZ * camera.aspect;
      // Le hero peut dépasser la hauteur d'écran : on ancre le noyau dans la partie visible.
      const visible = Math.min(height, window.innerHeight || height);
      const offsetY = height / 2 - visible * (narrow ? 0.4 : 0.54);
      if (narrow) {
        coreRig.scale.setScalar(clamp((halfWidth * 0.9) / (R * 2.7), 0.42, 0.82));
        camera.setViewOffset(width, height, 0, offsetY, width, height);
      } else {
        // Noyau logé dans l'espace entre le titre et la console (légèrement recouvert par celle-ci).
        const pxPerUnit = height / (2 * Math.tan((camera.fov * Math.PI) / 360) * Math.hypot(cam.baseZ, cam.y - lookTarget.y));
        const box = mount.getBoundingClientRect();
        const consoleEl = hero.querySelector('.hero-console');
        const consoleLeft = consoleEl ? consoleEl.getBoundingClientRect().left - box.left : width * 0.62;
        const titleRight = Math.max(textRight(hero.querySelector('.hero-title .glitch')), textRight(hero.querySelector('.title-outline'))) - box.left;
        const baseScale = width >= 1080 ? 1 : 0.86;
        let coreX = width * (width >= 1080 ? 0.69 : 0.62);
        let scale = baseScale;
        if (titleRight > 0 && titleRight < consoleLeft) {
          scale = clamp(((consoleLeft - titleRight) * 1.05) / (R * pxPerUnit), 0.78, baseScale);
          coreX = lerp(titleRight, consoleLeft, width >= 1080 ? 0.6 : 0.82);
        }
        coreRig.scale.setScalar(scale);
        camera.setViewOffset(width, height, width / 2 - coreX, offsetY, width, height);
      }
      camera.updateProjectionMatrix();
    };

    /* --- Animation --- */
    let elapsed = 0;
    const update = dt => {
      elapsed += dt;
      const t = elapsed;
      const p = heroState.progress;
      const boost = 1 + p * 3.5;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      shell.rotation.y += dt * 0.22 * boost;
      shell.rotation.x += dt * 0.07 * boost;
      outerShell.rotation.y -= dt * 0.06 * boost;
      outerShell.rotation.z += dt * 0.025;
      inner.rotation.y -= dt * 0.62 * boost;
      inner.rotation.x += dt * 0.34;
      const pulse = Math.sin(t * 2.2);
      inner.scale.setScalar(1 + pulse * 0.07);
      heart.material.opacity = 0.46 + pulse * 0.13;
      halo.material.opacity = 0.32 + Math.sin(t * 1.1) * 0.05;

      coreRig.rotation.y += (pointer.x * 0.35 - coreRig.rotation.y) * 0.04;
      coreRig.rotation.x += (pointer.y * 0.2 - coreRig.rotation.x) * 0.04;

      rings.forEach(ring => {
        ring.spin.rotation.z += dt * ring.speed * boost;
        ring.pivot.rotation.y += dt * 0.035;
      });

      constellation.rotation.y += dt * 0.035 * boost;
      constellation.rotation.x = Math.sin(t * 0.12) * 0.09;
      updatePackets(dt);

      dust.rotation.y -= dt * 0.012;
      grid.position.z = (grid.position.z + dt * 28 * boost) % cell;

      pings.forEach(ping => {
        const phase = ((t + ping.offset) % 4.2) / 4.2;
        ping.mesh.scale.setScalar(30 + phase * 440);
        ping.mesh.material.opacity = (1 - phase) * 0.3;
      });

      const tx = cam.x + pointer.x * 38;
      const ty = cam.y - pointer.y * 22 + p * 36;
      const tz = cam.baseZ - p * 120;
      camera.position.x += (tx - camera.position.x) * 0.05;
      camera.position.y += (ty - camera.position.y) * 0.05;
      camera.position.z += (tz - camera.position.z) * 0.08;
      camera.lookAt(lookTarget);
    };

    const render = () => renderer.render(scene, camera);

    let running = false;
    let raf = 0;
    let last = 0;
    let heroVisible = true;
    let lost = false;
    const frame = now => {
      raf = 0;
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05) || 0.016;
      last = now;
      update(dt);
      render();
      raf = requestAnimationFrame(frame);
    };
    const setRunning = value => {
      if (staticMode || lost) value = false;
      if (value === running) return;
      running = value;
      if (value) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const refresh = () => setRunning(heroVisible && !document.hidden);

    const renderStill = () => {
      // Pose figée "photogénique" : paquets en vol, ondes étalées.
      for (let i = 0; i < 72; i++) update(1 / 30);
      camera.position.set(cam.x, cam.y, cam.baseZ);
      camera.lookAt(lookTarget);
      render();
    };

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        layout();
        if (!running) render();
      });
    };

    layout();
    if (staticMode) {
      renderStill();
    } else {
      update(0.016);
      camera.position.set(cam.x, cam.y, cam.baseZ);
      render();
    }

    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(mount);
    window.addEventListener('resize', onResize);
    // La largeur du titre dépend de la police d'affichage : on recale le noyau une fois chargée.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize).catch(() => {});

    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      lost = true;
      setRunning(false);
      canvas.remove();
      if (onContextLost) onContextLost();
    }, false);

    if (!staticMode) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
          heroVisible = entries[entries.length - 1].isIntersecting;
          refresh();
        }, { threshold: 0 }).observe(hero);
      }
      document.addEventListener('visibilitychange', refresh);
      refresh();
    }
    return canvas;
  }

  /* Repli 2D (réseau animé) si WebGL n'est pas disponible. */
  function initNetworkCanvas(hero) {
    const canvas = document.getElementById('heroFallback');
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext('2d');
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let nodes = [];
    let running = false;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(78, Math.floor((width * height) / 17000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        radius: i % 9 === 0 ? 2.3 : 1.2,
        acid: i % 5 === 0,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = time => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 180) { node.x -= (dx / d) * 0.14; node.y -= (dy / d) * 0.14; }
        }
      });
      ctx.lineWidth = 0.7;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
          if (d > 145) continue;
          ctx.strokeStyle = 'rgba(0,243,255,' + ((1 - d / 145) * 0.2).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
      if (pointer.active) {
        nodes.forEach(node => {
          const d = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (d > 220) return;
          ctx.strokeStyle = 'rgba(139,255,200,' + ((1 - d / 220) * 0.24).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        });
      }
      nodes.forEach(node => {
        const glowLevel = 0.72 + Math.sin(time * 0.0015 + node.phase) * 0.28;
        ctx.fillStyle = node.acid ? 'rgba(139,255,200,' + glowLevel.toFixed(3) + ')' : 'rgba(0,243,255,' + glowLevel.toFixed(3) + ')';
        ctx.shadowBlur = node.radius > 2 ? 16 : 7;
        ctx.shadowColor = node.acid ? '#8bffc8' : '#00f3ff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    };

    const setRunning = value => {
      if (running === value) return;
      running = value;
      if (value) animationLoop.add(draw); else animationLoop.remove(draw);
    };

    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { pointer.active = false; });
    window.addEventListener('resize', () => { resize(); if (!running) draw(0); });
    resize();
    if (staticMode || !('IntersectionObserver' in window)) {
      draw(0);
      return canvas;
    }
    let visible = true;
    new IntersectionObserver(entries => {
      visible = entries[entries.length - 1].isIntersecting;
      setRunning(visible && !document.hidden);
    }, { threshold: 0.02 }).observe(hero);
    document.addEventListener('visibilitychange', () => setRunning(visible && !document.hidden));
    return canvas;
  }

  /* =========================================================
     Topologie des compétences (SVG)
     ========================================================= */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs || {}).forEach(key => node.setAttribute(key, attrs[key]));
    if (parent) parent.appendChild(node);
    return node;
  }

  /* Géométrie : hubs sur une ellipse, feuilles en éventail tourné vers l'extérieur
     (biais vertical pour que les éventails haut/bas ne se chevauchent pas). */
  function layoutTopology(hubs) {
    const W = 800;
    const H = 560;
    const cx = W / 2;
    const cy = H / 2;
    const RX = 190;
    const RY = 130;
    const LEAF_R = 112;
    const SPREAD = (118 * Math.PI) / 180;
    const BASE_ANGLES = [-148, -32, 32, 148];
    return {
      core: { x: cx, y: cy },
      rx: RX,
      ry: RY,
      hubs: hubs.map((hub, i) => {
        const deg = hubs.length <= 4 ? BASE_ANGLES[i] : -148 + (360 / hubs.length) * i;
        const a = (deg * Math.PI) / 180;
        const x = cx + Math.cos(a) * RX;
        const y = cy + Math.sin(a) * RY;
        const center = Math.atan2(Math.sin(a) * 1.7, Math.cos(a));
        const leaves = hub.leaves || [];
        const n = leaves.length;
        const step = n > 1 ? SPREAD / (n - 1) : 0;
        const start = center - (step * (n - 1)) / 2;
        return {
          id: hub.id,
          label: hub.label,
          x,
          y,
          labelY: y + (Math.sin(a) < 0 ? 44 : -34),
          leaves: leaves.map((label, j) => {
            const angle = start + step * j;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const lx = x + cos * LEAF_R;
            const ly = y + sin * LEAF_R;
            const anchor = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle';
            return {
              label,
              x: lx,
              y: ly,
              anchor,
              tx: lx + cos * 13,
              ty: ly + sin * 13 + (anchor === 'middle' ? (sin < 0 ? -2 : 10) : 4)
            };
          })
        };
      })
    };
  }

  function initTopology() {
    const svg = document.getElementById('topology');
    const wrap = document.getElementById('topologyWrap');
    const topo = P.topology;
    if (!svg || !topo || !Array.isArray(topo.hubs) || !topo.hubs.length) return;
    // Le SVG contient désormais des contrôles : role="img" les masquerait aux lecteurs d'écran.
    svg.setAttribute('role', 'group');
    svg.textContent = '';

    const L = layoutTopology(topo.hubs);
    const f = v => v.toFixed(1);

    const defs = svgEl('defs', {}, svg);
    const grad = svgEl('radialGradient', { id: 'topoCoreGlow' }, defs);
    svgEl('stop', { offset: '0%', 'stop-color': '#8bffc8', 'stop-opacity': '0.45' }, grad);
    svgEl('stop', { offset: '100%', 'stop-color': '#8bffc8', 'stop-opacity': '0' }, grad);

    const decor = svgEl('g', { class: 'topo-decor', 'aria-hidden': 'true' }, svg);
    svgEl('ellipse', { cx: L.core.x, cy: L.core.y, rx: L.rx, ry: L.ry, fill: 'none', stroke: '#00f3ff', 'stroke-opacity': '0.12', 'stroke-dasharray': '2 6' }, decor);
    svgEl('circle', { class: 'topo-ring', cx: L.core.x, cy: L.core.y, r: 60, fill: 'none', stroke: '#00f3ff', 'stroke-opacity': '0.2', 'stroke-dasharray': '1 5' }, decor);
    svgEl('circle', { cx: L.core.x, cy: L.core.y, r: 80, fill: 'url(#topoCoreGlow)' }, decor);

    const linkLayer = svgEl('g', { class: 'topo-links', 'aria-hidden': 'true' }, svg);
    const packetLayer = svgEl('g', { class: 'topo-packets', 'aria-hidden': 'true' }, svg);
    const nodeLayer = svgEl('g', { class: 'topo-nodes' }, svg);
    const leafLayer = svgEl('g', { 'aria-hidden': 'true' }, nodeLayer);

    const links = [];
    const addLink = (a, b, hub, isCore) => {
      const line = svgEl('line', {
        class: 'topo-link' + (isCore ? ' topo-link--core' : ''),
        'data-hub': hub,
        x1: f(a.x), y1: f(a.y), x2: f(b.x), y2: f(b.y),
        stroke: '#00f3ff', 'stroke-opacity': isCore ? '0.45' : '0.25', 'stroke-width': isCore ? '1.4' : '1'
      }, linkLayer);
      links.push({ line, hub, isCore, x1: a.x, y1: a.y, x2: b.x, y2: b.y, len: Math.hypot(b.x - a.x, b.y - a.y) });
    };

    L.hubs.forEach(hub => {
      addLink(L.core, hub, hub.id, true);
      hub.leaves.forEach(leaf => {
        addLink(hub, leaf, hub.id, false);
        const g = svgEl('g', { class: 'topo-node topo-node--leaf', 'data-hub': hub.id }, leafLayer);
        svgEl('circle', { cx: f(leaf.x), cy: f(leaf.y), r: 4.5, fill: '#061321', stroke: '#8bffc8', 'stroke-width': '1.2' }, g);
        const text = svgEl('text', { class: 'topo-label', x: f(leaf.tx), y: f(leaf.ty), 'text-anchor': leaf.anchor, fill: '#b9d6e0', 'font-size': '12', 'font-family': 'JetBrains Mono, monospace' }, g);
        text.textContent = leaf.label;
      });
    });

    const hubNodes = L.hubs.map(hub => {
      const source = topo.hubs.find(h => h.id === hub.id) || {};
      const g = svgEl('g', {
        class: 'topo-node topo-node--hub',
        'data-hub': hub.id,
        tabindex: '0',
        role: 'button',
        'aria-pressed': 'false',
        'aria-label': hub.label + ' : ' + (source.leaves || []).join(', ') + ' — mettre en évidence'
      }, nodeLayer);
      svgEl('circle', { class: 'topo-halo', cx: f(hub.x), cy: f(hub.y), r: 30, fill: 'none', stroke: '#00f3ff', 'stroke-opacity': '0.18' }, g);
      svgEl('circle', { cx: f(hub.x), cy: f(hub.y), r: 22, fill: '#061321', stroke: '#00f3ff', 'stroke-width': '1.6' }, g);
      svgEl('circle', { cx: f(hub.x), cy: f(hub.y), r: 4, fill: '#00f3ff' }, g);
      const text = svgEl('text', { class: 'topo-label topo-label--hub', x: f(hub.x), y: f(hub.labelY), 'text-anchor': 'middle', fill: '#eafcff', 'font-size': '15', 'font-weight': '700', 'font-family': 'Rajdhani, sans-serif', 'letter-spacing': '1.5' }, g);
      text.textContent = String(hub.label || '').toUpperCase();
      return g;
    });

    const core = svgEl('g', { class: 'topo-node topo-node--core', 'aria-hidden': 'true' }, nodeLayer);
    svgEl('circle', { cx: L.core.x, cy: L.core.y, r: 36, fill: '#061321', stroke: '#8bffc8', 'stroke-width': '1.8' }, core);
    const coreText = svgEl('text', { class: 'topo-label topo-label--core', x: L.core.x, y: L.core.y + 7, 'text-anchor': 'middle', fill: '#8bffc8', 'font-size': '22', 'font-weight': '700', 'font-family': 'Rajdhani, sans-serif', 'letter-spacing': '2' }, core);
    coreText.textContent = topo.core || 'RP';

    // Petits écrans : libellés des feuilles masqués (repris par les cartes), cadrage resserré sur le graphe.
    const points = [];
    L.hubs.forEach(hub => { points.push([hub.x, hub.y - 30], [hub.x, hub.y + 30]); hub.leaves.forEach(leaf => points.push([leaf.x, leaf.y])); });
    const boxPad = 22;
    const minX = Math.min.apply(null, points.map(p => p[0])) - boxPad;
    const minY = Math.min.apply(null, points.map(p => p[1])) - boxPad;
    const compactBox = [minX, minY, Math.max.apply(null, points.map(p => p[0])) + boxPad - minX, Math.max.apply(null, points.map(p => p[1])) + boxPad - minY].map(v => v.toFixed(0)).join(' ');
    const fullBox = svg.getAttribute('viewBox') || '0 0 800 560';
    const compactQuery = window.matchMedia ? window.matchMedia('(max-width: 560px)') : null;
    const syncViewBox = () => svg.setAttribute('viewBox', compactQuery && compactQuery.matches ? compactBox : fullBox);
    syncViewBox();
    if (compactQuery) {
      if (compactQuery.addEventListener) compactQuery.addEventListener('change', syncViewBox);
      else if (compactQuery.addListener) compactQuery.addListener(syncViewBox);
    }

    /* --- Focus / mise en évidence --- */
    const lightables = $$('[data-hub]', svg);
    const legendButtons = wrap ? $$('.topology-legend button[data-hub]', wrap) : [];
    let pinned = null;
    let current;
    const packets = [];

    const apply = id => {
      id = id || null;
      if (id === current) return;
      current = id;
      if (wrap) { if (id) wrap.dataset.focus = id; else delete wrap.dataset.focus; }
      lightables.forEach(node => {
        const on = Boolean(id) && node.getAttribute('data-hub') === id;
        node.classList.toggle('is-lit', on);
        node.classList.toggle('is-dim', Boolean(id) && !on);
      });
      core.classList.toggle('is-lit', Boolean(id));
      packets.forEach(packet => packet.node.classList.toggle('is-lit', Boolean(id) && packet.link.hub === id));
    };
    const syncPressed = () => {
      hubNodes.forEach(node => node.setAttribute('aria-pressed', String(node.dataset.hub === pinned)));
      legendButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.hub === pinned)));
    };
    const toggle = id => {
      pinned = pinned === id ? null : id;
      current = undefined;
      apply(pinned);
      syncPressed();
    };
    syncPressed();

    svg.addEventListener('pointerover', event => {
      if (event.pointerType !== 'mouse') return;
      const node = event.target.closest('.topo-node[data-hub]');
      if (node) apply(node.dataset.hub);
    });
    svg.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') apply(pinned); });
    svg.addEventListener('click', event => {
      const node = event.target.closest('.topo-node[data-hub]');
      if (node) toggle(node.dataset.hub);
    });
    svg.addEventListener('keydown', event => {
      const node = event.target.closest('.topo-node--hub');
      if (!node || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      toggle(node.dataset.hub);
    });
    svg.addEventListener('focusin', event => {
      const node = event.target.closest('.topo-node--hub');
      if (node) apply(node.dataset.hub);
    });
    svg.addEventListener('focusout', () => apply(pinned));
    legendButtons.forEach(button => {
      button.addEventListener('click', () => toggle(button.dataset.hub));
      button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') apply(button.dataset.hub); });
      button.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') apply(pinned); });
    });

    /* --- Paquets animés le long des liens --- */
    if (staticMode || !links.length) return;
    const spawn = packet => {
      const pool = current ? links.filter(link => link.hub === current) : links;
      packet.link = pick(pool.length ? pool : links);
      packet.t = 0;
      packet.forward = packet.link.isCore ? Math.random() < 0.5 : Math.random() < 0.75;
      packet.speed = rand(80, 140);
      packet.node.classList.toggle('is-lit', Boolean(current) && packet.link.hub === current);
    };
    for (let i = 0; i < 12; i++) {
      const packet = { node: svgEl('circle', { class: 'topo-packet', r: 2.6, fill: '#8bffc8', cx: -10, cy: -10 }, packetLayer) };
      spawn(packet);
      packet.t = Math.random();
      packets.push(packet);
    }
    let lastTime = 0;
    const step = time => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
      lastTime = time;
      packets.forEach(packet => {
        packet.t += (dt * packet.speed) / Math.max(packet.link.len, 1);
        if (packet.t >= 1) spawn(packet);
        const k = packet.forward ? packet.t : 1 - packet.t;
        const link = packet.link;
        packet.node.setAttribute('cx', f(lerp(link.x1, link.x2, k)));
        packet.node.setAttribute('cy', f(lerp(link.y1, link.y2, k)));
        packet.node.setAttribute('opacity', Math.sin(Math.PI * packet.t).toFixed(2));
      });
    };
    const setActive = on => {
      if (on) { lastTime = 0; animationLoop.add(step); } else animationLoop.remove(step);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => setActive(entries[entries.length - 1].isIntersecting), { threshold: 0.05 }).observe(svg);
    } else {
      setActive(true);
    }
  }

  /* =========================================================
     Timeline
     ========================================================= */
  function initTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    const items = $$('.timeline-item', timeline);
    const markers = items.map(item => $('.timeline-marker', item) || item);
    let lastProgress = -1;
    scrollScheduler.add({
      read({ vh }) {
        const line = vh * 0.62;
        const rect = timeline.getBoundingClientRect();
        return {
          progress: clamp((line - rect.top) / Math.max(rect.height, 1), 0, 1),
          active: markers.map(marker => {
            const r = marker.getBoundingClientRect();
            return r.top + r.height / 2 <= line;
          })
        };
      },
      write({ progress, active }) {
        if (Math.abs(progress - lastProgress) > 0.0005) {
          timeline.style.setProperty('--timeline-progress', progress.toFixed(4));
          lastProgress = progress;
        }
        items.forEach((item, i) => item.classList.toggle('is-active', active[i]));
      }
    });
  }

  /* =========================================================
     Dialogues (utilitaires communs)
     ========================================================= */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function isDialogOpen(dialog) { return Boolean(dialog && (dialog.open || dialog.hasAttribute('open'))); }
  function anyDialogOpen() { return Boolean(document.querySelector('dialog[open]')); }

  function showDialog(dialog) {
    if (isDialogOpen(dialog)) return;
    if (typeof dialog.showModal === 'function') {
      try { dialog.showModal(); return; } catch (e) { /* repli ci-dessous */ }
    }
    dialog.setAttribute('open', '');
  }

  function hideDialog(dialog) {
    if (!isDialogOpen(dialog)) return;
    if (typeof dialog.close === 'function') { dialog.close(); return; }
    dialog.removeAttribute('open');
    dialog.dispatchEvent(new Event('close'));
  }

  function afterDialogClose(opener) {
    if (anyDialogOpen()) return; // un autre dialogue a pris le relais
    body.classList.remove('modal-open');
    if (opener && document.contains(opener) && typeof opener.focus === 'function') {
      try { opener.focus({ preventScroll: true }); } catch (e) { opener.focus(); }
    }
  }

  function trapFocus(dialog) {
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        // Fermeture explicite (le "cancel" natif n'est pas garanti partout).
        event.preventDefault();
        hideDialog(dialog);
        return;
      }
      if (event.key !== 'Tab' || event.defaultPrevented) return;
      const focusable = $$(FOCUSABLE, dialog).filter(node => node.offsetParent !== null || node === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function closeOnBackdrop(dialog, contentSelector) {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const content = $(contentSelector, dialog);
      if (!content) { hideDialog(dialog); return; }
      const r = content.getBoundingClientRect();
      const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) hideDialog(dialog);
    });
  }

  /* =========================================================
     Modale de détails (projets & parcours)
     ========================================================= */
  function lookupEntry(key) {
    const k = String(key || '').trim().toLowerCase();
    if (!k) return null;
    if (P.projects && Object.prototype.hasOwnProperty.call(P.projects, k)) return { key: k, item: P.projects[k], folder: 'projets' };
    if (P.experiences && Object.prototype.hasOwnProperty.call(P.experiences, k)) return { key: k, item: P.experiences[k], folder: 'parcours' };
    return null;
  }

  function buildDetail(entry) {
    const item = entry.item;
    const e = escapeHTML;
    const list = values => (values || []).map(v => '<li>' + e(v) + '</li>').join('');
    let html = '';
    html += '<div class="modal-topbar" aria-hidden="true"><span class="dots"><i></i><i></i><i></i></span><span class="modal-file">secure://' + e(entry.folder) + '/' + e(entry.key) + '.log</span></div>';
    html += '<p class="modal-kicker modal-line">' + e(item.code) + ' · ' + e(item.category) + '</p>';
    html += '<h2 id="detailTitle" class="modal-title">' + e(item.title) + '</h2>';
    html += '<div class="modal-meta modal-line"><span class="chip">' + e(item.kind) + '</span><span class="chip">' + e(item.duration) + '</span></div>';
    if (item.role) html += '<p class="modal-role modal-line"><strong>Rôle :</strong> ' + e(item.role) + '</p>';
    if (item.description) html += '<p class="modal-desc modal-line">' + e(item.description) + '</p>';
    if (item.objectives && item.objectives.length) html += '<h3 class="modal-line">Objectifs</h3><ul class="modal-list modal-line">' + list(item.objectives) + '</ul>';
    if (item.tech && item.tech.length) html += '<h3 class="modal-line">Technologies</h3><div class="modal-tech modal-line">' + item.tech.map(t => '<span>' + e(t) + '</span>').join('') + '</div>';
    if (item.challenges || item.learnings) {
      html += '<div class="modal-cols modal-line">';
      if (item.challenges) html += '<div><h3>Défis &amp; solutions</h3><p>' + e(item.challenges) + '</p></div>';
      if (item.learnings) html += '<div><h3>Apprentissages</h3><p>' + e(item.learnings) + '</p></div>';
      html += '</div>';
    }
    if (item.results && item.results.length) html += '<h3 class="modal-line">Résultats</h3><ul class="modal-list modal-line">' + list(item.results) + '</ul>';
    if (item.link && /^https?:\/\//i.test(item.link)) {
      const label = /github\.com\/[^/]+\/[^/]+/i.test(item.link) ? 'Voir le dépôt GitHub ↗' : /github/i.test(item.link) ? 'Voir le profil GitHub ↗' : 'Voir sur LinkedIn ↗';
      html += '<a class="modal-link modal-line" href="' + e(item.link) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    }
    return html;
  }

  function initDetailModal() {
    const dialog = document.getElementById('detailDialog');
    const container = document.getElementById('detailBody');
    const closeButton = document.getElementById('detailClose');
    if (!dialog || !container) return;
    let opener = null;
    let timers = [];

    const open = (key, trigger) => {
      const entry = lookupEntry(key);
      if (!entry) return false;
      timers.forEach(clearTimeout);
      timers = [];
      if (!isDialogOpen(dialog)) opener = trigger || document.activeElement;
      container.innerHTML = buildDetail(entry);
      showDialog(dialog);
      body.classList.add('modal-open');
      const content = $('.modal-content', dialog);
      if (content) content.scrollTop = 0;
      dialog.scrollTop = 0;
      const lines = $$('.modal-line', container);
      if (staticMode) lines.forEach(line => line.classList.add('is-in'));
      else lines.forEach((line, i) => timers.push(setTimeout(() => line.classList.add('is-in'), 80 + i * 55)));
      scramble(document.getElementById('detailTitle'), { duration: 650 });
      if (closeButton) closeButton.focus();
      return true;
    };
    api.openDetail = open;

    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-open]');
      if (trigger) {
        if (open(trigger.getAttribute('data-open'), trigger)) event.preventDefault();
        return;
      }
      // Carte projet : clic n'importe où (le bouton interne reste le seul élément focusable).
      const card = event.target.closest('.project-card');
      if (!card || event.target.closest('a, button, input, textarea')) return;
      const selection = window.getSelection ? String(window.getSelection()) : '';
      if (selection) return;
      const inner = $('[data-open]', card);
      if (inner) open(inner.getAttribute('data-open'), inner);
    });

    if (closeButton) closeButton.addEventListener('click', () => hideDialog(dialog));
    closeOnBackdrop(dialog, '.modal-content');
    trapFocus(dialog);
    dialog.addEventListener('close', () => {
      timers.forEach(clearTimeout);
      timers = [];
      afterDialogClose(opener);
      opener = null;
    });
  }

  /* =========================================================
     Terminal interactif
     ========================================================= */
  const BANNER = [
    ' ___ ___ ',
    '| _ \\ _ \\',
    '|   /  _/',
    '|_|_\\_|  '
  ].join('\n');

  const NEOFETCH_LOGO = [
    '██████╗ ██████╗ ',
    '██╔══██╗██╔══██╗',
    '██████╔╝██████╔╝',
    '██╔══██╗██╔═══╝ ',
    '██║  ██║██║     ',
    '╚═╝  ╚═╝╚═╝     ',
    '  NETWORK · OPS '
  ].join('\n');

  function formatUptime(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h) return h + ' h ' + m + ' min';
    if (m) return m + ' min ' + sec + ' s';
    return sec + ' s';
  }

  function initTerminal() {
    const dialog = document.getElementById('terminal');
    const output = document.getElementById('termOutput');
    const form = document.getElementById('termForm');
    const input = document.getElementById('termInput');
    const closeButton = document.getElementById('termClose');
    if (!dialog || !output || !form || !input) return;

    const history = [];
    let historyIndex = 0;
    let greeted = false;
    let opener = null;
    let timers = [];

    /* --- Sortie --- */
    // Espaces significatifs (colonnes alignées par padEnd).
    output.style.whiteSpace = 'pre-wrap';
    output.style.overflowWrap = 'anywhere';
    const scrollDown = () => { output.scrollTop = output.scrollHeight; };
    const print = (content, cls) => {
      const row = el('div', 't-line' + (cls ? ' ' + cls : ''));
      if (content instanceof Node) row.appendChild(content);
      else row.textContent = content == null ? '' : String(content);
      output.appendChild(row);
      scrollDown();
      return row;
    };
    const frag = parts => {
      const f = document.createDocumentFragment();
      parts.forEach(part => {
        if (part == null) return;
        f.appendChild(part instanceof Node ? part : document.createTextNode(String(part)));
      });
      return f;
    };
    const span = (cls, text) => el('span', cls, text);
    const link = (href, text) => {
      const a = el('a', 't-link', text || href);
      a.href = href;
      if (/^https?:/i.test(href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      return a;
    };
    const kv = (key, value, cls) => print(frag([span('t-info', key.padEnd(12)), value instanceof Node ? value : span(cls || '', value)]));
    const pre = text => {
      const block = el('pre', 't-pre', text);
      output.appendChild(block);
      scrollDown();
      return block;
    };
    const later = (fn, ms) => { const id = setTimeout(() => { timers = timers.filter(t => t !== id); fn(); }, ms); timers.push(id); };
    const echoCommand = raw => print(frag([span('t-user', 'rp@portfolio'), ':', span('t-path', '~'), '$ ', raw]), 't-cmd');

    const banner = () => {
      pre(BANNER);
      print('RP-OS v3.0 — terminal interactif de ' + (ID.name || 'Raphaël Pascaud'), 't-info');
      print(frag(['Tapez ', span('t-ok', 'help'), ' pour la liste des commandes. ', span('t-muted', 'Tab complète, ↑/↓ parcourent l\'historique.')]));
      print(' ');
    };

    /* --- Données --- */
    const projects = P.projects || {};
    const experiences = P.experiences || {};
    const openKeys = Object.keys(projects).concat(Object.keys(experiences));
    const skillGroups = P.skills || {};
    const certs = Array.isArray(P.certifications) ? P.certifications : [];

    const openExternal = (url, label) => {
      if (!url) { print('lien indisponible.', 't-err'); return; }
      print(frag(['ouverture de ', link(url, label || url), ' …']), 't-ok');
      const win = window.open(url, '_blank', 'noopener');
      if (!win) print('fenêtre bloquée par le navigateur — utilisez le lien ci-dessus.', 't-warn');
    };

    const fakeIp = host => {
      let h = 0;
      for (let i = 0; i < host.length; i++) h = (h * 31 + host.charCodeAt(i)) >>> 0;
      if (/^(localhost|127\.)/.test(host)) return '127.0.0.1';
      return [(h >>> 24) % 223 + 1, (h >>> 16) & 255, (h >>> 8) & 255, (h & 253) + 1].join('.');
    };

    /* --- Commandes --- */
    const commands = {
      help: {
        desc: 'affiche cette aide',
        run() {
          print('Commandes disponibles :', 't-info');
          Object.keys(commands).forEach(name => {
            const cmd = commands[name];
            if (cmd.hidden) return;
            print(frag([span('t-ok', (name + (cmd.usage ? ' ' + cmd.usage : '')).padEnd(16)), span('t-muted', cmd.desc)]));
          });
        }
      },
      whoami: {
        desc: 'identité de l\'opérateur',
        run() {
          print((ID.handle || 'rp') + ' — ' + (ID.name || 'Raphaël Pascaud'), 't-ok');
          print((ID.title || '') + (ID.company ? ' @ ' + ID.company : ''));
        }
      },
      about: {
        desc: 'profil complet',
        run() {
          print('SYS_PROFILE', 't-info');
          kv('Nom', ID.name);
          kv('Rôle', ID.title);
          kv('Formation', ID.school);
          kv('Entreprise', ID.company);
          kv('Lieu', ID.location);
          kv('Langues', (ID.languages || []).join(' · '));
          if (Array.isArray(P.interests) && P.interests.length) kv('Hors ligne', P.interests.join(' · '));
        }
      },
      skills: {
        desc: 'compétences par domaine',
        run() {
          Object.keys(skillGroups).forEach(group => {
            print('[' + group + ']', 't-info');
            (skillGroups[group] || []).forEach(skill => print('  · ' + skill));
          });
        }
      },
      experience: {
        desc: 'parcours pro & formation',
        run() {
          Object.keys(experiences).forEach(key => {
            const x = experiences[key];
            print(frag([span('t-ok', key.padEnd(14)), x.title + ' ', span('t-muted', '— ' + x.duration)]));
          });
          print('→ open <clé> pour ouvrir un dossier', 't-muted');
        }
      },
      projects: {
        desc: 'projets SAE',
        run() {
          Object.keys(projects).forEach(key => {
            const x = projects[key];
            print(frag([span('t-ok', key.padEnd(10)), span('t-info', x.code + ' '), x.title]));
          });
          print('→ open <clé> pour ouvrir un dossier (ex. open sae304)', 't-muted');
        }
      },
      open: {
        usage: '<clé>',
        desc: 'ouvre un dossier (ex. open sae304)',
        run(args) {
          const key = (args[0] || '').toLowerCase();
          if (!key) {
            print('usage : open <clé>', 't-warn');
            print('clés : ' + openKeys.join(', '), 't-muted');
            return;
          }
          const entry = lookupEntry(key);
          if (!entry) {
            print('open : dossier introuvable : ' + key, 't-err');
            print('clés : ' + openKeys.join(', '), 't-muted');
            return;
          }
          print('déchiffrement de secure://' + entry.folder + '/' + entry.key + '.log … [OK]', 't-ok');
          later(() => {
            const returnTo = opener;
            opener = null;
            hideDialog(dialog);
            api.openDetail(entry.key, returnTo);
          }, 380);
        }
      },
      certs: {
        desc: 'certifications',
        run() {
          certs.forEach(cert => {
            const pending = /cours/i.test(cert.status);
            print(frag([(cert.name || '').padEnd(16), span(pending ? 't-warn' : 't-ok', '[' + cert.status + ']')]));
          });
        }
      },
      contact: {
        desc: 'coordonnées',
        run() {
          if (ID.email) kv('Email', link('mailto:' + ID.email, ID.email));
          if (ID.phone) kv('Téléphone', link('tel:' + ID.phone.replace(/\s+/g, ''), ID.phone));
          if (ID.location) kv('Lieu', ID.location);
          if (ID.github) kv('GitHub', link(ID.github));
          if (ID.linkedin) kv('LinkedIn', link(ID.linkedin));
        }
      },
      cv: {
        desc: 'télécharge le CV (PDF)',
        run() {
          const file = ID.cv || 'cv-raphael-pascaud.pdf';
          const a = document.createElement('a');
          a.href = file;
          a.download = file.split('/').pop();
          a.rel = 'noopener';
          body.appendChild(a);
          a.click();
          a.remove();
          print('téléchargement de ' + a.download + ' … [OK]', 't-ok');
        }
      },
      github: { desc: 'ouvre le profil GitHub', run() { openExternal(ID.github, 'GitHub'); } },
      linkedin: { desc: 'ouvre le profil LinkedIn', run() { openExternal(ID.linkedin, 'LinkedIn'); } },
      ping: {
        usage: '<hôte>',
        desc: 'test de connectivité',
        run(args) {
          const host = (args[0] || '').slice(0, 64);
          if (!host) { print('usage : ping <hôte>   (ex. ping renault-finance.local)', 't-warn'); return; }
          const ip = fakeIp(host.toLowerCase());
          print('PING ' + host + ' (' + ip + ') 56(84) octets de données.', 't-info');
          const times = [];
          for (let i = 1; i <= 4; i++) {
            later(() => {
              const ms = rand(4, 38);
              times.push(ms);
              print('64 octets de ' + ip + ' : icmp_seq=' + i + ' ttl=' + (ip === '127.0.0.1' ? 64 : 57) + ' temps=' + ms.toFixed(1) + ' ms');
            }, i * 420);
          }
          later(() => {
            const min = Math.min.apply(null, times);
            const max = Math.max.apply(null, times);
            const avg = times.reduce((s, v) => s + v, 0) / (times.length || 1);
            print('--- statistiques ping ' + host + ' ---', 't-muted');
            print('4 paquets transmis, 4 reçus, 0 % de perte', 't-ok');
            print('rtt min/moy/max = ' + min.toFixed(1) + '/' + avg.toFixed(1) + '/' + max.toFixed(1) + ' ms', 't-muted');
          }, 5 * 420);
        }
      },
      neofetch: {
        desc: 'informations système',
        run() {
          const wrapNode = el('div', 't-neofetch');
          wrapNode.style.cssText = 'display:flex;flex-wrap:wrap;gap:.4rem 1.6rem;align-items:flex-start;margin:.35rem 0;';
          const logo = el('pre', 't-pre t-ok', NEOFETCH_LOGO);
          logo.style.margin = '0';
          const info = el('div', 't-neofetch-info');
          const add = (key, value) => {
            const row = el('div', 't-line');
            row.appendChild(span('t-info', key + ': '));
            row.appendChild(document.createTextNode(value));
            info.appendChild(row);
          };
          const head = el('div', 't-line t-ok', 'rp@portfolio');
          info.appendChild(head);
          info.appendChild(el('div', 't-line t-muted', '------------'));
          const skillCount = Object.keys(skillGroups).reduce((n, k) => n + (skillGroups[k] || []).length, 0);
          const acquired = certs.filter(c => /acquis/i.test(c.status)).length;
          add('OS', 'RP-OS v3.0 x86_64');
          add('Host', 'portfolio');
          add('Rôle', ID.title || '');
          add('Formation', ID.school || '');
          add('Entreprise', ID.company || '');
          add('Shell', 'bash-fr 5.2');
          add('Skills', skillCount + ' compétences · ' + Object.keys(skillGroups).length + ' domaines');
          add('Certs', acquired + ' acquises / ' + certs.length + ' (' + certs.map(c => c.name).join(', ') + ')');
          add('Uptime', formatUptime(Date.now() - pageStart));
          add('Langues', (ID.languages || []).map(l => l.replace(/\s*\(.*\)$/, '')).join(', '));
          const palette = el('div', 't-line');
          ['#02060c', '#ff003c', '#27e58a', '#ffc857', '#0066ff', '#00f3ff', '#8bffc8', '#eafcff'].forEach(color => {
            const swatch = el('span', 't-swatch');
            swatch.setAttribute('aria-hidden', 'true');
            swatch.style.cssText = 'display:inline-block;width:1.4em;height:.9em;margin-right:2px;background:' + color + ';';
            palette.appendChild(swatch);
          });
          info.appendChild(palette);
          wrapNode.appendChild(logo);
          wrapNode.appendChild(info);
          output.appendChild(wrapNode);
          scrollDown();
        }
      },
      date: {
        desc: 'date et heure',
        run() {
          let text;
          try { text = new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' }); } catch (e) { text = new Date().toLocaleString('fr-FR'); }
          print(text);
        }
      },
      echo: { usage: '<texte>', desc: 'affiche le texte', run(args, rest) { print(rest); } },
      history: {
        desc: 'historique des commandes',
        run() {
          if (!history.length) { print('(historique vide)', 't-muted'); return; }
          history.forEach((cmd, i) => print(frag([span('t-muted', String(i + 1).padStart(4) + '  '), cmd])));
        }
      },
      clear: {
        desc: 'efface l\'écran',
        run() {
          timers.forEach(clearTimeout);
          timers = [];
          output.textContent = '';
        }
      },
      matrix: {
        desc: 'suivez le lapin blanc',
        run() {
          print('Wake up, Neo…', 't-ok');
          later(() => { hideDialog(dialog); api.runMatrix(); }, 500);
        }
      },
      sudo: {
        hidden: true,
        desc: '',
        run() {
          print('[sudo] mot de passe pour visiteur : ********', 't-muted');
          print('Permission refusée : cet incident sera signalé à l\'administrateur réseau.', 't-err');
          print('(indice : l\'administrateur réseau, c\'est moi.)', 't-muted');
        }
      },
      exit: { desc: 'ferme le terminal', run() { hideDialog(dialog); } }
    };
    const commandNames = Object.keys(commands);

    const execute = raw => {
      const line = raw.trim();
      echoCommand(raw);
      if (!line) return;
      if (history[history.length - 1] !== line) history.push(line);
      if (history.length > 100) history.shift();
      historyIndex = history.length;
      const parts = line.split(/\s+/);
      const name = parts[0].toLowerCase();
      const rest = line.slice(parts[0].length).trim();
      const cmd = Object.prototype.hasOwnProperty.call(commands, name) ? commands[name] : null;
      if (!cmd) {
        print('commande introuvable: ' + parts[0].slice(0, 40) + ' — tapez \'help\'', 't-err');
        return;
      }
      try { cmd.run(parts.slice(1), rest); } catch (err) { print('erreur interne : ' + (err && err.message ? err.message : err), 't-err'); }
    };

    /* --- Complétion --- */
    const commonPrefix = words => words.reduce((prefix, word) => {
      let i = 0;
      while (i < prefix.length && i < word.length && prefix[i] === word[i]) i++;
      return prefix.slice(0, i);
    });
    const complete = () => {
      const value = input.value.replace(/^\s+/, '');
      let candidates = [];
      let base = '';
      const openMatch = value.match(/^open\s+(\S*)$/i);
      if (openMatch) {
        base = 'open ';
        candidates = openKeys.filter(k => k.startsWith(openMatch[1].toLowerCase()));
      } else if (!/\s/.test(value)) {
        candidates = commandNames.filter(n => n.startsWith(value.toLowerCase()));
      }
      if (!candidates.length) return;
      if (candidates.length === 1) {
        const needsArg = !base && commands[candidates[0]] && commands[candidates[0]].usage;
        input.value = base + candidates[0] + (needsArg ? ' ' : '');
      } else {
        input.value = base + commonPrefix(candidates);
        echoCommand(value);
        print(candidates.join('   '), 't-muted');
      }
    };

    /* --- Ouverture / fermeture --- */
    const openTerminal = trigger => {
      if (isDialogOpen(dialog)) { input.focus(); return; }
      opener = trigger || document.activeElement;
      showDialog(dialog);
      body.classList.add('modal-open');
      if (!greeted) { greeted = true; banner(); }
      scrollDown();
      input.focus();
      requestAnimationFrame(() => input.focus());
    };
    api.openTerminal = openTerminal;
    api.closeTerminal = () => hideDialog(dialog);

    dialog.addEventListener('close', () => {
      afterDialogClose(opener);
      opener = null;
    });
    if (closeButton) closeButton.addEventListener('click', () => hideDialog(dialog));
    closeOnBackdrop(dialog, '.terminal-window');
    trapFocus(dialog);

    const toggleButton = document.getElementById('termToggle');
    if (toggleButton) toggleButton.addEventListener('click', () => openTerminal(toggleButton));
    $$('[data-action="terminal"]').forEach(button => button.addEventListener('click', () => openTerminal(button)));

    form.addEventListener('submit', event => {
      event.preventDefault();
      const value = input.value;
      input.value = '';
      execute(value);
    });

    input.addEventListener('keydown', event => {
      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        complete();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) historyIndex--;
        if (history[historyIndex] != null) input.value = history[historyIndex];
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      } else if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
        event.preventDefault();
        commands.clear.run();
      } else if (event.ctrlKey && (event.key === 'c' || event.key === 'C') && input.selectionStart === input.selectionEnd) {
        // Sans sélection, Ctrl+C interrompt (comme un vrai shell) au lieu de copier.
        timers.forEach(clearTimeout);
        timers = [];
        echoCommand(input.value + '^C');
        input.value = '';
      }
    });

    output.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      if (window.getSelection && String(window.getSelection())) return;
      input.focus();
    });
  }

  /* =========================================================
     Raccourcis clavier globaux + Konami
     ========================================================= */
  function initShortcuts() {
    const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let konamiIndex = 0;
    const terminal = document.getElementById('terminal');
    const detail = document.getElementById('detailDialog');

    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || event.rpBootSkip) return;
      const key = (event.key || '').toLowerCase();
      const inTerminal = terminal && terminal.contains(event.target);
      const typing = isTypingTarget(event.target);

      // Terminal : ` (ou ² sur AZERTY) et Ctrl/Cmd+K.
      const isCtrlK = (event.ctrlKey || event.metaKey) && key === 'k' && !event.altKey;
      const isTick = (event.key === '`' || event.key === '²') && !event.ctrlKey && !event.metaKey && !event.altKey;
      if (isCtrlK || isTick) {
        if (isDialogOpen(terminal)) {
          if (isCtrlK && inTerminal) { event.preventDefault(); api.closeTerminal(); }
          return;
        }
        if (typing || isDialogOpen(detail) || !bootState.done) return;
        event.preventDefault();
        api.openTerminal(document.activeElement);
        return;
      }

      if (typing || event.ctrlKey || event.metaKey || event.altKey) { konamiIndex = 0; return; }
      if (key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          api.runMatrix();
        }
      } else {
        konamiIndex = key === KONAMI[0] ? 1 : 0;
      }
    });
  }

  /* =========================================================
     Pluie matricielle
     ========================================================= */
  function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01010101ABCDEF0123456789';
    const DURATION = 6000;
    const state = { running: false, until: 0, stopAt: 0, drops: [], last: 0, width: 0, height: 0 };
    let ctx = null;

    const resize = () => {
      state.width = canvas.width = window.innerWidth;
      state.height = canvas.height = window.innerHeight;
      const columns = Math.ceil(state.width / 16);
      state.drops = Array.from({ length: columns }, (_, i) => state.drops[i] != null ? state.drops[i] : -Math.floor(Math.random() * 40));
      ctx.font = '15px "JetBrains Mono", monospace';
    };

    const stop = () => {
      state.running = false;
      animationLoop.remove(draw);
      window.removeEventListener('resize', resize);
      if (ctx) ctx.clearRect(0, 0, state.width, state.height);
      state.drops = [];
    };

    function draw(time) {
      if (time >= state.stopAt) { stop(); return; }
      if (time >= state.until) body.classList.remove('matrix-mode');
      if (time - state.last < 45) return;
      state.last = time;
      ctx.fillStyle = 'rgba(2, 6, 12, 0.11)';
      ctx.fillRect(0, 0, state.width, state.height);
      for (let i = 0; i < state.drops.length; i++) {
        const y = state.drops[i] * 16;
        if (y > 0) {
          const r = Math.random();
          ctx.fillStyle = r > 0.95 ? '#eafcff' : (i % 3 === 0 ? '#00f3ff' : '#8bffc8');
          ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * 16, y);
        }
        if (y > state.height && Math.random() > 0.972) state.drops[i] = 0;
        state.drops[i]++;
      }
    }

    api.runMatrix = () => {
      toast('ACCESS GRANTED — bienvenue dans la matrice');
      // Déclenchée volontairement (commande ou Konami) : on la joue même en mouvement réduit.
      if (!canvas || !canvas.getContext) return;
      ctx = ctx || canvas.getContext('2d');
      if (!ctx) return;
      const now = performance.now();
      state.until = now + DURATION;
      state.stopAt = state.until + 900; // laisse le temps au fondu CSS
      body.classList.add('matrix-mode');
      if (state.running) return;
      state.running = true;
      state.last = 0;
      resize();
      window.addEventListener('resize', resize);
      animationLoop.add(draw);
    };

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.running) {
        const now = performance.now();
        state.until = now;
        state.stopAt = now + 900;
      }
    });
  }

  /* =========================================================
     Copie de l'email, formulaire de contact, retour en haut
     ========================================================= */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
      body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      area.remove();
      if (ok) resolve(); else reject(new Error('copie refusée'));
    });
  }

  function initCopyEmail() {
    const button = document.getElementById('copyEmailBtn');
    if (!button) return;
    const status = $('.copy-status', button);
    const email = ID.email || ($('.copy-text', button) || button).textContent.trim();
    const initial = status ? status.textContent : '';
    let timer = 0;
    button.addEventListener('click', () => {
      copyText(email).then(() => {
        if (status) status.textContent = 'COPIÉ ✓';
        button.classList.add('is-copied');
        toast('Adresse email copiée dans le presse-papiers');
      }).catch(() => {
        if (status) status.textContent = 'ÉCHEC';
        toast('Copie impossible — adresse : ' + email);
      }).then(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (status) status.textContent = initial;
          button.classList.remove('is-copied');
        }, 2200);
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');
    if (!form) return;
    const fields = ['name', 'email', 'subject', 'message'].map(id => document.getElementById(id)).filter(Boolean);
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const say = (text, ok) => {
      if (!message) return;
      message.textContent = text;
      message.classList.toggle('is-error', !ok);
      message.classList.toggle('is-success', ok);
    };
    fields.forEach(field => field.addEventListener('input', () => field.removeAttribute('aria-invalid')));
    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = {};
      const invalid = [];
      fields.forEach(field => {
        values[field.id] = field.value.trim();
        const bad = !values[field.id] || (field.id === 'email' && !EMAIL_RE.test(values[field.id]));
        if (bad) { field.setAttribute('aria-invalid', 'true'); invalid.push(field); } else field.removeAttribute('aria-invalid');
      });
      if (invalid.length) {
        const emptyCount = fields.filter(field => !field.value.trim()).length;
        say(emptyCount ? 'Veuillez remplir tous les champs.' : 'Adresse email invalide.', false);
        invalid[0].focus();
        return;
      }
      const to = ID.email || 'raphaelpascaud.sco@gmail.com';
      const mailBody = 'Nom : ' + values.name + '\nEmail : ' + values.email + '\n\nMessage :\n' + values.message;
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(values.subject) + '&body=' + encodeURIComponent(mailBody);
      say('Paquet prêt — votre messagerie va s\'ouvrir avec le brouillon.', true);
    });
  }

  function initBackToTop() {
    $$('.back-to-top').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        if (window.history && window.history.replaceState) window.history.replaceState(null, '', location.pathname + location.search);
      });
    });
  }

  /* =========================================================
     Démarrage
     ========================================================= */
  function start() {
    // Le boot passe en premier et de façon défensive : il doit toujours se terminer.
    try { initBoot(); } catch (err) {
      dismissBootOverlay(document.getElementById('boot'));
      completeBoot();
      if (window.console) console.warn('[rp] boot :', err);
    }

    safe(initReveal, 'reveal');
    safe(initMobileMenu, 'menu');
    safe(initScrollInterface, 'scroll');
    safe(initHudClock, 'hud-clock');
    safe(initHudCoords, 'hud-coords');
    safe(initCursor, 'cursor');
    safe(initMagnetic, 'magnetic');
    safe(initCounters, 'counters');
    safe(initTypedRole, 'typed-role');
    safe(initTilt, 'tilt');
    safe(initHero3D, 'hero-3d');
    safe(initTopology, 'topology');
    safe(initTimeline, 'timeline');
    safe(initDetailModal, 'detail-modal');
    safe(initTerminal, 'terminal');
    safe(initMatrix, 'matrix');
    safe(initShortcuts, 'shortcuts');
    safe(initCopyEmail, 'copy-email');
    safe(initContactForm, 'contact-form');
    safe(initBackToTop, 'back-to-top');

    const requestScroll = () => scrollScheduler.request();
    window.addEventListener('scroll', requestScroll, { passive: true });
    window.addEventListener('resize', requestScroll, { passive: true });
    window.addEventListener('load', requestScroll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestScroll).catch(() => {});
    requestScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
