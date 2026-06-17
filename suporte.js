// =====================================================
//  ANGOBIZ KIVENDA — CHAT DESKTOP — JAVASCRIPT
//  IA com base de conhecimento completa da plataforma
// =====================================================

// ====================================================
//  BASE DE CONHECIMENTO COMPLETA
// ====================================================
const baseConhecimento = [

  // ---- SAUDAÇÕES ----
  {
    gatilhos: ["olá","ola","oi","bom dia","boa tarde","boa noite","hey","hello","hi","tudo bem","como vai","boas","saudações"],
    resposta: () => `Olá! 👋<br>Bem-vindo à <span class="dst-dou">AngoBiz Kivenda</span>!<br><br>
Sou o seu Assistente Virtual e estou aqui para ajudá-lo com qualquer questão sobre a nossa plataforma. 😊<br><br>
Como posso te ajudar hoje?`
  },

  // ---- O QUE É A PLATAFORMA ----
  {
    gatilhos: ["o que é","angobiz","kivenda","plataforma","sobre","apresenta","explica","conhecer","o que faz","como funciona"],
    resposta: () => `<b>AngoBiz Kivenda</b> 🇦🇴 é a <span class="dst-dou">plataforma digital nº1 de negócios em Angola</span>.<br><br>
Permite que você:<br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span><b>Compre</b> produtos e serviços verificados</li>
  <li><span class="ml-dot"></span><b>Venda</b> os seus produtos e serviços online</li>
  <li><span class="ml-dot"></span><b>Conecte-se</b> com vendedores de todo o país</li>
  <li><span class="ml-dot"></span><b>Pague</b> de forma 100% segura e protegida</li>
</ul>
Temos mais de <span class="dst-dou">8.245 produtos</span>, <span class="dst-dou">3.187 serviços</span> e <span class="dst-dou">10.000+ vendedores</span> verificados em todo o país! 🚀`
  },

  // ---- CRIAR CONTA ----
  {
    gatilhos: ["criar conta","criar uma conta","registar","registo","cadastrar","cadastro","como criar","sign up","novo utilizador","novo usuario","abrir conta"],
    resposta: () => `Para criar uma conta na <span class="dst-dou">AngoBiz Kivenda</span>, siga estes passos simples:<br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Aceda a <b>angobizkivenda.ao</b></li>
  <li><span class="ml-dot"></span>Clique em <b>"Criar conta"</b></li>
  <li><span class="ml-dot"></span>Preencha os seus dados pessoais</li>
  <li><span class="ml-dot"></span>Verifique o seu e-mail</li>
  <li><span class="ml-dot"></span>Complete o seu perfil</li>
</ul>
✅ O registo é <span class="dst-dou">completamente gratuito</span> e leva menos de 2 minutos!<br><br>
Quer criar conta como <b>comprador</b> ou como <b>vendedor</b>?`
  },

  // ---- VENDER ----
  {
    gatilhos: ["vender","como vender","começar vender","ser vendedor","vendedor","loja","minha loja","publicar produto","cadastrar produto","quero vender","abrir loja"],
    resposta: () => `Ótimo! Para <span class="dst-dou">vender na AngoBiz Kivenda</span>, você precisa:<br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Criar a sua conta (gratuita)</li>
  <li><span class="ml-dot"></span>Verificar o seu perfil com documentos</li>
  <li><span class="ml-dot"></span>Adicionar os seus produtos ou serviços</li>
  <li><span class="ml-dot"></span>Aguardar aprovação (se necessário)</li>
  <li><span class="ml-dot"></span>Começar a receber pedidos! 🎉</li>
</ul>
Quer que eu te envie o <b>Guia do Vendedor</b> completo? 📖`,
    extra: "guia"
  },

  // ---- GUIA / SIM ----
  {
    gatilhos: ["guia","guia completo","guia do vendedor","sim por favor","sim","quero","enviar guia","envie","sim quero","claro"],
    resposta: () => `Aqui está o guia completo para começar a vender na plataforma. 🚀`,
    extra: "pdf"
  },

  // ---- TAXAS ----
  {
    gatilhos: ["taxa","taxas","comissão","comissao","percentagem","cobra","custo","cobrar","quanto custa","preço plataforma","gratuito"],
    resposta: () => `💡 <b>Taxas da AngoBiz Kivenda:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span><b>Registo:</b> <span class="dst-grn">Gratuito</span></li>
  <li><span class="ml-dot"></span><b>Publicação:</b> <span class="dst-grn">Gratuita</span> (até 10 produtos)</li>
  <li><span class="ml-dot"></span><b>Comissão por venda:</b> <span class="dst-dou">apenas 3%</span> sobre o valor</li>
  <li><span class="ml-dot"></span><b>Plano Premium:</b> Sem comissão + mais visibilidade</li>
  <li><span class="ml-dot"></span><b>Saque:</b> Sem taxa adicional</li>
</ul>
<b>Planos disponíveis:</b><br>
🆓 Básico: Grátis &nbsp;|&nbsp; ⭐ Pro: 5.000 Kz/mês &nbsp;|&nbsp; 💎 Premium: 12.000 Kz/mês`
  },

  // ---- PAGAMENTO ----
  {
    gatilhos: ["pagamento","pagar","formas de pagamento","como pagar","multicaixa","unitel","paypal","transferência","transferencia","cartão","cartao","visa","mastercard","meios de pagamento"],
    resposta: () => `💳 <b>Formas de pagamento aceites:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span><b>Multicaixa Express</b> — pagamento instantâneo</li>
  <li><span class="ml-dot"></span><b>Unitel Money</b> — rápido e prático</li>
  <li><span class="ml-dot"></span><b>Transferência bancária</b> (BAI, BCI, BFA, BIC)</li>
  <li><span class="ml-dot"></span><b>PayPal</b> — pagamentos internacionais</li>
  <li><span class="ml-dot"></span><b>Cartão VISA / Mastercard</b></li>
  <li><span class="ml-dot"></span><b>Carteira AngoBiz</b> — instantâneo e seguro</li>
</ul>
🔒 <span class="dst-dou">Todos os pagamentos são 100% seguros</span> e protegidos pela plataforma.`
  },

  // ---- ENTREGA ----
  {
    gatilhos: ["entrega","entregas","envio","enviar","shipping","delivery","prazo","como funciona entrega","demora","frete","transportadora","despacho"],
    resposta: () => `🚚 <b>Como funciona a entrega:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span><b>Luanda:</b> 24–48 horas (expressa disponível)</li>
  <li><span class="ml-dot"></span><b>Outras províncias:</b> 3–7 dias úteis</li>
  <li><span class="ml-dot"></span><b>Recolha na loja:</b> Disponível em alguns vendedores</li>
  <li><span class="ml-dot"></span><b>Rastreamento:</b> Acompanhe em tempo real na app</li>
</ul>
📦 O custo de entrega é definido por cada vendedor e indicado antes de finalizar a compra.<br><br>
Rastreie a sua encomenda em <i>Painel → Pedidos</i>!`
  },

  // ---- DEVOLUÇÃO ----
  {
    gatilhos: ["devolver","devolução","devolucao","reclamação","reclamacao","reembolso","troca","trocar","produto errado","produto defeituoso","nao chegou","não chegou","política de devolução"],
    resposta: () => `🔄 <b>Política de Devoluções:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span><b>Prazo:</b> Até 7 dias após o recebimento</li>
  <li><span class="ml-dot"></span><b>Produto defeituoso:</b> Devolução gratuita garantida</li>
  <li><span class="ml-dot"></span><b>Produto diferente do anunciado:</b> Troca imediata</li>
  <li><span class="ml-dot"></span><b>Reembolso:</b> Processado em até 5 dias úteis</li>
</ul>
<b>Como solicitar:</b><br>
Aceda a <i>Meus Pedidos → Reportar Problema</i> e a nossa equipa responde em até 24h. ✅`
  },

  // ---- SEGURANÇA ----
  {
    gatilhos: ["seguro","segurança","seguranca","confiavel","confiável","fraude","golpe","protegido","dados","privacidade","é confiável","posso confiar"],
    resposta: () => `🛡️ <b>A sua segurança é a nossa prioridade:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Criptografia <b>SSL/TLS</b> em toda a plataforma</li>
  <li><span class="ml-dot"></span>Todos os vendedores são <b>verificados manualmente</b></li>
  <li><span class="ml-dot"></span>Pagamento <b>retido em custódia</b> até confirmação da entrega</li>
  <li><span class="ml-dot"></span>Proteção contra <b>fraude</b> activa 24 horas por dia</li>
  <li><span class="ml-dot"></span>Dados protegidos pela <b>Política de Privacidade RGPD</b></li>
</ul>
<span class="dst-dou">AngoBiz Kivenda</span> — Compre e venda com total confiança! 🇦🇴`
  },

  // ---- DICAS VENDER MAIS ----
  {
    gatilhos: ["dicas","vender mais","aumentar vendas","melhorar vendas","tips","como vender mais","maximizar","estratégia","estrategia","dicas para vender"],
    resposta: () => `📈 <b>Dicas para vender mais na AngoBiz Kivenda:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>📷 Use <b>fotos de alta qualidade</b> nos produtos</li>
  <li><span class="ml-dot"></span>✍️ Escreva <b>descrições detalhadas e honestas</b></li>
  <li><span class="ml-dot"></span>💰 Mantenha <b>preços competitivos</b> e actualizados</li>
  <li><span class="ml-dot"></span>⭐ Peça avaliações aos clientes satisfeitos</li>
  <li><span class="ml-dot"></span>🏷️ Participe nas <b>promoções</b> da plataforma</li>
  <li><span class="ml-dot"></span>📱 Responda rapidamente às mensagens</li>
  <li><span class="ml-dot"></span>📦 Cumpra os prazos de entrega rigorosamente</li>
  <li><span class="ml-dot"></span>💎 Considere o <b>Plano Premium</b> para mais visibilidade</li>
</ul>`
  },

  // ---- FALAR COM ATENDENTE ----
  {
    gatilhos: ["atendente","atendimento","humano","pessoa","suporte humano","falar com alguém","falar com alguem","agente","ajuda","problema","suporte","falar com atendente"],
    resposta: () => `🎧 <b>Falar com a nossa equipa humana:</b><br><br>
Os nossos atendentes estão disponíveis para o ajudar:<br><br>
📞 <span class="dst-dou">+244 923 456 789</span><br>
📧 <span class="dst-dou">atendimento@angobizkivenda.ao</span><br>
💬 Chat ao vivo em <b>angobizkivenda.ao</b><br><br>
⏰ <b>Horário de atendimento:</b><br>
• Segunda a Sexta: 08h00 – 18h00<br>
• Sábado: 08h00 – 13h00<br><br>
Posso criar um chamado de suporte agora mesmo. Deseja continuar? 📋`
  },

  // ---- MERCADO / CATEGORIAS ----
  {
    gatilhos: ["mercado","categorias","categoria","produtos","que vende","o que tem","o que posso comprar","tipos","o que existe"],
    resposta: () => `🛒 <b>No Mercado AngoBiz encontra:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>📱 Eletrónicos, Telemóveis e Informática</li>
  <li><span class="ml-dot"></span>🏠 Casa, Decoração e Mobiliário</li>
  <li><span class="ml-dot"></span>👗 Moda, Beleza e Saúde</li>
  <li><span class="ml-dot"></span>🚗 Automóveis e Peças</li>
  <li><span class="ml-dot"></span>🔧 Ferramentas e Indústria</li>
  <li><span class="ml-dot"></span>🍎 Alimentação e Bebidas</li>
  <li><span class="ml-dot"></span>💻 Serviços Profissionais e Freelance</li>
  <li><span class="ml-dot"></span>📚 Livros, Papelaria e Educação</li>
</ul>
Mais de <span class="dst-dou">15 categorias</span> e <span class="dst-dou">8.245+ produtos</span> disponíveis! 🎉`
  },

  // ---- PLANOS / PREMIUM ----
  {
    gatilhos: ["premium","plano","planos","upgrade","pro","assinatura","pagar mensalidade","plano premium","plano pro"],
    resposta: () => `👑 <b>Planos AngoBiz Kivenda:</b><br><br>
<b>🆓 Básico — Grátis</b><br>
• Até 10 produtos publicados<br>
• Comissão de 3% por venda<br>
• Suporte por e-mail<br><br>
<b>⭐ Pro — 5.000 Kz/mês</b><br>
• Até 100 produtos<br>
• Comissão reduzida de 2%<br>
• Destaque nas pesquisas<br>
• Suporte prioritário<br><br>
<b>💎 Premium — 12.000 Kz/mês</b><br>
• Produtos <span class="dst-dou">ilimitados</span><br>
• <span class="dst-dou">Sem comissão!</span><br>
• Topo de todas as pesquisas<br>
• Suporte dedicado 24/7<br><br>
Quer experimentar o Premium <span class="dst-dou">gratuitamente por 30 dias</span>? 🎁`
  },

  // ---- VERIFICAÇÃO DE CONTA ----
  {
    gatilhos: ["verificar","verificação","verificacao","documentos","conta verificada","badge","selo","verificado","como verificar"],
    resposta: () => `✅ <b>Como verificar a sua conta:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Aceda a <i>Painel → Perfil → Verificação</i></li>
  <li><span class="ml-dot"></span>Envie o <b>BI ou Passaporte</b> válido</li>
  <li><span class="ml-dot"></span>Comprovativo de morada actualizado</li>
  <li><span class="ml-dot"></span>Para empresas: Certidão comercial e NIF</li>
</ul>
⏱️ Verificação concluída em até <span class="dst-dou">48 horas úteis</span>.<br><br>
Contas verificadas ganham o <span class="dst-dou">badge ✔️</span> e transmitem mais confiança aos compradores!`
  },

  // ---- ACOMPANHAR PEDIDOS ----
  {
    gatilhos: ["pedido","pedidos","compra","comprei","acompanhar","rastrear","onde está","status do pedido","meu pedido","ver pedido"],
    resposta: () => `📦 <b>Como acompanhar os seus pedidos:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Aceda a <i>Painel → Pedidos</i></li>
  <li><span class="ml-dot"></span>Veja o estado do pedido em tempo real</li>
  <li><span class="ml-dot"></span>Receba notificações em cada etapa</li>
  <li><span class="ml-dot"></span>Fale directamente com o vendedor</li>
</ul>
<b>Estados possíveis do pedido:</b><br>
🟡 Aguardando pagamento<br>
🔵 Em processamento<br>
🟠 Enviado / Em trânsito<br>
🟢 Entregue com sucesso<br>
🔴 Cancelado`
  },

  // ---- PASSWORD / LOGIN ----
  {
    gatilhos: ["senha","password","palavra passe","esqueci","login","entrar","aceder","não consigo entrar","nao consigo","esqueci a senha","redefinir senha"],
    resposta: () => `🔑 <b>Problemas com login ou senha:</b><br><br>
<b>Esqueceu a senha?</b><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Clique em <i>"Esqueceu a senha?"</i> na página de login</li>
  <li><span class="ml-dot"></span>Insira o seu e-mail cadastrado</li>
  <li><span class="ml-dot"></span>Verifique o e-mail (incluindo a pasta de spam)</li>
  <li><span class="ml-dot"></span>Crie uma nova senha segura</li>
</ul>
<b>Conta bloqueada ou outro problema?</b><br>
📧 atendimento@angobizkivenda.ao<br>
📞 +244 923 456 789`
  },

  // ---- APP MÓVEL ----
  {
    gatilhos: ["aplicação","app","apk","ios","android","telemóvel","telemovel","download","baixar","play store","app store","aplicativo","instalar"],
    resposta: () => `📱 <b>Aplicação Mobile AngoBiz Kivenda:</b><br><br>
Disponível gratuitamente em:<br><br>
🤖 <b>Android</b> — Google Play Store<br>
🍎 <b>iOS</b> — Apple App Store<br><br>
<span class="dst-dou">Recursos exclusivos da app:</span><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Notificações push em tempo real</li>
  <li><span class="ml-dot"></span>Chat integrado com vendedores</li>
  <li><span class="ml-dot"></span>Pagamento rápido com um toque</li>
  <li><span class="ml-dot"></span>Rastreamento de encomendas ao vivo</li>
  <li><span class="ml-dot"></span>Interface rápida e intuitiva</li>
</ul>
Pesquise <span class="dst-dou">"AngoBiz Kivenda"</span> na sua loja de apps! 🚀`
  },

  // ---- CONTACTOS ----
  {
    gatilhos: ["contacto","contactos","contato","contatos","telefone","email","endereço","endereco","sede","localização","localizacao","onde ficam","redes sociais"],
    resposta: () => `📞 <b>Contacte a AngoBiz Kivenda:</b><br><br>
📱 <span class="dst-dou">+244 923 456 789</span><br>
📧 <span class="dst-dou">atendimento@angobizkivenda.ao</span><br>
🌐 <span class="dst-dou">www.angobizkivenda.ao</span><br><br>
📍 <b>Sede:</b> Rua da Kivenda, Nº 123, Luanda, Angola<br><br>
⏰ <b>Horário:</b><br>
• Segunda a Sexta: 08h00 – 18h00<br>
• Sábado: 08h00 – 13h00<br><br>
🌐 Redes sociais: <b>@angobizkivenda</b> em todas as plataformas`
  },

  // ---- AVALIAÇÕES ----
  {
    gatilhos: ["avaliação","avaliacao","avaliações","avaliacoes","estrelas","nota","classificação","classificacao","reputação","reputacao","comentário"],
    resposta: () => `⭐ <b>Sistema de Avaliações:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Após cada compra, pode <b>avaliar o vendedor</b> com 1 a 5 estrelas</li>
  <li><span class="ml-dot"></span>Deixe um <b>comentário</b> sobre a experiência</li>
  <li><span class="ml-dot"></span>Avaliações são <b>verificadas</b> (só compradores reais)</li>
  <li><span class="ml-dot"></span>Vendedores com melhores notas aparecem <b>no topo</b></li>
</ul>
As avaliações ajudam outros compradores a escolher com confiança. <span class="dst-dou">Avalie sempre!</span> 💪`
  },

  // ---- PROMOÇÕES ----
  {
    gatilhos: ["promoção","promocao","promoções","promocoes","desconto","oferta","oferta especial","cupom","cupão","black friday","liquidação"],
    resposta: () => `🏷️ <b>Promoções na AngoBiz Kivenda:</b><br><br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Aceda à secção <b>PROMOÇÕES</b> no menu principal</li>
  <li><span class="ml-dot"></span>Filtre por categoria e faixa de preço</li>
  <li><span class="ml-dot"></span>Descontos de até <span class="dst-dou">80% em produtos seleccionados</span></li>
  <li><span class="ml-dot"></span>Campanhas especiais: Black Friday, Natal, Páscoa</li>
</ul>
💡 Dica: Ative as <b>notificações</b> para não perder nenhuma promoção!<br><br>
Quer que eu lhe mostre as promoções actuais?`
  },

  // ---- AGRADECIMENTOS ----
  {
    gatilhos: ["obrigado","obrigada","valeu","muito obrigado","thanks","agradeço","agradecer","bom","excelente","ótimo","fixe","perfeito","muito bom","incrível"],
    resposta: () => `😊 De nada! Fico feliz em ter ajudado!<br><br>
Se tiver mais alguma dúvida sobre a <span class="dst-dou">AngoBiz Kivenda</span>, estarei sempre aqui para ajudar. 🙏<br><br>
<b>Bons negócios e muito sucesso!</b> 🚀🇦🇴`
  },

  // ---- DESPEDIDA ----
  {
    gatilhos: ["tchau","adeus","até logo","ate logo","até mais","ate mais","xau","bye","sair","encerrar"],
    resposta: () => `👋 Até logo!<br><br>
Foi um prazer ajudá-lo hoje. Volte sempre que precisar!<br><br>
<span class="dst-dou">AngoBiz Kivenda</span><br>
<i>Conectando negócios, inovação e crescimento.</i> 🇦🇴`
  }
];

// ====================================================
//  EMOJIS DO PICKER
// ====================================================
const emojis = [
  "😊","😄","😂","🤣","😍","🥰","😎","🤔","😅","🙏",
  "👍","👋","🤝","💪","✅","❤️","🔥","⭐","💡","🚀",
  "💼","📦","🛒","💰","💳","🏆","📱","💻","🔧","⚡",
  "🇦🇴","🎉","🎁","📋","📞","📧","🌐","🔒","🛡️","📈"
];

// ====================================================
//  ESTADO GLOBAL
// ====================================================
let emEspera    = false;
let numMsgs     = 0;

// ====================================================
//  UTILITÁRIOS
// ====================================================
function horaActual() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function escapeHtml(t) {
  return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function scrollFundo() {
  const a = document.getElementById("chatMsgs");
  setTimeout(() => { a.scrollTop = a.scrollHeight; }, 60);
}

// ====================================================
//  RENDERIZAR EMOJI PICKER
// ====================================================
function renderizarEmojis() {
  const grid = document.getElementById("emojiGrid");
  if (!grid) return;
  grid.innerHTML = emojis.map(e =>
    `<span onclick="inserirEmoji('${e}')">${e}</span>`
  ).join("");
}

// ====================================================
//  CRIAR MENSAGEM DO BOT
// ====================================================
function criarMsgBot(html, hora, extra) {
  const row = document.createElement("div");
  row.className = "msg-row bot";

  let extraHtml = "";

  // Card PDF
  if (extra === "pdf") {
    extraHtml = `
      <div class="pdf-card" onclick="mostrarToast('📄 Guia do Vendedor — a descarregar...')">
        <div class="pdf-ico">PDF</div>
        <div>
          <div class="pdf-nome">Guia do Vendedor</div>
          <div class="pdf-marca">AngoBiz Kivenda</div>
          <div class="pdf-info">2.4 MB • PDF</div>
        </div>
        <i class="fas fa-download pdf-dl"></i>
      </div>`;
  }

  // Botão sugestão "Sim quero guia"
  if (extra === "guia") {
    extraHtml = `
      <button onclick="enviarSugestao('Sim, por favor!')" style="
        display:inline-flex;align-items:center;gap:7px;margin-top:10px;
        background:rgba(224,168,24,.12);border:1px solid var(--dou);
        color:var(--dou);padding:8px 18px;border-radius:18px;
        font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;
        transition:background .2s;
      " onmouseover="this.style.background='rgba(224,168,24,.22)'"
         onmouseout="this.style.background='rgba(224,168,24,.12)'">
        <i class='fas fa-book'></i> Sim, enviar guia!
      </button>`;
  }

  row.innerHTML = `
    <div class="msg-av">
      <div class="av-logo">
        <span class="av-a">A</span><span class="av-k">K</span>
      </div>
    </div>
    <div>
      <div class="msg-bubble">${html}${extraHtml}</div>
      <div class="msg-meta">${hora}</div>
    </div>`;

  return row;
}

// ====================================================
//  CRIAR MENSAGEM DO UTILIZADOR
// ====================================================
function criarMsgUser(texto, hora) {
  const row = document.createElement("div");
  row.className = "msg-row user";
  row.innerHTML = `
    <div>
      <div class="msg-bubble">${escapeHtml(texto)}</div>
      <div class="msg-meta">
        ${hora}
        <span class="checks lido"><i class="fas fa-check-double"></i></span>
      </div>
    </div>`;
  return row;
}

// ====================================================
//  TYPING INDICATOR
// ====================================================
function mostrarTyping() {
  const row = document.createElement("div");
  row.className = "typing-row";
  row.id = "typingRow";
  row.innerHTML = `
    <div class="msg-av">
      <div class="av-logo">
        <span class="av-a">A</span><span class="av-k">K</span>
      </div>
    </div>
    <div class="typing-bubble">
      <div class="td"></div>
      <div class="td"></div>
      <div class="td"></div>
    </div>`;
  document.getElementById("chatMsgs").appendChild(row);
  scrollFundo();
}

function esconderTyping() {
  document.getElementById("typingRow")?.remove();
}

// ====================================================
//  ADICIONAR MENSAGEM
// ====================================================
function adicionarMsg(el) {
  document.getElementById("chatMsgs").appendChild(el);
  scrollFundo();
  numMsgs++;
}

// ====================================================
//  ENCONTRAR MELHOR RESPOSTA
// ====================================================
function encontrarResposta(texto) {
  const norm = texto.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s]/g," ").trim();

  let melhor = null;
  let maxScore = 0;

  for (const item of baseConhecimento) {
    for (const g of item.gatilhos) {
      const gNorm = g.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      if (norm.includes(gNorm)) {
        const score = gNorm.length;
        if (score > maxScore) { maxScore = score; melhor = item; }
      }
    }
  }

  if (melhor) return melhor;

  // Fallback
  return {
    resposta: () => `Hmm, não tenho a certeza de ter compreendido a sua pergunta. 🤔<br><br>
Posso ajudá-lo com:<br>
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Como criar conta</li>
  <li><span class="ml-dot"></span>Como vender na plataforma</li>
  <li><span class="ml-dot"></span>Formas de pagamento</li>
  <li><span class="ml-dot"></span>Entregas e devoluções</li>
  <li><span class="ml-dot"></span>Taxas e planos</li>
</ul>
Tente reformular a sua pergunta ou use as sugestões abaixo. 😊`,
    extra: null
  };
}

// ====================================================
//  ENVIAR MENSAGEM
// ====================================================
function enviarMsg() {
  if (emEspera) return;
  const campo = document.getElementById("campoMsg");
  const texto = campo.value.trim();
  if (!texto) return;

  campo.value = "";
  fecharTodos();

  const hora = horaActual();
  adicionarMsg(criarMsgUser(texto, hora));
  processarResposta(texto);
}

// ====================================================
//  SUGESTÃO CLICADA
// ====================================================
function enviarSugestao(texto) {
  if (emEspera) return;
  fecharTodos();
  const hora = horaActual();
  adicionarMsg(criarMsgUser(texto, hora));
  processarResposta(texto);
}

// ====================================================
//  PROCESSAR RESPOSTA IA
// ====================================================
function processarResposta(texto) {
  emEspera = true;
  const item  = encontrarResposta(texto);
  const delay = 800 + Math.random() * 1400;

  mostrarTyping();

  setTimeout(() => {
    esconderTyping();
    const hora  = horaActual();
    const html  = item.resposta();
    const extra = item.extra || null;
    adicionarMsg(criarMsgBot(html, hora, extra));

    // Se for PDF, adiciona texto após o card
    if (extra === "pdf") {
      setTimeout(() => {
        adicionarMsg(criarMsgBot(
          "Aqui está o guia completo para começar a vender na plataforma. 🚀",
          hora, null
        ));
      }, 400);
    }

    emEspera = false;
  }, delay);
}

// ====================================================
//  TECLA ENTER
// ====================================================
function teclaInput(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarMsg();
  }
}

function mudouInput() {
  // reservado para future typing indicator
}

// ====================================================
//  EMOJI PICKER
// ====================================================
function toggleEmoji() {
  const p = document.getElementById("emojiPicker");
  p.classList.toggle("aberto");
  fecharDrop("dropAnexo");
  fecharDrop("dropOpcoes");
}

function inserirEmoji(emoji) {
  const c = document.getElementById("campoMsg");
  const pos = c.selectionStart;
  c.value = c.value.slice(0,pos) + emoji + c.value.slice(pos);
  c.focus();
  c.setSelectionRange(pos+emoji.length, pos+emoji.length);
}

// ====================================================
//  DROPS
// ====================================================
function toggleDropOpcoes() {
  const d = document.getElementById("dropOpcoes");
  d.classList.toggle("aberto");
  fecharDrop("dropAnexo");
  document.getElementById("emojiPicker").classList.remove("aberto");
}

function toggleDropAnexo() {
  const d = document.getElementById("dropAnexo");
  d.classList.toggle("aberto");
  fecharDrop("dropOpcoes");
  document.getElementById("emojiPicker").classList.remove("aberto");
}

function fecharDrop(id) {
  document.getElementById(id)?.classList.remove("aberto");
}

function fecharTodos() {
  fecharDrop("dropOpcoes");
  fecharDrop("dropAnexo");
  document.getElementById("emojiPicker")?.classList.remove("aberto");
}

// Fechar ao clicar fora
document.addEventListener("click", function(e) {
  if (!e.target.closest("#dropOpcoes") && !e.target.closest("#btnMaisOpcoes"))
    fecharDrop("dropOpcoes");
  if (!e.target.closest(".btn-mais-wrap"))
    fecharDrop("dropAnexo");
  if (!e.target.closest(".emoji-wrap"))
    document.getElementById("emojiPicker")?.classList.remove("aberto");
  if (!e.target.closest(".painel-info") && !e.target.closest(".header-esq")) {
    fecharPainelInfo();
  }
});

// ====================================================
//  LIMPAR CHAT
// ====================================================
function limparChat() {
  const area = document.getElementById("chatMsgs");
  area.innerHTML = `
    <div class="data-div">
      <span>Hoje</span>
    </div>`;
  numMsgs = 0;
  mostrarToast("🗑️ Conversa limpa!");

  setTimeout(() => {
    adicionarMsg(criarMsgBot(
      `Olá! 👋 Bem-vindo de volta à <span class="dst-dou">AngoBiz Kivenda</span>!<br><br>
      Como posso te ajudar hoje?`,
      horaActual(), null
    ));
  }, 400);
}

// ====================================================
//  EXPORTAR CHAT
// ====================================================
function exportarChat() {
  const msgs = document.querySelectorAll(".msg-row");
  let conteudo = "=== Chat AngoBiz Kivenda ===\n";
  conteudo += `Exportado em: ${new Date().toLocaleString("pt-PT")}\n\n`;

  msgs.forEach(row => {
    const tipo = row.classList.contains("user") ? "Você" : "AngoBiz";
    const hora = row.querySelector(".msg-meta")?.textContent?.trim() || "";
    const txt  = row.querySelector(".msg-bubble")?.innerText?.trim() || "";
    if (txt) conteudo += `[${hora}] ${tipo}:\n${txt}\n\n`;
  });

  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `chat-angobiz-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  mostrarToast("📥 Chat exportado com sucesso!");
}

// ====================================================
//  PAINEL INFO
// ====================================================
function togglePainelInfo() {
  const p = document.getElementById("painelInfo");
  const o = document.getElementById("painelOverlay");
  const aberto = p.classList.contains("aberto");
  if (aberto) { fecharPainelInfo(); }
  else { p.classList.add("aberto"); o.classList.add("vis"); }
}

function fecharPainelInfo() {
  document.getElementById("painelInfo")?.classList.remove("aberto");
  document.getElementById("painelOverlay")?.classList.remove("vis");
}

// ====================================================
//  TOAST
// ====================================================
let _tt;
function mostrarToast(msg) {
  const el = document.getElementById("toastGlobal");
  el.textContent = msg;
  el.classList.add("vis");
  clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove("vis"), 3000);
}

// ====================================================
//  INICIALIZAR
// ====================================================
document.addEventListener("DOMContentLoaded", function() {

  // Renderizar emojis
  renderizarEmojis();

  // Separador de data
  const area = document.getElementById("chatMsgs");
  const sep  = document.createElement("div");
  sep.className = "data-div";
  sep.innerHTML = "<span>Hoje</span>";
  area.appendChild(sep);

  // ---- Mensagem inicial do bot ----
  adicionarMsg(criarMsgBot(
    `Olá! 👋<br>Bem-vindo à <span class="dst-dou">AngoBiz Kivenda</span>!<br><br>Como posso te ajudar hoje?`,
    "10:30", null
  ));

  // ---- Mensagem do utilizador ----
  setTimeout(() => {
    adicionarMsg(criarMsgUser(
      "Gostaria de mais informações sobre como vender na plataforma.",
      "10:31"
    ));
  }, 600);

  // ---- Resposta do bot com lista ----
  setTimeout(() => {
    mostrarTyping();
    setTimeout(() => {
      esconderTyping();
      adicionarMsg(criarMsgBot(`Claro! 😀<br>
Para vender na AngoBiz Kivenda, você precisa:
<ul class="msg-ul">
  <li><span class="ml-dot"></span>Criar sua conta ou fazer login</li>
  <li><span class="ml-dot"></span>Verificar seu perfil</li>
  <li><span class="ml-dot"></span>Adicionar seus produtos ou serviços</li>
  <li><span class="ml-dot"></span>Aguardar aprovação (se necessário)</li>
</ul>
Quer que eu te envie um guia completo?`,
        "10:32", "guia"
      ));
    }, 1400);
  }, 1200);

  // ---- Utilizador: "Sim por favor" ----
  setTimeout(() => {
    adicionarMsg(criarMsgUser("Sim, por favor!", "10:33"));
  }, 3200);

  // ---- Bot com PDF ----
  setTimeout(() => {
    mostrarTyping();
    setTimeout(() => {
      esconderTyping();
      adicionarMsg(criarMsgBot(
        "Aqui está o guia completo para começar a vender na plataforma. 🚀",
        "10:33", "pdf"
      ));
    }, 1200);
  }, 3800);

});
