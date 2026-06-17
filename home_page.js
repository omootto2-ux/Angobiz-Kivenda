/**
 * ANGOBIZ KIVENDA — Home Page
 */
document.addEventListener('DOMContentLoaded', () => {
  /* Produtos em destaque (8 mais recentes) */
  const grid = document.getElementById('destaque-grid') || document.getElementById('produtosDestaque') || document.querySelector('.produtos-grid:not(#produtosGrid)');
  if (grid) {
    const arr = DB.produtos.ativos().sort((a,b)=>(b.id||0)-(a.id||0)).slice(0,8);
    if (arr.length > 0) grid.innerHTML = arr.map(p => renderProdutoCard(p)).join('');
  }

  /* Botão comprar agora */
  document.querySelectorAll('.btn-principal').forEach(btn => {
    if (btn.href && btn.href.includes('mercado')) return;
    btn.addEventListener('click', e => {
      const dest = document.querySelector('.produtos-destaque,.categorias');
      if (dest) { e.preventDefault(); dest.scrollIntoView({behavior:'smooth'}); }
    });
  });
});
