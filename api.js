/**
 * AngoBiz Kivenda — API Client Global
 * Ficheiro: script/api.js
 *
 * Integra todas as páginas com o backend PHP.
 * Inclua este ficheiro em todas as páginas.
 */

const API = {
  BASE: '../back/api',

  // ── Token de sessão ─────────────────────────────────────────
  getToken() { return localStorage.getItem('ak_token'); },
  setToken(t) { localStorage.setItem('ak_token', t); },
  removeToken() {
    localStorage.removeItem('ak_token');
    localStorage.removeItem('ak_user');
  },

  getUser() {
    try { return JSON.parse(localStorage.getItem('ak_user') || 'null'); }
    catch { return null; }
  },
  setUser(u) { localStorage.setItem('ak_user', JSON.stringify(u)); },

  isLoggedIn() { return !!this.getToken(); },
  isAdmin()    { return this.getUser()?.tipo === 'admin'; },
  isVendedor() { return ['vendedor','admin'].includes(this.getUser()?.tipo); },

  // ── Fetch base ───────────────────────────────────────────────
  async req(endpoint, metodo = 'GET', corpo = null, comToken = true) {
    const cabecalhos = { 'Content-Type': 'application/json' };
    if (comToken && this.getToken()) {
      cabecalhos['Authorization'] = 'Bearer ' + this.getToken();
    }
    const opcoes = { method: metodo, headers: cabecalhos };
    if (corpo) opcoes.body = JSON.stringify(corpo);

    try {
      const resp = await fetch(endpoint, opcoes);
      const json = await resp.json();
      return json;
    } catch (e) {
      return { sucesso: false, mensagem: 'Erro de ligação ao servidor.' };
    }
  },

  // ── Auth ─────────────────────────────────────────────────────
  async login(email, senha) {
    const r = await this.req(`${this.BASE}/auth.php?acao=login`, 'POST', { email, senha }, false);
    if (r.sucesso) {
      this.setToken(r.dados.token);
      this.setUser(r.dados.utilizador);
    }
    return r;
  },

  async registar(dados) {
    return this.req(`${this.BASE}/auth.php?acao=registar`, 'POST', dados, false);
  },

  async recuperarSenha(email) {
    return this.req(`${this.BASE}/auth.php?acao=recuperar_senha`, 'POST', { email }, false);
  },

  logout() {
    this.removeToken();
    window.location.href = '../pages/login.html';
  },

  // ── Produtos ─────────────────────────────────────────────────
  async listarProdutos(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.req(`${this.BASE}/produtos.php${q ? '?' + q : ''}`, 'GET', null, false);
  },

  async detalheProduto(id) {
    return this.req(`${this.BASE}/produtos.php?id=${id}`, 'GET', null, false);
  },

  async criarProduto(dados) {
    return this.req(`${this.BASE}/produtos.php`, 'POST', dados);
  },

  async actualizarProduto(id, dados) {
    return this.req(`${this.BASE}/produtos.php?id=${id}`, 'PUT', dados);
  },

  async eliminarProduto(id) {
    return this.req(`${this.BASE}/produtos.php?id=${id}`, 'DELETE');
  },

  // ── Pedidos ──────────────────────────────────────────────────
  async listarPedidos() {
    return this.req(`${this.BASE}/pedidos.php`);
  },

  async criarPedido(dados) {
    return this.req(`${this.BASE}/pedidos.php`, 'POST', dados);
  },

  // ── Suporte / Denúncias ──────────────────────────────────────
  async enviarDenuncia(dados) {
    return this.req(`${this.BASE}/suporte.php?acao=denunciar`, 'POST', dados, false);
  },

  async enviarFeedback(dados) {
    return this.req(`${this.BASE}/suporte.php?acao=feedback`, 'POST', dados, false);
  },

  async subscreverNewsletter(email, nome = '') {
    return this.req(`${this.BASE}/suporte.php?acao=newsletter`, 'POST', { email, nome }, false);
  },
};

// ── Carrinho (localStorage) ──────────────────────────────────────
const Carrinho = {
  _chave: 'ak_carrinho',

  obter() {
    try { return JSON.parse(localStorage.getItem(this._chave) || '[]'); }
    catch { return []; }
  },

  guardar(itens) {
    localStorage.setItem(this._chave, JSON.stringify(itens));
    this._actualizarBadge();
  },

  adicionar(produto, quantidade = 1) {
    const itens = this.obter();
    const idx   = itens.findIndex(i => i.produto_id === produto.id);
    if (idx >= 0) {
      itens[idx].quantidade += quantidade;
    } else {
      itens.push({
        produto_id: produto.id,
        nome:       produto.nome,
        preco:      parseFloat(produto.preco_promocional || produto.preco),
        imagem:     produto.imagem_principal,
        quantidade,
      });
    }
    this.guardar(itens);
    UI.toast('Adicionado ao carrinho!', 'sucesso');
  },

  remover(produto_id) {
    this.guardar(this.obter().filter(i => i.produto_id !== produto_id));
  },

  alterar_qty(produto_id, quantidade) {
    const itens = this.obter();
    const idx   = itens.findIndex(i => i.produto_id === produto_id);
    if (idx >= 0) {
      if (quantidade <= 0) { this.remover(produto_id); return; }
      itens[idx].quantidade = quantidade;
      this.guardar(itens);
    }
  },

  total() {
    return this.obter().reduce((s, i) => s + i.preco * i.quantidade, 0);
  },

  total_itens() {
    return this.obter().reduce((s, i) => s + i.quantidade, 0);
  },

  limpar() { this.guardar([]); },

  _actualizarBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = this.total_itens();
  },
};

// ── UI helpers ───────────────────────────────────────────────────
const UI = {
  toast(mensagem, tipo = 'info', duracao = 3000) {
    let toast = document.getElementById('ak-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ak-toast';
      toast.style.cssText = `
        position:fixed;bottom:24px;right:24px;z-index:99999;
        padding:14px 22px;border-radius:10px;font-size:14px;
        font-family:Montserrat,sans-serif;font-weight:600;
        box-shadow:0 4px 20px rgba(0,0,0,.35);
        transition:opacity .3s;max-width:320px;`;
      document.body.appendChild(toast);
    }
    const cores = {
      sucesso: '#27ae60', erro: '#c0392b', info: '#2980b9', aviso: '#e6a817'
    };
    toast.style.background = cores[tipo] || cores.info;
    toast.style.color = '#fff';
    toast.textContent = mensagem;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = '0'; }, duracao);
  },

  spinner(btn, activo, textoOriginal = '') {
    if (activo) {
      btn._texto = btn.textContent;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A processar...';
    } else {
      btn.disabled = false;
      btn.textContent = textoOriginal || btn._texto || 'Enviar';
    }
  },

  formatarPreco(valor, moeda = 'AOA') {
    return `${parseFloat(valor).toLocaleString('pt-AO', { minimumFractionDigits: 2 })} ${moeda}`;
  },
};

// ── Inicialização automática ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar badge do carrinho
  Carrinho._actualizarBadge();

  // Actualizar UI de conta (logado / não logado)
  const user = API.getUser();
  const conta = document.getElementById('haConta');
  if (conta && user) {
    const label = conta.querySelector('.ha-label');
    if (label) label.textContent = user.nome.split(' ')[0];
  }

  // Newsletter nos formulários de rodapé
  const formNews = document.querySelector('.newsletter-form button');
  if (formNews) {
    formNews.addEventListener('click', async () => {
      const input = document.querySelector('.newsletter-form input[type="email"]');
      if (!input || !input.value) { UI.toast('Introduza o seu email', 'aviso'); return; }
      const r = await API.subscreverNewsletter(input.value);
      UI.toast(r.mensagem, r.sucesso ? 'sucesso' : 'erro');
      if (r.sucesso) input.value = '';
    });
  }
});
