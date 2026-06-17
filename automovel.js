// ======================================================
//  ANGOBIZ KIVENDA — AUTOMÓVEL — JAVASCRIPT
//  Produtos, Carrinho, Favoritos, Filtros, Ordenação
// ======================================================

// ---- DADOS DOS 12 PRODUTOS (exatos da imagem) ----
const produtos = [

  // ===== LINHA 1 =====
  {
    id: 1,
    nome: "Pneu 225/45 R17 94W XL",
    precoOriginal: 85000,
    precoAtual:    72250,
    desconto:      -15,
    estrelas:      4,
    avaliacoes:    32,
    icone:         "fas fa-circle-notch",
    cor:           "#555"
  },
  {
    id: 2,
    nome: "Óleo de Motor Shell Helix HX7 5W-30 4L",
    precoOriginal: 18000,
    precoAtual:    16200,
    desconto:      -10,
    estrelas:      4,
    avaliacoes:    45,
    icone:         "fas fa-oil-can",
    cor:           "#e74c3c"
  },
  {
    id: 3,
    nome: "Bateria Varta Blue Dynamic 60Ah",
    precoOriginal: 55000,
    precoAtual:    48400,
    desconto:      -12,
    estrelas:      4,
    avaliacoes:    28,
    icone:         "fas fa-car-battery",
    cor:           "#3498db"
  },
  {
    id: 4,
    nome: "Discos de Travão Dianteiros Toyota Corolla",
    precoOriginal: 30000,
    precoAtual:    27600,
    desconto:      -8,
    estrelas:      3.5,
    avaliacoes:    19,
    icone:         "fas fa-cog",
    cor:           "#95a5a6"
  },
  {
    id: 5,
    nome: "Lâmpadas LED H7 6000K",
    precoOriginal: 12500,
    precoAtual:    10000,
    desconto:      -20,
    estrelas:      4,
    avaliacoes:    23,
    icone:         "fas fa-lightbulb",
    cor:           "#f1c40f"
  },
  {
    id: 6,
    nome: "Ecrã Multimédia 7\" USB/Bluetooth",
    precoOriginal: 45000,
    precoAtual:    38250,
    desconto:      -15,
    estrelas:      4,
    avaliacoes:    17,
    icone:         "fas fa-tablet-alt",
    cor:           "#2980b9"
  },

  // ===== LINHA 2 =====
  {
    id: 7,
    nome: "Alternador 12V 90A",
    precoOriginal: 85000,
    precoAtual:    76500,
    desconto:      -10,
    estrelas:      3.5,
    avaliacoes:    14,
    icone:         "fas fa-bolt",
    cor:           "#e0a818"
  },
  {
    id: 8,
    nome: "Amortecedores Desportivos (Conjunto 4)",
    precoOriginal: 70000,
    precoAtual:    61600,
    desconto:      -12,
    estrelas:      4,
    avaliacoes:    16,
    icone:         "fas fa-compress-alt",
    cor:           "#e74c3c"
  },
  {
    id: 9,
    nome: "Capas de Banco Universal Premium",
    precoOriginal: 25000,
    precoAtual:    23000,
    desconto:      -8,
    estrelas:      4,
    avaliacoes:    20,
    icone:         "fas fa-couch",
    cor:           "#2c3e50"
  },
  {
    id: 10,
    nome: "Óleo de Motor Mobil Super 3000 5W-40 4L",
    precoOriginal: 20000,
    precoAtual:    17000,
    desconto:      -15,
    estrelas:      4,
    avaliacoes:    33,
    icone:         "fas fa-flask",
    cor:           "#c0392b"
  },
  {
    id: 11,
    nome: "Câmara de Marcha Atrás Visão Noturna",
    precoOriginal: 15000,
    precoAtual:    13500,
    desconto:      -10,
    estrelas:      4,
    avaliacoes:    22,
    icone:         "fas fa-camera",
    cor:           "#1abc9c"
  },
  {
    id: 12,
    nome: "Aspirador de Carro 12V 120W",
    precoOriginal: 9000,
    precoAtual:    7380,
    desconto:      -18,
    estrelas:      4,
    avaliacoes:    18,
    icone:         "fas fa-wind",
    cor:           "#8e44ad"
  }
];

// ---- ESTADO GLOBAL ----
let carrinho  = [];
let favoritos = new Set();

// ---- UTILITÁRIOS ----
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT") + " Kz";
}

function gerarEstrelas(qtd) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if      (qtd >= i)       html += '<i class="fas fa-star"></i>';
    else if (qtd >= i - 0.5) html += '<i class="fas fa-star-half-alt"></i>';
    else                     html += '<i class="far fa-star"></i>';
  }
  return html;
}

// ---- RENDERIZAR PRODUTOS ----
function renderizarProdutos(lista) {
  const grade = document.getElementById("gradeprodutos");
  grade.innerHTML = "";

  if (lista.length === 0) {
    grade.innerHTML = `<p style="color:#777;grid-column:1/-1;text-align:center;padding:40px 0;">
      Nenhum produto encontrado com esses filtros.</p>`;
    return;
  }

  lista.forEach(produto => {
    const favAtivo   = favoritos.has(produto.id) ? "ativo" : "";
    const iconeHeart = favoritos.has(produto.id) ? "fas"   : "far";

    const card = document.createElement("div");
    card.className = "produto-card";

    card.innerHTML = `
      <span class="produto-badge">${produto.desconto}%</span>
      <button
        class="produto-favorito ${favAtivo}"
        onclick="alternarFavorito(${produto.id}, this)"
        title="Favorito">
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

// ---- CARRINHO — ADICIONAR ----
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

// ---- CARRINHO — REMOVER ----
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

// ---- CARRINHO — ATUALIZAR UI ----
function atualizarCarrinho() {
  const badge      = document.getElementById("badgeCarrinho");
  const itensDiv   = document.getElementById("carritoItens");
  const totalDiv   = document.getElementById("carritoTotal");
  const totalValor = document.getElementById("totalValor");

  // badge
  const totalQtd = carrinho.reduce((s, i) => s + i.qtd, 0);
  badge.textContent = totalQtd;

  // lista vazia
  if (carrinho.length === 0) {
    itensDiv.innerHTML = '<p class="carrinho-vazio">O seu carrinho está vazio.</p>';
    totalDiv.style.display = "none";
    return;
  }

  // itens
  itensDiv.innerHTML = carrinho.map(item => `
    <div class="carrinho-item-card">
      <div class="carrinho-item-nome">
        ${item.nome}<br>
        <small style="color:#666">Qtd: ${item.qtd}</small>
      </div>
      <span class="carrinho-item-preco">${formatarPreco(item.precoAtual * item.qtd)}</span>
      <button class="carrinho-item-remover"
        onclick="removerDoCarrinho(${item.id})" title="Remover">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");

  // total
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

// ---- NOTIFICAÇÃO TOAST ----
let timerNotificacao;
function mostrarNotificacao(msg) {
  const el = document.getElementById("notificacao");
  el.textContent = msg;
  el.classList.add("visivel");
  clearTimeout(timerNotificacao);
  timerNotificacao = setTimeout(() => el.classList.remove("visivel"), 2800);
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

// ---- BUSCA EM TEMPO REAL ----
document.getElementById("campoBusca").addEventListener("input", function () {
  const termo = this.value.toLowerCase().trim();
  renderizarProdutos(
    termo === ""
      ? produtos
      : produtos.filter(p => p.nome.toLowerCase().includes(termo))
  );
});

// ---- ORDENAÇÃO ----
document.getElementById("selectOrdenar").addEventListener("change", function () {
  let lista = [...produtos];
  switch (this.value) {
    case "Menor preço":   lista.sort((a, b) => a.precoAtual  - b.precoAtual);  break;
    case "Maior preço":   lista.sort((a, b) => b.precoAtual  - a.precoAtual);  break;
    case "Mais recentes": lista.sort((a, b) => b.id          - a.id);          break;
    default:              lista.sort((a, b) => b.avaliacoes  - a.avaliacoes);  break;
  }
  renderizarProdutos(lista);
});

// ---- FILTRO POR MARCA (checkboxes) ----
document.querySelectorAll(".marcas-lista input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", function () {
    const selecionadas = [
      ...document.querySelectorAll(".marcas-lista input:checked")
    ].map(i => i.parentElement.textContent.trim().split(" ")[0].toLowerCase());

    renderizarProdutos(
      selecionadas.length === 0
        ? produtos
        : produtos.filter(p =>
            selecionadas.some(m => p.nome.toLowerCase().includes(m))
          )
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

// Botão próxima página
document.querySelector(".pag-prox").addEventListener("click", function () {
  const atual = document.querySelector(".pag-btn.ativo");
  const todos  = [...document.querySelectorAll(".pag-btn:not(.pag-reticencias):not(.pag-prox)")];
  const idx    = todos.indexOf(atual);
  if (idx < todos.length - 1) mudaPagina(todos[idx + 1]);
});

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
