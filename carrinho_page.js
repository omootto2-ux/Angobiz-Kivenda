/**
 * ANGOBIZ KIVENDA — CARRINHO (dados reais + redireccionar para login)
 */
document.addEventListener('DOMContentLoaded', () => {
  renderCarrinhoCompleto();
  window.addEventListener('carrinho:atualizado', renderCarrinhoCompleto);
});

function renderCarrinhoCompleto() {
  const tbody  = document.getElementById('corpoTabela');
  const vazio  = document.getElementById('carrinhoVazio');
  const tabela = document.getElementById('tabelaProdutos');

  const itens = Carrinho.obter();

  /* Actualizar totais no resumo */
  function actualizarTotais(desconto) {
    const sub     = Carrinho.total();
    const entrega = sub >= 50000 ? 0 : 5000;
    const total   = Math.max(0, sub - (desconto||0) + entrega);
    const qty     = Carrinho.qtdTotal();

    const el = id => document.getElementById(id);
    if (el('valSubtotal'))     el('valSubtotal').textContent     = _kz(sub);
    if (el('labelQtdProdutos')) el('labelQtdProdutos').textContent = `Subtotal (${qty} produto${qty!==1?'s':''})`;
    if (el('valEntrega'))      el('valEntrega').textContent      = entrega === 0 ? 'Grátis' : _kz(entrega);
    if (el('valTotal'))        el('valTotal').textContent        = _kz(total);
    if (el('valDesconto') && desconto) el('valDesconto').textContent = '- ' + _kz(desconto);
  }

  if (itens.length === 0) {
    if (vazio)  { vazio.style.display  = ''; }
    if (tabela) { tabela.style.display = 'none'; }
    actualizarTotais(0);
    return;
  }

  if (vazio)  { vazio.style.display  = 'none'; }
  if (tabela) { tabela.style.display = ''; }

  if (tbody) {
    tbody.innerHTML = itens.map(it => `
    <tr class="linha-produto" data-id="${it.id}">
      <td class="col-produto">
        <div class="produto-cell">
          <img src="${it.imagem}" alt="${it.nome}" class="prod-img-tabela"
               style="width:70px;height:70px;object-fit:cover;border-radius:6px"
               onerror="this.src='https://via.placeholder.com/70x70/1a1a1a/c9a227?text=P'">
          <div class="prod-info-tabela">
            <p class="prod-nome" style="color:#fff;font-weight:700">${it.nome}</p>
            <span style="color:#27ae60;font-size:12px"><i class="fa fa-check-circle"></i> Em Stock</span>
          </div>
        </div>
      </td>
      <td class="col-preco"><span style="color:#c9a227;font-weight:700">${_kz(it.preco)}</span></td>
      <td class="col-qtd">
        <div class="qtd-control" style="display:flex;align-items:center;gap:0;border:1px solid #333;border-radius:6px;overflow:hidden;width:fit-content">
          <button class="qtd-btn" onclick="Carrinho.alterarQty(${it.id},${it.qty-1})"
            style="background:#1a1a1a;border:none;color:#fff;width:32px;height:32px;cursor:pointer;font-size:16px">−</button>
          <input type="number" value="${it.qty}" min="1" max="99"
            onchange="Carrinho.alterarQty(${it.id},parseInt(this.value)||1)"
            style="width:45px;text-align:center;background:#111;border:none;color:#fff;font-size:14px;font-weight:700;padding:4px">
          <button class="qtd-btn" onclick="Carrinho.alterarQty(${it.id},${it.qty+1})"
            style="background:#1a1a1a;border:none;color:#fff;width:32px;height:32px;cursor:pointer;font-size:16px">+</button>
        </div>
      </td>
      <td class="col-sub"><strong style="color:#c9a227">${_kz(it.preco*it.qty)}</strong></td>
      <td class="col-acao">
        <button onclick="Carrinho.remover(${it.id})"
          style="background:none;border:1px solid #c0392b;color:#c0392b;width:32px;height:32px;border-radius:6px;cursor:pointer;font-size:14px" title="Remover">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>`).join('');
  }

  actualizarTotais(0);

  /* Cupões */
  const CUPOES = { 'KIVENDA10':10, 'ANGOLA20':20, 'PROMO15':15 };
  window._descontoAtual = 0;

  const btnCupao = document.getElementById('btnCupom') || document.querySelector('[onclick*="aplicarCupom"]');
  if (btnCupao) {
    btnCupao.onclick = function() {
      const cod = (document.getElementById('inputCupom')?.value || '').toUpperCase().trim();
      const msg = document.getElementById('cupomMsg');
      if (CUPOES[cod]) {
        const desc = Math.round(Carrinho.total() * CUPOES[cod] / 100);
        window._descontoAtual = desc;
        if (msg) { msg.textContent = `✓ Cupão ${cod} aplicado (${CUPOES[cod]}% de desconto)`; msg.style.color='#27ae60'; }
        actualizarTotais(desc);
        Toast.ok('Cupão ' + cod + ' aplicado!');
      } else {
        if (msg) { msg.textContent = 'Cupão inválido ou expirado.'; msg.style.color='#c0392b'; }
        Toast.erro('Cupão inválido.');
      }
    };
  }

  /* Botão Finalizar */
  const btnFin = document.getElementById('btnFinalizar') || document.querySelector('.btn-finalizar,.btn-checkout');
  if (btnFin) {
    const link = btnFin.closest('a') || btnFin;
    link.onclick = function(e) {
      e.preventDefault();
      if (!Sessao.logado()) {
        Toast.aviso('Precisa de entrar na conta para finalizar a compra.');
        setTimeout(() => window.location.href = 'login.html?next=' + encodeURIComponent('carrinho.html'), 1200);
        return;
      }
      window.location.href = 'pagamento_cliente.html';
    };
  }
}
