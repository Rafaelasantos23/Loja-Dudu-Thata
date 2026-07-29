document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURAÇÃO: Coloque o seu número do WhatsApp aqui (DDD + Número, sem espaço ou traço)
  const SEU_NUMERO_WHATSAPP = "5511999999999"; 

  // 1. LÓGICA DOS CARROSSÉIS
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

  // 2. LÓGICA DO BOTÃO "SOLICITAR ORÇAMENTO"
  const btnsOrcamento = document.querySelectorAll(".btn-orcamento");

  btnsOrcamento.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Evita a navegação padrão

      // Encontra o card pai do botão
      const card = btn.closest(".card");
      
      // Pega o nome do produto (do atributo data-nome ou do tag h3)
      const nomeProduto = card.getAttribute("data-nome") || card.querySelector("h3")?.innerText || "Produto";

      // Pega a imagem que está atualmente com a classe 'active'
      const imagemAtiva = card.querySelector(".images img.active");
      const urlImagem = imagemAtiva ? imagemAtiva.src : "";

      // Monta a mensagem para o WhatsApp
      const mensagem = `Olá! Gostaria de solicitar um orçamento para o seguinte produto:\n\n` +
                       `📌 *Produto:* ${nomeProduto}\n` +
                       `🖼️ *Foto do modelo selecionado:* ${urlImagem}`;

      // Cria o link do WhatsApp encodando o texto corretamente
      const linkWhatsApp = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

      // Abre a conversa em uma nova aba
      window.open(linkWhatsApp, "_blank");
    });
  });
});