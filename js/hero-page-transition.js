// js/hero-page-transition.js
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slideX');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  let currentSlide = 0;
  
  // Initialize first slide
  slides[currentSlide].classList.add('active');
  
  // Function to show a specific slide
  function showSlide(n) {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Update current slide index
    currentSlide = (n + slides.length) % slides.length;
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
  }
  
  // Next slide function
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Previous slide function
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Event listeners for buttons
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  
  // Auto slide change every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto slide on hover
  const slider = document.getElementById('slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
});
