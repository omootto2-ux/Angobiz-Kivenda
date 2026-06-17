/* =========================================
   ANGOBIZ KIVENDA – LOGIN – JAVASCRIPT
   Funcionalidades:
   - Validação do formulário em tempo real
   - Mostrar/ocultar senha
   - Login simulado com credenciais de teste
   - Autenticação social (Google e Facebook)
   - Modal de recuperação de senha
   - Toasts de feedback
   - Persistência da sessão via localStorage
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. CREDENCIAIS DE TESTE
        (em produção substituir por chamada à API)
  ───────────────────────────────────────── */
  var utilizadoresRegistados = [
    { email: 'admin@angobizkivenda.ao', telefone: '+244923456789', senha: 'Admin@123', nome: 'Administrador' },
    { email: 'teste@email.com',         telefone: '923000000',     senha: 'Teste@123', nome: 'Utilizador Teste' },
    { email: 'user@kivenda.ao',         telefone: '912345678',     senha: 'User@2024',  nome: 'João Silva' }
  ];

  /* ─────────────────────────────────────────
     2. REFERÊNCIAS DOS ELEMENTOS
  ───────────────────────────────────────── */
  var formLogin          = document.getElementById('formLogin');
  var inputEmail         = document.getElementById('emailTelefone');
  var inputSenha         = document.getElementById('senha');
  var btnVerSenha        = document.getElementById('btnVerSenha');
  var iconeOlho          = document.getElementById('iconeOlho');
  var wrapperEmail       = document.getElementById('wrapperEmail');
  var wrapperSenha       = document.getElementById('wrapperSenha');
  var erroEmail          = document.getElementById('erroEmail');
  var erroSenha          = document.getElementById('erroSenha');
  var btnEntrar          = document.getElementById('btnEntrar');
  var textoEntrar        = document.getElementById('textoEntrar');
  var spinnerEntrar      = document.getElementById('spinnerEntrar');
  var linkEsqueceu       = document.getElementById('linkEsqueceu');
  var btnGoogle          = document.getElementById('btnGoogle');
  var btnFacebook        = document.getElementById('btnFacebook');

  /* Modais */
  var modalSenha         = document.getElementById('modalSenha');
  var btnFecharSenha     = document.getElementById('btnFecharSenha');
  var btnCancelarSenha   = document.getElementById('btnCancelarSenha');
  var btnEnviarRecup     = document.getElementById('btnEnviarRecuperacao');
  var inputRecuperacao   = document.getElementById('inputRecuperacao');
  var msgRecuperacao     = document.getElementById('msgRecuperacao');

  var modalSocial        = document.getElementById('modalSocial');
  var btnFecharSocial    = document.getElementById('btnFecharSocial');
  var iconeSocial        = document.getElementById('iconeSocial');
  var tituloSocial       = document.getElementById('tituloSocial');
  var textoSocial        = document.getElementById('textoSocial');
  var btnConfirmarSocial = document.getElementById('btnConfirmarSocial');

  var toast              = document.getElementById('toast');
  var toastIcone         = document.getElementById('toastIcone');
  var toastTexto         = document.getElementById('toastTexto');

  var redeSocialActual   = '';   /* 'google' ou 'facebook' */

  /* ─────────────────────────────────────────
     3. MOSTRAR / OCULTAR SENHA
  ───────────────────────────────────────── */
  btnVerSenha.addEventListener('click', function () {
    var visivel = inputSenha.type === 'text';
    inputSenha.type = visivel ? 'password' : 'text';
    iconeOlho.className = visivel ? 'fa fa-eye' : 'fa fa-eye-slash';
    btnVerSenha.title   = visivel ? 'Mostrar senha' : 'Ocultar senha';
  });

  /* ─────────────────────────────────────────
     4. VALIDAÇÃO EM TEMPO REAL
  ───────────────────────────────────────── */
  inputEmail.addEventListener('input', function () {
    limparErro(wrapperEmail, erroEmail);
  });

  inputSenha.addEventListener('input', function () {
    limparErro(wrapperSenha, erroSenha);
  });

  function limparErro(wrapper, erroEl) {
    wrapper.classList.remove('erro-campo');
    erroEl.textContent = '';
  }

  function mostrarErro(wrapper, erroEl, mensagem) {
    wrapper.classList.add('erro-campo');
    erroEl.textContent = mensagem;
  }

  function validarFormulario() {
    var valido = true;
    var emailVal = inputEmail.value.trim();
    var senhaVal = inputSenha.value;

    /* Validar e-mail / telefone */
    if (emailVal === '') {
      mostrarErro(wrapperEmail, erroEmail, 'Por favor preencha o e-mail ou telefone.');
      valido = false;
    } else if (!emailValido(emailVal) && !telefoneValido(emailVal)) {
      mostrarErro(wrapperEmail, erroEmail, 'Insira um e-mail ou número de telefone válido.');
      valido = false;
    }

    /* Validar senha */
    if (senhaVal === '') {
      mostrarErro(wrapperSenha, erroSenha, 'Por favor insira a sua senha.');
      valido = false;
    } else if (senhaVal.length < 6) {
      mostrarErro(wrapperSenha, erroSenha, 'A senha deve ter pelo menos 6 caracteres.');
      valido = false;
    }

    return valido;
  }

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function telefoneValido(valor) {
    /* Aceita formatos: +244923456789, 923456789, 912 345 678, etc. */
    return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(valor);
  }

  /* ─────────────────────────────────────────
     5. SUBMISSÃO DO FORMULÁRIO
  ───────────────────────────────────────── */
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validarFormulario()) return;
    iniciarLogin();
  });

  function iniciarLogin() {
    /* Mostrar loading */
    textoEntrar.style.display   = 'none';
    spinnerEntrar.style.display = 'block';
    btnEntrar.disabled = true;

    /* Simular delay de chamada à API (1.5s) */
    setTimeout(function () {
      processarLogin();
    }, 1500);
  }

  function processarLogin() {
    var emailVal = inputEmail.value.trim().toLowerCase();
    var senhaVal = inputSenha.value;

    /* Procurar utilizador correspondente */
    var utilizador = utilizadoresRegistados.find(function (u) {
      return (
        u.email.toLowerCase() === emailVal ||
        u.telefone === emailVal.replace(/\s/g, '')
      ) && u.senha === senhaVal;
    });

    /* Parar loading */
    textoEntrar.style.display   = 'block';
    spinnerEntrar.style.display = 'none';
    btnEntrar.disabled = false;

    if (utilizador) {
      /* Login com sucesso */
      guardarSessao(utilizador, 'email');
      mostrarToast('✓ Bem-vindo de volta, ' + utilizador.nome + '!', 'sucesso');

      /* Redirecionar após 1.5s */
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1800);

    } else {
      /* Credenciais inválidas */
      mostrarErro(wrapperEmail, erroEmail, ' ');
      mostrarErro(wrapperSenha, erroSenha, 'E-mail/telefone ou senha incorrectos.');
      mostrarToast('Credenciais inválidas. Tente novamente.', 'erro');

      /* Animação de shake no formulário */
      var direita = document.querySelector('.login-direita');
      direita.classList.add('shake');
      setTimeout(function () { direita.classList.remove('shake'); }, 500);
    }
  }

  /* ─────────────────────────────────────────
     6. GUARDAR SESSÃO
  ───────────────────────────────────────── */
  function guardarSessao(utilizador, metodo) {
    localStorage.setItem('angobiz_sessao', JSON.stringify({
      nome:    utilizador.nome,
      email:   utilizador.email || utilizador.id,
      metodo:  metodo,
      hora:    new Date().toISOString()
    }));
  }

  /* ─────────────────────────────────────────
     7. LINK "ESQUECEU SUA SENHA?"
  ───────────────────────────────────────── */
  linkEsqueceu.addEventListener('click', function (e) {
    e.preventDefault();
    /* Pré-preencher com o valor actual do campo de e-mail */
    inputRecuperacao.value = inputEmail.value.trim();
    msgRecuperacao.textContent = '';
    msgRecuperacao.className = 'modal-msg';
    abrirModal(modalSenha);
  });

  btnFecharSenha.addEventListener('click', function () { fecharModal(modalSenha); });
  btnCancelarSenha.addEventListener('click', function () { fecharModal(modalSenha); });
  modalSenha.addEventListener('click', function (e) { if (e.target === modalSenha) fecharModal(modalSenha); });

  btnEnviarRecup.addEventListener('click', function () {
    var val = inputRecuperacao.value.trim();
    if (val === '') {
      msgRecuperacao.textContent = 'Por favor insira o seu e-mail ou telefone.';
      msgRecuperacao.className   = 'modal-msg erro';
      return;
    }
    if (!emailValido(val) && !telefoneValido(val)) {
      msgRecuperacao.textContent = 'Insira um e-mail ou número válido.';
      msgRecuperacao.className   = 'modal-msg erro';
      return;
    }

    /* Simular envio */
    btnEnviarRecup.textContent = 'A enviar...';
    btnEnviarRecup.disabled    = true;

    setTimeout(function () {
      btnEnviarRecup.textContent = 'Enviar';
      btnEnviarRecup.disabled    = false;
      msgRecuperacao.textContent = '✓ Instruções enviadas! Verifique o seu e-mail/telefone.';
      msgRecuperacao.className   = 'modal-msg sucesso';

      setTimeout(function () {
        fecharModal(modalSenha);
        mostrarToast('Email de recuperação enviado com sucesso!', 'sucesso');
      }, 2000);
    }, 1500);
  });

  inputRecuperacao.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') btnEnviarRecup.click();
  });

  /* ─────────────────────────────────────────
     8. BOTÕES SOCIAIS: GOOGLE E FACEBOOK
  ───────────────────────────────────────── */
  btnGoogle.addEventListener('click', function () {
    redeSocialActual = 'google';
    iconeSocial.className = 'modal-icone';
    iconeSocial.innerHTML =
      '<svg style="width:48px;height:48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
        '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
        '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
        '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
      '</svg>';
    tituloSocial.textContent = 'Continuar com Google';
    textoSocial.textContent  = 'Será redirecionado para a autenticação da Google. A sua conta Google será usada para iniciar sessão na AngoBiz Kivenda de forma segura.';
    btnConfirmarSocial.className = 'btn-modal-ok';
    abrirModal(modalSocial);
  });

  btnFacebook.addEventListener('click', function () {
    redeSocialActual = 'facebook';
    iconeSocial.className = 'modal-icone';
    iconeSocial.innerHTML =
      '<svg style="width:48px;height:48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill="#1877F2" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708V30.938h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.373.469 5.373.469v5.906h-3.026c-2.981 0-3.912 1.85-3.912 3.75V24h6.656l-1.063 6.938H27.75v16.77C39.224 45.908 48 35.979 48 24z"/>' +
        '<path fill="#fff" d="M33.343 30.938L34.406 24H27.75v-4.5c0-1.9.931-3.75 3.912-3.75h3.026V9.844S32.2 9.375 29.575 9.375c-5.482 0-9.065 3.323-9.065 9.337V24h-6.094v6.938h6.094v16.77a24.18 24.18 0 007.49 0V30.938h5.343z"/>' +
      '</svg>';
    tituloSocial.textContent = 'Continuar com Facebook';
    textoSocial.textContent  = 'Será redirecionado para a autenticação do Facebook. O seu perfil Facebook será usado para iniciar sessão na AngoBiz Kivenda de forma segura.';
    btnConfirmarSocial.className = 'btn-modal-ok';
    abrirModal(modalSocial);
  });

  btnFecharSocial.addEventListener('click', function () { fecharModal(modalSocial); });
  modalSocial.addEventListener('click', function (e) { if (e.target === modalSocial) fecharModal(modalSocial); });

  btnConfirmarSocial.addEventListener('click', function () {
    fecharModal(modalSocial);
    /* Simular processo de autenticação social */
    var nomeFake = redeSocialActual === 'google' ? 'utilizador Google' : 'utilizador Facebook';
    btnEntrar.disabled = true;

    mostrarToast('A autenticar com ' + (redeSocialActual === 'google' ? 'Google' : 'Facebook') + '...', 'aviso');

    setTimeout(function () {
      /* Simular autenticação bem-sucedida */
      var utilizadorSocial = {
        nome:  redeSocialActual === 'google' ? 'João Google' : 'João Facebook',
        email: redeSocialActual + '@social.login',
        id:    'social_' + Date.now()
      };
      guardarSessao(utilizadorSocial, redeSocialActual);
      mostrarToast('✓ Autenticação com ' + (redeSocialActual === 'google' ? 'Google' : 'Facebook') + ' bem-sucedida!', 'sucesso');

      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1800);
    }, 2000);
  });

  /* ─────────────────────────────────────────
     9. FUNÇÕES DE MODAL
  ───────────────────────────────────────── */
  function abrirModal(modal) {
    modal.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal(modal) {
    modal.classList.remove('aberto');
    document.body.style.overflow = '';
  }

  /* Fechar modais com tecla ESC */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharModal(modalSenha);
      fecharModal(modalSocial);
    }
  });

  /* ─────────────────────────────────────────
     10. SISTEMA DE TOAST (notificações)
  ───────────────────────────────────────── */
  var timerToast = null;

  function mostrarToast(mensagem, tipo) {
    /* tipo: 'sucesso' | 'erro' | 'aviso' */
    toastTexto.textContent = mensagem;
    toast.className = 'toast ' + tipo;

    /* Ícone adequado ao tipo */
    var icones = { sucesso: 'fa fa-check-circle', erro: 'fa fa-times-circle', aviso: 'fa fa-exclamation-circle' };
    toastIcone.className = icones[tipo] || icones.aviso;

    /* Mostrar */
    setTimeout(function () { toast.classList.add('visivel'); }, 10);

    /* Ocultar automaticamente */
    clearTimeout(timerToast);
    timerToast = setTimeout(function () {
      toast.classList.remove('visivel');
    }, 4000);
  }

  /* Clicar no toast para fechar */
  toast.addEventListener('click', function () {
    toast.classList.remove('visivel');
    clearTimeout(timerToast);
  });

  /* ─────────────────────────────────────────
     11. ANIMAÇÃO DE SHAKE (erro de login)
  ───────────────────────────────────────── */
  var estiloShake = document.createElement('style');
  estiloShake.textContent =
    '@keyframes shake {' +
    '  0%,100%{transform:translateX(0)}' +
    '  15%{transform:translateX(-8px)}' +
    '  30%{transform:translateX(8px)}' +
    '  45%{transform:translateX(-6px)}' +
    '  60%{transform:translateX(6px)}' +
    '  75%{transform:translateX(-3px)}' +
    '  90%{transform:translateX(3px)}' +
    '}' +
    '.shake{animation:shake .5s ease;}';
  document.head.appendChild(estiloShake);

  /* ─────────────────────────────────────────
     12. VERIFICAR SE JÁ TEM SESSÃO ACTIVA
  ───────────────────────────────────────── */
  var sessaoGuardada = localStorage.getItem('angobiz_sessao');
  if (sessaoGuardada) {
    try {
      var sessao = JSON.parse(sessaoGuardada);
      /* Calcular tempo desde o login (expirar após 24h) */
      var horaLogin = new Date(sessao.hora).getTime();
      var agora     = new Date().getTime();
      var horas     = (agora - horaLogin) / 1000 / 3600;

      if (horas < 24 && sessao.nome) {
        /* Mostrar aviso de sessão activa */
        mostrarToast('Já tem sessão iniciada como ' + sessao.nome + '.', 'aviso');
      }
    } catch (e) {
      localStorage.removeItem('angobiz_sessao');
    }
  }

  /* ─────────────────────────────────────────
     13. ENTER PARA SUBMETER
  ───────────────────────────────────────── */
  [inputEmail, inputSenha].forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') formLogin.dispatchEvent(new Event('submit'));
    });
  });

  /* ─────────────────────────────────────────
     14. FOCO AUTOMÁTICO NO CAMPO DE E-MAIL
  ───────────────────────────────────────── */
  setTimeout(function () { inputEmail.focus(); }, 400);

});
