/* =========================================================
   NovaTech Store — script.js
   Interatividade geral do site: carrossel, filtros de produto,
   adicionar ao carrinho, validação de formulário e página do carrinho.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     1) CARROSSEL DE DESTAQUES (Swiper - biblioteca externa)
     Só é inicializado se o elemento existir na página (home).
  --------------------------------------------------------- */
  const elementoSwiper = document.querySelector(".swiper-destaques");
  if (elementoSwiper && window.Swiper) {
    new Swiper(".swiper-destaques", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 4 },
      },
    });
  }

  /* ---------------------------------------------------------
     2) MENU MOBILE — pequena melhoria de UX com jQuery:
     fecha o menu automaticamente ao clicar em um link.
  --------------------------------------------------------- */
  if (window.jQuery) {
    $(".navbar-nav .nav-link").on("click", function () {
      const menu = document.getElementById("menuPrincipal");
      if (menu && menu.classList.contains("show")) {
        $(menu).collapse("hide");
      }
    });
  }

  /* ---------------------------------------------------------
     3) FILTRO DE PRODUTOS POR CATEGORIA (pages/produtos.html)
     Manipulação de DOM: mostra/oculta os cards conforme o filtro.
  --------------------------------------------------------- */
  const filtros = document.getElementById("filtros");
  if (filtros) {
    const botoesFiltro = filtros.querySelectorAll("button");
    const itensProduto = document.querySelectorAll("#lista-produtos .item-produto");
    const mensagemVazio = document.getElementById("msg-vazio");

    botoesFiltro.forEach((botao) => {
      botao.addEventListener("click", function () {
        botoesFiltro.forEach((b) => b.classList.remove("ativo"));
        this.classList.add("ativo");

        const categoriaEscolhida = this.dataset.filtro;
        let visiveis = 0;

        itensProduto.forEach((item) => {
          const pertenceCategoria =
            categoriaEscolhida === "todos" || item.dataset.categoria === categoriaEscolhida;

          if (pertenceCategoria) {
            item.style.display = "";
            visiveis++;
          } else {
            item.style.display = "none";
          }
        });

        mensagemVazio.classList.toggle("d-none", visiveis > 0);
      });
    });

    // Se a página foi acessada com um hash (#notebooks, #audio, etc.), aplica o filtro
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const botaoCorrespondente = filtros.querySelector(`[data-filtro="${hash}"]`);
      if (botaoCorrespondente) botaoCorrespondente.click();
    }
  }

  /* ---------------------------------------------------------
     4) ADICIONAR AO CARRINHO (pages/produtos.html)
  --------------------------------------------------------- */
  document.querySelectorAll(".btn-adicionar").forEach((botao) => {
    // Ignora botões que não pertencem a um card de produto (ex: página do carrinho)
    const card = botao.closest(".card-produto");
    if (!card || !card.dataset.id) return;

    botao.addEventListener("click", function () {
      const { id, nome, preco } = card.dataset;
      adicionarAoCarrinho(Number(id), nome, Number(preco));

      // Efeito visual com jQuery para reforçar o feedback da ação
      if (window.jQuery) {
        $(card).stop(true, true).animate({ opacity: 0.4 }, 120).animate({ opacity: 1 }, 200);
      }

      mostrarToast(`"${nome}" adicionado ao carrinho!`);
    });
  });

  /* ---------------------------------------------------------
     5) VALIDAÇÃO DO FORMULÁRIO DE CONTATO (pages/contato.html)
  --------------------------------------------------------- */
  const formContato = document.getElementById("form-contato");
  if (formContato) {
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoAssunto = document.getElementById("assunto");
    const campoMensagem = document.getElementById("mensagem");
    const feedback = document.getElementById("mensagem-feedback");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarCampo(campo, condicaoValida, idErro) {
      const erro = document.getElementById(idErro);
      if (!condicaoValida) {
        campo.classList.add("campo-invalido");
        erro.style.display = "block";
        return false;
      }
      campo.classList.remove("campo-invalido");
      erro.style.display = "none";
      return true;
    }

    formContato.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nomeValido = validarCampo(campoNome, campoNome.value.trim().length >= 3, "erro-nome");
      const emailValido = validarCampo(campoEmail, regexEmail.test(campoEmail.value.trim()), "erro-email");
      const assuntoValido = validarCampo(campoAssunto, campoAssunto.value !== "", "erro-assunto");
      const mensagemValida = validarCampo(campoMensagem, campoMensagem.value.trim().length >= 10, "erro-mensagem");

      const formularioValido = nomeValido && emailValido && assuntoValido && mensagemValida;

      feedback.classList.remove("sucesso", "erro");

      if (formularioValido) {
        feedback.classList.add("sucesso");
        feedback.textContent = `Obrigado, ${campoNome.value.trim()}! Sua mensagem foi enviada com sucesso. Retornaremos em breve.`;
        formContato.reset();

        // jQuery: destaca a mensagem de sucesso com um efeito suave
        if (window.jQuery) {
          $(feedback).hide().fadeIn(400);
        }
      } else {
        feedback.classList.add("erro");
        feedback.textContent = "Por favor, corrija os campos destacados antes de enviar.";

        if (window.jQuery) {
          $(feedback).hide().fadeIn(400);
        }
      }
    });

    // Remove o destaque de erro assim que o usuário começa a corrigir o campo
    [campoNome, campoEmail, campoAssunto, campoMensagem].forEach((campo) => {
      campo.addEventListener("input", function () {
        campo.classList.remove("campo-invalido");
      });
    });
  }

  /* ---------------------------------------------------------
     6) PÁGINA DO CARRINHO (pages/carrinho.html)
  --------------------------------------------------------- */
  const listaCarrinho = document.getElementById("lista-carrinho");
  if (listaCarrinho) {
    renderizarCarrinho();

    document.getElementById("btn-limpar").addEventListener("click", function () {
      if (confirm("Deseja realmente esvaziar o carrinho?")) {
        esvaziarCarrinho();
        renderizarCarrinho();
      }
    });

    document.getElementById("btn-finalizar").addEventListener("click", function () {
      if (contarItensCarrinho() === 0) {
        mostrarToast("Seu carrinho está vazio.");
        return;
      }
      alert("Compra finalizada com sucesso! (simulação — este é um projeto acadêmico sem backend real)");
      esvaziarCarrinho();
      renderizarCarrinho();
    });
  }

  function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    const carrinhoVazio = document.getElementById("carrinho-vazio");

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
      carrinhoVazio.classList.remove("d-none");
    } else {
      carrinhoVazio.classList.add("d-none");

      carrinho.forEach((item) => {
        const linha = document.createElement("div");
        linha.className = "item-carrinho d-flex align-items-center gap-3";
        linha.innerHTML = `
          <div class="miniatura"><i class="bi bi-box-seam"></i></div>
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.nome}</h6>
            <p class="mb-0 text-muted small">${formatarMoeda(item.preco)} (unidade)</p>
          </div>
          <input type="number" min="1" value="${item.quantidade}" class="form-control form-control-sm input-quantidade" style="width: 70px;" data-id="${item.id}">
          <span class="fw-bold" style="min-width: 100px; text-align:right;">${formatarMoeda(item.preco * item.quantidade)}</span>
          <button class="btn btn-sm btn-outline-danger btn-remover" data-id="${item.id}"><i class="bi bi-trash"></i></button>
        `;
        listaCarrinho.appendChild(linha);
      });

      // Eventos de alterar quantidade
      listaCarrinho.querySelectorAll(".input-quantidade").forEach((input) => {
        input.addEventListener("change", function () {
          alterarQuantidade(Number(this.dataset.id), Number(this.value));
          renderizarCarrinho();
        });
      });

      // Eventos de remover item
      listaCarrinho.querySelectorAll(".btn-remover").forEach((botao) => {
        botao.addEventListener("click", function () {
          removerDoCarrinho(Number(this.dataset.id));
          renderizarCarrinho();
        });
      });
    }

    const total = calcularTotalCarrinho();
    document.getElementById("carrinho-subtotal").textContent = formatarMoeda(total);
    document.getElementById("carrinho-total").textContent = formatarMoeda(total);
  }

});
