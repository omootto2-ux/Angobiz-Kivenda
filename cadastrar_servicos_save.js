/**
 * ANGOBIZ KIVENDA — CADASTRAR SERVIÇOS (integração DB)
 */
document.addEventListener('DOMContentLoaded', () => {
  Sessao.exigirVendedor();

  const u = Sessao.get();
  if (u) {
    document.querySelectorAll('.perfil-nome,.nome-user,.user-name').forEach(el => el.textContent = u.nome);
  }

  /* Override publicarServico() */
  window.publicarServico = function() {
    /* Validar */
    if (typeof validarFormulario === 'function' && !validarFormulario()) {
      Toast.erro('Preencha todos os campos obrigatórios.');
      const err = document.querySelector('.campo.erro');
      if (err) err.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }

    /* Recolher imagem */
    const imgEl = document.querySelector('#previewImg img, .preview-img img');
    const imagemUrl = imgEl ? imgEl.src : 'https://via.placeholder.com/400x300/1a1a1a/c9a227?text=Serviço';

    /* Público atendido */
    const publico = [];
    ['chkHomens','chkMulheres','chkCriancas','chkTodos'].forEach(id => {
      const el = document.getElementById(id);
      if (el?.checked) publico.push(el.nextElementSibling?.textContent?.trim() || id);
    });

    /* Dias de funcionamento */
    const dias = [];
    document.querySelectorAll('.dias-grupo .chk:checked').forEach(el => {
      dias.push(el.nextElementSibling?.textContent?.trim() || '');
    });

    const servico = {
      nome:          document.getElementById('nomeServico')?.value?.trim() || '',
      categoria:     document.getElementById('categoriaServico')?.value || '',
      subcategoria:  document.getElementById('subcategoria')?.value || '',
      tipoServico:   document.getElementById('tipoServico')?.value || '',
      formato:       document.querySelector('input[name="formato"]:checked')?.value || 'presencial',
      descricaoCurta:document.getElementById('descCurta')?.value?.trim() || '',
      descricao:     document.getElementById('descDetalhada')?.value?.trim() || '',
      preco:         parseFloat(document.getElementById('preco')?.value) || 0,
      precoPromo:    parseFloat(document.getElementById('precoPromo')?.value) || 0,
      duracao:       document.getElementById('duracao')?.value || '',
      unidadeDuracao:document.getElementById('unidadeDuracao')?.value || 'min',
      publico:       publico,
      cidade:        document.getElementById('cidade')?.value || 'Luanda',
      bairro:        document.getElementById('bairro')?.value || '',
      endereco:      document.getElementById('endereco')?.value?.trim() || '',
      referencia:    document.getElementById('referencia')?.value?.trim() || '',
      experiencia:   document.getElementById('experiencia')?.value?.trim() || '',
      materiais:     document.getElementById('materiais')?.value?.trim() || '',
      certificacoes: document.getElementById('certificacoes')?.value?.trim() || '',
      dias:          dias,
      imagem:        imagemUrl,
      vendedorId:    u ? u.id : 0,
      vendedorNome:  u ? (u.nomeLoja || u.nome) : 'Prestador',
      estrelas:      4.5,
      avaliacoes:    0,
    };

    /* Guardar no DB */
    const novo = DB.servicos.add(servico);

    /* Modal de sucesso */
    const modalEl = document.getElementById('modalSucesso');
    const nomEl   = document.getElementById('resumoNome') || document.getElementById('mNome');
    if (nomEl) nomEl.textContent = servico.nome;
    if (modalEl) { abrirModal('modalSucesso'); }

    Toast.ok('✓ Serviço cadastrado! Já aparece no Mercado.');
    console.log('Serviço guardado:', novo);

    /* Botões pós-sucesso */
    setTimeout(() => {
      document.querySelectorAll('[onclick*="irMercado"],[onclick*="ver-servicos"]').forEach(btn => {
        btn.onclick = () => window.location.href = '../pages/mercado.html';
      });
      document.querySelectorAll('[onclick*="novoServico"],[onclick*="novo-servico"]').forEach(btn => {
        btn.onclick = () => window.location.reload();
      });
    }, 100);
  };
});
