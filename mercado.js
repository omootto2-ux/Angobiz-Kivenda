/**
 * ANGOBIZ KIVENDA — Mercado (Produtos + Serviços)
 * Lê directamente da DB (localStorage)
 */
document.addEventListener('DOMContentLoaded', () => {
  const params   = new URLSearchParams(window.location.search);
  const busca    = params.get('q')   || '';
  const catParam = params.get('cat') || '';

  /* Preencher campo de busca */
  if (busca && document.getElementById('inputBusca')) document.getElementById('inputBusca').value = busca;
  if (busca && document.getElementById('inputPesquisa')) document.getElementById('inputPesquisa').value = busca;

  let tabActiva = 'produtos';
  renderAll();

  /* Tabs */
  window.mudarTab = function(tab) {
    tabActiva = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-ativo'));
    document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1))?.classList.add('tab-ativo');
    document.getElementById('secProdutos').style.display = tab==='produtos' ? '' : 'none';
    document.getElementById('secServicos').style.display = tab==='servicos' ? '' : 'none';
  };

  /* Ordenar */
  window.ordenarProdutos = function() { renderProdutos(); };
  window.ordenarServicos = function() { renderServicos(); };

  /* Filtro categorias */
  document.querySelectorAll('.cat-item,[data-cat]').forEach(el => {
    el.addEventListener('click', function() {
      document.querySelectorAll('.cat-item,[data-cat]').forEach(x => x.classList.remove('ativo','cat-ativo'));
      this.classList.add('ativo');
      renderAll();
    });
  });

  function filtros() {
    const catEl    = document.querySelector('.cat-item.ativo,[data-cat].ativo');
    const catAtiva = catEl?.dataset.cat || catEl?.textContent?.trim() || '';
    const busca2   = document.getElementById('inputPesquisa')?.value?.trim() || busca;
    const pMin     = parseFloat(document.getElementById('precoMin')?.value) || 0;
    const pMax     = parseFloat(document.getElementById('precoMax')?.value) || 999999999;
    const ordem    = document.getElementById('ordenarProd')?.value || 'recentes';
    return { catAtiva, busca: busca2, pMin, pMax, ordem };
  }

  function renderAll() { renderProdutos(); renderServicos(); }

  function renderProdutos() {
    const grid = document.getElementById('produtosGrid');
    if (!grid) return;
    const { catAtiva, busca: b, pMin, pMax, ordem } = filtros();

    let arr = DB.produtos.ativos();

    if (catParam && !b) arr = arr.filter(p => p.categoria?.toLowerCase().includes(catParam.toLowerCase()));
    if (catAtiva && catAtiva !== 'Todos' && catAtiva !== 'todos') arr = arr.filter(p => p.categoria?.toLowerCase().includes(catAtiva.toLowerCase()));
    if (b) arr = arr.filter(p => p.nome?.toLowerCase().includes(b.toLowerCase()) || p.categoria?.toLowerCase().includes(b.toLowerCase()) || p.marca?.toLowerCase().includes(b.toLowerCase()));
    arr = arr.filter(p => parseFloat(p.preco||0) >= pMin && parseFloat(p.preco||0) <= pMax);

    if (ordem === 'menor-preco') arr.sort((a,b) => parseFloat(a.preco)-parseFloat(b.preco));
    else if (ordem === 'maior-preco') arr.sort((a,b) => parseFloat(b.preco)-parseFloat(a.preco));
    else arr.sort((a,b) => (b.id||0)-(a.id||0)); /* recentes */

    const sub = document.getElementById('subProdutos');
    if (sub) sub.textContent = 'Mostrando ' + arr.length + ' produto' + (arr.length!==1?'s':'');

    if (arr.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#aaa">
        <i class="fas fa-box-open" style="font-size:3rem;color:#c9a227;display:block;margin-bottom:16px"></i>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros ou <a href="mercado.html" style="color:#c9a227">ver todos os produtos</a>.</p>
      </div>`;
      return;
    }
    grid.innerHTML = arr.map(p => renderProdutoCard(p)).join('');
  }

  function renderServicos() {
    const grid = document.getElementById('servicosGrid');
    if (!grid) return;
    const { busca: b } = filtros();

    let arr = DB.servicos.ativos();
    if (b) arr = arr.filter(s => s.nome?.toLowerCase().includes(b.toLowerCase()) || s.categoria?.toLowerCase().includes(b.toLowerCase()));
    arr.sort((a,z) => (z.id||0)-(a.id||0));

    const sub = document.getElementById('subServicos');
    if (sub) sub.textContent = 'Mostrando ' + arr.length + ' serviço' + (arr.length!==1?'s':'');

    if (arr.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#aaa">
        <i class="fas fa-tools" style="font-size:3rem;color:#c9a227;display:block;margin-bottom:16px"></i>
        <h3>Nenhum serviço encontrado</h3>
      </div>`;
      return;
    }
    grid.innerHTML = arr.map(s => renderServicoCard(s)).join('');
  }

  /* Pesquisa dentro da página */
  const btnPesq = document.getElementById('btnPesquisar') || document.querySelector('.btn-pesquisar');
  if (btnPesq) btnPesq.addEventListener('click', renderAll);
  const inpPesq = document.getElementById('inputPesquisa');
  if (inpPesq) inpPesq.addEventListener('keydown', e => { if(e.key==='Enter') renderAll(); });

  /* Filtros de preço */
  ['precoMin','precoMax','sliderMin','sliderMax'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', renderAll);
    document.getElementById(id)?.addEventListener('input', renderAll);
  });

  /* Slider sync */
  window.moverSlider = function(tipo) {
    const min = document.getElementById('sliderMin');
    const max = document.getElementById('sliderMax');
    const pMin = document.getElementById('precoMin');
    const pMax = document.getElementById('precoMax');
    if (!min||!max) return;
    if (tipo==='min') { if(+min.value>+max.value) min.value=max.value; if(pMin) pMin.value=min.value; }
    else              { if(+max.value<+min.value) max.value=min.value; if(pMax) pMax.value=max.value; }
    renderAll();
  };
  window.atualizarSlider = function() {
    const pMin=document.getElementById('precoMin'),pMax=document.getElementById('precoMax');
    const sMin=document.getElementById('sliderMin'),sMax=document.getElementById('sliderMax');
    if(sMin&&pMin) sMin.value=pMin.value;
    if(sMax&&pMax) sMax.value=pMax.value;
    renderAll();
  };
  window.filtrarLocalizacao = renderAll;

  /* Modal de item (mantido do HTML original) */
  window.abrirModal = function(id, tipo) {
    const item = tipo==='servico' ? DB.servicos.findById(id) : DB.produtos.findById(id);
    if (!item) return;
    const modal = document.getElementById('modalItem');
    const cont  = document.getElementById('modalConteudo') || document.getElementById('modalContent');
    if (!modal || !cont) return;
    const temPromo = item.precoPromo && parseFloat(item.precoPromo) > 0;
    cont.innerHTML = `
      <img src="${item.imagem||''}" style="width:100%;max-height:260px;object-fit:cover;border-radius:8px;margin-bottom:16px"
           onerror="this.src='https://via.placeholder.com/400x260/1a1a1a/c9a227?text=${encodeURIComponent(item.nome)}'">
      <span style="color:#c9a227;font-size:12px;font-weight:700">${item.categoria||''}</span>
      <h2 style="color:#fff;margin:8px 0">${item.nome}</h2>
      <p style="color:#aaa;font-size:14px;line-height:1.6;margin-bottom:12px">${item.descricao||''}</p>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <span style="color:#c9a227;font-size:22px;font-weight:900">${_kz(temPromo?item.precoPromo:item.preco)}</span>
        ${temPromo?`<span style="color:#666;text-decoration:line-through">${_kz(item.preco)}</span>`:''}
      </div>
      <p style="color:#888;font-size:13px;margin-bottom:16px"><i class="fas fa-store" style="margin-right:6px"></i>${item.vendedorNome||'Vendedor'}</p>
      ${tipo!=='servico' ? `<button onclick="adicionarCarrinho(event,${id},'produto');fecharModal('modalItem')" class="btn-modal-cart" style="width:100%;background:#c9a227;color:#000;padding:14px;border:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:15px"><i class="fas fa-shopping-cart"></i> ADICIONAR AO CARRINHO</button>`
      : `<a href="contratar.html?id=${id}" style="display:block;text-align:center;background:#c9a227;color:#000;padding:14px;border-radius:8px;font-weight:800;text-decoration:none;font-size:15px">CONTRATAR SERVIÇO</a>`}`;
    modal.style.display='flex'; modal.classList.add('aberto');
  };

  window.fecharModal = function(id) {
    const m = id ? document.getElementById(id) : document.querySelector('.modal-overlay.aberto');
    if (m) { m.style.display='none'; m.classList.remove('aberto'); }
  };

  window.adicionarCarrinho = function(e, id, tipo) {
    if (e) e.stopPropagation();
    _addToCart(id);
  };

  /* Fechar modal ao clicar fora */
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', function(e){ if(e.target===this) fecharModal(this.id); });
  });
});
