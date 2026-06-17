/**
 * ANGOBIZ KIVENDA — Página do Carrinho
 */
document.addEventListener('DOMContentLoaded', () => {
  /* Redirecionar para login se não estiver logado */
  if (!Sessao.logado()) {
    Toast.aviso('Precisa de entrar na sua conta para ver o carrinho.');
    setTimeout(() => { window.location.href = 'login.html?next=carrinho.html'; }, 1200);
    return;
  }

  renderCarrinho();
  window.addEventListener('carrinho:atualizado', renderCarrinho);

  /* Cupões */
  const CUPOES = { 'KIVENDA10':10, 'ANGOLA20':20, 'PROMO15':15, 'AKBONUS':25 };
  let descontoAplicado = 0;

  const btnCupom = document.getElementById('btnCupom') || document.querySelector('.btn-cupom');
  if (btnCupom) {
    btnCupom.addEventListener('click', () => {
      const inp = document.getElementById('inputCupom') || document.querySelector('input[placeholder*="cupom"]');
      const cod = inp?.value?.toUpperCase().trim() || '';
      const msg = document.getElementById('cupomMsg') || document.querySelector('.cupom-msg');
      if (!cod) { Toast.aviso('Introduza um código de cupão.'); return; }
      if (CUPOES[cod]) {
        descontoAplicado = CUPOES[cod];
        if (msg) { msg.textContent='✓ Cupão ' + cod + ' — ' + descontoAplicado + '% de desconto!'; msg.style.color='#27ae60'; }
        Toast.ok('Cupão aplicado! ' + descontoAplicado + '% de desconto.');
        renderCarrinho();
      } else {
        if (msg) { msg.textContent='Cupão inválido ou expirado.'; msg.style.color='#e74c3c'; }
        Toast.erro('Cupão inválido.');
      }
    });
  }

  function renderCarrinho() {
    const tbody = document.getElementById('corpoTabela');
    const vazio = document.getElementById('carrinhoVazio');
    const tabela= document.getElementById('tabelaProdutos');
    const itens = Carrinho.obter();

    if (!tbody) return;

    if (itens.length === 0) {
      if (vazio)  vazio.style.display  = '';
      if (tabela) tabela.style.display = 'none';
      atualizarResumo(0, 0);
      return;
    }
    if (vazio)  vazio.style.display  = 'none';
    if (tabela) tabela.style.display = '';

    tbody.innerHTML = itens.map(it => `
    <tr class="linha-produto" data-id="${it.id}">
      <td class="col-produto">
        <div class="produto-cell" style="display:flex;align-items:center;gap:12px">
          <img src="${it.imagem||''}" alt="${it.nome}" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #2a2a2a"
               onerror="this.src='https://via.placeholder.com/72x72/1a1a1a/c9a227?text=IMG'">
          <div>
            <p style="color:#fff;font-weight:700;font-size:14px">${it.nome}</p>
            <span style="color:#27ae60;font-size:12px"><i class="fa fa-check-circle"></i> Em Stock</span>
          </div>
        </div>
      </td>
      <td class="col-preco" style="color:#c9a227;font-weight:700">${_kz(it.preco)}</td>
      <td class="col-qtd">
        <div style="display:flex;align-items:center;border:1px solid #333;border-radius:8px;overflow:hidden;width:fit-content">
          <button onclick="Carrinho.alterarQty(${it.id},${it.qty-1})" style="background:#111;border:none;color:#fff;width:32px;height:36px;font-size:16px;cursor:pointer">−</button>
          <input type="number" value="${it.qty}" min="1" max="99"
            onchange="Carrinho.alterarQty(${it.id},parseInt(this.value)||1)"
            style="width:44px;text-align:center;border:none;background:#111;color:#fff;font-size:14px;font-weight:700;padding:0">
          <button onclick="Carrinho.alterarQty(${it.id},${it.qty+1})" style="background:#111;border:none;color:#fff;width:32px;height:36px;font-size:16px;cursor:pointer">+</button>
        </div>
      </td>
      <td class="col-sub" style="color:#fff;font-weight:800">${_kz(it.preco*it.qty)}</td>
      <td class="col-acao">
        <button onclick="Carrinho.remover(${it.id})" style="background:none;border:1px solid #e74c3c;color:#e74c3c;width:36px;height:36px;border-radius:8px;cursor:pointer" title="Remover">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>`).join('');

    const sub = Carrinho.total();
    atualizarResumo(sub, descontoAplicado);
  }

  function atualizarResumo(sub, desc) {
    const descVal  = Math.round(sub * desc / 100);
    const entrega  = sub > 50000 ? 0 : 5000;
    const total    = Math.max(0, sub - descVal + entrega);
    const qty      = Carrinho.qtdTotal();

    const s = (id, val) => { const el=document.getElementById(id)||document.querySelector('[data-'+id+']'); if(el) el.textContent=val; };
    s('valSubtotal',   _kz(sub));
    s('labelQtdProdutos', `Subtotal (${qty} produto${qty!==1?'s':''})`);
    s('valDesconto',   desc ? '- ' + _kz(descVal) : '—');
    s('valEntrega',    entrega === 0 ? 'Grátis' : _kz(entrega));
    s('valTotal',      _kz(total));

    const btnFin = document.getElementById('btnFinalizar') || document.querySelector('.btn-finalizar,.btn-checkout');
    if (btnFin) {
      const parent = btnFin.closest('a') || btnFin;
      if (btnFin.tagName==='BUTTON' && !btnFin.closest('a')) {
        btnFin.onclick = () => window.location.href='pagamento_cliente.html';
      }
    }
  }

  /* Limpar carrinho */
  const btnLimpar = document.getElementById('btnLimpar') || document.querySelector('.btn-limpar-carrinho');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      if (confirm('Tem a certeza que quer limpar o carrinho?')) { Carrinho.limpar(); Toast.info('Carrinho limpo.'); }
    });
  }
});
