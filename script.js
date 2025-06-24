const moodBtns = document.querySelector(".mood-btns");
moodBtns.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const mood = e.target.dataset.mood;
  }
});
