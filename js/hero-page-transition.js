document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === currentSlide) {
                slide.classList.add(index > currentSlide ? 'prev' : 'next');
            }
        });

        if (index >= slides.length) {
            currentSlide = slides.length - 1;
        } else if (index < 0) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
    }

    document.getElementById('next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.getElementById('prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Initially display the first slide
    slides[currentSlide].classList.add('active');
});
