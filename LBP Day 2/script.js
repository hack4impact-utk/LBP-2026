"use strict";
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let moodBox = document.getElementById("moodBox");
btn1.addEventListener("click", function () {
    moodBox.textContent = "I am feeling happy today.";
});

btn2.addEventListener("click", function () {
    moodBox.textContent = "I am feeling sad today.";
});

btn3.addEventListener("click", function () {
    moodBox.textContent = "I am feeling hungry today.";
});