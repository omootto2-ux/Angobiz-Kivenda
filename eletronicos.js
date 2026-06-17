/* ============================================================
   AngoBiz Kivenda - Eletrônicos | app.js
   Funcionalidade completa: produtos, filtros, carrinho, UI
   ============================================================ */

// ===================== DADOS DOS PRODUTOS =====================
const todosProdutos = [
  {
    id: 1,
    nome: "TV Samsung 43\" 4K",
    preco: 399000,
    avaliacao: 3.5,
    avaliacoes: 12,
    categoria: "Televisores",
    marca: "Samsung",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80"
  },
  {
    id: 2,
    nome: "Laptop HP 15s",
    preco: 550000,
    avaliacao: 4,
    avaliacoes: 18,
    categoria: "Computadores",
    marca: "HP",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
  },
  {
    id: 3,
    nome: "Smartphone iPhone 14",
    preco: 950000,
    avaliacao: 4.5,
    avaliacoes: 25,
    categoria: "Acessórios",
    marca: "Apple",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80"
  },
  {
    id: 4,
    nome: "Fones Sony WH-1000XM4",
    preco: 180000,
    avaliacao: 4,
    avaliacoes: 9,
    categoria: "Áudio",
    marca: "Sony",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
  },
  {
    id: 5,
    nome: "Caixa de Som JBL Flip 6",
    preco: 68900,
    avaliacao: 4,
    avaliacoes: 7,
    categoria: "Áudio",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80"
  },
  {
    id: 6,
    nome: "Console PlayStation 5",
    preco: 800000,
    avaliacao: 4.5,
    avaliacoes: 26,
    categoria: "Consolas",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&q=80"
  },
  {
    id: 7,
    nome: "Teclado Mecânico RGB",
    preco: 45000,
    avaliacao: 4,
    avaliacoes: 8,
    categoria: "Acessórios",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1555223853-b48c5f7e5f0c?w=300&q=80"
  },
  {
    id: 8,
    nome: "Mouse Gamer Logitech G502",
    preco: 78500,
    avaliacao: 4,
    avaliacoes: 11,
    categoria: "Acessórios",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80"
  },
  {
    id: 9,
    nome: "Monitor LG 24\" Full HD",
    preco: 120000,
    avaliacao: 4,
    avaliacoes: 6,
    categoria: "Computadores",
    marca: "LG",
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80"
  },
  {
    id: 10,
    nome: "Impressora HP DeskJet",
    preco: 85000,
    avaliacao: 3.5,
    avaliacoes: 10,
    categoria: "Computadores",
    marca: "HP",
    img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&q=80"
  },
  {
    id: 11,
    nome: "Roteador TP-Link AC1200",
    preco: 35000,
    avaliacao: 3.5,
    avaliacoes: 4,
    categoria: "Smart Home",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80"
  },
  {
    id: 12,
    nome: "Smartwatch Xiaomi Mi Band 7",
    preco: 28000,
    avaliacao: 3.5,
    avaliacoes: 15,
    categoria: "Acessórios",
    marca: "Outras",
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80"
  }
];

// ===================== ESTADO GLOBAL =====================
let carrinho = [];
let favoritos = new Set();
let produtosFiltrados = [...todosProdutos];
let filtroCategoria = null;
let filtroMarcas = [];
let filtroPrecoMax = 5000000;
let filtroPrecoMin = 0;

// ===================== FORMATAÇÃO =====================
function formatarPreco(valor) {
  return valor.toLocaleString('pt-AO') + ' Kz';
}

// ===================== ESTRELAS =====================
function renderEstrelas(nota) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (nota >= i) {
      html += '<i class="fa fa-star"></i>';
    } else if (nota >= i - 0.5) {
      html += '<i class="fa fa-star-half-alt"></i>';
    } else {
      html += '<i class="fa fa-star vazia"></i>';
    }
  }
  return html;
}

// ===================== RENDERIZAR PRODUTOS =====================
function renderizarProdutos(lista) {
  const grid = document.getElementById('gridProdutos');
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = '<p style="color:#888; font-size:0.9rem; grid-column:1/-1; text-align:center; padding:40px 0;">Nenhum produto encontrado com os filtros aplicados.</p>';
    atualizarTotal(0, 0);
    return;
  }

  lista.forEach((prod) => {
    const favClass = favoritos.has(prod.id) ? 'ativo' : '';
    const card = document.createElement('div');
    card.className = 'card-produto';
    card.setAttribute('data-id', prod.id);
    card.innerHTML = `
      <div class="card-produto-img">
        <img src="${prod.img}" alt="${prod.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x150/1a1a1a/888?text=Produto'"/>
        <button class="btn-favorito ${favClass}" onclick="toggleFavorito(${prod.id}, event)" title="Adicionar aos favoritos">
          <i class="${favoritos.has(prod.id) ? 'fa' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="card-produto-info">
        <div class="card-produto-nome">${prod.nome}</div>
        <div class="card-produto-preco">${formatarPreco(prod.preco)}</div>
        <div class="estrelas">
          ${renderEstrelas(prod.avaliacao)}
          <span class="qtd-avaliacoes">(${prod.avaliacoes})</span>
        </div>
        <button class="btn-adicionar" onclick="adicionarCarrinho(${prod.id})">
          <i class="fa fa-cart-plus"></i> Adicionar
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  atualizarTotal(lista.length, todosProdutos.length);
}

function atualizarTotal(exibindo, total) {
  const txt = document.getElementById('txtTotal');
  if (exibindo === 0) {
    txt.textContent = 'Nenhum produto encontrado';
  } else {
    txt.textContent = `Mostrando 1–${exibindo} de ${total} produtos`;
  }
}

// ===================== FILTROS =====================
function aplicarFiltros() {
  produtosFiltrados = todosProdutos.filter(p => {
    const passaCategoria = !filtroCategoria || p.categoria === filtroCategoria;
    const passaMarca = filtroMarcas.length === 0 || filtroMarcas.includes(p.marca);
    const passaPreco = p.preco >= filtroPrecoMin && p.preco <= filtroPrecoMax;
    return passaCategoria && passaMarca && passaPreco;
  });
  ordenarEExibir();
}

function filtrarCategoria(cat, e) {
  if (e) e.preventDefault();
  filtroCategoria = cat === filtroCategoria ? null : cat;

  // Atualizar visual do sidebar
  document.querySelectorAll('.sidebar-categorias a').forEach(a => {
    a.style.color = a.textContent === filtroCategoria ? '#f0a500' : '';
  });

  aplicarFiltros();
  mostrarToast(filtroCategoria ? `Filtrando: ${filtroCategoria}` : 'Filtro de categoria removido');
}

function filtrarMarca() {
  filtroMarcas = [];
  document.querySelectorAll('.sidebar-marcas input:checked').forEach(cb => {
    filtroMarcas.push(cb.value);
  });
  aplicarFiltros();
}

function aplicarFiltroPreco() {
  filtroPrecoMin = parseInt(document.getElementById('precoMin').value);
  filtroPrecoMax = parseInt(document.getElementById('precoMax').value);
  if (filtroPrecoMin > filtroPrecoMax) {
    [filtroPrecoMin, filtroPrecoMax] = [filtroPrecoMax, filtroPrecoMin];
  }
  aplicarFiltros();
  mostrarToast('Filtro de preço aplicado!');
}

function atualizarPreco() {
  const min = parseInt(document.getElementById('precoMin').value);
  const max = parseInt(document.getElementById('precoMax').value);
  document.getElementById('labelMin').textContent = formatarPreco(min);
  document.getElementById('labelMax').textContent = formatarPreco(max);
}

// ===================== ORDENAÇÃO =====================
function ordenarEExibir() {
  const criterio = document.getElementById('selectOrdenar').value;
  let lista = [...produtosFiltrados];

  switch (criterio) {
    case 'menor-preco':
      lista.sort((a, b) => a.preco - b.preco);
      break;
    case 'maior-preco':
      lista.sort((a, b) => b.preco - a.preco);
      break;
    case 'avaliacao':
      lista.sort((a, b) => b.avaliacao - a.avaliacao || b.avaliacoes - a.avaliacoes);
      break;
    default: // mais-vendidos
      lista.sort((a, b) => b.avaliacoes - a.avaliacoes);
  }

  renderizarProdutos(lista);
}

function ordenarProdutos() {
  ordenarEExibir();
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

// ===================== FAVORITOS =====================
function toggleFavorito(id, e) {
  e.stopPropagation();
  if (favoritos.has(id)) {
    favoritos.delete(id);
    mostrarToast('Removido dos favoritos');
  } else {
    favoritos.add(id);
    mostrarToast('Adicionado aos favoritos ❤️');
  }
  ordenarEExibir();
}

// ===================== CARRINHO =====================
function adicionarCarrinho(id) {
  const prod = todosProdutos.find(p => p.id === id);
  if (!prod) return;

  const existente = carrinho.find(c => c.id === id);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...prod, quantidade: 1 });
  }

  atualizarCarrinhoUI();
  mostrarToast(`"${prod.nome}" adicionado ao carrinho!`);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
  const badge = document.getElementById('carinhoBadge');
  const total = carrinho.reduce((s, c) => s + c.quantidade, 0);
  badge.textContent = total;

  const itensEl = document.getElementById('itensCarrinho');
  const totalEl = document.getElementById('totalCarrinho');
  const btnFinalizar = document.getElementById('btnFinalizar');

  if (carrinho.length === 0) {
    itensEl.innerHTML = '<p class="carrinho-vazio">O seu carrinho está vazio.</p>';
    totalEl.style.display = 'none';
    btnFinalizar.style.display = 'none';
    return;
  }

  let html = '';
  let totalPreco = 0;
  carrinho.forEach(c => {
    totalPreco += c.preco * c.quantidade;
    html += `
      <div class="item-carrinho">
        <img src="${c.img}" alt="${c.nome}" onerror="this.src='https://via.placeholder.com/60/1a1a1a/888?text=P'"/>
        <div class="item-carrinho-info">
          <div class="item-carrinho-nome">${c.nome}</div>
          <div class="item-carrinho-preco">${c.quantidade}x ${formatarPreco(c.preco)}</div>
        </div>
        <button class="item-carrinho-remover" onclick="removerDoCarrinho(${c.id})" title="Remover">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
  });

  itensEl.innerHTML = html;
  document.getElementById('valorTotal').textContent = formatarPreco(totalPreco);
  totalEl.style.display = 'flex';
  btnFinalizar.style.display = 'block';
}

function toggleCarrinho() {
  const modal = document.getElementById('modalCarrinho');
  const overlay = document.getElementById('overlayCarrinho');
  const aberto = modal.classList.toggle('aberto');
  overlay.classList.toggle('ativo', aberto);
}

function finalizarCompra() {
  mostrarToast('Obrigado pela sua compra! Processando pedido...');
  setTimeout(() => {
    carrinho = [];
    atualizarCarrinhoUI();
    toggleCarrinho();
  }, 1500);
}

// ===================== MENU CATEGORIAS =====================
function toggleMenuCategorias() {
  const menu = document.getElementById('menuCatLateral');
  const overlay = document.getElementById('overlayMenuCat');
  menu.classList.toggle('aberto');
  overlay.classList.toggle('ativo');
}

function fecharMenuCategorias() {
  document.getElementById('menuCatLateral').classList.remove('aberto');
  document.getElementById('overlayMenuCat').classList.remove('ativo');
}


// ===================== NEWSLETTER =====================
function subscrever() {
  const email = document.getElementById('emailNewsletter').value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    mostrarToast('Por favor, insira o seu e-mail.');
    return;
  }
  if (!regexEmail.test(email)) {
    mostrarToast('E-mail inválido. Tente novamente.');
    return;
  }
  mostrarToast(`Subscrito com sucesso! ✅ Bem-vindo, ${email}`);
  document.getElementById('emailNewsletter').value = '';
}

// ===================== TOAST NOTIFICAÇÃO =====================
let toastTimeout;
function mostrarToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visivel');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visivel');
  }, 3000);
}

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos(todosProdutos);
  atualizarCarrinhoUI();
  atualizarPreco();

  // Marcar link ativo na navegação
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-links > li > a').forEach(a => a.classList.remove('ativo'));
      this.classList.add('ativo');
    });
  });
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
