// Function to color a square
function getHexColor(currentSquare) {
    // If in "mousedown" mode, only apply color if mouse is pressed
    if (currentMode === "mousedown") {
        if (mouseIsDown === true) {
            if (currentTool === "eraser") {
                currentSquare.style.backgroundColor = 'rgb(255,255,255)';
            } else {
                currentSquare.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
            }
        }
    } else {
        // In "mouseover" mode, always apply color on hover
        if (currentTool === "eraser") {
            currentSquare.style.backgroundColor = 'rgb(255,255,255)';
        } else {
            currentSquare.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
        }
    }
}

// RGB Slider Handlers
function getChosenRedValue() {
    currentRedValue.textContent = redSlider.value;
    updateColorScheme();
}

function getChosenGreenValue() {
    currentGreenValue.textContent = greenSlider.value;
    updateColorScheme();
}

function getChosenBlueValue() {
    currentBlueValue.textContent = blueSlider.value;
    updateColorScheme();
}

// Create Grid of Squares
function setUpSquares(currentSize) {
    let size = (960 / currentSize) + "px";

    for (let i = 0; i < (currentSize ** 2); i++) {
        let square = document.createElement("div");
        square.style.height = size;
        square.style.width = size;
        square.style.backgroundColor = 'rgb(255,255,255)';

        square.setAttribute("class", "square");
        square.setAttribute("id", i);

        // Store the handler to allow re-binding later
        square._colorHandler = () => getHexColor(square);
        square.addEventListener("mouseover", square._colorHandler);

        squareGrid.appendChild(square);
    }
}

// Update Event Listeners and Color Preview Box
function updateColorScheme() {
    let squares = Array.from(squareGrid.querySelectorAll(".square"));

    for (let square of squares) {
        let currentSquareColor = square.style.backgroundColor;

        // Re-attach the updated handler
        square.removeEventListener("mouseover", square._colorHandler);
        square.addEventListener("mouseover", square._colorHandler);

        // Preserve current color
        square.style.backgroundColor = currentSquareColor;
    }

    // Update color preview box
    currentColorBox.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
}

// Remove All Squares from Grid
function deleteSquares() {
    while (squareGrid.lastElementChild) {
        squareGrid.removeChild(squareGrid.lastElementChild);
    }
}

// DOM Elements & Initial Values
const squareGrid = document.querySelector(".squareGrid");
const sizeDisplay = document.querySelector("#gridInfo");
const actionDisplay = document.querySelector('#actionInfo');
const toolDisplay = document.querySelector('#toolInfo');
const sizeButton = document.querySelector("#sizeButton");
const actionButton = document.querySelector("#actionButton");
const toolButton = document.querySelector('#toolButton');
const currentColorBox = document.querySelector(".currentRGBColorBox");

let redSlider = document.querySelector("#redSlider");
let greenSlider = document.querySelector("#greenSlider");
let blueSlider = document.querySelector("#blueSlider");

let currentRedValue = document.querySelector("#currentRedValue");
let currentGreenValue = document.querySelector("#currentGreenValue");
let currentBlueValue = document.querySelector("#currentBlueValue");

// App State
let currentMode = "mouseover"; // or "mousedown"
let currentTool = "pencil";    // or "eraser"
let mouseIsDown = false;
let gridSize = 16;

// Slider Event Listeners
redSlider.addEventListener("input", getChosenRedValue);
greenSlider.addEventListener("input", getChosenGreenValue);
blueSlider.addEventListener("input", getChosenBlueValue);

// Initial UI Setup
sizeDisplay.textContent = `${gridSize} X ${gridSize} PIXELS`;
actionDisplay.textContent = `HOVER`;
toolDisplay.textContent = `${currentTool.toUpperCase()}`;
setUpSquares(gridSize);
updateColorScheme();

// Size Button Click Handler
sizeButton.addEventListener("click", () => {
    let input = prompt("Enter a grid size (Max 100)");

    while (input === null || isNaN(+input) || (typeof +input === "number" && (+input < 1 || +input > 100))) {
        if (input === null) break;
        else if (input === "" || isNaN(+input)) alert("Please enter a valid number");
        else if (+input < 1) alert("Number inserted is too low. Minimum number is 1");
        else if (+input > 100) alert("Number is too high. Maximum number is 100");

        input = prompt("Enter a grid size (Max 100)");
    }

    if (input !== null) {
        gridSize = +input;
        deleteSquares();
        setUpSquares(gridSize);
        sizeDisplay.textContent = `${gridSize} X ${gridSize} PIXELS`;
    }
});

// Toggle Draw Mode Button
actionButton.addEventListener("click", () => {
    if (currentMode === "mouseover") {
        currentMode = "mousedown";
        actionButton.textContent = "Hover Mode";
        actionDisplay.textContent = `MOUSEDOWN`;
    } else {
        currentMode = "mouseover";
        actionButton.textContent = "Mousedown Mode";
        actionDisplay.textContent = `HOVER`;
    }
});

// Toggle Tool (Pencil / Eraser)
toolButton.addEventListener("click", () => {
    if (currentTool === "pencil") {
        currentTool = "eraser";
        toolButton.textContent = "Pencil Tool";
    } else {
        currentTool = "pencil";
        toolButton.textContent = "Eraser Tool";
    }
    toolDisplay.textContent = `${currentTool.toUpperCase()}`;
});

// Mouse Events
document.addEventListener("mousedown", () => mouseIsDown = true);
document.addEventListener("mouseup", () => mouseIsDown = false);

// Keyboard Shortcuts for RGB Sliders
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case '1':
            redSlider.value = Math.max(0, parseInt(redSlider.value) - 1);
            getChosenRedValue();
            break;
        case '2':
            redSlider.value = Math.min(parseInt(redSlider.value) + 1, 255);
            getChosenRedValue();
            break;
        case '3':
            greenSlider.value = Math.max(0, parseInt(greenSlider.value) - 1);
            getChosenGreenValue();
            break;
        case '4':
            greenSlider.value = Math.min(parseInt(greenSlider.value) + 1, 255);
            getChosenGreenValue();
            break;
        case '5':
            blueSlider.value = Math.max(0, parseInt(blueSlider.value) - 1);
            getChosenBlueValue();
            break;
        case '6':
            blueSlider.value = Math.min(parseInt(blueSlider.value) + 1, 255);
            getChosenBlueValue();
            break;
        default:
            break;
    }
});
