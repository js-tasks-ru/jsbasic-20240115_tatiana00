export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = { steps, value };
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");

    let stepsHtml = "";
    for (let i = 0; i < this.config.steps; i++) {
      stepsHtml += "<span></span>";
    }

    this.elem.innerHTML = `
            <div class="slider__thumb">
                <span class="slider__value">${this.config.value}</span>
            </div>
            <div class="slider__progress"></div>
            <div class="slider__steps">${stepsHtml}</div>
        `;

    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.steps = this.elem.querySelector(".slider__steps");

    this.setValue(this.config.value);
  }

  setValue(value) {
    this.value = value;
    let segments = this.config.steps - 1;
    let valuePercents = (value / segments) * 100;
    this.thumb.querySelector(".slider__value").textContent = value;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    let stepElements = this.steps.querySelectorAll("span");
+

    stepElements.forEach((step, index) => {
      if (index === value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }

  addEventListeners() {
    this.elem.addEventListener("click", this.onClick.bind(this));
    document.addEventListener("pointerdown", this.onPointerDown.bind(this));
    document.addEventListener("pointermove", this.onPointerMove.bind(this));
    document.addEventListener("pointerup", this.onPointerUp.bind(this));
  }

  onClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.config.steps - 1;
    let value = Math.round(leftRelative * segments);

    this.setValue(value);
    this.triggerChangeEvent();
  }

  onPointerDown(event) {
    if (event.target.closest(".slider__thumb")) {
      this.elem.classList.add("slider_dragging");
      this.activePointerId = event.pointerId;
    }
  }

  onPointerMove(event) {
    if (this.activePointerId !== event.pointerId) return;

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.config.steps - 1;
    let value = Math.round(leftRelative * segments);

    if (this.value !== value) {
      this.setValue(value);
    }

    let leftPercents = leftRelative * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
  }

  triggerChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  onPointerUp(event) {
    this.setValue(this.value);
    this.triggerChangeEvent();

    if (this.activePointerId !== event.pointerId) return;

    this.elem.classList.remove("slider_dragging");
    delete this.activePointerId;
  }
}
