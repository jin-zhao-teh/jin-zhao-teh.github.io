document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;
  let currentIndexY = 0;

  // Update the slider position
  function updateSliderPosition(type) {
    console.log(type)
    if (type == "x") {
      slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    } else if (type == "y") {
      slider.style.transform = `translateY(-${currentIndexY * 100}vw)`;
    }
  }

  // Show the next slide, x
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition("x");
    }
  }

  // Show the previous slide, x
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition("x");
    }
  }
  // Show the next slide, y
  function nextSlideY() {
    if (currentIndex < slides.length - 1) {
      currentIndexY++;
      if (currentIndexY > 0) {
        Array.prototype.slice.call(document.getElementsByClassName("Hero-bttn"), 0).forEach(element => {
          element.style.display = "None";
        });
      } else {
        Array.prototype.slice.call(document.getElementsByClassName("Hero-bttn"), 0).forEach(element => {
          element.style.display = "block";
        });
      }
      updateSliderPosition("y");
    }
  };
  // Attach event listeners to the buttons
  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);
  document.getElementById("Hero-text1").addEventListener("click", nextSlideY);

  // Initial position setup
  updateSliderPosition();
});
