document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".images img");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    if (!images.length) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    // Função que troca a imagem visível
    const updateCarousel = (index) => {
      currentIndex = (index + images.length) % images.length;

      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === currentIndex);
      });
    };

    const nextSlide = () => updateCarousel(currentIndex + 1);
    const prevSlide = () => updateCarousel(currentIndex - 1);

    // Inicia a transição automática a cada 3000ms (3 segundos)
    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 3000);
    };

    // Para o temporizador
    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // Clique na seta da direita
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nextSlide();
        startAutoplay(); // Reinicia o contador de 3s
      });
    }

    // Clique na seta da esquerda
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prevSlide();
        startAutoplay(); // Reinicia o contador de 3s
      });
    }

    // Pausa quando o usuário passa o mouse em cima e volta quando tira
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // Inicializa
    updateCarousel(currentIndex);
    startAutoplay();
  });
});