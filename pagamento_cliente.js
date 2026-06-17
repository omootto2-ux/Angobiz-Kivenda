/**
 * ANGOBIZ KIVENDA — Página de Pagamento / Checkout
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirLogin('pagamento_cliente.html');
  const u = Sessao.get();
  const itens = Carrinho.obter();

  if (itens.length === 0) {
    Toast.aviso('O seu carrinho está vazio.');
    setTimeout(() => window.location.href='mercado.html', 1500);
    return;
  }

  /* Preencher resumo */
  const resumoEl = document.getElementById('resumo-itens') || document.getElementById('itensResumo') || document.querySelector('.checkout-itens,.resumo-itens,.lista-itens');
  if (resumoEl) {
    resumoEl.innerHTML = itens.map(it => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #2a2a2a">
        <img src="${it.imagem||''}" style="width:56px;height:56px;object-fit:cover;border-radius:6px;flex-shrink:0"
             onerror="this.src='https://via.placeholder.com/56x56/1a1a1a/c9a227?text=IMG'">
        <div style="flex:1"><p style="color:#fff;font-size:13px;font-weight:600">${it.nome}</p>
        <p style="color:#aaa;font-size:12px">Qtd: ${it.qty}</p></div>
        <span style="color:#c9a227;font-weight:800;white-space:nowrap">${_kz(it.preco*it.qty)}</span>
      </div>`).join('');
  }

  /* Pré-preencher dados do utilizador */
  const fNome  = document.getElementById('nomeEntrega') || document.getElementById('nome');
  const fTel   = document.getElementById('telefoneEntrega') || document.getElementById('telefone');
  const fMor   = document.getElementById('moradaEntrega') || document.getElementById('morada');
  if (fNome && !fNome.value) fNome.value = u.nome;
  if (fTel  && !fTel.value)  fTel.value  = u.telefone || '';
  if (fMor  && !fMor.value)  fMor.value  = u.morada || '';

  /* Totais */
  const sub     = Carrinho.total();
  const entrega = sub > 50000 ? 0 : 5000;
  const total   = sub + entrega;
  const s = (id, val) => { const el=document.getElementById(id)||document.querySelector('.'+id); if(el) el.textContent=val; };
  s('valSubtotal',_kz(sub)); s('valEntrega',entrega===0?'Grátis':_kz(entrega)); s('valTotal',_kz(total));
  s('subtotalVal',_kz(sub)); s('entregaVal',entrega===0?'Grátis':_kz(entrega)); s('totalVal',_kz(total));

  /* Confirmar pedido */
  const btnConf = document.getElementById('btnConfirmar') || document.getElementById('btnPagar') || document.querySelector('.btn-confirmar,.btn-pagar,.btn-finalizar-pag');
  if (btnConf) {
    btnConf.addEventListener('click', e => {
      e.preventDefault();
      const metodo = document.querySelector('input[name="metodoPagamento"]:checked')?.value ||
                     document.getElementById('metodoPagamento')?.value || 'multicaixa';
      const morada = fMor?.value?.trim() || u.morada || '';
      if (!morada) { Toast.aviso('Introduza a morada de entrega.'); fMor?.focus(); return; }

      btnConf.disabled = true;
      btnConf.textContent = 'A processar pagamento...';

      setTimeout(() => {
        const pedido = DB.pedidos.add({
          clienteId: u.id,
          clienteNome: u.nome,
          itens: itens,
          total,
          subtotal: sub,
          entrega,
          metodo,
          morada,
        });

        Carrinho.limpar();

        /* Mostrar confirmação */
        const conteudo = document.querySelector('main,.main-content,.pagamento-conteudo');
        if (conteudo) {
          conteudo.innerHTML = `
          <div style="text-align:center;padding:80px 20px">
            <div style="width:80px;height:80px;background:#27ae60;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff">✓</div>
            <h1 style="color:#fff;margin-bottom:12px">Pedido Confirmado!</h1>
            <p style="color:#c9a227;font-size:20px;font-weight:800;margin-bottom:8px">Nº ${pedido.id}</p>
            <p style="color:#aaa;margin-bottom:32px">O seu pedido foi registado. Será contactado em breve para confirmação da entrega.</p>
            <div style="background:#1a1a1a;border-radius:12px;padding:24px;max-width:400px;margin:0 auto 32px">
              <p style="color:#fff;margin:0 0 8px"><strong>Total pago:</strong> <span style="color:#c9a227">${_kz(total)}</span></p>
              <p style="color:#fff;margin:0 0 8px"><strong>Método:</strong> ${metodo}</p>
              <p style="color:#fff;margin:0"><strong>Entrega em:</strong> ${morada}</p>
            </div>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
              <a href="perfil_cliente.html" style="background:#c9a227;color:#000;padding:14px 28px;border-radius:8px;font-weight:800;text-decoration:none">VER PEDIDOS</a>
              <a href="mercado.html" style="background:#1a1a1a;color:#fff;padding:14px 28px;border-radius:8px;font-weight:800;text-decoration:none;border:1px solid #333">CONTINUAR A COMPRAR</a>
            </div>
          </div>`;
        } else {
          Toast.ok('✓ Pedido ' + pedido.id + ' confirmado!');
          setTimeout(() => window.location.href='perfil_cliente.html', 2000);
        }
      }, 1800);
    });
  }
});
