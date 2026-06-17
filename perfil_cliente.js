/**
 * ANGOBIZ KIVENDA — Perfil do Cliente/Utilizador
 * Carrega dados reais da sessão
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirLogin('perfil_cliente.html');
  const u = Sessao.get();

  /* ── Preencher dados do perfil ── */
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.value = val; };

  /* Nome, email, telefone, localização */
  document.querySelectorAll('.profile-name,#profileName').forEach(el => { el.innerHTML = u.nome + ' <i class="fas fa-circle-check verified-icon"></i>'; });
  document.querySelectorAll('.profile-detail').forEach(el => {
    const txt = el.textContent;
    if (txt.includes('@') || el.querySelector('.fa-envelope')) el.innerHTML = '<i class="fas fa-envelope"></i> ' + u.email;
    if (txt.includes('+244') || txt.includes('92') || el.querySelector('.fa-phone')) el.innerHTML = '<i class="fas fa-phone" style="color:#f59e0b"></i> ' + (u.telefone || 'Não definido');
    if (el.querySelector('.fa-location-dot') || el.querySelector('.fa-map')) el.innerHTML = '<i class="fas fa-location-dot" style="color:#ef4444"></i> ' + (u.provincia || 'Angola') + (u.municipio ? ', ' + u.municipio : '');
  });

  /* Membro desde */
  const desde = new Date(u.criadoEm || Date.now());
  document.querySelectorAll('.member-date').forEach(el => {
    el.textContent = desde.toLocaleDateString('pt-PT', { month:'long', year:'numeric' });
  });

  /* Estatísticas */
  const pedidos   = DB.pedidos.doCliente(u.id);
  const favoritos = Favoritos.todos();
  const carrinho  = Carrinho.obter();

  document.querySelectorAll('.stat-item').forEach(item => {
    const lbl = item.querySelector('.stat-label');
    const num = item.querySelector('.stat-num');
    if (!lbl || !num) return;
    if (lbl.textContent.toLowerCase().includes('pedido'))   num.textContent = pedidos.length;
    if (lbl.textContent.toLowerCase().includes('favorito')) num.textContent = favoritos.length;
    if (lbl.textContent.toLowerCase().includes('carrinho')) num.textContent = carrinho.length;
  });

  /* Avatar */
  if (u.avatar) {
    document.querySelectorAll('.profile-avatar,#profileAvatar').forEach(img => { img.src = u.avatar; });
  } else {
    /* Iniciais como avatar */
    const iniciais = u.nome.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
    document.querySelectorAll('.profile-avatar,#profileAvatar').forEach(img => {
      img.style.display='none';
      const div = document.createElement('div');
      div.style.cssText='width:120px;height:120px;border-radius:50%;background:#c9a227;color:#000;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;';
      div.textContent=iniciais;
      img.parentNode.insertBefore(div, img);
    });
  }

  /* ── Navegar entre secções ── */
  window.navegarPara = function(secao) {
    document.querySelectorAll('.section-content,[id^="sec-"]').forEach(s => s.style.display='none');
    const alvo = document.getElementById('sec-' + secao);
    if (alvo) { alvo.style.display=''; alvo.scrollIntoView({behavior:'smooth'}); }
  };

  /* ── Editar perfil (modal simples) ── */
  window.editarPerfil = function() {
    const modal = document.getElementById('modalOverlay') || document.getElementById('modalContent')?.parentElement;
    const cont  = document.getElementById('modalContent');
    if (!cont) { Toast.info('Funcionalidade disponível na versão com servidor.'); return; }

    cont.innerHTML = `
    <h2 style="color:#c9a227;margin-bottom:20px">Editar Perfil</h2>
    <label style="color:#aaa;font-size:13px">Nome completo</label>
    <input id="editNome" value="${u.nome}" style="width:100%;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:8px;margin-bottom:12px;box-sizing:border-box">
    <label style="color:#aaa;font-size:13px">Telefone</label>
    <input id="editTel" value="${u.telefone||''}" style="width:100%;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:8px;margin-bottom:12px;box-sizing:border-box">
    <label style="color:#aaa;font-size:13px">Município / Cidade</label>
    <input id="editMun" value="${u.municipio||''}" style="width:100%;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:8px;margin-bottom:12px;box-sizing:border-box">
    <label style="color:#aaa;font-size:13px">Morada</label>
    <input id="editMor" value="${u.morada||''}" style="width:100%;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:8px;margin-bottom:20px;box-sizing:border-box">
    <div style="display:flex;gap:12px">
      <button onclick="salvarPerfil()" style="flex:1;background:#c9a227;color:#000;border:none;padding:12px;border-radius:8px;font-weight:800;cursor:pointer">GUARDAR</button>
      <button onclick="fecharModal()" style="flex:1;background:#333;color:#fff;border:none;padding:12px;border-radius:8px;cursor:pointer">CANCELAR</button>
    </div>`;

    if (modal) { modal.style.display='flex'; }
  };

  window.salvarPerfil = function() {
    const nome = document.getElementById('editNome')?.value?.trim();
    const tel  = document.getElementById('editTel')?.value?.trim();
    const mun  = document.getElementById('editMun')?.value?.trim();
    const mor  = document.getElementById('editMor')?.value?.trim();
    if (!nome) { Toast.erro('O nome não pode estar vazio.'); return; }
    DB.users.update(u.id, { nome, telefone:tel, municipio:mun, morada:mor });
    Sessao.refresh();
    Toast.ok('✓ Perfil actualizado!');
    fecharModal();
    setTimeout(() => location.reload(), 800);
  };

  window.fecharModal = function() {
    const m = document.getElementById('modalOverlay');
    if (m) m.style.display='none';
  };

  /* ── Secção Favoritos ── */
  const favGrid = document.getElementById('favoritosGrid') || document.querySelector('.favoritos-grid');
  if (favGrid) {
    const favs = Favoritos.todos();
    if (favs.length === 0) {
      favGrid.innerHTML = '<p style="color:#aaa;text-align:center;padding:40px">Ainda não tem favoritos. <a href="mercado.html" style="color:#c9a227">Explorar produtos</a></p>';
    } else {
      favGrid.innerHTML = favs.map(f => renderProdutoCard(f)).join('');
    }
  }

  /* ── Secção Pedidos ── */
  const pedGrid = document.getElementById('pedidosLista') || document.querySelector('.pedidos-lista');
  if (pedGrid) {
    if (pedidos.length === 0) {
      pedGrid.innerHTML = '<p style="color:#aaa;text-align:center;padding:40px">Ainda não fez nenhum pedido. <a href="mercado.html" style="color:#c9a227">Comprar agora</a></p>';
    } else {
      pedGrid.innerHTML = pedidos.map(p => `
        <div style="background:#1a1a1a;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #2a2a2a">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="color:#c9a227;font-weight:700">#${p.id}</span>
            <span style="color:#27ae60;font-size:12px;background:rgba(39,174,96,.15);padding:4px 10px;border-radius:20px">${p.status}</span>
          </div>
          <p style="color:#fff;margin:8px 0">${p.itens?.length||0} produto(s)</p>
          <p style="color:#c9a227;font-weight:800">${_kz(p.total)}</p>
          <p style="color:#666;font-size:12px">${new Date(p.criadoEm).toLocaleDateString('pt-PT')}</p>
        </div>`).join('');
    }
  }
});
