const moveButton = document.getElementById("moveBtn") as HTMLButtonElement;
const yesButton = document.getElementById("yesBtn") as HTMLButtonElement;

const distance = 50;
const velocity = 50;
const padding = 30;

window.addEventListener("mousemove", (event: MouseEvent) => {
    const btnRect = moveButton.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const deltaX = btnCenterX - event.clientX;
    const deltaY = btnCenterY - event.clientY;
    const currentDistance = Math.hypot(deltaX, deltaY);

    if (currentDistance < distance) {
        const angle = currentDistance == 0 ? Math.random() * Math.PI * 2 : Math.atan2(deltaY, deltaX);
        let newX = btnRect.left + Math.cos(angle) * velocity;
        let newY = btnRect.top + Math.sin(angle) * velocity;
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        if (newX < padding || newX > maxX) {
        newX = Math.random() * maxX;
        }
        if (newY < padding || newY > maxY) {
        newY = Math.random() * maxY;
        }

        moveButton.style.left = `${newX}px`;
        moveButton.style.top = `${newY}px`;

        moveButton.style.transform = "none";
    }
});

window.addEventListener("click", (event: MouseEvent) => {
    if (event.target == yesButton) {
        alert("Correct, I am cooler than Yousif");
    }
});