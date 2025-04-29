/**
 * Wait until the DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const redSlider = document.getElementById("red");
    const greenSlider = document.getElementById("green");
    const blueSlider = document.getElementById("blue");
    const redVal = document.getElementById("redVal");
    const greenVal = document.getElementById("greenVal");
    const blueVal = document.getElementById("blueVal");
    const colorBox = document.getElementById("color-box");

    // Null-check elements
    if (!redSlider || !greenSlider || !blueSlider || !redVal || !greenVal || !blueVal || !colorBox) {
        console.error("One or more elements are missing in the DOM.");
        // Provide user feedback instead of just logging
        alert("An error occurred: One or more elements are missing in the DOM.");
        return;
    }

    // Function to clamp values (0-255)
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    // Function to update box color
    const updateColor = () => {
        const r = clamp(parseInt(redSlider.value, 10) || 0, 0, 255);
        const g = clamp(parseInt(greenSlider.value, 10) || 0, 0, 255);
        const b = clamp(parseInt(blueSlider.value, 10) || 0, 0, 255);

        redVal.textContent = r;
        greenVal.textContent = g;
        blueVal.textContent = b;

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };

    // Debounce function to limit how often updateColor is called
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Add event listeners to sliders with debouncing
    redSlider.addEventListener("input", debounce(updateColor, 100));
    greenSlider.addEventListener("input", debounce(updateColor, 100));
    blueSlider.addEventListener("input", debounce(updateColor, 100));

    // Initialize the color box
    updateColor();
});
