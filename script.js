document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('show');
  });

  const chips = Array.from(document.querySelectorAll('.chip'));
  const skills = Array.from(document.querySelectorAll('.skill'));
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.dataset.skill;
      skills.forEach(s => {
        if (key === 'all' || s.dataset.type === key) {
          s.style.display = '';
          s.style.opacity = '0';
          requestAnimationFrame(() => s.style.opacity = '1');
        } else {
          s.style.opacity = '0';
          setTimeout(()=> s.style.display = 'none', 180);
        }
      });
    });
  });

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalRepo = document.getElementById('modalRepo');
  const openBtns = Array.from(document.querySelectorAll('.open-project'));
  const closeModal = () => { modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  const openModal = (title, desc) => {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalRepo.href = '#';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  openBtns.forEach(b => b.addEventListener('click', (e) => {
    const t = e.currentTarget.dataset.title || 'Projeto';
    const d = e.currentTarget.dataset.desc || '';
    openModal(t, d);
  }));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalClose2').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  internalLinks.forEach(a => a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
      siteNav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }));

  const revealElements = document.querySelectorAll('.section, .project-card, .skill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });

  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(contactForm);
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const old = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviado ✓';
      contactForm.reset();
      setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1500);
    }, 900);
  });

  
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const PARTICLE_COUNT = Math.max(24, Math.floor((w*h)/90000));
  function rand(min, max){ return Math.random()*(max-min)+min; }
  function initParticles(){
    particles.length = 0;
    for(let i=0;i<PARTICLE_COUNT;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.6,2.4),
        vx: rand(-0.2,0.2),
        vy: rand(-0.2,0.2),
        alpha: rand(0.08,0.22)
      });
    }
  }
  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    initParticles();
  }
  addEventListener('resize', resize);
  initParticles();
  function step(){
    ctx.clearRect(0,0,w,h);
    
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, 'rgba(2,6,15,0.0)');
    g.addColorStop(1, 'rgba(2,6,15,0.2)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(167,235,242,'+p.alpha+')';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    // particles
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist<110){
          ctx.strokeStyle = 'rgba(84,172,191,'+ (0.06 - dist/2200) +')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const total = 60;

for (let i = 0; i < total; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "#00eaff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < total; i++) {
    for (let j = i + 1; j < total; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(0,255,255," + (1 - dist / 120) + ")";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(render);
}
render();

