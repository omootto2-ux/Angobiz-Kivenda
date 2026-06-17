/* =============================================
   ANGOBIZ KIVENDA — APP.JS
   Toda a lógica interativa da plataforma
   ============================================= */

// ---- REFERÊNCIAS DOM ----
const splash           = document.getElementById('splash');
const paginaPrincipal  = document.getElementById('pagina-principal');
const modalOverlay     = document.getElementById('modal-overlay');
const modalCaixa       = document.getElementById('modal-caixa');
const modalConteudo    = document.getElementById('modal-conteudo');
const navMobile        = document.getElementById('navMobile');

// ---- ESTADO DA APLICAÇÃO ----
let utilizadorLogado   = null;
let menuMobileAberto   = false;

// ============================================
//  SPLASH SCREEN — Carregamento inicial
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Simula carregamento de recursos
  setTimeout(() => {
    ocultarSplash();
  }, 3200);
});

function ocultarSplash() {
  splash.style.transition = 'opacity 0.7s ease';
  splash.style.opacity = '0';

  setTimeout(() => {
    splash.classList.add('escondido');
    paginaPrincipal.classList.remove('escondido');
    animarEntradaPagina();
  }, 700);
}

function animarEntradaPagina() {
  const elementos = paginaPrincipal.querySelectorAll(
    '.hero-titulo, .hero-desc, .hero-btns, .hero-cards, .carac-card'
  );

  elementos.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;

    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 80);
    });
  });
}

// ============================================
//  MENU MOBILE
// ============================================

function alternarMenuMobile() {
  menuMobileAberto = !menuMobileAberto;
  const btn = document.getElementById('btnMenuMobile');

  if (menuMobileAberto) {
    navMobile.classList.remove('escondido');
    navMobile.classList.add('visivel');
    btn.textContent = '✕';
  } else {
    navMobile.classList.remove('visivel');
    navMobile.classList.add('escondido');
    btn.textContent = '☰';
  }
}

// Fechar menu mobile ao clicar num link
document.querySelectorAll('.nav-link-mobile').forEach(link => {
  link.addEventListener('click', () => {
    if (menuMobileAberto) alternarMenuMobile();
  });
});

// ============================================
//  SISTEMA DE MODAIS
// ============================================

function abrirModal(tipo) {
  modalOverlay.classList.remove('escondido');
  modalOverlay.classList.add('visivel');
  document.body.style.overflow = 'hidden';

  if (tipo === 'login') {
    renderizarFormLogin();
  } else if (tipo === 'registro') {
    renderizarFormRegistro();
  }
}

function fecharModal() {
  modalOverlay.classList.remove('visivel');
  modalOverlay.classList.add('escondido');
  document.body.style.overflow = '';
  modalConteudo.innerHTML = '';
}

function fecharModalFora(evento) {
  if (evento.target === modalOverlay) {
    fecharModal();
  }
}

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharModal();
});

// ============================================
//  FORMULÁRIO DE LOGIN
// ============================================

function renderizarFormLogin() {
  modalConteudo.innerHTML = `
    <h2 class="modal-titulo">Bem-vindo de volta</h2>
    <p class="modal-sub">Inicia sessão na tua conta AngoBiz</p>

    <div class="campo-form">
      <label for="login-email">Email ou Telemóvel</label>
      <input type="email" id="login-email" placeholder="exemplo@email.com" autocomplete="email"/>
    </div>

    <div class="campo-form">
      <label for="login-senha">Palavra-passe</label>
      <input type="password" id="login-senha" placeholder="A tua palavra-passe"/>
    </div>

    <button class="btn-modal-submit" onclick="processarLogin()">Entrar na Conta</button>

    <p class="modal-link" style="margin-top:12px;">
      <a onclick="void(0)">Esqueceste a palavra-passe?</a>
    </p>

    <div class="modal-divider">ou</div>

    <p class="modal-link">
      Não tens conta? <a onclick="abrirModal('registro')">Registar agora</a>
    </p>

    <div id="msg-login"></div>
  `;

  // Foco automático
  setTimeout(() => document.getElementById('login-email')?.focus(), 100);

  // Submeter com Enter
  modalConteudo.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') processarLogin();
    });
  });
}

function processarLogin() {
  const email = document.getElementById('login-email')?.value.trim();
  const senha = document.getElementById('login-senha')?.value;
  const msg   = document.getElementById('msg-login');

  if (!email || !senha) {
    exibirMensagem(msg, 'erro', 'Por favor preenche todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    exibirMensagem(msg, 'erro', 'Insere um endereço de email válido.');
    return;
  }

  if (senha.length < 6) {
    exibirMensagem(msg, 'erro', 'A palavra-passe deve ter pelo menos 6 caracteres.');
    return;
  }

  // Simula chamada ao servidor
  const btnSubmit = modalConteudo.querySelector('.btn-modal-submit');
  btnSubmit.textContent = 'A entrar...';
  btnSubmit.disabled = true;

  setTimeout(() => {
    utilizadorLogado = { email, nome: email.split('@')[0] };
    exibirMensagem(msg, 'sucesso', `Bem-vindo, ${utilizadorLogado.nome}! 🎉`);
    atualizarCabecalhoLogado();

    setTimeout(() => fecharModal(), 1600);
  }, 1200);
}

// ============================================
//  FORMULÁRIO DE REGISTO
// ============================================

function renderizarFormRegistro() {
  modalConteudo.innerHTML = `
    <h2 class="modal-titulo">Criar Conta</h2>
    <p class="modal-sub">Junta-te à comunidade AngoBiz Kivenda</p>

    <div class="campo-form">
      <label for="reg-nome">Nome Completo</label>
      <input type="text" id="reg-nome" placeholder="O teu nome completo"/>
    </div>

    <div class="campo-form">
      <label for="reg-email">Email</label>
      <input type="email" id="reg-email" placeholder="exemplo@email.com" autocomplete="email"/>
    </div>

    <div class="campo-form">
      <label for="reg-telemovel">Telemóvel</label>
      <input type="tel" id="reg-telemovel" placeholder="+244 9XX XXX XXX"/>
    </div>

    <div class="campo-form">
      <label for="reg-senha">Palavra-passe</label>
      <input type="password" id="reg-senha" placeholder="Mínimo 6 caracteres"/>
    </div>

    <div class="campo-form">
      <label for="reg-confirmar">Confirmar Palavra-passe</label>
      <input type="password" id="reg-confirmar" placeholder="Repete a palavra-passe"/>
    </div>

    <button class="btn-modal-submit" onclick="processarRegistro()">Criar a Minha Conta</button>

    <p class="modal-link">
      Já tens conta? <a onclick="abrirModal('login')">Iniciar sessão</a>
    </p>

    <div id="msg-registro"></div>
  `;

  setTimeout(() => document.getElementById('reg-nome')?.focus(), 100);

  modalConteudo.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') processarRegistro();
    });
  });
}

function processarRegistro() {
  const nome      = document.getElementById('reg-nome')?.value.trim();
  const email     = document.getElementById('reg-email')?.value.trim();
  const telemovel = document.getElementById('reg-telemovel')?.value.trim();
  const senha     = document.getElementById('reg-senha')?.value;
  const confirmar = document.getElementById('reg-confirmar')?.value;
  const msg       = document.getElementById('msg-registro');

  if (!nome || !email || !telemovel || !senha || !confirmar) {
    exibirMensagem(msg, 'erro', 'Por favor preenche todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    exibirMensagem(msg, 'erro', 'Insere um endereço de email válido.');
    return;
  }

  if (senha.length < 6) {
    exibirMensagem(msg, 'erro', 'A palavra-passe deve ter pelo menos 6 caracteres.');
    return;
  }

  if (senha !== confirmar) {
    exibirMensagem(msg, 'erro', 'As palavras-passe não coincidem.');
    return;
  }

  const btnSubmit = modalConteudo.querySelector('.btn-modal-submit');
  btnSubmit.textContent = 'A registar...';
  btnSubmit.disabled = true;

  setTimeout(() => {
    utilizadorLogado = { nome, email, telemovel };
    exibirMensagem(msg, 'sucesso', `Conta criada com sucesso! Bem-vindo, ${nome}! 🎉`);
    atualizarCabecalhoLogado();

    setTimeout(() => fecharModal(), 1800);
  }, 1400);
}

// ============================================
//  UTILITÁRIOS
// ============================================

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function exibirMensagem(container, tipo, texto) {
  if (!container) return;

  const cor = tipo === 'sucesso'
    ? 'rgba(0,160,0,0.12)'
    : 'rgba(204,0,0,0.12)';

  const borda = tipo === 'sucesso'
    ? 'rgba(0,160,0,0.3)'
    : 'rgba(204,0,0,0.3)';

  const corTexto = tipo === 'sucesso' ? '#4caf50' : '#ff6666';

  container.innerHTML = `
    <div style="
      background: ${cor};
      border: 1px solid ${borda};
      border-radius: 8px;
      padding: 12px 16px;
      color: ${corTexto};
      font-size: 0.88rem;
      text-align: center;
      margin-top: 14px;
    ">${texto}</div>
  `;
}

// ============================================
//  ATUALIZAR CABEÇALHO APÓS LOGIN
// ============================================

function atualizarCabecalhoLogado() {
  const acoesEl = document.querySelector('.acoes-cabecalho');
  const acoesMobileEl = document.querySelector('.acoes-mobile');

  if (!utilizadorLogado) return;

  const htmlLogado = `
    <span style="
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
      font-weight: 600;
    ">Olá, <span style="color: var(--amarelo-vivo);">${utilizadorLogado.nome}</span></span>
    <button class="btn-entrar" onclick="terminarSessao()" style="border-color:rgba(204,0,0,0.5);color:#ff6666;">
      Sair
    </button>
  `;

  if (acoesEl) acoesEl.innerHTML = htmlLogado;
  if (acoesMobileEl) acoesMobileEl.innerHTML = htmlLogado;
}

function terminarSessao() {
  utilizadorLogado = null;

  const acoesEl = document.querySelector('.acoes-cabecalho');
  const acoesMobileEl = document.querySelector('.acoes-mobile');

  const htmlDeslogado = `
    <button class="btn-entrar" onclick="abrirModal('login')">Entrar</button>
    <button class="btn-registar" onclick="abrirModal('registro')">Registar</button>
  `;

  if (acoesEl) acoesEl.innerHTML = htmlDeslogado;
  if (acoesMobileEl) acoesMobileEl.innerHTML = htmlDeslogado;
}

// ============================================
//  NAVEGAÇÃO ACTIVA
// ============================================

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

// ============================================
//  FORÇAR CARREGAMENTO AO CLICAR (override)
// Clicando no spinner encurta espera
// ============================================

document.querySelector('.spinner-area')?.addEventListener('click', () => {
  ocultarSplash();
});