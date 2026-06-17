/**
 * ANGOBIZ KIVENDA - Scripts Principais
 * Interatividade, animações e funcionalidades da página
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================
     ANIMAÇÃO DOS NÚMEROS (CONTADOR)
     ======================================== */
  function animarContador(elemento, valorFinal, duracao = 2000) {
    const inicio = 0;
    const incremento = valorFinal / (duracao / 16);
    let atual = inicio;

    const timer = setInterval(() => {
      atual += incremento;
      if (atual >= valorFinal) {
        atual = valorFinal;
        clearInterval(timer);
      }

      // Formata o número com separador de milhar
      elemento.textContent = formatarNumero(Math.floor(atual), elemento.dataset.prefixo || '', elemento.dataset.sufixo || '');
    }, 16);
  }

  function formatarNumero(numero, prefixo, sufixo) {
    return prefixo + numero.toLocaleString('pt-AO') + sufixo;
  }

  // Observador para iniciar animação quando a seção aparecer na tela
  const statsElementos = document.querySelectorAll('.stat-numero');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        const el = entrada.target;
        const texto = el.textContent;

        // Extrai prefixo, número e sufixo
        const match = texto.match(/([+]?)(\d[\d.]*)(.*)/);
        if (match) {
          const prefixo = match[1];
          const numero = parseInt(match[2].replace(/\./g, ''));
          const sufixo = match[3];

          el.dataset.prefixo = prefixo;
          el.dataset.sufixo = sufixo;

          animarContador(el, numero, 1800);
          observador.unobserve(el);
        }
      }
    });
  }, { threshold: 0.3 });

  statsElementos.forEach(el => observador.observe(el));


  /* ========================================
     DROPDOWN DO MENU
     ======================================== */
  const itensCom = document.querySelectorAll('.tem-dropdown');

  itensCom.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const dropdown = item.querySelector('.dropdown');
      if (dropdown) {
        dropdown.style.display = 'block';
      }
    });

    item.addEventListener('mouseleave', () => {
      const dropdown = item.querySelector('.dropdown');
      if (dropdown) {
        dropdown.style.display = 'none';
      }
    });
  });


  /* ========================================
     BOTÃO DE BUSCA
     ======================================== */
  const inputBusca = document.querySelector('.cabecalho-busca input');
  const btnBusca = document.querySelector('.btn-busca');

  if (btnBusca && inputBusca) {
    btnBusca.addEventListener('click', () => {
      const termo = inputBusca.value.trim();
      if (termo) {
        alert(`Buscando por: "${termo}"`);
      } else {
        inputBusca.focus();
      }
    });

    inputBusca.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btnBusca.click();
      }
    });
  }

  
// ====================================================
//  BUSCA
// ====================================================
function executarBusca() {
  const termo = document.getElementById("inputBusca").value.toLowerCase().trim();
  if (!termo) { limparFiltros(); return; }

  produtosVisiveis = todosProdutos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.cat.toLowerCase().includes(termo)  ||
    p.vendedor.toLowerCase().includes(termo)
  );

  servicosVisiveis = todosServicos.filter(s =>
    s.nome.toLowerCase().includes(termo) ||
    s.cat.toLowerCase().includes(termo)  ||
    s.vendedor.toLowerCase().includes(termo)
  );

  document.getElementById("subProdutos").textContent =
    `${produtosVisiveis.length} produto(s) para "${termo}"`;
  document.getElementById("subServicos").textContent =
    `${servicosVisiveis.length} serviço(s) para "${termo}"`;

  renderizarProdutos(produtosVisiveis);
  renderizarServicos(servicosVisiveis);
  mostrarToast(`Resultados para: "${termo}"`);
}

function buscarEnter(e) {
  if (e.key === "Enter") executarBusca();
}

// ====================================================
//  DROPDOWN: CATEGORIAS DE BUSCA
// ====================================================
document.getElementById("buscaCatBtn")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("buscaCatDrop").classList.toggle("aberto");
  fecharDrop("contaDrop");
});

function selecionarCategoriaBusca(e, cat) {
  e.preventDefault();
  e.stopPropagation();
  const btn = document.getElementById("buscaCatBtn");
  btn.childNodes[0].textContent = cat + " ";
  fecharDrop("buscaCatDrop");
  mostrarToast("Categoria de busca: " + cat);
}

// ====================================================
//  DROPDOWN: MINHA CONTA
// ====================================================
document.getElementById("haConta")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("contaDrop").classList.toggle("aberto");
  fecharDrop("buscaCatDrop");
});

function fecharDrop(id) {
  document.getElementById(id)?.classList.remove("aberto");
}

document.addEventListener("click", function () {
  fecharDrop("buscaCatDrop");
  fecharDrop("contaDrop");
});

  /* ========================================
     ANIMAÇÃO DE ENTRADA DAS SEÇÕES
     ======================================== */
  const elementosAnimados = document.querySelectorAll(
    '.valor-item, .stat-item, .sobre-conteudo, .sobre-logo-centro, .sobre-foto'
  );

  const observadorEntrada = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, idx) => {
      if (entrada.isIntersecting) {
        setTimeout(() => {
          entrada.target.style.opacity = '1';
          entrada.target.style.transform = 'translateY(0)';
        }, idx * 80);
        observadorEntrada.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1 });

  elementosAnimados.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observadorEntrada.observe(el);
  });


  /* ========================================
     MENU MOBILE - TODAS CATEGORIAS
     ======================================== */
  const navCategorias = document.querySelector('.nav-categorias');

  if (navCategorias) {
    navCategorias.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        const visivel = navLinks.style.display === 'flex';
        navLinks.style.display = visivel ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = '#111';
        navLinks.style.zIndex = '999';
      }
    });
  }


  /* ========================================
     EFEITO HOVER NOS VALORES
     ======================================== */
  const valoresItens = document.querySelectorAll('.valor-item');

  valoresItens.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px)';
      item.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });


  /* ========================================
     CARRINHO - FEEDBACK VISUAL
     ======================================== */
  const acaoCarrinho = document.querySelector('.acao-item.carrinho');

  if (acaoCarrinho) {
    acaoCarrinho.addEventListener('click', () => {
      const badge = acaoCarrinho.querySelector('.carrinho-badge');
      if (badge) {
        badge.style.transform = 'scale(1.4)';
        badge.style.transition = 'transform 0.2s';
        setTimeout(() => {
          badge.style.transform = 'scale(1)';
        }, 200);
      }
    });
  }

  console.log('✅ AngoBiz Kivenda - Scripts carregados com sucesso!');
});
