/* =============================================
   ANGO RESOLVE - JAVASCRIPT PRINCIPAL
   ============================================= */

// ── DADOS DOS SERVIÇOS ─────────────────────────

const todosServicos = [
  {
    id: 1,
    titulo: 'Desenvolvimento de Sites',
    descricao: 'Criamos sites profissionais, responsivos e otimizados para seu negócio.',
    categoria: 'tecnologia',
    avaliacao: 4.8,
    totalAvaliacoes: 128,
    preco: '75.000',
    icone: 'fa-solid fa-list-check',
    corIcone: '#3b5bdb',
    imagem: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80'
  },
  {
    id: 2,
    titulo: 'Desenvolvimento de Apps',
    descricao: 'Aplicativos Android e iOS personalizados para sua ideia ou negócio.',
    categoria: 'tecnologia',
    avaliacao: 4.9,
    totalAvaliacoes: 96,
    preco: '120.000',
    icone: 'fa-solid fa-mobile-screen',
    corIcone: '#9c27b0',
    imagem: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80'
  },
  {
    id: 3,
    titulo: 'Design Gráfico',
    descricao: 'Logotipos, banners, cartões de visita e identidade visual profissional.',
    categoria: 'design-criatividade',
    avaliacao: 4.7,
    totalAvaliacoes: 77,
    preco: '25.000',
    icone: 'fa-solid fa-pen-nib',
    corIcone: '#e91e63',
    imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80'
  },
  {
    id: 4,
    titulo: 'Instalação de Câmeras',
    descricao: 'Instalação e configuração de sistemas de câmeras de segurança.',
    categoria: 'casa-escritorio',
    avaliacao: 4.8,
    totalAvaliacoes: 64,
    preco: '60.000',
    icone: 'fa-solid fa-shield-halved',
    corIcone: '#2e7d32',
    imagem: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80'
  },
  {
    id: 5,
    titulo: 'Manutenção de AC',
    descricao: 'Limpeza, higienização e manutenção de aparelhos de ar condicionado.',
    categoria: 'casa-escritorio',
    avaliacao: 4.6,
    totalAvaliacoes: 52,
    preco: '20.000',
    icone: 'fa-solid fa-snowflake',
    corIcone: '#0288d1',
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'
  },
  {
    id: 6,
    titulo: 'Serviços de Canalização',
    descricao: 'Reparos, instalação de tubos, desentupimento e manutenção hidráulica.',
    categoria: 'construcao-reparos',
    avaliacao: 4.7,
    totalAvaliacoes: 43,
    preco: '15.000',
    icone: 'fa-solid fa-droplet',
    corIcone: '#0288d1',
    imagem: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80'
  },
  {
    id: 7,
    titulo: 'Serviços Elétricos',
    descricao: 'Instalações elétricas, reparos, curtos-circuitos e manutenção residencial.',
    categoria: 'construcao-reparos',
    avaliacao: 4.8,
    totalAvaliacoes: 69,
    preco: '18.000',
    icone: 'fa-solid fa-bolt',
    corIcone: '#f5a623',
    imagem: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80'
  },
  {
    id: 8,
    titulo: 'Pintura Residencial',
    descricao: 'Pintura interna e externa com acabamento profissional e materiais de qualidade.',
    categoria: 'construcao-reparos',
    avaliacao: 4.6,
    totalAvaliacoes: 38,
    preco: '30.000',
    icone: 'fa-solid fa-paintbrush',
    corIcone: '#e67e22',
    imagem: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80'
  },
  {
    id: 9,
    titulo: 'Limpeza de Escritórios',
    descricao: 'Serviços de limpeza profissional para escritórios e ambientes comerciais.',
    categoria: 'casa-escritorio',
    avaliacao: 4.9,
    totalAvaliacoes: 58,
    preco: '22.000',
    icone: 'fa-solid fa-broom',
    corIcone: '#00897b',
    imagem: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80'
  },
  {
    id: 10,
    titulo: 'Organização de Eventos',
    descricao: 'Planejamento, organização e coordenação de eventos especiais.',
    categoria: 'eventos',
    avaliacao: 4.8,
    totalAvaliacoes: 31,
    preco: '50.000',
    icone: 'fa-solid fa-people-group',
    corIcone: '#7b1fa2',
    imagem: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80'
  },
  {
    id: 11,
    titulo: 'Marketing Digital',
    descricao: 'Gestão de redes sociais, anúncios e estratégias de crescimento online.',
    categoria: 'marketing-digital',
    avaliacao: 4.7,
    totalAvaliacoes: 85,
    preco: '40.000',
    icone: 'fa-solid fa-bullhorn',
    corIcone: '#e63c2f',
    imagem: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80'
  },
  {
    id: 12,
    titulo: 'Consultoria Empresarial',
    descricao: 'Análise, estratégia e suporte para o crescimento do seu negócio.',
    categoria: 'consultoria',
    avaliacao: 4.9,
    totalAvaliacoes: 22,
    preco: '80.000',
    icone: 'fa-solid fa-briefcase',
    corIcone: '#455a64',
    imagem: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
  },
  {
    id: 13,
    titulo: 'Fotografia Profissional',
    descricao: 'Sessões fotográficas para eventos, produtos e retratos empresariais.',
    categoria: 'design-criatividade',
    avaliacao: 4.8,
    totalAvaliacoes: 47,
    preco: '35.000',
    icone: 'fa-solid fa-camera',
    corIcone: '#37474f',
    imagem: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&q=80'
  },
  {
    id: 14,
    titulo: 'Tradução de Documentos',
    descricao: 'Tradução profissional de documentos em diversas línguas com precisão.',
    categoria: 'outros',
    avaliacao: 4.6,
    totalAvaliacoes: 19,
    preco: '12.000',
    icone: 'fa-solid fa-language',
    corIcone: '#00838f',
    imagem: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80'
  },
  {
    id: 15,
    titulo: 'Reparos de Smartphones',
    descricao: 'Conserto de ecrãs, baterias e componentes de celulares de todas as marcas.',
    categoria: 'tecnologia',
    avaliacao: 4.7,
    totalAvaliacoes: 113,
    preco: '8.000',
    icone: 'fa-solid fa-screwdriver-wrench',
    corIcone: '#546e7a',
    imagem: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80'
  },
  {
    id: 16,
    titulo: 'Serviço de Buffet',
    descricao: 'Buffet completo para festas, casamentos e eventos corporativos.',
    categoria: 'eventos',
    avaliacao: 4.9,
    totalAvaliacoes: 26,
    preco: '45.000',
    icone: 'fa-solid fa-utensils',
    corIcone: '#bf360c',
    imagem: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80'
  },
  {
    id: 17,
    titulo: 'Gestão de SEO',
    descricao: 'Optimização de motores de busca para aumentar a visibilidade online.',
    categoria: 'marketing-digital',
    avaliacao: 4.5,
    totalAvaliacoes: 41,
    preco: '55.000',
    icone: 'fa-solid fa-chart-line',
    corIcone: '#1565c0',
    imagem: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&q=80'
  },
  {
    id: 18,
    titulo: 'Mudanças e Transportes',
    descricao: 'Serviço de mudanças residenciais e comerciais com equipa especializada.',
    categoria: 'outros',
    avaliacao: 4.6,
    totalAvaliacoes: 33,
    preco: '25.000',
    icone: 'fa-solid fa-truck',
    corIcone: '#4e342e',
    imagem: 'https://images.unsplash.com/photo-1558618047-3c3d1078f37d?w=400&q=80'
  },
  {
    id: 19,
    titulo: 'Aulas Particulares',
    descricao: 'Explicações em matemática, português, inglês e outras disciplinas.',
    categoria: 'outros',
    avaliacao: 4.8,
    totalAvaliacoes: 67,
    preco: '6.000',
    icone: 'fa-solid fa-graduation-cap',
    corIcone: '#283593',
    imagem: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80'
  },
  {
    id: 20,
    titulo: 'Jardinagem e Paisagismo',
    descricao: 'Manutenção de jardins, corte de relva e projectos de paisagismo.',
    categoria: 'casa-escritorio',
    avaliacao: 4.7,
    totalAvaliacoes: 29,
    preco: '14.000',
    icone: 'fa-solid fa-leaf',
    corIcone: '#2e7d32',
    imagem: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80'
  }
];

// ── ESTADO DA APLICAÇÃO ─────────────────────────

let estadoApp = {
  categoriaActual: 'todos',
  paginaActual: 1,
  itensPorPagina: 10,
  servicosFiltrados: [...todosServicos],
  termoPesquisa: ''
};

// ── INICIALIZAÇÃO ─────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderizarServicos();
  configurarEventos();
});

function configurarEventos() {
  // Pesquisa ao pressionar Enter
  const inputPesquisa = document.getElementById('inputPesquisa');
  inputPesquisa.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pesquisar();
  });
  inputPesquisa.addEventListener('input', () => {
    if (inputPesquisa.value === '') {
      estadoApp.termoPesquisa = '';
      estadoApp.paginaActual = 1;
      filtrarEExibir();
    }
  });


}

// ── RENDERIZAÇÃO DE SERVIÇOS ────────────────────

function renderizarServicos() {
  const grade = document.getElementById('gradeServicos');
  const inicio = (estadoApp.paginaActual - 1) * estadoApp.itensPorPagina;
  const fim = inicio + estadoApp.itensPorPagina;
  const servicosPagina = estadoApp.servicosFiltrados.slice(inicio, fim);

  if (servicosPagina.length === 0) {
    grade.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#888;">
        <i class="fas fa-search" style="font-size:40px; margin-bottom:16px; display:block; color:#555;"></i>
        <p style="font-size:16px; margin-bottom:8px;">Nenhum serviço encontrado</p>
        <p style="font-size:13px;">Tente outros termos de pesquisa ou categorias.</p>
      </div>
    `;
    renderizarPaginacao();
    return;
  }

  grade.innerHTML = servicosPagina.map(servico => criarCardServico(servico)).join('');
  renderizarPaginacao();
}

function criarCardServico(servico) {
  const estrelas = gerarEstrelas(servico.avaliacao);
  return `
    <div class="card-servico" onclick="abrirServico(${servico.id})">
      <div class="card-imagem">
        <img 
          src="${servico.imagem}" 
          alt="${servico.titulo}"
          onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'"
        />
        <div class="card-icone-categoria" style="background:${servico.corIcone};">
          <i class="${servico.icone}" style="font-size:16px;"></i>
        </div>
      </div>
      <div class="card-corpo">
        <div class="card-titulo">${servico.titulo}</div>
        <div class="card-descricao">${servico.descricao}</div>
        <div class="card-avaliacao">
          <i class="fas fa-star estrela"></i>
          <span class="nota">${servico.avaliacao.toFixed(1)}</span>
          <span class="total">(${servico.totalAvaliacoes})</span>
        </div>
        <div class="card-preco">
          A partir de <strong>${servico.preco} Kz</strong>
        </div>
      </div>
    </div>
  `;
}

function gerarEstrelas(nota) {
  const cheia = Math.floor(nota);
  const meia = nota % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < cheia; i++) html += '★';
  if (meia) html += '½';
  return html;
}

// ── PAGINAÇÃO ───────────────────────────────────

function renderizarPaginacao() {
  const paginacao = document.getElementById('paginacao');
  const total = estadoApp.servicosFiltrados.length;
  const totalPaginas = Math.ceil(total / estadoApp.itensPorPagina);

  if (totalPaginas <= 1) {
    paginacao.innerHTML = '';
    return;
  }

  let html = '';
  const actual = estadoApp.paginaActual;

  // Botões de página visíveis
  const paginasVisiveis = gerarPaginasVisiveis(actual, totalPaginas);

  paginasVisiveis.forEach(item => {
    if (item === '...') {
      html += `<button class="btn-pagina reticencias">...</button>`;
    } else {
      html += `<button class="btn-pagina ${item === actual ? 'ativo' : ''}" onclick="irParaPagina(${item})">${item}</button>`;
    }
  });

  // Botão próximo
  if (actual < totalPaginas) {
    html += `<button class="btn-pagina proximo" onclick="irParaPagina(${actual + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }

  paginacao.innerHTML = html;
}

function gerarPaginasVisiveis(actual, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const paginas = [];
  paginas.push(1);
  if (actual > 3) paginas.push('...');
  for (let i = Math.max(2, actual - 1); i <= Math.min(total - 1, actual + 1); i++) {
    paginas.push(i);
  }
  if (actual < total - 2) paginas.push('...');
  paginas.push(total);
  return paginas;
}

function irParaPagina(pagina) {
  estadoApp.paginaActual = pagina;
  renderizarServicos();
  // Scroll suave para o topo do conteúdo
  document.querySelector('.conteudo-principal').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── FILTROS ─────────────────────────────────────

function filtrarCategoria(botao, categoria) {
  // Atualizar botões
  document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
  botao.classList.add('ativo');

  estadoApp.categoriaActual = categoria;
  estadoApp.paginaActual = 1;
  filtrarEExibir();
}

function filtrarEExibir() {
  let resultado = [...todosServicos];

  // Filtro por categoria
  if (estadoApp.categoriaActual !== 'todos') {
    resultado = resultado.filter(s => s.categoria === estadoApp.categoriaActual);
  }

  // Filtro por pesquisa
  if (estadoApp.termoPesquisa) {
    const termo = estadoApp.termoPesquisa.toLowerCase();
    resultado = resultado.filter(s =>
      s.titulo.toLowerCase().includes(termo) ||
      s.descricao.toLowerCase().includes(termo)
    );
  }

  estadoApp.servicosFiltrados = resultado;
  renderizarServicos();
}

// ── PESQUISA ─────────────────────────────────────

function pesquisar() {
  const input = document.getElementById('inputPesquisa');
  estadoApp.termoPesquisa = input.value.trim();
  estadoApp.paginaActual = 1;
  filtrarEExibir();

  if (estadoApp.termoPesquisa) {
    mostrarToast(`Pesquisando por "${estadoApp.termoPesquisa}"...`);
  }
}


// ====================================================
//  BUSCA
// ====================================================
function executarBusca() {
  const termo = document.getElementById("inputBusca").value.toLowerCase().trim();
  if (!termo) { limparFiltros(); return; }

  produtosVisiveis = todosProdutos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.cat.toLowerCase().includes(termo)  ||
    p.vendedor.toLowerCase().includes(termo)
  );

  servicosVisiveis = todosServicos.filter(s =>
    s.nome.toLowerCase().includes(termo) ||
    s.cat.toLowerCase().includes(termo)  ||
    s.vendedor.toLowerCase().includes(termo)
  );

  document.getElementById("subProdutos").textContent =
    `${produtosVisiveis.length} produto(s) para "${termo}"`;
  document.getElementById("subServicos").textContent =
    `${servicosVisiveis.length} serviço(s) para "${termo}"`;

  renderizarProdutos(produtosVisiveis);
  renderizarServicos(servicosVisiveis);
  mostrarToast(`Resultados para: "${termo}"`);
}

function buscarEnter(e) {
  if (e.key === "Enter") executarBusca();
}

// ====================================================
//  DROPDOWN: CATEGORIAS DE BUSCA
// ====================================================
document.getElementById("buscaCatBtn")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("buscaCatDrop").classList.toggle("aberto");
  fecharDrop("contaDrop");
});

function selecionarCategoriaBusca(e, cat) {
  e.preventDefault();
  e.stopPropagation();
  const btn = document.getElementById("buscaCatBtn");
  btn.childNodes[0].textContent = cat + " ";
  fecharDrop("buscaCatDrop");
  mostrarToast("Categoria de busca: " + cat);
}

// ====================================================
//  DROPDOWN: MINHA CONTA
// ====================================================
document.getElementById("haConta")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("contaDrop").classList.toggle("aberto");
  fecharDrop("buscaCatDrop");
});

function fecharDrop(id) {
  document.getElementById(id)?.classList.remove("aberto");
}

document.addEventListener("click", function () {
  fecharDrop("buscaCatDrop");
  fecharDrop("contaDrop");
});

// ── MODAL ADICIONAR SERVIÇO ───────────────────────

function adicionarServico() {
  document.getElementById('modalAdicionar').classList.add('aberto');
}

function fecharModal(idModal) {
  document.getElementById(idModal).classList.remove('aberto');
}

function salvarServico() {
  const nome = document.getElementById('nomeServico').value.trim();
  const categoria = document.getElementById('categoriaServico').value;
  const descricao = document.getElementById('descricaoServico').value.trim();
  const preco = document.getElementById('precoServico').value;

  if (!nome || !descricao || !preco) {
    mostrarToast('Por favor, preencha todos os campos.', 'erro');
    return;
  }

  const novoServico = {
    id: Date.now(),
    titulo: nome,
    descricao: descricao,
    categoria: categoria,
    avaliacao: 5.0,
    totalAvaliacoes: 0,
    preco: Number(preco).toLocaleString('pt-AO'),
    icone: 'fa-solid fa-star',
    corIcone: '#e63c2f',
    imagem: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
  };

  todosServicos.unshift(novoServico);
  estadoApp.paginaActual = 1;
  estadoApp.categoriaActual = 'todos';

  // Resetar filtros visuais
  document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
  document.querySelector('.filtro').classList.add('ativo');

  filtrarEExibir();
  fecharModal('modalAdicionar');

  // Limpar campos
  document.getElementById('nomeServico').value = '';
  document.getElementById('descricaoServico').value = '';
  document.getElementById('precoServico').value = '';

  mostrarToast(`Serviço "${nome}" adicionado com sucesso!`);
}

// ── ABRIR SERVIÇO (DETALHE) ───────────────────────

function abrirServico(id) {
  const servico = todosServicos.find(s => s.id === id);
  if (!servico) return;
  mostrarToast(`A abrir: ${servico.titulo}`);
}

  // Atualizar item ativo na sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    const textoItem = item.querySelector('span')?.textContent?.toLowerCase().replace(/\s+/g, '-');
    item.classList.remove('ativo');
    if (textoItem === pagina || pagina === 'servicos' && textoItem === 'serviços') {
      item.classList.add('ativo');
    }
  });

  mostrarToast(`Navegando para: ${nome}`);


// ── CHAT E NOTIFICAÇÕES ───────────────────────────

function abrirChat() {
  mostrarToast('Chat em desenvolvimento. Em breve disponível!');
}

function abrirNotificacoes() {
  mostrarToast('5 novas notificações');
}


// ── TOAST ─────────────────────────────────────────

let timerToast = null;

function mostrarToast(mensagem, tipo = 'sucesso') {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.className = 'toast visivel';
  if (tipo === 'erro') toast.classList.add('erro');

  clearTimeout(timerToast);
  timerToast = setTimeout(() => {
    toast.classList.remove('visivel');
  }, 3000);
}

// ── FECHAR MODAL AO CLICAR FORA ───────────────────

document.getElementById('modalAdicionar').addEventListener('click', function (e) {
  if (e.target === this) fecharModal('modalAdicionar');
});
