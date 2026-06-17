/* =========================================
   ANGOBIZ KIVENDA – LANDING PAGE – JAVASCRIPT
   Funcionalidades:
   - Navbar fixa com efeito de scroll
   - Menu mobile (hamburger)
   - Scroll suave para âncoras
   - Animações de reveal ao fazer scroll
   - Contadores animados de números
   - Gráfico mini do hero (Canvas)
   - Acordeão do FAQ
   - Botão voltar ao topo
   - Highlight do link ativo na navbar
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. NAVBAR – EFEITO DE SCROLL
  ───────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    verificarSecaoActiva();
    controlarBtnTopo();
  }, { passive: true });

  /* ─────────────────────────────────────────
     2. MENU MOBILE (HAMBURGER)
  ───────────────────────────────────────── */
  var btnHamburger = document.getElementById('navHamburger');
  var navMobile    = document.getElementById('navMobile');
  var menuAberto   = false;

  btnHamburger.addEventListener('click', function () {
    menuAberto = !menuAberto;
    navMobile.classList.toggle('aberto', menuAberto);
    btnHamburger.innerHTML = menuAberto
      ? '<i class="fa fa-times"></i>'
      : '<i class="fa fa-bars"></i>';
  });

  /* Fechar menu ao clicar nos links mobile */
  document.querySelectorAll('.nav-link-mobile').forEach(function (link) {
    link.addEventListener('click', function () {
      menuAberto = false;
      navMobile.classList.remove('aberto');
      btnHamburger.innerHTML = '<i class="fa fa-bars"></i>';
    });
  });

  /* Fechar menu ao clicar fora */
  document.addEventListener('click', function (e) {
    if (menuAberto && !navMobile.contains(e.target) && !btnHamburger.contains(e.target)) {
      menuAberto = false;
      navMobile.classList.remove('aberto');
      btnHamburger.innerHTML = '<i class="fa fa-bars"></i>';
    }
  });

  /* ─────────────────────────────────────────
     3. SCROLL SUAVE PARA ÂNCORAS
  ───────────────────────────────────────── */
  var alturaNavbar = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--navbar-h')) || 70;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var alvo = document.querySelector(this.getAttribute('href'));
      if (alvo) {
        e.preventDefault();
        var posY = alvo.getBoundingClientRect().top + window.scrollY - alturaNavbar - 10;
        window.scrollTo({ top: posY, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     4. HIGHLIGHT DO LINK ACTIVO NA NAVBAR
  ───────────────────────────────────────── */
  var secoes = ['inicio', 'como-funciona', 'vantagens', 'planos', 'faq', 'contactos'];
  var linksNav = document.querySelectorAll('.nav-link');

  function verificarSecaoActiva() {
    var scrollY = window.scrollY + alturaNavbar + 80;
    var activa  = '';

    secoes.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activa = id;
    });

    linksNav.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.style.color = href === activa ? 'var(--dourado)' : '';
    });
  }

  /* ─────────────────────────────────────────
     5. ANIMAÇÕES DE REVEAL AO FAZER SCROLL
  ───────────────────────────────────────── */
  var elemReveal = document.querySelectorAll('[data-reveal]');

  var observadorReveal = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada, idx) {
      if (entrada.isIntersecting) {
        /* Atraso escalonado por posição */
        var irmao = Array.from(entrada.target.parentElement.children).indexOf(entrada.target);
        var atraso = Math.min(irmao * 80, 400);
        setTimeout(function () {
          entrada.target.classList.add('visivel');
        }, atraso);
        observadorReveal.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elemReveal.forEach(function (el) { observadorReveal.observe(el); });

  /* ─────────────────────────────────────────
     6. CONTADORES ANIMADOS
  ───────────────────────────────────────── */
  var contadoresAnimados = false;

  function animarContadores() {
    if (contadoresAnimados) return;
    var secaoNumeros = document.querySelector('.numeros');
    if (!secaoNumeros) return;

    var rect = secaoNumeros.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;

    contadoresAnimados = true;

    document.querySelectorAll('.numero-val').forEach(function (el) {
      var valorFinal = parseInt(el.dataset.count || '0');
      var duracao    = 1800;
      var intervalo  = 16;
      var passos     = duracao / intervalo;
      var incremento = valorFinal / passos;
      var actual     = 0;

      var timer = setInterval(function () {
        actual += incremento;
        if (actual >= valorFinal) {
          actual = valorFinal;
          clearInterval(timer);
        }

        /* Formatar o valor */
        var formatado;
        if (valorFinal >= 1000000) {
          formatado = '+' + (actual / 1000000).toFixed(0) + '.000.000';
        } else if (valorFinal >= 10000) {
          formatado = '+' + Math.round(actual / 1000) + '.000';
        } else if (valorFinal === 100) {
          formatado = Math.round(actual) + '%';
        } else {
          formatado = '+' + Math.round(actual).toLocaleString('pt-AO');
        }
        el.textContent = formatado;
      }, intervalo);
    });
  }

  window.addEventListener('scroll', animarContadores, { passive: true });
  animarContadores(); /* Tentar na carga */

  /* ─────────────────────────────────────────
     7. GRÁFICO MINI DO HERO (Canvas)
  ───────────────────────────────────────── */
  var miniCanvas = document.getElementById('miniCanvas');

  function desenharMiniGrafico() {
    if (!miniCanvas) return;
    var ctx = miniCanvas.getContext('2d');
    var W   = miniCanvas.parentElement.clientWidth;
    var H   = 70;

    miniCanvas.width  = W;
    miniCanvas.height = H;

    var vals   = [180,220,280,320,260,380,420,360,400,450,480,440,490];
    var maxVal = Math.max.apply(null, vals) * 1.1;
    var nPts   = vals.length;
    var passo  = W / (nPts - 1);
    var padT   = 8; var padB = 8;
    var areaH  = H - padT - padB;

    var pontos = vals.map(function (v, i) {
      return { x: i * passo, y: padT + areaH - (v / maxVal) * areaH };
    });

    /* Gradiente */
    var grad = ctx.createLinearGradient(0, padT, 0, padT + areaH);
    grad.addColorStop(0,   'rgba(201,162,39,0.35)');
    grad.addColorStop(1,   'rgba(201,162,39,0)');

    /* Área */
    ctx.beginPath();
    ctx.moveTo(pontos[0].x, H);
    ctx.lineTo(pontos[0].x, pontos[0].y);
    for (var i = 1; i < pontos.length; i++) {
      var cx = (pontos[i-1].x + pontos[i].x) / 2;
      ctx.bezierCurveTo(cx, pontos[i-1].y, cx, pontos[i].y, pontos[i].x, pontos[i].y);
    }
    ctx.lineTo(pontos[pontos.length-1].x, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    /* Linha */
    ctx.beginPath();
    ctx.moveTo(pontos[0].x, pontos[0].y);
    for (var j = 1; j < pontos.length; j++) {
      var cx2 = (pontos[j-1].x + pontos[j].x) / 2;
      ctx.bezierCurveTo(cx2, pontos[j-1].y, cx2, pontos[j].y, pontos[j].x, pontos[j].y);
    }
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    /* Pontos */
    [0, 3, 6, 9, 12].forEach(function (idx) {
      if (idx < pontos.length) {
        ctx.beginPath();
        ctx.arc(pontos[idx].x, pontos[idx].y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#c9a227';
        ctx.fill();
      }
    });
  }

  setTimeout(desenharMiniGrafico, 200);
  window.addEventListener('resize', desenharMiniGrafico, { passive: true });

  /* ─────────────────────────────────────────
     8. ACORDEÃO DO FAQ
  ───────────────────────────────────────── */
  document.querySelectorAll('.faq-pergunta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var resposta  = this.nextElementSibling;
      var expandido = this.getAttribute('aria-expanded') === 'true';

      /* Fechar todos os outros */
      document.querySelectorAll('.faq-pergunta').forEach(function (outroBtns) {
        outroBtns.setAttribute('aria-expanded', 'false');
        outroBtns.nextElementSibling.classList.remove('aberta');
      });

      /* Alternar o clicado */
      if (!expandido) {
        this.setAttribute('aria-expanded', 'true');
        resposta.classList.add('aberta');
      }
    });
  });

  /* Abrir o primeiro item por defeito */
  var primeiroPergunta = document.querySelector('.faq-pergunta');
  if (primeiroPergunta) {
    primeiroPergunta.setAttribute('aria-expanded', 'true');
    primeiroPergunta.nextElementSibling.classList.add('aberta');
  }

  /* ─────────────────────────────────────────
     9. BOTÃO VOLTAR AO TOPO
  ───────────────────────────────────────── */
  var btnTopo = document.getElementById('btnTopo');

  function controlarBtnTopo() {
    if (window.scrollY > 400) {
      btnTopo.classList.add('visivel');
    } else {
      btnTopo.classList.remove('visivel');
    }
  }

  btnTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────────
     10. PLANOS – HOVER INTERACTIVO
  ───────────────────────────────────────── */
  document.querySelectorAll('.plano-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      document.querySelectorAll('.plano-card').forEach(function (c) {
        if (c !== card) c.style.opacity = '0.7';
      });
    });
    card.addEventListener('mouseleave', function () {
      document.querySelectorAll('.plano-card').forEach(function (c) {
        c.style.opacity = '1';
      });
    });
  });

  /* ─────────────────────────────────────────
     11. BOTÕES CTA – RASTREAMENTO (log)
  ───────────────────────────────────────── */
  document.querySelectorAll('.btn-primario, .btn-cadastrar, .btn-plano, .btn-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var texto = this.textContent.trim();
      console.log('[AngoBiz] Clique CTA:', texto);
      /* Em produção: substituir por chamada à API de analytics */
    });
  });

  /* ─────────────────────────────────────────
     12. ANIMAÇÃO DE ENTRADA DO HERO
  ───────────────────────────────────────── */
  setTimeout(function () {
    var heroEsquerda = document.querySelector('.hero-esquerda');
    var heroDireita  = document.querySelector('.hero-direita');
    if (heroEsquerda) heroEsquerda.classList.add('visivel');
    if (heroDireita)  heroDireita.classList.add('visivel');
  }, 100);

  /* ─────────────────────────────────────────
     13. FECHAR MENU MOBILE AO REDIMENSIONAR
  ───────────────────────────────────────── */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menuAberto) {
      menuAberto = false;
      navMobile.classList.remove('aberto');
      btnHamburger.innerHTML = '<i class="fa fa-bars"></i>';
    }
    desenharMiniGrafico();
  }, { passive: true });

  /* ─────────────────────────────────────────
     14. ANIMAÇÃO DO CARD PRODUTO HERO
         (aparece com atraso)
  ───────────────────────────────────────── */
  var cardProduto = document.querySelector('.hero-card-produto');
  if (cardProduto) {
    cardProduto.style.opacity = '0';
    cardProduto.style.transform = 'translateX(20px)';
    cardProduto.style.transition = 'opacity .6s ease .5s, transform .6s ease .5s';
    setTimeout(function () {
      cardProduto.style.opacity = '1';
      cardProduto.style.transform = 'translateX(0)';
    }, 600);
  }

  /* ─────────────────────────────────────────
     15. VERIFICAÇÃO INICIAL DO SCROLL
  ───────────────────────────────────────── */
  verificarSecaoActiva();
  controlarBtnTopo();

});
