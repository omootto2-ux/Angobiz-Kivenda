/**
 * AngoBiz Kivenda — Patch API para Suporte / Denúncias / Feedback
 */
document.addEventListener('DOMContentLoaded', function () {
  // Formulário de suporte/contacto
  var formSup = document.getElementById('formSuporte') || document.getElementById('formContato');
  if (formSup) {
    formSup.addEventListener('submit', async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var btn = formSup.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'A enviar...'; }

      var dados = {
        nome:     document.getElementById('nomeContato')?.value || document.getElementById('nome')?.value || '',
        email:    document.getElementById('emailContato')?.value || document.getElementById('email')?.value || '',
        assunto:  document.getElementById('assunto')?.value || '',
        mensagem: document.getElementById('mensagem')?.value || document.getElementById('descricao')?.value || '',
        tipo:     document.querySelector('select[name="tipo"]')?.value || 'suporte',
      };

      var r = await API.enviarFeedback(dados);
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }
      UI.toast(r.mensagem, r.sucesso ? 'sucesso' : 'erro');
      if (r.sucesso) formSup.reset();
    }, true);
  }

  // Formulário de denúncia
  var formDen = document.getElementById('formDenuncia');
  if (formDen) {
    formDen.addEventListener('submit', async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var btn = formDen.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'A enviar...'; }

      var dados = {
        tipo:     document.querySelector('select[name="tipo"]')?.value || 'outro',
        motivo:   document.querySelector('select[name="motivo"]')?.value || 'outro',
        descricao: document.getElementById('descricao')?.value || document.getElementById('mensagem')?.value || '',
        nome:     document.getElementById('nome')?.value || '',
        email:    document.getElementById('email')?.value || '',
      };

      var r = await API.enviarDenuncia(dados);
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar Denúncia'; }
      UI.toast(r.mensagem, r.sucesso ? 'sucesso' : 'erro');
      if (r.sucesso) formDen.reset();
    }, true);
  }
});
