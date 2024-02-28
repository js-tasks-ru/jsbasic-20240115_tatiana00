import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement("nav");
    this.elem.classList.add("ribbon");

    const ribbonInner = document.createElement("div");
    ribbonInner.classList.add("ribbon__inner");

    this.categories.forEach((category) => {
      const item = document.createElement("a");
      item.href = "#";
      item.classList.add("ribbon__item");
      item.textContent = category.name;
      item.dataset.id = category.id;
      ribbonInner.appendChild(item);
    });

    this.elem.appendChild(ribbonInner);

    this.arrowLeft = document.createElement("button");
    this.arrowLeft.classList.add("ribbon__arrow", "ribbon__arrow_left");
    this.elem.appendChild(this.arrowLeft);

    this.arrowRight = document.createElement("button");
    this.arrowRight.classList.add("ribbon__arrow", "ribbon__arrow_right");
    this.elem.appendChild(this.arrowRight);

    document.body.append(this.elem);
  }

  addEventListeners() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.classList.contains("ribbon__item")) {
        event.preventDefault();
        const categoryId = event.target.dataset.id;
        this.toggleActive(event.target);
        this.dispatchRibbonSelectEvent(categoryId);
      }
    });

    this.arrowLeft.addEventListener("click", () => {
      this.scroll("left");
    });

    this.arrowRight.addEventListener("click", () => {
      this.scroll("right");
    });

    this.elem.querySelector(".ribbon__inner").addEventListener("scroll", () => {
      this.toggleArrowsVisibility();
    });
  }

  toggleActive(target) {
    const activeItem = this.elem.querySelector(".ribbon__item_active");
    if (activeItem) {
      activeItem.classList.remove("ribbon__item_active");
    }
    target.classList.add("ribbon__item_active");
  }

  scroll(direction) {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    if (direction === "left") {
      ribbonInner.scrollBy(-350, 0);
    } else if (direction === "right") {
      ribbonInner.scrollBy(350, 0);
    }
  }

  toggleArrowsVisibility() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.arrowLeft.classList.toggle("ribbon__arrow_visible", scrollLeft > 0);
    this.arrowRight.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
  }

  dispatchRibbonSelectEvent(categoryId) {
    const ribbonSelectEvent = new CustomEvent("ribbon-select", {
      detail: categoryId,
      bubbles: true,
    });
    this.elem.dispatchEvent(ribbonSelectEvent);
  }
}
