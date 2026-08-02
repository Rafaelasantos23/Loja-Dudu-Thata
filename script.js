document.addEventListener("DOMContentLoaded", () => {
  const SEU_NUMERO_WHATSAPP = "62995616767"; // Coloque seu número aqui

  // ==========================================
  // 1. CARROSSÉIS (ROTAÇÃO E NAVEGAÇÃO)
  // ==========================================
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".images img");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    if (!images.length) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    const updateCarousel = (index) => {
      currentIndex = (index + images.length) % images.length;
      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === currentIndex);
      });
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

  // Abre o modal ao clicar em qualquer foto do carrossel
  allCarouselImages.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Foto ampliada";
      }
    });
  });

  // Fecha o modal no botão 'X'
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Fecha o modal ao clicar no fundo escuro
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

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

      const mensagem = `Olá! Gostaria de solicitar um orçamento para o seguinte produto:\n\n` +
                       `📌 *Produto:* ${nomeProduto}\n` +
                       `🖼️ *Foto do modelo selecionado:* ${urlImagem}`;

      const linkWhatsApp = `https://wa.me/${62995616767}?text=${encodeURIComponent(mensagem)}`;
      window.open(linkWhatsApp, "_blank");
    });
  });
});

//menu media700
const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("ativo");
});

//diminuir quando clicar
const linksMenu = document.querySelectorAll("nav a");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("ativo");
  });
});

