document.querySelectorAll(".carousel").forEach(carousel => {

    const images = carousel.querySelectorAll(".images img");
    const next = carousel.querySelector(".next");
    const prev = carousel.querySelector(".prev");

    let current = 0;

    function showImage(index){
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    next.addEventListener("click", () => {
        current++;
        if(current >= images.length){
            current = 0;
        }
        showImage(current);
    });

    prev.addEventListener("click", () => {
        current--;
        if(current < 0){
            current = images.length - 1;
        }
        showImage(current);
    });

    showImage(current);

});