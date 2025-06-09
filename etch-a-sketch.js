function getHexColor(currentSquare) {
    if (currentMode === "mousedown") {
        if (mouseIsDown === true) {
            currentSquare.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
        }
    } else {
        currentSquare.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
    }
}

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

function setUpSquares (currentSize) {
    let size = (960 / currentSize) + "px";

    for (let i = 0; i < (currentSize ** 2); i++) {
        let square = document.createElement("div");
        square.style.height = size;
        square.style.width = size;
        square.style.backgroundColor = 'rgb(255,255,255)';

        square.setAttribute("class", "square");
        square.setAttribute("id", i);
        square._colorHandler = () => getHexColor(square);
        square.addEventListener("mouseover", square._colorHandler);

        squareGrid.appendChild(square);
    }
}

function updateColorScheme () {
    let squares = Array.from(squareGrid.querySelectorAll(".square"));
    for (let square of squares) {
        let currentSquareColor = square.style.backgroundColor;
        square.removeEventListener("mouseover", square._colorHandler);
        square.addEventListener("mouseover", square._colorHandler);
        square.style.backgroundColor = currentSquareColor;
    }
    currentColorBox.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
}

function deleteSquares () {
    while (squareGrid.lastElementChild) {
        squareGrid.removeChild(squareGrid.lastElementChild);
    }
}

const squareGrid = document.querySelector(".squareGrid");
const sizeButton = document.querySelector("#sizeButton");
const actionButton = document.querySelector("#actionButton");
const currentColorBox = document.querySelector(".currentRGBColorBox");

let redSlider = document.querySelector("#redSlider");
let greenSlider = document.querySelector("#greenSlider");
let blueSlider = document.querySelector("#blueSlider");
let currentRedValue = document.querySelector("#currentRedValue");
let currentGreenValue = document.querySelector("#currentGreenValue");
let currentBlueValue = document.querySelector("#currentBlueValue");
let currentMode = "mouseover";
let mouseIsDown = false;
let gridSize = 16;

redSlider.addEventListener("input", getChosenRedValue);
greenSlider.addEventListener("input", getChosenGreenValue);
blueSlider.addEventListener("input", getChosenBlueValue);

setUpSquares(gridSize);
updateColorScheme();

sizeButton.addEventListener("click", () => {
    deleteSquares();
    gridSize = +(prompt("Enter a grid size (Max 100)"));

    while (isNaN(gridSize) || (typeof gridSize === "number" && (gridSize < 1 || gridSize > 100))) {
        if (isNaN(gridSize)) {
            alert("Please enter a valid number");
        }
        else if (gridSize < 1) {
            alert("Number inserted is too low. Minimum number is 1");
        }
        else if (gridSize > 100) {
            alert("Number is too high. Maximum number is 100");
        }
        
        gridSize = +(prompt("Enter a grid size (Max 100)"));
    }

    setUpSquares(gridSize);
})

actionButton.addEventListener("click", () => {
    let oldMode = currentMode;
    if (currentMode === "mouseover") {
        currentMode = "mousedown";
        actionButton.textContent = "Hover Mode";
    }
    else if (currentMode === "mousedown") {
        currentMode = "mouseover";
        actionButton.textContent = "Mousedown Mode";
    }
})

document.addEventListener("mousedown", () => mouseIsDown = true);
document.addEventListener("mouseup", () => mouseIsDown = false);

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