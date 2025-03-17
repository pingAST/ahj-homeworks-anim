export default class Collapse {
  constructor(container) {
    this.elements = {
      container,
      button: container.querySelector(".modern-button"),
      content: container.querySelector(".content-box"),
      copyButton: container.querySelector(".copy-button"),
      copyFeedback: container.querySelector(".copy-feedback"),
      textToCopy: container.querySelector(".framed-text"),
    };
    this.init();
  }

  init() {
    this.elements.content.style.maxHeight = "0";
    this.addEventListeners();
  }

  addEventListeners() {
    this.elements.button.addEventListener("click", () => this.toggle());
    this.elements.copyButton.addEventListener("click", () =>
      this.copyContent(),
    );
  }

  toggle() {
    const { button, content } = this.elements;
    button.classList.toggle("active");
    const isOpen = content.style.maxHeight !== "0px";

    content.style.maxHeight = isOpen ? "0" : `${content.scrollHeight}px`;
  }

  async copyContent() {
    try {
      await navigator.clipboard.writeText(this.elements.textToCopy.textContent);
      this.showFeedback("Copied!", true);
    } catch (err) {
      console.error("Copy failed:", err);
      this.showFeedback("Error!", false);
    }
  }

  showFeedback(text, success) {
    const { copyFeedback } = this.elements;
    copyFeedback.textContent = text;
    copyFeedback.style.backgroundColor = success ? "#2563eb" : "#ec1212";
    copyFeedback.classList.add("show");

    setTimeout(() => {
      copyFeedback.classList.remove("show");
    }, 2000);
  }
}
