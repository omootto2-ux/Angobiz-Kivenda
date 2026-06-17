/**
 * ANGOBIZ KIVENDA — PAGAMENTO / CHECKOUT
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirLogin();
  const u     = Sessao.get();
  const itens = Carrinho.obter();

  if (itens.length === 0) {
    Toast.aviso('Carrinho vazio. A redirecionar...');
    setTimeout(() => window.location.href = 'mercado.html', 1500);
    return;
  }

  /* Preencher resumo */
  const resumoGrid = document.getElementById('resumo-itens') ||
                     document.querySelector('.resumo-pedido-lista,.checkout-items');
  if (resumoGrid) {
    resumoGrid.innerHTML = itens.map(it => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #222">
        <img src="${it.imagem}" alt="${it.nome}" style="width:56px;height:56px;object-fit:cover;border-radius:6px"
             onerror="this.src='https://via.placeholder.com/56x56/1a1a1a/c9a227?text=P'">
        <div style="flex:1">
          <p style="color:#fff;font-weight:700;font-size:13px;margin:0">${it.nome}</p>
          <p style="color:#aaa;font-size:12px;margin:2px 0">Qtd: ${it.qty}</p>
        </div>
        <strong style="color:#c9a227">${_kz(it.preco*it.qty)}</strong>
      </div>`).join('');
  }

  const sub     = Carrinho.total();
  const entrega = sub >= 50000 ? 0 : 5000;
  const total   = sub + entrega;

  const els = {
    sub:     document.getElementById('valSubtotal')    || document.querySelector('[data-subtotal]'),
    entrega: document.getElementById('valEntrega')     || document.querySelector('[data-entrega]'),
    total:   document.getElementById('valTotal')       || document.querySelector('[data-total]'),
    nome:    document.getElementById('nomeCliente')    || document.querySelector('[data-nome-cliente]'),
    email:   document.getElementById('emailCliente')   || document.querySelector('[data-email-cliente]'),
  };
  if (els.sub)     els.sub.textContent     = _kz(sub);
  if (els.entrega) els.entrega.textContent = entrega === 0 ? 'Grátis' : _kz(entrega);
  if (els.total)   els.total.textContent   = _kz(total);
  if (els.nome)    els.nome.textContent    = u.nome;
  if (els.email)   els.email.textContent   = u.email;

  /* Botão confirmar */
  const btnConf = document.getElementById('btnConfirmar') ||
                  document.querySelector('.btn-confirmar,.btn-pagar,.btn-finalizar-pag');
  if (btnConf) {
    btnConf.addEventListener('click', function(e) {
      e.preventDefault();
      this.disabled = true; this.textContent = 'A processar...';

      setTimeout(() => {
        const metodo = document.querySelector('input[name="metodoPag"]:checked,input[name="pagamento"]:checked')?.value || 'multicaixa';
        const pedido = DB.pedidos.add({
          clienteId:  u.id,
          clienteNome:u.nome,
          itens:      Carrinho.obter(),
          subtotal:   sub,
          entrega:    entrega,
          total:      total,
          metodo:     metodo,
          status:     'pendente',
        });
        Carrinho.limpar();
        Toast.ok('✓ Pedido ' + pedido.id + ' confirmado! Obrigado pela sua compra.');
        setTimeout(() => window.location.href = 'perfil_cliente.html', 2000);
      }, 1500);
    });
  }
});
