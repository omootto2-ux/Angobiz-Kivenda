/* ============================================================
   ANGOBIZ KIVENDA – POLÍTICA DE PRIVACIDADE
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
     2. FECHAR MENU MOBILE AO CLICAR NOS LINKS
  ---------------------------------------------------------- */
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('aberto');
      navBtns.classList.remove('aberto');
      if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  /* ----------------------------------------------------------
     3. DESTACAR ITEM ATIVO NO MENU LATERAL (scroll spy)
  ---------------------------------------------------------- */
  const secoes   = document.querySelectorAll('.secao');
  const itensMenu = document.querySelectorAll('.menu-item');

  function atualizarAtivo () {
    let idAtual = '';
    secoes.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= 120) {
        idAtual = sec.getAttribute('id');
      }
    });

    itensMenu.forEach(function (item) {
      item.classList.remove('ativo');
      if (item.getAttribute('data-secao') === idAtual) {
        item.classList.add('ativo');
      }
    });
  }

  window.addEventListener('scroll', atualizarAtivo, { passive: true });

  /* ----------------------------------------------------------
     4. BOTÃO SUPORTE
  ---------------------------------------------------------- */
  const btnSuporte = document.querySelector('.btn-suporte');
  if (btnSuporte) {
    btnSuporte.addEventListener('click', function () {
      alert('Contacte-nos:\nEmail: privacidade@angobiz.co.ao\nTelefone: +244 923 456 789');
    });
  }

});

/* ============================================================
   CSS EXTRA – Menu mobile aberto (injectado via JS)
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
        left: 0; right: 0;
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
        left: 0; right: 0;
        background: #1A1A1A;
        padding: 12px 24px 18px;
        z-index: 999;
        gap: 10px;
      }
    }
  `;
  document.head.appendChild(estilo);
})();
