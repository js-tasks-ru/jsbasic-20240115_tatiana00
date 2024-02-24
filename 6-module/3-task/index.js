import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.initCarousel();
  }

  render() {
    this.elem = createElement(`
        <div class="carousel">
            <div class="carousel__inner" style="transform: translateX(0px)">
                ${this.slides
                  .map(
                    (slide) => `
                    <div class="carousel__slide" data-id="${slide.id}">
                        <img src="/assets/images/carousel/${
                          slide.image
                        }" class="carousel__img" alt="slide">
                        <div class="carousel__caption">
                            <span class="carousel__price">€${slide.price.toFixed(
                              2
                            )}</span>
                            <div class="carousel__title">${slide.name}</div>
                            <button type="button" class="carousel__button">
                                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <button class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
            <button class="carousel__arrow carousel__arrow_left" style="display: none">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </button>
        </div>
    `);
  }

  initCarousel() {
    this.elem.onclick = (event) => {
      let button = event.target.closest(".carousel__button");
      if (!button) return;
      let slide = button.closest(".carousel__slide");
      let slideId = slide.dataset.id;
      console.log(slideId);

      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
          id: slideId,
        })
      );
    };

    let inner = this.elem.querySelector(".carousel__inner");
    let arrows = this.elem.querySelectorAll(".carousel__arrow");

    this.elem.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".carousel__arrow_right")) {
        this.nextSlide(inner, arrows);
      } else if (target.closest(".carousel__arrow_left")) {
        this.prevSlide(inner, arrows);
      }
    });
  }

  nextSlide(inner, arrows) {
    const slideWidth = inner.offsetWidth;
    const currentSlide = this.getCurrentSlide(inner);
    const nextTransform = slideWidth * currentSlide;
    inner.style.transform = `translateX(${
      nextTransform > 0 ? "-" : ""
    }${nextTransform}px)`;
    this.hideArrows(inner, arrows);
  }

  prevSlide(inner, arrows) {
    const slideWidth = inner.offsetWidth;
    const currentSlide = this.getCurrentSlide(inner);
    const nextTransform = slideWidth * (currentSlide - 2);
    inner.style.transform = `translateX(${
      nextTransform > 0 ? "-" : ""
    }${nextTransform}px)`;
    this.hideArrows(inner, arrows);
  }

  hideArrows(inner, arrows) {
    let slideCount = inner.querySelectorAll(".carousel__slide").length;

    const currentSlide = this.getCurrentSlide(inner);
    if (currentSlide === 1) {
      arrows[1].style.display = "none";
    } else {
      arrows[1].style.display = "";
    }

    if (currentSlide === slideCount) {
      arrows[0].style.display = "none";
    } else {
      arrows[0].style.display = "";
    }
  }

  getCurrentSlide(inner) {
    let slideWidth = inner.offsetWidth;
    let currentTransform = inner.style.transform;
    let currentTranslate = +currentTransform.match(/-?\d+/)[0];
    return Math.abs(currentTranslate / slideWidth) + 1;
  }
}
