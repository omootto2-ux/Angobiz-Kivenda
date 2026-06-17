// ===================================================
//  ANGOBIZ KIVENDA - JAVASCRIPT PRINCIPAL
//  Produtos, Carrinho, Favoritos, Filtros, UI
// ===================================================

// ---- DADOS DOS PRODUTOS ----
const produtos = [
  // Linha 1
  {
    id: 1,
    nome: "Cadeira Executiva Ergonómica",
    precoOriginal: 120000,
    precoAtual: 102000,
    desconto: -15,
    estrelas: 3.5,
    avaliações: 28,
    icone: "fas fa-chair"
  },
  {
    id: 2,
    nome: "Mesa de Escritório 120x60cm",
    precoOriginal: 85000,
    precoAtual: 76500,
    desconto: -10,
    estrelas: 3.5,
    avaliações: 19,
    icone: "fas fa-border-all"
  },
  {
    id: 3,
    nome: "Impressora HP LaserJet Pro M404",
    precoOriginal: 220000,
    precoAtual: 193600,
    desconto: -12,
    estrelas: 4,
    avaliações: 16,
    icone: "fas fa-print"
  },
  {
    id: 4,
    nome: "Laptop Dell Vostro 15",
    precoOriginal: 550000,
    precoAtual: 506000,
    desconto: -8,
    estrelas: 3.5,
    avaliações: 21,
    icone: "fas fa-laptop"
  },
  {
    id: 5,
    nome: "Arquivo de Pastas A4 (Pack 5)",
    precoOriginal: 12500,
    precoAtual: 10000,
    desconto: -20,
    estrelas: 4,
    avaliações: 35,
    icone: "fas fa-folder"
  },
  {
    id: 6,
    nome: "Porta Canetas de Mesa",
    precoOriginal: 6000,
    precoAtual: 5100,
    desconto: -15,
    estrelas: 4,
    avaliações: 14,
    icone: "fas fa-pencil-alt"
  },
  // Linha 2
  {
    id: 7,
    nome: "Papel A4 Double A (500 folhas)",
    precoOriginal: 4200,
    precoAtual: 3780,
    desconto: -10,
    estrelas: 3.5,
    avaliações: 42,
    icone: "fas fa-file-alt"
  },
  {
    id: 8,
    nome: "Gaveteiro 3 Gavetas com Chave",
    precoOriginal: 90000,
    precoAtual: 79200,
    desconto: -12,
    estrelas: 3.5,
    avaliações: 11,
    icone: "fas fa-archive"
  },
  {
    id: 9,
    nome: "Calculadora Casio fx-991EX",
    precoOriginal: 18000,
    precoAtual: 16560,
    desconto: -8,
    estrelas: 4,
    avaliações: 23,
    icone: "fas fa-calculator"
  },
  {
    id: 10,
    nome: "Quadro Branco 90x60cm",
    precoOriginal: 22000,
    precoAtual: 18700,
    desconto: -15,
    estrelas: 3.5,
    avaliações: 17,
    icone: "fas fa-chalkboard"
  },
  {
    id: 11,
    nome: "Fragmentadora de Papel 10 Folhas",
    precoOriginal: 98000,
    precoAtual: 88200,
    desconto: -10,
    estrelas: 4,
    avaliações: 9,
    icone: "fas fa-cut"
  },
  {
    id: 12,
    nome: "Tinteiro HP 664 Preto",
    precoOriginal: 8500,
    precoAtual: 6970,
    desconto: -18,
    estrelas: 4,
    avaliações: 30,
    icone: "fas fa-ink-well"
  }
];

// ---- ESTADO DA APLICAÇÃO ----
let carrinho = [];
let favoritos = new Set();

// ---- FORMATAR PREÇO EM KWANZA ----
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT") + " Kz";
}

// ---- GERAR ESTRELAS ----
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
    grade.innerHTML = '<p style="color:#777; grid-column:1/-1; text-align:center; padding:40px 0;">Nenhum produto encontrado.</p>';
    return;
  }

  lista.forEach(produto => {
    const favAtivo = favoritos.has(produto.id) ? "ativo" : "";

    const card = document.createElement("div");
    card.className = "produto-card";
    card.innerHTML = `
      <span class="produto-badge">${produto.desconto}%</span>
      <button class="produto-favorito ${favAtivo}" onclick="alternarFavorito(${produto.id}, this)" title="Adicionar aos favoritos">
        <i class="${favoritos.has(produto.id) ? "fas" : "far"} fa-heart"></i>
      </button>

      <div class="produto-img-wrapper">
        <i class="${produto.icone} produto-icone"></i>
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
            <span>(${produto.avaliações})</span>
          </div>
          <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})" title="Adicionar ao carrinho">
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
    mostrarNotificacao("Removido dos favoritos");
  } else {
    favoritos.add(id);
    botao.classList.add("ativo");
    botao.querySelector("i").className = "fas fa-heart";
    mostrarNotificacao("Adicionado aos favoritos ❤️");
  }
}

// ---- ADICIONAR AO CARRINHO ----
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

// ---- REMOVER DO CARRINHO ----
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

// ---- ATUALIZAR UI DO CARRINHO ----
function atualizarCarrinho() {
  const badge = document.getElementById("badgeCarrinho");
  const itensDiv = document.getElementById("carritoItens");
  const totalDiv = document.getElementById("carritoTotal");
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
      <div class="carrinho-item-nome">${item.nome} <br><small style="color:#666">Qtd: ${item.qtd}</small></div>
      <span class="carrinho-item-preco">${formatarPreco(item.precoAtual * item.qtd)}</span>
      <button class="carrinho-item-remover" onclick="removerDoCarrinho(${item.id})" title="Remover">
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
  timerNotificacao = setTimeout(() => {
    el.classList.remove("visivel");
  }, 2400);
}

// ---- FILTRO POR PREÇO ----
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
  mostrarNotificacao(`A mostrar ${filtrados.length} produtos até ${maxPreco.toLocaleString("pt-PT")} Kz`);
}

// ---- BUSCA ----
document.getElementById("campoBusca").addEventListener("input", function () {
  const termo = this.value.toLowerCase().trim();
  if (termo === "") {
    renderizarProdutos(produtos);
    return;
  }
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );
  renderizarProdutos(filtrados);
});

// ---- PAGINAÇÃO ----
function mudaPagina(botao) {
  document.querySelectorAll(".pag-btn").forEach(b => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- ORDENAÇÃO ----
document.querySelector(".ordenar select").addEventListener("change", function () {
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
      lista.sort((a, b) => b.avaliações - a.avaliações);
  }
  renderizarProdutos(lista);
});

// ---- MARCAS: filtro por checkbox ----
document.querySelectorAll(".marcas-lista input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", function () {
    const marcasSelecionadas = [...document.querySelectorAll(".marcas-lista input:checked")]
      .map(i => i.parentElement.textContent.trim().split(" ")[0].toLowerCase());

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
