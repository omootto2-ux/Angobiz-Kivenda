// ===================================================
//  ANGOBIZ KIVENDA — INDÚSTRIA — JAVASCRIPT
//  Produtos, Carrinho, Favoritos, Filtros, UI
// ===================================================

// ---- DADOS DOS PRODUTOS ----
const produtos = [
  // Linha 1
  {
    id: 1,
    nome: "Máquina de Solda Inversora MMA-250A",
    precoOriginal: 120000,
    precoAtual: 102000,
    desconto: -15,
    estrelas: 4,
    avaliacoes: 24,
    icone: "fas fa-bolt",
    cor: "#f39c12"
  },
  {
    id: 2,
    nome: "Compressor de Ar 50L 2HP",
    precoOriginal: 185000,
    precoAtual: 163000,
    desconto: -12,
    estrelas: 3.5,
    avaliacoes: 19,
    icone: "fas fa-wind",
    cor: "#3498db"
  },
  {
    id: 3,
    nome: "Gerador a Gasolina 5.5kVA",
    precoOriginal: 450000,
    precoAtual: 405000,
    desconto: -10,
    estrelas: 4,
    avaliacoes: 17,
    icone: "fas fa-plug",
    cor: "#e67e22"
  },
  {
    id: 4,
    nome: "Furadeira de Impacto 750W Makita",
    precoOriginal: 68500,
    precoAtual: 63000,
    desconto: -8,
    estrelas: 4,
    avaliacoes: 22,
    icone: "fas fa-tools",
    cor: "#27ae60"
  },
  {
    id: 5,
    nome: "Esmerilhadeira Angular 115mm Bosch 800W",
    precoOriginal: 65000,
    precoAtual: 53000,
    desconto: -18,
    estrelas: 4,
    avaliacoes: 16,
    icone: "fas fa-cog",
    cor: "#95a5a6"
  },
  {
    id: 6,
    nome: "Capacete de Segurança Industrial",
    precoOriginal: 3500,
    precoAtual: 3000,
    desconto: -14,
    estrelas: 4,
    avaliacoes: 13,
    icone: "fas fa-hard-hat",
    cor: "#f1c40f"
  },
  // Linha 2
  {
    id: 7,
    nome: "Máscara de Solda Automática Solar",
    precoOriginal: 28000,
    precoAtual: 25200,
    desconto: -10,
    estrelas: 3.5,
    avaliacoes: 11,
    icone: "fas fa-user-shield",
    cor: "#8e44ad"
  },
  {
    id: 8,
    nome: "Bomba de Água Periférica 1HP",
    precoOriginal: 95000,
    precoAtual: 83600,
    desconto: -12,
    estrelas: 3.5,
    avaliacoes: 14,
    icone: "fas fa-tint",
    cor: "#2980b9"
  },
  {
    id: 9,
    nome: "Kit Ferramentas 110 Peças Makita",
    precoOriginal: 45000,
    precoAtual: 38200,
    desconto: -15,
    estrelas: 4,
    avaliacoes: 20,
    icone: "fas fa-toolbox",
    cor: "#27ae60"
  },
  {
    id: 10,
    nome: "Alicate Amperímetro Digital 600A",
    precoOriginal: 42000,
    precoAtual: 38600,
    desconto: -8,
    estrelas: 3.5,
    avaliacoes: 10,
    icone: "fas fa-ruler-combined",
    cor: "#e74c3c"
  },
  {
    id: 11,
    nome: "Bota de Segurança com Biqueira Aço",
    precoOriginal: 18000,
    precoAtual: 14400,
    desconto: -20,
    estrelas: 4,
    avaliacoes: 15,
    icone: "fas fa-shoe-prints",
    cor: "#795548"
  },
  {
    id: 12,
    nome: "Quadro Elétrico de Comando Trifásico",
    precoOriginal: 120000,
    precoAtual: 108000,
    desconto: -10,
    estrelas: 3.5,
    avaliacoes: 9,
    icone: "fas fa-server",
    cor: "#607d8b"
  }
];

// ---- ESTADO ----
let carrinho = [];
let favoritos = new Set();

// ---- FORMATAÇÃO ----
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT") + " Kz";
}

// ---- ESTRELAS ----
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
    grade.innerHTML = '<p style="color:#777; grid-column:1/-1; text-align:center; padding:40px 0;">Nenhum produto encontrado com esses filtros.</p>';
    return;
  }

  lista.forEach(produto => {
    const favAtivo = favoritos.has(produto.id) ? "ativo" : "";
    const iconeHeart = favoritos.has(produto.id) ? "fas" : "far";

    const card = document.createElement("div");
    card.className = "produto-card";

    card.innerHTML = `
      <span class="produto-badge">${produto.desconto}%</span>
      <button class="produto-favorito ${favAtivo}"
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
          <button class="btn-adicionar"
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
      <button class="carrinho-item-remover"
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
const sliderPreco = document.getElementById("sliderPreco");
const valorMaxPreco = document.getElementById("valorMaxPreco");

sliderPreco.addEventListener("input", function () {
  const val = parseInt(this.value);
  valorMaxPreco.textContent = val.toLocaleString("pt-PT") + " Kz";
});

function filtrarPreco() {
  const maxPreco = parseInt(sliderPreco.value);
  const filtrados = produtos.filter(p => p.precoAtual <= maxPreco);
  renderizarProdutos(filtrados);
  mostrarNotificacao(`${filtrados.length} produto(s) até ${maxPreco.toLocaleString("pt-PT")} Kz`);
}

// ---- BUSCA ----
document.getElementById("campoBusca").addEventListener("input", function () {
  const termo = this.value.toLowerCase().trim();
  if (termo === "") {
    renderizarProdutos(produtos);
    return;
  }
  const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
  renderizarProdutos(filtrados);
});

// ---- ORDENAÇÃO ----
document.getElementById("selectOrdenar").addEventListener("change", function () {
  let lista = [...produtos];
  switch (this.value) {
    case "Menor preço":
      lista.sort((a, b) => a.precoAtual - b.precoAtual);
      break;
    case "Maior preço":
      lista.sort((a, b) => b.precoAtual - a.precoAtual);
      break;
    case "Mais recentes":
      lista.sort((a, b) => b.id - a.id);
      break;
    default:
      lista.sort((a, b) => b.avaliacoes - a.avaliacoes);
  }
  renderizarProdutos(lista);
});

// ---- FILTRO POR MARCA (checkboxes) ----
document.querySelectorAll(".marcas-lista input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", function () {
    const marcasSelecionadas = [
      ...document.querySelectorAll(".marcas-lista input:checked")
    ].map(i => i.parentElement.textContent.trim().split(" ")[0].toLowerCase());

    if (marcasSelecionadas.length === 0) {
      renderizarProdutos(produtos);
      return;
    }

    const filtrados = produtos.filter(p =>
      marcasSelecionadas.some(m => p.nome.toLowerCase().includes(m))
    );
    renderizarProdutos(filtrados);
  });
});

// ---- PAGINAÇÃO ----
function mudaPagina(botao) {
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
