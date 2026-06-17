// =====================================================
//  ANGOBIZ KIVENDA — DENUNCIAR — JAVASCRIPT
//  Formulário, Validação, Upload, Dropdowns, Modais
// =====================================================

// ---- CONTADOR DE CARACTERES ----
function contarChars(el, idCnt, max) {
  const n = el.value.length;
  document.getElementById(idCnt).textContent = n + "/" + max;
}

// ====================================================
//  SELEÇÃO DO TIPO DE DENÚNCIA
// ====================================================
document.querySelectorAll(".tipo-card").forEach(card => {
  card.addEventListener("click", function () {
    // Remove ativo de todos
    document.querySelectorAll(".tipo-card").forEach(c => c.classList.remove("ativo"));
    // Marca o clicado
    this.classList.add("ativo");
    // Marca o radio interno
    const radio = this.querySelector("input[type='radio']");
    if (radio) radio.checked = true;
  });
});

// ====================================================
//  DROPDOWN: CATEGORIAS DE BUSCA
// ====================================================
const buscaCat    = document.getElementById("buscaCat");
const catDropdown = document.getElementById("catDropdown");

buscaCat?.addEventListener("click", function (e) {
  e.stopPropagation();
  catDropdown.classList.toggle("aberto");
  document.getElementById("contaDropdown")?.classList.remove("aberto");
});

catDropdown?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const cat = buscaCat.querySelector("span");
    if (cat) cat.textContent = this.textContent;
    catDropdown.classList.remove("aberto");
    mostrarToast("Categoria: " + this.textContent);
  });
});

// ====================================================
//  DROPDOWN: MINHA CONTA
// ====================================================
const haConta      = document.getElementById("haConta");
const contaDropdown= document.getElementById("contaDropdown");

haConta?.addEventListener("click", function (e) {
  e.stopPropagation();
  contaDropdown.classList.toggle("aberto");
  catDropdown?.classList.remove("aberto");
});

// Fechar dropdowns ao clicar fora
document.addEventListener("click", function () {
  catDropdown?.classList.remove("aberto");
  contaDropdown?.classList.remove("aberto");
  document.getElementById("perfilDropdown")?.classList.remove("aberto");
});

// ====================================================
//  NAVBAR: BOTÃO "TODAS CATEGORIAS" (mobile toggle)
// ====================================================
document.querySelector(".btn-todas-cat")?.addEventListener("click", function () {
  mostrarToast("Menu de categorias em breve!");
});

// ====================================================
//  CAMPO DE BUSCA — PESQUISAR
// ====================================================
document.querySelector(".busca-btn")?.addEventListener("click", function () {
  const termo = document.getElementById("campoBusca")?.value.trim();
  if (!termo) { mostrarToast("Digite algo para pesquisar.", "erro"); return; }
  mostrarToast("A pesquisar: " + termo);
});

document.getElementById("campoBusca")?.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const termo = this.value.trim();
    if (termo) mostrarToast("A pesquisar: " + termo);
  }
});

// ====================================================
//  ANÓNIMO — TOGGLE CAMPOS DE CONTACTO
// ====================================================
function toggleAnonimo() {
  const chk = document.getElementById("chkAnonimo");
  const obs  = document.getElementById("obsAnonimo");
  const campos = ["nomeCompleto","emailContato","telefone"];

  if (chk.checked) {
    obs.style.display = "block";
    campos.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = true;
        el.value    = "";
        el.classList.remove("erro");
      }
    });
    // Limpar erros
    ["erroNome","erroEmail","erroTel"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
  } else {
    obs.style.display = "none";
    campos.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = false;
    });
  }
}

// ====================================================
//  UPLOAD DE ANEXOS
// ====================================================
const uploadArea = document.getElementById("uploadArea");
let anexosList = [];

// Drag & Drop
uploadArea?.addEventListener("dragover", function (e) {
  e.preventDefault();
  this.classList.add("drag-over");
});

uploadArea?.addEventListener("dragleave", function () {
  this.classList.remove("drag-over");
});

uploadArea?.addEventListener("drop", function (e) {
  e.preventDefault();
  this.classList.remove("drag-over");
  const ficheiros = Array.from(e.dataTransfer.files);
  processarFicheiros(ficheiros);
});

function adicionarAnexos(input) {
  const ficheiros = Array.from(input.files);
  processarFicheiros(ficheiros);
  input.value = ""; // limpa para permitir re-selecionar
}

function processarFicheiros(ficheiros) {
  const tiposPermitidos = ["image/png","image/jpeg","image/jpg","video/mp4","application/pdf"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  ficheiros.forEach(f => {
    if (!tiposPermitidos.includes(f.type)) {
      mostrarToast(`"${f.name}" não é um formato permitido.`, "erro");
      return;
    }
    if (f.size > maxSize) {
      mostrarToast(`"${f.name}" excede 10MB.`, "erro");
      return;
    }
    if (anexosList.find(a => a.nome === f.name)) {
      mostrarToast(`"${f.name}" já foi adicionado.`, "erro");
      return;
    }

    anexosList.push({ nome: f.name, tamanho: f.size });
    renderizarAnexos();
  });

  if (ficheiros.length > 0) mostrarToast(`${ficheiros.length} arquivo(s) adicionado(s)!`);
}

function renderizarAnexos() {
  const lista = document.getElementById("anexosLista");
  if (!lista) return;

  lista.innerHTML = anexosList.map((a, i) => `
    <div class="anexo-item">
      <i class="${iconeAnexo(a.nome)}"></i>
      <span class="anexo-nome">${a.nome}</span>
      <span class="anexo-size">${formatarTamanho(a.tamanho)}</span>
      <button type="button" class="btn-rem-anexo" onclick="removerAnexo(${i})" title="Remover">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join("");
}

function removerAnexo(i) {
  const nome = anexosList[i]?.nome;
  anexosList.splice(i, 1);
  renderizarAnexos();
  mostrarToast(`"${nome}" removido.`);
}

function iconeAnexo(nome) {
  const ext = nome.split(".").pop().toLowerCase();
  if (["png","jpg","jpeg"].includes(ext)) return "fas fa-image";
  if (ext === "pdf") return "fas fa-file-pdf";
  if (ext === "mp4") return "fas fa-film";
  return "fas fa-file";
}

function formatarTamanho(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + " KB";
  return (bytes/1024/1024).toFixed(1) + " MB";
}

// ====================================================
//  VALIDAÇÃO E ENVIO
// ====================================================
function validarCampo(id, erroId, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById(erroId);
  if (!el) return true;
  const val = el.value.trim();
  if (!val) {
    if (err) err.textContent = msg;
    el.classList.add("erro");
    return false;
  }
  if (err) err.textContent = "";
  el.classList.remove("erro");
  return true;
}

function validarEmail(id, erroId) {
  const el  = document.getElementById(id);
  const err = document.getElementById(erroId);
  if (!el) return true;
  const val = el.value.trim();
  const re  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) {
    if (err) err.textContent = "E-mail obrigatório.";
    el.classList.add("erro");
    return false;
  }
  if (!re.test(val)) {
    if (err) err.textContent = "E-mail inválido.";
    el.classList.add("erro");
    return false;
  }
  if (err) err.textContent = "";
  el.classList.remove("erro");
  return true;
}

function enviarDenuncia() {
  let valido = true;

  // Tipo selecionado
  const tipoSel = document.querySelector("input[name='tipo']:checked");
  if (!tipoSel) {
    mostrarToast("Selecione o tipo de denúncia.", "erro");
    valido = false;
  }

  // Título
  if (!validarCampo("tituloDenuncia","erroTitulo","Título obrigatório.")) valido = false;

  // Descrição
  if (!validarCampo("descricao","erroDesc","Descrição obrigatória.")) valido = false;

  // Contacto (se não anónimo)
  const anonimo = document.getElementById("chkAnonimo")?.checked;
  if (!anonimo) {
    if (!validarCampo("nomeCompleto","erroNome","Nome obrigatório.")) valido = false;
    if (!validarEmail("emailContato","erroEmail")) valido = false;
    if (!validarCampo("telefone","erroTel","Telefone obrigatório.")) valido = false;
  }

  // Confirmação
  const chkConfirm = document.getElementById("chkConfirm");
  const erroConfirm= document.getElementById("erroConfirm");
  if (!chkConfirm?.checked) {
    if (erroConfirm) erroConfirm.textContent = "É necessário confirmar a declaração.";
    valido = false;
  } else {
    if (erroConfirm) erroConfirm.textContent = "";
  }

  if (!valido) {
    // Rolar até o primeiro erro
    const primeiroErro = document.querySelector(".campo.erro, .campo-erro:not(:empty)");
    if (primeiroErro) primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
    mostrarToast("Corrija os erros antes de continuar.", "erro");
    return;
  }

  // Gera número de referência
  const ref = "DEN-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000);
  document.getElementById("numRef").textContent = ref;

  // Abre modal de sucesso
  abrirModal("modalSucesso");

  // Limpa formulário
  document.getElementById("formDenuncia")?.reset();
  anexosList = [];
  renderizarAnexos();
  document.querySelectorAll(".tipo-card").forEach((c, i) => {
    c.classList.toggle("ativo", i === 0);
  });
  document.getElementById("contDesc").textContent = "0/1500";
  const campos = ["nomeCompleto","emailContato","telefone"];
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.disabled = false; el.classList.remove("erro"); }
  });
  document.getElementById("obsAnonimo").style.display = "none";
  document.querySelectorAll(".campo-erro").forEach(e => e.textContent = "");
  document.querySelectorAll(".campo.erro").forEach(e => e.classList.remove("erro"));
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

document.querySelectorAll(".modal-overlay").forEach(m => {
  m.addEventListener("click", function (e) {
    if (e.target === this) fecharModal(this.id);
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape")
    document.querySelectorAll(".modal-overlay.aberto").forEach(m => fecharModal(m.id));
});

// ====================================================
//  TOAST
// ====================================================
let _timerToast;
function mostrarToast(msg, tipo) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className   = "toast" + (tipo === "erro" ? " erro" : "");
  el.classList.add("visivel");
  clearTimeout(_timerToast);
  _timerToast = setTimeout(() => el.classList.remove("visivel"), 3200);
}

// ====================================================
//  LINKS DA BARRA DE SUPORTE
// ====================================================
document.querySelectorAll(".bsi-link, .bsi-link-dou").forEach(link => {
  if (link.tagName === "A" && !link.href.startsWith("mailto") && !link.href.startsWith("tel")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarToast("A abrir: " + this.textContent.trim());
    });
  }
});



// ====================================================
//  LINKS DO DROPDOWN DE CONTA
// ====================================================
document.querySelectorAll(".conta-dropdown a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    contaDropdown?.classList.remove("aberto");
    mostrarToast("A navegar: " + this.textContent.trim());
  });
});

// ====================================================
//  INICIALIZAR
// ====================================================
document.addEventListener("DOMContentLoaded", function () {
  // Garante que o primeiro tipo card está activo
  const primeiro = document.querySelector(".tipo-card");
  if (primeiro) primeiro.classList.add("ativo");

  // Confirmar links do footer das redes sociais
  document.querySelectorAll(".ft-redes a").forEach(a => {
    a.addEventListener("click", e => { e.preventDefault(); mostrarToast("Redes sociais em breve!"); });
  });
});
