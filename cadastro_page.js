/**
 * ANGOBIZ KIVENDA — Cadastro de Utilizadores (clientes e vendedores)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (Sessao.logado()) { window.location.href = 'home.html'; return; }

  const form = document.getElementById('formRegisto');
  if (!form) return;

  /* Mostrar/esconder campo "Nome da Loja" consoante tipo */
  const tipoSel = document.getElementById('tipoUsuario');
  const wrapLoja = document.getElementById('wrapNomeLoja') || document.querySelector('.campo-nome-loja');
  function toggleLoja() {
    if (!wrapLoja) return;
    wrapLoja.style.display = tipoSel?.value === 'vendedor' ? '' : 'none';
  }
  if (tipoSel) { tipoSel.addEventListener('change', toggleLoja); toggleLoja(); }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome     = document.getElementById('nomeCompleto')?.value?.trim() || '';
    const email    = document.getElementById('email')?.value?.trim() || '';
    const telefone = document.getElementById('telefone')?.value?.trim() || '';
    const senha    = document.getElementById('senha')?.value || '';
    const confirma = document.getElementById('confirmarSenha')?.value || '';
    const tipo     = tipoSel?.value || document.querySelector('input[name="tipoConta"]:checked')?.value || 'cliente';
    const nomeLoja = document.getElementById('nomeLoja')?.value?.trim() || '';
    const provincia= document.getElementById('provincia')?.value || '';
    const termos   = document.getElementById('checkTermos')?.checked ?? true;

    /* Validações */
    if (!nome || nome.length < 3)     { Toast.erro('Nome deve ter pelo menos 3 caracteres.'); return; }
    if (!email || !email.includes('@')){ Toast.erro('Email inválido.'); return; }
    if (!senha || senha.length < 6)   { Toast.erro('Senha deve ter pelo menos 6 caracteres.'); return; }
    if (confirma && confirma !== senha){ Toast.erro('As senhas não coincidem.'); return; }
    if (!termos)                       { Toast.aviso('Aceite os Termos e Condições.'); return; }
    if (tipo === 'vendedor' && !nomeLoja){ Toast.aviso('Introduza o nome da sua loja.'); return; }

    const btn = document.getElementById('btnCriar') || form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'A criar conta...'; }

    setTimeout(() => {
      const r = Sessao.registar({ nome, email, telefone, senha, tipo, nomeLoja, provincia });
      if (btn) { btn.disabled = false; btn.textContent = 'CRIAR CONTA'; }

      if (r.ok) {
        Toast.ok('✓ Conta criada! Bem-vindo, ' + r.utilizador.nome.split(' ')[0] + '!');
        setTimeout(() => {
          const u = r.utilizador;
          window.location.href = u.tipo==='vendedor' ? 'painel_cliente.html' : 'home.html';
        }, 1200);
      } else {
        Toast.erro(r.msg);
      }
    }, 800);
  });
});

/* ══ CADASTRO VENDEDOR (multi-passo) ══ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Verificar se Sessao existe (vem do global.js)
  if (typeof Sessao === 'undefined') {
    console.error('ERRO: global.js não carregou corretamente!');
    return;
  }

  // 2. Se já estiver logado, vai para a home
  if (Sessao.logado()) {
    window.location.href = 'home.html';
    return;
  }

  const form = document.getElementById('formRegisto');
  if (!form) return;

  // Elementos do novo Container/Modal de Verificação
  const modalVerif = document.getElementById('modalVerificacaoWhats');
  const resumoDados = document.getElementById('resumoDadosPessoais');
  const inputCodigoModal = document.getElementById('codigoWhatsAppModal');
  const btnCancelar = document.getElementById('btnCancelarVerificacao');
  const btnConfirmarFinal = document.getElementById('btnConfirmarRegistoFinal');

  // Objeto temporário para reter os dados do formulário até à validação do código
  let dadosTemporarios = null;

  // Intercepta o envio do formulário inicial
  form.onsubmit = async e => {
    e.preventDefault();

    const email = document.getElementById('email')?.value?.trim() || '';
    const telVal = document.getElementById('telefone')?.value?.replace(/\D/g, '') || '';
    const nomeVal = document.getElementById('nomeCompleto')?.value?.trim() || 'Utilizador';

    // Validações básicas antes de abrir o container
    if (telVal.length < 9) {
      if (typeof Toast !== 'undefined') Toast.aviso('Telefone deve ter 9 dígitos.');
      return;
    }

    if (typeof DB !== 'undefined' && DB.users.find(email)) {
      if (typeof Toast !== 'undefined') Toast.erro('E-mail ou Telefone já registado.');
      return;
    }

    // Guarda temporariamente os dados digitados
    dadosTemporarios = {
      nome:     nomeVal,
      email:    email,
      telefone: document.getElementById('telefone')?.value?.trim(),
      senha:    document.getElementById('senha')?.value,
      tipo:     document.getElementById('tipoUsuario')?.value || 'cliente',
      provincia:document.getElementById('provincia')?.value,
    };

    // 1. Injeta os dados pessoais no container para visualização do usuário
    if (resumoDados) {
      resumoDados.innerHTML = `
        <p style="margin: 4px 0;"><strong>Nome:</strong> ${dadosTemporarios.nome}</p>
        <p style="margin: 4px 0;"><strong>E-mail:</strong> ${dadosTemporarios.email}</p>
        <p style="margin: 4px 0;"><strong>Telefone:</strong> ${dadosTemporarios.telefone}</p>
        <p style="margin: 4px 0;"><strong>Província:</strong> ${dadosTemporarios.provincia || 'Não informada'}</p>
        <p style="margin: 4px 0;"><strong>Tipo de Conta:</strong> ${dadosTemporarios.tipo.toUpperCase()}</p>
      `;
    }

    // 2. Gera e envia o código de verificação para o WhatsApp
    const codigo = VerificacaoWhats.gerar();
    if (typeof Toast !== 'undefined') Toast.info('A processar envio do código...');
    await VerificacaoWhats.enviar(telVal, codigo, nomeVal);

    // 3. Abre o container de verificação na tela
    if (modalVerif) {
      modalVerif.style.display = 'flex';
      if (inputCodigoModal) {
        inputCodigoModal.value = '';
        inputCodigoModal.focus();
      }
    }
  };

  // Botão de Cancelar dentro do Container
  if (btnCancelar) {
    btnCancelar.onclick = () => {
      if (modalVerif) modalVerif.style.display = 'none';
      VerificacaoWhats.limpar();
      dadosTemporarios = null;
    };
  }

  // Botão de Confirmação Final (Só aqui ele é registado de facto)
  if (btnConfirmarFinal) {
    btnConfirmarFinal.onclick = () => {
      const codigoInserido = inputCodigoModal?.value?.trim() || '';

      // Verifica se o código inserido na caixa de texto é válido
      if (VerificacaoWhats.valido(codigoInserido)) {
        VerificacaoWhats.verificado = true;

        if (typeof Toast !== 'undefined') Toast.ok('✓ Código correto!');
        btnConfirmarFinal.disabled = true;
        btnConfirmarFinal.textContent = 'A processar...';

        // Executa o registo na base de dados (localStorage através do global.js)
        const r = Sessao.registar(dadosTemporarios);
        
        if (r.ok) {
          if (typeof Toast !== 'undefined') Toast.ok('Conta criada com sucesso!');
          if (modalVerif) modalVerif.style.display = 'none';
          setTimeout(() => window.location.href = 'login.html', 1500);
        } else {
          if (typeof Toast !== 'undefined') Toast.erro(r.msg);
          btnConfirmarFinal.disabled = false;
          btnConfirmarFinal.textContent = 'Concluir Registo';
        }
      } else {
        if (typeof Toast !== 'undefined') Toast.erro('Código inválido ou expirado. Tente novamente.');
      }
    };
  }

  _setupModaisExtra();
});
