/**
 * AngoBiz Kivenda — Sincronização do Carrinho com o localStorage
 * Carrega os produtos do Carrinho global antes do carrinho.js inicializar
 */
document.addEventListener('DOMContentLoaded', function() {
  // Preencher corpoTabela com dados do Carrinho global
  const tbody = document.getElementById('corpoTabela');
  const carrinhoVazio = document.getElementById('carrinhoVazio');
  const tabelaProdutos = document.getElementById('tabelaProdutos');
  const valSubtotal = document.getElementById('valSubtotal');
  const labelQtdProdutos = document.getElementById('labelQtdProdutos');
  const valTotal = document.getElementById('valTotal');

  function renderTabela() {
    const itens = Carrinho.obter();

    if (!tbody) return;

    if (itens.length === 0) {
      if (carrinhoVazio)   { carrinhoVazio.style.display=''; }
      if (tabelaProdutos)  { tabelaProdutos.style.display='none'; }
      return;
    }
    if (carrinhoVazio)  { carrinhoVazio.style.display='none'; }
    if (tabelaProdutos) { tabelaProdutos.style.display=''; }

    tbody.innerHTML = itens.map(it => `
    <tr class="linha-produto" data-id="${it.id}">
      <td class="col-produto">
        <div class="produto-cell">
          <img src="${it.imagem}" alt="${it.nome}"
               onerror="this.src='https://via.placeholder.com/80x80/1a1a1a/c9a227?text=IMG'"
               class="prod-img-tabela">
          <div class="prod-info-tabela">
            <p class="prod-nome">${it.nome}</p>
            <span class="prod-stock em-stock"><i class="fa fa-check-circle"></i> Em Stock</span>
          </div>
        </div>
      </td>
      <td class="col-preco"><span class="preco-cell">${_kz(it.preco)}</span></td>
      <td class="col-qtd">
        <div class="qtd-control">
          <button class="qtd-btn" onclick="Carrinho.alterarQty(${it.id},${it.qty-1});renderTabela()">−</button>
          <input type="number" class="qtd-input" value="${it.qty}" min="1" max="99"
            onchange="Carrinho.alterarQty(${it.id},parseInt(this.value)||1);renderTabela()">
          <button class="qtd-btn" onclick="Carrinho.alterarQty(${it.id},${it.qty+1});renderTabela()">+</button>
        </div>
      </td>
      <td class="col-sub"><strong>${_kz(it.preco*it.qty)}</strong></td>
      <td class="col-acao">
        <button class="btn-remover" onclick="Carrinho.remover(${it.id});renderTabela()" title="Remover">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>`).join('');

    // Actualizar resumo
    const sub = Carrinho.total();
    const qty = Carrinho.qtdTotal();
    if (valSubtotal)    valSubtotal.textContent    = _kz(sub);
    if (labelQtdProdutos) labelQtdProdutos.textContent = `Subtotal (${qty} produto${qty!==1?'s':''})`;
    if (valTotal)       valTotal.textContent       = _kz(sub);
  }

  renderTabela();
  window.renderTabela = renderTabela; // expose globally

  // Cupões válidos
  const CUPOES = { 'KIVENDA10':10, 'ANGOLA20':20, 'PROMO15':15, 'SAVE5':5 };
  const btnCupom = document.getElementById('btnCupom');
  if (btnCupom) {
    btnCupom.addEventListener('click', function() {
      const cod = (document.getElementById('inputCupom')?.value||'').toUpperCase().trim();
      const msg = document.getElementById('cupomMsg');
      if (CUPOES[cod]) {
        const desc = Math.round(Carrinho.total() * CUPOES[cod] / 100);
        if (msg) { msg.textContent = `✓ Cupão aplicado! Desconto de ${CUPOES[cod]}%`; msg.style.color='#27ae60'; }
        if (valTotal) valTotal.textContent = _kz(Carrinho.total() - desc);
        const vDesc = document.getElementById('valDesconto');
        if (vDesc) vDesc.textContent = '- ' + _kz(desc);
        Toast.ok('Cupão ' + cod + ' aplicado com sucesso!');
      } else {
        if (msg) { msg.textContent='Cupão inválido ou expirado.'; msg.style.color='#cc0000'; }
        Toast.erro('Cupão inválido.');
      }
    });
  }

  // Botão continuar comprando
  document.querySelectorAll('.btn-continuar').forEach(a => {
    a.href = 'mercado.html';
  });

  // Botão finalizar
  const btnFin = document.getElementById('btnFinalizar');
  if (btnFin) {
    btnFin.closest('a') && (btnFin.closest('a').href = 'pagamento_cliente.html');
  }
});
