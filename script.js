cript . JS
document.addEventListener("DOMContentLoaded", () => {
  const SEU_NUMERO_WHATSAPP = "62995616767"; // Coloque seu número aqui
 
  // ==========================================
  // 1. CARROSSÉIS (ROTAÇÃO, INDICADORES NUMERADOS E SWIPE)
  // ==========================================
  const carousels = document.querySelectorAll(".carousel");
 
  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".images");
    const images = carousel.querySelectorAll(".images img");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");
 
    if (!images.length) return; // carrossel "em breve" sem fotos ainda
 
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
      }
      if (countBadge) {
        countBadge.textContent = `${currentIndex + 1}/${images.length}`;
      }
    };
 
    const nextSlide = () => updateCarousel(currentIndex + 1);
    const prevSlide = () => updateCarousel(currentIndex - 1);
 
    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 3000);
    };
 
    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
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
 
    updateCarousel(currentIndex);
    startAutoplay();
  });
 
  // ==========================================
  // 2. MODAL DE ZOOM DA IMAGEM (AMPLIAR FOTO)
  // ==========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");
  const allCarouselImages = document.querySelectorAll(".images img");
 
  const abrirModal = (img) => {
    if (!modal || !modalImg) return;
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Foto ampliada";
    document.body.style.overflow = "hidden"; // trava o scroll de fundo no celular
  };
 
  const fecharModal = () => {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
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
 
  // Fecha o modal com a tecla Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
      fecharModal();
    }
  });
 
  // ==========================================
  // 3. ENVIAR PARA O WHATSAPP
  // ==========================================
  const btnsOrcamento = document.querySelectorAll(".btn-orcamento");
 
  btnsOrcamento.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
 
      const card = btn.closest(".card");
      const nomeProduto = card.getAttribute("data-nome") || card.querySelector("h3")?.innerText || "Produto";
      const imagemAtiva = card.querySelector(".images img.active");
      const urlImagem = imagemAtiva ? imagemAtiva.src : "";
 
      const mensagem = urlImagem
        ? `Olá! Gostaria de solicitar um orçamento para o seguinte produto:\n\n` +
          `📌 *Produto:* ${nomeProduto}\n` +
          `🖼️ *Foto do modelo selecionado:* ${urlImagem}`
        : `Olá! Gostaria de solicitar um orçamento para o seguinte produto:\n\n` +
          `📌 *Produto:* ${nomeProduto}`;
 
      const linkWhatsApp = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
      window.open(linkWhatsApp, "_blank");
    });
  });
});
 
//menu media700
const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector("nav");
 
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const aberto = nav.classList.toggle("ativo");
    menuBtn.classList.toggle("ativo", aberto);
    menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
 
  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("ativo")) return;
    if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
    nav.classList.remove("ativo");
    menuBtn.classList.remove("ativo");
    menuBtn.setAttribute("aria-expanded", "false");
  });
}
 
//diminuir quando clicar
const linksMenu = document.querySelectorAll("nav a");
 
linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("ativo");
    menuBtn.classList.remove("ativo");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});
 