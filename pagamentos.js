// =====================================================
//  ANGOBIZ KIVENDA — PAGAMENTOS — JAVASCRIPT
//  Dados, Renderização, Modais, Interações
// =====================================================

// ---- DADOS: RESUMO FINANCEIRO ----
const resumoFinanceiro = [
  {
    label:  "Saldo disponível",
    valor:  "AOA 218.450,00",
    classe: "verde",
    desc:   "Disponível para saque",
    icone:  "fas fa-wallet",
    info:   true
  },
  {
    label:  "A receber",
    valor:  "AOA 126.300,00",
    classe: "azul",
    desc:   "Em processamento",
    icone:  "fas fa-clock",
    info:   true
  },
  {
    label:  "Total recebido",
    valor:  "AOA 2.845.600,00",
    classe: "roxo",
    desc:   "Últimos 30 dias",
    icone:  "fas fa-chart-line",
    info:   true
  },
  {
    label:  "Total de saques",
    valor:  "AOA 2.627.150,00",
    classe: "laranja",
    desc:   "Últimos 30 dias",
    icone:  "fas fa-credit-card",
    info:   true
  }
];

// ---- DADOS: MÉTODOS DE PAGAMENTO ----
const metodosPagamento = [
  {
    id:      1,
    logo:    "BAI",
    classe:  "ml-bai",
    nome:    "BAI – Banco Angolano de Investimentos",
    sub:     "Conta: 0006 1234 5678 9012 3456 7",
    padrao:  true,
    verific: true
  },
  {
    id:      2,
    logo:    '<i class="fas fa-university"></i>',
    classe:  "ml-bci",
    nome:    "BCI – Banco de Comércio e Indústria",
    sub:     "Conta: 0010 9876 5432 1098 7654 3",
    padrao:  false,
    verific: true
  },
  {
    id:      3,
    logo:    "P",
    classe:  "ml-paypal",
    nome:    "PayPal",
    sub:     "joaomanuel@email.com",
    padrao:  false,
    verific: true
  },
  {
    id:      4,
    logo:    '<i class="fas fa-wallet"></i>',
    classe:  "ml-carteira",
    nome:    "Carteira AngoBiz",
    sub:     "Saldo: AOA 15.750,00",
    padrao:  false,
    verific: true
  }
];

// ---- DADOS: TRANSAÇÕES ----
const transacoes = [
  {
    data:    "20/05/2024 14:35",
    descNome:"Pagamento do pedido #12345",
    descSub: "Cliente: Carlos Silva",
    tipo:    "Recebimento",
    tipoDir: "entrada",
    status:  "Concluído",
    valor:   "+ AOA 25.000,00",
    valorDir:"positivo"
  },
  {
    data:    "19/05/2024 10:22",
    descNome:"Saque para BAI",
    descSub: "Conta: **** 3456",
    tipo:    "Saque",
    tipoDir: "saida",
    status:  "Concluído",
    valor:   "- AOA 120.000,00",
    valorDir:"negativo"
  },
  {
    data:    "18/05/2024 16:45",
    descNome:"Pagamento do pedido #12344",
    descSub: "Cliente: Ana Costa",
    tipo:    "Recebimento",
    tipoDir: "entrada",
    status:  "Concluído",
    valor:   "+ AOA 15.500,00",
    valorDir:"positivo"
  },
  {
    data:    "17/05/2024 09:18",
    descNome:"Taxa de serviço",
    descSub: "Referente a pedidos concluídos",
    tipo:    "Taxa",
    tipoDir: "taxa",
    status:  "Concluído",
    valor:   "- AOA 3.250,00",
    valorDir:"negativo"
  },
  {
    data:    "16/05/2024 11:30",
    descNome:"Pagamento do pedido #12343",
    descSub: "Cliente: Pedro Lucas",
    tipo:    "Recebimento",
    tipoDir: "entrada",
    status:  "Concluído",
    valor:   "+ AOA 42.000,00",
    valorDir:"positivo"
  }
];

// ---- DADOS: SAQUES RECENTES ----
const saquesRecentes = [
  { data: "15/05/2024", dest: "Para BAI **** 3456", valor: "AOA 120.000,00", status: "Concluído" },
  { data: "05/05/2024", dest: "Para BCI **** 7654", valor: "AOA 80.000,00",  status: "Concluído" },
  { data: "25/04/2024", dest: "Para BAI **** 3456", valor: "AOA 150.000,00", status: "Concluído" },
  { data: "15/04/2024", dest: "Para BCI **** 7654", valor: "AOA 90.000,00",  status: "Concluído" }
];

// ---- DADOS: INFORMAÇÕES IMPORTANTES ----
const infosImportantes = [
  {
    icone:   "fas fa-clock",
    classe:  "azul",
    titulo:  "Prazos para recebimento",
    desc:    "Recebimentos via carteira AngoBiz são instantâneos. Transferências bancárias: até 1 dia útil.",
    link:    null
  },
  {
    icone:   "fas fa-percent",
    classe:  "laranja",
    titulo:  "Taxas",
    desc:    "Cobramos uma taxa de 3% sobre cada transação realizada na plataforma.",
    link:    "Ver todas as taxas"
  },
  {
    icone:   "fas fa-question-circle",
    classe:  "roxo",
    titulo:  "Dúvidas?",
    desc:    "Entre em contato com nosso suporte financeiro.",
    link:    "Abrir chamado"
  }
];

// ====================================================
//  RENDERIZAR RESUMO FINANCEIRO
// ====================================================
function renderizarResumo() {
  const grid = document.getElementById("resumoGrid");
  if (!grid) return;

  grid.innerHTML = resumoFinanceiro.map(r => `
    <div class="res-card">
      <div class="res-label">
        ${r.label}
        ${r.info ? '<i class="fas fa-info-circle" title="Informação"></i>' : ""}
      </div>
      <div class="res-valor-area">
        <div class="res-valor ${r.classe}">${r.valor}</div>
        <div class="res-ico ${r.classe}">
          <i class="${r.icone}"></i>
        </div>
      </div>
      <div class="res-desc">${r.desc}</div>
    </div>
  `).join("");
}

// ====================================================
//  RENDERIZAR MÉTODOS DE PAGAMENTO
// ====================================================
function renderizarMetodos() {
  const lista = document.getElementById("metodosList");
  if (!lista) return;

  lista.innerHTML = metodosPagamento.map(m => `
    <div class="metodo-item" id="metodo-${m.id}">
      <div class="metodo-logo ${m.classe}">${m.logo}</div>
      <div class="metodo-info">
        <div class="metodo-nome">${m.nome}</div>
        <div class="metodo-sub">${m.sub}</div>
      </div>
      <div class="metodo-badges">
        ${m.padrao  ? '<span class="badge-padrao">Padrão</span>' : ""}
        ${m.verific ? '<span class="badge-verific">Verificada</span>' : ""}
      </div>
      <button class="btn-opcoes" onclick="abrirModal('modalOpcoes')" title="Opções">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>
  `).join("");
}

// ====================================================
//  RENDERIZAR TABELA DE TRANSAÇÕES
// ====================================================
function renderizarTransacoes() {
  const tbody = document.getElementById("tbodyTrans");
  if (!tbody) return;

  const iconesTipo = {
    entrada: "fas fa-arrow-down",
    saida:   "fas fa-arrow-up",
    taxa:    "fas fa-arrow-up"
  };

  tbody.innerHTML = transacoes.map(t => `
    <tr>
      <td class="td-data">${t.data}</td>
      <td>
        <div class="td-desc-nome">${t.descNome}</div>
        <div class="td-desc-sub">${t.descSub}<    /div>
      </td>
      <td>
        <span class="td-tipo ${t.tipoDir}">
          ${t.tipo} <i class="${iconesTipo[t.tipoDir]}"></i>
        </span>
      </td>
      <td><span class="badge-status">${t.status}</span></td>
      <td class="td-valor ${t.valorDir}">${t.valor}</td>
    </tr>
  `).join("");
}

// ====================================================
//  RENDERIZAR SAQUES RECENTES
// ====================================================
function renderizarSaques() {
  const lista = document.getElementById("saquesList");
  if (!lista) return;

  lista.innerHTML = saquesRecentes.map(s => `
    <div class="saque-item">
      <div class="saque-data">${s.data}</div>
      <div class="saque-dest">${s.dest}</div>
      <div class="saque-valor">${s.valor}</div>
      <span class="saque-badge">${s.status}</span>
    </div>
  `).join("");
}

// ====================================================
//  RENDERIZAR INFORMAÇÕES IMPORTANTES
// ====================================================
function renderizarInfos() {
  const lista = document.getElementById("infosList");
  if (!lista) return;

  lista.innerHTML = infosImportantes.map(info => `
    <div class="info-item">
      <div class="info-ico ${info.classe}">
        <i class="${info.icone}"></i>
      </div>
      <div>
        <div class="info-titulo">${info.titulo}</div>
        <div class="info-desc">${info.desc}</div>
        ${info.link
          ? `<span class="info-link" onclick="mostrarToast('A abrir: ${info.link}...')">${info.link}</span>`
          : ""}
      </div>
    </div>
  `).join("");
}

// ====================================================
//  MODAIS
// ====================================================
function abrirModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add("aberto"); document.body.style.overflow = "hidden"; }
}

function fecharModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove("aberto"); document.body.style.overflow = ""; }
}

// Fechar ao clicar no overlay
document.querySelectorAll(".modal-overlay").forEach(m => {
  m.addEventListener("click", function (e) {
    if (e.target === this) fecharModal(this.id);
  });
});

// Fechar com ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape")
    document.querySelectorAll(".modal-overlay.aberto").forEach(m => fecharModal(m.id));
});

// ====================================================
//  CONFIRMAR SAQUE
// ====================================================
function confirmarSaque() {
  const conta = document.getElementById("contaSaque").value;
  const valor = parseFloat(document.getElementById("valorSaque").value);
  const erroEl = document.getElementById("erroSaque");

  // Validações
  if (!conta) {
    mostrarToast("Selecione uma conta de destino.", "erro");
    return;
  }

  if (!valor || isNaN(valor)) {
    erroEl.textContent = "Informe o valor a sacar.";
    return;
  }

  if (valor < 1000) {
    erroEl.textContent = "Valor mínimo: AOA 1.000,00";
    return;
  }

  if (valor > 218450) {
    erroEl.textContent = "Valor excede o saldo disponível.";
    return;
  }

  erroEl.textContent = "";

  // Simula saque bem-sucedido
  fecharModal("modalSaque");
  mostrarToast(`✅ Saque de AOA ${valor.toLocaleString("pt-PT")},00 solicitado com sucesso!`);

  // Adiciona na lista de saques (simulação)
  const hoje = new Date();
  const dataStr = `${String(hoje.getDate()).padStart(2,"0")}/${String(hoje.getMonth()+1).padStart(2,"0")}/${hoje.getFullYear()}`;
  const destLabel = document.getElementById("contaSaque").options[document.getElementById("contaSaque").selectedIndex].text;

  saquesRecentes.unshift({
    data:   dataStr,
    dest:   `Para ${destLabel.split(" – ")[0]} ${destLabel.includes("****") ? "****" + destLabel.split("****")[1]?.split(")")[0] || "" : ""}`,
    valor:  `AOA ${valor.toLocaleString("pt-PT")},00`,
    status: "Em processamento"
  });

  if (saquesRecentes.length > 4) saquesRecentes.pop();
  renderizarSaques();

  // Limpar campos
  document.getElementById("contaSaque").value  = "";
  document.getElementById("valorSaque").value  = "";
  document.getElementById("descSaque").value   = "";
}

// ====================================================
//  ADICIONAR CONTA
// ====================================================
function adicionarConta() {
  const tipo   = document.getElementById("tipoConta").value;
  const nome   = document.getElementById("nomeTitular").value.trim();
  const num    = document.getElementById("numConta").value.trim();
  const padrao = document.getElementById("chkPadrao").checked;

  if (!tipo) { mostrarToast("Selecione o tipo de conta.", "erro"); return; }
  if (!nome) { mostrarToast("Informe o nome do titular.", "erro"); return; }
  if (!num)  { mostrarToast("Informe o número de conta.", "erro"); return; }

  // Adiciona ao array
  const novaId = metodosPagamento.length + 1;
  const tipoNomes = { banco: "Banco", paypal: "PayPal", carteira: "Carteira AngoBiz" };

  metodosPagamento.push({
    id:      novaId,
    logo:    tipoNomes[tipo]?.charAt(0) || "B",
    classe:  "ml-bai",
    nome:    `${tipoNomes[tipo]} – ${nome}`,
    sub:     `Conta: ${num}`,
    padrao:  padrao,
    verific: false
  });

  // Se definido como padrão, remove dos outros
  if (padrao) {
    metodosPagamento.forEach((m, i) => {
      if (i !== metodosPagamento.length - 1) m.padrao = false;
    });
  }

  renderizarMetodos();
  fecharModal("modalConta");
  mostrarToast("✅ Conta adicionada com sucesso!");

  // Limpar campos
  document.getElementById("tipoConta").value    = "";
  document.getElementById("nomeTitular").value  = "";
  document.getElementById("numConta").value     = "";
  document.getElementById("chkPadrao").checked  = false;
}

// ====================================================
//  TOAST DE NOTIFICAÇÃO
// ====================================================
let _timerToast;
function mostrarToast(msg, tipo) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className   = "toast";
  if (tipo === "erro") el.classList.add("erro");
  el.classList.add("visivel");
  clearTimeout(_timerToast);
  _timerToast = setTimeout(() => el.classList.remove("visivel"), 3200);
}

// ====================================================
//  SIDEBAR
// ====================================================
document.getElementById("btnMenuHd")?.addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("aberta");
});

// Expansível financeiro
const navFin  = document.getElementById("navFin");
const subFin  = document.getElementById("subFin");
const setaFin = document.getElementById("setaFin");

navFin?.addEventListener("click", function (e) {
  e.preventDefault();
  const aberto = subFin.style.display !== "none";
  subFin.style.display  = aberto ? "none" : "block";
  setaFin.className     = "fas ni-seta " + (aberto ? "fa-chevron-down" : "fa-chevron-up");
});

// Navegação geral
document.querySelectorAll(".ni[data-p]").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.id === "navFin") return;
    document.querySelectorAll(".ni").forEach(i => i.classList.remove("ativo"));
    this.classList.add("ativo");
    if (window.innerWidth < 900)
      document.getElementById("sidebar")?.classList.remove("aberta");
    mostrarToast("A navegar para: " + (this.querySelector("span")?.textContent || ""));
  });
});

document.querySelectorAll(".ni-si").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".ni-si").forEach(i => i.classList.remove("ativo-si"));
    this.classList.add("ativo-si");
    mostrarToast("A navegar para: " + this.textContent.trim());
  });
});

// ====================================================
// 2. DROPDOWN DO PERFIL NO HEADER
// ====================================================
document.getElementById("perfilHd")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("perfilDropdown").classList.toggle("aberto");
});

document.addEventListener("click", () => {
  document.getElementById("perfilDropdown")?.classList.remove("aberto");
});


// ====================================================
//  TOOLTIPS NOS ÍCONES INFO DO RESUMO
// ====================================================
const tooltipsMsgs = [
  "Saldo disponível para saque imediato.",
  "Valores em processamento, serão liberados em breve.",
  "Total recebido nos últimos 30 dias.",
  "Total sacado nos últimos 30 dias."
];

function configurarTooltipsResumo() {
  document.querySelectorAll(".res-label i").forEach((ic, i) => {
    ic.addEventListener("click", () => mostrarToast(tooltipsMsgs[i] || "Informação."));
  });
}

// ====================================================
//  INICIALIZAR
// ====================================================
document.addEventListener("DOMContentLoaded", function () {
  // Submenu financeiro aberto por padrão
  if (subFin) subFin.style.display = "block";

  renderizarResumo();
  renderizarMetodos();
  renderizarTransacoes();
  renderizarSaques();
  renderizarInfos();

  // Configurar tooltips após renderização
  setTimeout(configurarTooltipsResumo, 100);
});
