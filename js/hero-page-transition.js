document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;
  let currentIndexY = 0;

  // Update the slider position
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}vw) translateY(-${currentIndexY * 100}vh)`;
  }

  // Show the next slide, x
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  }

  // Show the previous slide, x
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  }

  // Move vertically based on the slide index
  function toggleVerticalSlide() {
    if (currentIndex % 2 === 0) {
      currentIndexY++;
    } else {
      currentIndexY--;
    }
    updateSliderPosition();
  }

  // Open a new slide with zoom effect
  function openZoomSlide() {
    const newSlide = document.createElement("div");
    newSlide.classList.add("slide", "zoom-slide");
    newSlide.innerHTML = `
      <div class="hero-background">
        <img src="Images/Img2.webp" alt="Background Image Zoom" />
      </div>
      <header class="Hero-text">Zoomed In Slide</header>
    `;
    slider.appendChild(newSlide);
    currentIndex++;
    updateSliderPosition();
  }

  // Attach event listeners to the buttons
  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);

  Array.from(document.getElementsByClassName("Hero-text")).forEach((element) => {
    element.addEventListener("click", toggleVerticalSlide);
  });

  Array.from(document.getElementsByClassName("slide")).forEach((element, index) => {
    if (index === 1) {
      element.addEventListener("click", openZoomSlide);
    }
  });

  // Initial position setup
  updateSliderPosition();
});
