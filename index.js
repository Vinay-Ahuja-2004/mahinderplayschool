document.querySelectorAll("[data-slider]").forEach(slider => {
    const slides = slider.querySelector(".slides");
    const images = slides.querySelectorAll("img");
    const next = slider.querySelector(".next");
    const prev = slider.querySelector(".prev");

    let index = 0;

    function getCardWidth() {
        return images[0].offsetWidth + 25; // image width + gap
    }

    function getVisibleCount() {
        return Math.floor(slider.offsetWidth / getCardWidth());
    }

    function updateArrows() {
        prev.style.opacity = index === 0 ? "0.4" : "1";
        prev.style.pointerEvents = index === 0 ? "none" : "auto";

        const maxIndex = images.length - getVisibleCount();
        next.style.opacity = index >= maxIndex ? "0.4" : "1";
        next.style.pointerEvents = index >= maxIndex ? "none" : "auto";
    }

    function move() {
        slides.style.transform = `translateX(-${index * getCardWidth()}px)`;
        updateArrows();
    }

    next.addEventListener("click", () => {
        const maxIndex = images.length - getVisibleCount();
        if (index < maxIndex) {
            index++;
            move();
        }
    });

    prev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            move();
        }
    });

    window.addEventListener("resize", move);

    move(); // initial position
});
