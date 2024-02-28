import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
            <div class="modal">
                <div class="modal__overlay"></div>
                <div class="modal__inner">
                    <div class="modal__header">
                        <button type="button" class="modal__close">
                            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                        </button>
                        <h3 class="modal__title"></h3>
                    </div>
                    <div class="modal__body"></div>
                </div>
            </div>
        `);
    this.modalTitle = this.elem.querySelector(".modal__title");
    this.modalBody = this.elem.querySelector(".modal__body");
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = "";
    this.modalBody.appendChild(node);
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.appendChild(this.elem);
    document.addEventListener("keydown", this.onKeyDown);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.onKeyDown);
    this.elem.remove();
  }

  addEventListeners() {
    this.elem
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    this.elem
      .querySelector(".modal__overlay")
      .addEventListener("click", () => this.close());
    this.onKeyDown = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };
  }
}
