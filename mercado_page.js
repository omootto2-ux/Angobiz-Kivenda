/**
 * AngoBiz Kivenda — Mercado/Produtos Page (produto dinâmico do localStorage)
 */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('produtosGrid') || document.querySelector('.produtos-grid');
  if (!grid) return;

  // Ler parâmetros da URL
  const params  = new URLSearchParams(window.location.search);
  const busca   = params.get('q')   || '';
  const catFilt = params.get('cat') || '';

  // Preencher campo de busca se veio da busca
  if (busca && document.getElementById('inputBusca')) {
    document.getElementById('inputBusca').value = busca;
  }

  let produtos = PRODUTOS_DEMO;
  if (busca)   produtos = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase())||p.categoria.toLowerCase().includes(busca.toLowerCase()));
  if (catFilt) produtos = produtos.filter(p => p.categoria.toLowerCase().includes(catFilt.toLowerCase()));

  if (produtos.length === 0) {
    grid.innerHTML = `<div style="text-align:center;padding:60px;color:#aaa;">
      <i class="fas fa-search" style="font-size:3rem;margin-bottom:16px;display:block;color:#c9a227"></i>
      <h3>Nenhum produto encontrado para "${busca||catFilt}"</h3>
      <a href="mercado.html" style="color:#c9a227;margin-top:16px;display:inline-block">Ver todos os produtos</a>
    </div>`;
    return;
  }

  grid.innerHTML = produtos.map(p => renderProdutoCard(p)).join('');

  // Filtros de categoria (se existirem botões)
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-cat]').forEach(b=>b.classList.remove('ativo'));
      this.classList.add('ativo');
      const cat = this.dataset.cat;
      const filtrado = cat==='todos' ? PRODUTOS_DEMO : PRODUTOS_DEMO.filter(p=>p.categoria.toLowerCase().includes(cat.toLowerCase()));
      grid.innerHTML = filtrado.map(p => renderProdutoCard(p)).join('');
    });
  });
});
