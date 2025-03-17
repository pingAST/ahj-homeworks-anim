export default class FeedbackWidget {
  constructor(container) {
    this.container = container;
    this.widget = container.querySelector(".feedback-widget__container");
    this.toggleBtn = container.querySelector(".feedback-widget__toggle");
    this.isOpen = false;

    this.textarea = this.widget.querySelector(".feedback-widget__input");
    this.form = this.widget.querySelector(".feedback-widget__form");
    this.successMessage = this.widget.querySelector(
      ".feedback-widget__success-message",
    );
    this.errorMessage = this.widget.querySelector(
      ".feedback-widget__error-message",
    );

    this.init();
  }

  init() {
    this.toggleBtn.addEventListener("click", (e) => this.toggle(e));
    this.container.addEventListener("click", (e) => {
      if (e.target.closest(".feedback-widget__close")) this.close();
    });

    document.addEventListener("click", (e) => this.handleClickOutside(e));
    this.textarea.addEventListener("input", () => this.handleTextareaInput());
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  toggle(e) {
    e.preventDefault();
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.widget.classList.add("feedback-widget__container--visible");
    this.toggleBtn.classList.add("feedback-widget__toggle--hidden");
    this.toggleBtn.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      this.textarea.focus({ preventScroll: true });
    });
  }

  close() {
    this.isOpen = false;
    this.widget.classList.remove("feedback-widget__container--visible");
    this.toggleBtn.classList.remove("feedback-widget__toggle--hidden");
    this.toggleBtn.setAttribute("aria-expanded", "false");
    this.resetForm();
  }

  // Остальные методы остаются без изменений
  handleClickOutside(e) {
    if (
      !this.widget.contains(e.target) &&
      !this.toggleBtn.contains(e.target) &&
      this.isOpen
    ) {
      this.close();
    }
  }

  handleTextareaInput() {
    this.textarea.style.height = "auto";
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    this.hideError();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.textarea.value.trim()) {
      this.textarea.classList.add("feedback-widget__input--error");
      this.errorMessage.classList.add(
        "feedback-widget__error-message--visible",
      );
      this.textarea.focus();
      return;
    }

    try {
      await this.sendFeedback(this.textarea.value);
      this.form.classList.add("feedback-widget__form--hidden");
      this.successMessage.classList.add(
        "feedback-widget__success-message--visible",
      );
      setTimeout(() => this.close(), 2000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  }

  resetForm() {
    this.form.classList.remove("feedback-widget__form--hidden");
    this.successMessage.classList.remove(
      "feedback-widget__success-message--visible",
    );
    this.textarea.value = "";
    this.textarea.style.height = "auto";
    this.hideError();
  }

  hideError() {
    this.textarea.classList.remove("feedback-widget__input--error");
    this.errorMessage.classList.remove(
      "feedback-widget__error-message--visible",
    );
  }

  async sendFeedback(message) {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
