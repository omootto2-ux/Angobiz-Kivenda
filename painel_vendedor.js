/**
 * ANGOBIZ KIVENDA — Painel do Vendedor
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirVendedor();
  const u = Sessao.get();

  /* Info na sidebar */
  document.querySelectorAll('.sidebar-nome,.vendor-nome').forEach(el => el.textContent = u.nomeLoja || u.nome);
  document.querySelectorAll('.sidebar-tipo,.vendor-tipo').forEach(el => el.textContent = 'Vendedor');

  /* Produtos do vendedor */
  const meusProdutos = DB.produtos.all().filter(p => p.vendedorId === u.id);
  const meusServicos = DB.servicos.all().filter(s => s.vendedorId === u.id);

  /* Stats */
  const st = (id, val) => { const el=document.getElementById(id)||document.querySelector('[data-stat="'+id+'"]'); if(el) el.textContent=val; };
  st('totalProdutos', meusProdutos.length);
  st('totalServicos', meusServicos.length);
  st('totalVendas',   0);

  document.querySelectorAll('.stat-card,.kpi-card').forEach(card => {
    const num = card.querySelector('.stat-num,.kpi-num,.num-stat');
    const lbl = card.querySelector('.stat-label,.kpi-label,.stat-name');
    if (!num || !lbl) return;
    const txt = lbl.textContent.toLowerCase();
    if (txt.includes('produto')) num.textContent = meusProdutos.length;
    if (txt.includes('serviço') || txt.includes('servico')) num.textContent = meusServicos.length;
  });

  /* Lista de produtos do vendedor */
  const gridProd = document.getElementById('meusProdutosGrid') || document.getElementById('produtosVendedor') || document.querySelector('.produtos-vendedor');
  if (gridProd) {
    if (meusProdutos.length === 0) {
      gridProd.innerHTML = `<div style="text-align:center;padding:40px;color:#aaa">
        <i class="fas fa-box-open" style="font-size:3rem;color:#c9a227;display:block;margin-bottom:12px"></i>
        <p>Ainda não tem produtos publicados.</p>
        <a href="cadastrar_produto.html" style="background:#c9a227;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:800;display:inline-block;margin-top:12px">+ ADICIONAR PRODUTO</a>
      </div>`;
    } else {
      gridProd.innerHTML = meusProdutos.map(p => `
      <div style="background:#1a1a1a;border-radius:10px;overflow:hidden;border:1px solid #2a2a2a">
        <img src="${p.imagem||''}" style="width:100%;height:140px;object-fit:cover"
             onerror="this.src='https://via.placeholder.com/300x140/1a1a1a/c9a227?text=${encodeURIComponent(p.nome)}'">
        <div style="padding:12px">
          <h4 style="color:#fff;margin:0 0 6px;font-size:14px">${p.nome}</h4>
          <p style="color:#c9a227;font-weight:800;margin:0 0 6px">${_kz(p.preco)}</p>
          <p style="color:#aaa;font-size:12px;margin:0 0 10px">Stock: ${p.estoque||0} | ${p.status}</p>
          <div style="display:flex;gap:8px">
            <button onclick="vendedorApagarProduto(${p.id})" style="flex:1;background:#e74c3c;border:none;color:#fff;padding:8px;border-radius:6px;cursor:pointer;font-size:12px">Apagar</button>
            <a href="mercado.html" style="flex:1;background:#c9a227;color:#000;padding:8px;border-radius:6px;text-decoration:none;text-align:center;font-size:12px;font-weight:700">Ver no Mercado</a>
          </div>
        </div>
      </div>`).join('');
    }
  }

  window.vendedorApagarProduto = function(id) {
    if (!confirm('Apagar este produto?')) return;
    DB.produtos.remove(id);
    Toast.ok('Produto apagado.');
    location.reload();
  };

  /* Logout */
  document.querySelectorAll('[data-logout],[id*="logout"],[id*="sair"],a[href*="logout"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); Sessao.logout(); });
  });
});
