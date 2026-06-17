/* =========================================================
   ANGOBIZ KIVENDA – PROMOÇÕES | app.js
   ========================================================= */

// ─── BASE DE DADOS DE PRODUTOS ────────────────────────────────────────────────
const PRODUTOS = [
  {
    id: 1,
    nome: "Laptop Dell Inspiron 15",
    categoria: "Informática",
    marca: "Dell",
    desconto: 20,
    precoAtual: 450000,
    precoAntigo: 560000,
    avaliacoes: 42,
    estrelas: 4,
    estoque: true,
    icone: "fa-laptop",
    iconeClasse: "fas"
  },
  {
    id: 2,
    nome: "Smartphone Samsung Galaxy A14",
    categoria: "Telemóveis",
    marca: "Samsung",
    desconto: 15,
    precoAtual: 180000,
    precoAntigo: 210000,
    avaliacoes: 35,
    estrelas: 4,
    estoque: true,
    icone: "fa-mobile-alt",
    iconeClasse: "fas"
  },
  {
    id: 3,
    nome: "Fones Sony WH-1000XM4",
    categoria: "Electrónicos",
    marca: "Sony",
    desconto: 30,
    precoAtual: 180000,
    precoAntigo: 260000,
    avaliacoes: 28,
    estrelas: 5,
    estoque: true,
    icone: "fa-headphones",
    iconeClasse: "fas"
  },
  {
    id: 4,
    nome: "Furadeira Bosch GSB 550",
    categoria: "Ferramentas",
    marca: "Bosch",
    desconto: 25,
    precoAtual: 68000,
    precoAntigo: 90000,
    avaliacoes: 19,
    estrelas: 4,
    estoque: true,
    icone: "fa-tools",
    iconeClasse: "fas"
  },
  {
    id: 5,
    nome: "Relógio Masculino Curren 8395",
    categoria: "Moda & Beleza",
    marca: "Curren",
    desconto: 20,
    precoAtual: 35000,
    precoAntigo: 44000,
    avaliacoes: 16,
    estrelas: 5,
    estoque: true,
    icone: "fa-clock",
    iconeClasse: "fas"
  },
  {
    id: 6,
    nome: "Smart TV TCL 32\" HD",
    categoria: "Electrónicos",
    marca: "TCL",
    desconto: 18,
    precoAtual: 125000,
    precoAntigo: 152000,
    avaliacoes: 22,
    estrelas: 4,
    estoque: true,
    icone: "fa-tv",
    iconeClasse: "fas"
  },
  {
    id: 7,
    nome: "Ténis Nike Air Max 270",
    categoria: "Moda & Beleza",
    marca: "Nike",
    desconto: 10,
    precoAtual: 45000,
    precoAntigo: 50000,
    avaliacoes: 31,
    estrelas: 4,
    estoque: true,
    icone: "fa-shoe-prints",
    iconeClasse: "fas"
  },
  {
    id: 8,
    nome: "iPhone 13 128GB",
    categoria: "Telemóveis",
    marca: "Apple",
    desconto: 23,
    precoAtual: 780000,
    precoAntigo: 1010000,
    avaliacoes: 27,
    estrelas: 5,
    estoque: true,
    icone: "fa-mobile-alt",
    iconeClasse: "fas"
  },
  {
    id: 9,
    nome: "MacBook Air M2",
    categoria: "Informática",
    marca: "Apple",
    desconto: 12,
    precoAtual: 1250000,
    precoAntigo: 1420000,
    avaliacoes: 18,
    estrelas: 5,
    estoque: true,
    icone: "fa-laptop",
    iconeClasse: "fas"
  },
  {
    id: 10,
    nome: "Câmara Canon EOS 90D",
    categoria: "Electrónicos",
    marca: "Canon",
    desconto: 22,
    precoAtual: 560000,
    precoAntigo: 720000,
    avaliacoes: 14,
    estrelas: 5,
    estoque: false,
    icone: "fa-camera",
    iconeClasse: "fas"
  },
  {
    id: 11,
    nome: "Refrigerador Samsung 385L",
    categoria: "Casa & Decoração",
    marca: "Samsung",
    desconto: 15,
    precoAtual: 320000,
    precoAntigo: 377000,
    avaliacoes: 9,
    estrelas: 4,
    estoque: true,
    icone: "fa-thermometer-half",
    iconeClasse: "fas"
  },
  {
    id: 12,
    nome: "Ar Condicionado LG 12000 BTU",
    categoria: "Casa & Decoração",
    marca: "LG",
    desconto: 28,
    precoAtual: 195000,
    precoAntigo: 271000,
    avaliacoes: 11,
    estrelas: 4,
    estoque: true,
    icone: "fa-wind",
    iconeClasse: "fas"
  }
];

// ─── ESTADO DA APLICAÇÃO ──────────────────────────────────────────────────────
const estado = {
  carrinho: [],
  favoritos: new Set(),
  filtros: {
    categoria: "todas",
    precoMin: 5000,
    precoMax: 1000000,
    descontos: [],
    marcas: [],
    pesquisa: ""
  },
  ordenacao: "Mais recentes"
};

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────

/**
 * Formata número para moeda angolana (ex: 450.000 Kz)
 */
function formatarPreco(valor) {
  return valor.toLocaleString("pt-AO") + " Kz";
}

/**
 * Mostra uma notificação (toast)
 */
function mostrarToast(mensagem, tipo = "") {
  const toast = document.getElementById("toastMsg");
  toast.textContent = mensagem;
  toast.className = "toast visivel " + tipo;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.className = "toast";
  }, 2800);
}

// ─── RENDERIZAÇÃO DE PRODUTOS ─────────────────────────────────────────────────

/**
 * Gera as estrelas em HTML para um produto
 */
function gerarEstrelas(qtd) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= qtd) {
      html += '<i class="fas fa-star"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

/**
 * Gera o HTML de um card de produto
 */
function gerarCardProduto(produto) {
  const favoritoAtivo = estado.favoritos.has(produto.id) ? "ativo" : "";
  const iconeCoracaoClasse = estado.favoritos.has(produto.id) ? "fas" : "far";
  const estoqueTexto = produto.estoque ? "Em estoque" : "Sem estoque";
  const estoqueBadge = produto.estoque ? "" : " sem-estoque";

  return `
    <div class="card-produto" data-id="${produto.id}" data-categoria="${produto.categoria}" data-marca="${produto.marca}" data-desconto="${produto.desconto}" data-preco="${produto.precoAtual}">
      <div class="badge-desconto">-${produto.desconto}%</div>
      <button class="btn-favorito ${favoritoAtivo}" title="Adicionar à lista de desejos" data-fav-id="${produto.id}">
        <i class="${iconeCoracaoClasse} fa-heart"></i>
      </button>

      <div class="produto-imagem">
        <i class="${produto.iconeClasse} ${produto.icone}"></i>
      </div>

      <div class="produto-info">
        <div class="produto-nome">${produto.nome}</div>
        <div class="produto-categoria">${produto.categoria}</div>
        <div class="estrelas">
          ${gerarEstrelas(produto.estrelas)}
          <span class="num-avaliacoes">(${produto.avaliacoes})</span>
        </div>
        <div class="produto-precos">
          <span class="preco-atual">${formatarPreco(produto.precoAtual)}</span>
          <span class="preco-antigo">${formatarPreco(produto.precoAntigo)}</span>
        </div>
      </div>

      <div class="produto-rodape">
        <span class="badge-estoque${estoqueBadge}">${estoqueTexto}</span>
        <button class="btn-add-carrinho" title="Adicionar ao carrinho" data-carr-id="${produto.id}">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  `;
}

/**
 * Filtra e ordena produtos conforme estado atual
 */
function obterProdutosFiltrados() {
  let lista = [...PRODUTOS];

  // Filtro por categoria
  if (estado.filtros.categoria !== "todas") {
    lista = lista.filter(p => p.categoria === estado.filtros.categoria);
  }

  // Filtro por preço
  lista = lista.filter(p =>
    p.precoAtual >= estado.filtros.precoMin &&
    p.precoAtual <= estado.filtros.precoMax
  );

  // Filtro por desconto
  if (estado.filtros.descontos.length > 0) {
    const minDesconto = Math.min(...estado.filtros.descontos);
    lista = lista.filter(p => p.desconto >= minDesconto);
  }

  // Filtro por marca
  if (estado.filtros.marcas.length > 0) {
    lista = lista.filter(p => estado.filtros.marcas.includes(p.marca));
  }

  // Filtro por pesquisa
  if (estado.filtros.pesquisa.trim()) {
    const termo = estado.filtros.pesquisa.toLowerCase();
    lista = lista.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo) ||
      p.marca.toLowerCase().includes(termo)
    );
  }

  // Ordenação
  switch (estado.ordenacao) {
    case "Menor preço":
      lista.sort((a, b) => a.precoAtual - b.precoAtual);
      break;
    case "Maior preço":
      lista.sort((a, b) => b.precoAtual - a.precoAtual);
      break;
    case "Maior desconto":
      lista.sort((a, b) => b.desconto - a.desconto);
      break;
    case "Mais avaliados":
      lista.sort((a, b) => b.estrelas - a.estrelas || b.avaliacoes - a.avaliacoes);
      break;
    default:
      // Mais recentes = ordem original (id decrescente)
      lista.sort((a, b) => b.id - a.id);
      break;
  }

  return lista;
}

/**
 * Renderiza o grid de produtos
 */
function renderizarProdutos() {
  const grid = document.getElementById("gridProdutos");
  const textoResultados = document.getElementById("textoResultados");
  const lista = obterProdutosFiltrados();

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="sem-resultados">
        <i class="fas fa-search-minus"></i>
        <p>Nenhum produto encontrado com os filtros selecionados.</p>
        <button onclick="limparFiltros()" style="margin-top:16px; background:var(--vermelho); color:#fff; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-size:13px;">Limpar Filtros</button>
      </div>
    `;
    textoResultados.textContent = "Nenhum resultado encontrado";
    return;
  }

  const total = 62; // Total simulado (como na imagem)
  const mostrando = Math.min(lista.length, 24);
  textoResultados.textContent = `Mostrando 1–${mostrando} de ${total} resultados`;

  grid.innerHTML = lista.map(gerarCardProduto).join("");

  // Associar eventos aos botões gerados
  associarEventosProdutos();
}

/**
 * Associa eventos a botões dentro dos cards (favorito + carrinho)
 */
function associarEventosProdutos() {
  // Botões de favorito
  document.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const id = parseInt(this.dataset.favId);
      const produto = PRODUTOS.find(p => p.id === id);
      if (!produto) return;

      if (estado.favoritos.has(id)) {
        estado.favoritos.delete(id);
        this.classList.remove("ativo");
        this.innerHTML = '<i class="far fa-heart"></i>';
        mostrarToast(`${produto.nome} removido dos favoritos.`, "erro");
      } else {
        estado.favoritos.add(id);
        this.classList.add("ativo");
        this.innerHTML = '<i class="fas fa-heart"></i>';
        mostrarToast(`${produto.nome} adicionado aos favoritos! ❤️`, "sucesso");
      }
    });
  });

  // Botões de carrinho
  document.querySelectorAll(".btn-add-carrinho").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const id = parseInt(this.dataset.carrId);
      adicionarAoCarrinho(id);
    });
  });
}

// ─── CARRINHO ─────────────────────────────────────────────────────────────────

function adicionarAoCarrinho(idProduto) {
  const produto = PRODUTOS.find(p => p.id === idProduto);
  if (!produto) return;

  const existente = estado.carrinho.find(i => i.id === idProduto);
  if (existente) {
    existente.quantidade++;
  } else {
    estado.carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarBadgeCarrinho();
  renderizarCarrinho();
  mostrarToast(`${produto.nome} adicionado ao carrinho! 🛒`, "sucesso");
}

function removerDoCarrinho(idProduto) {
  estado.carrinho = estado.carrinho.filter(i => i.id !== idProduto);
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function alterarQuantidade(idProduto, delta) {
  const item = estado.carrinho.find(i => i.id === idProduto);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    removerDoCarrinho(idProduto);
    return;
  }
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function atualizarBadgeCarrinho() {
  const total = estado.carrinho.reduce((acc, i) => acc + i.quantidade, 0);
  document.getElementById("carrinhoBadge").textContent = total;
}

function renderizarCarrinho() {
  const corpo = document.getElementById("corpoCarrinho");
  const rodape = document.getElementById("rodapeCarrinho");
  const totalEl = document.getElementById("totalCarrinho");

  if (estado.carrinho.length === 0) {
    corpo.innerHTML = '<p class="carrinho-vazio"><i class="fas fa-shopping-cart" style="font-size:36px;opacity:.3;display:block;text-align:center;margin-bottom:12px;"></i>O seu carrinho está vazio.</p>';
    rodape.style.display = "none";
    return;
  }

  rodape.style.display = "block";

  let total = 0;
  let html = "";

  estado.carrinho.forEach(item => {
    total += item.precoAtual * item.quantidade;
    html += `
      <div class="item-carrinho">
        <div class="item-carr-icone">
          <i class="${item.iconeClasse} ${item.icone}"></i>
        </div>
        <div class="item-carr-info">
          <strong>${item.nome}</strong>
          <span>${formatarPreco(item.precoAtual)}</span>
          <div class="item-carr-qty">
            <button onclick="alterarQuantidade(${item.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="qty-num">${item.quantidade}</span>
            <button onclick="alterarQuantidade(${item.id}, +1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id})" title="Remover">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  });

  corpo.innerHTML = html;
  totalEl.textContent = formatarPreco(total);
}

function abrirCarrinho() {
  document.getElementById("modalCarrinho").classList.add("aberto");
  document.getElementById("overlayCarrinho").classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharCarrinhoFn() {
  document.getElementById("modalCarrinho").classList.remove("aberto");
  document.getElementById("overlayCarrinho").classList.remove("ativo");
  document.body.style.overflow = "";
}

// ─── FILTROS DA SIDEBAR ───────────────────────────────────────────────────────

/**
 * Atualiza o range fill do slider de preço
 */
function atualizarRangeFill() {
  const min = parseInt(document.getElementById("rangeMin").value);
  const max = parseInt(document.getElementById("rangeMax").value);
  const total = 1000000 - 5000;
  const fillEl = document.getElementById("rangeFill");
  const pctEsq = ((min - 5000) / total) * 100;
  const pctDir = ((max - 5000) / total) * 100;
  fillEl.style.left = pctEsq + "%";
  fillEl.style.width = (pctDir - pctEsq) + "%";

  document.getElementById("intervaloLabel").textContent =
    `Intervalo: AOA ${min.toLocaleString("pt-AO")} – AOA ${max.toLocaleString("pt-AO")}`;

  document.getElementById("inputMin").value = min;
  document.getElementById("inputMax").value = max;
}

function inicializarRangeSlider() {
  const rangeMin = document.getElementById("rangeMin");
  const rangeMax = document.getElementById("rangeMax");
  const inputMin = document.getElementById("inputMin");
  const inputMax = document.getElementById("inputMax");

  rangeMin.addEventListener("input", function () {
    let v = parseInt(this.value);
    let maxV = parseInt(rangeMax.value);
    if (v > maxV - 5000) { this.value = maxV - 5000; v = maxV - 5000; }
    estado.filtros.precoMin = v;
    atualizarRangeFill();
  });

  rangeMax.addEventListener("input", function () {
    let v = parseInt(this.value);
    let minV = parseInt(rangeMin.value);
    if (v < minV + 5000) { this.value = minV + 5000; v = minV + 5000; }
    estado.filtros.precoMax = v;
    atualizarRangeFill();
  });

  inputMin.addEventListener("change", function () {
    let v = Math.max(5000, Math.min(parseInt(this.value) || 5000, estado.filtros.precoMax - 5000));
    this.value = v;
    rangeMin.value = v;
    estado.filtros.precoMin = v;
    atualizarRangeFill();
  });

  inputMax.addEventListener("change", function () {
    let v = Math.min(1000000, Math.max(parseInt(this.value) || 1000000, estado.filtros.precoMin + 5000));
    this.value = v;
    rangeMax.value = v;
    estado.filtros.precoMax = v;
    atualizarRangeFill();
  });

  atualizarRangeFill();
}

/**
 * Inicializa filtros de desconto
 */
function inicializarFiltrosDesconto() {
  const checks = document.querySelectorAll("#listaDescontos input[type='checkbox']");
  checks.forEach(cb => {
    cb.addEventListener("change", function () {
      const val = parseInt(this.value);
      if (this.checked) {
        if (!estado.filtros.descontos.includes(val)) {
          estado.filtros.descontos.push(val);
        }
      } else {
        estado.filtros.descontos = estado.filtros.descontos.filter(d => d !== val);
      }
    });
  });
}

/**
 * Inicializa filtros de marca
 */
function inicializarFiltrosMarca() {
  const checks = document.querySelectorAll("#listaMarcas input[type='checkbox']");
  checks.forEach(cb => {
    cb.addEventListener("change", function () {
      const val = this.value;
      if (this.checked) {
        if (!estado.filtros.marcas.includes(val)) {
          estado.filtros.marcas.push(val);
        }
      } else {
        estado.filtros.marcas = estado.filtros.marcas.filter(m => m !== val);
      }
    });
  });

  // Pesquisa de marca
  document.getElementById("pesquisaMarca").addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    document.querySelectorAll("#listaMarcas li").forEach(li => {
      const label = li.querySelector("label");
      if (label) {
        const texto = label.textContent.toLowerCase();
        li.style.display = texto.includes(termo) ? "" : "none";
      }
    });
  });

  // Ver mais marcas
  const btnVerMais = document.getElementById("btnVerMais");
  let expandido = false;
  btnVerMais.addEventListener("click", function (e) {
    e.preventDefault();
    expandido = !expandido;
    document.querySelectorAll(".marca-extra").forEach(el => {
      el.classList.toggle("oculto", !expandido);
    });
    this.innerHTML = expandido ? "Ver menos &lsaquo;" : "Ver mais &rsaquo;";
  });
}

/**
 * Inicializa categorias na sidebar
 */
function inicializarCategoriasSidebar() {
  const itens = document.querySelectorAll("#listaCategoriasSidebar li");
  itens.forEach(li => {
    li.addEventListener("click", function (e) {
      e.preventDefault();
      itens.forEach(i => i.classList.remove("ativo"));
      this.classList.add("ativo");
      estado.filtros.categoria = this.dataset.cat;
      renderizarProdutos();
    });
  });
}

/**
 * Botão FILTRAR
 */
function inicializarBotaoFiltrar() {
  document.getElementById("btnFiltrar").addEventListener("click", function () {
    renderizarProdutos();
    mostrarToast("Filtros aplicados! ✅", "sucesso");
  });
}

/**
 * Limpa todos os filtros
 */
function limparFiltros() {
  estado.filtros.categoria = "todas";
  estado.filtros.precoMin = 5000;
  estado.filtros.precoMax = 1000000;
  estado.filtros.descontos = [];
  estado.filtros.marcas = [];
  estado.filtros.pesquisa = "";

  // Reset UI
  document.getElementById("rangeMin").value = 5000;
  document.getElementById("rangeMax").value = 1000000;
  document.getElementById("inputMin").value = 5000;
  document.getElementById("inputMax").value = 1000000;
  atualizarRangeFill();

  document.querySelectorAll(".lista-checkboxes input[type='checkbox']").forEach(cb => {
    cb.checked = false;
  });

  document.querySelectorAll("#listaCategoriasSidebar li").forEach(li => li.classList.remove("ativo"));
  document.querySelector("#listaCategoriasSidebar li[data-cat='todas']").classList.add("ativo");

  document.getElementById("inputPesquisa").value = "";

  renderizarProdutos();
  mostrarToast("Filtros limpos.", "");
}

// ─── ORDENAÇÃO ────────────────────────────────────────────────────────────────

function inicializarOrdenacao() {
  const sels = [document.getElementById("selectOrdenar"), document.getElementById("selectOrdenarInline")];
  sels.forEach(sel => {
    if (!sel) return;
    sel.addEventListener("change", function () {
      estado.ordenacao = this.value;
      // Sincroniza os dois selects
      sels.forEach(s => { if (s && s !== this) s.value = this.value; });
      renderizarProdutos();
    });
  });
}

// ─── PESQUISA ─────────────────────────────────────────────────────────────────

function inicializarPesquisa() {
  const input = document.getElementById("inputPesquisa");
  const btnPesquisar = document.getElementById("btnPesquisar");

  function executarPesquisa() {
    estado.filtros.pesquisa = input.value;
    renderizarProdutos();
    if (input.value.trim()) {
      mostrarToast(`A pesquisar por "${input.value}"…`);
    }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") executarPesquisa();
  });

  btnPesquisar.addEventListener("click", executarPesquisa);
}

// ─── DROPDOWNS DO CABEÇALHO ───────────────────────────────────────────────────

function inicializarDropdownsHeader() {
  // Dropdown de categorias na barra de pesquisa
  const btnDrop = document.getElementById("btnDropCategoria");
  const menuDrop = document.getElementById("menuDropCategoria");

  btnDrop.addEventListener("click", function (e) {
    e.stopPropagation();
    menuDrop.classList.toggle("aberto");
  });

  menuDrop.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      btnDrop.childNodes[0].textContent = this.textContent + " ";
      menuDrop.classList.remove("aberto");
      // Sincroniza filtro de categoria
      const cat = this.textContent.trim();
      estado.filtros.categoria = cat;
      document.querySelectorAll("#listaCategoriasSidebar li").forEach(li => li.classList.remove("ativo"));
      const liMatch = document.querySelector(`#listaCategoriasSidebar li[data-cat="${cat}"]`);
      if (liMatch) liMatch.classList.add("ativo");
      else document.querySelector("#listaCategoriasSidebar li[data-cat='todas']").classList.add("ativo");
      renderizarProdutos();
    });
  });

  // Dropdown conta
  const contaBtn = document.getElementById("minhaContaBtn");
  const dropConta = document.getElementById("dropdownConta");

  contaBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropConta.classList.toggle("aberto");
  });

  // Fechar ao clicar fora
  document.addEventListener("click", function () {
    menuDrop.classList.remove("aberto");
    dropConta.classList.remove("aberto");
  });
}

// ─── MEGA MENU (TODAS CATEGORIAS) ────────────────────────────────────────────

function inicializarMegaMenu() {
  const navCats = document.getElementById("todasCategoriasNav");
  const megaMenu = document.getElementById("megaMenu");
  let aberto = false;

  navCats.addEventListener("click", function (e) {
    e.stopPropagation();
    aberto = !aberto;
    megaMenu.classList.toggle("aberto", aberto);
    document.getElementById("iconeFecharCats").style.display = aberto ? "inline" : "none";
  });

  megaMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const cat = this.dataset.cat;
      estado.filtros.categoria = cat;

      document.querySelectorAll("#listaCategoriasSidebar li").forEach(li => li.classList.remove("ativo"));
      const liMatch = document.querySelector(`#listaCategoriasSidebar li[data-cat="${cat}"]`);
      if (liMatch) liMatch.classList.add("ativo");

      renderizarProdutos();
      megaMenu.classList.remove("aberto");
      aberto = false;
      mostrarToast(`Categoria: ${cat}`);
    });
  });

  document.addEventListener("click", function () {
    megaMenu.classList.remove("aberto");
    aberto = false;
    document.getElementById("iconeFecharCats").style.display = "none";
  });

  megaMenu.addEventListener("click", e => e.stopPropagation());
}

// ─── CARRINHO (BOTÃO E MODAL) ─────────────────────────────────────────────────

function inicializarCarrinho() {
  document.getElementById("carrinhoBtn").addEventListener("click", abrirCarrinho);
  document.getElementById("fecharCarrinho").addEventListener("click", fecharCarrinhoFn);
  document.getElementById("overlayCarrinho").addEventListener("click", fecharCarrinhoFn);

  document.querySelector(".btn-finalizar").addEventListener("click", function () {
    if (estado.carrinho.length === 0) {
      mostrarToast("O seu carrinho está vazio!", "erro");
      return;
    }
    mostrarToast("Pedido finalizado! Obrigado pela sua compra. 🎉", "sucesso");
    estado.carrinho = [];
    atualizarBadgeCarrinho();
    renderizarCarrinho();
    setTimeout(fecharCarrinhoFn, 1500);
  });
}

// ─── BOTÃO "VER OFERTAS" DO BANNER ───────────────────────────────────────────

function inicializarBannerBtn() {
  document.getElementById("btnVerOfertas").addEventListener("click", function () {
    document.getElementById("gridProdutos").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ─── LINKS DA NAVEGAÇÃO ───────────────────────────────────────────────────────

function inicializarNavegacao() {
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("ativo"));
      this.classList.add("ativo");
    });
  });
}

// ─── INICIALIZAÇÃO GERAL ──────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  // Renderiza produtos
  renderizarProdutos();

  // Inicializa componentes
  inicializarRangeSlider();
  inicializarFiltrosDesconto();
  inicializarFiltrosMarca();
  inicializarCategoriasSidebar();
  inicializarBotaoFiltrar();
  inicializarOrdenacao();
  inicializarPesquisa();
  inicializarDropdownsHeader();
  inicializarMegaMenu();
  inicializarCarrinho();
  inicializarBannerBtn();
  inicializarNavegacao();

  // Carrinho inicial com 4 itens (como na imagem)
  adicionarAoCarrinho(1);
  adicionarAoCarrinho(2);
  adicionarAoCarrinho(3);
  adicionarAoCarrinho(8);

  // Toast de boas-vindas
  setTimeout(() => {
    mostrarToast("Bem-vindo à AngoBiz Kivenda! 🛍️", "sucesso");
  }, 800);
});
