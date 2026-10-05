/* =========================================================
   NovaTech Store — carrinho.js
   Módulo responsável por toda a lógica do carrinho de compras.
   Usa localStorage para persistir os itens entre páginas.
   ========================================================= */

const CHAVE_CARRINHO = "novatech_carrinho";

/** Lê o carrinho salvo no localStorage. Retorna um array de itens. */
function obterCarrinho() {
  const dados = localStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

/** Salva o array de itens no localStorage. */
function salvarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  atualizarBadgeCarrinho();
}

/** Adiciona um produto ao carrinho (ou aumenta a quantidade, se já existir). */
function adicionarAoCarrinho(id, nome, preco) {
  const carrinho = obterCarrinho();
  const itemExistente = carrinho.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ id, nome, preco, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
}

/** Remove um item do carrinho pelo id. */
function removerDoCarrinho(id) {
  const carrinho = obterCarrinho().filter((item) => item.id !== id);
  salvarCarrinho(carrinho);
}

/** Atualiza a quantidade de um item específico (mínimo 1). */
function alterarQuantidade(id, novaQuantidade) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((i) => i.id === id);
  if (item) {
    item.quantidade = Math.max(1, novaQuantidade);
    salvarCarrinho(carrinho);
  }
}

/** Esvazia o carrinho por completo. */
function esvaziarCarrinho() {
  localStorage.removeItem(CHAVE_CARRINHO);
  atualizarBadgeCarrinho();
}

/** Retorna a quantidade total de itens (soma das quantidades). */
function contarItensCarrinho() {
  return obterCarrinho().reduce((total, item) => total + item.quantidade, 0);
}

/** Retorna o valor total do carrinho, em reais (número). */
function calcularTotalCarrinho() {
  return obterCarrinho().reduce((total, item) => total + item.preco * item.quantidade, 0);
}

/** Formata um número para o padrão monetário brasileiro. */
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Atualiza o número exibido no ícone do carrinho, em todas as páginas. */
function atualizarBadgeCarrinho() {
  const badge = document.getElementById("carrinho-contador");
  if (badge) {
    badge.textContent = contarItensCarrinho();
  }
}

/** Exibe uma pequena notificação (toast) no canto da tela. */
function mostrarToast(mensagem) {
  const toast = document.getElementById("toast-carrinho");
  if (!toast) return;

  toast.textContent = mensagem;

  // jQuery é usado aqui para o efeito de fade in/out da notificação
  if (window.jQuery) {
    $(toast).stop(true, true).fadeIn(200).delay(1600).fadeOut(400);
  } else {
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2000);
  }
}

// Atualiza o contador do carrinho assim que qualquer página carrega
document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);
