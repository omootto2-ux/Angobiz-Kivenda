/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ANGOBIZ KIVENDA — cadastrar_servicos.js  (versão corrigida)   ║
 * ║   IDs mapeados ao cadastrar_servicos.html                       ║
 * ║   Persiste em localStorage via DB (global.js)                   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CAMPOS DO HTML (IDs reais):
 *   nomeServico | categoriaServico | subcategoria | tipoServico
 *   formato (radio: presencial/domicilio/online)
 *   descCurta   | descDetalhada
 *   preco       | precoPromo | duracao | unidadeDuracao
 *   chkHomens   | chkMulheres | chkCriancas | chkTodos
 *   inputImagens (file)
 *   cidade      | bairro | endereco | referencia
 *   dias-grupo (checkboxes .chk) | horariosList (inputs time)
 *   experiencia | materiais | certificacoes
 *   status (radio: ativo/rascunho) → name="status"
 *
 * BOTÕES: .btn-publicar → publicarServico()
 *         .btn-rascunho → salvarRascunho()
 *         .btn-cancelar → confirmarCancelar()
 * MODAIS: #modalSucesso | #modalCancelar
 */

/* ── Imagens carregadas pelo vendedor ────────────────────────────── */
let imagensServico = [];

/* ══════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Proteger página */
  if (typeof Sessao !== 'undefined') {
    Sessao.exigirVendedor();
  }

  /* 2. Preencher nome do vendedor no header */
  const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;
  if (u) {
    document.querySelectorAll('.perfil-nome-h, .sidebar-nome, .nome-user').forEach(el => {
      el.textContent = u.nome;
    });
  }

  /* 3. Upload de imagens */
  const fileInput = document.getElementById('inputImagens');
  if (fileInput) {
    fileInput.addEventListener('change', () => adicionarImagens(fileInput));
  }

  /* 4. Sidebar expansível */
  const navPai = document.getElementById('navServicos');
  if (navPai) {
    navPai.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('subServicos')?.classList.toggle('aberto');
      document.getElementById('setaServicos')?.classList.toggle('fa-chevron-up');
      document.getElementById('setaServicos')?.classList.toggle('fa-chevron-down');
    });
  }

  /* 5. Actualizar resumo lateral em tempo real */
  const campos = ['nomeServico','categoriaServico','descCurta','descDetalhada','preco','duracao','cidade','bairro','endereco'];
  campos.forEach(id => {
    document.getElementById(id)?.addEventListener('input',  actualizarResumo);
    document.getElementById(id)?.addEventListener('change', actualizarResumo);
  });
  document.querySelectorAll('input[name="formato"]').forEach(r => r.addEventListener('change', actualizarResumo));
  actualizarResumo();
});

/* ══════════════════════════════════════════════════════════════════
   GESTÃO DE IMAGENS
══════════════════════════════════════════════════════════════════ */
function adicionarImagens(input) {
  const grid = document.getElementById('imagensGrid');
  const contEl = document.getElementById('contImagens');

  Array.from(input.files).forEach(file => {
    if (imagensServico.length >= 10) {
      mostrarToast('Máximo de 10 imagens atingido.', 'aviso'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      mostrarToast(`"${file.name}" excede 5MB.`, 'erro'); return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      const base64 = ev.target.result;
      imagensServico.push(base64);

      const div = document.createElement('div');
      div.className = 'img-preview';
      const idx = imagensServico.length - 1;
      div.id = 'imgUser' + idx;
      div.innerHTML = `
        <div class="img-bg" style="background-image:url(${base64});background-size:cover;background-position:center"></div>
        <button class="img-remover" type="button" onclick="removerImagemServico(${idx})">
          <i class="fas fa-times"></i>
        </button>`;

      /* Insere antes do botão "Adicionar mais" */
      const addMais = grid?.querySelector('.add-mais');
      if (addMais) grid.insertBefore(div, addMais);
      else grid?.appendChild(div);

      if (contEl) contEl.textContent = imagensServico.length + ' / 10';
    };
    reader.readAsDataURL(file);
  });
}

function removerImagemServico(idx) {
  imagensServico.splice(idx, 1);
  const el = document.getElementById('imgUser' + idx);
  if (el) el.remove();
  const contEl = document.getElementById('contImagens');
  if (contEl) contEl.textContent = imagensServico.length + ' / 10';
}

/** Remove os previews de exemplo do HTML (prev1…prev4) */
function removerImagem(id) {
  document.getElementById(id)?.remove();
}

/* ══════════════════════════════════════════════════════════════════
   VALIDAÇÃO
══════════════════════════════════════════════════════════════════ */
function validarServico() {
  let ok = true;

  function errocamp(cond, campoId, erroId, msg) {
    const el = document.getElementById(campoId);
    const er = document.getElementById(erroId);
    if (er) er.textContent = cond ? msg : '';
    if (el) el.style.borderColor = cond ? '#e74c3c' : '';
    if (cond) ok = false;
  }

  const nome      = document.getElementById('nomeServico')?.value?.trim()    || '';
  const cat       = document.getElementById('categoriaServico')?.value        || '';
  const tipo      = document.getElementById('tipoServico')?.value             || '';
  const descCurta = document.getElementById('descCurta')?.value?.trim()       || '';
  const descDet   = document.getElementById('descDetalhada')?.value?.trim()   || '';
  const preco     = parseFloat(document.getElementById('preco')?.value)       || 0;
  const duracao   = parseInt(document.getElementById('duracao')?.value)       || 0;
  const cidade    = document.getElementById('cidade')?.value                  || '';
  const bairro    = document.getElementById('bairro')?.value                  || '';
  const endereco  = document.getElementById('endereco')?.value?.trim()        || '';

  errocamp(nome.length < 3,  'nomeServico',      'erroNomeServico',     'Nome deve ter pelo menos 3 caracteres.');
  errocamp(!cat,             'categoriaServico', 'erroCategoriaServico','Selecione uma categoria.');
  errocamp(!tipo,            'tipoServico',      'erroTipoServico',     'Selecione o tipo de serviço.');
  errocamp(descCurta.length < 10, 'descCurta',  'erroDescCurta',       'Descrição curta muito breve (mín. 10 caracteres).');
  errocamp(descDet.length < 20,   'descDetalhada','erroDescDetalhada',  'Descrição detalhada muito breve (mín. 20 caracteres).');
  errocamp(preco <= 0,       'preco',            'erroPreco',           'Introduza um preço válido maior que 0 Kz.');
  errocamp(duracao < 1,      'duracao',          'erroDuracao',         'Introduza a duração do serviço.');
  errocamp(!cidade,          'cidade',           'erroCidade',          'Selecione a cidade.');
  errocamp(!bairro,          'bairro',           'erroBairro',          'Selecione o bairro.');
  errocamp(endereco.length < 5, 'endereco',      'erroEndereco',        'Introduza o endereço completo.');

  return ok;
}

/* ══════════════════════════════════════════════════════════════════
   ACÇÕES PRINCIPAIS
══════════════════════════════════════════════════════════════════ */

/** Publicar serviço → guarda no localStorage via DB */
function publicarServico() {
  if (!validarServico()) {
    mostrarToast('Corrija os campos assinalados antes de publicar.', 'erro');
    const primeiro = document.querySelector('[style*="border-color: rgb(231"]');
    if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = document.querySelector('.btn-publicar');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A publicar...'; }

  setTimeout(() => {
    const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;

    /* Público atendido */
    const publico = [];
    [['chkHomens','Homens'],['chkMulheres','Mulheres'],['chkCriancas','Crianças'],['chkTodos','Todos']].forEach(([id, label]) => {
      if (document.getElementById(id)?.checked) publico.push(label);
    });

    /* Dias seleccionados */
    const dias = [];
    document.querySelectorAll('.dias-grupo .chk:checked').forEach(el => {
      const span = el.parentElement?.querySelector('span');
      if (span) dias.push(span.textContent.trim());
    });

    /* Horários */
    const horarios = [];
    document.querySelectorAll('#horariosList .horario-linha').forEach(linha => {
      const inputs = linha.querySelectorAll('input[type="time"]');
      if (inputs.length === 2) horarios.push({ de: inputs[0].value, ate: inputs[1].value });
    });

    /* Imagem: 1.º upload do utilizador, 2.º placeholder */
    const imagem = imagensServico[0] || 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Serviço';

    const servico = {
      nome:           document.getElementById('nomeServico')?.value?.trim()     || '',
      categoria:      document.getElementById('categoriaServico')?.value         || '',
      subcategoria:   document.getElementById('subcategoria')?.value             || '',
      tipoServico:    document.getElementById('tipoServico')?.value              || '',
      formato:        document.querySelector('input[name="formato"]:checked')?.value || 'presencial',
      descricaoCurta: document.getElementById('descCurta')?.value?.trim()        || '',
      descricao:      document.getElementById('descDetalhada')?.value?.trim()    || '',
      preco:          parseFloat(document.getElementById('preco')?.value)        || 0,
      precoPromo:     parseFloat(document.getElementById('precoPromo')?.value)   || 0,
      duracao:        parseInt(document.getElementById('duracao')?.value)        || 0,
      unidadeDuracao: document.getElementById('unidadeDuracao')?.value           || 'minutos',
      publico,
      cidade:         document.getElementById('cidade')?.value                   || '',
      bairro:         document.getElementById('bairro')?.value                   || '',
      endereco:       document.getElementById('endereco')?.value?.trim()         || '',
      referencia:     document.getElementById('referencia')?.value?.trim()       || '',
      dias,
      horarios,
      experiencia:    document.getElementById('experiencia')?.value?.trim()      || '',
      materiais:      document.getElementById('materiais')?.value?.trim()        || '',
      certificacoes:  document.getElementById('certificacoes')?.value?.trim()    || '',
      status:         document.querySelector('input[name="status"]:checked')?.value || 'ativo',
      imagem,
      img: imagem,
      imagens: imagensServico.length > 0 ? [...imagensServico] : [imagem],
      vendedorId:     u ? u.id   : 0,
      vendedorNome:   u ? (u.nomeLoja || u.nome) : 'Prestador',
      estrelas:       5,
      avaliacoes:     0,
    };

    /* Promoção válida? */
    if (servico.precoPromo > 0 && servico.precoPromo < servico.preco) {
      servico.promo    = true;
      servico.precoReg = servico.preco;
    } else {
      servico.promo    = false;
      servico.precoPromo = 0;
    }

    /* Guardar no DB */
    if (typeof DB !== 'undefined') {
      DB.servicos.add(servico);
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar serviço'; }

    /* Modal de sucesso */
    abrirModal('modalSucesso');

  }, 800);
}

/** Guardar como rascunho */
function salvarRascunho() {
  const nome = document.getElementById('nomeServico')?.value?.trim() || '';
  if (!nome) {
    mostrarToast('Introduza pelo menos o nome do serviço para guardar o rascunho.', 'erro');
    return;
  }

  const btn = document.querySelector('.btn-rascunho');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A guardar...'; }

  setTimeout(() => {
    const u = typeof Sessao !== 'undefined' ? Sessao.get() : null;
    const imagem = imagensServico[0] || 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Rascunho';

    const rascunho = {
      nome,
      categoria:  document.getElementById('categoriaServico')?.value || '',
      preco:      parseFloat(document.getElementById('preco')?.value) || 0,
      descricao:  document.getElementById('descDetalhada')?.value?.trim() || '',
      status:     'rascunho',
      imagem,
      img: imagem,
      vendedorId: u ? u.id   : 0,
      vendedorNome: u ? (u.nomeLoja || u.nome) : 'Prestador',
      estrelas:   0,
      avaliacoes: 0,
    };

    if (typeof DB !== 'undefined') DB.servicos.add(rascunho);

    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Salvar como rascunho'; }
    mostrarToast('✓ Rascunho guardado com sucesso!', 'sucesso');
  }, 600);
}

/* ══════════════════════════════════════════════════════════════════
   MODAIS
══════════════════════════════════════════════════════════════════ */
function abrirModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'flex'; m.classList.add('aberto'); }
}
function fecharModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'none'; m.classList.remove('aberto'); }
  /* Após fechar o modal de sucesso vai para o mercado */
  if (id === 'modalSucesso') window.location.href = 'mercado.html';
}
function confirmarCancelar() {
  abrirModal('modalCancelar');
}

/* ══════════════════════════════════════════════════════════════════
   DISPONIBILIDADE — HORÁRIOS
══════════════════════════════════════════════════════════════════ */
let totalHorarios = 1;

function adicionarHorario() {
  const lista = document.getElementById('horariosList');
  if (!lista) return;
  totalHorarios++;
  const id = 'horario' + totalHorarios;
  const linha = document.createElement('div');
  linha.className = 'horario-linha';
  linha.id = id;
  linha.innerHTML = `
    <span>De</span>
    <input type="time" value="08:00" class="campo campo-hora"/>
    <span>até</span>
    <input type="time" value="18:00" class="campo campo-hora"/>
    <button type="button" class="btn-rem-horario" onclick="removerHorario('${id}')" title="Remover">
      <i class="fas fa-times"></i>
    </button>`;
  lista.appendChild(linha);
}

function removerHorario(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ══════════════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════════════ */
let totalFaq = 1;

function toggleFaq() {
  const area  = document.getElementById('faqArea');
  const chk   = document.getElementById('chkFaq');
  const seta  = document.getElementById('setaFaq');
  if (!area) return;
  const aberto = area.style.display !== 'none';
  area.style.display = aberto ? 'none' : 'block';
  if (chk)  chk.checked = !aberto;
  if (seta) { seta.classList.toggle('fa-chevron-down', aberto); seta.classList.toggle('fa-chevron-up', !aberto); }
}

function adicionarFaq() {
  const lista = document.getElementById('faqLista');
  if (!lista) return;
  const id = 'faqPar' + totalFaq++;
  const div = document.createElement('div');
  div.className = 'faq-par';
  div.id = id;
  div.innerHTML = `
    <input type="text" class="campo" placeholder="Pergunta..." style="margin-bottom:6px"/>
    <textarea class="campo campo-ta" rows="2" placeholder="Resposta..."></textarea>
    <button type="button" onclick="document.getElementById('${id}').remove()" style="color:#e74c3c;background:none;border:none;cursor:pointer;font-size:12px;margin-top:4px"><i class="fas fa-trash"></i> Remover</button>`;
  lista.appendChild(div);
}

/* ══════════════════════════════════════════════════════════════════
   RESUMO LATERAL (indicadores de progresso)
══════════════════════════════════════════════════════════════════ */
function actualizarResumo() {
  const checks = {
    stInfo:  !!(document.getElementById('nomeServico')?.value?.trim() && document.getElementById('categoriaServico')?.value),
    stDesc:  !!(document.getElementById('descCurta')?.value?.trim()   && document.getElementById('descDetalhada')?.value?.trim()),
    stPreco: !!(parseFloat(document.getElementById('preco')?.value) > 0 && parseInt(document.getElementById('duracao')?.value) > 0),
    stImg:   imagensServico.length > 0,
    stLocal: !!(document.getElementById('cidade')?.value && document.getElementById('bairro')?.value && document.getElementById('endereco')?.value?.trim()),
    stDisp:  document.querySelectorAll('.dias-grupo .chk:checked').length > 0,
    stAd:    !!(document.getElementById('experiencia')?.value?.trim()),
  };
  Object.entries(checks).forEach(([id, ok]) => {
    const el = document.getElementById(id);
    if (el) el.style.color = ok ? '#27ae60' : '#555';
  });
}

/* ══════════════════════════════════════════════════════════════════
   CONTADOR DE CARACTERES
══════════════════════════════════════════════════════════════════ */
function contarChars(el, contId, max) {
  const cnt = document.getElementById(contId);
  if (cnt) cnt.textContent = el.value.length + '/' + max;
  actualizarResumo();
}

/* ══════════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════════ */
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
