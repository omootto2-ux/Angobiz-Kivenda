/* =========================================
   ANGOBIZ KIVENDA – BLOG – JAVASCRIPT
   Funcionalidades: paginação, pesquisa,
   filtro por categoria, newsletter
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. DADOS DOS ARTIGOS (todas as páginas)
  ───────────────────────────────────────── */
  var todosArtigos = [
    {
      tag: 'negocios', tagNome: 'NEGÓCIOS',
      data: '20 de Maio, 2024',
      titulo: 'Como impulsionar o seu negócio com soluções digitais',
      resumo: 'Descubra como a digitalização pode levar o seu negócio para o próximo nível e aumentar os seus resultados.',
      imagem: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80'
    },
    {
      tag: 'inovacao', tagNome: 'INOVAÇÃO',
      data: '15 de Maio, 2024',
      titulo: 'Inovação: o motor do crescimento empresarial',
      resumo: 'A inovação é essencial para manter a competitividade no mercado atual. Entenda porquê.',
      imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'
    },
    {
      tag: 'dicas', tagNome: 'DICAS',
      data: '10 de Maio, 2024',
      titulo: '5 dicas de gestão financeira para pequenas empresas',
      resumo: 'Aprenda a gerir melhor as finanças da sua empresa e garanta um futuro sustentável.',
      imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
    },
    {
      tag: 'tendencias', tagNome: 'TENDÊNCIAS',
      data: '05 de Maio, 2024',
      titulo: 'Tendências de consumo em Angola para 2024',
      resumo: 'Conheça as principais mudanças no comportamento do consumidor angolano.',
      imagem: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80'
    },
    {
      tag: 'tecnologia', tagNome: 'TECNOLOGIA',
      data: '01 de Maio, 2024',
      titulo: 'Tecnologia e transformação empresarial em Angola',
      resumo: 'Como as empresas angolanas estão adoptando ferramentas digitais para crescer.',
      imagem: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80'
    },
    {
      tag: 'negocios', tagNome: 'NEGÓCIOS',
      data: '28 de Abril, 2024',
      titulo: 'Como criar um plano de negócios eficaz',
      resumo: 'Um bom plano de negócios é o primeiro passo para o sucesso empresarial.',
      imagem: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80'
    },
    {
      tag: 'dicas', tagNome: 'DICAS',
      data: '22 de Abril, 2024',
      titulo: 'Marketing digital para pequenas empresas',
      resumo: 'Estratégias simples e eficazes para promover o seu negócio online.',
      imagem: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80'
    },
    {
      tag: 'inovacao', tagNome: 'INOVAÇÃO',
      data: '18 de Abril, 2024',
      titulo: 'Startups angolanas que estão a mudar o mercado',
      resumo: 'Conheça as startups mais promissoras que estão a transformar Angola.',
      imagem: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80'
    }
  ];

  var artigosPorPagina = 4;
  var paginaActual = 1;
  var artigosFiltrados = todosArtigos.slice();

  /* ─────────────────────────────────────────
     2. RENDERIZAR ARTIGOS
  ───────────────────────────────────────── */
  function renderizarArtigos(artigos, pagina) {
    var grelha = document.getElementById('grelhaArtigos');
    if (!grelha) return;

    var inicio = (pagina - 1) * artigosPorPagina;
    var fim = inicio + artigosPorPagina;
    var artigosPagina = artigos.slice(inicio, fim);

    grelha.innerHTML = '';

    if (artigosPagina.length === 0) {
      grelha.innerHTML = '<p style="color:var(--cinza-texto);grid-column:1/-1;text-align:center;padding:40px 0;">Nenhum artigo encontrado.</p>';
      return;
    }

    artigosPagina.forEach(function (artigo) {
      var card = document.createElement('article');
      card.className = 'artigo-card';
      card.innerHTML =
        '<div class="artigo-img"><img src="' + artigo.imagem + '" alt="' + artigo.titulo + '" loading="lazy" /></div>' +
        '<div class="artigo-corpo">' +
          '<div class="artigo-meta">' +
            '<span class="artigo-tag ' + artigo.tag + '">' + artigo.tagNome + '</span>' +
            '<span class="artigo-data">' + artigo.data + '</span>' +
          '</div>' +
          '<h2 class="artigo-titulo">' + artigo.titulo + '</h2>' +
          '<p class="artigo-resumo">' + artigo.resumo + '</p>' +
          '<a href="#" class="artigo-ler">Ler mais <i class="fa fa-arrow-right"></i></a>' +
        '</div>';
      grelha.appendChild(card);
    });

    // Animação de entrada
    var cards = grelha.querySelectorAll('.artigo-card');
    cards.forEach(function (card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity .3s ease ' + (i * 0.07) + 's, transform .3s ease ' + (i * 0.07) + 's';
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 20);
    });
  }

  /* ─────────────────────────────────────────
     3. PAGINAÇÃO DINÂMICA
  ───────────────────────────────────────── */
  function renderizarPaginacao(totalArtigos) {
    var totalPaginas = Math.ceil(totalArtigos / artigosPorPagina);
    var paginacao = document.querySelector('.paginacao');
    if (!paginacao) return;

    paginacao.innerHTML = '';

    for (var i = 1; i <= totalPaginas; i++) {
      var btn = document.createElement('button');
      btn.className = 'pag-btn' + (i === paginaActual ? ' ativo' : '');
      btn.textContent = i;
      btn.dataset.pagina = i;
      paginacao.appendChild(btn);
    }

    // Botão próximo
    if (totalPaginas > 1) {
      var btnProx = document.createElement('button');
      btnProx.className = 'pag-btn pag-prox';
      btnProx.innerHTML = '<i class="fa fa-chevron-right"></i>';
      btnProx.addEventListener('click', function () {
        if (paginaActual < totalPaginas) {
          paginaActual++;
          actualizarPagina();
        }
      });
      paginacao.appendChild(btnProx);
    }

    // Eventos de clique nos botões numerados
    paginacao.querySelectorAll('.pag-btn:not(.pag-prox)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        paginaActual = parseInt(btn.dataset.pagina);
        actualizarPagina();
      });
    });
  }

  function actualizarPagina() {
    renderizarArtigos(artigosFiltrados, paginaActual);
    renderizarPaginacao(artigosFiltrados.length);
    window.scrollTo({ top: document.querySelector('.conteudo-principal').offsetTop - 20, behavior: 'smooth' });
  }

  /* ─────────────────────────────────────────
     4. FILTRO POR CATEGORIA (SIDEBAR)
  ───────────────────────────────────────── */
  var linksCategoria = document.querySelectorAll('.sidebar-categorias li a');

  linksCategoria.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var nomeCat = link.textContent.trim().split('(')[0].trim().toLowerCase();

      // Mapeamento nome → tag
      var mapa = {
        'negócios':         'negocios',
        'inovação':         'inovacao',
        'dicas':            'dicas',
        'tendências':       'tendencias',
        'tecnologia':       'tecnologia',
        'empreendedorismo': 'empreendedorismo'
      };

      var tagFiltro = mapa[nomeCat];

      if (tagFiltro) {
        artigosFiltrados = todosArtigos.filter(function (a) { return a.tag === tagFiltro; });
      } else {
        artigosFiltrados = todosArtigos.slice();
      }

      paginaActual = 1;
      actualizarPagina();

      // Estilo activo na sidebar
      linksCategoria.forEach(function (l) { l.style.color = ''; });
      link.style.color = 'var(--dourado)';
    });
  });

  /* ─────────────────────────────────────────
     5. PESQUISA NO BLOG
  ───────────────────────────────────────── */
  var inputPesquisa = document.querySelector('.pesquisa-input');
  var botaoPesquisa = document.querySelector('.pesquisa-btn');

  function pesquisar() {
    var termo = inputPesquisa.value.trim().toLowerCase();
    if (termo.length === 0) {
      artigosFiltrados = todosArtigos.slice();
    } else {
      artigosFiltrados = todosArtigos.filter(function (a) {
        return a.titulo.toLowerCase().includes(termo) ||
               a.resumo.toLowerCase().includes(termo) ||
               a.tagNome.toLowerCase().includes(termo);
      });
    }
    paginaActual = 1;
    actualizarPagina();
  }

  if (botaoPesquisa) {
    botaoPesquisa.addEventListener('click', pesquisar);
  }
  if (inputPesquisa) {
    inputPesquisa.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') pesquisar();
    });
  }

  /* ─────────────────────────────────────────
     6. NEWSLETTER
  ───────────────────────────────────────── */
  var formNewsletter = document.querySelector('.newsletter-form');
  var inputEmail = formNewsletter ? formNewsletter.querySelector('input') : null;
  var botaoNewsletter = formNewsletter ? formNewsletter.querySelector('button') : null;

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (botaoNewsletter) {
    botaoNewsletter.addEventListener('click', function () {
      var email = inputEmail.value.trim();
      if (!validarEmail(email)) {
        inputEmail.style.outline = '2px solid #cc0000';
        inputEmail.placeholder = 'Insira um e-mail válido!';
        setTimeout(function () {
          inputEmail.style.outline = '';
          inputEmail.placeholder = 'Seu melhor e-mail';
        }, 2500);
        return;
      }
      var textoOriginal = botaoNewsletter.textContent;
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

  /* ─────────────────────────────────────────
     7. NAVEGAÇÃO ACTIVA
  ───────────────────────────────────────── */
  var linksNav = document.querySelectorAll('.nav-links li');
  linksNav.forEach(function (item) {
    item.addEventListener('click', function () {
      linksNav.forEach(function (li) { li.classList.remove('ativo'); });
      item.classList.add('ativo');
    });
  });

  /* ─────────────────────────────────────────
     8. INICIALIZAR PÁGINA
  ───────────────────────────────────────── */
  renderizarArtigos(artigosFiltrados, paginaActual);
  renderizarPaginacao(artigosFiltrados.length);

});
