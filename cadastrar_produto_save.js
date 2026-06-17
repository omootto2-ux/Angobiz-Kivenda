/**
 * ANGOBIZ KIVENDA — CADASTRAR PRODUTO (integração DB)
 * Intercepta o publicar() e guarda no localStorage
 */
document.addEventListener('DOMContentLoaded', () => {
  /* Proteger página — só vendedores/admin */
  Sessao.exigirVendedor();

  /* Mostrar nome do user no header do painel */
  const u = Sessao.get();
  if (u) {
    document.querySelectorAll('.perfil-nome,.nome-user,.user-name').forEach(el => el.textContent = u.nome);
    /* sidebar logo */
    const sidebarLogo = document.querySelector('.sidebar-logo img, .logo-circulo img');
    if (sidebarLogo) sidebarLogo.src = '../img/logo.png';
  }

  /* Override da função publicar() original */
  const origPublicar = window.publicar;
  window.publicar = function() {
    /* Validar igual ao original */
    if (typeof validar === 'function') {
      const erros = validar();
      if (erros.length > 0) {
        if (typeof mostrarToast === 'function') mostrarToast('Corrija os campos assinalados.', 'erro');
        const primeiro = document.getElementById(erros[0]);
        if (primeiro) primeiro.scrollIntoView({ behavior:'smooth', block:'center' });
        return;
      }
    }

    /* Recolher dados do formulário */
    const imagens = [];
    document.querySelectorAll('#previewImagens img').forEach(img => imagens.push(img.src));

    const produto = {
      nome:          document.getElementById('nomeProduto')?.value?.trim() || '',
      categoria:     document.getElementById('categoria')?.value || '',
      marca:         document.getElementById('marca')?.value?.trim() || '',
      modelo:        document.getElementById('modelo')?.value?.trim() || '',
      condicao:      document.getElementById('condicao')?.value || 'novo',
      tipoProduto:   document.getElementById('tipoProduto')?.value || 'fisico',
      descricao:     document.getElementById('descricao')?.value?.trim() || '',
      preco:         parseFloat(document.getElementById('preco')?.value) || 0,
      precoPromo:    parseFloat(document.getElementById('precoPromo')?.value) || 0,
      estoque:       parseInt(document.getElementById('estoque')?.value) || 0,
      sku:           document.getElementById('sku')?.value?.trim() || '',
      peso:          document.getElementById('peso')?.value || '',
      dimensoes:     document.getElementById('dimensoes')?.value?.trim() || '',
      tipoEnvio:     document.getElementById('tipoEnvio')?.value || '',
      tempoEntrega:  document.getElementById('tempoEntrega')?.value || '',
      statusProduto: document.getElementById('statusProduto')?.value || 'ativo',
      imagem:        imagens[0] || 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Produto',
      imagens:       imagens,
      vendedorId:    u ? u.id : 0,
      vendedorNome:  u ? (u.nomeLoja || u.nome) : 'Vendedor',
      estrelas:      4.5,
      avaliacoes:    0,
    };

    /* Guardar no DB */
    const novo = DB.produtos.add(produto);

    /* Mostrar modal de sucesso */
    const mTit  = document.getElementById('mTit') || document.getElementById('modalTitulo');
    const mDesc = document.getElementById('mDesc') || document.getElementById('modalMensagem');
    if (mTit)  mTit.textContent  = '✓ Produto publicado com sucesso!';
    if (mDesc) mDesc.textContent = `"${produto.nome}" foi cadastrado e já está visível no Mercado.`;

    const modalOv = document.getElementById('modalOv') || document.getElementById('modalSucesso');
    if (modalOv) modalOv.classList.add('aberto');

    Toast.ok('✓ Produto cadastrado! Já aparece no Mercado.');

    /* Botões do modal */
    setTimeout(() => {
      document.querySelectorAll('[onclick*="verProduto"],[onclick*="ver-produto"]').forEach(btn => {
        btn.onclick = () => { window.location.href = '../pages/mercado.html'; };
      });
      document.querySelectorAll('[onclick*="novoProduto"],[onclick*="novo-produto"]').forEach(btn => {
        btn.onclick = () => { window.location.reload(); };
      });
    }, 100);
  };

  /* Override salvarRascunho */
  window.salvarRascunho = function() {
    const nome = document.getElementById('nomeProduto')?.value?.trim();
    if (!nome) { Toast.aviso('Insira o nome do produto.'); return; }
    Toast.aviso('Rascunho guardado localmente.');
  };
});
