function getHexColor(currentSquare) {
  currentSquare.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
}

function getChosenRedValue() {
    currentRedValue.textContent = redSlider.value;
    updateColorScheme(squareGrid);
}

function getChosenGreenValue() {
    currentGreenValue.textContent = greenSlider.value;
    updateColorScheme(squareGrid);
}

function getChosenBlueValue() {
    currentBlueValue.textContent = blueSlider.value;
    updateColorScheme(squareGrid);
}

function setUpSquares (currentSize, grid) {
    let size = (960 / currentSize) + "px";

    for (let i = 0; i < (currentSize ** 2); i++) {
        let square = document.createElement("div");
        square.style.height = size;
        square.style.width = size;
        square.style.backgroundColor = "white";
        square.setAttribute("class", "square");
        square.setAttribute("id", i);

        square.addEventListener("mouseover", () => getHexColor(square));
        grid.appendChild(square);
    }
}

function updateColorScheme (grid) {
    let squares = Array.from(grid.querySelectorAll(".square"))
    for (let square of squares) {
        let currentSquareColor = square.style.backgroundColor;
        square.removeEventListener("mouseover", () => getHexColor(square));
        square.addEventListener("mouseover", () => getHexColor(square));
        square.style.backgroundColor = currentSquareColor;
    }
    currentColorBox.style.backgroundColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
}

function deleteSquares (grid) {
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
}

const squareGrid = document.querySelector(".squareGrid");
const sizeButton = document.querySelector(".sizeButton");
const currentColorBox = document.querySelector(".currentRGBColorBox");

let redSlider = document.querySelector("#redSlider");
let greenSlider = document.querySelector("#greenSlider");
let blueSlider = document.querySelector("#blueSlider");
let currentRedValue = document.querySelector("#currentRedValue");
let currentGreenValue = document.querySelector("#currentGreenValue");
let currentBlueValue = document.querySelector("#currentBlueValue");
let gridSize = 16;

redSlider.addEventListener("input", getChosenRedValue);
greenSlider.addEventListener("input", getChosenGreenValue);
blueSlider.addEventListener("input", getChosenBlueValue);

setUpSquares(gridSize, squareGrid);
updateColorScheme(squareGrid);

sizeButton.addEventListener("click", () => {
    deleteSquares(squareGrid);
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

    setUpSquares(gridSize, squareGrid);
})