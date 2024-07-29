// js/slider.js
document.addEventListener("DOMContentLoaded", () => {
  const s = document.getElementById("slider"); // Slider element
  const l = document.querySelectorAll(".slide"); // Slide elements
  const p = document.getElementById("prev"); // Previous button
  const n = document.getElementById("next"); // Next button
  let c = 0; // Current slide index

  function showSlide(i) {
    if (i >= l.length) {
      c = l.length - 1; // Stay on the last slide
    } else if (i < 0) {
      c = 0; // Stay on the first slide
    } else {
      c = i;
    }
    s.style.transform = `translateX(-${c * 100}%)`;
  }

  function handleClick(e) {
    // Check if the click is not on a button
    if (e.target !== p && e.target !== n) {
      if (e.clientX < window.innerWidth / 2) {
        // Clicked on the left half of the screen
        if (c > 0) {
          showSlide(c - 1);
        }
      } else {
        // Clicked on the right half of the screen
        if (c < l.length - 1) {
          showSlide(c + 1);
        }
      }
    }
  }

  n.addEventListener("click", () => {
    if (c < l.length - 1) {
      showSlide(c + 1);
    }
  });

  p.addEventListener("click", () => {
    if (c > 0) {
      showSlide(c - 1);
    }
  });

  // Add click event listener to the document
  document.addEventListener("click", handleClick);
});
