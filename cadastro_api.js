/**
 * AngoBiz Kivenda — Patch API para Cadastro
 */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('formRegisto');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var nome     = document.getElementById('nomeCompleto')?.value?.trim() || '';
    var email    = document.getElementById('email')?.value?.trim() || '';
    var telefone = document.getElementById('telefone')?.value?.trim() || '';
    var senha    = document.getElementById('senha')?.value || '';
    var tipo     = document.querySelector('input[name="tipoConta"]:checked')?.value || 'cliente';

    var btn = document.getElementById('btnCriar');
    if (btn) { btn.disabled = true; btn.textContent = 'A criar conta...'; }

    var r = await API.registar({ nome, email, telefone, senha, tipo });

    if (btn) { btn.disabled = false; btn.textContent = 'Criar Conta'; }

    if (r.sucesso) {
      UI.toast('✓ Conta criada! Verifique o seu email para activar.', 'sucesso', 5000);
      setTimeout(() => { window.location.href = 'login.html'; }, 3000);
    } else {
      UI.toast(r.mensagem, 'erro');
    }
  }, true);
});
