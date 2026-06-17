/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ANGOBIZ KIVENDA — cadastrar_produto.js  (versão ampliada)     ║
 * ║   IDs mapeados ao cadastrar_produto.html                        ║
 * ║   Persiste em localStorage via DB (global.js)                   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CAMPOS DO HTML (IDs reais):
 * nomeProduto | categoria | subcategoria | marca | modelo | condicao | tipoProduto
 * descricao   | preco     | precoPromo   | estoque | sku
 * peso        | dimensoes | tipoEnvio    | tempoEntrega
 * provincia   | municipio | bairro       | endereco
 * statusProduto | fileImagens | previewImagens
 *
 * BOTÕES: .btn-publicar → publicarProduto()
 * .btn-rascunho → salvarRascunho()
 * .btn-cancelar → cancelar()
 * MODAL:  #modalSucesso → fecharModal() / novosProduto()
 */

/* ── Variáveis globais ───────────────────────────────────────────── */
let imagensBase64 = [];
let produtoEdicaoId = null; // Armazena o ID se for uma edição

/* ══════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO E CONTROLE DE MODO (CRIAR VS EDITAR)
══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Proteger página — só vendedores e admins */
  if (typeof Sessao !== 'undefined') {
    Sessao.exigirVendedor();
  }

  /* 2. Preencher nome do vendedor no header/sidebar */
  const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;
  if (u) {
    document.querySelectorAll('.nav-pnome, .perfil-nome, .nome-user').forEach(el => {
      el.textContent = u.nome;
    });
    document.querySelectorAll('.nav-ptipo, .perfil-tipo').forEach(el => {
      el.textContent = u.tipo.charAt(0).toUpperCase() + u.tipo.slice(1);
    });
  }

  /* 3. Escuta de Categoria para Subcategoria Dinâmica */
  const selectCategoria = document.getElementById('categoria');
  if (selectCategoria) {
    selectCategoria.addEventListener('change', () => actualizarSubcategorias(selectCategoria.value));
  }

  /* 4. Upload de imagens ─────────────────────────────────────── */
  const fileInput = document.getElementById('fileImagens');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      adicionarImagens(fileInput.files);
    });
  }

  /* 5. Inicializar dot de status */
  const selectStatus = document.getElementById('statusProduto');
  if (selectStatus) {
    selectStatus.addEventListener('change', actualizarStatus);
  }
  actualizarStatus();

  /* 6. Verificar se é Modo de Edição via Query String (?id=X) */
  verificarModoEdicao();
});

/** Escuta a categoria principal e gera subcategorias dinâmicas */
function actualizarSubcategorias(catPai, valorSelecionado = '') {
  const subSelect = document.getElementById('subcategoria');
  if (!subSelect) return;

  const dicionario = {
    'Eletrónicos': ['Telemóveis', 'Computadores', 'Acessórios', 'Televisores'],
    'Vestuário': ['Masculino', 'Feminino', 'Calçado', 'Relógios & Joias'],
    'Imobiliária': ['Casas', 'Apartamentos', 'Terrenos', 'Escritórios'],
    'Veículos': ['Carros', 'Motos', 'Peças & Acessórios']
  };

  subSelect.innerHTML = '<option value="">Selecione uma subcategoria...</option>';
  const lista = dicionario[catPai] || [];
  
  lista.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub;
    opt.textContent = sub;
    if (sub === valorSelecionado) opt.selected = true;
    subSelect.appendChild(opt);
  });
}

/** Detecta parâmetro ID na URL e muda comportamento do formulário para Edição */
function verificarModoEdicao() {
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get('id');
  const acao = params.get('acao');

  if (!idStr || typeof DB === 'undefined') return;
  
  const idNum = parseInt(idStr);
  const prod = DB.produtos.get ? DB.produtos.get(idNum) : DB.produtos.list?.().find(p => p.id === idNum);
  
  if (!prod) return;

  produtoEdicaoId = idNum;

  // Se a ação direta for pausar, eliminar ou mudar venda na listagem do painel
  if (acao === 'pausar') { pausarAnuncio(idNum); return; }
  if (acao === 'eliminar') { eliminarAnuncio(idNum); return; }
  if (acao === 'naovendido') { marcarComoNaoVendido(idNum); return; }

  // Mudar títulos do formulário para modo Edição
  const tituloPagina = document.querySelector('.titulo-pagina, h1, h2');
  if (tituloPagina) tituloPagina.textContent = 'Editar Anúncio do Produto';

  const btnPub = document.querySelector('.btn-publicar');
  if (btnPub) btnPub.innerHTML = '<i class="fas fa-save"></i> Guardar Alterações';

  // Preencher inputs
  if (document.getElementById('nomeProduto')) document.getElementById('nomeProduto').value = prod.nome || '';
  if (document.getElementById('categoria')) {
    document.getElementById('categoria').value = prod.categoria || '';
    actualizarSubcategorias(prod.categoria, prod.subcategoria);
  }
  if (document.getElementById('marca')) document.getElementById('marca').value = prod.marca || '';
  if (document.getElementById('modelo')) document.getElementById('modelo').value = prod.modelo || '';
  if (document.getElementById('condicao')) document.getElementById('condicao').value = prod.condicao || '';
  if (document.getElementById('tipoProduto')) document.getElementById('tipoProduto').value = prod.tipoProduto || '';
  if (document.getElementById('descricao')) document.getElementById('descricao').value = prod.descricao || '';
  if (document.getElementById('preco')) document.getElementById('preco').value = prod.preco || 0;
  if (document.getElementById('precoPromo')) document.getElementById('precoPromo').value = prod.precoPromo || 0;
  if (document.getElementById('estoque')) document.getElementById('estoque').value = prod.estoque || 0;
  if (document.getElementById('sku')) document.getElementById('sku').value = prod.sku || '';
  if (document.getElementById('peso')) document.getElementById('peso').value = prod.peso || '';
  if (document.getElementById('dimensoes')) document.getElementById('dimensoes').value = prod.dimensoes || '';
  if (document.getElementById('tipoEnvio')) document.getElementById('tipoEnvio').value = prod.tipoEnvio || '';
  if (document.getElementById('tempoEntrega')) document.getElementById('tempoEntrega').value = prod.tempoEntrega || '';
  
  // Localização
  if (document.getElementById('provincia')) document.getElementById('provincia').value = prod.provincia || '';
  if (document.getElementById('municipio')) document.getElementById('municipio').value = prod.municipio || '';
  if (document.getElementById('bairro')) document.getElementById('bairro').value = prod.bairro || '';
  if (document.getElementById('endereco')) document.getElementById('endereco').value = prod.endereco || '';
  
  if (document.getElementById('statusProduto')) {
    document.getElementById('statusProduto').value = prod.status || 'ativo';
    actualizarStatus();
  }

  // Renderizar imagens salvas anteriormente
  if (prod.imagens && prod.imagens.length > 0) {
    imagensBase64 = [...prod.imagens];
    renderizarPreviews();
  }
}

function renderizarPreviews() {
  const preview = document.getElementById('previewImagens');
  if (!preview) return;
  preview.innerHTML = '';

  imagensBase64.forEach((base64, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'img-preview-item';
    wrap.style.cssText = 'position:relative;display:inline-block;margin:4px;';

    const img = document.createElement('img');
    img.src = base64;
    img.style.cssText = 'width:90px;height:90px;object-fit:cover;border-radius:8px;border:2px solid ' + (idx === 0 ? '#c9a227' : '#333');

    const btnRem = document.createElement('button');
    btnRem.type = 'button';
    btnRem.innerHTML = '<i class="fas fa-times"></i>';
    btnRem.style.cssText = 'position:absolute;top:2px;right:2px;background:#e74c3c;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
    btnRem.onclick = () => {
      imagensBase64.splice(idx, 1);
      wrap.remove();
      renderizarPreviews();
    };

    wrap.appendChild(img);
    wrap.appendChild(btnRem);
    preview.appendChild(wrap);
  });
  
  const cardMais = document.getElementById('cardAdicionarMais');
  if (cardMais) cardMais.style.display = imagensBase64.length > 0 ? 'flex' : 'none';
}

/* ══════════════════════════════════════════════════════════════════
   GESTÃO DE IMAGENS
══════════════════════════════════════════════════════════════════ */
function triggerImagens() {
  document.getElementById('fileImagens')?.click();
}
function dragSobre(e) {
  e.preventDefault();
  document.getElementById('uploadPrincipal')?.classList.add('drag-over');
}
function dragFora(e) {
  e.preventDefault();
  document.getElementById('uploadPrincipal')?.classList.remove('drag-over');
}
function soltarImagens(e) {
  e.preventDefault();
  document.getElementById('uploadPrincipal')?.classList.remove('drag-over');
  adicionarImagens(e.dataTransfer.files);
}

function adicionarImagens(files) {
  Array.from(files).forEach(file => {
    if (imagensBase64.length >= 10) {
      mostrarToast('Máximo de 10 imagens atingido.', 'aviso');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      mostrarToast(`"${file.name}" excede 5MB e foi ignorado.`, 'erro');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      imagensBase64.push(ev.target.result);
      renderizarPreviews();
    };
    reader.readAsDataURL(file);
  });
}

/* ══════════════════════════════════════════════════════════════════
   VALIDAÇÃO
══════════════════════════════════════════════════════════════════ */
function validarProduto() {
  let ok = true;

  function errocamp(condicao, campoId, erroId, msg) {
    const el = document.getElementById(campoId);
    const er = document.getElementById(erroId);
    if (er) er.textContent = condicao ? msg : '';
    if (el) el.style.borderColor = condicao ? '#e74c3c' : '';
    if (condicao) ok = false;
  }

  const nome     = document.getElementById('nomeProduto')?.value?.trim() || '';
  const categoria= document.getElementById('categoria')?.value || '';
  const condicao = document.getElementById('condicao')?.value || '';
  const tipo     = document.getElementById('tipoProduto')?.value || '';
  const preco    = parseFloat(document.getElementById('preco')?.value) || 0;
  const estoque  = parseInt(document.getElementById('estoque')?.value) || 0;
  const tipoEnvio= document.getElementById('tipoEnvio')?.value || '';
  const tempoEnt = document.getElementById('tempoEntrega')?.value || '';

  errocamp(nome.length < 3, 'nomeProduto', 'e-nomeProduto', 'Nome deve ter pelo menos 3 caracteres.');
  errocamp(!categoria,       'categoria',   'e-categoria',   'Selecione uma categoria.');
  errocamp(!condicao,        'condicao',    'e-condicao',    'Selecione a condição do produto.');
  errocamp(!tipo,            'tipoProduto', 'e-tipoProduto', 'Selecione o tipo de produto.');
  errocamp(preco <= 0,       'preco',       'e-preco',       'Introduza um preço válido maior que 0 Kz.');
  errocamp(estoque < 1,      'estoque',     'e-estoque',     'Quantidade em estoque deve ser pelo menos 1.');
  errocamp(!tipoEnvio,       'tipoEnvio',   'e-tipoEnvio',   'Selecione o tipo de envio.');
  errocamp(!tempoEnt,        'tempoEntrega','e-tempoEntrega','Selecione o tempo de entrega.');

  return ok;
}

/* ══════════════════════════════════════════════════════════════════
   ACÇÕES PRINCIPAIS (PUBLIKAR / ATUALIZAR)
══════════════════════════════════════════════════════════════════ */
function publicarProduto() {
  if (!validarProduto()) {
    mostrarToast('Corrija os campos assinalados antes de publicar.', 'erro');
    const primeiro = document.querySelector('[style*="border-color: rgb(231"]');
    if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = document.querySelector('.btn-publicar');
  if (btn) { 
    btn.disabled = true; 
    btn.innerHTML = produtoEdicaoId ? '<i class="fas fa-spinner fa-spin"></i> A guardar...' : '<i class="fas fa-spinner fa-spin"></i> A publicar...'; 
  }

  setTimeout(() => {
    const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;
    const imagem = imagensBase64[0] || 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Produto';

    const produto = {
      nome:          document.getElementById('nomeProduto')?.value?.trim()  || '',
      categoria:     document.getElementById('categoria')?.value             || '',
      subcategoria:  document.getElementById('subcategoria')?.value          || '',
      marca:         document.getElementById('marca')?.value?.trim()         || 'Genérico',
      modelo:        document.getElementById('modelo')?.value?.trim()        || '',
      condicao:      document.getElementById('condicao')?.value              || 'Novo',
      tipoProduto:   document.getElementById('tipoProduto')?.value           || '',
      descricao:     document.getElementById('descricao')?.value?.trim()     || '',
      preco:         parseFloat(document.getElementById('preco')?.value)     || 0,
      precoPromo:    parseFloat(document.getElementById('precoPromo')?.value) || 0,
      estoque:       parseInt(document.getElementById('estoque')?.value)     || 0,
      stock:         parseInt(document.getElementById('estoque')?.value)     || 0,
      sku:           document.getElementById('sku')?.value?.trim()           || 'AK-' + Math.floor(Math.random() * 900000),
      peso:          document.getElementById('peso')?.value                  || '',
      dimensoes:     document.getElementById('dimensoes')?.value?.trim()     || '',
      tipoEnvio:     document.getElementById('tipoEnvio')?.value             || '',
      tempoEntrega:  document.getElementById('tempoEntrega')?.value          || '',
      provincia:     document.getElementById('provincia')?.value             || '',
      municipio:     document.getElementById('municipio')?.value             || '',
      bairro:        document.getElementById('bairro')?.value                || '',
      endereco:      document.getElementById('endereco')?.value?.trim()      || '',
      status:        document.getElementById('statusProduto')?.value         || 'ativo',
      imagem,
      img: imagem,
      imagens:       imagensBase64.length > 0 ? [...imagensBase64] : [imagem],
      vendedorId:    u ? u.id   : 0,
      vendedorNome:  u ? (u.nomeLoja || u.nome) : 'Loja Parceira',
      estrelas:      5,
      avaliacoes:    0,
    };

    if (produto.precoPromo > 0 && produto.precoPromo < produto.preco) {
      produto.promo    = true;
      produto.precoReg = produto.preco;
    } else {
      produto.promo    = false;
      produto.precoPromo = 0;
    }

    /* Guardar ou Atualizar no DB */
    if (typeof DB !== 'undefined') {
      if (produtoEdicaoId !== null) {
        // Modo Edição: mesclar dados novos com IDs antigos
        produto.id = produtoEdicaoId;
        DB.produtos.update(produtoEdicaoId, produto);
      } else {
        // Novo Registo
        DB.produtos.add(produto);
      }
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar produto'; }

    const modal = document.getElementById('modalSucesso');
    const mTit  = document.getElementById('modalTitulo');
    const mMsg  = document.getElementById('modalMensagem');
    if (mTit) mTit.textContent = produtoEdicaoId ? '✓ Anúncio atualizado!' : '✓ Produto publicado!';
    if (mMsg) mMsg.textContent = `"${produto.nome}" foi salvo e já se encontra atualizado no Mercado.`;
    if (modal) { modal.style.display = 'flex'; modal.classList.add('aberto'); }

  }, 800);
}

/** Guardar como rascunho */
function salvarRascunho() {
  const nome = document.getElementById('nomeProduto')?.value?.trim() || '';
  if (!nome) {
    mostrarToast('Introduza pelo menos o nome do produto para guardar o rascunho.', 'erro');
    return;
  }

  const btn = document.querySelector('.btn-rascunho');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A guardar...'; }

  setTimeout(() => {
    const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;
    const imagem = imagensBase64[0] || 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Rascunho';

    const rascunho = {
      nome,
      categoria:   document.getElementById('categoria')?.value     || '',
      status:      'rascunho',
      imagem,
      img: imagem,
      vendedorId:  u ? u.id   : 0,
      vendedorNome:u ? (u.nomeLoja || u.nome) : 'Loja Parceira'
    };

    if (typeof DB !== 'undefined') {
      if (produtoEdicaoId !== null) {
        rascunho.id = produtoEdicaoId;
        DB.produtos.update(produtoEdicaoId, rascunho);
      } else {
        DB.produtos.add(rascunho);
      }
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Salvar como rascunho'; }
    mostrarToast('✓ Rascunho guardado com sucesso!', 'sucesso');
  }, 600);
}

/* ══════════════════════════════════════════════════════════════════
   CONTROLO DE CICLO DE VIDA DO ANÚNCIO (PAUSAR / ELIMINAR / STATUS)
══════════════════════════════════════════════════════════════════ */
function pausarAnuncio(id) {
  if (typeof DB === 'undefined') return;
  const lista = DB.produtos.list?.() || [];
  const prod = lista.find(p => p.id === id);
  if (prod) {
    prod.status = prod.status === 'pausado' ? 'ativo' : 'pausado';
    DB.produtos.update(id, prod);
    mostrarToast(`Anúncio ${prod.status === 'pausado' ? 'pausado' : 'reativado'} com sucesso!`, 'sucesso');
    setTimeout(() => window.location.href = 'painel_cliente.html', 1000);
  }
}

function eliminarAnuncio(id) {
  if (confirm('Tem a certeza de que deseja eliminar definitivamente este anúncio?')) {
    if (typeof DB !== 'undefined' && DB.produtos.delete) {
      DB.produtos.delete(id);
      mostrarToast('Anúncio eliminado com sucesso.', 'sucesso');
      setTimeout(() => window.location.href = 'painel_cliente.html', 1000);
    }
  }
}

function marcarComoNaoVendido(id) {
  if (typeof DB === 'undefined') return;
  const lista = DB.produtos.list?.() || [];
  const prod = lista.find(p => p.id === id);
  if (prod) {
    prod.status = 'inativo';
    prod.estoque = 0;
    prod.stock = 0;
    DB.produtos.update(id, prod);
    mostrarToast('Anúncio marcado como esgotado/não vendido.', 'info');
    setTimeout(() => window.location.href = 'painel_cliente.html', 1000);
  }
}

function cancelar() {
  if (confirm('Cancelar o procedimento? Os dados não guardados serão perdidos.')) {
    window.location.href = 'painel_cliente.html';
  }
}

/* ══════════════════════════════════════════════════════════════════
   MODAL E ACESSÓRIOS DA UI
══════════════════════════════════════════════════════════════════ */
function fecharModal() {
  const modal = document.getElementById('modalSucesso');
  if (modal) { modal.style.display = 'none'; modal.classList.remove('aberto'); }
  window.location.href = 'mercado.html';
}

function novosProduto() {
  const modal = document.getElementById('modalSucesso');
  if (modal) { modal.style.display = 'none'; modal.classList.remove('aberto'); }

  ['nomeProduto','marca','modelo','descricao','preco','precoPromo','estoque','sku','peso','dimensoes','provincia','municipio','bairro','endereco'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['categoria','condicao','tipoProduto','tipoEnvio','tempoEntrega'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
  
  imagensBase64 = [];
  produtoEdicaoId = null;
  renderizarPreviews();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function actualizarStatus() {
  const sel = document.getElementById('statusProduto');
  const dot = document.getElementById('statusDot');
  if (!dot || !sel) return;
  const cores = { ativo: '#27ae60', rascunho: '#f39c12', inativo: '#e74c3c', pausado: '#95a5a6' };
  dot.style.background = cores[sel.value] || '#95a5a6';
}

function contarDesc(el) {
  const cnt = document.getElementById('cnt-desc');
  if (cnt) cnt.textContent = el.value.length;
}

function mostrarToast(msg, tipo = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast visivel ' + tipo;
  const cores = { sucesso: '#27ae60', erro: '#e74c3c', aviso: '#f39c12', info: '#3498db' };
  toast.style.borderLeft = '5px solid ' + (cores[tipo] || cores.info);
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.className = 'toast'; }, 3500);
}

function toggleMenuNav() { document.getElementById('navDropdown')?.classList.toggle('aberto'); }
function toggleGrupo(id) { document.getElementById(id)?.classList.toggle('aberto'); }
function irPara(pag) { mostrarToast('A navegar para: ' + pag); }