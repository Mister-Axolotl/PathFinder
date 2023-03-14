// ============================== Variables ==============================

var resetButton = document.querySelector('#reset');
var findPathButton = document.querySelector('#find-path');
var container = document.querySelector(".grid-container");
var textCharacterPosition = document.querySelector("#character-position");
var textFoodPosition = document.querySelector("#food-position");
var timerInterval;
let finish;
//TODO faire des paramètres

// ============================== Functions ==============================

function updateTextsPositions(){ // Update the text
    textCharacterPosition.innerHTML = `Snail Position: ${findCharacterPosition()}`;
    textFoodPosition.innerHTML = `Food Position: ${findFoodPosition()}`;
}

function resetMap(){ // Reset the map
    finish = false;
    window.clearTimeout(timerInterval);
    container.style.backgroundImage = "url('./images/plains.png')";
    findPathButton.disabled = false;
    resetButton.style.backgroundColor = "rgb(111, 111, 255)";
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        let randomNum = Math.random();
        cell.classList.remove("glow");
        if(randomNum < 0.1) {
            cell.innerHTML = "🌳";
        } else {
            cell.innerHTML = "🟩";
        }
    }
    
    function randomNumber(){ // Generate a number between 1 and 100
        return Math.floor(Math.random() * 100) + 1;
    }

    function characterAndFood(){ // Generate character and food
        let randomNumCharacter = randomNumber();
        let randomNumFood = randomNumber();
        let cellCharacter = document.querySelector(`[id='${randomNumCharacter}']`);
        let cellFood = document.querySelector(`[id='${randomNumFood}']`);
        if(randomNumCharacter != randomNumFood){
            cellFood.innerHTML = "🥬";
            cellFood.classList.add("glow");
            cellCharacter.innerHTML = "🐌";
        } else {
            characterAndFood();
        }
    }
    characterAndFood();
    updateTextsPositions();
}

function findCharacterPosition(){ // Found where is the cell of the character
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        if(cell.innerHTML == "🐌"){
            return i;
        }
    }
}

function findFoodPosition(){ // Found where is the cell of the food
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        if(cell.innerHTML == "🥬"){
            return i;
        }
    }
}

function replaceCell(ancientCell, newCell){ // Replaces the cell where the character has passed
    ancientCell.innerHTML = "🟦";
    newCell.innerHTML = "🐌";
}

function detectTree(newCell){ // Detect if there is a obstacle in the new cell
    if(newCell.innerHTML == "🌳") {
        return true;
    } else return false;
}

function moveUp(positionCharacter){
    if(positionCharacter > 10){
        let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
        let newCell = document.querySelector(`[id='${positionCharacter - 10}']`);
        if(cellWhereGoIsFood(newCell) === true){
            finish = true;
        }
        if(detectTree(newCell) === false){
            replaceCell(ancientCell, newCell);
        } else {
            let random = Math.floor(Math.random() * 3) + 1;
            if(random == 1){
                moveLeft(positionCharacter);
            } else if(random == 2) {
                moveRight(positionCharacter);
            } else if(random == 3) {
                moveDown(positionCharacter);
            }
        }
    }
}

function moveDown(positionCharacter){
    if(positionCharacter <= 90){
        let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
        let newCell = document.querySelector(`[id='${positionCharacter + 10}']`);
        if(cellWhereGoIsFood(newCell) === true){
            finish = true;
        }
        if(detectTree(newCell) === false){
            replaceCell(ancientCell, newCell);
        } else {
            let random = Math.floor(Math.random() * 3) + 1;
            if(random == 1){
                moveLeft(positionCharacter);
            } else if(random == 2) {
                moveRight(positionCharacter);
            } else if(random == 3) {
                moveUp(positionCharacter);
            }
        }
    }
}

function moveLeft(positionCharacter){
    if(positionCharacter > 0){
        let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
        let newCell = document.querySelector(`[id='${positionCharacter - 1}']`);
        if(cellWhereGoIsFood(newCell) === true){
            finish = true;
        }
        if(detectTree(newCell) === false){
            replaceCell(ancientCell, newCell);
        } else {
            let random = Math.floor(Math.random() * 3) + 1;
            if(random == 1){
                moveUp(positionCharacter);
            } else if(random == 2) {
                moveDown(positionCharacter);
            } else if(random == 3) {
                moveRight(positionCharacter);
            }
        }
    }
}

function moveRight(positionCharacter){
    if(positionCharacter < 100){
        let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
        let newCell = document.querySelector(`[id='${positionCharacter + 1}']`);
        if(cellWhereGoIsFood(newCell) === true){
            finish = true;
        }
        if(detectTree(newCell) === false){
            replaceCell(ancientCell, newCell);
        } else {
            let random = Math.floor(Math.random() * 3) + 1;
            if(random == 1){
                moveUp(positionCharacter);
            } else if(random == 2) {
                moveDown(positionCharacter);
            } else if(random == 3) {
                moveLeft(positionCharacter);
            }
        }
    }
}

function characterMove(){
    updateTextsPositions();
    let positionCharacter = findCharacterPosition();
    let positionFood = findFoodPosition();
    let difference;
    let axeYDone = false;

    if(positionCharacter > positionFood){
        difference = positionCharacter - positionFood;
        if(difference > 5){
            moveUp(positionCharacter);
        } else {
            axeYDone = true;
        }
    } else {
        difference = positionFood - positionCharacter;
        if(difference > 5){
            moveDown(positionCharacter);
        } else {
            axeYDone = true;
        }
    }

    if(axeYDone === true){
        if(positionCharacter > positionFood){
            difference = positionCharacter - positionFood;
            if(difference < 10){
                moveLeft(positionCharacter);
            }
        } else {
            difference = positionFood -positionCharacter;
            if(difference < 10){
                moveRight(positionCharacter);
            }
        }
    }
}

function cellWhereGoIsFood(cell){
    if(cell.innerHTML == "🥬") return true;
    else return false;
}

function findPath(){
    findPathButton.disabled = true;
    timerInterval = setTimeout(function(){
        characterMove();
        if(finish === true){
            container.style.backgroundImage = "url('./images/finishSnail.png')";
            textCharacterPosition.innerHTML = `Snail Position: ${findCharacterPosition()}`;
            resetButton.style.backgroundColor = "rgb(111, 255, 111)";
            let cell = document.querySelector(`[id='${findCharacterPosition()}']`);
            cell.classList.remove("glow");
        } else{
            findPath();
        }
    }, 300);
}

// ============================== Buttons ==============================

resetButton.addEventListener('click', function(){
    resetMap();
});

findPathButton.addEventListener('click', function(){
    findPath();
});

// ============================== When page startup ==============================

for(let i = 1 ; i <= 100 ; i++){
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    container.appendChild(cell).id = i;
}

resetMap();
updateTextsPositions();