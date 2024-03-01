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

  getLeftRelative(clientX) {
    let left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative;
  }

  getNewValue(clientX) {
    let leftRelative = this.getLeftRelative(clientX);
    let segments = this.config.steps - 1;
    console.log(">>> leftRelative, segments", leftRelative, segments);
    let rowValue = leftRelative * segments;
    const result = Math.round(rowValue);

    return result;
  }

  setValue(value) {
    this.value = value;
    let segments = this.config.steps - 1;
    let valuePercents = (value / segments) * 100;
    this.thumb.querySelector(".slider__value").textContent = value;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    let stepElements = this.steps.querySelectorAll("span");
    +stepElements.forEach((step, index) => {
      if (index === value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }

  addEventListeners() {
    this.elem.addEventListener("click", this.onClick.bind(this));
    this.thumb.addEventListener("pointerdown", this.onPointerDown.bind(this));
    this.elem.addEventListener("pointermove", this.onPointerMove.bind(this));
    this.thumb.addEventListener("pointerup", this.onPointerUp.bind(this));
  }

  onClick(event) {
    let value = this.getNewValue(event.clientX);

    this.setValue(value);
    this.triggerChangeEvent(value);
  }

  onPointerDown(event) {
    if (event.target.closest(".slider__thumb")) {
      this.elem.classList.add("slider_dragging");
      this.activePointerId = event.pointerId;
    }
  }

  onPointerMove(event) {
    if (this.activePointerId !== event.pointerId) return;

    let leftRelative = this.getLeftRelative(event.clientX);

    let value = this.getNewValue(event.clientX);

    if (this.value !== value) {
      this.setValue(value);
    }

    let leftPercents = leftRelative * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
  }

  triggerChangeEvent(value) {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,
      })
    );
  }

  onPointerUp(event) {
    if (this.activePointerId !== event.pointerId) return;

    this.triggerChangeEvent(this.value);

    this.elem.classList.remove("slider_dragging");
    delete this.activePointerId;
  }
}
