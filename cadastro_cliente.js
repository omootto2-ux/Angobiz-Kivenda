/* =========================================
   ANGOBIZ KIVENDA – CRIAR CONTA – JAVASCRIPT
   Funcionalidades:
   - Validação completa de todos os campos
   - Indicador de força da senha em tempo real
   - Mostrar/ocultar senha
   - Tooltip do tipo de usuário
   - Modais: Termos, Privacidade, Sucesso
   - Submissão com loading e feedback
   - Toast de notificações
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. REFERÊNCIAS DOS ELEMENTOS
  ───────────────────────────────────────── */
  var formRegisto       = document.getElementById('formRegisto');
  var inputNome         = document.getElementById('nomeCompleto');
  var inputEmail        = document.getElementById('email');
  var inputTelefone     = document.getElementById('telefone');
  var inputBairro       = document.getElementById('bairro');
  var selectProvincia   = document.getElementById('provincia');
  var selectTipo        = document.getElementById('tipoUsuario');
  var inputSenha        = document.getElementById('senha');
  var inputConfirmar    = document.getElementById('confirmarSenha');
  var checkTermos       = document.getElementById('checkTermos');

  var btnVerSenha1      = document.getElementById('btnVerSenha1');
  var btnVerSenha2      = document.getElementById('btnVerSenha2');
  var olho1             = document.getElementById('olho1');
  var olho2             = document.getElementById('olho2');

  var forcaProgresso    = document.getElementById('forcaProgresso');
  var forcaTexto        = document.getElementById('forcaTexto');

  var btnCriar          = document.getElementById('btnCriar');
  var textoBtnCriar     = document.getElementById('textoBtnCriar');
  var spinnerCriar      = document.getElementById('spinnerCriar');

  var btnTooltip        = document.getElementById('btnTooltip');
  var tooltipCaixa      = document.getElementById('tooltipCaixa');

  /* Erros */
  var erroNome          = document.getElementById('erroNome');
  var erroEmail         = document.getElementById('erroEmail');
  var erroTelefone      = document.getElementById('erroTelefone');
  var erroBairro        = document.getElementById('erroBairro');
  var erroProvincia     = document.getElementById('erroProvincia');
  var erroTipo          = document.getElementById('erroTipo');
  var erroSenha         = document.getElementById('erroSenha');
  var erroConfirmar     = document.getElementById('erroConfirmar');
  var erroTermos        = document.getElementById('erroTermos');

  /* Wrappers */
  var wrapperNome       = document.getElementById('wrapperNome');
  var wrapperEmail      = document.getElementById('wrapperEmail');
  var wrapperTelefone   = document.getElementById('wrapperTelefone');
  var wrapperBairro     = document.getElementById('wrapperBairro');
  var wrapperProvincia  = document.getElementById('wrapperProvincia');
  var wrapperTipo       = document.getElementById('wrapperTipo');
  var wrapperSenha      = document.getElementById('wrapperSenha');
  var wrapperConfirmar  = document.getElementById('wrapperConfirmar');

  /* Modais */
  var modalTermos       = document.getElementById('modalTermos');
  var modalPrivacidade  = document.getElementById('modalPrivacidade');
  var modalSucesso      = document.getElementById('modalSucesso');

  var toast             = document.getElementById('toast');
  var toastIcone        = document.getElementById('toastIcone');
  var toastTexto        = document.getElementById('toastTexto');
  var timerToast        = null;

  /* ─────────────────────────────────────────
     2. UTILITÁRIOS
  ───────────────────────────────────────── */
  function definirErro(wrapper, erroEl, mensagem) {
    wrapper.classList.add('erro-campo');
    wrapper.classList.remove('valido-campo');
    erroEl.textContent = mensagem;
  }

  function definirValido(wrapper, erroEl) {
    wrapper.classList.remove('erro-campo');
    wrapper.classList.add('valido-campo');
    erroEl.textContent = '';
  }

  function limparEstado(wrapper, erroEl) {
    wrapper.classList.remove('erro-campo', 'valido-campo');
    erroEl.textContent = '';
  }

  function emailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function telefoneValido(v) { return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(v.trim()); }

  /* ─────────────────────────────────────────
     3. VALIDAÇÃO EM TEMPO REAL – cada campo
  ───────────────────────────────────────── */

  /* Nome completo */
  inputNome.addEventListener('blur', function () {
    var v = inputNome.value.trim();
    if (v === '') definirErro(wrapperNome, erroNome, 'O nome completo é obrigatório.');
    else if (v.split(' ').filter(function(p){ return p.length > 0; }).length < 2)
      definirErro(wrapperNome, erroNome, 'Insira o nome e o apelido.');
    else definirValido(wrapperNome, erroNome);
  });
  inputNome.addEventListener('input', function () { if (wrapperNome.classList.contains('erro-campo')) limparEstado(wrapperNome, erroNome); });

  /* Email */
  inputEmail.addEventListener('blur', function () {
    var v = inputEmail.value.trim();
    if (v === '') definirErro(wrapperEmail, erroEmail, 'O e-mail é obrigatório.');
    else if (!emailValido(v)) definirErro(wrapperEmail, erroEmail, 'Insira um e-mail válido.');
    else definirValido(wrapperEmail, erroEmail);
  });
  inputEmail.addEventListener('input', function () { if (wrapperEmail.classList.contains('erro-campo')) limparEstado(wrapperEmail, erroEmail); });

  /* Telefone */
  inputTelefone.addEventListener('blur', function () {
    var v = inputTelefone.value.trim();
    if (v === '') definirErro(wrapperTelefone, erroTelefone, 'O telefone é obrigatório.');
    else if (!telefoneValido(v)) definirErro(wrapperTelefone, erroTelefone, 'Insira um número de telefone válido.');
    else definirValido(wrapperTelefone, erroTelefone);
  });
  inputTelefone.addEventListener('input', function () { if (wrapperTelefone.classList.contains('erro-campo')) limparEstado(wrapperTelefone, erroTelefone); });

  /* Bairro */
  inputBairro.addEventListener('blur', function () {
    var v = inputBairro.value.trim();
    if (v === '') definirErro(wrapperBairro, erroBairro, 'O bairro é obrigatório.');
    else if (v.length < 3) definirErro(wrapperBairro, erroBairro, 'Insira um bairro válido.');
    else definirValido(wrapperBairro, erroBairro);
  });
  inputBairro.addEventListener('input', function () { if (wrapperBairro.classList.contains('erro-campo')) limparEstado(wrapperBairro, erroBairro); });

  /* Província */
  selectProvincia.addEventListener('change', function () {
    if (selectProvincia.value === '') definirErro(wrapperProvincia, erroProvincia, 'Selecione a província.');
    else definirValido(wrapperProvincia, erroProvincia);
  });

  /* Tipo de usuário */
  selectTipo.addEventListener('change', function () {
    if (selectTipo.value === '') definirErro(wrapperTipo, erroTipo, 'Selecione o tipo de usuário.');
    else definirValido(wrapperTipo, erroTipo);
  });

  /* Confirmar senha */
  inputConfirmar.addEventListener('blur', function () {
    var v = inputConfirmar.value;
    if (v === '') definirErro(wrapperConfirmar, erroConfirmar, 'Confirme a sua senha.');
    else if (v !== inputSenha.value) definirErro(wrapperConfirmar, erroConfirmar, 'As senhas não coincidem.');
    else definirValido(wrapperConfirmar, erroConfirmar);
  });
  inputConfirmar.addEventListener('input', function () { if (wrapperConfirmar.classList.contains('erro-campo')) limparEstado(wrapperConfirmar, erroConfirmar); });

  /* ─────────────────────────────────────────
     4. FORÇA DA SENHA
  ───────────────────────────────────────── */
  inputSenha.addEventListener('input', function () {
    var v = inputSenha.value;
    limparEstado(wrapperSenha, erroSenha);

    if (v.length === 0) {
      forcaProgresso.style.width = '0';
      forcaTexto.textContent = '';
      return;
    }

    var pontos = 0;
    if (v.length >= 8)             pontos++;   /* Comprimento mínimo */
    if (/[A-Z]/.test(v))           pontos++;   /* Maiúscula */
    if (/[a-z]/.test(v))           pontos++;   /* Minúscula */
    if (/[0-9]/.test(v))           pontos++;   /* Número */
    if (/[^A-Za-z0-9]/.test(v))    pontos++;   /* Caractere especial */

    var niveis = [
      { cor: '#cc0000', texto: 'Muito fraca',  largura: '15%' },
      { cor: '#e65100', texto: 'Fraca',         largura: '30%' },
      { cor: '#f9a825', texto: 'Razoável',      largura: '55%' },
      { cor: '#558b2f', texto: 'Boa',           largura: '75%' },
      { cor: '#2e7d32', texto: 'Excelente',     largura: '100%'}
    ];

    var nivel = niveis[Math.min(pontos - 1, 4)];
    forcaProgresso.style.width      = nivel.largura;
    forcaProgresso.style.background = nivel.cor;
    forcaTexto.textContent          = nivel.texto;
    forcaTexto.style.color          = nivel.cor;
  });

  inputSenha.addEventListener('blur', function () {
    var v = inputSenha.value;
    if (v === '') {
      definirErro(wrapperSenha, erroSenha, 'A senha é obrigatória.');
      forcaProgresso.style.width = '0'; forcaTexto.textContent = '';
    } else if (v.length < 6) {
      definirErro(wrapperSenha, erroSenha, 'A senha deve ter pelo menos 6 caracteres.');
    } else {
      definirValido(wrapperSenha, erroSenha);
    }
  });

  /* ─────────────────────────────────────────
     5. MOSTRAR / OCULTAR SENHA
  ───────────────────────────────────────── */
  function alternarSenha(inputEl, olhoEl) {
    var visivel = inputEl.type === 'text';
    inputEl.type  = visivel ? 'password' : 'text';
    olhoEl.className = visivel ? 'fa fa-eye' : 'fa fa-eye-slash';
  }

  btnVerSenha1.addEventListener('click', function () { alternarSenha(inputSenha, olho1); });
  btnVerSenha2.addEventListener('click', function () { alternarSenha(inputConfirmar, olho2); });

  /* ─────────────────────────────────────────
     6. TOOLTIP DO TIPO DE USUÁRIO
  ───────────────────────────────────────── */
  btnTooltip.addEventListener('click', function (e) {
    e.stopPropagation();
    var rect = btnTooltip.getBoundingClientRect();
    tooltipCaixa.style.top  = (rect.bottom + window.scrollY + 8) + 'px';
    tooltipCaixa.style.left = Math.max(10, rect.left - 80) + 'px';
    tooltipCaixa.classList.toggle('visivel');
  });

  document.addEventListener('click', function (e) {
    if (!tooltipCaixa.contains(e.target) && e.target !== btnTooltip) {
      tooltipCaixa.classList.remove('visivel');
    }
  });

  /* ─────────────────────────────────────────
     7. MODAIS TERMOS E PRIVACIDADE
  ───────────────────────────────────────── */
  document.getElementById('linkTermos').addEventListener('click', function (e) {
    e.preventDefault(); abrirModal(modalTermos);
  });
  document.getElementById('linkPrivacidade').addEventListener('click', function (e) {
    e.preventDefault(); abrirModal(modalPrivacidade);
  });

  /* Termos */
  document.getElementById('btnFecharTermos').addEventListener('click', function () { fecharModal(modalTermos); });
  document.getElementById('btnRecusarTermos').addEventListener('click', function () {
    checkTermos.checked = false; fecharModal(modalTermos);
  });
  document.getElementById('btnAceitarTermos').addEventListener('click', function () {
    checkTermos.checked = true;
    erroTermos.textContent = '';
    fecharModal(modalTermos);
    mostrarToast('Termos e Condições aceites.', 'sucesso');
  });
  modalTermos.addEventListener('click', function (e) { if (e.target === modalTermos) fecharModal(modalTermos); });

  /* Privacidade */
  document.getElementById('btnFecharPrivacidade').addEventListener('click', function () { fecharModal(modalPrivacidade); });
  document.getElementById('btnFecharPriv2').addEventListener('click', function () { fecharModal(modalPrivacidade); });
  document.getElementById('btnAceitarPriv').addEventListener('click', function () {
    checkTermos.checked = true;
    erroTermos.textContent = '';
    fecharModal(modalPrivacidade);
    mostrarToast('Política de Privacidade aceite.', 'sucesso');
  });
  modalPrivacidade.addEventListener('click', function (e) { if (e.target === modalPrivacidade) fecharModal(modalPrivacidade); });

  /* Sucesso */
  document.getElementById('btnIrLogin').addEventListener('click', function () {
    fecharModal(modalSucesso);
    window.location.href = 'login.html';
  });
  modalSucesso.addEventListener('click', function (e) { if (e.target === modalSucesso) fecharModal(modalSucesso); });

  /* Fechar com ESC */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharModal(modalTermos);
      fecharModal(modalPrivacidade);
      fecharModal(modalSucesso);
      tooltipCaixa.classList.remove('visivel');
    }
  });

  function abrirModal(modal) { modal.classList.add('aberto'); document.body.style.overflow = 'hidden'; }
  function fecharModal(modal) { modal.classList.remove('aberto'); document.body.style.overflow = ''; }

  /* ─────────────────────────────────────────
     8. VALIDAÇÃO COMPLETA DO FORMULÁRIO
  ───────────────────────────────────────── */
  function validarTudo() {
    var valido = true;

    /* Nome */
    var nome = inputNome.value.trim();
    if (nome === '') { definirErro(wrapperNome, erroNome, 'O nome completo é obrigatório.'); valido = false; }
    else if (nome.split(' ').filter(function(p){ return p.length > 0; }).length < 2) {
      definirErro(wrapperNome, erroNome, 'Insira o nome e o apelido.'); valido = false;
    } else { definirValido(wrapperNome, erroNome); }

    /* Email */
    var email = inputEmail.value.trim();
    if (email === '') { definirErro(wrapperEmail, erroEmail, 'O e-mail é obrigatório.'); valido = false; }
    else if (!emailValido(email)) { definirErro(wrapperEmail, erroEmail, 'Insira um e-mail válido.'); valido = false; }
    else { definirValido(wrapperEmail, erroEmail); }

    /* Telefone */
    var tel = inputTelefone.value.trim();
    if (tel === '') { definirErro(wrapperTelefone, erroTelefone, 'O telefone é obrigatório.'); valido = false; }
    else if (!telefoneValido(tel)) { definirErro(wrapperTelefone, erroTelefone, 'Número de telefone inválido.'); valido = false; }
    else { definirValido(wrapperTelefone, erroTelefone); }

    /* Bairro */
    var bairro = inputBairro.value.trim();
    if (bairro === '') { definirErro(wrapperBairro, erroBairro, 'O bairro é obrigatório.'); valido = false; }
    else if (bairro.length < 3) { definirErro(wrapperBairro, erroBairro, 'Insira um bairro válido.'); valido = false; }
    else { definirValido(wrapperBairro, erroBairro); }

    /* Província */
    if (selectProvincia.value === '') { definirErro(wrapperProvincia, erroProvincia, 'Selecione a província.'); valido = false; }
    else { definirValido(wrapperProvincia, erroProvincia); }

    /* Tipo */
    if (selectTipo.value === '') { definirErro(wrapperTipo, erroTipo, 'Selecione o tipo de usuário.'); valido = false; }
    else { definirValido(wrapperTipo, erroTipo); }

    /* Senha */
    var senha = inputSenha.value;
    if (senha === '') { definirErro(wrapperSenha, erroSenha, 'A senha é obrigatória.'); valido = false; }
    else if (senha.length < 6) { definirErro(wrapperSenha, erroSenha, 'A senha deve ter pelo menos 6 caracteres.'); valido = false; }
    else { definirValido(wrapperSenha, erroSenha); }

    /* Confirmar senha */
    var confirmar = inputConfirmar.value;
    if (confirmar === '') { definirErro(wrapperConfirmar, erroConfirmar, 'Confirme a sua senha.'); valido = false; }
    else if (confirmar !== senha) { definirErro(wrapperConfirmar, erroConfirmar, 'As senhas não coincidem.'); valido = false; }
    else { definirValido(wrapperConfirmar, erroConfirmar); }

    /* Termos */
    if (!checkTermos.checked) {
      erroTermos.textContent = 'Deve aceitar os Termos e Condições para continuar.';
      valido = false;
    } else {
      erroTermos.textContent = '';
    }

    return valido;
  }

  /* ─────────────────────────────────────────
     9. SUBMISSÃO DO FORMULÁRIO
  ───────────────────────────────────────── */
  formRegisto.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validarTudo()) {
      /* Fazer scroll até ao primeiro erro */
      var primeiroErro = document.querySelector('.erro-campo');
      if (primeiroErro) primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mostrarToast('Corrija os erros no formulário antes de continuar.', 'erro');
      return;
    }

    /* Iniciar loading */
    textoBtnCriar.style.display = 'none';
    spinnerCriar.style.display  = 'block';
    btnCriar.disabled = true;

    /* Simular criação da conta (chamada à API) */
    setTimeout(function () {
      textoBtnCriar.style.display = 'block';
      spinnerCriar.style.display  = 'none';
      btnCriar.disabled = false;

      /* Guardar utilizador simulado */
      var novoUtilizador = {
        nome:      inputNome.value.trim(),
        email:     inputEmail.value.trim().toLowerCase(),
        telefone:  inputTelefone.value.trim(),
        bairro:    inputBairro.value.trim(),
        provincia: selectProvincia.value,
        tipo:      selectTipo.value,
        hora:      new Date().toISOString()
      };
      localStorage.setItem('angobiz_novo_utilizador', JSON.stringify(novoUtilizador));

      /* Mostrar modal de sucesso */
      abrirModal(modalSucesso);

    }, 2000);
  });

  /* ─────────────────────────────────────────
     10. TOAST DE NOTIFICAÇÕES
  ───────────────────────────────────────── */
  function mostrarToast(mensagem, tipo) {
    toastTexto.textContent = mensagem;
    toast.className = 'toast ' + tipo;
    var icones = { sucesso: 'fa fa-check-circle', erro: 'fa fa-times-circle', aviso: 'fa fa-exclamation-circle' };
    toastIcone.className = icones[tipo] || icones.aviso;
    setTimeout(function () { toast.classList.add('visivel'); }, 10);
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { toast.classList.remove('visivel'); }, 4500);
  }

  toast.addEventListener('click', function () { toast.classList.remove('visivel'); clearTimeout(timerToast); });

  /* ─────────────────────────────────────────
     11. MÁSCARA DE TELEFONE
  ───────────────────────────────────────── */
  inputTelefone.addEventListener('input', function () {
    var v = inputTelefone.value.replace(/[^\d\+\s\-\(\)]/g, '');
    inputTelefone.value = v;
  });

  /* ─────────────────────────────────────────
     12. FOCO AUTOMÁTICO
  ───────────────────────────────────────── */
  setTimeout(function () { inputNome.focus(); }, 300);

});
