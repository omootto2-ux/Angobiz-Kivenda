/**
 * ANGOBIZ KIVENDA — PERFIL DO CLIENTE (dados reais do utilizador logado)
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirLogin();
  const u = Sessao.get();

  /* ── Preencher card de perfil ── */
  const profileName   = document.querySelector('.profile-name');
  const profileAvatar = document.getElementById('profileAvatar');
  const profileDetails = document.querySelectorAll('.profile-detail');

  if (profileName)   profileName.innerHTML = u.nome + ' <i class="fas fa-circle-check verified-icon"></i>';
  if (profileAvatar) profileAvatar.alt = u.nome;

  /* Preencher detalhes email, telefone, localização */
  const emailEl    = document.querySelector('.profile-detail:nth-child(2)');
  const telEl      = document.querySelector('.profile-detail:nth-child(3)');
  const localEl    = document.querySelector('.profile-detail:nth-child(4)');

  if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${u.email}`;
  if (telEl)   telEl.innerHTML   = `<i class="fas fa-phone" style="color:#f59e0b"></i> ${u.telefone || 'Não definido'}`;
  if (localEl) localEl.innerHTML = `<i class="fas fa-location-dot" style="color:#ef4444"></i> ${u.provincia || 'Angola'}${u.municipio ? ', '+u.municipio : ''}`;

  /* Data de membro */
  const memberDate = document.querySelector('.member-date');
  if (memberDate && u.criadoEm) {
    const d = new Date(u.criadoEm);
    memberDate.textContent = d.toLocaleDateString('pt-AO', { month:'long', year:'numeric' });
  }

  /* Estatísticas reais */
  const pedidos   = DB.pedidos.doCliente(u.id);
  const favoritos = Favoritos.todos();
  const carrinho  = Carrinho.obter();

  document.querySelectorAll('.stat-num').forEach((el, i) => {
    if (i===0) el.textContent = pedidos.length;
    if (i===1) el.textContent = favoritos.length;
  });

  /* ── Secções dinâmicas ── */
  const contentMap = {
    pedidos:   renderPedidos,
    favoritos: renderFavoritos,
    carrinho:  renderCarrinhoSection,
    dados:     renderDadosPessoais,
  };

  /* Navegação interna */
  window.navegarPara = function(secao) {
    const mainContent = document.querySelector('.bottom-grid .options-list');
    /* highlight */
    document.querySelectorAll('.option-item').forEach(it => it.classList.remove('ativo'));
    const item = document.querySelector(`.option-item[onclick*="${secao}"]`);
    if (item) item.classList.add('ativo');

    const area = document.getElementById('secao-dinamica');
    if (!area) {
      /* Criar área dinâmica se não existe */
      const bd = document.querySelector('.bottom-grid');
      if (bd) {
        const div = document.createElement('div');
        div.id = 'secao-dinamica';
        div.style.cssText = 'background:#1a1a1a;border-radius:12px;padding:24px;margin-top:16px;';
        bd.appendChild(div);
        (contentMap[secao] || (() => {}))(div);
      }
    } else {
      (contentMap[secao] || (() => {}))(area);
    }
    window.scrollTo({ top: document.querySelector('.bottom-grid')?.offsetTop - 80 || 0, behavior:'smooth' });
  };

  function renderPedidos(area) {
    const lista = DB.pedidos.doCliente(u.id);
    area.innerHTML = `<h3 style="color:#c9a227;margin:0 0 16px"><i class="fas fa-bag-shopping"></i> Meus Pedidos</h3>` +
      (lista.length === 0
        ? `<p style="color:#aaa;text-align:center;padding:40px">Ainda não fez nenhuma compra. <a href="mercado.html" style="color:#c9a227">Ir ao Mercado</a></p>`
        : lista.map(p => `
          <div style="background:#111;border-radius:8px;padding:16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
            <div><strong style="color:#fff">#${p.id}</strong>
              <p style="color:#aaa;font-size:13px;margin:4px 0">${new Date(p.criadoEm).toLocaleDateString('pt-AO')}</p>
              <p style="color:#aaa;font-size:13px">${p.itens?.length||0} produto(s)</p>
            </div>
            <div style="text-align:right">
              <span style="color:#c9a227;font-weight:900;font-size:18px">${_kz(p.total||0)}</span>
              <br><span style="background:${p.status==='entregue'?'#27ae60':p.status==='pendente'?'#c9a227':'#2980b9'};color:#000;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700">${p.status}</span>
            </div>
          </div>`).join('')
      );
  }

  function renderFavoritos(area) {
    const lista = Favoritos.todos();
    area.innerHTML = `<h3 style="color:#c9a227;margin:0 0 16px"><i class="fas fa-heart"></i> Produtos Favoritos</h3>`;
    if (lista.length === 0) {
      area.innerHTML += `<p style="color:#aaa;text-align:center;padding:40px">Nenhum favorito ainda. <a href="mercado.html" style="color:#c9a227">Explorar produtos</a></p>`;
      return;
    }
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-top:16px';
    grid.innerHTML = lista.map(f => `
      <div style="background:#111;border-radius:8px;overflow:hidden">
        <img src="${f.imagem}" alt="${f.nome}" style="width:100%;height:130px;object-fit:cover"
             onerror="this.src='https://via.placeholder.com/200x130/111/c9a227?text=Produto'">
        <div style="padding:12px">
          <p style="color:#fff;font-size:13px;font-weight:700;margin:0 0 6px">${f.nome}</p>
          <p style="color:#c9a227;font-weight:900">${_kz(f.preco)}</p>
          <button onclick="Carrinho.adicionar({id:${f.id},nome:'${(f.nome||'').replace(/'/g,"\\'")}',preco:${f.preco},imagem:'${f.imagem}'});Toast.ok('Adicionado!')"
            style="width:100%;background:#c9a227;color:#000;border:none;padding:8px;border-radius:6px;font-weight:700;cursor:pointer;margin-top:8px;font-size:12px">
            <i class="fa fa-cart-plus"></i> Adicionar ao carrinho
          </button>
        </div>
      </div>`).join('');
    area.appendChild(grid);
  }

  function renderCarrinhoSection(area) {
    const itens = Carrinho.obter();
    area.innerHTML = `<h3 style="color:#c9a227;margin:0 0 16px"><i class="fas fa-shopping-cart"></i> Meu Carrinho</h3>`;
    if (itens.length === 0) {
      area.innerHTML += `<p style="color:#aaa;text-align:center;padding:40px">Carrinho vazio. <a href="mercado.html" style="color:#c9a227">Ir às compras</a></p>`;
      return;
    }
    area.innerHTML += itens.map(it => `
      <div style="background:#111;border-radius:8px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:14px">
        <img src="${it.imagem}" style="width:60px;height:60px;object-fit:cover;border-radius:6px"
             onerror="this.src='https://via.placeholder.com/60x60/111/c9a227?text=P'">
        <div style="flex:1"><p style="color:#fff;font-weight:700;margin:0">${it.nome}</p>
          <p style="color:#c9a227;margin:4px 0">${_kz(it.preco)}</p></div>
        <span style="color:#fff;font-weight:900">Qtd: ${it.qty}</span>
        <strong style="color:#c9a227">${_kz(it.preco*it.qty)}</strong>
      </div>`).join('')
    + `<div style="text-align:right;margin-top:16px">
        <p style="color:#fff;font-size:20px;font-weight:900">Total: <span style="color:#c9a227">${_kz(Carrinho.total())}</span></p>
        <a href="carrinho.html" style="display:inline-block;background:#c9a227;color:#000;padding:12px 28px;border-radius:8px;font-weight:800;text-decoration:none;margin-top:10px">VER CARRINHO COMPLETO</a>
      </div>`;
  }

  function renderDadosPessoais(area) {
    area.innerHTML = `
    <h3 style="color:#c9a227;margin:0 0 20px"><i class="fas fa-user-edit"></i> Editar Dados Pessoais</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div>
        <label style="color:#aaa;font-size:13px;display:block;margin-bottom:6px">Nome Completo</label>
        <input id="editNome" value="${u.nome}" style="width:100%;background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px">
      </div>
      <div>
        <label style="color:#aaa;font-size:13px;display:block;margin-bottom:6px">Email</label>
        <input id="editEmail" value="${u.email}" style="width:100%;background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px">
      </div>
      <div>
        <label style="color:#aaa;font-size:13px;display:block;margin-bottom:6px">Telefone</label>
        <input id="editTel" value="${u.telefone||''}" style="width:100%;background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px">
      </div>
      <div>
        <label style="color:#aaa;font-size:13px;display:block;margin-bottom:6px">Província</label>
        <input id="editProv" value="${u.provincia||''}" style="width:100%;background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px">
      </div>
    </div>
    <button onclick="guardarPerfil()" style="background:#c9a227;color:#000;border:none;padding:12px 28px;border-radius:8px;font-weight:800;cursor:pointer">GUARDAR ALTERAÇÕES</button>`;

    window.guardarPerfil = function() {
      const campos = {
        nome:      document.getElementById('editNome')?.value?.trim() || u.nome,
        email:     document.getElementById('editEmail')?.value?.trim() || u.email,
        telefone:  document.getElementById('editTel')?.value?.trim() || u.telefone,
        provincia: document.getElementById('editProv')?.value?.trim() || u.provincia,
      };
      DB.users.update(u.id, campos);
      Sessao.refresh();
      Toast.ok('✓ Perfil actualizado com sucesso!');
      setTimeout(() => window.location.reload(), 1200);
    };
  }

  /* ── Editar perfil (botão principal) ── */
  window.editarPerfil = () => {
    const area = document.getElementById('secao-dinamica') || (() => {
      const bd = document.querySelector('.bottom-grid');
      const div = document.createElement('div');
      div.id = 'secao-dinamica';
      div.style.cssText = 'background:#1a1a1a;border-radius:12px;padding:24px;margin-top:16px';
      bd?.appendChild(div);
      return div;
    })();
    renderDadosPessoais(area);
    area.scrollIntoView({ behavior:'smooth' });
  };
});
