// script.js — interatividade básica
document.addEventListener('DOMContentLoaded', () => {
    // ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // chips de skill: filtro simples
    const chips = document.querySelectorAll('.chip');
    const skills = document.querySelectorAll('.skill');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(cc => cc.classList.remove('active'));
      c.classList.add('active');
      const type = c.dataset.skill;
      skills.forEach(s => {
        if (type === 'all') { s.style.display = 'block'; return; }
        s.style.display = s.dataset.type === type ? 'block' : 'none';
      });
    }));
    // ativar "Tudo" inicialmente
    document.querySelector('.chip[data-skill="all"]').classList.add('active');
  
    // Modal de projetos
    const openBtns = document.querySelectorAll('.open-project');
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalClose2 = document.getElementById('modalClose2');
    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      const t = btn.dataset.title || 'Projeto';
      const d = btn.dataset.desc || '';
      modalTitle.textContent = t;
      modalDesc.textContent = d;
      modal.setAttribute('aria-hidden','false');
    }));
    modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
    modalClose2.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) modal.setAttribute('aria-hidden','true');
    });
  
    // Smooth scroll para nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });
  
    // Formulário de contato (demo)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // simples feedback visual (substitua por fetch/send)
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Enviado';
        btn.disabled = false;
        form.reset();
        setTimeout(() => btn.textContent = 'Enviar', 1500);
      }, 900);
    });
  
    // Botão baixar CV (exemplo)
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
      // link de exemplo — substitua pelo seu CV real
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'CV-SeuNome.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  
    // CTA contato
    document.getElementById('contactCTA').addEventListener('click', () => {
      document.querySelector('#contato').scrollIntoView({behavior:'smooth'});
    });
  });
  