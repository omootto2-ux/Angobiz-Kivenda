/**
 * ANGOBIZ KIVENDA — PAINÉIS (Admin + Vendedor) protecção e dados reais
 */
document.addEventListener('DOMContentLoaded', () => {
  const pag = window.location.pathname.split('/').pop();

  /* Proteger painéis */
  if (pag === 'painel_admin.html' || pag === 'painel_admin2.html') {
    Sessao.exigirAdmin();
  } else {
    Sessao.exigirVendedor();
  }

  const u = Sessao.get();
  if (!u) return;

  /* ── Preencher nome/tipo na sidebar ── */
  const sideNomes = document.querySelectorAll(
    '.sidebar-nome,.admin-nome,.sb-user-nome,.user-display-name,' +
    '.nome-admin,.nome-vendedor,[data-user-nome]'
  );
  sideNomes.forEach(el => { el.textContent = u.nome; });

  const sideTipos = document.querySelectorAll(
    '.sidebar-tipo,.admin-tipo,.sb-user-tipo,.user-display-role,[data-user-tipo]'
  );
  sideTipos.forEach(el => { el.textContent = u.tipo.charAt(0).toUpperCase() + u.tipo.slice(1); });

  /* ── Logo sidebar com imagem real ── */
  document.querySelectorAll('.logo-circulo-grande,.sidebar-logo .logo-circulo').forEach(el => {
    if (!el.querySelector('img')) {
      el.innerHTML = `<img src="../img/logo.png" alt="AngoBiz" style="width:100%;height:100%;object-fit:contain;border-radius:50%">`;
    }
  });

  /* ── Botões de logout ── */
  document.querySelectorAll(
    '[data-logout],#btnLogout,#btnSair,.btn-logout,.btn-sair,' +
    'a[href*="logout"],a[href*="sair"],button.sair'
  ).forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); Sessao.logout(); });
  });

  /* ── Estatísticas do painel admin ── */
  if (pag === 'painel_admin.html' || pag === 'painel_admin2.html') {
    preencherEstatisticasAdmin();
    preencherTabelasAdmin();
  }

  /* ── Estatísticas do painel vendedor ── */
  if (pag === 'painel_cliente.html') {
    preencherEstatisticasVendedor(u);
  }
});

/* ───────────────────── ADMIN ───────────────────── */
function preencherEstatisticasAdmin() {
  const todos     = DB.users.all();
  const produtos  = DB.produtos.all();
  const servicos  = DB.servicos.all();
  const pedidos   = DB.pedidos.all();

  const stats = [
    { sels: ['#totalUtilizadores','[data-stat="users"]','.stat-users .num','.kpi-users'], val: todos.length },
    { sels: ['#totalProdutos','[data-stat="produtos"]','.stat-prod .num','.kpi-prod'],   val: produtos.length },
    { sels: ['#totalServicos','[data-stat="servicos"]','.stat-serv .num','.kpi-serv'],   val: servicos.length },
    { sels: ['#totalPedidos','[data-stat="pedidos"]','.stat-ped .num','.kpi-ped'],       val: pedidos.length },
    { sels: ['#totalVendedores','[data-stat="vendedores"]'],                              val: todos.filter(u=>u.tipo==='vendedor').length },
    { sels: ['#totalClientes','[data-stat="clientes"]'],                                  val: todos.filter(u=>u.tipo==='cliente').length },
  ];

  stats.forEach(s => {
    s.sels.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.textContent = s.val; });
    });
  });
}

function preencherTabelasAdmin() {
  /* Tabela de utilizadores */
  const tBody = document.getElementById('tabelaUtilizadores') ||
                document.querySelector('#tbl-users tbody, .tabela-users tbody, [data-table="users"]');
  if (tBody) {
    const users = DB.users.all();
    tBody.innerHTML = users.map(u => `
      <tr>
        <td style="padding:10px;color:#fff">${u.id}</td>
        <td style="padding:10px;color:#fff;font-weight:700">${u.nome}</td>
        <td style="padding:10px;color:#aaa">${u.email}</td>
        <td style="padding:10px;color:#aaa">${u.telefone||'-'}</td>
        <td style="padding:10px">
          <span style="background:${u.tipo==='admin'?'#8e44ad':u.tipo==='vendedor'?'#2980b9':'#27ae60'};color:#fff;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">
            ${u.tipo}
          </span>
        </td>
        <td style="padding:10px;color:#aaa">${u.criadoEm ? new Date(u.criadoEm).toLocaleDateString('pt-AO') : '-'}</td>
        <td style="padding:10px">
          <button onclick="adminRemoverUser(${u.id})" style="background:#c0392b;color:#fff;border:none;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:12px">Remover</button>
        </td>
      </tr>`).join('');
  }

  /* Tabela de produtos */
  const tProd = document.getElementById('tabelaProdutos') ||
                document.querySelector('#tbl-produtos tbody,.tabela-produtos tbody,[data-table="produtos"]');
  if (tProd) {
    const prods = DB.produtos.all();
    tProd.innerHTML = prods.map(p => `
      <tr>
        <td style="padding:10px">
          <img src="${p.imagem}" style="width:45px;height:45px;object-fit:cover;border-radius:6px"
               onerror="this.src='https://via.placeholder.com/45x45/1a1a1a/c9a227?text=P'">
        </td>
        <td style="padding:10px;color:#fff;font-weight:700">${p.nome}</td>
        <td style="padding:10px;color:#aaa">${p.categoria||'-'}</td>
        <td style="padding:10px;color:#c9a227;font-weight:700">${_kz(p.preco)}</td>
        <td style="padding:10px;color:#aaa">${p.estoque||0}</td>
        <td style="padding:10px;color:#aaa">${p.vendedorNome||'-'}</td>
        <td style="padding:10px">
          <span style="background:${p.status==='ativo'?'#27ae60':'#c9a227'};color:#000;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">${p.status}</span>
        </td>
        <td style="padding:10px">
          <button onclick="adminRemoverProduto(${p.id})" style="background:#c0392b;color:#fff;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:12px">Remover</button>
        </td>
      </tr>`).join('');
  }
}

window.adminRemoverUser    = function(id) { if(confirm('Remover utilizador?')){ DB.users.update(id,{removido:true}); Toast.ok('Removido.'); location.reload(); } };
window.adminRemoverProduto = function(id) { if(confirm('Remover produto?')){ DB.produtos.remove(id); Toast.ok('Produto removido.'); location.reload(); } };

/* ───────────────────── VENDEDOR ───────────────────── */
function preencherEstatisticasVendedor(u) {
  const meusProdutos = DB.produtos.all().filter(p => p.vendedorId === u.id);
  const meusServicos = DB.servicos.all().filter(s => s.vendedorId === u.id);

  const stats = [
    { sels: ['#totalProdutos','[data-stat="meus-produtos"]','.stat-produtos .num'], val: meusProdutos.length },
    { sels: ['#totalServicos','[data-stat="meus-servicos"]','.stat-servicos .num'], val: meusServicos.length },
    { sels: ['#totalPedidos','[data-stat="meus-pedidos"]','.stat-pedidos .num'],    val: DB.pedidos.all().length },
  ];
  stats.forEach(s => {
    s.sels.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.textContent = s.val; });
    });
  });

  /* Lista dos meus produtos no painel */
  const listaProd = document.getElementById('listaProdutos') ||
                    document.querySelector('.meus-produtos-lista,[data-list="meus-produtos"]');
  if (listaProd) {
    if (meusProdutos.length === 0) {
      listaProd.innerHTML = `<p style="color:#aaa;text-align:center;padding:30px">Nenhum produto cadastrado ainda. <a href="cadastrar_produto.html" style="color:#c9a227">Cadastrar agora</a></p>`;
    } else {
      listaProd.innerHTML = meusProdutos.map(p => `
        <div style="background:#111;border-radius:8px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:14px">
          <img src="${p.imagem}" style="width:56px;height:56px;object-fit:cover;border-radius:6px"
               onerror="this.src='https://via.placeholder.com/56x56/1a1a1a/c9a227?text=P'">
          <div style="flex:1">
            <p style="color:#fff;font-weight:700;margin:0">${p.nome}</p>
            <p style="color:#aaa;font-size:12px;margin:4px 0">${p.categoria} · Stock: ${p.estoque}</p>
            <span style="color:#c9a227;font-weight:900">${_kz(p.preco)}</span>
          </div>
          <div style="display:flex;gap:8px">
            <span style="background:${p.status==='ativo'?'#27ae60':'#c9a227'};color:#000;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700">${p.status}</span>
            <button onclick="DB.produtos.remove(${p.id});Toast.ok('Produto removido.');location.reload()"
              style="background:none;border:1px solid #c0392b;color:#c0392b;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Remover</button>
          </div>
        </div>`).join('');
    }
  }
}
