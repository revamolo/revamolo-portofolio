/**
 * REVA MOLO - EDITORIAL PORTFOLIO INTERACTION ENGINE
 * Handles video playback, ratio switching, modal dialogs, particle background, and touch interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initHeroVideo();
  initNavScroll();
  initMobileNav();
  initMotionShowcase();
  initCaseStudyModals();
  initEmailCopy();
  initScrollReveals();
  initBackToTop();
});

/* ==========================================================================
   PARTICLE BACKGROUND (Deterministic floating dust matching Background.tsx)
   ========================================================================== */
function initParticleCanvas() {
  const container = document.getElementById('bgCanvasContainer');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 28;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + (i % 3) * 1.2,
      speedY: 0.25 + (i % 5) * 0.15,
      speedX: ((i % 3) - 1) * 0.1,
      color: i % 2 === 0 ? '#34D399' : '#A7F3D0',
      alpha: 0.2 + (Math.random() * 0.4),
      pulseSpeed: 0.02 + Math.random() * 0.02,
      pulse: Math.random() * Math.PI,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.speedY;
      p.x += Math.sin(p.pulse) * 0.4;
      p.pulse += p.pulseSpeed;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   HERO VIDEO AUTOPLAY & AUDIO TOGGLE
   ========================================================================== */
function initHeroVideo() {
  const heroVideo = document.getElementById('heroVideo');
  const audioToggleBtn = document.getElementById('heroAudioToggle');
  const audioText = document.getElementById('heroAudioText');
  const audioIcon = document.getElementById('heroAudioIcon');

  if (!heroVideo) return;

  // Ensure attributes for reliable instant autoplay on iOS / Safari / Android
  heroVideo.muted = true;
  heroVideo.playsInline = true;
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('webkit-playsinline', '');

  const tryPlay = () => {
    heroVideo.play().catch(() => {
      // Browser autoplay policy might need user gesture
      const resumeOnGesture = () => {
        heroVideo.play();
        window.removeEventListener('touchstart', resumeOnGesture);
        window.removeEventListener('click', resumeOnGesture);
      };
      window.addEventListener('touchstart', resumeOnGesture, { once: true });
      window.addEventListener('click', resumeOnGesture, { once: true });
    });
  };

  tryPlay();

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        if (audioText) audioText.textContent = 'Audio: On';
        if (audioIcon) {
          audioIcon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          `;
        }
      } else {
        heroVideo.muted = true;
        if (audioText) audioText.textContent = 'Audio: Muted';
        if (audioIcon) {
          audioIcon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          `;
        }
      }
    });
  }
}

/* ==========================================================================
   NAV SCROLL & ACTIVE STYLES
   ========================================================================== */
function initNavScroll() {
  const siteNav = document.getElementById('siteNav');
  if (!siteNav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
    }
  });

  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   SECTION 4: INTERACTIVE MOTION SHOWCASE
   ========================================================================== */
function initMotionShowcase() {
  const showcaseVideo = document.getElementById('showcaseVideo');
  const stage = document.getElementById('showcaseStage');
  const tabs = document.querySelectorAll('.ratio-tab');
  const playBtn = document.getElementById('btnShowcasePlay');
  const muteBtn = document.getElementById('btnShowcaseMute');
  const statusText = document.getElementById('showcaseStatusText');

  if (!showcaseVideo || !stage) return;

  const sources = {
    header: {
      src: 'out/portofolio-revamolo-test1(header).mp4',
      poster: 'out/header-scene1.png',
      aspectClass: 'aspect-header',
      label: '3.2:1 Ultra-Wide Banner',
    },
    landscape: {
      src: 'out/portofolio-revamolo-test1(landscape).mp4',
      poster: 'out/land-scene1.png',
      aspectClass: 'aspect-landscape',
      label: '16:9 Landscape Video',
    },
    vertical: {
      src: 'out/portofolio-revamolo-test1(portrait).mp4',
      poster: 'out/curr-vert-scene1.png',
      aspectClass: 'aspect-vertical',
      label: '9:16 Vertical Reel',
    },
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;
      const config = sources[mode];
      if (!config) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update video stage aspect ratio class
      stage.classList.remove('aspect-header', 'aspect-landscape', 'aspect-vertical');
      stage.classList.add(config.aspectClass);

      // Swap video source smoothly
      showcaseVideo.pause();
      showcaseVideo.src = config.src;
      showcaseVideo.poster = config.poster;
      showcaseVideo.load();
      showcaseVideo.play().catch(() => {});

      if (statusText) {
        statusText.textContent = config.label;
      }
      updatePlayBtn(true);
    });
  });

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (showcaseVideo.paused) {
        showcaseVideo.play();
        updatePlayBtn(true);
      } else {
        showcaseVideo.pause();
        updatePlayBtn(false);
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      showcaseVideo.muted = !showcaseVideo.muted;
      updateMuteBtn(!showcaseVideo.muted);
    });
  }

  function updatePlayBtn(isPlaying) {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  }

  function updateMuteBtn(isUnmuted) {
    if (!muteBtn) return;
    muteBtn.innerHTML = isUnmuted
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  }
}

/* ==========================================================================
   CASE STUDY MODAL DIALOGS
   ========================================================================== */
function initCaseStudyModals() {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('btnModalClose');
  const triggerBtns = document.querySelectorAll('[data-case-study]');

  if (!modalBackdrop) return;

  const caseData = {
    vaxnet: {
      badge: 'Case Study 01 // VaxNet',
      title: 'VaxNet — Healthcare Tech Campaign',
      role: 'Strategic Planning & Content Development Intern',
      image: 'out/header-scene3.png',
      summary: 'Perencanaan kampanye digital terpadu, pembuatan konten visual edukatif, dan perumusan strategi distribusi multi-platform untuk meningkatkan pemahaman dan adopsi teknologi kesehatan oleh masyarakat luas.',
      approach: 'Mengkombinasikan riset persepsi pengguna dan demistifikasi istilah medis kompleks menjadi infografis visual terstruktur, narasi persuasif, dan kampanye media sosial multi-fase.',
      deliverables: [
        'Roadmap strategi komunikasi dan kalender editorial kampanye kesehatan digital',
        'Desain visual infografis dan format carousel konten edukatif yang informatif',
        'Analisis metrik respon audiens dan evaluasi tingkat literasi pesan',
      ],
    },
    inamed: {
      badge: 'Case Study 02 // INAMED',
      title: 'INAMED — Medical Communications',
      role: 'Strategic Planning & Content Development Intern',
      image: 'out/header-scene3.png',
      summary: 'Perancangan konten terstruktur, arsitektur landing page informasi kesehatan, dan standardisasi komunikasi publik bagi audiens klinis, profesional medis, dan masyarakat umum.',
      approach: 'Menyusun sistem arsitektur informasi digital yang mengedepankan kredibilitas saintifik tanpa mengorbankan keterbacaan (readability) bagi pasien dan keluarga.',
      deliverables: [
        'Perancangan struktur landing page edukasi medis dengan hirarki visual jelas',
        'Buku panduan editorial (tone of voice) untuk publikasi multi-kanal',
        'Materi presentasi stakeholder dan modul komunikasi digital terpadu',
      ],
    },
    halalcare: {
      badge: 'Case Study 03 // HalalCare',
      title: 'HalalCare — Community Growth & Social Impact',
      role: 'Strategic Planning & Content Development Intern',
      image: 'out/header-scene3.png',
      summary: 'Edukasi regulasi jaminan produk halal melalui format konten digital mikro yang mudah dicerna, mendorong literasi sertifikasi dan memperkuat kepercayaan konsumen komunitas.',
      approach: 'Menggunakan pendekatan sosiologis untuk membedah keresahan konsumen seputar regulasi halal baru, kemudian merumuskan konten tanya-jawab interaktif dan micro-storytelling.',
      deliverables: [
        'Serial konten infografis regulasi produk halal berfokus pada FAQ esensial',
        'Kampanye engagement komunitas yang meningkatkan partisipasi interaktif audiens',
        'Arsip materi digital ramah sentuhan (touch-friendly) untuk diseminasi cepat via chat & media sosial',
      ],
    },
  };

  function openModal(studyKey) {
    const data = caseData[studyKey];
    if (!data) return;

    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalSummary').textContent = data.summary;
    document.getElementById('modalApproach').textContent = data.approach;

    const listEl = document.getElementById('modalDeliverables');
    listEl.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listEl.appendChild(li);
    });

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.caseStudy;
      openModal(key);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   EMAIL COPY TO CLIPBOARD
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('btnCopyEmail');
  const toast = document.getElementById('copyToast');
  const emailText = 'revahayi@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(emailText).then(() => {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = emailText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('btnBackToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
