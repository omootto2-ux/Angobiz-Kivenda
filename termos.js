/* ============================================================
   ANGOBIZ KIVENDA – TERMOS DE USO
   Ficheiro: script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. MENU HAMBURGER (mobile)
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navBtns   = document.querySelector('.nav-buttons');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const aberto = navLinks.classList.toggle('aberto');
      navBtns.classList.toggle('aberto', aberto);
      hamburger.innerHTML = aberto
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  /* ----------------------------------------------------------
     2. DESTACAR ITEM ATIVO NO ÍNDICE (scroll spy)
  ---------------------------------------------------------- */
  const secoes  = document.querySelectorAll('.termo-secao');
  const linksIdx = document.querySelectorAll('.indice ul li a');

  function atualizarAtivo () {
    let atual = '';

    secoes.forEach(function (sec) {
      const topo = sec.getBoundingClientRect().top;
      if (topo <= 120) {
        atual = sec.getAttribute('id');
      }
    });

    linksIdx.forEach(function (link) {
      link.classList.remove('ativo');
      if (link.getAttribute('href') === '#' + atual) {
        link.classList.add('ativo');
      }
    });
  }

  window.addEventListener('scroll', atualizarAtivo, { passive: true });
  atualizarAtivo(); // Executa ao carregar

  /* ----------------------------------------------------------
     3. CLIQUE NOS LINKS DO ÍNDICE (scroll suave + fechar menu)
  ---------------------------------------------------------- */
  linksIdx.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const alvo = document.querySelector(this.getAttribute('href'));
      if (alvo) {
        e.preventDefault();
        const offset = 90; // altura da navbar fixa
        const posY = alvo.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: posY, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     4. BOTÃO SUPORTE (placeholder)
  ---------------------------------------------------------- */
  const btnSuporte = document.querySelector('.btn-suporte');
  if (btnSuporte) {
    btnSuporte.addEventListener('click', function () {
      alert('Contacte-nos:\nEmail: suporte@angobiz.co.ao\nTelefone: +244 923 456 789');
    });
  }

  /* ----------------------------------------------------------
     5. FECHAR MENU MOBILE AO CLICAR NUM LINK
  ---------------------------------------------------------- */
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('aberto');
      navBtns.classList.remove('aberto');
      if (hamburger) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

});

/* ============================================================
   CSS extra para o menu mobile (injectado via JS)
   Evita duplicar regras no CSS quando o menu está aberto
   ============================================================ */
(function () {
  const estilo = document.createElement('style');
  estilo.textContent = `
    @media (max-width: 700px) {
      .nav-links.aberto {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: #1A1A1A;
        padding: 16px 24px;
        gap: 14px;
        z-index: 999;
        border-top: 1px solid #333;
      }
      .nav-buttons.aberto {
        display: flex !important;
        position: absolute;
        top: calc(60px + 160px);
        left: 0;
        right: 0;
        background: #1A1A1A;
        padding: 12px 24px 18px;
        z-index: 999;
        gap: 10px;
      }
    }
  `;
  document.head.appendChild(estilo);
})();
