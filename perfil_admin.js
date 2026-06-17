/* =========================================
   ANGOBIZ KIVENDA – PERFIL ADMINISTRADOR
   JavaScript completo e funcional
   Funcionalidades:
   - Navegação SPA entre páginas
   - Gráficos mini (Canvas)
   - Notificações em tempo real
   - Dropdown avatar
   - Tema claro/escuro
   - Modais (editar perfil, segurança, status)
   - Tabelas dinâmicas (usuários, vendedores, produtos, pedidos)
   - Filtros de tabela em tempo real
   - Contadores animados
   - Toast de feedback
   - Aprovações pendentes
   - Atividades recentes
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. DADOS DA APLICAÇÃO
  ───────────────────────────────────────── */
  var dados = {

    notificacoes: [
      { tipo: 'verm',   icone: 'fa-user-plus',    titulo: 'Novo vendedor registrado',  desc: 'Loja Tech Angola',           hora: 'Hoje, 14:25', lida: false },
      { tipo: 'dour',   icone: 'fa-box',           titulo: 'Novo produto publicado',    desc: 'Smartphone Samsung Galaxy S24', hora: 'Hoje, 13:48', lida: false },
      { tipo: 'azul',   icone: 'fa-shopping-cart', titulo: 'Novo pedido realizado',     desc: 'Pedido #ABK-2025-5312',      hora: 'Hoje, 12:30', lida: false },
      { tipo: 'verd',   icone: 'fa-money-bill',    titulo: 'Pagamento recebido',        desc: 'Valor de 125.000 Kz',        hora: 'Hoje, 11:15', lida: false },
      { tipo: 'amar',   icone: 'fa-star',          titulo: 'Avaliação recebida',        desc: 'Loja Fashion Style – 5 ★',   hora: 'Hoje, 10:05', lida: false },
      { tipo: 'azul',   icone: 'fa-shield-alt',    titulo: 'Alerta de segurança',       desc: 'Login de novo dispositivo',  hora: 'Ontem',       lida: true  },
    ],

    atividades: [
      { tipo: 'verm', icone: 'fa-user-plus',    titulo: 'Novo vendedor registrado',   desc: 'Loja Tech Angola cadastrou-se na plataforma',   hora: 'Hoje, 14:25' },
      { tipo: 'dour', icone: 'fa-box',          titulo: 'Novo produto publicado',     desc: 'Smartphone Samsung Galaxy S24',                 hora: 'Hoje, 13:48' },
      { tipo: 'azul', icone: 'fa-shopping-cart',titulo: 'Novo pedido realizado',      desc: 'Pedido #ABK-2025-5312',                         hora: 'Hoje, 12:30' },
      { tipo: 'verd', icone: 'fa-money-bill',   titulo: 'Pagamento recebido',         desc: 'Valor de 125.000 Kz',                           hora: 'Hoje, 11:15' },
      { tipo: 'amar', icone: 'fa-star',         titulo: 'Avaliação recebida',         desc: 'Loja Fashion Style recebeu uma avaliação 5 estrelas', hora: 'Hoje, 10:05' },
    ],

    aprovacoes: [
      { tipo: 'verm', icone: 'fa-user-tie',  nome: 'Vendedores',   qtd: 8,  label: 'pendentes' },
      { tipo: 'dour', icone: 'fa-box',       nome: 'Produtos',     qtd: 23, label: 'pendentes' },
      { tipo: 'azul', icone: 'fa-tools',     nome: 'Serviços',     qtd: 5,  label: 'pendentes' },
      { tipo: 'roxo', icone: 'fa-file-alt',  nome: 'Documentos',   qtd: 12, label: 'pendentes' },
    ],

    usuarios: [
      { id: '#USR-001', nome: 'Ana Costa',     email: 'ana@email.com',    tipo: 'Comprador',  status: 'ativo',     cadastro: '10/01/2024' },
      { id: '#USR-002', nome: 'João Silva',    email: 'joao@email.com',   tipo: 'Vendedor',   status: 'ativo',     cadastro: '15/01/2024' },
      { id: '#USR-003', nome: 'Maria Luís',    email: 'maria@email.com',  tipo: 'Comprador',  status: 'inativo',   cadastro: '20/01/2024' },
      { id: '#USR-004', nome: 'Carlos Neto',   email: 'carlos@email.com', tipo: 'Vendedor',   status: 'suspenso',  cadastro: '25/01/2024' },
      { id: '#USR-005', nome: 'Rosa Ferreira', email: 'rosa@email.com',   tipo: 'Comprador',  status: 'ativo',     cadastro: '01/02/2024' },
      { id: '#USR-006', nome: 'Tiago Alves',   email: 'tiago@email.com',  tipo: 'Vendedor',   status: 'ativo',     cadastro: '05/02/2024' },
      { id: '#USR-007', nome: 'Luísa Mendes',  email: 'luisa@email.com',  tipo: 'Comprador',  status: 'ativo',     cadastro: '10/02/2024' },
      { id: '#USR-008', nome: 'Pedro Lopes',   email: 'pedro@email.com',  tipo: 'Vendedor',   status: 'inativo',   cadastro: '15/02/2024' },
    ],

    vendedores: [
      { id: '#VND-001', nome: 'Loja Tech Angola',    categoria: 'Eletrónicos',  produtos: 145, status: 'verificado', receita: '4.500.000 Kz' },
      { id: '#VND-002', nome: 'Fashion Style',       categoria: 'Vestuário',    produtos: 89,  status: 'verificado', receita: '2.100.000 Kz' },
      { id: '#VND-003', nome: 'Mercearia Central',   categoria: 'Alimentação',  produtos: 312, status: 'pendente',   receita: '890.000 Kz'   },
      { id: '#VND-004', nome: 'Auto Peças Angola',   categoria: 'Automóvel',    produtos: 67,  status: 'verificado', receita: '1.750.000 Kz' },
      { id: '#VND-005', nome: 'Casa & Estilo',       categoria: 'Decoração',    produtos: 203, status: 'pendente',   receita: '320.000 Kz'   },
    ],

    produtos: [
      { id: '#PRD-001', nome: 'Samsung Galaxy S24',      categoria: 'Eletrónicos', vendedor: 'Loja Tech Angola',  preco: '675.000 Kz', status: 'ativo',   vendas: 45  },
      { id: '#PRD-002', nome: 'Vestido Casual Estampado', categoria: 'Vestuário',   vendedor: 'Fashion Style',     preco: '45.000 Kz',  status: 'ativo',   vendas: 112 },
      { id: '#PRD-003', nome: 'Laptop Dell Inspiron 15', categoria: 'Eletrónicos', vendedor: 'Loja Tech Angola',  preco: '450.000 Kz', status: 'inativo', vendas: 18  },
      { id: '#PRD-004', nome: 'Óleo de Motor 5W-30',     categoria: 'Automóvel',   vendedor: 'Auto Peças Angola', preco: '8.500 Kz',   status: 'ativo',   vendas: 234 },
      { id: '#PRD-005', nome: 'Sofá 3 Lugares',          categoria: 'Decoração',   vendedor: 'Casa & Estilo',     preco: '180.000 Kz', status: 'pendente',vendas: 0   },
    ],

    pedidos: [
      { id: '#ABK-2025-5312', cliente: 'Ana Costa',    valor: '125.000 Kz', data: '18/05/2025', status: 'entregue'   },
      { id: '#ABK-2025-5311', cliente: 'João Silva',   valor: '67.500 Kz',  data: '18/05/2025', status: 'pendente'   },
      { id: '#ABK-2025-5310', cliente: 'Maria Luís',   valor: '450.000 Kz', data: '17/05/2025', status: 'entregue'   },
      { id: '#ABK-2025-5309', cliente: 'Carlos Neto',  valor: '89.000 Kz',  data: '17/05/2025', status: 'cancelado'  },
      { id: '#ABK-2025-5308', cliente: 'Rosa Ferreira',valor: '320.000 Kz', data: '16/05/2025', status: 'entregue'   },
      { id: '#ABK-2025-5307', cliente: 'Tiago Alves',  valor: '156.000 Kz', data: '16/05/2025', status: 'pendente'   },
    ],
  };

  /* ─────────────────────────────────────────
     2. NAVEGAÇÃO ENTRE PÁGINAS (SPA)
  ───────────────────────────────────────── */
  var mapaTitulos = {
    painel:         { titulo: 'Painel Geral',                subtitulo: 'Visão geral completa da plataforma' },
    usuarios:       { titulo: 'Usuários',                    subtitulo: 'Gerencie todos os utilizadores da plataforma' },
    vendedores:     { titulo: 'Vendedores',                  subtitulo: 'Gerencie os vendedores registados' },
    produtos:       { titulo: 'Produtos',                    subtitulo: 'Gerencie o catálogo de produtos' },
    servicos:       { titulo: 'Serviços',                    subtitulo: 'Gerencie os serviços disponíveis' },
    pedidos:        { titulo: 'Pedidos',                     subtitulo: 'Todos os pedidos da plataforma' },
    transacoes:     { titulo: 'Transações',                  subtitulo: 'Histórico de transações financeiras' },
    financeiro:     { titulo: 'Financeiro',                  subtitulo: 'Relatórios e gestão financeira' },
    relatorios:     { titulo: 'Relatórios',                  subtitulo: 'Análises e relatórios detalhados' },
    avaliacoes:     { titulo: 'Avaliações',                  subtitulo: 'Avaliações de produtos e vendedores' },
    disputas:       { titulo: 'Disputas',                    subtitulo: 'Resolução de conflitos' },
    promocoes:      { titulo: 'Promoções',                   subtitulo: 'Cupons e promoções da plataforma' },
    notificacoes:   { titulo: 'Notificações',                subtitulo: 'Central de notificações do sistema' },
    configuracoes:  { titulo: 'Configurações',               subtitulo: 'Configurações gerais da plataforma' },
    perfil:         { titulo: 'Meu Perfil (Administrador)',  subtitulo: 'Gerencie sua conta e configurações da plataforma' },
  };

  function navegar(pagina) {
    /* Itens sidebar */
    document.querySelectorAll('.nav-item').forEach(function (li) {
      li.classList.remove('ativo');
    });
    var item = document.querySelector('.nav-item[data-pagina="' + pagina + '"]');
    if (item) item.classList.add('ativo');

    /* Páginas */
    document.querySelectorAll('.pagina').forEach(function (p) {
      p.classList.remove('ativa');
    });
    var idPag = 'pagina' + pagina.charAt(0).toUpperCase() + pagina.slice(1);
    var el = document.getElementById(idPag);
    if (el) el.classList.add('ativa');

    /* Títulos */
    var meta = mapaTitulos[pagina];
    if (meta) {
      document.getElementById('tituloPagina').textContent    = meta.titulo;
      document.getElementById('subtituloPagina').textContent = meta.subtitulo;
    }

    /* Fechar sidebar mobile */
    document.getElementById('sidebar').classList.remove('aberta');
  }

  /* Eventos sidebar */
  document.querySelectorAll('.nav-item').forEach(function (li) {
    li.addEventListener('click', function (e) {
      e.preventDefault();
      navegar(li.dataset.pagina);
    });
  });

  /* Links data-pagina em todo o documento */
  document.addEventListener('click', function (e) {
    var alvo = e.target.closest('[data-pagina]');
    if (alvo && !alvo.classList.contains('nav-item') && !alvo.classList.contains('modal-overlay')) {
      e.preventDefault();
      navegar(alvo.dataset.pagina);
    }
  });

  /* ─────────────────────────────────────────
     3. DROPDOWN DO AVATAR
  ───────────────────────────────────────── */
  var avatarWrapper  = document.getElementById('avatarWrapper');
  var avatarDropdown = document.getElementById('avatarDropdown');

  avatarWrapper.addEventListener('click', function (e) {
    e.stopPropagation();
    avatarDropdown.classList.toggle('visivel');
    avatarWrapper.classList.toggle('aberto');
    document.getElementById('notifPainel').classList.remove('visivel');
  });

  document.addEventListener('click', function () {
    avatarDropdown.classList.remove('visivel');
    avatarWrapper.classList.remove('aberto');
  });

  avatarDropdown.addEventListener('click', function (e) { e.stopPropagation(); });

  /* ─────────────────────────────────────────
     4. NOTIFICAÇÕES
  ───────────────────────────────────────── */
  var notifPainel = document.getElementById('notifPainel');
  var badgeNotif  = document.getElementById('badgeNotif');

  function renderizarNotificacoes() {
    var lista = document.getElementById('npLista');
    lista.innerHTML = '';
    dados.notificacoes.forEach(function (n, i) {
      var div = document.createElement('div');
      div.className = 'np-item' + (n.lida ? ' lida' : '');
      div.innerHTML =
        '<div class="np-icone ' + n.tipo + '"><i class="fa ' + n.icone + '"></i></div>' +
        '<div class="np-texto"><strong>' + n.titulo + '</strong><span>' + n.desc + ' · ' + n.hora + '</span></div>' +
        (!n.lida ? '<div class="np-ponto"></div>' : '');
      div.addEventListener('click', function () {
        dados.notificacoes[i].lida = true;
        renderizarNotificacoes();
        actualizarBadge();
      });
      lista.appendChild(div);
    });
  }

  function actualizarBadge() {
    var nLidas = dados.notificacoes.filter(function (n) { return !n.lida; }).length;
    badgeNotif.textContent = nLidas;
    badgeNotif.style.display = nLidas > 0 ? 'flex' : 'none';
  }

  document.getElementById('btnNotif').addEventListener('click', function (e) {
    e.stopPropagation();
    notifPainel.classList.toggle('visivel');
    avatarDropdown.classList.remove('visivel');
    avatarWrapper.classList.remove('aberto');
  });

  document.addEventListener('click', function () { notifPainel.classList.remove('visivel'); });
  notifPainel.addEventListener('click', function (e) { e.stopPropagation(); });

  document.getElementById('btnMarcarLidas').addEventListener('click', function () {
    dados.notificacoes.forEach(function (n) { n.lida = true; });
    renderizarNotificacoes();
    actualizarBadge();
    mostrarToast('Todas as notificações marcadas como lidas.', 'sucesso');
  });

  /* ─────────────────────────────────────────
     5. TEMA CLARO / ESCURO
  ───────────────────────────────────────── */
  var temaEscuro = true;

  document.getElementById('btnTema').addEventListener('click', function () {
    temaEscuro = !temaEscuro;
    document.body.classList.toggle('tema-claro', !temaEscuro);
    document.getElementById('iconeTema').className = temaEscuro ? 'fa fa-moon' : 'fa fa-sun';
    mostrarToast('Tema ' + (temaEscuro ? 'escuro' : 'claro') + ' activado.', 'aviso');
  });

  /* ─────────────────────────────────────────
     6. MINI GRÁFICOS (Canvas)
  ───────────────────────────────────────── */
  var configGraficos = {
    canvasUsuarios:  { cor: '#cc0000',  vals: [80,120,100,180,140,200,170,220,180,240,210,280,248] },
    canvasVendedores:{ cor: '#c9a227',  vals: [10,18,14,22,20,28,24,32,28,36,30,40,35]             },
    canvasPedidos:   { cor: '#1db954',  vals: [120,180,150,240,200,280,250,320,270,360,310,400,380] },
    canvasTransacoes:{ cor: '#2979ff',  vals: [500,700,600,900,800,1100,950,1300,1100,1500,1300,1700,1600] },
  };

  function desenharMiniCanvas(id, cor, vals) {
    var canvas = document.getElementById(id);
    if (!canvas) return;
    var ctx  = canvas.getContext('2d');
    var W    = canvas.parentElement.clientWidth || 180;
    var H    = 50;
    canvas.width  = W;
    canvas.height = H;

    var max   = Math.max.apply(null, vals) * 1.1;
    var n     = vals.length;
    var passo = W / (n - 1);
    var pts   = vals.map(function (v, i) {
      return { x: i * passo, y: H - (v / max) * H * 0.9 - 2 };
    });

    /* Gradiente */
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   hexRgba(cor, 0.35));
    grad.addColorStop(1,   hexRgba(cor, 0));

    /* Área */
    ctx.beginPath();
    ctx.moveTo(pts[0].x, H);
    ctx.lineTo(pts[0].x, pts[0].y);
    for (var i = 1; i < pts.length; i++) {
      var cx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.lineTo(pts[pts.length-1].x, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    /* Linha */
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (var j = 1; j < pts.length; j++) {
      var cx2 = (pts[j-1].x + pts[j].x) / 2;
      ctx.bezierCurveTo(cx2, pts[j-1].y, cx2, pts[j].y, pts[j].x, pts[j].y);
    }
    ctx.strokeStyle = cor;
    ctx.lineWidth   = 2;
    ctx.stroke();
  }

  function hexRgba(hex, alpha) {
    var r = parseInt(hex.slice(1,3),16);
    var g = parseInt(hex.slice(3,5),16);
    var b = parseInt(hex.slice(5,7),16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function desenharTodosGraficos() {
    Object.keys(configGraficos).forEach(function (id) {
      var cfg = configGraficos[id];
      desenharMiniCanvas(id, cfg.cor, cfg.vals);
    });
  }

  setTimeout(desenharTodosGraficos, 200);
  window.addEventListener('resize', desenharTodosGraficos);

  /* Período do select */
  document.getElementById('selectPeriodo').addEventListener('change', function () {
    /* Embaralhar valores para simular actualização */
    Object.keys(configGraficos).forEach(function (id) {
      var cfg = configGraficos[id];
      cfg.vals = cfg.vals.map(function (v) { return Math.round(v * (0.8 + Math.random() * 0.4)); });
    });
    desenharTodosGraficos();
    mostrarToast('Dados actualizados para o período seleccionado.', 'aviso');
  });

  /* ─────────────────────────────────────────
     7. ATIVIDADES RECENTES
  ───────────────────────────────────────── */
  function renderizarAtividades() {
    var lista = document.getElementById('ativLista');
    if (!lista) return;
    lista.innerHTML = '';
    dados.atividades.forEach(function (a) {
      var div = document.createElement('div');
      div.className = 'ativ-item';
      div.innerHTML =
        '<div class="ativ-icone ' + a.tipo + '"><i class="fa ' + a.icone + '"></i></div>' +
        '<div class="ativ-info">' +
          '<div class="ativ-titulo">' + a.titulo + '</div>' +
          '<div class="ativ-desc">' + a.desc + '</div>' +
        '</div>' +
        '<div class="ativ-hora">' + a.hora + '</div>';
      lista.appendChild(div);
    });
  }

  document.getElementById('btnVerAtiv').addEventListener('click', function () {
    mostrarToast('A carregar todas as atividades...', 'aviso');
  });

  /* ─────────────────────────────────────────
     8. APROVAÇÕES PENDENTES
  ───────────────────────────────────────── */
  function renderizarAprovacoes() {
    var lista = document.getElementById('aprovLista');
    if (!lista) return;
    lista.innerHTML = '';
    dados.aprovacoes.forEach(function (a, i) {
      var div = document.createElement('div');
      div.className = 'aprov-item';
      div.innerHTML =
        '<div class="aprov-icone ' + a.tipo + '"><i class="fa ' + a.icone + '"></i></div>' +
        '<div class="aprov-info">' +
          '<strong>' + a.nome + '</strong>' +
          '<span>' + a.qtd + ' ' + a.label + '</span>' +
        '</div>' +
        '<button class="btn-rever" data-idx="' + i + '">Rever</button>';
      lista.appendChild(div);
    });

    /* Eventos dos botões Rever */
    lista.querySelectorAll('.btn-rever').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx  = parseInt(btn.dataset.idx);
        var item = dados.aprovacoes[idx];
        mostrarToast('A abrir revisão de ' + item.nome + '...', 'aviso');
      });
    });
  }

  /* ─────────────────────────────────────────
     9. TABELAS DINÂMICAS
  ───────────────────────────────────────── */

  /* USUÁRIOS */
  function renderizarTabelaUsuarios(lista) {
    var tabela = document.getElementById('tabelaUsuarios');
    if (!tabela) return;
    var html = '<thead><tr><th>ID</th><th>NOME</th><th>E-MAIL</th><th>TIPO</th><th>STATUS</th><th>CADASTRO</th><th>ACÇÕES</th></tr></thead><tbody>';
    lista.forEach(function (u) {
      html += '<tr>' +
        '<td>' + u.id + '</td>' +
        '<td class="td-neg">' + u.nome + '</td>' +
        '<td>' + u.email + '</td>' +
        '<td>' + u.tipo + '</td>' +
        '<td><span class="status-badge sb-' + u.status + '">' + u.status.charAt(0).toUpperCase() + u.status.slice(1) + '</span></td>' +
        '<td>' + u.cadastro + '</td>' +
        '<td style="display:flex;gap:6px">' +
          '<button class="btn-tb btn-tb-edit" onclick="editarItem(\'usuario\',\'' + u.id + '\')"><i class="fa fa-pen"></i></button>' +
          '<button class="btn-tb btn-tb-del"  onclick="removerItem(\'usuario\',\'' + u.id + '\')"><i class="fa fa-trash"></i></button>' +
        '</td>' +
        '</tr>';
    });
    tabela.innerHTML = html + '</tbody>';
  }

  /* VENDEDORES */
  function renderizarTabelaVendedores(lista) {
    var tabela = document.getElementById('tabelaVendedores');
    if (!tabela) return;
    var html = '<thead><tr><th>ID</th><th>NOME</th><th>CATEGORIA</th><th>PRODUTOS</th><th>RECEITA</th><th>STATUS</th><th>ACÇÕES</th></tr></thead><tbody>';
    lista.forEach(function (v) {
      html += '<tr>' +
        '<td>' + v.id + '</td>' +
        '<td class="td-neg">' + v.nome + '</td>' +
        '<td>' + v.categoria + '</td>' +
        '<td>' + v.produtos + '</td>' +
        '<td class="td-neg" style="color:var(--dourado)">' + v.receita + '</td>' +
        '<td><span class="status-badge ' + (v.status === 'verificado' ? 'sb-ativo' : 'sb-pendente') + '">' + v.status.charAt(0).toUpperCase() + v.status.slice(1) + '</span></td>' +
        '<td style="display:flex;gap:6px">' +
          '<button class="btn-tb btn-tb-edit"><i class="fa fa-pen"></i></button>' +
          '<button class="btn-tb btn-tb-del"><i class="fa fa-ban"></i></button>' +
        '</td></tr>';
    });
    tabela.innerHTML = html + '</tbody>';
  }

  /* PRODUTOS */
  function renderizarTabelaProdutos(lista) {
    var tabela = document.getElementById('tabelaProdutos');
    if (!tabela) return;
    var html = '<thead><tr><th>ID</th><th>NOME</th><th>CATEGORIA</th><th>VENDEDOR</th><th>PREÇO</th><th>VENDAS</th><th>STATUS</th><th>ACÇÕES</th></tr></thead><tbody>';
    lista.forEach(function (p) {
      html += '<tr>' +
        '<td>' + p.id + '</td>' +
        '<td class="td-neg">' + p.nome + '</td>' +
        '<td>' + p.categoria + '</td>' +
        '<td>' + p.vendedor + '</td>' +
        '<td class="td-neg">' + p.preco + '</td>' +
        '<td>' + p.vendas + '</td>' +
        '<td><span class="status-badge sb-' + p.status + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></td>' +
        '<td style="display:flex;gap:6px">' +
          '<button class="btn-tb btn-tb-edit"><i class="fa fa-pen"></i></button>' +
          '<button class="btn-tb btn-tb-del"><i class="fa fa-trash"></i></button>' +
        '</td></tr>';
    });
    tabela.innerHTML = html + '</tbody>';
  }

  /* PEDIDOS */
  function renderizarTabelaPedidos(lista) {
    var tabela = document.getElementById('tabelaPedidos');
    if (!tabela) return;
    var html = '<thead><tr><th>ID</th><th>CLIENTE</th><th>VALOR</th><th>DATA</th><th>STATUS</th><th>ACÇÕES</th></tr></thead><tbody>';
    lista.forEach(function (p) {
      html += '<tr>' +
        '<td class="td-neg">' + p.id + '</td>' +
        '<td>' + p.cliente + '</td>' +
        '<td class="td-neg" style="color:var(--dourado)">' + p.valor + '</td>' +
        '<td>' + p.data + '</td>' +
        '<td><span class="status-badge sb-' + p.status + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></td>' +
        '<td><button class="btn-tb btn-tb-edit"><i class="fa fa-eye"></i> Ver</button></td>' +
        '</tr>';
    });
    tabela.innerHTML = html + '</tbody>';
  }

  /* Funções globais para botões inline */
  window.editarItem = function (tipo, id) { mostrarToast('Editar ' + tipo + ' ' + id + ' em breve.', 'aviso'); };
  window.removerItem = function (tipo, id) {
    if (tipo === 'usuario') {
      dados.usuarios = dados.usuarios.filter(function (u) { return u.id !== id; });
      renderizarTabelaUsuarios(dados.usuarios);
      mostrarToast('Utilizador ' + id + ' removido.', 'sucesso');
    }
  };

  /* ─────────────────────────────────────────
     10. FILTROS DAS TABELAS
  ───────────────────────────────────────── */
  var filtroUsuariosInput  = document.getElementById('filtroUsuarios');
  var filtroStatusUsuario  = document.getElementById('filtroStatusUsuario');

  function aplicarFiltroUsuarios() {
    var termo  = filtroUsuariosInput ? filtroUsuariosInput.value.toLowerCase() : '';
    var status = filtroStatusUsuario ? filtroStatusUsuario.value : '';
    var filtrado = dados.usuarios.filter(function (u) {
      var matchTermo  = u.nome.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo) || u.id.toLowerCase().includes(termo);
      var matchStatus = !status || u.status === status;
      return matchTermo && matchStatus;
    });
    renderizarTabelaUsuarios(filtrado);
  }

  if (filtroUsuariosInput)  filtroUsuariosInput.addEventListener('input', aplicarFiltroUsuarios);
  if (filtroStatusUsuario)  filtroStatusUsuario.addEventListener('change', aplicarFiltroUsuarios);

  /* ─────────────────────────────────────────
     11. MODAIS
  ───────────────────────────────────────── */
  function abrirModal(id) {
    document.getElementById(id).classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }
  function fecharModal(id) {
    document.getElementById(id).classList.remove('aberto');
    document.body.style.overflow = '';
  }

  /* Editar perfil */
  document.getElementById('btnEditarPerfil').addEventListener('click', function () {
    abrirModal('modalEditarPerfil');
  });
  document.getElementById('btnFecharModal').addEventListener('click',   function () { fecharModal('modalEditarPerfil'); });
  document.getElementById('btnCancelarModal').addEventListener('click', function () { fecharModal('modalEditarPerfil'); });
  document.getElementById('modalEditarPerfil').addEventListener('click', function (e) {
    if (e.target === this) fecharModal('modalEditarPerfil');
  });
  document.getElementById('btnSalvarModal').addEventListener('click', function () {
    fecharModal('modalEditarPerfil');
    mostrarToast('Perfil actualizado com sucesso!', 'sucesso');
  });

  /* Segurança */
  document.getElementById('btnGerenciarSeg').addEventListener('click', function () {
    abrirModal('modalSeguranca');
    document.getElementById('erroSenha').textContent = '';
  });
  ['itemSenha', 'item2FA', 'itemSessoes'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function () { abrirModal('modalSeguranca'); });
  });
  document.getElementById('btnFecharSeg').addEventListener('click',    function () { fecharModal('modalSeguranca'); });
  document.getElementById('btnCancelarSeg').addEventListener('click',  function () { fecharModal('modalSeguranca'); });
  document.getElementById('modalSeguranca').addEventListener('click',  function (e) { if (e.target === this) fecharModal('modalSeguranca'); });

  document.getElementById('btnSalvarSenha').addEventListener('click', function () {
    var nova      = document.getElementById('novaSenha').value;
    var confirmar = document.getElementById('confirmarSenha').value;
    var erroEl    = document.getElementById('erroSenha');

    if (!nova || nova.length < 8) {
      erroEl.textContent = 'A nova senha deve ter pelo menos 8 caracteres.'; return;
    }
    if (nova !== confirmar) {
      erroEl.textContent = 'As senhas não coincidem.'; return;
    }
    erroEl.textContent = '';
    fecharModal('modalSeguranca');
    mostrarToast('Senha actualizada com sucesso!', 'sucesso');
    ['senhaAtual','novaSenha','confirmarSenha'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
  });

  /* Botões mostrar/ocultar senha */
  document.querySelectorAll('.btn-ver-senha').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.dataset.target);
      if (!input) return;
      var visivel = input.type === 'text';
      input.type = visivel ? 'password' : 'text';
      btn.querySelector('i').className = visivel ? 'fa fa-eye' : 'fa fa-eye-slash';
    });
  });

  /* Status do sistema */
  document.getElementById('btnStatus').addEventListener('click', function () { abrirModal('modalStatus'); });
  document.getElementById('btnFecharStatus').addEventListener('click',   function () { fecharModal('modalStatus'); });
  document.getElementById('btnFecharStatusOk').addEventListener('click', function () { fecharModal('modalStatus'); });
  document.getElementById('modalStatus').addEventListener('click', function (e) { if (e.target === this) fecharModal('modalStatus'); });

  /* ESC fecha modais */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      ['modalEditarPerfil','modalSeguranca','modalStatus'].forEach(fecharModal);
    }
  });

  /* Contactar Suporte */
  document.getElementById('btnContatar').addEventListener('click', function () {
    mostrarToast('A abrir canal de suporte...', 'aviso');
  });

  /* ─────────────────────────────────────────
     12. STATS DA PLATAFORMA – NAVEGAÇÃO
  ───────────────────────────────────────── */
  document.querySelectorAll('.stat-pl').forEach(function (card) {
    card.addEventListener('click', function () {
      var pag = card.dataset.pagina;
      if (pag) navegar(pag);
    });
  });

  /* Ações rápidas */
  document.querySelectorAll('.acao-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pag = btn.dataset.pagina;
      if (pag) navegar(pag);
    });
  });

  /* ─────────────────────────────────────────
     13. CONTADORES ANIMADOS
  ───────────────────────────────────────── */
  var contadoresFeitos = false;

  function animarContadores() {
    if (contadoresFeitos) return;
    contadoresFeitos = true;

    document.querySelectorAll('.spl-val').forEach(function (el) {
      if (el.dataset.kz) return; /* Deixar o Kz estático */
      var alvo  = parseInt(el.dataset.count || 0);
      var dur   = 1600;
      var inter = 16;
      var passos= dur / inter;
      var inc   = alvo / passos;
      var atual = 0;

      var timer = setInterval(function () {
        atual += inc;
        if (atual >= alvo) { atual = alvo; clearInterval(timer); }
        el.textContent = Math.round(atual).toLocaleString('pt-AO');
      }, inter);
    });
  }

  /* Observar quando a secção de stats entra em viewport */
  var statsEl = document.querySelector('.stats-plataforma');
  if (statsEl && 'IntersectionObserver' in window) {
    var obsStats = new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) { animarContadores(); obsStats.disconnect(); }
    }, { threshold: 0.2 });
    obsStats.observe(statsEl);
  } else {
    setTimeout(animarContadores, 500);
  }

  /* ─────────────────────────────────────────
     14. TOAST
  ───────────────────────────────────────── */
  var toastEl    = document.getElementById('toast');
  var toastIcone = document.getElementById('toastIcone');
  var toastTexto = document.getElementById('toastTexto');
  var timerToast = null;

  function mostrarToast(msg, tipo) {
    toastTexto.textContent = msg;
    toastEl.className = 'toast ' + tipo;
    var icones = { sucesso: 'fa fa-check-circle', erro: 'fa fa-times-circle', aviso: 'fa fa-exclamation-circle' };
    toastIcone.className = icones[tipo] || icones.aviso;
    setTimeout(function () { toastEl.classList.add('visivel'); }, 10);
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { toastEl.classList.remove('visivel'); }, 4000);
  }

  toastEl.addEventListener('click', function () {
    toastEl.classList.remove('visivel');
    clearTimeout(timerToast);
  });

  /* ─────────────────────────────────────────
     15. REVEAL ANIMADO DOS CARDS
  ───────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var cards = document.querySelectorAll('.card-perfil,.stats-plataforma,.card-visao-geral,.card-atividades,.card-aprovacoes,.card-seguranca,.card-acoes-rapidas,.card-plataforma-info');
    var obsCards = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity    = '1';
          entrada.target.style.transform  = 'translateY(0)';
          obsCards.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (card, i) {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(18px)';
      card.style.transition = 'opacity .4s ease ' + (i * 0.06) + 's, transform .4s ease ' + (i * 0.06) + 's';
      obsCards.observe(card);
    });
  }

  /* ─────────────────────────────────────────
     16. SAÍDA / LOGOUT
  ───────────────────────────────────────── */
  document.querySelectorAll('.ad-sair').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (confirm('Tem a certeza que deseja sair?')) {
        mostrarToast('A terminar sessão...', 'aviso');
        setTimeout(function () { window.location.href = 'login.html'; }, 1500);
      }
    });
  });

  /* ─────────────────────────────────────────
     17. INICIALIZAÇÃO
  ───────────────────────────────────────── */
  renderizarNotificacoes();
  actualizarBadge();
  renderizarAtividades();
  renderizarAprovacoes();
  renderizarTabelaUsuarios(dados.usuarios);
  renderizarTabelaVendedores(dados.vendedores);
  renderizarTabelaProdutos(dados.produtos);
  renderizarTabelaPedidos(dados.pedidos);

});
