/**
 * ANGOBIZ KIVENDA — Painel Administrador
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirAdmin();
  const u = Sessao.get();

  /* Preencher info do admin na sidebar */
  document.querySelectorAll('.admin-nome,.sidebar-nome').forEach(el => el.textContent = u.nome);
  document.querySelectorAll('.admin-tipo,.sidebar-tipo').forEach(el => el.textContent = 'Administrador');

  /* Stats do dashboard */
  const users    = DB.users.all();
  const produtos = DB.produtos.all();
  const servicos = DB.servicos.all();
  const pedidos  = DB.pedidos.all();

  const st = (id, val) => { const el=document.getElementById(id)||document.querySelector('[data-stat="'+id+'"]'); if(el) el.textContent=val; };
  st('totalUsers',    users.length);
  st('totalProdutos', produtos.length);
  st('totalServicos', servicos.length);
  st('totalPedidos',  pedidos.length);
  st('totalVendedores', users.filter(u=>u.tipo==='vendedor').length);
  st('totalClientes',   users.filter(u=>u.tipo==='cliente').length);

  /* Preencher cards de stats nos dashboards (texto genérico) */
  document.querySelectorAll('.stat-card,.kpi-card,.dashboard-stat').forEach((card,i) => {
    const num = card.querySelector('.stat-num,.kpi-num,.stat-value,.num-stat');
    const lbl = card.querySelector('.stat-label,.kpi-label,.stat-name');
    if (!num || !lbl) return;
    const txt = lbl.textContent.toLowerCase();
    if (txt.includes('utilizador') || txt.includes('usuario') || txt.includes('user'))  num.textContent = users.length;
    if (txt.includes('produto'))  num.textContent = produtos.length;
    if (txt.includes('serviço') || txt.includes('servico')) num.textContent = servicos.length;
    if (txt.includes('pedido'))   num.textContent = pedidos.length;
    if (txt.includes('vendedor')) num.textContent = users.filter(u=>u.tipo==='vendedor').length;
  });

  /* Tabela de utilizadores */
  renderUsers();
  renderProdutos();
  renderServicos();

  function renderUsers() {
    const tbody = document.getElementById('tabelaUsers') || document.getElementById('listaUsers') || document.querySelector('.tabela-users tbody,.users-table tbody');
    if (!tbody) return;
    const arr = DB.users.all();
    tbody.innerHTML = arr.map(u => `
    <tr>
      <td>${u.id}</td>
      <td><strong style="color:#fff">${u.nome}</strong></td>
      <td style="color:#aaa">${u.email}</td>
      <td style="color:#aaa">${u.telefone||'—'}</td>
      <td><span style="background:${u.tipo==='admin'?'#c9a227':u.tipo==='vendedor'?'#2980b9':'#27ae60'};color:#000;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">${u.tipo}</span></td>
      <td style="color:#aaa;font-size:12px">${new Date(u.criadoEm||Date.now()).toLocaleDateString('pt-PT')}</td>
      <td>
        <button onclick="adminApagarUser(${u.id})" style="background:#e74c3c;border:none;color:#fff;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Apagar</button>
      </td>
    </tr>`).join('');
  }

  function renderProdutos() {
    const tbody = document.getElementById('tabelaProdutos') || document.getElementById('listaProdutos') || document.querySelector('.tabela-produtos tbody');
    if (!tbody) return;
    const arr = DB.produtos.all();
    tbody.innerHTML = arr.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${p.imagem||''}" style="width:40px;height:40px;object-fit:cover;border-radius:4px" onerror="this.style.display='none'"></td>
      <td><strong style="color:#fff">${p.nome}</strong></td>
      <td style="color:#aaa">${p.categoria||'—'}</td>
      <td style="color:#c9a227;font-weight:700">${_kz(p.preco)}</td>
      <td style="color:#aaa">${p.estoque||0}</td>
      <td><span style="color:${p.status==='ativo'?'#27ae60':'#e74c3c'}">${p.status}</span></td>
      <td>
        <button onclick="adminApagarProduto(${p.id})" style="background:#e74c3c;border:none;color:#fff;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Apagar</button>
      </td>
    </tr>`).join('');
  }

  function renderServicos() {
    const tbody = document.getElementById('tabelaServicos') || document.getElementById('listaServicos') || document.querySelector('.tabela-servicos tbody');
    if (!tbody) return;
    const arr = DB.servicos.all();
    tbody.innerHTML = arr.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><strong style="color:#fff">${s.nome}</strong></td>
      <td style="color:#aaa">${s.categoria||'—'}</td>
      <td style="color:#c9a227;font-weight:700">${_kz(s.preco)}</td>
      <td style="color:#aaa">${s.vendedorNome||'—'}</td>
      <td><span style="color:${s.status==='ativo'?'#27ae60':'#e74c3c'}">${s.status}</span></td>
      <td>
        <button onclick="adminApagarServico(${s.id})" style="background:#e74c3c;border:none;color:#fff;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Apagar</button>
      </td>
    </tr>`).join('');
  }

  window.adminApagarUser = function(id) {
    const u2 = DB.users.findById(id);
    if (!u2) return;
    if (u2.tipo==='admin') { Toast.erro('Não pode apagar o administrador.'); return; }
    if (!confirm('Apagar utilizador "' + u2.nome + '"?')) return;
    DB.users.save(DB.users.all().filter(x=>x.id!==id));
    Toast.ok('Utilizador apagado.');
    renderUsers();
  };
  window.adminApagarProduto = function(id) {
    if (!confirm('Apagar este produto?')) return;
    DB.produtos.remove(id);
    Toast.ok('Produto apagado.');
    renderProdutos();
  };
  window.adminApagarServico = function(id) {
    if (!confirm('Apagar este serviço?')) return;
    DB.servicos.remove(id);
    Toast.ok('Serviço apagado.');
    renderServicos();
  };

  /* Logout */
  document.querySelectorAll('[data-logout],[id*="logout"],[id*="sair"],a[href*="logout"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); Sessao.logout(); });
  });

  /* Navegação sidebar */
  document.querySelectorAll('.sb-item,[data-secao]').forEach(item => {
    item.addEventListener('click', function() {
      const secao = this.dataset.secao || this.querySelector('[data-secao]')?.dataset.secao;
      if (!secao) return;
      document.querySelectorAll('.painel-secao,.admin-secao').forEach(s => s.style.display='none');
      document.getElementById('sec-'+secao)?.style && (document.getElementById('sec-'+secao).style.display='');
    });
  });
});
