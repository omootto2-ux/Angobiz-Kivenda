/**
 * ANGOBIZ KIVENDA — Login Page
 */
document.addEventListener('DOMContentLoaded', () => {
  /* Se já logado, redirecionar */
  if (Sessao.logado()) {
    const u = Sessao.get();
    const next = new URLSearchParams(window.location.search).get('next');
    window.location.href = next || (u.tipo==='admin' ? 'painel_admin.html' : u.tipo==='vendedor' ? 'painel_cliente.html' : 'home.html');
    return;
  }

  const form = document.getElementById('formLogin');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = (document.getElementById('emailTelefone') || document.getElementById('email'))?.value?.trim() || '';
    const senha = document.getElementById('senha')?.value || '';
    const btn   = document.getElementById('btnEntrar') || form.querySelector('button[type="submit"]');
    const txt   = document.getElementById('textoEntrar');
    const spin  = document.getElementById('spinnerEntrar');

    if (!email || !senha) { Toast.aviso('Preencha todos os campos.'); return; }

    if (txt)  txt.style.display  = 'none';
    if (spin) spin.style.display = 'block';
    if (btn)  btn.disabled = true;

    setTimeout(() => {
      const r = Sessao.login(email, senha);
      if (txt)  txt.style.display  = 'block';
      if (spin) spin.style.display = 'none';
      if (btn)  btn.disabled = false;

      if (r.ok) {
        Toast.ok('✓ Bem-vindo, ' + r.utilizador.nome.split(' ')[0] + '!');
        const next = new URLSearchParams(window.location.search).get('next');
        setTimeout(() => {
          if (next) { window.location.href = next; return; }
          const u = r.utilizador;
          window.location.href = u.tipo==='admin' ? 'painel_admin.html' : u.tipo==='vendedor' ? 'painel_cliente.html' : 'home.html';
        }, 1000);
      } else {
        Toast.erro(r.msg);
        const caixa = document.querySelector('.login-direita,.login-box,.form-caixa');
        if (caixa) { caixa.style.animation='shake .4s'; setTimeout(()=>caixa.style.animation='',500); }
      }
    }, 700);
  });
});
