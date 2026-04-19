// Optimized code for the application including features: 

// 1. Counter Animation
let countElement = document.getElementById('counter');
let count = 0;
let targetCount = 100;
let increment = targetCount / 100;

function updateCounter() {
    count += increment;
    countElement.innerText = Math.round(count);
    if (count < targetCount) {
        requestAnimationFrame(updateCounter);
    }
}
requestAnimationFrame(updateCounter);

// 2. Filter Functionality
const items = document.querySelectorAll('.item');
const filterInput = document.getElementById('filter-input');

filterInput.addEventListener('input', function () {
    const filterValue = filterInput.value.toLowerCase();
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filterValue) ? 'block' : 'none';
    });
});

// 3. Magnetic Button Effect
const buttons = document.querySelectorAll('.magnetic-button');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY, target } = e;
        const { clientWidth, clientHeight } = target;
        const xPos = offsetX / clientWidth;
        const yPos = offsetY / clientHeight;
        const xPosDistance = xPos - 0.5;
        const yPosDistance = yPos - 0.5;
        const xTranslate = xPosDistance * 20;
        const yTranslate = yPosDistance * 20;
        target.style.transform = `translate(${xTranslate}px, ${yTranslate}px)`;
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// 4. Tilt Card Effect
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { clientX, clientY, target } = e;
        const { left, top, width, height } = target.getBoundingClientRect();
        const xPos = (clientX - left) / width;
        const yPos = (clientY - top) / height;
        const tiltX = (yPos - 0.5) * 10;
        const tiltY = -(xPos - 0.5) * 10;
        target.style.transform = `rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0)';
    });
});

// 5. Form Handling
const form = document.getElementById('my-form');
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default submission
    const formData = new FormData(form);
    const formObj = {};
    formData.forEach((value, key) => {
        formObj[key] = value;
    });
    console.log('Form Submitted:', formObj);
    // Here you can handle form submission (e.g., send to a server)
});
