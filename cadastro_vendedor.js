/* ═══════════════════════════════════════════
   ANGOBIZ KIVENDA — CADASTRO JS
   ═══════════════════════════════════════════ */

// ── DADOS GEOGRÁFICOS ──────────────────────────────

const municipiosPorProvincia = {
  luanda:   ['Luanda', 'Cacuaco', 'Cazenga', 'Icolo e Bengo', 'Quissama', 'Viana'],
  benguela: ['Benguela', 'Lobito', 'Balombo', 'Baía Farta', 'Bocoio', 'Caimbambo'],
  huambo:   ['Huambo', 'Caála', 'Catchiungo', 'Ecunha', 'Londuimbali'],
  lubango:  ['Lubango', 'Chibia', 'Chicomba', 'Chipindo', 'Gambos', 'Humpata'],
  malanje:  ['Malanje', 'Calandula', 'Cangandala', 'Caombo', 'Kiwaba N\'zoji'],
  cabinda:  ['Cabinda', 'Belize', 'Buco-Zau', 'Cacongo'],
  uige:     ['Uíge', 'Ambuíla', 'Bungo', 'Damba', 'Maquela do Zombo'],
  zaire:    ['M\'Banza Kongo', 'Cuimba', 'Nóqui', 'Nzeto', 'Soyo'],
};

// ── ESTADO ─────────────────────────────────────────

let passoActual = 1;

// ── INICIALIZAÇÃO ──────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  actualizarStepper();
  configurarForcaSenha();
  configurarInputBusca();
});

// ── STEPPER ────────────────────────────────────────

function actualizarStepper() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`step-${i}`);
    if (!el) continue;
    el.classList.remove('ativo', 'concluido');
    if (i < passoActual)  el.classList.add('concluido');
    if (i === passoActual) el.classList.add('ativo');
  }
}

// ── NAVEGAÇÃO ──────────────────────────────────────

function voltarPasso() {
  if (passoActual > 1) {
    passoActual--;
    actualizarStepper();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarToast(`Passo ${passoActual} de 4`);
  } else {
    mostrarToast('Já está no primeiro passo.', 'aviso');
  }
}

function continuarPasso() {
  const erros = validarFormulario();
  if (erros.length > 0) {
    mostrarToast(`Corrija os campos assinalados a vermelho.`, 'erro');
    // Focar o primeiro campo com erro
    const primeiroCampo = document.getElementById(erros[0].id);
    if (primeiroCampo) {
      primeiroCampo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      primeiroCampo.focus();
    }
    return;
  }

  if (passoActual < 3) {
    passoActual++;
    actualizarStepper();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarToast(`Passo ${passoActual} de 4 — a preencher corretamente!`);
  } else {
    // Mostrar modal de revisão no passo 3
    abrirRevisao();
  }
}

// ── VALIDAÇÃO ──────────────────────────────────────

function validarFormulario() {
  const erros = [];

  // Limpar erros anteriores
  document.querySelectorAll('.erro-campo').forEach(el => el.textContent = '');
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.classList.remove('invalido', 'valido');
  });

  // ─── Campos obrigatórios por passo
  const camposObrigatorios = [
    // Pessoais
    { id: 'nomeCompleto',   label: 'Nome completo',         tipo: 'texto' },
    { id: 'nomeUtilizador', label: 'Nome de utilizador',    tipo: 'slug' },
    { id: 'email',          label: 'Email',                 tipo: 'email' },
    { id: 'telefone',       label: 'Telefone',              tipo: 'texto' },
    { id: 'dataNascimento', label: 'Data de nascimento',    tipo: 'data' },
    { id: 'genero',         label: 'Género',                tipo: 'select' },
    { id: 'endereco',       label: 'Endereço residencial',  tipo: 'texto' },
    { id: 'provincia',      label: 'Província',             tipo: 'select' },
    { id: 'municipio',      label: 'Município',             tipo: 'select' },
    { id: 'bairro',         label: 'Bairro',                tipo: 'select' },
    // Negócio
    { id: 'nomeLoja',         label: 'Nome da loja',          tipo: 'texto' },
    { id: 'categoriaPrincipal', label: 'Categoria principal', tipo: 'select' },
    { id: 'tipoVendedor',     label: 'Tipo de vendedor',      tipo: 'select' },
    { id: 'descricaoLoja',    label: 'Descrição da loja',     tipo: 'textarea' },
    // Acesso
    { id: 'senha',          label: 'Senha',                  tipo: 'senha' },
    { id: 'confirmarSenha', label: 'Confirmação de senha',   tipo: 'confirmacao' },
    // Documentos
    { id: 'tipoDocumento',   label: 'Tipo de documento',     tipo: 'select' },
    { id: 'numeroDocumento', label: 'Número do documento',   tipo: 'texto' },
  ];

  camposObrigatorios.forEach(campo => {
    const el = document.getElementById(campo.id);
    if (!el) return;
    const val = el.value.trim();
    const errEl = document.getElementById(`err-${campo.id}`);

    let mensagemErro = '';

    switch (campo.tipo) {
      case 'texto':
        if (!val) mensagemErro = `${campo.label} é obrigatório.`;
        break;
      case 'slug':
        if (!val) mensagemErro = `${campo.label} é obrigatório.`;
        else if (!/^[a-z0-9_]+$/.test(val)) mensagemErro = 'Use apenas letras minúsculas, números e _.';
        break;
      case 'email':
        if (!val) mensagemErro = 'Email é obrigatório.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) mensagemErro = 'Insira um email válido.';
        break;
      case 'data':
        if (!val) mensagemErro = 'Data de nascimento é obrigatória.';
        else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) mensagemErro = 'Formato inválido. Use dd/mm/aaaa.';
        break;
      case 'select':
        if (!val) mensagemErro = `${campo.label} é obrigatório.`;
        break;
      case 'textarea':
        if (!val) mensagemErro = `${campo.label} é obrigatória.`;
        else if (val.length < 20) mensagemErro = 'Mínimo de 20 caracteres.';
        break;
      case 'senha':
        if (!val) mensagemErro = 'Senha é obrigatória.';
        else if (val.length < 8) mensagemErro = 'Mínimo de 8 caracteres.';
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(val)) mensagemErro = 'Use letras e números.';
        break;
      case 'confirmacao': {
        const senha = document.getElementById('senha')?.value;
        if (!val) mensagemErro = 'Confirmação de senha é obrigatória.';
        else if (val !== senha) mensagemErro = 'As senhas não coincidem.';
        break;
      }
    }

    if (mensagemErro) {
      el.classList.add('invalido');
      if (errEl) errEl.textContent = mensagemErro;
      erros.push({ id: campo.id, msg: mensagemErro });
    } else {
      el.classList.add('valido');
    }
  });

  // Uploads obrigatórios
  const uploadFrente = document.getElementById('file-frente');
  if (!uploadFrente?.files?.length) {
    const errEl = document.getElementById('err-frente');
    if (errEl) errEl.textContent = 'Foto da frente do documento é obrigatória.';
    erros.push({ id: 'upload-frente', msg: 'Frente obrigatória' });
  }
  const uploadComp = document.getElementById('file-comprovativo');
  if (!uploadComp?.files?.length) {
    const errEl = document.getElementById('err-comprovativo');
    if (errEl) errEl.textContent = 'Comprovativo de endereço é obrigatório.';
    erros.push({ id: 'upload-comprovativo', msg: 'Comprovativo obrigatório' });
  }

  // Termos
  const termos = document.getElementById('aceitarTermos');
  if (!termos?.checked) {
    const errEl = document.getElementById('err-termos');
    if (errEl) errEl.textContent = 'Deve aceitar os termos para continuar.';
    erros.push({ id: 'aceitarTermos', msg: 'Termos não aceites' });
  }

  return erros;
}

// ── MODAL REVISÃO ──────────────────────────────────

function abrirRevisao() {
  const corpo = document.getElementById('modalRevisaoCorpo');
  corpo.innerHTML = '';

  const secoes = [
    {
      titulo: 'Informações pessoais',
      campos: [
        { chave: 'Nome completo',         id: 'nomeCompleto' },
        { chave: 'Nome de utilizador',    id: 'nomeUtilizador' },
        { chave: 'Email',                 id: 'email' },
        { chave: 'Telefone',              id: 'telefone', prefix: 'prefixo' },
        { chave: 'Data de nascimento',    id: 'dataNascimento' },
        { chave: 'Género',                id: 'genero',   isSelect: true },
        { chave: 'Endereço residencial',  id: 'endereco' },
        { chave: 'Província',             id: 'provincia',  isSelect: true },
        { chave: 'Município',             id: 'municipio',  isSelect: true },
        { chave: 'Bairro',                id: 'bairro',     isSelect: true },
        { chave: 'Código postal',         id: 'codigoPostal' },
        { chave: 'NIF',                   id: 'nif' },
      ]
    },
    {
      titulo: 'Informações do negócio',
      campos: [
        { chave: 'Nome da loja',         id: 'nomeLoja' },
        { chave: 'Categoria principal',  id: 'categoriaPrincipal', isSelect: true },
        { chave: 'Tipo de vendedor',     id: 'tipoVendedor',       isSelect: true },
        { chave: 'Descrição',            id: 'descricaoLoja' },
        { chave: 'Website',              id: 'website' },
        { chave: 'Facebook',             id: 'facebook' },
        { chave: 'Instagram',            id: 'instagram' },
      ]
    },
    {
      titulo: 'Documentos',
      campos: [
        { chave: 'Tipo de documento',   id: 'tipoDocumento',   isSelect: true },
        { chave: 'Número do documento', id: 'numeroDocumento' },
      ]
    }
  ];

  secoes.forEach(sec => {
    const div = document.createElement('div');
    div.className = 'revisao-grupo';

    const tit = document.createElement('div');
    tit.className = 'revisao-grupo-titulo';
    tit.textContent = sec.titulo;
    div.appendChild(tit);

    sec.campos.forEach(c => {
      const el = document.getElementById(c.id);
      if (!el) return;
      let valor = c.isSelect
        ? (el.options[el.selectedIndex]?.text || '—')
        : (el.value.trim() || '—');
      if (c.prefix) {
        const pref = document.getElementById(c.prefix);
        if (pref) valor = `${pref.value} ${valor}`;
      }

      const linha = document.createElement('div');
      linha.className = 'revisao-linha';
      linha.innerHTML = `
        <span class="revisao-chave">${c.chave}</span>
        <span class="revisao-valor">${valor}</span>
      `;
      div.appendChild(linha);
    });

    corpo.appendChild(div);
  });

  document.getElementById('modalRevisao').classList.add('aberto');
  passoActual = 4;
  actualizarStepper();
}

function fecharModal() {
  document.getElementById('modalRevisao').classList.remove('aberto');
  passoActual = 3;
  actualizarStepper();
}

function submeterFormulario() {
  fecharModal();
  mostrarToast('Cadastro enviado com sucesso! Aguarde a verificação.');
  setTimeout(() => {
    mostrarToast('Receberá um email de confirmação em breve.', 'aviso');
  }, 2500);
}

// ── MUNICÍPIOS DINÂMICOS ───────────────────────────

function carregarMunicipios() {
  const provincia = document.getElementById('provincia').value;
  const selectMunicipio = document.getElementById('municipio');
  selectMunicipio.innerHTML = '<option value="">Selecione o município</option>';

  const lista = municipiosPorProvincia[provincia] || [];
  lista.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    opt.textContent = m;
    selectMunicipio.appendChild(opt);
  });
}

// ── FORMATAR DATA ──────────────────────────────────

function formatarData(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 2)  val = val.slice(0,2) + '/' + val.slice(2);
  if (val.length > 5)  val = val.slice(0,5) + '/' + val.slice(5);
  if (val.length > 10) val = val.slice(0,10);
  input.value = val;
}

// ── FORÇA DA SENHA ─────────────────────────────────

function configurarForcaSenha() {
  const senhaInput = document.getElementById('senha');
  if (!senhaInput) return;
  senhaInput.addEventListener('input', () => {
    const val = senhaInput.value;
    const forca = calcularForca(val);
    const barras = ['barra-f1','barra-f2','barra-f3','barra-f4'];
    barras.forEach((b, i) => {
      const el = document.getElementById(b);
      if (!el) return;
      el.classList.remove('fraca','media','forte');
      if (i < forca) {
        if (forca <= 1) el.classList.add('fraca');
        else if (forca <= 2) el.classList.add('media');
        else el.classList.add('forte');
      }
    });
  });
}

function calcularForca(senha) {
  let pts = 0;
  if (senha.length >= 8)  pts++;
  if (senha.length >= 12) pts++;
  if (/[A-Z]/.test(senha)) pts++;
  if (/[0-9]/.test(senha)) pts++;
  if (/[^A-Za-z0-9]/.test(senha)) pts++;
  return Math.min(4, Math.ceil(pts * 4/5));
}

// ── MOSTRAR / OCULTAR SENHA ────────────────────────

function toggleSenha(inputId, iconeId) {
  const input = document.getElementById(inputId);
  const icone = document.getElementById(iconeId);
  if (!input || !icone) return;
  if (input.type === 'password') {
    input.type = 'text';
    icone.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icone.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ── CONTADOR DE CARACTERES ─────────────────────────

function contarCaracteres(textarea, contadorId) {
  const contador = document.getElementById(contadorId);
  if (contador) contador.textContent = textarea.value.length;
}

// ── UPLOAD DE FICHEIROS ────────────────────────────

function triggerUpload(inputId) {
  document.getElementById(inputId)?.click();
}

function previewFicheiro(input, zonaId, prevId) {
  const ficheiro = input.files[0];
  if (!ficheiro) return;

  const tamanhoMax = zonaId === 'upload-logo' ? 2 : 5;
  if (ficheiro.size > tamanhoMax * 1024 * 1024) {
    mostrarToast(`Ficheiro muito grande. Máximo ${tamanhoMax}MB.`, 'erro');
    input.value = '';
    return;
  }

  const zona = document.getElementById(zonaId);
  const prevEl = document.getElementById(prevId);
  zona.classList.add('carregado');

  const leitor = new FileReader();
  leitor.onload = e => {
    const eImagem = ficheiro.type.startsWith('image/');
    prevEl.innerHTML = `
      ${eImagem ? `<img src="${e.target.result}" alt="preview"/>` : ''}
      <span class="nome-ficheiro">${ficheiro.name}</span>
      <button class="btn-remover-ficheiro" onclick="removerFicheiro('${input.id}','${zonaId}','${prevId}')" title="Remover">
        <i class="fas fa-times-circle"></i>
      </button>
    `;
  };
  leitor.readAsDataURL(ficheiro);
  mostrarToast(`"${ficheiro.name}" carregado com sucesso.`);
}

function removerFicheiro(inputId, zonaId, prevId) {
  const input = document.getElementById(inputId);
  const zona  = document.getElementById(zonaId);
  const prev  = document.getElementById(prevId);
  if (input) input.value = '';
  if (prev)  prev.innerHTML = '';
  if (zona)  zona.classList.remove('carregado');
}

// ── DRAG & DROP ────────────────────────────────────

function dragSobre(e) {
  e.preventDefault();
  e.currentTarget.classList.add('arrastando');
}
function dragFora(e) {
  e.currentTarget.classList.remove('arrastando');
}
function soltarFicheiro(e, inputId, zonaId, prevId) {
  e.preventDefault();
  e.currentTarget.classList.remove('arrastando');
  const ficheiro = e.dataTransfer.files[0];
  if (!ficheiro) return;
  const input = document.getElementById(inputId);
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(ficheiro);
  input.files = dataTransfer.files;
  previewFicheiro(input, zonaId, prevId);
}

// ── PESQUISA NO TOPO ───────────────────────────────

function configurarInputBusca() {
  const inputTopo = document.getElementById('inputPesquisaTopo');
  if (inputTopo) {
    inputTopo.addEventListener('keydown', e => {
      if (e.key === 'Enter') mostrarToast('Pesquisa não disponível nesta página.');
    });
  }
}

// ── TOAST ──────────────────────────────────────────

let timerToast = null;

function mostrarToast(msg, tipo = 'sucesso') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast visivel${tipo !== 'sucesso' ? ' ' + tipo : ''}`;
  clearTimeout(timerToast);
  timerToast = setTimeout(() => el.classList.remove('visivel'), 3500);
}

// ── FECHAR MODAL AO CLICAR FORA ────────────────────

document.getElementById('modalRevisao')?.addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

// ── FEEDBACK EM TEMPO REAL ─────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Remover erro ao começar a digitar
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('invalido');
      const errId = `err-${el.id}`;
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    });
    el.addEventListener('change', () => {
      el.classList.remove('invalido');
      const errId = `err-${el.id}`;
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    });
  });

  // Slug automático a partir do nome da loja
  const nomeLoja = document.getElementById('nomeLoja');
  const nomeUtil = document.getElementById('nomeUtilizador');
  if (nomeLoja && nomeUtil) {
    nomeLoja.addEventListener('input', () => {
      if (!nomeUtil.dataset.editadoManualmente) {
        nomeUtil.value = nomeLoja.value
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');
      }
    });
    nomeUtil.addEventListener('input', () => {
      nomeUtil.dataset.editadoManualmente = 'true';
    });
  }
});
