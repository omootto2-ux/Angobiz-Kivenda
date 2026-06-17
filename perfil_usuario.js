/* =====================================================
   ANGOBIZ KIVENDA – app.js
   Toda a lógica funcional da página de perfil
   ===================================================== */

"use strict";

// ─── UTILITÁRIOS ─────────────────────────────────────

/**
 * Exibe um toast (mensagem rápida) na parte inferior da tela
 * @param {string} msg  Texto a exibir
 * @param {number} dur  Duração em ms (padrão: 2400)
 */
function mostrarToast(msg, dur = 2400) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("visivel");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("visivel"), dur);
}

// ─── AVATAR / FOTO DE PERFIL ─────────────────────────

const avatarImg  = document.getElementById("avatarImg");
const btnCamera  = document.getElementById("btnCamera");
const inputFoto  = document.getElementById("inputFoto");

// Exibe ícone genérico se a imagem não existir
avatarImg.addEventListener("error", () => {
  const wrap = avatarImg.parentElement;
  avatarImg.remove();
  const fallback = document.createElement("div");
  fallback.className = "avatar-fallback";
  fallback.innerHTML = '<i class="fa-solid fa-user"></i>';
  wrap.insertBefore(fallback, wrap.firstChild);
});

// Abre o seletor de arquivo ao clicar na câmera
btnCamera.addEventListener("click", () => inputFoto.click());

// Pré-visualiza a foto escolhida
inputFoto.addEventListener("change", (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;
  if (!arquivo.type.startsWith("image/")) {
    mostrarToast("Selecione um arquivo de imagem.");
    return;
  }
  const leitor = new FileReader();
  leitor.onload = (ev) => {
    // Remove fallback caso exista
    const fallback = document.querySelector(".avatar-fallback");
    if (fallback) {
      const wrap = fallback.parentElement;
      fallback.remove();
      wrap.insertBefore(avatarImg, wrap.firstChild);
    }
    avatarImg.src = ev.target.result;
    mostrarToast("Foto de perfil atualizada!");
  };
  leitor.readAsDataURL(arquivo);
});

// ─── BOTÃO VOLTAR ────────────────────────────────────

document.getElementById("btnVoltar").addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  } else {
    mostrarToast("Você está na página inicial do perfil.");
  }
});

// ─── BOTÃO NOTIFICAÇÕES ───────────────────────────────

document.getElementById("btnNotif").addEventListener("click", () => {
  const badge = document.querySelector(".badge-notif");
  mostrarToast("Você tem 1 nova notificação.");
  badge.style.display = "none"; // marca como lida
});

// ─── BOTÃO CONFIGURAÇÕES ─────────────────────────────

document.getElementById("btnConfig").addEventListener("click", () => {
  mostrarToast("Configurações em breve...");
});

// ─── BOTÃO NÍVEL ─────────────────────────────────────

document.getElementById("btnNivel").addEventListener("click", () => {
  mostrarToast("Nível Ouro – 350 de 650 pontos");
});

// ─── MODAL EDITAR PERFIL ─────────────────────────────

const modalEditar = document.getElementById("modalEditar");
const btnEditar   = document.getElementById("btnEditar");
const fecharModal = document.getElementById("fecharModal");
const btnSalvar   = document.getElementById("btnSalvar");

// Campos do modal
const inputNome  = document.getElementById("inputNome");
const inputEmail = document.getElementById("inputEmail");
const inputTel   = document.getElementById("inputTel");
const inputLocal = document.getElementById("inputLocal");

// Referências dos textos no perfil que serão atualizados
const elNome  = document.querySelector(".nome");
const detalhes = document.querySelectorAll(".detalhe");

/**
 * Abre o modal de edição populando os campos com os valores atuais
 */
function abrirModal() {
  inputNome.value  = elNome.textContent.trim();
  inputEmail.value = detalhes[0].textContent.trim();
  inputTel.value   = detalhes[1].textContent.trim();
  inputLocal.value = detalhes[2].textContent.trim();
  modalEditar.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => inputNome.focus(), 150);
}

/**
 * Fecha o modal sem salvar
 */
function fecharModalFn() {
  modalEditar.hidden = true;
  document.body.style.overflow = "";
}

btnEditar.addEventListener("click", abrirModal);
fecharModal.addEventListener("click", fecharModalFn);

// Fechar ao clicar no fundo
modalEditar.addEventListener("click", (e) => {
  if (e.target === modalEditar) fecharModalFn();
});

// Fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEditar.hidden) fecharModalFn();
});

/**
 * Salva as alterações e atualiza o perfil na tela
 */
btnSalvar.addEventListener("click", () => {
  const nome  = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const tel   = inputTel.value.trim();
  const local = inputLocal.value.trim();

  // Validação básica
  if (!nome)  { mostrarToast("O nome não pode estar vazio."); return; }
  if (!email) { mostrarToast("O e-mail não pode estar vazio."); return; }

  // Atualiza nome
  elNome.textContent = nome;

  // Atualiza detalhes (e-mail, telefone, localização)
  if (detalhes[0]) {
    detalhes[0].innerHTML = `<i class="fa-solid fa-envelope"></i> ${email}`;
  }
  if (detalhes[1]) {
    detalhes[1].innerHTML = `<i class="fa-solid fa-phone"></i> ${tel}`;
  }
  if (detalhes[2]) {
    detalhes[2].innerHTML = `<i class="fa-solid fa-location-dot"></i> ${local}`;
  }

  fecharModalFn();
  mostrarToast("Perfil atualizado com sucesso!");
});

// ─── ESTATÍSTICAS (STATS) ────────────────────────────

const acoesStat = {
  statPedidos:   () => mostrarToast("A abrir: Meus Pedidos..."),
  statFavoritos: () => mostrarToast("A abrir: Produtos Favoritos..."),
  statEnderecos: () => mostrarToast("A abrir: Meus Endereços..."),
  statAvaliacoes:() => mostrarToast("A abrir: Minhas Avaliações..."),
};

Object.entries(acoesStat).forEach(([id, fn]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", fn);
});

// ─── ITENS DO MENU ───────────────────────────────────

const acoesMenu = {
  menuPedidos:      "A abrir: Meus Pedidos...",
  menuFavoritos:    "A abrir: Produtos Favoritos...",
  menuEnderecos:    "A abrir: Meus Endereços...",
  menuPagamento:    "A abrir: Métodos de Pagamento...",
  menuNotificacoes: "A abrir: Notificações...",
  menuSeguranca:    "A abrir: Segurança...",
};

Object.entries(acoesMenu).forEach(([id, msg]) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", () => mostrarToast(msg));
  }
});

// ─── EFEITO DE ENTRADA (ANIMAÇÃO SUAVE) ──────────────

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(18px)";
    card.style.transition = `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s`;
    // Força reflow para a animação funcionar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    });
  });
});
