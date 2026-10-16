"use strict";
const moods = {
    happy: { emoji: "😄", label: "Happy", color: "#ffe66d" },
    sad: { emoji: "😢", label: "Sad", color: "#7aa5d8" },
    angry: { emoji: "😠", label: "Angry", color: "#ff6b6b" },
    calm: { emoji: "😌", label: "Calm", color: "#98d8c8" },
    excited: { emoji: "🤩", label: "Excited", color: "#ffa94d" },
};
const neutral = { emoji: "😐", label: "Neutral", color: "#e0e0e0" };
const emojiEl = document.getElementById("emoji");
const labelEl = document.getElementById("label");
const input = document.getElementById("moodInput");
const resetBtn = document.getElementById("resetBtn");
const moodButtons = document.querySelectorAll("[data-mood]");
function setMood(mood) {
    emojiEl.textContent = mood.emoji;
    labelEl.textContent = mood.label;
    document.body.style.background = mood.color;
    // small "pop" animation
    emojiEl.classList.add("pop");
    setTimeout(() => emojiEl.classList.remove("pop"), 300);
}
// Buttons change the mood
moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const key = button.dataset.mood;
        setMood(moods[key]);
        input.value = moods[key].label;
    });
});
// Typing a mood name in the textbox changes it too
input.addEventListener("input", () => {
    const typed = input.value.trim().toLowerCase();
    if (moods[typed]) {
        setMood(moods[typed]);
    }
});
resetBtn.addEventListener("click", () => {
    setMood(neutral);
    input.value = "";
});
