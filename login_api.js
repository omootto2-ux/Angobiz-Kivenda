/**
 * AngoBiz Kivenda — Patch de integração API no Login
 * Este script substitui a lógica simulada pelo backend PHP real.
 */
document.addEventListener('DOMContentLoaded', function () {
  var formLogin   = document.getElementById('formLogin');
  var btnEntrar   = document.getElementById('btnEntrar');
  var textoEntrar = document.getElementById('textoEntrar');
  var spinnerEntrar = document.getElementById('spinnerEntrar');
  var inputEmail  = document.getElementById('emailTelefone');
  var inputSenha  = document.getElementById('senha');

  if (!formLogin) return;

  // Sobrescrever o submit para usar a API real
  formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var email = inputEmail ? inputEmail.value.trim() : '';
    var senha = inputSenha ? inputSenha.value : '';

    if (!email || !senha) return;

    // Mostrar loading
    if (textoEntrar) textoEntrar.style.display = 'none';
    if (spinnerEntrar) spinnerEntrar.style.display = 'block';
    if (btnEntrar) btnEntrar.disabled = true;

    var r = await API.login(email, senha);

    if (textoEntrar) textoEntrar.style.display = 'block';
    if (spinnerEntrar) spinnerEntrar.style.display = 'none';
    if (btnEntrar) btnEntrar.disabled = false;

    if (r.sucesso) {
      UI.toast('✓ Bem-vindo de volta, ' + r.dados.utilizador.nome + '!', 'sucesso');
      setTimeout(function () {
        var user = API.getUser();
        if (user && user.tipo === 'admin') {
          window.location.href = 'painel_admin.html';
        } else if (user && user.tipo === 'vendedor') {
          window.location.href = 'painel_cliente.html';
        } else {
          window.location.href = 'home.html';
        }
      }, 1500);
    } else {
      UI.toast(r.mensagem, 'erro');
    }
  }, true); // true = capture phase, run before existing listeners
});
