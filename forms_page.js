/**
 * ANGOBIZ KIVENDA — Formulários genéricos (suporte, denúncias, feedback, parceria)
 */
document.addEventListener('DOMContentLoaded', () => {

  /* SUPORTE / CONTACTO */
  ['formSuporte','formContato','formContacto'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      const nome     = form.querySelector('[id*="nome"],[name="nome"]')?.value?.trim()||'';
      const email    = form.querySelector('[id*="email"],[name="email"]')?.value?.trim()||'';
      const mensagem = form.querySelector('textarea,[id*="mensagem"]')?.value?.trim()||'';
      if (!nome||!email||!mensagem) { Toast.aviso('Preencha todos os campos.'); return; }
      const btn = form.querySelector('button[type="submit"],.btn-enviar');
      if (btn) { btn.disabled=true; btn.textContent='A enviar...'; }
      setTimeout(() => {
        if (btn) { btn.disabled=false; btn.textContent='ENVIAR MENSAGEM'; }
        Toast.ok('✓ Mensagem enviada! Responderemos em breve.');
        form.reset();
      }, 900);
    }, true);
  });

  /* DENÚNCIA */
  ['formDenuncia','formDenunciar'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      const desc = form.querySelector('textarea,[id*="descricao"]')?.value?.trim()||'';
      if (desc.length < 20) { Toast.aviso('Descreva com pelo menos 20 caracteres.'); return; }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled=true; btn.textContent='A enviar...'; }
      setTimeout(() => {
        if (btn) { btn.disabled=false; btn.textContent='ENVIAR DENÚNCIA'; }
        Toast.ok('✓ Denúncia registada. Analisaremos em breve.'); form.reset();
      }, 900);
    }, true);
  });

  /* FEEDBACK */
  ['formFeedback','formAvaliacao'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled=true; btn.textContent='A enviar...'; }
      setTimeout(() => {
        if (btn) { btn.disabled=false; btn.textContent='ENVIAR'; }
        Toast.ok('✓ Obrigado pelo feedback!'); form.reset();
      }, 700);
    }, true);
  });

  /* PARCERIA */
  ['formParceria'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled=true; btn.textContent='A enviar...'; }
      setTimeout(() => {
        if (btn) { btn.disabled=false; btn.textContent='ENVIAR PROPOSTA'; }
        Toast.ok('✓ Proposta de parceria recebida! Entraremos em contacto.'); form.reset();
      }, 900);
    }, true);
  });

  /* CADASTRO VENDEDOR */
  ['formVendedor','formCadastroVendedor'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      const nome  = form.querySelector('[id*="nome"],[name="nome"]')?.value?.trim()||'';
      const email = form.querySelector('[id*="email"],[name="email"]')?.value?.trim()||'';
      if (!nome||!email) { Toast.aviso('Preencha os campos obrigatórios.'); return; }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled=true; btn.textContent='A registar...'; }
      setTimeout(() => {
        Toast.ok('✓ Candidatura de vendedor enviada! Entraremos em contacto.');
        setTimeout(() => window.location.href='login.html', 2000);
      }, 1000);
    }, true);
  });

  /* CONTRATAR SERVIÇO */
  ['formContratar'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (!Sessao.logado()) {
        Toast.aviso('Precisa de entrar na conta para contratar.');
        setTimeout(() => window.location.href='login.html?next='+encodeURIComponent(window.location.href), 1200);
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled=true; btn.textContent='A processar...'; }
      setTimeout(() => {
        if (btn) { btn.disabled=false; btn.textContent='CONTRATAR'; }
        Toast.ok('✓ Pedido de serviço enviado ao prestador!'); form.reset();
      }, 1000);
    }, true);
  });
});
