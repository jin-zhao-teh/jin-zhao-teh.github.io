document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  // Update the slider position
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  // Show the next slide
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  }

  // Show the previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  }

  // Attach event listeners to the buttons
  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);

  // Initial position setup
  updateSliderPosition();
});
