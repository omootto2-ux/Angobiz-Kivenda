/**
 * ANGOBIZ KIVENDA — MERCADO DATA JS
 * Preenche produtosGrid e servicosGrid com dados do DB
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Parâmetros de URL ── */
  const params  = new URLSearchParams(window.location.search);
  const buscaQ  = params.get('q') || '';
  const catQ    = params.get('cat') || '';

  if (buscaQ && document.getElementById('inputBusca')) {
    document.getElementById('inputBusca').value = buscaQ;
  }

  /* ── Carregar grids ── */
  carregarProdutos();
  carregarServicos();

  /* ── Filtro da barra de busca interna ── */
  const searchInput = document.getElementById('searchInput') || document.getElementById('buscaMercado');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      carregarProdutos(searchInput.value);
      carregarServicos(searchInput.value);
    });
  }

  /* ── Override das funções de filtro do mercado.js ── */
  window._filtroCategoria = '';
  window._filtroQ         = buscaQ;

  /* Se vier busca da home, já filtra */
  if (buscaQ || catQ) {
    window._filtroQ        = buscaQ;
    window._filtroCategoria = catQ;
    carregarProdutos(buscaQ, catQ);
    carregarServicos(buscaQ);
  }
});

function carregarProdutos(q, cat) {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;

  let lista = DB.produtos.ativos();

  const busca    = q    !== undefined ? q    : (window._filtroQ        || '');
  const catFilt  = cat  !== undefined ? cat  : (window._filtroCategoria || '');

  if (busca)   lista = lista.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.categoria||'').toLowerCase().includes(busca.toLowerCase()) ||
    (p.marca||'').toLowerCase().includes(busca.toLowerCase())
  );
  if (catFilt) lista = lista.filter(p =>
    (p.categoria||'').toLowerCase().includes(catFilt.toLowerCase())
  );

  /* Atualizar contador */
  const sub = document.getElementById('subProdutos');
  if (sub) sub.textContent = `Mostrando ${lista.length} produto${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#aaa">
      <i class="fas fa-search" style="font-size:3rem;color:#c9a227;display:block;margin-bottom:16px"></i>
      <h3 style="color:#fff;margin:0 0 10px">Nenhum produto encontrado</h3>
      <p>${busca ? `Sem resultados para "${busca}"` : 'Sem produtos nesta categoria.'}</p>
      ${busca ? `<a href="mercado.html" style="color:#c9a227;margin-top:12px;display:inline-block">Ver todos os produtos</a>` : ''}
    </div>`;
    return;
  }

  grid.innerHTML = lista.map(p => renderProdutoCard(p)).join('');
}

function carregarServicos(q) {
  const grid = document.getElementById('servicosGrid');
  if (!grid) return;

  let lista = DB.servicos.ativos();
  const busca = q !== undefined ? q : (window._filtroQ || '');

  if (busca) lista = lista.filter(s =>
    s.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (s.categoria||'').toLowerCase().includes(busca.toLowerCase())
  );

  const sub = document.getElementById('subServicos');
  if (sub) sub.textContent = `Mostrando ${lista.length} serviço${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#aaa">
      <i class="fas fa-tools" style="font-size:3rem;color:#c9a227;display:block;margin-bottom:16px"></i>
      <h3 style="color:#fff;margin:0 0 10px">Nenhum serviço encontrado</h3>
    </div>`;
    return;
  }

  grid.innerHTML = lista.map(s => renderServicoCard(s)).join('');
}

/* ── Override filtrarCategoria do mercado.js ── */
function filtrarCategoria(e, nomeCategoria) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  document.querySelectorAll('.cat-item').forEach(li => li.classList.remove('cat-ativo'));
  e?.currentTarget?.classList.add('cat-ativo');
  window._filtroCategoria = nomeCategoria === 'Todas as categorias' ? '' : nomeCategoria;
  carregarProdutos(window._filtroQ, window._filtroCategoria);
}

/* ── Override ordenar do mercado.js ── */
function ordenarProdutos() {
  const sel = document.getElementById('ordenarProd')?.value || 'recentes';
  let lista  = DB.produtos.ativos();
  if (window._filtroCategoria) lista = lista.filter(p => p.categoria === window._filtroCategoria);

  switch(sel) {
    case 'preco-asc':  lista.sort((a,b) => a.preco - b.preco); break;
    case 'preco-desc': lista.sort((a,b) => b.preco - a.preco); break;
    case 'nome':       lista.sort((a,b) => a.nome.localeCompare(b.nome)); break;
    default:           lista.sort((a,b) => new Date(b.criadoEm) - new Date(a.criadoEm));
  }

  const grid = document.getElementById('produtosGrid');
  if (grid) grid.innerHTML = lista.map(p => renderProdutoCard(p)).join('');
}
