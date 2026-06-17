/* ═══════════════════════════════════════════════
   ANGOBIZ KIVENDA — SPLASH SCREEN JS
   ═══════════════════════════════════════════════ */

'use strict';

// ── CONFIGURAÇÃO ──────────────────────────────────
const DURACAO_SPLASH = 9900;   // ms até redirecionar
const MSGS_CARREGAMENTO = [
  'A carregar...',
  'A preparar a sua experiência...',
  'Quase pronto...',
  'Bem-vindo à AngoBiz Kivenda!'
];

// ── ESTADO ────────────────────────────────────────
let progresso = 0;
let intervaloProgresso = null;
let intervaloMsg = 0;
let msgIdx = 0;

// ── ELEMENTOS ─────────────────────────────────────
const logoWrap     = document.getElementById('logoWrap');
const textoPrinc   = document.getElementById('textoPrincipal');
const iconesFuncs  = document.getElementById('iconesFuncionalidades');
const sloganBot    = document.getElementById('sloganBottom');
const carregando   = document.getElementById('carregando');
const barraFill    = document.getElementById('barraFill');
const txtCarregar  = document.querySelector('.txt-carregar');

// ── GERAÇÃO DE PONTOS DECORATIVOS ─────────────────

function gerarPontos() {
  ['pontos-esq','pontos-dir'].forEach(cls => {
    const svgEls = document.querySelectorAll(`.${cls} svg`);
    svgEls.forEach(svg => {
      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 5; col++) {
          const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
          c.setAttribute('cx', col * 24 + 12);
          c.setAttribute('cy', row * 25 + 12);
          c.setAttribute('r', 2);
          c.setAttribute('fill', '#c0392b');
          const op = Math.random() * 0.35 + 0.05;
          c.setAttribute('opacity', op.toFixed(2));
          g.appendChild(c);
        }
      }
      svg.appendChild(g);
    });
  });
}

// ── ANIMAÇÕES DE ENTRADA SEQUENCIAIS ─────────────

function animarEntrada() {
  // 1. Logo (imediato)
  setTimeout(() => {
    logoWrap.classList.add('visivel');
  }, 80);

  // 2. Produtos dos lados
  setTimeout(() => {
    document.querySelectorAll('.prod-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('visivel'), i * 120);
    });
  }, 200);

  // 3. Texto principal
  setTimeout(() => {
    textoPrinc.classList.add('visivel');
  }, 600);

  // 4. Ícones
  setTimeout(() => {
    iconesFuncs.classList.add('visivel');
  }, 900);

  // 5. Slogan bottom
  setTimeout(() => {
    sloganBot.classList.add('visivel');
  }, 1200);

  // 6. Carregando
  setTimeout(() => {
    carregando.classList.add('visivel');
  }, 1500);
}

// ── BARRA DE PROGRESSO ────────────────────────────

function iniciarProgresso() {
  const passo = 100 / (DURACAO_SPLASH / 50);

  intervaloProgresso = setInterval(() => {
    progresso = Math.min(progresso + passo, 100);
    barraFill.style.width = progresso + '%';

    if (progresso >= 100) {
      clearInterval(intervaloProgresso);
      finalizarCarregamento();
    }
  }, 50);
}

// ── ROTAÇÃO DE MENSAGENS ──────────────────────────

function rotarMensagens() {
  intervaloMsg = setInterval(() => {
    msgIdx = (msgIdx + 1) % MSGS_CARREGAMENTO.length;
    txtCarregar.style.opacity = '0';
    setTimeout(() => {
      txtCarregar.textContent = MSGS_CARREGAMENTO[msgIdx];
      txtCarregar.style.opacity = '1';
    }, 250);
  }, DURACAO_SPLASH / MSGS_CARREGAMENTO.length);
}

// ── FINALIZAR E MOSTRAR ECRÃ DE ENTRADA ──────────

function finalizarCarregamento() {
  clearInterval(intervaloMsg);

  // Atualizar texto para mensagem final
  txtCarregar.style.opacity = '0';
  setTimeout(() => {
    txtCarregar.textContent = 'Bem-vindo!';
    txtCarregar.style.transition = 'opacity .3s, color .3s';
    txtCarregar.style.color = '#e6a817';
    txtCarregar.style.opacity = '1';
  }, 250);

  // Mostrar ecrã de entrada após breve pausa
  setTimeout(() => {
    mostrarEcraEntrada();
  }, 800);
}

// ── ECRÃ DE ENTRADA ───────────────────────────────

function mostrarEcraEntrada() {
  // Criar ecrã de entrada dinamicamente
  const overlay = document.createElement('div');
  overlay.className = 'tela-entrada';
  overlay.id = 'telaEntrada';

  overlay.innerHTML = `
    <div class="tela-entrada-box">
      <div style="font-size:40px;margin-bottom:14px;">🛒</div>
      <h2>AngoBiz Kivenda</h2>
      <p>A plataforma completa para compras e vendas em Angola.<br/>Negócios · Inovação · Crescimento</p>
      <a href="pages/home.html">
      <button class="btn-entrar-plat" onclick="entrarPlataforma()">
        Entrar na plataforma
      </button>
      </a>
      <br/><br/>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a href="pages/cadastro.html">
        <button onclick="abrirCadastro()" style="
          background:transparent;border:1px solid #333;color:#888;
          border-radius:8px;padding:9px 20px;font-size:13px;cursor:pointer;
          font-family:inherit;transition:all .2s;
        " onmouseover="this.style.borderColor='#e6a817';this.style.color='#e6a817'"
           onmouseout="this.style.borderColor='#333';this.style.color='#888'">
          Criar conta
        </button>
        </a>
        <a href="pages/sobre_nos.html">
        <button onclick="verMaisInfo()" style="
          background:transparent;border:1px solid #333;color:#888;
          border-radius:8px;padding:9px 20px;font-size:13px;cursor:pointer;
          font-family:inherit;transition:all .2s;
        " onmouseover="this.style.borderColor='#555';this.style.color='#ccc'"
           onmouseout="this.style.borderColor='#333';this.style.color='#888'">
          Saber mais
        </button>
         </a>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('vis');
    });
  });
}

// ── ACÇÕES DOS BOTÕES ─────────────────────────────

function entrarPlataforma() {
  // Efeito de fade antes de "navegar"
  document.body.classList.add('fade-saida');
  setTimeout(() => {
    mostrarToastSplash('A redirecionar para a plataforma...', 'amar');
    // Em produção: window.location.href = '/loja';
    setTimeout(() => {
      document.body.classList.remove('fade-saida');
      resetarSplash();
    }, 2000);
  }, 800);
}

function abrirCadastro() {
  mostrarToastSplash('A abrir registo de nova conta...', 'verde');
  // Em produção: window.location.href = '/cadastro';
}

function verMaisInfo() {
  mostrarToastSplash('A carregar informações sobre a plataforma...', 'amar');
  // Em produção: window.location.href = '/sobre';
}

// ── REINICIAR SPLASH (para demo) ─────────────────

function resetarSplash() {
  const telaEntrada = document.getElementById('telaEntrada');
  if (telaEntrada) {
    telaEntrada.classList.remove('vis');
    setTimeout(() => telaEntrada.remove(), 400);
  }

  // Reiniciar animações
  progresso = 0;
  msgIdx = 0;
  barraFill.style.width = '0%';
  txtCarregar.style.color = '';
  txtCarregar.style.opacity = '1';
  txtCarregar.textContent = 'A carregar...';

  logoWrap.classList.remove('visivel');
  textoPrinc.classList.remove('visivel');
  iconesFuncs.classList.remove('visivel');
  sloganBot.classList.remove('visivel');
  carregando.classList.remove('visivel');

  document.querySelectorAll('.prod-item').forEach(el => {
    el.classList.remove('visivel');
  });

  setTimeout(() => {
    animarEntrada();
    iniciarProgresso();
    rotarMensagens();
  }, 300);
}

// ── TOAST SPLASH ──────────────────────────────────

function mostrarToastSplash(msg, tipo = '') {
  // Remover toast anterior se existir
  const antigo = document.getElementById('toastSplash');
  if (antigo) antigo.remove();

  const t = document.createElement('div');
  t.id = 'toastSplash';
  const cor = tipo === 'verde' ? '#27ae60' : tipo === 'amar' ? '#e6a817' : '#c0392b';

  Object.assign(t.style, {
    position:   'fixed',
    bottom:     '24px',
    left:       '50%',
    transform:  'translateX(-50%) translateY(10px)',
    background: '#1a1a1a',
    color:      '#e0e0e0',
    borderLeft: `4px solid ${cor}`,
    borderRadius: '6px',
    padding:    '11px 22px',
    fontSize:   '13px',
    fontFamily: 'inherit',
    zIndex:     '9999',
    opacity:    '0',
    transition: 'all .3s ease',
    whiteSpace: 'nowrap',
    boxShadow:  '0 4px 16px rgba(0,0,0,.6)',
  });
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 350);
  }, 3000);
}

// ── EFEITO PULSAÇÃO NO LOGO ───────────────────────

function configurarPulsacaoLogo() {
  const anel = document.querySelector('.logo-anel');
  if (!anel) return;

  setInterval(() => {
    anel.style.filter = `
      drop-shadow(0 0 24px rgba(192,57,43,.5))
      drop-shadow(0 0 50px rgba(0,0,0,.8))
    `;
    setTimeout(() => {
      anel.style.filter = `
        drop-shadow(0 0 14px rgba(192,57,43,.25))
        drop-shadow(0 0 40px rgba(0,0,0,.8))
      `;
    }, 1000);
  }, 2000);
}

// ── EFEITO HOVER NOS ÍCONES DE FUNCIONALIDADE ─────

function configurarHoverIcones() {
  document.querySelectorAll('.func-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const ico = item.querySelector('.func-ico');
      if (ico) {
        ico.style.transform = 'scale(1.1) translateY(-3px)';
        ico.style.boxShadow = '0 8px 24px rgba(192,57,43,.35)';
        ico.style.transition = 'all .25s ease';
      }
    });
    item.addEventListener('mouseleave', () => {
      const ico = item.querySelector('.func-ico');
      if (ico) {
        ico.style.transform = '';
        ico.style.boxShadow = '';
      }
    });
  });
}

// ── TECLA ESC PARA PULAR SPLASH ──────────────────

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    clearInterval(intervaloProgresso);
    progresso = 100;
    barraFill.style.width = '100%';
    barraFill.style.transition = 'none';
    finalizarCarregamento();
  }
  if (e.key === 'r' || e.key === 'R') {
    clearInterval(intervaloProgresso);
    clearInterval(intervaloMsg);
    resetarSplash();
  }
});

// ── CLIQUE PARA PULAR ────────────────────────────

document.addEventListener('click', e => {
  // Só pular se clicar fora do ecrã de entrada
  if (!document.getElementById('telaEntrada')) {
    if (progresso < 95) {
      mostrarToastSplash('Prima ESC para avançar rapidamente', '');
    }
  }
});

// ── TOOLTIP DICA ──────────────────────────────────

function mostrarDicaTeclado() {
  setTimeout(() => {
    const dica = document.createElement('div');
    Object.assign(dica.style, {
      position: 'fixed', bottom: '18px', right: '18px',
      fontSize: '10px', color: '#444',
      fontFamily: 'inherit', zIndex: '50',
    });
    dica.textContent = 'ESC para pular · R para reiniciar';
    document.body.appendChild(dica);
  }, 1500);
}

// ── INICIALIZAÇÃO ─────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  gerarPontos();
  animarEntrada();
  iniciarProgresso();
  rotarMensagens();
  configurarPulsacaoLogo();
  configurarHoverIcones();
  mostrarDicaTeclado();
});
