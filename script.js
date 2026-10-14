document.addEventListener("DOMContentLoaded", () => {

  const SEU_NUMERO_WHATSAPP = typeof WHATSAPP !== "undefined" ? WHATSAPP : "5562995616767";

  // "reduzir movimento" ligado no celular/PC não recebe troca automática de fotos
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Enquanto o modal está aberto, o autoplay dos cards fica parado
  let modalAberto = false;

  // ==========================================
  // 1. CARROSSÉIS (ROTAÇÃO, INDICADORES NUMERADOS E SWIPE)
  // ==========================================
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".images");
    const images = carousel.querySelectorAll(".images img");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    if (!images.length) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    // --- Indicadores numerados (1 2 3 4 5...) + contador "3/12" ---
    let dotsWrap = null;
    let countBadge = null;

    if (images.length > 1) {
      dotsWrap = document.createElement("div");
      dotsWrap.className = "carousel-dots";

      images.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.textContent = String(idx + 1);
        dot.setAttribute("aria-label", `Ver imagem ${idx + 1} de ${images.length}`);
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          updateCarousel(idx);
          startAutoplay();
        });
        dotsWrap.appendChild(dot);
      });

      countBadge = document.createElement("span");
      countBadge.className = "carousel-count";
      countBadge.setAttribute("aria-hidden", "true");

      carousel.appendChild(dotsWrap);
      carousel.appendChild(countBadge);
    }

    const updateCarousel = (index) => {
      currentIndex = (index + images.length) % images.length;
      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === currentIndex);
      });
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((dot, idx) => {
          dot.classList.toggle("active", idx === currentIndex);
        });

        // Mantém o número ativo visível na faixa (importante quando há 20+ fotos)
        const dotAtivo = dotsWrap.children[currentIndex];
        const caixa = dotsWrap.getBoundingClientRect();
        const pos = dotAtivo.getBoundingClientRect();
        dotsWrap.scrollTo({
          left: dotsWrap.scrollLeft + (pos.left - caixa.left) - caixa.width / 2 + pos.width / 2,
          behavior: "smooth"
        });
      }
      if (countBadge) {
        countBadge.textContent = `${currentIndex + 1}/${images.length}`;
      }
    };

    const nextSlide = () => updateCarousel(currentIndex + 1);
    const prevSlide = () => updateCarousel(currentIndex - 1);

    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = null;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (reduzMovimento || modalAberto) return;
      autoplayInterval = setInterval(nextSlide, 3000);
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nextSlide();
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prevSlide();
        startAutoplay();
      });
    }

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // --- Deslizar com o dedo (swipe) — essencial no celular ---
    let startX = 0;
    let isSwiping = false;

    if (track) {
      track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        stopAutoplay();
      }, { passive: true });

      track.addEventListener("touchend", (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 40) {
          diff < 0 ? nextSlide() : prevSlide();
        }
        startAutoplay();
      }, { passive: true });
    }

    // Deixa o modal controlar este carrossel (ir para uma foto, pausar e retomar)
    carousel.irParaFoto = updateCarousel;
    carousel.pararAuto = stopAutoplay;
    carousel.iniciarAuto = startAutoplay;

    updateCarousel(currentIndex);

    // Só troca as fotos sozinho enquanto o carrossel está visível na tela.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) startAutoplay();
          else stopAutoplay();
        });
      }, { threshold: 0.3 });
      observer.observe(carousel);
    } else {
      startAutoplay();
    }
  });

  // ==========================================
  // 2. MODAL DE ZOOM DA IMAGEM (AMPLIAR FOTO)
  //    Dá para passar as fotos com ela aberta:
  //    arrastando o dedo, pelas setas ‹ › ou pelo teclado.
  //    Ao fechar, o carrossel do card fica na mesma foto.
  // ==========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");
  const allCarouselImages = document.querySelectorAll(".images img");

  let fotosModal = [];          // as fotos do carrossel que foi clicado
  let indiceModal = 0;          // qual dessas fotos está aberta agora
  let carrosselDoModal = null;  // o carrossel (card) que abriu o modal

  // Setas e contador são criados aqui, então não precisa mexer no HTML
  let btnModalAnterior = null;
  let btnModalProximo = null;
  let contadorModal = null;

  if (modal && modalImg) {
    btnModalAnterior = document.createElement("button");
    btnModalAnterior.type = "button";
    btnModalAnterior.className = "modal-nav modal-prev";
    btnModalAnterior.setAttribute("aria-label", "Foto anterior");
    btnModalAnterior.innerHTML = "&#10094;";

    btnModalProximo = document.createElement("button");
    btnModalProximo.type = "button";
    btnModalProximo.className = "modal-nav modal-next";
    btnModalProximo.setAttribute("aria-label", "Próxima foto");
    btnModalProximo.innerHTML = "&#10095;";

    contadorModal = document.createElement("span");
    contadorModal.className = "modal-count";
    contadorModal.setAttribute("aria-hidden", "true");

    modal.appendChild(btnModalAnterior);
    modal.appendChild(btnModalProximo);
    modal.appendChild(contadorModal);

    btnModalAnterior.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarFotoModal(indiceModal - 1);
    });
    btnModalProximo.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarFotoModal(indiceModal + 1);
    });
  }

  // Mostra a foto de número "indice" dentro do modal
  function mostrarFotoModal(indice) {
    if (!modalImg || !fotosModal.length) return;

    // O "+ length" e o "%" fazem a lista dar a volta (depois da última vem a primeira)
    indiceModal = (indice + fotosModal.length) % fotosModal.length;

    const foto = fotosModal[indiceModal];
    modalImg.src = foto.src;
    modalImg.alt = foto.alt || "Foto ampliada";

    const varias = fotosModal.length > 1;
    if (btnModalAnterior) btnModalAnterior.style.display = varias ? "" : "none";
    if (btnModalProximo) btnModalProximo.style.display = varias ? "" : "none";
    if (contadorModal) {
      contadorModal.style.display = varias ? "" : "none";
      contadorModal.textContent = `${indiceModal + 1}/${fotosModal.length}`;
    }

    // Já carrega a próxima e a anterior para a troca ser rápida
    if (varias) {
      [indiceModal + 1, indiceModal - 1].forEach((i) => {
        const vizinha = fotosModal[(i + fotosModal.length) % fotosModal.length];
        new Image().src = vizinha.src;
      });
    }
  }

  const abrirModal = (img) => {
    if (!modal || !modalImg) return;

    // Pega todas as fotos do carrossel onde a pessoa clicou
    const carrossel = img.closest(".carousel");
    carrosselDoModal = carrossel;
    fotosModal = carrossel
      ? Array.from(carrossel.querySelectorAll(".images img"))
      : [img];

    // Pausa o autoplay do card enquanto o modal estiver aberto
    modalAberto = true;
    if (carrossel && carrossel.pararAuto) carrossel.pararAuto();

    modal.style.display = "flex";
    mostrarFotoModal(fotosModal.indexOf(img));
    document.body.style.overflow = "hidden"; // trava o scroll de fundo no celular
  };

  const fecharModal = () => {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";

    modalAberto = false;

    // Leva o carrossel do card para a foto em que o modal parou
    if (carrosselDoModal && carrosselDoModal.irParaFoto) {
      carrosselDoModal.irParaFoto(indiceModal);
      carrosselDoModal.iniciarAuto();
    }
    carrosselDoModal = null;
  };

  // Abre o modal ao clicar em qualquer foto do carrossel
  allCarouselImages.forEach((img) => {
    img.addEventListener("click", () => abrirModal(img));
  });

  // Fecha o modal no botão 'X'
  if (closeModal) {
    closeModal.addEventListener("click", fecharModal);
  }

  // Fecha o modal ao clicar no fundo escuro
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) fecharModal();
    });
  }

  // Arrastar o dedo para o lado com a foto aberta (celular)
  if (modal) {
    let modalStartX = 0;
    let modalStartY = 0;

    modal.addEventListener("touchstart", (e) => {
      modalStartX = e.touches[0].clientX;
      modalStartY = e.touches[0].clientY;
    }, { passive: true });

    modal.addEventListener("touchend", (e) => {
      const diffX = e.changedTouches[0].clientX - modalStartX;
      const diffY = e.changedTouches[0].clientY - modalStartY;

      // Só conta se o movimento foi mais para o lado do que para cima/baixo
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        diffX < 0
          ? mostrarFotoModal(indiceModal + 1)
          : mostrarFotoModal(indiceModal - 1);
      }
    }, { passive: true });
  }

  // Teclado: Esc fecha, setas ← → passam as fotos
  document.addEventListener("keydown", (e) => {
    if (!modal || modal.style.display !== "flex") return;

    if (e.key === "Escape") fecharModal();
    else if (e.key === "ArrowRight") mostrarFotoModal(indiceModal + 1);
    else if (e.key === "ArrowLeft") mostrarFotoModal(indiceModal - 1);
  });

  // ==========================================
  // 3. ENVIAR PARA O WHATSAPP
  // ==========================================
  const btnsOrcamento = document.querySelectorAll(".btn-orcamento");

  btnsOrcamento.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const card = btn.closest(".card");
      const nomeProduto = card.querySelector("h3")?.innerText || "Produto";
      const imagemAtiva = card.querySelector(".images img.active");
      const todasFotos = Array.from(card.querySelectorAll(".images img"));
      const numeroFoto = imagemAtiva ? todasFotos.indexOf(imagemAtiva) + 1 : 0;

      // Parênteses no link atrapalham o WhatsApp: troca por versão segura
      const urlImagem = imagemAtiva
        ? imagemAtiva.src.replace(/\(/g, "%28").replace(/\)/g, "%29")
        : "";

      let mensagem =
        `Olá! Gostaria de solicitar um orçamento para o seguinte produto:\n\n` +
        `📌 *Produto:* ${nomeProduto}`;

      if (urlImagem) {
        mensagem +=
          `\n🔢 *Modelo:* foto ${numeroFoto} de ${todasFotos.length}` +
          `\n🖼️ *Foto escolhida:*\n${urlImagem}`;
      }

      const linkWhatsApp = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
      window.open(linkWhatsApp, "_blank");
    });
  });

  // ==========================================
  // 4. MENU DO CELULAR (hambúrguer)
  // ==========================================
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn && nav) {
    const fecharMenu = () => {
      nav.classList.remove("ativo");
      menuBtn.classList.remove("ativo");
      menuBtn.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", () => {
      const aberto = nav.classList.toggle("ativo");
      menuBtn.classList.toggle("ativo", aberto);
      menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("ativo")) return;
      if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
      fecharMenu();
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });
  }
});