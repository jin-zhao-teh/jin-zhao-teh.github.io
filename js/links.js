let HeroText1 = document.getElementById("Hero-text1") 
HeroText1.addEventListener("click", function() {
  //slide window up
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});