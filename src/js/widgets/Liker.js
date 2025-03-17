export default class Liker {
  constructor(container) {
    this.container = container;
    this.button = container.querySelector(".liker-btn");
    this.init();
  }

  init() {
    this.button.addEventListener("click", (e) => this.createHeart(e));
  }

  createHeart(e) {
    e.preventDefault();
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const randomVariant = Math.floor(Math.random() * 4) + 1;
    heart.classList.add(`heart-${randomVariant}`);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });

    this.button.appendChild(heart);
  }
}
