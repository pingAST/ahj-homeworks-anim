import Collapse from "./widgets/Collapse";
import Liker from "./widgets/Liker";
import FeedbackWidget from "./widgets/FeedbackWidget";

document.querySelectorAll(".collapse-widget").forEach((widget) => {
  new Collapse(widget);
});

document.querySelectorAll(".liker-widget").forEach((widget) => {
  new Liker(widget);
});

document.querySelectorAll(".feedback-widget").forEach((widget) => {
  new FeedbackWidget(widget);
});
