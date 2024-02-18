function initCarousel() {
  const innerCarousel = document.querySelector(".carousel__inner");
  const slides = document.querySelectorAll(".carousel__slide");
  const slideWidth = slides[0].offsetWidth;

  let currentIndex = 0;
  const prevButton = document.querySelector(".carousel__arrow_left");
  const nextButton = document.querySelector(".carousel__arrow_right");

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      innerCarousel.style.transform = `translateX(-${
        slideWidth * currentIndex
      }px)`;
      prevButton.style.display = "";
    }
    if (currentIndex === slides.length - 1) {
      nextButton.style.display = "none";
    }
  }
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      innerCarousel.style.transform = `translateX(-${
        slideWidth * currentIndex
      }px)`;
      nextButton.style.display = "";
    }
    if (currentIndex === 0) {
      prevButton.style.display = "none";
    }
    if (currentIndex === slides.length - 2) {
      nextButton.style.display = "";
    }
  }
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
  prevButton.style.display = "none";
  if (slides.length <= 1) {
    nextButton.style.display = "none";
  }
}
