/* ═══════════════════════════════════════════════
   ANGOBIZ KIVENDA — PERFIL DESKTOP JS
   ═══════════════════════════════════════════════ */

// ── CONTEÚDOS DOS PAINÉIS ─────────────────────────

const paineis = {

  'painel-editar': {
    titulo: '<i class="fas fa-pen-to-square"></i> Editar Perfil da Loja',
    corpo: () => `
      <div class="g2-m">
        <div class="campo-m"><label>Nome da Loja</label><input type="text" value="Loja Tech Angola" id="ed-nome"/></div>
        <div class="campo-m"><label>Categoria</label><input type="text" value="Tecnologia &amp; Electrónicos" id="ed-cat"/></div>
      </div>
      <div class="campo-m"><label>Endereço</label><input type="text" value="Luanda, Angola" id="ed-local"/></div>
      <div class="g2-m">
        <div class="campo-m"><label>Telefone</label><input type="tel" value="+244 923 456 789" id="ed-tel"/></div>
        <div class="campo-m"><label>Email</label><input type="email" value="lojatechangola@email.com" id="ed-email"/></div>
      </div>
      <div class="campo-m"><label>Website</label><input type="url" value="www.lojatechangola.ao"/></div>
      <div class="campo-m"><label>Instagram</label><input type="text" value="@lojatechangola"/></div>
      <div class="campo-m"><label>Descrição da Loja</label><textarea rows="3">Loja especializada em tecnologia e electrónicos de alta qualidade em Angola.</textarea></div>
      <div class="g2-m" style="margin-top:6px">
        <button class="btn-full" onclick="fecharTodos()">Cancelar</button>
        <button class="btn-full btn-amar" onclick="salvarPerfil()"><i class="fas fa-save"></i> Guardar</button>
      </div>`
  },

  'painel-produtos': {
    titulo: '<i class="fas fa-bag-shopping"></i> Meus Produtos',
    corpo: () => `
      <div class="stats-linha">
        <div class="stat-bloco"><span class="sb-num">128</span><span class="sb-lbl">Total</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#27ae60">110</span><span class="sb-lbl">Activos</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#e6a817">12</span><span class="sb-lbl">Rascunhos</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#c0392b">6</span><span class="sb-lbl">Esgotados</span></div>
      </div>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-mobile-alt" style="color:#e6a817"></i><div><strong>Smartphone Samsung A14</strong><span>Stock: 15 · 180.000 Kz</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-laptop" style="color:#c0392b"></i><div><strong>Laptop Dell Inspiron 15</strong><span>Stock: 8 · 450.000 Kz</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-headphones" style="color:#e6a817"></i><div><strong>Fones Sony WH-1000XM4</strong><span>Stock: 0 · 180.000 Kz</span></div><span class="b-esgot">Esgotado</span></div>
        <div class="li-item"><i class="fas fa-tablet" style="color:#c0392b"></i><div><strong>Tablet Samsung Tab A8</strong><span>Stock: 22 · 120.000 Kz</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-keyboard" style="color:#e6a817"></i><div><strong>Teclado Logitech MX Keys</strong><span>Stock: 30 · 45.000 Kz</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-tv" style="color:#c0392b"></i><div><strong>Monitor LG 27" 4K</strong><span>Stock: 5 · 320.000 Kz</span></div><span class="b-ativo">Activo</span></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Cadastrar novo produto')"><i class="fas fa-plus"></i> Adicionar Produto</button>`
  },

  'painel-pedidos': {
    titulo: '<i class="fas fa-clipboard-list"></i> Meus Pedidos',
    corpo: () => `
      <div class="stats-linha">
        <div class="stat-bloco"><span class="sb-num">42</span><span class="sb-lbl">Total</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#e6a817">8</span><span class="sb-lbl">Pendentes</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#2980b9">18</span><span class="sb-lbl">Em trânsito</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#27ae60">16</span><span class="sb-lbl">Entregues</span></div>
      </div>
      <div class="lista-md">
        <div class="li-item"><span class="ped-num">#1052</span><div><strong>Smartphone Samsung A14</strong><span>João Silva · 180.000 Kz</span></div><span class="b-pend">Pendente</span></div>
        <div class="li-item"><span class="ped-num">#1051</span><div><strong>Laptop Dell Inspiron</strong><span>Maria Costa · 450.000 Kz</span></div><span class="b-trans">Em trânsito</span></div>
        <div class="li-item"><span class="ped-num">#1050</span><div><strong>Tablet Samsung Tab A8</strong><span>Carlos M. · 120.000 Kz</span></div><span class="b-ativo">Entregue</span></div>
        <div class="li-item"><span class="ped-num">#1049</span><div><strong>Fones Sony XM4</strong><span>Ana L. · 180.000 Kz</span></div><span class="b-ativo">Entregue</span></div>
        <div class="li-item"><span class="ped-num">#1048</span><div><strong>Monitor LG 27"</strong><span>Pedro F. · 320.000 Kz</span></div><span class="b-trans">Em trânsito</span></div>
      </div>
      <button class="btn-full" onclick="mostrarToast('Ver todos os pedidos')">Ver todos os pedidos</button>`
  },

  'painel-financeiro': {
    titulo: '<i class="fas fa-wallet"></i> Financeiro',
    corpo: () => `
      <div class="saldo-box">
        <div style="flex:1"><span class="saldo-lbl">Saldo disponível</span><span class="saldo-val">245.000 Kz</span></div>
        <button class="btn-sacar" onclick="mostrarToast('Solicitação de saque enviada!')"><i class="fas fa-arrow-up"></i> Sacar</button>
      </div>
      <div class="fin-resumo">
        <div class="fin-ln"><span>Receita total (30 dias)</span><span class="fin-v g">2.450.000 Kz</span></div>
        <div class="fin-ln"><span>Taxas da plataforma (5%)</span><span class="fin-v r">-122.500 Kz</span></div>
        <div class="fin-ln"><span>Pendente de liquidação</span><span class="fin-v a">85.000 Kz</span></div>
        <div class="fin-ln"><span>Total de saques realizados</span><span class="fin-v">2.082.500 Kz</span></div>
      </div>
      <p style="font-size:12.5px;color:#888;margin-bottom:12px">Últimas transações</p>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-arrow-down" style="color:#27ae60"></i><div><strong>Venda recebida</strong><span>Pedido #1051 · 450.000 Kz</span></div><span style="font-size:11.5px;color:#555">Hoje</span></div>
        <div class="li-item"><i class="fas fa-arrow-up" style="color:#c0392b"></i><div><strong>Saque realizado</strong><span>Para conta BFA</span></div><span style="font-size:11.5px;color:#555">Ontem</span></div>
        <div class="li-item"><i class="fas fa-arrow-down" style="color:#27ae60"></i><div><strong>Venda recebida</strong><span>Pedido #1050 · 120.000 Kz</span></div><span style="font-size:11.5px;color:#555">2 dias</span></div>
      </div>`
  },

  'painel-avaliacoes': {
    titulo: '<i class="fas fa-star"></i> Avaliações',
    corpo: () => `
      <div class="aval-box">
        <span class="aval-grande">4.8</span>
        <div>
          <div class="estrelas-g">★★★★½</div>
          <span style="font-size:12px;color:#888">128 avaliações</span>
        </div>
      </div>
      <div class="aval-barras">
        <div class="av-bl"><span>5★</span><div class="barra-bg"><div class="barra-fill" style="width:70%;background:#e6a817"></div></div><span>90</span></div>
        <div class="av-bl"><span>4★</span><div class="barra-bg"><div class="barra-fill" style="width:20%;background:#e6a817"></div></div><span>26</span></div>
        <div class="av-bl"><span>3★</span><div class="barra-bg"><div class="barra-fill" style="width:6%;background:#e6a817"></div></div><span>8</span></div>
        <div class="av-bl"><span>2★</span><div class="barra-bg"><div class="barra-fill" style="width:3%;background:#c0392b"></div></div><span>3</span></div>
        <div class="av-bl"><span>1★</span><div class="barra-bg"><div class="barra-fill" style="width:1%;background:#c0392b"></div></div><span>1</span></div>
      </div>
      <div class="lista-md">
        <div class="li-item av-item"><div class="av-av" style="background:#e6a817">C</div><div><strong>Carlos Mendes</strong><span>★★★★★ Excelente loja, produto chegou rápido!</span><span class="notif-t">há 2 dias</span></div></div>
        <div class="li-item av-item"><div class="av-av" style="background:#2980b9">M</div><div><strong>Maria Santos</strong><span>★★★★☆ Muito bom atendimento, recomendo.</span><span class="notif-t">há 5 dias</span></div></div>
        <div class="li-item av-item"><div class="av-av" style="background:#27ae60">J</div><div><strong>João Ferreira</strong><span>★★★★★ Produto de qualidade, chegou antes do prazo!</span><span class="notif-t">há 1 semana</span></div></div>
      </div>`
  },

  'painel-promocoes': {
    titulo: '<i class="fas fa-tag"></i> Promoções e Descontos',
    corpo: () => `
      <div class="promo-box">
        <span class="p-badge">Activa</span>
        <strong>Black Friday Tech</strong>
        <p>20% de desconto em todos os smartphones</p>
        <span class="notif-t">Válida até 30/06/2025</span>
      </div>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-percent" style="color:#e6a817"></i><div><strong>Cupão: TECH10</strong><span>10% desconto · Usado 45x</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-truck" style="color:#27ae60"></i><div><strong>Frete grátis acima de 50.000 Kz</strong><span>Válido para Luanda</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-gift" style="color:#888"></i><div><strong>Compre 2 leve 3</strong><span>Encerrada Mai 2025</span></div><span class="b-inativo">Encerrada</span></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Criar nova promoção')"><i class="fas fa-plus"></i> Nova Promoção</button>`
  },

  'painel-envios': {
    titulo: '<i class="fas fa-truck"></i> Envios',
    corpo: () => `
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-location-dot" style="color:#e6a817"></i><div><strong>Luanda – Entrega expressa</strong><span>1-2 dias úteis · 1.500 Kz</span></div><div class="toggle-sw on" onclick="toggleSw(this)"></div></div>
        <div class="li-item"><i class="fas fa-map" style="color:#c0392b"></i><div><strong>Angola – Entrega padrão</strong><span>5-7 dias úteis · 3.500 Kz</span></div><div class="toggle-sw on" onclick="toggleSw(this)"></div></div>
        <div class="li-item"><i class="fas fa-store" style="color:#e6a817"></i><div><strong>Retirada em loja</strong><span>Disponível 9h–18h · Gratuito</span></div><div class="toggle-sw on" onclick="toggleSw(this)"></div></div>
        <div class="li-item"><i class="fas fa-globe" style="color:#888"></i><div><strong>Envio internacional</strong><span>10-15 dias · Sob consulta</span></div><div class="toggle-sw" onclick="toggleSw(this)"></div></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Região adicionada')"><i class="fas fa-plus"></i> Adicionar Região</button>`
  },

  'painel-info-loja': {
    titulo: '<i class="fas fa-store"></i> Informações da Loja',
    corpo: () => `
      <div class="campo-m"><label>Nome da Loja</label><input type="text" value="Loja Tech Angola"/></div>
      <div class="campo-m"><label>Descrição</label><textarea rows="3">Loja especializada em tecnologia e electrónicos.</textarea></div>
      <div class="campo-m"><label>Horário</label><input type="text" value="Seg–Sex: 08h–18h | Sáb: 08h–13h"/></div>
      <div class="g2-m">
        <div class="campo-m"><label>Website</label><input type="url" value="www.lojatechangola.ao"/></div>
        <div class="campo-m"><label>Instagram</label><input type="text" value="@lojatechangola"/></div>
      </div>
      <div class="g2-m" style="margin-top:6px">
        <button class="btn-full" onclick="fecharTodos()">Cancelar</button>
        <button class="btn-full btn-amar" onclick="mostrarToast('Informações guardadas!')"><i class="fas fa-save"></i> Guardar</button>
      </div>`
  },

  'painel-config': {
    titulo: '<i class="fas fa-cog"></i> Configurações',
    corpo: () => `
      <div>
        <div class="cfg-item" onclick="mostrarToast('Notificações')"><div class="cfg-ico"><i class="fas fa-bell"></i></div><div class="cfg-txt"><strong>Notificações</strong><span>Gerencie alertas e avisos</span></div><i class="fas fa-chevron-right" style="color:#555"></i></div>
        <div class="cfg-item" onclick="mostrarToast('Privacidade')"><div class="cfg-ico"><i class="fas fa-shield-alt"></i></div><div class="cfg-txt"><strong>Privacidade e Segurança</strong><span>Controle acesso à sua loja</span></div><i class="fas fa-chevron-right" style="color:#555"></i></div>
        <div class="cfg-item" onclick="mostrarToast('Idioma')"><div class="cfg-ico"><i class="fas fa-language"></i></div><div class="cfg-txt"><strong>Idioma</strong><span>Português (Angola)</span></div><i class="fas fa-chevron-right" style="color:#555"></i></div>
        <div class="cfg-item" onclick="mostrarToast('Moeda')"><div class="cfg-ico"><i class="fas fa-coins"></i></div><div class="cfg-txt"><strong>Moeda</strong><span>Kwanza (Kz)</span></div><i class="fas fa-chevron-right" style="color:#555"></i></div>
        <div class="cfg-item"><div class="cfg-ico"><i class="fas fa-moon"></i></div><div class="cfg-txt"><strong>Tema escuro</strong><span>Activo</span></div><div class="toggle-sw on" onclick="toggleSw(this)"></div></div>
        <div class="cfg-item red" onclick="mostrarToast('Sessão encerrada')"><div class="cfg-ico"><i class="fas fa-sign-out-alt"></i></div><div class="cfg-txt"><strong>Sair</strong><span>Encerrar sessão</span></div></div>
      </div>`
  },

  'painel-notificacoes': {
    titulo: '<i class="fas fa-bell"></i> Notificações',
    corpo: () => `
      <div>
        <div class="notif-item nova"><div class="notif-ico"><i class="fas fa-box"></i></div><div class="notif-txt"><strong>Novo pedido recebido</strong><p>Pedido #1052 – Smartphone Samsung A14</p><span class="notif-t">há 5 minutos</span></div></div>
        <div class="notif-item nova"><div class="notif-ico"><i class="fas fa-star"></i></div><div class="notif-txt"><strong>Nova avaliação 5 estrelas</strong><p>Carlos M. avaliou com 5 estrelas</p><span class="notif-t">há 1 hora</span></div></div>
        <div class="notif-item"><div class="notif-ico"><i class="fas fa-wallet"></i></div><div class="notif-txt"><strong>Pagamento recebido</strong><p>45.000 Kz creditado na sua carteira</p><span class="notif-t">há 3 horas</span></div></div>
        <div class="notif-item"><div class="notif-ico"><i class="fas fa-tag"></i></div><div class="notif-txt"><strong>Promoção aprovada</strong><p>A sua campanha de desconto foi activada</p><span class="notif-t">ontem</span></div></div>
        <div class="notif-item"><div class="notif-ico"><i class="fas fa-user-plus"></i></div><div class="notif-txt"><strong>Novo seguidor</strong><p>Maria Santos começou a seguir a sua loja</p><span class="notif-t">2 dias atrás</span></div></div>
      </div>
      <button class="btn-full" onclick="mostrarToast('Ver todas')">Ver todas as notificações</button>`
  },

  'painel-mensagens': {
    titulo: '<i class="fas fa-envelope"></i> Mensagens',
    corpo: () => `
      <div class="lista-md">
        <div class="li-item"><div class="seg-av" style="background:#e6a817;color:#111">J</div><div><strong>João Silva</strong><span>Tem o produto em stock? Urgente!</span><span class="notif-t">há 10 min</span></div><span class="b-pend">Nova</span></div>
        <div class="li-item"><div class="seg-av" style="background:#2980b9">M</div><div><strong>Maria Costa</strong><span>Quando chega o meu pedido #1051?</span><span class="notif-t">há 1h</span></div><span class="b-pend">Nova</span></div>
        <div class="li-item"><div class="seg-av" style="background:#27ae60">C</div><div><strong>Carlos Mendes</strong><span>Obrigado pelo excelente serviço!</span><span class="notif-t">ontem</span></div></div>
        <div class="li-item"><div class="seg-av" style="background:#8e44ad">A</div><div><strong>Ana Lima</strong><span>Consegue fazer desconto no laptop?</span><span class="notif-t">2 dias</span></div></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Abrir chat')"><i class="fas fa-comment-dots"></i> Responder mensagens</button>`
  },

  'painel-favoritos': {
    titulo: '<i class="fas fa-heart"></i> Favoritos',
    corpo: () => `
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-mobile-alt" style="color:#e6a817"></i><div><strong>iPhone 15 Pro Max</strong><span>Loja Apple Angola · 980.000 Kz</span></div><i class="fas fa-heart" style="color:#c0392b"></i></div>
        <div class="li-item"><i class="fas fa-headphones" style="color:#c0392b"></i><div><strong>AirPods Pro 2</strong><span>TechShop · 145.000 Kz</span></div><i class="fas fa-heart" style="color:#c0392b"></i></div>
        <div class="li-item"><i class="fas fa-laptop" style="color:#e6a817"></i><div><strong>MacBook Pro 14"</strong><span>Loja Mac Angola · 1.250.000 Kz</span></div><i class="fas fa-heart" style="color:#c0392b"></i></div>
      </div>
      <button class="btn-full" onclick="mostrarToast('Ver todos os favoritos')">Ver todos os favoritos</button>`
  },

  'painel-servicos': {
    titulo: '<i class="fas fa-tools"></i> Serviços',
    corpo: () => `
      <div class="stats-linha">
        <div class="stat-bloco"><span class="sb-num">18</span><span class="sb-lbl">Activos</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#e6a817">4</span><span class="sb-lbl">Pendentes</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#27ae60">2</span><span class="sb-lbl">Concluídos</span></div>
      </div>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-tools" style="color:#e6a817"></i><div><strong>Reparação de smartphones</strong><span>A partir de 5.000 Kz · 4.9★</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-laptop" style="color:#c0392b"></i><div><strong>Configuração de computadores</strong><span>A partir de 8.000 Kz · 4.7★</span></div><span class="b-ativo">Activo</span></div>
        <div class="li-item"><i class="fas fa-wifi" style="color:#e6a817"></i><div><strong>Instalação de redes</strong><span>A partir de 15.000 Kz · 4.8★</span></div><span class="b-ativo">Activo</span></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Adicionar serviço')"><i class="fas fa-plus"></i> Adicionar Serviço</button>`
  },

  'painel-relatorios': {
    titulo: '<i class="fas fa-chart-bar"></i> Relatórios',
    corpo: () => `
      <div class="stats-linha">
        <div class="stat-bloco"><span class="sb-num">2.45M</span><span class="sb-lbl">Receita Kz</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#27ae60">240</span><span class="sb-lbl">Pedidos</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#e6a817">14.8%</span><span class="sb-lbl">Conversão</span></div>
      </div>
      <p style="font-size:12.5px;color:#888;margin-bottom:12px">Origem do tráfego</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        <div class="orig-item"><span>Pesquisa directa</span><div class="barra-bg"><div class="barra-fill" style="width:55%;background:#e6a817"></div></div><span>55%</span></div>
        <div class="orig-item"><span>Categorias</span><div class="barra-bg"><div class="barra-fill" style="width:30%;background:#c0392b"></div></div><span>30%</span></div>
        <div class="orig-item"><span>Promoções</span><div class="barra-bg"><div class="barra-fill" style="width:15%;background:#27ae60"></div></div><span>15%</span></div>
      </div>
      <p style="font-size:12.5px;color:#888;margin-bottom:12px">Produtos mais vendidos</p>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-mobile-alt" style="color:#e6a817"></i><div><strong>Smartphone Samsung A14</strong><span>45 unidades vendidas</span></div><span style="color:#27ae60;font-weight:700">810.000 Kz</span></div>
        <div class="li-item"><i class="fas fa-laptop" style="color:#c0392b"></i><div><strong>Laptop Dell Inspiron 15</strong><span>18 unidades vendidas</span></div><span style="color:#27ae60;font-weight:700">810.000 Kz</span></div>
      </div>
      <button class="btn-full" onclick="mostrarToast('Exportar relatório')"><i class="fas fa-download"></i> Exportar Relatório</button>`
  },

  'painel-seguidores': {
    titulo: '<i class="fas fa-user-group"></i> Seguidores',
    corpo: () => `
      <p style="font-size:13px;color:#888;margin-bottom:14px">1.250 pessoas seguem a sua loja</p>
      <div class="lista-md">
        <div class="li-item"><div class="seg-av" style="background:#2980b9">J</div><div><strong>João Silva</strong><span>Seguidor desde Jan 2025</span></div></div>
        <div class="li-item"><div class="seg-av" style="background:#8e44ad">M</div><div><strong>Maria Santos</strong><span>Seguidor desde Fev 2025</span></div></div>
        <div class="li-item"><div class="seg-av" style="background:#27ae60">C</div><div><strong>Carlos Mendes</strong><span>Seguidor desde Mar 2025</span></div></div>
        <div class="li-item"><div class="seg-av" style="background:#e6a817;color:#111">A</div><div><strong>Ana Ferreira</strong><span>Seguidor desde Mar 2025</span></div></div>
        <div class="li-item"><div class="seg-av" style="background:#c0392b">P</div><div><strong>Paulo Costa</strong><span>Seguidor desde Abr 2025</span></div></div>
      </div>
      <button class="btn-full">Ver todos os seguidores</button>`
  },

  'painel-insights': {
    titulo: '<i class="far fa-eye"></i> Insights & Análises',
    corpo: () => `
      <div class="stats-linha">
        <div class="stat-bloco"><span class="sb-num">25.6K</span><span class="sb-lbl">Visualizações</span></div>
        <div class="stat-bloco"><span class="sb-num">3.8K</span><span class="sb-lbl">Visitas</span></div>
        <div class="stat-bloco"><span class="sb-num" style="color:#e6a817">14.8%</span><span class="sb-lbl">Conversão</span></div>
      </div>
      <p style="font-size:12.5px;color:#888;margin-bottom:12px">Origem do tráfego</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        <div class="orig-item"><span>Pesquisa directa</span><div class="barra-bg"><div class="barra-fill" style="width:55%;background:#e6a817"></div></div><span>55%</span></div>
        <div class="orig-item"><span>Categorias</span><div class="barra-bg"><div class="barra-fill" style="width:30%;background:#c0392b"></div></div><span>30%</span></div>
        <div class="orig-item"><span>Promoções</span><div class="barra-bg"><div class="barra-fill" style="width:15%;background:#27ae60"></div></div><span>15%</span></div>
      </div>
      <div class="lista-md">
        <div class="li-item"><i class="fas fa-mobile-alt" style="color:#e6a817"></i><div><strong>Samsung Galaxy A14</strong><span>4.200 visualizações esta semana</span></div></div>
        <div class="li-item"><i class="fas fa-laptop" style="color:#c0392b"></i><div><strong>Laptop Dell Inspiron 15</strong><span>3.100 visualizações esta semana</span></div></div>
        <div class="li-item"><i class="fas fa-headphones" style="color:#e6a817"></i><div><strong>Fones Sony WH-1000XM4</strong><span>2.800 visualizações esta semana</span></div></div>
      </div>`
  },

  'painel-planos': {
    titulo: '<i class="fas fa-crown"></i> Planos AngoBiz',
    corpo: () => `
      <div class="plano-op">
        <div class="po-h"><span class="po-nm">Básico</span><span class="po-pr">Grátis</span></div>
        <ul class="po-lista"><li>Até 20 produtos</li><li>Suporte padrão</li><li>Relatórios básicos</li></ul>
        <button class="btn-full" onclick="mostrarToast('Já possui plano superior')">Seleccionar</button>
      </div>
      <div class="plano-op dest">
        <div class="po-h"><span class="po-nm">Profissional <i class="fas fa-crown" style="color:#e6a817"></i></span><span class="po-pr">15.000 Kz<small>/mês</small></span></div>
        <span class="po-actual"><i class="fas fa-circle-check"></i> Seu plano actual</span>
        <ul class="po-lista"><li>Produtos ilimitados</li><li>Destaque na busca</li><li>Relatórios avançados</li><li>Suporte prioritário</li></ul>
        <button class="btn-full btn-amar" onclick="mostrarToast('Renovando Plano Profissional...')">Renovar plano</button>
      </div>
      <div class="plano-op">
        <div class="po-h"><span class="po-nm">Empresarial</span><span class="po-pr">45.000 Kz<small>/mês</small></span></div>
        <ul class="po-lista"><li>Tudo do Profissional</li><li>Múltiplas lojas</li><li>API de integração</li><li>Gestor dedicado</li></ul>
        <button class="btn-full" onclick="mostrarToast('Contactando equipa de vendas...')">Falar com vendas</button>
      </div>`
  },

  'painel-ajuda': {
    titulo: '<i class="fas fa-circle-question"></i> Central de Ajuda',
    corpo: () => `
      <div class="campo-m" style="margin-bottom:16px">
        <input type="text" placeholder="Pesquisar na ajuda..." style="background:#1f1f1f"/>
      </div>
      <div>
        <div class="ajuda-item"><div class="aj-ico"><i class="fas fa-box"></i></div><div><strong>Como publicar um produto?</strong><p>Acesse Produtos > Adicionar Produto e preencha as informações.</p></div></div>
        <div class="ajuda-item"><div class="aj-ico"><i class="fas fa-wallet"></i></div><div><strong>Como solicitar um saque?</strong><p>Vá a Financeiro e clique em Sacar. O valor chega em 1-3 dias úteis.</p></div></div>
        <div class="ajuda-item"><div class="aj-ico"><i class="fas fa-truck"></i></div><div><strong>Políticas de envio</strong><p>Gerencie regiões e métodos de entrega em Envios.</p></div></div>
        <div class="ajuda-item"><div class="aj-ico"><i class="fas fa-shield-alt"></i></div><div><strong>Segurança da conta</strong><p>Active a verificação em dois passos nas Configurações.</p></div></div>
      </div>
      <button class="btn-full btn-amar" onclick="mostrarToast('Contactar suporte via WhatsApp')"><i class="fas fa-whatsapp fa-brands"></i> Fale Conosco</button>`
  }
};

// ── ABRIR / FECHAR PAINÉIS ────────────────────────

function abrirPainel(id) {
  const cfg = paineis[id];
  if (!cfg) { mostrarToast('Em desenvolvimento'); return; }

  document.getElementById('ml-titulo').innerHTML = cfg.titulo;
  document.getElementById('ml-corpo').innerHTML  = cfg.corpo();

  document.getElementById('modal-lateral').classList.add('aberto');
  document.getElementById('overlay').classList.add('aberto');

  // Ativar toggles
  document.querySelectorAll('.toggle-sw').forEach(sw => {
    sw.addEventListener('click', function() { toggleSw(this); });
  });
}

function fecharTodos() {
  document.getElementById('modal-lateral').classList.remove('aberto');
  document.getElementById('overlay').classList.remove('aberto');
  document.getElementById('dropPerfil').classList.remove('aberto');
}

// ── SALVAR PERFIL ─────────────────────────────────

function salvarPerfil() {
  const nome = document.getElementById('ed-nome')?.value;
  const cat  = document.getElementById('ed-cat')?.value;
  if (!nome) { mostrarToast('Insira o nome da loja', 'err'); return; }
  document.querySelector('.perfil-nome-linha h1').textContent = nome;
  document.querySelector('.perfil-sub').textContent = cat;
  fecharTodos();
  mostrarToast('Perfil guardado com sucesso!');
}

// ── DROPDOWN PERÍODO ──────────────────────────────

function toggleDropPeriodo() {
  document.getElementById('dropPeriodo').classList.toggle('aberto');
}

function selecionarPeriodo(p) {
  document.getElementById('txtPeriodo').textContent = p;
  document.getElementById('dropPeriodo').classList.remove('aberto');
  mostrarToast(`A carregar: ${p}`);
  setTimeout(desenharGraficos, 300);
}

// ── DROPDOWN PERFIL NAVBAR ────────────────────────

function toggleDropPerfil() {
  document.getElementById('dropPerfil').classList.toggle('aberto');
}

document.addEventListener('click', e => {
  const nv = document.querySelector('.nv-perfil');
  if (nv && !nv.contains(e.target))
    document.getElementById('dropPerfil').classList.remove('aberto');
  const per = document.querySelector('.periodo-wrap');
  if (per && !per.contains(e.target))
    document.getElementById('dropPeriodo').classList.remove('aberto');
});

// ── PESQUISA ──────────────────────────────────────

function pesquisar() {
  const val = document.getElementById('inputBusca').value.trim();
  if (!val) return;
  mostrarToast(`A pesquisar: "${val}"`);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputBusca').addEventListener('keydown', e => {
    if (e.key === 'Enter') pesquisar();
  });
});

// ── TOGGLE SWITCH ─────────────────────────────────

function toggleSw(el) {
  el.classList.toggle('on');
  mostrarToast(el.classList.contains('on') ? 'Activado' : 'Desactivado');
}

// ── CONTADORES ANIMADOS ───────────────────────────

function animarContadores() {
  document.querySelectorAll('.ri-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let atual = 0;
    const passo = Math.ceil(target / 40);
    const timer = setInterval(() => {
      atual = Math.min(atual + passo, target);
      el.textContent = atual.toLocaleString('pt-PT');
      if (atual >= target) clearInterval(timer);
    }, 25);
  });
}

// ── GRÁFICOS MINI ─────────────────────────────────

function gerarDados(n, min, max) {
  const d = Array.from({length:n}, () => min + Math.random() * (max - min));
  d[d.length-1] = d[d.length-2] * (1.15 + Math.random()*.1);
  return d;
}

function desenharGrafico(canvas, dados, cor) {
  if (!canvas) return;
  const W = canvas.offsetWidth || 160;
  const H = canvas.offsetHeight || 52;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const min = Math.min(...dados), max = Math.max(...dados);
  const rng = max - min || 1;
  const pts = dados.map((v, i) => ({
    x: (i / (dados.length-1)) * W,
    y: H - ((v - min) / rng) * H * 0.82 - H * 0.06
  }));
  ctx.clearRect(0,0,W,H);
  // Gradiente
  const g = ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0, cor+'99'); g.addColorStop(1, cor+'00');
  // Área
  ctx.beginPath(); ctx.moveTo(pts[0].x, H); ctx.lineTo(pts[0].x, pts[0].y);
  pts.forEach((p,i) => { if(!i) return; const pr=pts[i-1],cx=(pr.x+p.x)/2; ctx.bezierCurveTo(cx,pr.y,cx,p.y,p.x,p.y); });
  ctx.lineTo(pts[pts.length-1].x, H); ctx.closePath();
  ctx.fillStyle = g; ctx.fill();
  // Linha
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((p,i) => { if(!i) return; const pr=pts[i-1],cx=(pr.x+p.x)/2; ctx.bezierCurveTo(cx,pr.y,cx,p.y,p.x,p.y); });
  ctx.strokeStyle = cor; ctx.lineWidth = 2; ctx.stroke();
  // Ponto final
  const u = pts[pts.length-1];
  ctx.beginPath(); ctx.arc(u.x, u.y, 3, 0, Math.PI*2);
  ctx.fillStyle = cor; ctx.fill();
}

function desenharGraficos() {
  [
    {id:'g-viz', cor:'#c0392b', min:8000,  max:15000},
    {id:'g-vis', cor:'#e6a817', min:2000,  max:5000},
    {id:'g-ped', cor:'#c0392b', min:150,   max:280},
    {id:'g-rec', cor:'#e6a817', min:1500000, max:3000000},
  ].forEach(g => {
    const c = document.getElementById(g.id);
    if (c) desenharGrafico(c, gerarDados(12, g.min, g.max), g.cor);
  });
}

window.addEventListener('resize', () => {
  clearTimeout(window._rt);
  window._rt = setTimeout(desenharGraficos, 200);
});

// ── TOAST ──────────────────────────────────────────

let _tt = null;
function mostrarToast(msg, tipo='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast vis' + (tipo ? ' '+tipo : '');
  clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove('vis'), 3200);
}

// ── INIT ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  animarContadores();
  requestAnimationFrame(() => setTimeout(desenharGraficos, 100));
});
