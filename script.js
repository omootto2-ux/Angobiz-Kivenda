/* =========================================
   ANGOBIZ KIVENDA – SCRIPT JAVASCRIPT
   Funcionalidades: carrinho, favoritos,
   navegação, newsletter, pesquisa
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. CARRINHO DE COMPRAS
  ───────────────────────────────────────── */
  let quantidadeCarrinho = 0;
  const badgeCarrinho = document.querySelector('.carrinho-badge,.cart-badge');
  const botoesCarrinho = document.querySelectorAll('.btn-carrinho');

  botoesCarrinho.forEach(function (botao) {
    botao.addEventListener('click', function () {
      quantidadeCarrinho++;
      badgeCarrinho.textContent = quantidadeCarrinho;

      // Animação de feedback no botão
      const textoOriginal = botao.innerHTML;
      botao.innerHTML = '<i class="fa fa-check"></i> ADICIONADO!';
      botao.style.background = '#28a745';
      botao.disabled = true;

      setTimeout(function () {
        botao.innerHTML = textoOriginal;
        botao.style.background = '';
        botao.disabled = false;
      }, 1500);
    });
  });


  
  /* ─────────────────────────────────────────
     2. BOTÃO DE FAVORITOS
  ───────────────────────────────────────── */
  const botoesFavorito = document.querySelectorAll('.produto-favorito');

  botoesFavorito.forEach(function (botao) {
    botao.addEventListener('click', function () {
      const icone = botao.querySelector('i');
      const ativo = icone.classList.toggle('fa-solid');

      if (ativo || icone.style.color === 'rgb(204, 0, 0)') {
        icone.style.color = '#cc0000';
        botao.title = 'Remover dos favoritos';
      } else {
        icone.style.color = '';
        botao.title = 'Adicionar aos favoritos';
      }
    });
  });

  /* ─────────────────────────────────────────
     3. PESQUISA
  ───────────────────────────────────────── */
  const inputPesquisa = document.querySelector('.pesquisa-input,#inputBusca');
  const botaoPesquisa = document.querySelector('.pesquisa-btn,.busca-btn');

  function realizarPesquisa() {
    const termo = inputPesquisa.value.trim();
    if (termo.length > 0) {
      // Em produção, redireciona para página de resultados
      console.log('Pesquisar por:', termo);
      // window.location.href = '/loja?q=' + encodeURIComponent(termo);
      inputPesquisa.style.borderColor = '#c9a227';
    }
  }

  if(botaoPesquisa) botaoPesquisa.addEventListener('click', realizarPesquisa);

  if(inputPesquisa) inputPesquisa.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') realizarPesquisa();
  });

  /* ─────────────────────────────────────────
     4. NEWSLETTER
  ───────────────────────────────────────── */
  const formNewsletter = document.querySelector('.newsletter-form');
  const inputEmail = formNewsletter ? formNewsletter.querySelector('input') : null;
  const botaoNewsletter = formNewsletter ? formNewsletter.querySelector('button') : null;

  if (botaoNewsletter) {
    botaoNewsletter.addEventListener('click', function () {
      const email = inputEmail.value.trim();

      if (email === '' || !validarEmail(email)) {
        inputEmail.style.outline = '2px solid #cc0000';
        inputEmail.placeholder = 'Insira um e-mail válido!';
        setTimeout(function () {
          inputEmail.style.outline = '';
          inputEmail.placeholder = 'Seu melhor e-mail';
        }, 2500);
        return;
      }

      // Sucesso
      const textoOriginal = botaoNewsletter.textContent;
      botaoNewsletter.textContent = '✓ SUBSCRITO!';
      botaoNewsletter.style.background = '#28a745';
      botaoNewsletter.disabled = true;
      inputEmail.disabled = true;
      inputEmail.value = '';
      inputEmail.placeholder = 'Subscrito com sucesso!';

      setTimeout(function () {
        botaoNewsletter.textContent = textoOriginal;
        botaoNewsletter.style.background = '';
        botaoNewsletter.disabled = false;
        inputEmail.disabled = false;
        inputEmail.placeholder = 'Seu melhor e-mail';
      }, 4000);
    });
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /* ─────────────────────────────────────────
     5. NAVEGAÇÃO ACTIVA
  ───────────────────────────────────────── */
  const linksNav = document.querySelectorAll('.nav-links li');

  linksNav.forEach(function (item) {
    item.addEventListener('click', function () {
      linksNav.forEach(function (li) { li.classList.remove('ativo'); });
      item.classList.add('ativo');
    });
  });

  /* ─────────────────────────────────────────
     6. BOTÃO COMPRAR AGORA – SCROLL SUAVE
  ───────────────────────────────────────── */
  const btnComprar = document.querySelector('.btn-principal');

  if (btnComprar) {
    btnComprar.addEventListener('click', function (e) {
      e.preventDefault();
      const secaoProdutos = document.querySelector('.produtos-destaque');
      if (secaoProdutos) {
        secaoProdutos.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ─────────────────────────────────────────
     7. ANIMAÇÃO DE ENTRADA DOS CARDS
  ───────────────────────────────────────── */
  const cards = document.querySelectorAll('.produto-card, .categoria-item, .diferencial-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = '1';
          entrada.target.style.transform = 'translateY(0)';
          observer.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (card, indice) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease ' + (indice * 0.06) + 's, transform 0.4s ease ' + (indice * 0.06) + 's';
      observer.observe(card);
    });
  }

  /* ─────────────────────────────────────────
     8. LINKS DE CATEGORIAS
  ───────────────────────────────────────── */
  const linksCategoria = document.querySelectorAll('.categoria-item');

  linksCategoria.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const nome = link.querySelector('strong').textContent;
      console.log('Categoria seleccionada:', nome);
      // Em produção: window.location.href = '/loja?categoria=' + encodeURIComponent(nome);
    });
  });

});
