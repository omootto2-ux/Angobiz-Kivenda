/**
 * ANGOBIZ KIVENDA — produto.html (listagem + modal de detalhe)
 * Abre modal quando URL tem ?id=
 */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  if (id) {
    setTimeout(() => abrirModalProduto(id), 300);
  }
});

function abrirModalProduto(id) {
  const p = DB.produtos.findById(id);
  if (!p) { Toast.aviso('Produto não encontrado.'); return; }

  const modal = document.getElementById('modalItem') || document.getElementById('modalProduto');
  const cont  = document.getElementById('modalConteudo') || document.getElementById('modalContent');
  if (!modal || !cont) {
    /* Criar modal se não existe */
    _criarModalProduto(p);
    return;
  }

  const temPromo = p.precoPromo && parseFloat(p.precoPromo) > 0 && parseFloat(p.precoPromo) < parseFloat(p.preco);
  const precoFinal = temPromo ? parseFloat(p.precoPromo) : parseFloat(p.preco);
  const desc = temPromo ? Math.round((1 - precoFinal/parseFloat(p.preco))*100) : 0;
  const fav  = Favoritos.tem(p.id);

  cont.innerHTML = `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
    <div style="padding:24px;position:relative">
      <img src="${p.imagem}" alt="${p.nome}" style="width:100%;border-radius:10px;max-height:300px;object-fit:cover"
           onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Produto'">
      ${desc?`<div style="position:absolute;top:34px;left:34px;background:#c0392b;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700">-${desc}%</div>`:''}
    </div>
    <div style="padding:28px;display:flex;flex-direction:column;gap:12px">
      <span style="color:#c9a227;font-size:12px;font-weight:700;text-transform:uppercase">${p.categoria||''}</span>
      <h2 style="color:#fff;margin:0;font-size:22px;line-height:1.3">${p.nome}</h2>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="color:#c9a227;font-size:28px;font-weight:900">${_kz(precoFinal)}</span>
        ${temPromo?`<span style="color:#555;font-size:15px;text-decoration:line-through">${_kz(p.preco)}</span>`:''}
      </div>
      <p style="color:#aaa;font-size:14px;line-height:1.7;margin:0">${p.descricao||'Produto disponível na plataforma AngoBiz Kivenda.'}</p>
      <div style="color:#888;font-size:13px"><i class="fas fa-store" style="color:#c9a227;margin-right:6px"></i>${p.vendedorNome||'AngoBiz Kivenda'}</div>
      <div style="color:${p.estoque>0?'#27ae60':'#c0392b'};font-size:13px"><i class="fa ${p.estoque>0?'fa-check-circle':'fa-times-circle'}"></i> ${p.estoque>0?`Em Stock (${p.estoque} unidades)`:'Esgotado'}</div>
      <div style="display:flex;align-items:center;gap:0;border:1px solid #333;border-radius:8px;overflow:hidden;width:fit-content">
        <button onclick="const i=document.getElementById('mqty${p.id}');i.value=Math.max(1,+i.value-1)" style="background:#111;border:none;color:#fff;width:38px;height:38px;font-size:20px;cursor:pointer">−</button>
        <input type="number" id="mqty${p.id}" value="1" min="1" max="${p.estoque||99}" style="width:52px;text-align:center;background:#000;border:none;color:#fff;font-size:16px;font-weight:700;padding:6px 0">
        <button onclick="const i=document.getElementById('mqty${p.id}');i.value=Math.min(${p.estoque||99},+i.value+1)" style="background:#111;border:none;color:#fff;width:38px;height:38px;font-size:20px;cursor:pointer">+</button>
      </div>
      <div style="display:flex;gap:10px;margin-top:6px">
        <button onclick="_addToCartModal(${p.id})" style="flex:1;background:#c9a227;color:#000;border:none;padding:14px;border-radius:8px;font-weight:800;font-size:14px;cursor:pointer">
          <i class="fa fa-shopping-cart"></i> ADICIONAR AO CARRINHO
        </button>
        <button onclick="_toggleFav(this,${p.id})" style="background:#1a1a1a;border:1px solid #333;color:${fav?'#e74c3c':'#aaa'};width:50px;border-radius:8px;cursor:pointer;font-size:20px">
          <i class="fa ${fav?'fa-heart':'fa-heart-o'}"></i>
        </button>
      </div>
    </div>
  </div>`;

  modal.classList.add('aberto');
  document.body.style.overflow='hidden';
}

function _addToCartModal(id) {
  const p = DB.produtos.findById(id);
  if (!p) return;
  const qty = parseInt(document.getElementById('mqty'+id)?.value)||1;
  _addToCart(id); // usa a função global que verifica login
  // close modal
  const modal = document.getElementById('modalItem') || document.getElementById('modalProduto');
  if (modal) { modal.classList.remove('aberto'); document.body.style.overflow=''; }
}

function _criarModalProduto(p) {
  const overlay = document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
  overlay.onclick = e => { if(e.target===overlay){ overlay.remove(); document.body.style.overflow=''; } };

  const box = document.createElement('div');
  box.style.cssText='background:#1a1a1a;border-radius:16px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;position:relative';

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText='position:absolute;top:12px;right:12px;background:#c0392b;border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:10';
  closeBtn.innerHTML='×';
  closeBtn.onclick=()=>{ overlay.remove(); document.body.style.overflow=''; };

  const div = document.createElement('div');
  div.id='modalConteudo';
  box.appendChild(closeBtn);
  box.appendChild(div);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  document.body.style.overflow='hidden';

  abrirModalProduto(p.id);
}

/* Fechar modal */
window.fecharModal = function() {
  ['modalItem','modalProduto'].forEach(id => {
    document.getElementById(id)?.classList.remove('aberto');
  });
  document.body.style.overflow='';
};
document.addEventListener('keydown', e => { if(e.key==='Escape') fecharModal(); });
