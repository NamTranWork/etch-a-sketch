function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function setUpSquares (currentSize, grid) {
    let size = (960 / currentSize) + "px";

    for (let i = 0; i < (currentSize ** 2); i++) {
        let square = document.createElement("div");
        square.style.height = size;
        square.style.width = size;
        square.style.backgroundColor = "white";
        square.setAttribute("class", "square");

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = getRandomHexColor();
        })
        grid.appendChild(square);
    }
}

function deleteSquares (grid) {
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
}

const squareGrid = document.querySelector(".squareGrid");
const sizeButton = document.querySelector(".sizeButton");
let gridSize = 16;
setUpSquares(gridSize, squareGrid);

sizeButton.addEventListener("click", () => {
    deleteSquares(squareGrid);
    gridSize = +(prompt("Enter a grid size (Max 100)"))

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