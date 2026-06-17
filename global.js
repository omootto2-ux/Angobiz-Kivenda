/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║   ANGOBIZ KIVENDA — GLOBAL.JS  (versão 3.0 — COMPLETO)             ║
 * ║   Base de dados em localStorage • Sessão persistente               ║
 * ║   Utilizadores • Produtos • Serviços • Carrinho • Favoritos        ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

/* ─────────────────────────────────────────────────────────────────
   PATHS (detecta se estamos em /pages/ ou na raiz)
───────────────────────────────────────────────────────────────── */
const _inPages = window.location.pathname.includes('/pages/');
const _root    = _inPages ? '../' : '';
const _pages   = _inPages ? ''   : 'pages/';

/* ─────────────────────────────────────────────────────────────────
   BASE DE DADOS LOCAL (localStorage) — chaves
───────────────────────────────────────────────────────────────── */
const DB_KEYS = {
  USERS:    'akdb_users',
  PRODUTOS: 'akdb_produtos',
  SERVICOS: 'akdb_servicos',
  PEDIDOS:  'akdb_pedidos',
  SESSAO:   'ak_sessao',
  CARRINHO: 'ak_carrinho',
  FAVORITOS:'ak_favoritos',
};

/* ─────────────────────────────────────────────────────────────────
   BANCO DE DADOS LOCAL
───────────────────────────────────────────────────────────────── */
const DB = {
  _read(k)    { try { return JSON.parse(localStorage.getItem(k)||'[]'); } catch { return []; } },
  _write(k,v) { localStorage.setItem(k, JSON.stringify(v)); },

  /* UTILIZADORES */
  users: {
    all()    { return DB._read(DB_KEYS.USERS); },
    save(arr){ DB._write(DB_KEYS.USERS, arr); },

    find(email) {
      return this.all().find(u => u.email.toLowerCase() === email.toLowerCase()
                                || u.telefone === email);
    },
    findById(id) { return this.all().find(u => u.id === id); },

    add(u)   {
      const arr = this.all();
      arr.push(u);
      this.save(arr);
    },
    update(id, campos) {
      const arr = this.all();
      const i   = arr.findIndex(u => u.id === id);
      if (i >= 0) { arr[i] = { ...arr[i], ...campos }; this.save(arr); return arr[i]; }
      return null;
    },




    // Nova funcionalidade para redefinir senha através do e-mail ou telefone
  redefinirSenhaPorContacto(contacto, novaSenha) {
    let users = this._read(DB_KEYS.USERS);
    let index = users.findIndex(u => u.email === contacto || u.telefone === contacto);
    
    if (index === -1) return { ok: false, msg: 'Utilizador não encontrado.' };
    
    // Atualiza a senha do utilizador encontrado
    users[index].senha = novaSenha;
    this._write(DB_KEYS.USERS, users);
    return { ok: true, msg: 'Senha atualizada com sucesso!' };
  },


  
  },

  /* PRODUTOS */
  produtos: {
    all()    { return DB._read(DB_KEYS.PRODUTOS); },
    save(arr){ DB._write(DB_KEYS.PRODUTOS, arr); },

    ativos() { return this.all().filter(p => p.status === 'ativo'); },

    add(p)   {
      const arr = this.all();
      const id  = Date.now() + Math.floor(Math.random()*1000);
      const novo = { ...p, id, criadoEm: new Date().toISOString(), status:'ativo' };
      arr.push(novo);
      this.save(arr);
      return novo;
    },
    findById(id){ return this.all().find(p => p.id === id); },

    update(id, campos) {
      const arr = this.all();
      const i   = arr.findIndex(p => p.id === id);
      if (i >= 0) { arr[i] = { ...arr[i], ...campos }; this.save(arr); }
    },
    remove(id) { this.save(this.all().filter(p => p.id !== id)); },
  },

  /* SERVIÇOS */
  servicos: {
    all()    { return DB._read(DB_KEYS.SERVICOS); },
    save(arr){ DB._write(DB_KEYS.SERVICOS, arr); },

    ativos() { return this.all().filter(s => s.status === 'ativo'); },

    add(p) {
    const arr = this.all();
    const id  = Date.now() + Math.floor(Math.random()*1000);
    // ALTERADO: Aceita p.status enviado pelo formulário, ou define 'ativo' por padrão
    const novo = { ...p, id, criadoEm: new Date().toISOString(), status: p.status || 'ativo' };
    arr.push(novo);
    this.save(arr);
    return novo;
  },
    findById(id){ return this.all().find(s => s.id === id); },
    remove(id) { this.save(this.all().filter(s => s.id !== id)); },
  },

  /* PEDIDOS */
  pedidos: {
    all()    { return DB._read(DB_KEYS.PEDIDOS); },
    save(arr){ DB._write(DB_KEYS.PEDIDOS, arr); },
    add(p)   {
      const arr = this.all();
      const id  = 'AK-' + Math.random().toString(36).substr(2,6).toUpperCase();
      const novo = { ...p, id, criadoEm: new Date().toISOString(), status:'pendente' };
      arr.push(novo);
      this.save(arr);
      return novo;
    },
    doCliente(uid) { return this.all().filter(p => p.clienteId === uid); },
  },

  /* Inicializar dados de demonstração SE ainda não existirem */
  init() {
    /* Admin padrão */
    if (this.users.all().length === 0) {
      this.users.save([
        { id:1, nome:'Administrador AngoBiz', email:'admin@angobizkivenda.ao',
          telefone:'+244923456789', senha:'Admin@123', tipo:'admin',
          provincia:'Luanda', municipio:'Ingombota', morada:'Rua da Kivenda, 123',
          criadoEm: new Date().toISOString(), avatar:'' },
        { id:2, nome:'João Vendedor', email:'vendedor@kivenda.ao',
          telefone:'923111111', senha:'Vendedor@1', tipo:'vendedor',
          nomeLoja:'Loja do João', provincia:'Luanda', municipio:'Talatona',
          criadoEm: new Date().toISOString(), avatar:'' },
        { id:3, nome:'Maria Cliente', email:'cliente@kivenda.ao',
          telefone:'923222222', senha:'Cliente@1', tipo:'cliente',
          provincia:'Luanda', municipio:'Maianga',
          criadoEm: new Date().toISOString(), avatar:'' },
      ]);
    }

    /* Produtos de exemplo se não houver nenhum */
    if (this.produtos.all().length === 0) {
      const demos = [
        { nome:'Laptop Dell Inspiron 15', categoria:'Eletrónicos', marca:'Dell', preco:450000, precoPromo:405000, estoque:15, descricao:'Processador i5, 8GB RAM, SSD 256GB.', imagem:'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Smartphone Samsung Galaxy A54', categoria:'Telemóveis', marca:'Samsung', preco:180000, precoPromo:0, estoque:30, descricao:'Câmera 50MP, bateria 5000mAh, ecrã AMOLED.', imagem:'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Cadeira Ergonómica Premium', categoria:'Escritório', marca:'Genérica', preco:95000, precoPromo:0, estoque:20, descricao:'Apoio lombar ajustável, rodas silenciosas.', imagem:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'TV Samsung 50" Smart 4K', categoria:'Eletrónicos', marca:'Samsung', preco:390000, precoPromo:340000, estoque:10, descricao:'UHD 4K, HDR, WiFi, Netflix e YouTube.', imagem:'https://images.unsplash.com/photo-1593359677879-a4bb92f4834f?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Gerador Eléctrico 3.5KVA', categoria:'Indústria', marca:'PowerMax', preco:280000, precoPromo:0, estoque:6, descricao:'A gasolina, ideal para uso doméstico.', imagem:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Sofá 3 Lugares Cinza', categoria:'Casa & Decoração', marca:'DecoHome', preco:195000, precoPromo:165000, estoque:3, descricao:'Tecido de alta durabilidade. Entrega em Luanda.', imagem:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Furadeira Bosch 500W', categoria:'Ferramentas', marca:'Bosch', preco:68000, precoPromo:58000, estoque:25, descricao:'Furadeira de impacto 500W, mandril 13mm.', imagem:'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
        { nome:'Pneu Michelin 195/65 R15', categoria:'Automóvel', marca:'Michelin', preco:42000, precoPromo:0, estoque:50, descricao:'Pneu premium para berlines e SUV compactos.', imagem:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João' },
      ];
      demos.forEach(d => this.produtos.add(d));
    }

    /* Serviços de exemplo */
    if (this.servicos.all().length === 0) {
      const demos = [
        { nome:'Reparação de Computadores', categoria:'Tecnologia', preco:15000, descricao:'Diagnóstico e reparação de PCs e portáteis em Luanda.', imagem:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João', cidade:'Luanda', formato:'presencial' },
        { nome:'Instalação Elétrica Residencial', categoria:'Construção', preco:30000, descricao:'Instalação e manutenção de quadros eléctricos.', imagem:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João', cidade:'Luanda', formato:'presencial' },
        { nome:'Design Gráfico & Branding', categoria:'Marketing', preco:20000, descricao:'Logos, flyers, cartões de visita e identidade visual.', imagem:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', vendedorId:2, vendedorNome:'Loja do João', cidade:'Online', formato:'online' },
      ];
      demos.forEach(s => this.servicos.add(s));
    }
  }
};

/* ─────────────────────────────────────────────────────────────────
   SESSÃO — persistente no localStorage
───────────────────────────────────────────────────────────────── */
const Sessao = {
  get()    { try { return JSON.parse(localStorage.getItem(DB_KEYS.SESSAO)||'null'); } catch { return null; } },
  set(u)   { localStorage.setItem(DB_KEYS.SESSAO, JSON.stringify(u)); },
  clear()  { localStorage.removeItem(DB_KEYS.SESSAO); },
  logado() { return !!this.get(); },
  isAdmin(){ return this.get()?.tipo === 'admin'; },
  isVendedor(){ return ['vendedor','admin'].includes(this.get()?.tipo); },
  isCliente(){ return this.get()?.tipo === 'cliente'; },

  login(email, senha) {
    const u = DB.users.find(email);
    if (!u)             return { ok:false, msg:'Utilizador não encontrado.' };
    if (u.senha !== senha) return { ok:false, msg:'Senha incorrecta.' };
    const clone = { ...u }; delete clone.senha;
    this.set(clone);
    return { ok:true, utilizador: clone };
  },

  registar(dados) {
    if (DB.users.find(dados.email))
      return { ok:false, msg:'Já existe uma conta com este email.' };
    const novo = {
      id: Date.now(),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || '',
      senha: dados.senha,
      tipo: dados.tipo || 'cliente',
      provincia: dados.provincia || '',
      municipio: dados.municipio || '',
      morada: dados.morada || '',
      nomeLoja: dados.nomeLoja || '',
      criadoEm: new Date().toISOString(),
      avatar: '',
    };
    DB.users.add(novo);
    const clone = { ...novo }; delete clone.senha;
    this.set(clone);
    return { ok:true, utilizador: clone };
  },

  logout() {
    this.clear();
    window.location.href = _root + 'pages/login.html';
  },

  /* Actualizar dados na sessão (após editar perfil) */
  refresh() {
    const s = this.get();
    if (!s) return;
    const u = DB.users.findById(s.id);
    if (u) { const c = {...u}; delete c.senha; this.set(c); }
  },

  /* Proteger página — chamar no topo de páginas restritas */
  exigirLogin(redir) {
    if (!this.logado()) {
      window.location.href = _root + 'pages/login.html?next=' + encodeURIComponent(redir || window.location.href);
    }
  },
  exigirVendedor() {
    this.exigirLogin();
    if (!this.isVendedor()) { Toast.erro('Acesso restrito a vendedores.'); setTimeout(()=>window.location.href=_root+'pages/home.html',1500); }
  },
  exigirAdmin() {
    this.exigirLogin();
    if (!this.isAdmin()) { Toast.erro('Acesso restrito a administradores.'); setTimeout(()=>window.location.href=_root+'pages/home.html',1500); }
  },
};

/* ─────────────────────────────────────────────────────────────────
   CARRINHO — sempre ligado ao utilizador logado (por userId)
───────────────────────────────────────────────────────────────── */
const Carrinho = {
  _key() {
    const u = Sessao.get();
    return u ? DB_KEYS.CARRINHO + '_' + u.id : DB_KEYS.CARRINHO + '_guest';
  },
  obter()     { try { return JSON.parse(localStorage.getItem(this._key())||'[]'); } catch { return []; } },
  _guardar(a) { localStorage.setItem(this._key(), JSON.stringify(a)); this._badge(); window.dispatchEvent(new CustomEvent('carrinho:atualizado')); },

  adicionar(p, qty=1) {
    const a = this.obter();
    const i = a.findIndex(x => x.id === p.id);
    if (i >= 0) a[i].qty = Math.min(a[i].qty + qty, 99);
    else a.push({ id:p.id, nome:p.nome, preco:parseFloat(p.precoPromo||p.preco_promo||p.preco||0)||0, imagem:p.imagem||p.img||'', qty, tipo: p.tipo||'produto' });
    this._guardar(a);
    Toast.ok('✓ Adicionado ao carrinho!');
  },
  remover(id)       { this._guardar(this.obter().filter(x => x.id !== id)); },
  alterarQty(id, q) {
    const a = this.obter();
    const i = a.findIndex(x => x.id === id);
    if (i >= 0) { if (q <= 0) a.splice(i,1); else a[i].qty = q; }
    this._guardar(a);
  },
  limpar()    { this._guardar([]); },
  total()     { return this.obter().reduce((s,x) => s + x.preco * x.qty, 0); },
  qtdTotal()  { return this.obter().reduce((s,x) => s + x.qty, 0); },
  _badge()    {
    document.querySelectorAll('.cart-badge').forEach(el => {
      const n = this.qtdTotal(); el.textContent = n; el.style.display = n > 0 ? '' : 'none';
    });
  },
};

/* ─────────────────────────────────────────────────────────────────
   FAVORITOS — ligados ao utilizador
───────────────────────────────────────────────────────────────── */
const Favoritos = {
  _key() {
    const u = Sessao.get();
    return u ? DB_KEYS.FAVORITOS + '_' + u.id : DB_KEYS.FAVORITOS + '_guest';
  },
  obter()   { try { return JSON.parse(localStorage.getItem(this._key())||'[]'); } catch { return []; } },
  _save(a)  { localStorage.setItem(this._key(), JSON.stringify(a)); },

  toggle(produtoObjeto) {
    const a   = this.obter();
    const idx = a.findIndex(x => x.id === produtoObjeto.id);
    if (idx >= 0) { a.splice(idx,1); this._save(a); return false; }
    a.push({ id:produtoObjeto.id, nome:produtoObjeto.nome, preco:parseFloat(produtoObjeto.precoPromo||produtoObjeto.preco||0), imagem:produtoObjeto.imagem||'', tipo:produtoObjeto.tipo||'produto' });
    this._save(a);
    return true;
  },
  tem(id)   { return this.obter().some(x => x.id === id); },
  todos()   { return this.obter(); },

  adicionarAoCarrinho(id) {
    const f = this.obter().find(x => x.id === id);
    if (f) Carrinho.adicionar(f);
  },
};

/* ─────────────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────────────── */
const Toast = {
  _el: null, _t: null,
  _init() {
    if (this._el) return;
    this._el = document.createElement('div');
    Object.assign(this._el.style, {
      position:'fixed',bottom:'28px',right:'28px',zIndex:'99999',
      padding:'14px 24px',borderRadius:'10px',fontSize:'14px',fontWeight:'700',
      fontFamily:"'Montserrat',sans-serif",boxShadow:'0 6px 30px rgba(0,0,0,.5)',
      transition:'opacity .3s,transform .3s',opacity:'0',transform:'translateY(10px)',
      maxWidth:'340px',lineHeight:'1.5',pointerEvents:'none'
    });
    document.body.appendChild(this._el);
  },
  _show(msg, bg) {
    this._init();
    this._el.style.background = bg; this._el.style.color = '#fff'; this._el.textContent = msg;
    this._el.style.opacity='1'; this._el.style.transform='translateY(0)';
    clearTimeout(this._t);
    this._t = setTimeout(() => { this._el.style.opacity='0'; this._el.style.transform='translateY(10px)'; }, 3500);
  },
  ok(m)    { this._show(m,'#27ae60'); },
  erro(m)  { this._show(m,'#c0392b'); },
  info(m)  { this._show(m,'#2980b9'); },
  aviso(m) { this._show(m,'#c9a227'); },
};
function mostrarToast(m){ Toast.info(m); }

/* ─────────────────────────────────────────────────────────────────
   BUSCA GLOBAL
───────────────────────────────────────────────────────────────── */
function executarBusca() {
  const q = (document.getElementById('inputBusca')||{}).value?.trim();
  if (!q) return;
  window.location.href = _root + 'pages/mercado.html?q=' + encodeURIComponent(q);
}
function buscarEnter(e) { if(e.key==='Enter') executarBusca(); }
function selecionarCategoriaBusca(e, cat) {
  e.preventDefault();
  const btn = document.getElementById('buscaCatBtn');
  if (btn) btn.firstChild.textContent = cat + ' ';
  document.getElementById('buscaCatDrop')?.classList.remove('aberto');
}
function _newsSubscribe(btn) {
  const inp = btn.parentElement?.querySelector('input[type="email"]') || document.querySelector('.newsletter-form input');
  if (!inp?.value){ Toast.aviso('Introduza o seu email.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){ Toast.erro('Email inválido.'); return; }
  btn.textContent='✓ Subscrito!'; btn.style.background='#27ae60'; btn.disabled=true;
  Toast.ok('Subscrito com sucesso!');
  setTimeout(()=>{btn.textContent='SUBSCREVER';btn.style.background='';btn.disabled=false;inp.value='';},4000);
}

/* ─────────────────────────────────────────────────────────────────
   FORMATAR PREÇO
───────────────────────────────────────────────────────────────── */
function _kz(v) { return parseFloat(v||0).toLocaleString('pt-AO') + ' Kz'; }

/* ─────────────────────────────────────────────────────────────────
   RENDER CARD PRODUTO (usado em home, mercado, favoritos, etc.)
───────────────────────────────────────────────────────────────── */
function renderProdutoCard(p) {
  const temPromo = p.precoPromo && parseFloat(p.precoPromo) > 0 && parseFloat(p.precoPromo) < parseFloat(p.preco);
  const precoFinal = temPromo ? parseFloat(p.precoPromo) : parseFloat(p.preco);
  const desc = temPromo ? Math.round((1 - precoFinal/parseFloat(p.preco))*100) : 0;
  const fav  = Favoritos.tem(p.id);
  const stars = Array.from({length:5},(_,i)=>`<i class="fa ${i<Math.round(p.estrelas||4.5)?'fa-star':'fa-star-o'}"></i>`).join('');

  return `
  <div class="produto-card" data-id="${p.id}" style="background:#1a1a1a;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.4);transition:transform .2s;position:relative;">
    ${desc?`<div style="position:absolute;top:10px;left:10px;background:#c0392b;color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;z-index:2">-${desc}%</div>`:''}
    <button onclick="_toggleFav(this,${p.id})" style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,.6);border:none;color:${fav?'#e74c3c':'#fff'};width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;z-index:2"
      title="${fav?'Remover favorito':'Adicionar favorito'}"><i class="fa ${fav?'fa-heart':'fa-heart-o'}"></i></button>
    <a href="${_pages}produto.html?id=${p.id}" style="display:block;height:180px;overflow:hidden;">
      <img src="${p.imagem||'https://via.placeholder.com/300x180/1a1a1a/c9a227?text=Produto'}" alt="${p.nome}"
           loading="lazy" style="width:100%;height:100%;object-fit:cover;"
           onerror="this.src='https://via.placeholder.com/300x180/1a1a1a/c9a227?text=${encodeURIComponent(p.nome||'Produto')}'"/>
    </a>
    <div style="padding:14px;">
      <span style="color:#c9a227;font-size:11px;font-weight:700;text-transform:uppercase">${p.categoria||''}</span>
      <a href="${_pages}produto.html?id=${p.id}" style="text-decoration:none"><h3 style="color:#fff;font-size:14px;margin:6px 0;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.nome}</h3></a>
      <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
        <span style="color:#c9a227;font-size:18px;font-weight:900">${_kz(precoFinal)}</span>
        ${temPromo?`<span style="color:#666;font-size:12px;text-decoration:line-through">${_kz(p.preco)}</span>`:''}
      </div>
      <div style="color:#c9a227;font-size:12px;margin-bottom:10px">${stars}</div>
      <p style="color:#888;font-size:11px;margin-bottom:10px"><i class="fas fa-store" style="margin-right:4px"></i>${p.vendedorNome||'AngoBiz Kivenda'}</p>
      <button onclick="_addToCart(${p.id})" style="width:100%;background:#c9a227;color:#000;border:none;padding:10px;border-radius:8px;font-weight:800;font-size:13px;cursor:pointer;transition:background .2s">
        <i class="fa fa-shopping-cart"></i> ADICIONAR AO CARRINHO
      </button>
    </div>
  </div>`;
}

function renderServicoCard(s) {
  const fav = Favoritos.tem(s.id);
  return `
  <div class="produto-card servico-card" data-id="${s.id}" style="background:#1a1a1a;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.4);position:relative;">
    <button onclick="_toggleFavServico(this,${s.id})" style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,.6);border:none;color:${fav?'#e74c3c':'#fff'};width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;z-index:2"><i class="fa ${fav?'fa-heart':'fa-heart-o'}"></i></button>
    <div style="height:160px;overflow:hidden;">
      <img src="${s.imagem||'https://via.placeholder.com/300x160/1a1a1a/c9a227?text=Serviço'}" alt="${s.nome}"
           loading="lazy" style="width:100%;height:100%;object-fit:cover;"
           onerror="this.src='https://via.placeholder.com/300x160/1a1a1a/c9a227?text=Serviço'"/>
    </div>
    <div style="padding:14px;">
      <span style="color:#c9a227;font-size:11px;font-weight:700;text-transform:uppercase">${s.categoria||'Serviço'}</span>
      <h3 style="color:#fff;font-size:14px;margin:6px 0;line-height:1.4">${s.nome}</h3>
      <span style="color:#aaa;font-size:18px;font-weight:900">${_kz(s.preco)}</span>
      <p style="color:#888;font-size:11px;margin:8px 0"><i class="fas fa-map-marker-alt" style="margin-right:4px;color:#c9a227"></i>${s.cidade||'Angola'} &nbsp;|&nbsp; <i class="fas fa-${s.formato==='online'?'wifi':'map-marker-alt'}" style="color:#c9a227"></i> ${s.formato||'presencial'}</p>
      <p style="color:#aaa;font-size:11px;margin-bottom:10px"><i class="fas fa-store" style="margin-right:4px"></i>${s.vendedorNome||'Prestador'}</p>
      <a href="${_pages}contratar.html?id=${s.id}" style="display:block;text-align:center;background:#c9a227;color:#000;padding:10px;border-radius:8px;font-weight:800;font-size:13px;text-decoration:none">
        <i class="fa fa-handshake"></i> CONTRATAR
      </a>
    </div>
  </div>`;
}

function _addToCart(id) {
  if (!Sessao.logado()) {
    Toast.aviso('Precisa de entrar na sua conta para adicionar ao carrinho.');
    setTimeout(() => { window.location.href = _root + 'pages/login.html?next=' + encodeURIComponent(window.location.href); }, 1200);
    return;
  }
  const p = DB.produtos.findById(id);
  if (p) Carrinho.adicionar(p);
}

function _toggleFav(btn, id) {
  if (!Sessao.logado()) { Toast.aviso('Faça login para guardar favoritos.'); return; }
  const p = DB.produtos.findById(id);
  if (!p) return;
  const adicionado = Favoritos.toggle(p);
  btn.style.color = adicionado ? '#e74c3c' : '#fff';
  btn.querySelector('i').className = 'fa ' + (adicionado ? 'fa-heart' : 'fa-heart-o');
  Toast[adicionado?'ok':'info'](adicionado ? '❤ Adicionado aos favoritos!' : 'Removido dos favoritos');
}

function _toggleFavServico(btn, id) {
  if (!Sessao.logado()) { Toast.aviso('Faça login para guardar favoritos.'); return; }
  const s = DB.servicos.findById(id);
  if (!s) return;
  const adicionado = Favoritos.toggle({...s, tipo:'servico'});
  btn.style.color = adicionado ? '#e74c3c' : '#fff';
  btn.querySelector('i').className = 'fa ' + (adicionado ? 'fa-heart' : 'fa-heart-o');
  Toast[adicionado?'ok':'info'](adicionado ? '❤ Adicionado aos favoritos!' : 'Removido dos favoritos');
}

/* ─────────────────────────────────────────────────────────────────
   INJECTAR HEADER
───────────────────────────────────────────────────────────────── */
function _injectHeader() {
  const ph = document.getElementById('header-placeholder');
  if (!ph) return;
  const u = Sessao.get();

  ph.outerHTML = `
  <div class="topo-superior">
    <span>Bem-vindo à <strong>AngoBiz Kivenda!</strong> Conectando negócios, inovação e crescimento em Angola.</span>
    <div class="topo-contatos">
      <a href="tel:+244923456789"><i class="fa fa-phone"></i> +244 923 456 789</a>
      <a href="mailto:atendimento@angobizkivenda.ao"><i class="fa fa-envelope"></i> atendimento@angobizkivenda.ao</a>
      <div class="topo-redes">
        <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://wa.me/244923456789" target="_blank"><i class="fab fa-whatsapp"></i></a>
      </div>
    </div>
  </div>

  <header class="cabecalho">
    <div class="cabecalho-inner">
      <a href="${_root}index.html" class="logo">
        <div class="logo-circulo"><img src="${_root}img/logo.png" alt="AngoBiz Kivenda" style="width:100%;height:100%;object-fit:contain;border-radius:50%"></div>
        <div class="logo-texto">
          <span class="logo-angotext"><span class="w">ANGO</span><span class="g">BIZ</span></span>
          <span class="logo-kivenda">— KIVENDA —</span>
        </div>
      </a>

      <div class="busca-wrap">
        <div class="busca-cat-btn" id="buscaCatBtn" onclick="document.getElementById('buscaCatDrop').classList.toggle('aberto')">
          <span>Todas as categorias</span> <i class="fas fa-chevron-down"></i>
          <div class="busca-cat-drop" id="buscaCatDrop">
            <a href="${_pages}eletronicos.html"  onclick="selecionarCategoriaBusca(event,'Eletrónicos')">Eletrónicos</a>
            <a href="${_pages}mercado.html?cat=Telemóveis"  onclick="selecionarCategoriaBusca(event,'Telemóveis')">Telemóveis</a>
            <a href="${_pages}escritorio.html"   onclick="selecionarCategoriaBusca(event,'Escritório')">Escritório</a>
            <a href="${_pages}casa&deco.html"    onclick="selecionarCategoriaBusca(event,'Casa & Decoração')">Casa & Decoração</a>
            <a href="${_pages}automovel.html"    onclick="selecionarCategoriaBusca(event,'Automóvel')">Automóvel</a>
            <a href="${_pages}industria.html"    onclick="selecionarCategoriaBusca(event,'Indústria')">Indústria</a>
            <a href="${_pages}mercado.html?cat=Ferramentas" onclick="selecionarCategoriaBusca(event,'Ferramentas')">Ferramentas</a>
            <a href="${_pages}ango_resolve.html" onclick="selecionarCategoriaBusca(event,'Serviços')">Serviços</a>
          </div>
        </div>
        <input type="text" id="inputBusca" placeholder="Pesquisar produtos, serviços, vendedores..." onkeydown="buscarEnter(event)" autocomplete="off"/>
        <button class="busca-btn" onclick="executarBusca()"><i class="fas fa-search"></i></button>
      </div>

      <div class="header-acoes">
        <div class="ha-conta" id="haConta" onclick="document.getElementById('contaDrop').classList.toggle('aberto')">
          <i class="fas fa-user ha-ico"></i>
          <div>
            <span class="ha-label" id="labelNomeUser">${u ? u.nome.split(' ')[0] : 'Entrar'}</span>
            <i class="fas fa-chevron-down ha-seta"></i>
          </div>
          <div class="conta-drop" id="contaDrop">
            ${u ? `
            <div class="drop-nome"><i class="fas fa-user-circle"></i> ${u.nome}</div>
            <div class="drop-tipo">${u.tipo === 'admin' ? '🛡 Administrador' : u.tipo === 'vendedor' ? '🏪 Vendedor' : '🛍 Cliente'}</div>
            <div class="drop-sep"></div>
            <a href="${_pages}perfil_cliente.html"><i class="fas fa-user"></i> Meu Perfil</a>
            <a href="${_pages}carrinho.html"><i class="fas fa-shopping-cart"></i> Carrinho</a>
            ${Sessao.isVendedor() ? `<a href="${_pages}painel_cliente.html"><i class="fas fa-store"></i> Painel Vendedor</a>
            <a href="${_pages}cadastrar_produto.html"><i class="fas fa-plus-circle"></i> Cadastrar Produto</a>
            <a href="${_pages}cadastrar_servicos.html"><i class="fas fa-tools"></i> Cadastrar Serviço</a>` : ''}
            ${Sessao.isAdmin() ? `<a href="${_pages}painel_admin.html"><i class="fas fa-shield-alt"></i> Administração</a>` : ''}
            <div class="drop-sep"></div>
            <a href="#" onclick="Sessao.logout();return false;" style="color:#e74c3c"><i class="fas fa-sign-out-alt"></i> Sair</a>
            ` : `
            <a href="${_pages}login.html"><i class="fas fa-sign-in-alt"></i> Entrar</a>
            <a href="${_pages}cadastro.html"><i class="fas fa-user-plus"></i> Criar Conta</a>
            <div class="drop-sep"></div>
            <a href="${_pages}parceria.html"><i class="fas fa-store"></i> Quero Vender</a>
            `}
          </div>
        </div>

        <a href="${_pages}carrinho.html" class="ha-carrinho" style="text-decoration:none;color:inherit">
          <div class="cart-ico" style="position:relative">
            <i class="fas fa-shopping-cart" style="font-size:22px"></i>
            <span class="cart-badge" style="position:absolute;top:-8px;right:-8px;background:#c9a227;color:#000;border-radius:50%;width:18px;height:18px;font-size:11px;font-weight:900;display:none;align-items:center;justify-content:center;line-height:18px;text-align:center"></span>
          </div>
          <span class="ha-label">Carrinho</span>
        </a>
      </div>
    </div>
  </header>

  <nav class="nav-principal">
    <div class="nav-inner">
      <button class="nav-categorias-btn" onclick="document.getElementById('navCatMenu').classList.toggle('ativo')">
        <i class="fa fa-bars"></i> TODAS CATEGORIAS
      </button>
      <div class="nav-cat-menu" id="navCatMenu">
        <a href="${_pages}mercado.html"><i class="fas fa-shopping-cart"></i> Supermercado</a>
        <a href="${_pages}eletronicos.html"><i class="fas fa-laptop"></i> Eletrónicos</a>
        <a href="${_pages}escritorio.html"><i class="fas fa-chair"></i> Escritório</a>
        <a href="${_pages}industria.html"><i class="fas fa-hard-hat"></i> Indústria</a>
        <a href="${_pages}casa&deco.html"><i class="fas fa-home"></i> Casa & Decoração</a>
        <a href="${_pages}automovel.html"><i class="fas fa-car"></i> Automóvel</a>
        <a href="${_pages}ango_resolve.html"><i class="fas fa-tools"></i> Serviços</a>
      </div>
      <ul class="nav-links">
        <li><a href="${_pages}home.html">INÍCIO</a></li>
        <li><a href="${_pages}parceria.html">VENDER</a></li>
        <li><a href="${_pages}mercado.html">MERCADO</a></li>
        <li><a href="${_pages}ango_resolve.html">ANGO RESOLVE</a></li>
        <li><a href="${_pages}promocoes.html">PROMOÇÕES</a></li>
        <li><a href="${_pages}blog.html">BLOG</a></li>
        <li><a href="${_pages}sobre_nos.html">SOBRE NÓS</a></li>
        <li><a href="${_pages}suporte.html">SUPORTE</a></li>
      </ul>
    </div>
  </nav>`;

  /* Marcar link activo */
  const pag = window.location.pathname.split('/').pop().replace('.html','');
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.href.includes(pag) && pag) a.style.color='#c9a227';
  });

  /* Fechar dropdowns ao clicar fora */
  document.addEventListener('click', e => {
    if (!e.target.closest('#haConta'))     document.getElementById('contaDrop')?.classList.remove('aberto');
    if (!e.target.closest('#buscaCatBtn'))  document.getElementById('buscaCatDrop')?.classList.remove('aberto');
    if (!e.target.closest('.nav-categorias-btn') && !e.target.closest('#navCatMenu'))
      document.getElementById('navCatMenu')?.classList.remove('ativo');
  });

  Carrinho._badge();
}

/* ─────────────────────────────────────────────────────────────────
   INJECTAR FOOTER
───────────────────────────────────────────────────────────────── */
function _injectFooter() {
  const ph = document.getElementById('footer-placeholder');
  if (!ph) return;
  ph.outerHTML = `
  <section class="newsletter" style="background:#111;padding:50px 20px;">
    <div class="newsletter-inner" style="max-width:900px;margin:auto;display:flex;align-items:center;gap:30px;flex-wrap:wrap">
      <div class="newsletter-icone" style="font-size:40px;color:#c9a227"><i class="fa fa-envelope"></i></div>
      <div class="newsletter-texto" style="flex:1">
        <h3 style="color:#fff;margin:0">RECEBA OFERTAS EXCLUSIVAS</h3>
        <p style="color:#aaa;margin:6px 0 0">Subscreva e receba as melhores ofertas em primeira mão.</p>
      </div>
      <div class="newsletter-form" style="display:flex;gap:10px;flex-wrap:wrap">
        <input type="email" id="newsEmailInput" placeholder="Seu melhor e-mail" style="padding:12px 16px;border-radius:8px;border:1px solid #333;background:#1a1a1a;color:#fff;min-width:240px"/>
        <button onclick="_newsSubscribe(this)" style="background:#c9a227;color:#000;border:none;padding:12px 22px;border-radius:8px;font-weight:800;cursor:pointer">SUBSCREVER</button>
      </div>
    </div>
  </section>

  <footer class="rodape">
    <div class="rodape-inner">
      <div class="rodape-col rodape-sobre">
        <a href="${_root}index.html" class="logo rodape-logo" style="text-decoration:none;display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div class="logo-circulo" style="width:50px;height:50px"><img src="${_root}img/logo.png" alt="AngoBiz" style="width:100%;height:100%;object-fit:contain;border-radius:50%"></div>
          <div class="logo-texto">
            <span class="logo-angotext"><span class="w">ANGO</span><span class="g">BIZ</span></span>
            <span class="logo-kivenda" style="display:block;font-size:10px">— KIVENDA —</span>
          </div>
        </a>
        <p style="color:#aaa;font-size:13px;line-height:1.7">A AngoBiz Kivenda conecta vendedores e compradores em Angola com segurança e inovação.</p>
        <div class="rodape-redes" style="display:flex;gap:12px;margin-top:16px">
          <a href="https://facebook.com" target="_blank" style="color:#aaa;font-size:18px"><i class="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" style="color:#aaa;font-size:18px"><i class="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank" style="color:#aaa;font-size:18px"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://wa.me/244923456789" target="_blank" style="color:#aaa;font-size:18px"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="rodape-col">
        <h4>LINKS RÁPIDOS</h4>
        <ul>
          <li><a href="${_pages}home.html">Início</a></li>
          <li><a href="${_pages}mercado.html">Mercado</a></li>
          <li><a href="${_pages}ango_resolve.html">Ango Resolve</a></li>
          <li><a href="${_pages}parceria.html">Vender na Plataforma</a></li>
          <li><a href="${_pages}sobre_nos.html">Sobre Nós</a></li>
          <li><a href="${_pages}promocoes.html">Promoções</a></li>
          <li><a href="${_pages}blog.html">Blog</a></li>
        </ul>
      </div>
      <div class="rodape-col">
        <h4>CATEGORIAS</h4>
        <ul>
          <li><a href="${_pages}mercado.html">Supermercado</a></li>
          <li><a href="${_pages}eletronicos.html">Eletrónicos</a></li>
          <li><a href="${_pages}escritorio.html">Escritório</a></li>
          <li><a href="${_pages}industria.html">Indústria</a></li>
          <li><a href="${_pages}casa&deco.html">Casa & Decoração</a></li>
          <li><a href="${_pages}automovel.html">Automóvel</a></li>
        </ul>
      </div>
      <div class="rodape-col">
        <h4>INFORMAÇÕES</h4>
        <ul>
          <li><a href="${_pages}suporte.html">Suporte & Contactos</a></li>
          <li><a href="${_pages}denuncias.html">Denúncias</a></li>
          <li><a href="${_pages}termos.html">Termos e Condições</a></li>
          <li><a href="${_pages}politica.html">Política de Privacidade</a></li>
          <li><a href="${_pages}cadastro_vendedor.html">Seja um Vendedor</a></li>
        </ul>
        <div style="margin-top:16px;color:#aaa;font-size:13px">
          <p style="margin:4px 0"><i class="fa fa-phone" style="color:#c9a227;margin-right:6px"></i>+244 923 456 789</p>
          <p style="margin:4px 0"><i class="fa fa-envelope" style="color:#c9a227;margin-right:6px"></i>atendimento@angobizkivenda.ao</p>
          <p style="margin:4px 0"><i class="fa fa-map-marker-alt" style="color:#c9a227;margin-right:6px"></i>Rua da Kivenda, 123, Luanda</p>
        </div>
      </div>
    </div>
    <div class="rodape-fundo" style="border-top:1px solid #222;margin-top:40px;padding-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <span style="color:#666;font-size:13px">© 2026 AngoBiz Kivenda. Todos os direitos reservados.</span>
      <div style="display:flex;gap:20px">
        <a href="${_pages}termos.html" style="color:#666;font-size:13px">Termos</a>
        <a href="${_pages}politica.html" style="color:#666;font-size:13px">Privacidade</a>
        <a href="${_pages}suporte.html" style="color:#666;font-size:13px">Suporte</a>
      </div>
    </div>
  </footer>`;
}

/* ─────────────────────────────────────────────────────────────────
   MOSTRAR NOME DO USER em todas as páginas (paineis com sidebar)
───────────────────────────────────────────────────────────────── */
function _actualizarUIUser() {
  const u = Sessao.get();
  if (!u) return;
  /* Qualquer elemento com data-user-nome mostra o nome */
  document.querySelectorAll('[data-user-nome],[id*="userNome"],[class*="user-name"],[class*="nome-user"]').forEach(el => {
    el.textContent = u.nome;
  });
  document.querySelectorAll('[data-user-email]').forEach(el => { el.textContent = u.email; });
  document.querySelectorAll('[data-user-tipo]').forEach(el => { el.textContent = u.tipo; });

  /* Sidebar dos painéis — procura spans/p com texto placeholder */
  const sideNome = document.querySelector('.sidebar-nome,.admin-nome,.user-display-name,.sb-user-nome');
  if (sideNome) sideNome.textContent = u.nome;
  const sideTipo = document.querySelector('.sidebar-tipo,.admin-tipo,.user-display-role,.sb-user-tipo');
  if (sideTipo) sideTipo.textContent = u.tipo.charAt(0).toUpperCase() + u.tipo.slice(1);

  /* Logout buttons em painéis */
  document.querySelectorAll('a[href*="logout"],button[data-logout],[id*="btnLogout"],[id*="btnSair"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); Sessao.logout(); });
  });
}

/* ─────────────────────────────────────────────────────────────────
   INIT — corre em todas as páginas
───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  DB.init();            // Inicializa dados demo se necessário
  _injectHeader();
  _injectFooter();
  _actualizarUIUser();
  Carrinho._badge();

  /* Animação de entrada suave nos cards */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  setTimeout(() => {
    document.querySelectorAll('.produto-card,.categorias-item,.diferencial-item,.cat-card,.blog-card').forEach((el,i) => {
      el.style.opacity='0';
      el.style.transform='translateY(20px)';
      el.style.transition=`opacity .4s ${i*0.06}s, transform .4s ${i*0.06}s`;
      obs.observe(el);
    });
  }, 100);
});
