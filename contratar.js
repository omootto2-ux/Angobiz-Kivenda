/* ═══════════════════════════════════════════════
   ANGO RESOLVE — CONTRATAR TRABALHADORES — JS
   ═══════════════════════════════════════════════ */

// ──────────────────────────────────────────────
// DADOS
// ──────────────────────────────────────────────

const categoriasPopulares = [
  { nome: 'Educação',     desc: 'Professores e tutores',     icone: 'fa-solid fa-graduation-cap', cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Cabeleireiro', desc: 'Barbeiros e cabeleireiras', icone: 'fa-solid fa-scissors',       cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Cozinharia',   desc: 'Cozinheiros e ajudantes',   icone: 'fa-solid fa-utensils',       cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Empregado',    desc: 'Domésticas e faxineiras',   icone: 'fa-solid fa-person',         cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Babá',         desc: 'Cuidadoras de crianças',    icone: 'fa-solid fa-baby',           cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Motorista',    desc: 'Motoristas particulares',   icone: 'fa-solid fa-car',            cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
  { nome: 'Mais categorias', desc: 'Ver todas',              icone: 'fa-solid fa-grid-2',         cor: '#f5a623', bg: 'rgba(245,166,35,.15)' },
];

const filtrosProfissionais = [
  'Todos','Educação','Cabeleireiro','Cozinharia','Empregada','Babá',
  'Motorista','Saúde','Construção','Eventos','Outros'
];

const todosProfissionais = [
  {
    id: 1, nome: 'Ana Paula',   cargo: 'Professora de Matemática',
    avaliacao: 4.9, totalAv: 128, local: 'Luanda, Angola',
    preco: '8.000', categoria: 'educacao', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Professora de Matemática com 8 anos de experiência em explicações individuais e em grupo, do 1.º ao 12.º ano e nível universitário.'
  },
  {
    id: 2, nome: 'Carlos Silva', cargo: 'Cabeleireiro Profissional',
    avaliacao: 4.8, totalAv: 96, local: 'Luanda, Angola',
    preco: '5.000', categoria: 'cabeleireiro', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
    bio: 'Cabeleireiro com mais de 10 anos de experiência. Especialista em cortes modernos, barbas e tratamentos capilares.'
  },
  {
    id: 3, nome: 'João Pedro',  cargo: 'Cozinheiro',
    avaliacao: 4.7, totalAv: 74, local: 'Luanda, Angola',
    preco: '7.000', categoria: 'cozinheiro', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
    bio: 'Chef cozinheiro experiente em culinária angolana, portuguesa e internacional. Disponível para eventos, jantares e trabalho doméstico diário.'
  },
  {
    id: 4, nome: 'Maria José',  cargo: 'Empregada Doméstica',
    avaliacao: 4.7, totalAv: 156, local: 'Luanda, Angola',
    preco: '4.000', categoria: 'empregado', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
    bio: 'Empregada doméstica com experiência em limpeza, cozinha e gestão da casa. Discreta, organizada e de confiança.'
  },
  {
    id: 5, nome: 'Sofia Almeida', cargo: 'Babá / Cuidadora',
    avaliacao: 4.8, totalAv: 103, local: 'Luanda, Angola',
    preco: '4.000', categoria: 'baba', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    bio: 'Cuidadora de crianças com formação em pediatria e 6 anos de experiência. Carinhosa, responsável e com referências verificadas.'
  },
  {
    id: 6, nome: 'Paulo Mendes', cargo: 'Motorista Particular',
    avaliacao: 4.9, totalAv: 88, local: 'Luanda, Angola',
    preco: '4.000', categoria: 'motorista', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Motorista profissional com carta de condução classe B e D, 12 anos de experiência, pontual, discreto e conhecedor de Luanda.'
  },
  {
    id: 7, nome: 'Beatriz Santos', cargo: 'Enfermeira',
    avaliacao: 4.9, totalAv: 61, local: 'Luanda, Angola',
    preco: '9.000', categoria: 'saude', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    bio: 'Enfermeira licenciada com especialização em cuidados domiciliários. Experiência com idosos, pós-operatório e medicação.'
  },
  {
    id: 8, nome: 'Rui Ferreira', cargo: 'Electricista',
    avaliacao: 4.6, totalAv: 42, local: 'Luanda, Angola',
    preco: '6.000', categoria: 'construcao', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'Electricista certificado com 15 anos de experiência em instalações residenciais e comerciais, reparações e quadros eléctricos.'
  },
  {
    id: 9, nome: 'Lúcia Neto',   cargo: 'Organizadora de Eventos',
    avaliacao: 4.8, totalAv: 37, local: 'Luanda, Angola',
    preco: '10.000', categoria: 'eventos', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80',
    bio: 'Especialista em organização de casamentos, festas de aniversário e eventos corporativos. Coordeno tudo do início ao fim.'
  },
  {
    id: 10, nome: 'António Gomes', cargo: 'Pedreiro / Construtor',
    avaliacao: 4.7, totalAv: 55, local: 'Luanda, Angola',
    preco: '5.500', categoria: 'construcao', disponivel: false,
    foto: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80',
    bio: 'Pedreiro com 20 anos de experiência em construção civil, acabamentos, pintura, reparações e obras de renovação.'
  },
  {
    id: 11, nome: 'Fernanda Lima', cargo: 'Tutora de Inglês',
    avaliacao: 4.9, totalAv: 79, local: 'Luanda, Angola',
    preco: '7.500', categoria: 'educacao', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
    bio: 'Professora de inglês com certificação Cambridge. Aulas para todos os níveis, preparação para exames e conversação.'
  },
  {
    id: 12, nome: 'Manuel Costa', cargo: 'Jardineiro',
    avaliacao: 4.6, totalAv: 28, local: 'Luanda, Angola',
    preco: '3.500', categoria: 'outros', disponivel: true,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Jardineiro com experiência em manutenção de jardins residenciais e comerciais, corte de relva, podas e paisagismo.'
  },
];

const categoriasSecundarias = [
  { nome: 'Enfermeiros',   desc: 'Profissionais de saúde',  qtd: 156, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
  { nome: 'Pedreiros',     desc: 'Construção e obras',       qtd: 243, img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80' },
  { nome: 'Electricistas', desc: 'Instalações eléctricas',   qtd: 189, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80' },
  { nome: 'Jardineiros',   desc: 'Cuidado com jardins',      qtd: 87,  img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { nome: 'Técnicos de TI',desc: 'Suporte e manutenção',    qtd: 64,  img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80' },
  { nome: 'Garçons',       desc: 'Serviços de eventos',      qtd: 112, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
];

// ──────────────────────────────────────────────
// ESTADO
// ──────────────────────────────────────────────

let estado = {
  filtroActivo: 'todos',
  profissionaisFiltrados: [...todosProfissionais],
};

// ──────────────────────────────────────────────
// INICIALIZAÇÃO
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCategorias();
  renderFiltros();
  renderProfissionais();
  renderCategoriasSecundarias();
  configurarEventos();
});

function configurarEventos() {
  // Pesquisa em tempo real
  document.getElementById('inputBusca').addEventListener('input', aplicarFiltros);
  document.getElementById('inputBusca').addEventListener('keydown', e => {
    if (e.key === 'Enter') aplicarFiltros();
  });

  // Pesquisa topo
  document.getElementById('inputPesquisaTopo').addEventListener('keydown', e => {
    if (e.key === 'Enter') pesquisarTopo();
  });

  // Fechar menus ao clicar fora
  document.addEventListener('click', e => {
    const perfil = document.querySelector('.perfil-usuario');
    if (perfil && !perfil.contains(e.target)) {
      document.getElementById('menuUsuario').classList.remove('aberto');
    }
  });
}

// ──────────────────────────────────────────────
// RENDERIZAÇÃO — CATEGORIAS POPULARES
// ──────────────────────────────────────────────

function renderCategorias() {
  const container = document.getElementById('categoriasPopulares');
  container.innerHTML = categoriasPopulares.map(cat => `
    <div class="cat-popular-card" onclick="clicarCategoria('${cat.nome}')">
      <div class="cat-popular-icone" style="background:${cat.bg}; color:${cat.cor};">
        <i class="${cat.icone}"></i>
      </div>
      <div class="cat-popular-info">
        <span class="cat-popular-nome">${cat.nome}</span>
        <span class="cat-popular-desc">${cat.desc}</span>
      </div>
    </div>
  `).join('');
}

function clicarCategoria(nome) {
  const mapa = {
    'Educação': 'educacao', 'Cabeleireiro': 'cabeleireiro',
    'Cozinharia': 'cozinheiro', 'Empregado': 'empregado',
    'Babá': 'baba', 'Motorista': 'motorista',
    'Mais categorias': 'todos'
  };
  const cat = mapa[nome] || 'todos';
  estado.filtroActivo = cat;

  // Sincronizar filtros de botão
  document.querySelectorAll('.filtro-prof').forEach(b => {
    b.classList.toggle('ativo', b.dataset.cat === cat || (cat === 'todos' && b.dataset.cat === 'todos'));
  });

  aplicarFiltros();
  mostrarToast(`Categoria: ${nome}`);
}

// ──────────────────────────────────────────────
// RENDERIZAÇÃO — FILTROS DE PROFISSIONAIS
// ──────────────────────────────────────────────

function renderFiltros() {
  const container = document.getElementById('filtrosProfissionais');
  container.innerHTML = filtrosProfissionais.map(f => {
    const cat = f === 'Todos' ? 'todos' : f.toLowerCase()
      .replace('ã','a').replace('â','a').replace('ê','e')
      .replace('é','e').replace('á','a').replace('ó','o')
      .replace('ú','u').replace('ç','c').replace('í','i')
      .replace(' ','').replace('cozinharia','cozinheiro')
      .replace('empregada','empregado').replace('outros','outros')
      .replace('educacao','educacao').replace('saude','saude')
      .replace('construcao','construcao').replace('eventos','eventos');
    return `
      <button class="filtro-prof ${f === 'Todos' ? 'ativo' : ''}"
              data-cat="${cat}"
              onclick="selecionarFiltro(this, '${cat}')">
        ${f}
      </button>
    `;
  }).join('');
}

function selecionarFiltro(btn, cat) {
  document.querySelectorAll('.filtro-prof').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  estado.filtroActivo = cat;
  aplicarFiltros();
}

// ──────────────────────────────────────────────
// FILTROS + RENDERIZAÇÃO — PROFISSIONAIS
// ──────────────────────────────────────────────

function aplicarFiltros() {
  const busca = document.getElementById('inputBusca').value.toLowerCase().trim();
  const catSelect = document.getElementById('selectCategoria').value;
  const locSelect = document.getElementById('selectLocalizacao').value;
  const dispSelect = document.getElementById('selectDisponibilidade').value;

  let resultado = [...todosProfissionais];

  // Filtro do botão de categoria
  if (estado.filtroActivo && estado.filtroActivo !== 'todos') {
    resultado = resultado.filter(p => p.categoria === estado.filtroActivo);
  }

  // Filtro do select de categoria
  if (catSelect) {
    resultado = resultado.filter(p => p.categoria === catSelect);
  }

  // Filtro de localização
  if (locSelect) {
    resultado = resultado.filter(p => p.local.toLowerCase().includes(locSelect));
  }

  // Filtro de disponibilidade
  if (dispSelect === 'disponivel') resultado = resultado.filter(p => p.disponivel);
  if (dispSelect === 'ocupado')    resultado = resultado.filter(p => !p.disponivel);

  // Filtro de busca de texto
  if (busca) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(busca) ||
      p.cargo.toLowerCase().includes(busca) ||
      p.bio.toLowerCase().includes(busca)
    );
  }

  estado.profissionaisFiltrados = resultado;
  renderProfissionais();
}

function renderProfissionais() {
  const grid = document.getElementById('gridProfissionais');
  const lista = estado.profissionaisFiltrados;

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;">
        <i class="fas fa-search" style="font-size:38px;display:block;margin-bottom:14px;color:#555;"></i>
        <p style="font-size:16px;margin-bottom:6px;">Nenhum profissional encontrado</p>
        <p style="font-size:13px;">Tente outros termos ou ajuste os filtros.</p>
      </div>`;
    return;
  }

  grid.innerHTML = lista.map(p => criarCardProfissional(p)).join('');
}

function criarCardProfissional(p) {
  return `
    <div class="card-prof" onclick="abrirPerfil(${p.id})">
      <div class="card-prof-foto">
        <img src="${p.foto}" alt="${p.nome}"
             onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'" />
        <span class="badge-disponivel ${p.disponivel ? '' : 'badge-ocupado'}">
          ${p.disponivel ? 'Disponível' : 'Ocupado'}
        </span>
      </div>
      <div class="card-prof-corpo">
        <div class="card-prof-nome">
          ${p.nome} <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="card-prof-cargo">${p.cargo}</div>
        <div class="card-prof-avaliacao">
          <i class="fas fa-star"></i>
          <span class="nota">${p.avaliacao.toFixed(1)}</span>
          <span class="total">(${p.totalAv})</span>
        </div>
        <div class="card-prof-local">
          <i class="fa-solid fa-location-dot"></i> ${p.local}
        </div>
        <div class="card-prof-preco">
          A partir de <strong>${p.preco} Kz/h</strong>
        </div>
        <button class="btn-ver-perfil" onclick="event.stopPropagation(); abrirPerfil(${p.id})">
          Ver perfil
        </button>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────
// RENDERIZAÇÃO — CATEGORIAS SECUNDÁRIAS
// ──────────────────────────────────────────────

function renderCategoriasSecundarias() {
  const grid = document.getElementById('gridCategoriasSecundarias');
  grid.innerHTML = categoriasSecundarias.map(c => `
    <div class="cat-sec-card" onclick="mostrarToast('${c.nome}: ${c.qtd} disponíveis')">
      <img src="${c.img}" alt="${c.nome}"
           onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'" />
      <div class="cat-sec-info">
        <div class="cat-sec-nome">${c.nome}</div>
        <div class="cat-sec-desc">${c.desc}</div>
        <div class="cat-sec-qtd">${c.qtd} disponíveis</div>
      </div>
    </div>
  `).join('');
}

// ──────────────────────────────────────────────
// MODAL — VER PERFIL
// ──────────────────────────────────────────────

function abrirPerfil(id) {
  const p = todosProfissionais.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalPerfilTitulo').textContent = p.nome;
  document.getElementById('modalPerfilCorpo').innerHTML = `
    <div class="modal-perfil-topo">
      <img class="modal-perfil-foto" src="${p.foto}" alt="${p.nome}"
           onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'" />
      <div class="modal-perfil-dados">
        <div class="modal-perfil-nome">
          ${p.nome} <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="modal-perfil-cargo">${p.cargo}</div>
        <div class="modal-perfil-linha"><i class="fas fa-star" style="color:var(--amarelo)"></i> ${p.avaliacao.toFixed(1)} (${p.totalAv} avaliações)</div>
        <div class="modal-perfil-linha"><i class="fa-solid fa-location-dot"></i> ${p.local}</div>
        <div class="modal-perfil-linha">
          <i class="fas fa-circle" style="color:${p.disponivel ? 'var(--verde)' : '#e67e22'};font-size:9px;"></i>
          ${p.disponivel ? 'Disponível agora' : 'Ocupado'}
        </div>
        <div class="modal-perfil-preco">${p.preco} Kz <span>/ hora</span></div>
      </div>
    </div>
    <div class="modal-perfil-bio">${p.bio}</div>
    <div class="modal-perfil-btns">
      <button class="btn-contactar" onclick="contactarProfissional(${p.id})">
        <i class="fas fa-comment-dots"></i> Contactar
      </button>
      <button class="btn-guardar" onclick="mostrarToast('${p.nome} guardado nos favoritos!')">
        <i class="far fa-heart"></i> Guardar
      </button>
    </div>
  `;
  abrirModal('modalPerfil');
}

function contactarProfissional(id) {
  const p = todosProfissionais.find(x => x.id === id);
  fecharModal('modalPerfil');
  mostrarToast(`A contactar ${p.nome}...`);
}

// ──────────────────────────────────────────────
// MODAL — CONTRATAR
// ──────────────────────────────────────────────

function abrirModalContratar() {
  abrirModal('modalContratar');
}

function enviarContratacao() {
  const necessidade = document.getElementById('contratarNecessidade').value.trim();
  const categoria   = document.getElementById('contratarCategoria').value;
  const local       = document.getElementById('contratarLocal').value.trim();
  const orcamento   = document.getElementById('contratarOrcamento').value;

  if (!necessidade || !categoria || !local) {
    mostrarToast('Preencha todos os campos obrigatórios.', 'erro');
    return;
  }

  fecharModal('modalContratar');
  mostrarToast('Pedido enviado! Entraremos em contacto em breve.');

  // Limpar
  document.getElementById('contratarNecessidade').value = '';
  document.getElementById('contratarCategoria').value = '';
  document.getElementById('contratarLocal').value = '';
  document.getElementById('contratarOrcamento').value = '';
}

// ──────────────────────────────────────────────
// MODAL — COMO FUNCIONA
// ──────────────────────────────────────────────

function abrirModalComoFunciona() {
  abrirModal('modalComoFunciona');
}

// ──────────────────────────────────────────────
// MODAL — UTILITÁRIOS
// ──────────────────────────────────────────────

function abrirModal(id) {
  document.getElementById(id).classList.add('aberto');
}

function fecharModal(id) {
  document.getElementById(id).classList.remove('aberto');
}

// Fechar modal ao clicar fora
document.addEventListener('click', e => {
  document.querySelectorAll('.modal-overlay.aberto').forEach(overlay => {
    if (e.target === overlay) overlay.classList.remove('aberto');
  });
});

// ──────────────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────────────

function toggleSubmenu(itemNav, idSub) {
  const sub = document.getElementById(idSub);
  const aberto = sub.classList.contains('aberto');

  // fechar todos
  document.querySelectorAll('.submenu').forEach(s => s.classList.remove('aberto'));
  document.querySelectorAll('.nav-item.tem-submenu').forEach(n => n.classList.remove('aberto'));

  if (!aberto) {
    sub.classList.add('aberto');
    itemNav.classList.add('aberto');
  }
}

document.getElementById('btnMenuMobile').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('aberta');
});

// ──────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────

function toggleMenuUsuario() {
  document.getElementById('menuUsuario').classList.toggle('aberto');
}

function pesquisarTopo() {
  const val = document.getElementById('inputPesquisaTopo').value.trim();
  if (!val) return;
  document.getElementById('inputBusca').value = val;
  aplicarFiltros();
  mostrarToast(`A pesquisar: "${val}"`);
}

function irPara(pagina) {
  mostrarToast(`Navegando para: ${pagina}`);
}

function sair() {
  if (confirm('Tem a certeza que deseja sair?')) {
    mostrarToast('Sessão encerrada. Até breve!');
    setTimeout(() => location.reload(), 1800);
  }
}

// ──────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────

let timerToast = null;

function mostrarToast(msg, tipo = 'sucesso') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast visivel';
  if (tipo === 'erro') el.classList.add('erro');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => el.classList.remove('visivel'), 3000);
}
