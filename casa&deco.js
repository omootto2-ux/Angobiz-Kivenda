// =====================================================
//  ANGOBIZ KIVENDA — CASA & DECORAÇÃO — JAVASCRIPT
//  Produtos, Carrinho, Favoritos, Filtros, UI
// =====================================================

// ---- DADOS DOS PRODUTOS ----
const produtos = [
  // --- Linha 1 ---
  {
    id: 1,
    nome: "Rack para TV até 65\" Madesa",
    precoOriginal: 145000,
    precoAtual: 123000,
    desconto: -15,
    estrelas: 4,
    avaliacoes: 28,
    icone: "fas fa-tv",
    cor: "#8d6e63"
  },
  {
    id: 2,
    nome: "Sofá 3 Lugares Retrátil",
    precoOriginal: 620000,
    precoAtual: 558000,
    desconto: -10,
    estrelas: 3.5,
    avaliacoes: 21,
    icone: "fas fa-couch",
    cor: "#90a4ae"
  },
  {
    id: 3,
    nome: "Espelho Redondo 60cm",
    precoOriginal: 22000,
    precoAtual: 19360,
    desconto: -12,
    estrelas: 4,
    avaliacoes: 16,
    icone: "fas fa-circle",
    cor: "#b0bec5"
  },
  {
    id: 4,
    nome: "Luminária de Chão Tripé",
    precoOriginal: 65000,
    precoAtual: 59800,
    desconto: -8,
    estrelas: 4,
    avaliacoes: 14,
    icone: "fas fa-lightbulb",
    cor: "#fdd835"
  },
  {
    id: 5,
    nome: "Cortina Blackout 2,80x1,70m",
    precoOriginal: 25000,
    precoAtual: 20000,
    desconto: -20,
    estrelas: 4,
    avaliacoes: 23,
    icone: "fas fa-grip-lines",
    cor: "#78909c"
  },
  {
    id: 6,
    nome: "Jogo de Cama Casal 4 Peças",
    precoOriginal: 18000,
    precoAtual: 15300,
    desconto: -15,
    estrelas: 4,
    avaliacoes: 18,
    icone: "fas fa-bed",
    cor: "#ce93d8"
  },

  // --- Linha 2 ---
  {
    id: 7,
    nome: "Mesa de Jantar 4 Cadeiras",
    precoOriginal: 360000,
    precoAtual: 324000,
    desconto: -10,
    estrelas: 3.5,
    avaliacoes: 17,
    icone: "fas fa-chair",
    cor: "#a1887f"
  },
  {
    id: 8,
    nome: "Planta Artificial Decorativa 50cm",
    precoOriginal: 9000,
    precoAtual: 7920,
    desconto: -12,
    estrelas: 3.5,
    avaliacoes: 11,
    icone: "fas fa-leaf",
    cor: "#66bb6a"
  },
  {
    id: 9,
    nome: "Caixa Organizadora 30L",
    precoOriginal: 6500,
    precoAtual: 5980,
    desconto: -8,
    estrelas: 4,
    avaliacoes: 13,
    icone: "fas fa-box",
    cor: "#bcaaa4"
  },
  {
    id: 10,
    nome: "Quadro Decorativo Kit 3 Peças",
    precoOriginal: 20000,
    precoAtual: 17000,
    desconto: -15,
    estrelas: 3.5,
    avaliacoes: 12,
    icone: "fas fa-image",
    cor: "#c8a96e"
  },
  {
    id: 11,
    nome: "Conjunto de Utensílios 7 Peças",
    precoOriginal: 8000,
    precoAtual: 7200,
    desconto: -10,
    estrelas: 3.5,
    avaliacoes: 16,
    icone: "fas fa-utensils",
    cor: "#546e7a"
  },
  {
    id: 12,
    nome: "Tapete Sala 2,00x1,40m",
    precoOriginal: 32000,
    precoAtual: 26240,
    desconto: -18,
    estrelas: 4,
    avaliacoes: 14,
    icone: "fas fa-border-all",
    cor: "#a0856c"
  }
];

// ---- ESTADO ----
let carrinho = [];
let favoritos = new Set();

// ---- UTILITÁRIOS ----
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT") + " Kz";
}

function gerarEstrelas(qtd) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (qtd >= i) {
      html += '<i class="fas fa-star"></i>';
    } else if (qtd >= i - 0.5) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

// ---- RENDERIZAR PRODUTOS ----
function renderizarProdutos(lista) {
  const grade = document.getElementById("gradeprodutos");
  grade.innerHTML = "";

  if (lista.length === 0) {
    grade.innerHTML = `
      <p style="color:#777; grid-column:1/-1; text-align:center; padding:40px 0;">
        Nenhum produto encontrado com esses filtros.
      </p>`;
    return;
  }

  lista.forEach(produto => {
    const favAtivo    = favoritos.has(produto.id) ? "ativo" : "";
    const iconeHeart  = favoritos.has(produto.id) ? "fas"   : "far";

    const card = document.createElement("div");
    card.className = "produto-card";

    card.innerHTML = `
      <span class="produto-badge">${produto.desconto}%</span>
      <button
        class="produto-favorito ${favAtivo}"
        onclick="alternarFavorito(${produto.id}, this)"
        title="Adicionar aos favoritos">
        <i class="${iconeHeart} fa-heart"></i>
      </button>

      <div class="produto-img-wrapper">
        <i class="${produto.icone} produto-icone" style="color:${produto.cor}"></i>
      </div>

      <div class="produto-info">
        <div class="produto-nome">${produto.nome}</div>
        <div class="produto-precos">
          <span class="preco-original">${formatarPreco(produto.precoOriginal)}</span>
          <span class="preco-atual">${formatarPreco(produto.precoAtual)}</span>
        </div>
        <div class="produto-rodape">
          <div class="estrelas">
            ${gerarEstrelas(produto.estrelas)}
            <span>(${produto.avaliacoes})</span>
          </div>
          <button
            class="btn-adicionar"
            onclick="adicionarAoCarrinho(${produto.id})"
            title="Adicionar ao carrinho">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    `;

    grade.appendChild(card);
  });
}

// ---- FAVORITOS ----
function alternarFavorito(id, botao) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
    botao.classList.remove("ativo");
    botao.querySelector("i").className = "far fa-heart";
    mostrarNotificacao("Removido dos favoritos.");
  } else {
    favoritos.add(id);
    botao.classList.add("ativo");
    botao.querySelector("i").className = "fas fa-heart";
    mostrarNotificacao("Adicionado aos favoritos ❤️");
  }
}

// ---- CARRINHO ----
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const existente = carrinho.find(item => item.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();
  mostrarNotificacao(`"${produto.nome}" adicionado ao carrinho! 🛒`);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const badge      = document.getElementById("badgeCarrinho");
  const itensDiv   = document.getElementById("carritoItens");
  const totalDiv   = document.getElementById("carritoTotal");
  const totalValor = document.getElementById("totalValor");

  const totalQtd = carrinho.reduce((s, i) => s + i.qtd, 0);
  badge.textContent = totalQtd;

  if (carrinho.length === 0) {
    itensDiv.innerHTML = '<p class="carrinho-vazio">O seu carrinho está vazio.</p>';
    totalDiv.style.display = "none";
    return;
  }

  itensDiv.innerHTML = carrinho.map(item => `
    <div class="carrinho-item-card">
      <div class="carrinho-item-nome">
        ${item.nome}
        <br><small style="color:#666">Qtd: ${item.qtd}</small>
      </div>
      <span class="carrinho-item-preco">${formatarPreco(item.precoAtual * item.qtd)}</span>
      <button
        class="carrinho-item-remover"
        onclick="removerDoCarrinho(${item.id})"
        title="Remover">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");

  const total = carrinho.reduce((s, i) => s + i.precoAtual * i.qtd, 0);
  totalValor.textContent = formatarPreco(total);
  totalDiv.style.display = "block";
}

// ---- ABRIR / FECHAR CARRINHO ----
document.getElementById("btnCarrinho").addEventListener("click", function () {
  document.getElementById("carritoSidebar").classList.add("aberto");
  document.getElementById("carritoOverlay").classList.add("visivel");
});

function fecharCarrinho() {
  document.getElementById("carritoSidebar").classList.remove("aberto");
  document.getElementById("carritoOverlay").classList.remove("visivel");
}

// ---- NOTIFICAÇÃO ----
let timerNotificacao;
function mostrarNotificacao(msg) {
  const el = document.getElementById("notificacao");
  el.textContent = msg;
  el.classList.add("visivel");
  clearTimeout(timerNotificacao);
  timerNotificacao = setTimeout(() => el.classList.remove("visivel"), 2600);
}

// ---- SLIDER DE PREÇO ----
const sliderPreco   = document.getElementById("sliderPreco");
const valorMaxPreco = document.getElementById("valorMaxPreco");

sliderPreco.addEventListener("input", function () {
  valorMaxPreco.textContent = parseInt(this.value).toLocaleString("pt-PT") + " Kz";
});

function filtrarPreco() {
  const maxPreco  = parseInt(sliderPreco.value);
  const filtrados = produtos.filter(p => p.precoAtual <= maxPreco);
  renderizarProdutos(filtrados);
  mostrarNotificacao(`${filtrados.length} produto(s) até ${maxPreco.toLocaleString("pt-PT")} Kz`);
}

// ---- BUSCA ----
document.getElementById("campoBusca").addEventListener("input", function () {
  const termo = this.value.toLowerCase().trim();
  renderizarProdutos(
    termo === "" ? produtos : produtos.filter(p => p.nome.toLowerCase().includes(termo))
  );
});

// ---- ORDENAÇÃO ----
document.getElementById("selectOrdenar").addEventListener("change", function () {
  let lista = [...produtos];
  switch (this.value) {
    case "Menor preço":  lista.sort((a, b) => a.precoAtual  - b.precoAtual);  break;
    case "Maior preço":  lista.sort((a, b) => b.precoAtual  - a.precoAtual);  break;
    case "Mais recentes":lista.sort((a, b) => b.id          - a.id);          break;
    default:             lista.sort((a, b) => b.avaliacoes  - a.avaliacoes);  break;
  }
  renderizarProdutos(lista);
});

// ---- FILTRO POR MARCA ----
document.querySelectorAll(".marcas-lista input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", function () {
    const selecionadas = [...document.querySelectorAll(".marcas-lista input:checked")]
      .map(i => i.parentElement.textContent.trim().split(" ")[0].toLowerCase());

    renderizarProdutos(
      selecionadas.length === 0
        ? produtos
        : produtos.filter(p => selecionadas.some(m => p.nome.toLowerCase().includes(m)))
    );
  });
});

// ---- PAGINAÇÃO ----
function mudaPagina(botao) {
  if (!botao || botao.classList.contains("pag-reticencias")) return;
  document.querySelectorAll(".pag-btn").forEach(b => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- INICIALIZAR ----
document.addEventListener("DOMContentLoaded", function () {
  renderizarProdutos(produtos);
  atualizarCarrinho();
});

/* ── Carrinho Global Sync ── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-carrinho,.btn-cart,.btn-add-cart,[data-add-cart]');
  if (!btn) return;
  const card = btn.closest('.produto-card,.card-produto,[data-id]');
  if (!card) return;
  const id   = parseInt(card.dataset.id || btn.dataset.id || btn.dataset.addCart);
  const nome = card.querySelector('h3,h4,.nome-produto,.prod-nome')?.textContent?.trim() || 'Produto';
  const preco= parseFloat((card.querySelector('.preco-atual,.preco,.valor')?.textContent||'0').replace(/[^\d]/g,'')) || 0;
  const img  = card.querySelector('img')?.src || '';
  if (typeof Carrinho !== 'undefined' && preco > 0) {
    Carrinho.adicionar({ id: id||Date.now(), nome, preco, imagem: img });
    e.stopPropagation();
  }
});
