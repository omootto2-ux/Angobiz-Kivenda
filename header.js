/**
 * AngoBiz Kivenda — Componente Header Global
 * Ficheiro: script/header.js
 *
 * Injeta o cabeçalho e navegação em todas as páginas.
 * Detecta automaticamente se está na raiz ou em /pages/
 */

(function () {
  const emPages = window.location.pathname.includes('/pages/');
  const root    = emPages ? '../' : '';
  const pages   = emPages ? ''    : 'pages/';

  // ── Mapa completo de navegação ──────────────────────────────
  const NAV = [
    { label: 'INÍCIO',        href: `${pages}home.html`,         sub: [
      { label: 'Minha Loja',  href: `${pages}minha_loja.html` },
    ]},
    { label: 'VENDER',        href: `${pages}parceria.html` },
    { label: 'MERCADO',       href: `${pages}mercado.html` },
    { label: 'ANGO RESOLVE',  href: `${pages}ango_resolve.html` },
    { label: 'PROMOÇÕES',     href: `${pages}promocoes.html` },
    { label: 'BLOG',          href: `${pages}blog.html` },
    { label: 'SOBRE NÓS',     href: `${pages}sobre_nos.html` },
    { label: 'SUPORTE',       href: `${pages}suporte.html` },
  ];

  const CATEGORIAS_NAV = [
    { label: 'Supermercado',      href: `${pages}mercado.html`,       icone: 'fa-shopping-cart' },
    { label: 'Eletrónicos',       href: `${pages}eletronicos.html`,   icone: 'fa-laptop' },
    { label: 'Escritório',        href: `${pages}escritorio.html`,    icone: 'fa-chair' },
    { label: 'Indústria',         href: `${pages}industria.html`,     icone: 'fa-hard-hat' },
    { label: 'Casa & Decoração',  href: `${pages}casa&deco.html`,     icone: 'fa-home' },
    { label: 'Automóvel',         href: `${pages}automovel.html`,     icone: 'fa-car' },
    { label: 'Moda & Beleza',     href: `${pages}mercado.html`,       icone: 'fa-tshirt' },
    { label: 'Saúde',             href: `${pages}mercado.html`,       icone: 'fa-heartbeat' },
    { label: 'Serviços',          href: `${pages}ango_resolve.html`,  icone: 'fa-tools' },
  ];

  function renderNav() {
    const links = NAV.map(item => {
      if (item.sub) {
        const subs = item.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('');
        return `<li class="tem-dropdown">
          <a href="${item.href}">${item.label} <i class="fas fa-chevron-down"></i></a>
          <ul class="dropdown">${subs}</ul>
        </li>`;
      }
      return `<li><a href="${item.href}">${item.label}</a></li>`;
    }).join('');
    return links;
  }

  function renderCatDrop() {
    return CATEGORIAS_NAV.map(c =>
      `<a href="${c.href}"><i class="fas ${c.icone}"></i> ${c.label}</a>`
    ).join('');
  }

  function renderCatNav() {
    return CATEGORIAS_NAV.map(c =>
      `<a href="${c.href}" onclick="selecionarCategoriaBusca(event,'${c.label}')">${c.label}</a>`
    ).join('');
  }

  const html = `
  <div class="topo-superior">
    <span>Bem-vindo à <strong>AngoBiz Kivenda!</strong> Conectando negócios, inovação e crescimento.</span>
    <div class="topo-contatos">
      <a href="tel:+244923456789"><i class="fa fa-phone"></i> +244 923 456 789</a>
      <a href="mailto:atendimento@angobizkivenda.ao"><i class="fa fa-envelope"></i> atendimento@angobizkivenda.ao</a>
      <div class="topo-redes">
        <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://wa.me/244923456789" target="_blank"><i class="fab fa-whatsapp"></i></a>
      </div>
    </div>
  </div>

  <header class="cabecalho">
    <div class="cabecalho-inner">
      <a href="${root}index.html" class="logo">
        <div class="logo-circulo">
          <img src="${root}img/logo.png" alt="AngoBiz Kivenda Logo">
        </div>
        <div class="logo-texto">
          <span class="logo-angotext"><span class="w">ANGO</span><span class="g">BIZ</span></span>
          <span class="logo-kivenda">— KIVENDA —</span>
        </div>
      </a>

      <div class="busca-wrap">
        <div class="busca-cat-btn" id="buscaCatBtn">
          Todas as categorias <i class="fas fa-chevron-down"></i>
          <div class="busca-cat-drop" id="buscaCatDrop">
            ${renderCatNav()}
          </div>
        </div>
        <input type="text" id="inputBusca" placeholder="Pesquisar produtos, serviços, vendedores..." onkeydown="buscarEnter(event)" autocomplete="off"/>
        <button class="busca-btn" onclick="executarBusca()"><i class="fas fa-search"></i></button>
      </div>

      <div class="header-acoes">
        <div class="ha-conta" id="haConta">
          <i class="fas fa-user ha-ico"></i>
          <div>
            <span class="ha-label">Minha conta</span>
            <i class="fas fa-chevron-down ha-seta"></i>
          </div>
          <div class="conta-drop" id="contaDrop">
            <a href="${pages}login.html"><i class="fas fa-sign-in-alt"></i> Entrar</a>
            <a href="${pages}cadastro.html"><i class="fas fa-user-plus"></i> Criar conta</a>
            <a href="${pages}perfil_cliente.html"><i class="fas fa-user"></i> Perfil</a>
            <div class="drop-sep"></div>
            <a href="${pages}painel_cliente.html"><i class="fas fa-store"></i> Painel do vendedor</a>
            <a href="${pages}painel_admin.html" id="linkAdmin" style="display:none"><i class="fas fa-shield-alt"></i> Admin</a>
            <div class="drop-sep" id="sepLogout" style="display:none"></div>
            <a href="#" id="btnLogout" onclick="API.logout()" style="display:none"><i class="fas fa-sign-out-alt"></i> Sair</a>
          </div>
        </div>

        <a href="${pages}carrinho.html" class="ha-carrinho">
          <div class="cart-ico">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-badge" id="cartBadge">0</span>
          </div>
          <span class="ha-label">Carrinho</span>
        </a>
      </div>
    </div>
  </header>

  <nav class="nav-principal">
    <div class="nav-inner">
      <button class="nav-categorias-btn" id="btnCatNav">
        <i class="fa fa-bars"></i> TODAS CATEGORIAS <i class="fa fa-times nav-fechar"></i>
      </button>
      <div class="nav-cat-dropdown" id="navCatDrop" style="display:none">
        ${renderCatDrop()}
      </div>
      <ul class="nav-links">
        ${renderNav()}
      </ul>
    </div>
  </nav>`;

  // Injectar antes do conteúdo
  const alvo = document.getElementById('header-placeholder') || document.body;
  if (document.getElementById('header-placeholder')) {
    alvo.outerHTML = html;
  } else {
    alvo.insertAdjacentHTML('afterbegin', html);
  }

  // Marcar link activo
  const pagActual = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === pagActual || a.href.endsWith(pagActual)) {
      a.classList.add('ativo');
    }
  });

  // Toggle conta dropdown
  document.addEventListener('click', e => {
    const conta = document.getElementById('haConta');
    const drop  = document.getElementById('contaDrop');
    const catBtn = document.getElementById('buscaCatBtn');
    const catDrop = document.getElementById('buscaCatDrop');
    const navBtn  = document.getElementById('btnCatNav');
    const navDrop = document.getElementById('navCatDrop');

    if (conta && drop) {
      if (conta.contains(e.target)) {
        drop.classList.toggle('aberto');
      } else {
        drop.classList.remove('aberto');
      }
    }
    if (catBtn && catDrop) {
      if (catBtn.contains(e.target)) {
        catDrop.style.display = catDrop.style.display === 'block' ? 'none' : 'block';
      } else {
        catDrop.style.display = 'none';
      }
    }
    if (navBtn && navDrop) {
      if (navBtn.contains(e.target)) {
        navDrop.style.display = navDrop.style.display === 'block' ? 'none' : 'block';
      } else if (!navDrop.contains(e.target)) {
        navDrop.style.display = 'none';
      }
    }
  });

  // Mostrar botão admin se for admin
  document.addEventListener('DOMContentLoaded', () => {
    const user = typeof API !== 'undefined' ? API.getUser() : null;
    if (user) {
      const btnLogout = document.getElementById('btnLogout');
      const sepLogout = document.getElementById('sepLogout');
      if (btnLogout) { btnLogout.style.display = ''; }
      if (sepLogout) { sepLogout.style.display = ''; }
      if (user.tipo === 'admin') {
        const linkAdmin = document.getElementById('linkAdmin');
        if (linkAdmin) linkAdmin.style.display = '';
      }
    }
  });
})();

// ── Funções globais de busca ─────────────────────────────────────
function selecionarCategoriaBusca(e, cat) {
  e.preventDefault();
  const btn = document.getElementById('buscaCatBtn');
  if (btn) btn.childNodes[0].textContent = cat + ' ';
  document.getElementById('buscaCatDrop').style.display = 'none';
}

function buscarEnter(e) {
  if (e.key === 'Enter') executarBusca();
}

function executarBusca() {
  const q = document.getElementById('inputBusca')?.value?.trim();
  if (!q) return;
  const emPages = window.location.pathname.includes('/pages/');
  const dest = emPages ? `mercado.html?q=${encodeURIComponent(q)}` : `pages/mercado.html?q=${encodeURIComponent(q)}`;
  window.location.href = dest;
}

// ── Funções globais de toast (compatibilidade) ────────────────────
function mostrarToast(msg) { UI.toast(msg, 'info'); }
function fecharDrop(id) { document.getElementById(id)?.classList.remove('aberto'); }
