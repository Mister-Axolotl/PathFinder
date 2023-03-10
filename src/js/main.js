var resetButton = document.querySelector('#reset');
var findPathButton = document.querySelector('#find-path');
var container = document.querySelector(".grid-container");
var textCharacterPosition = document.querySelector("#character-position");
var textFoodPosition = document.querySelector("#food-position");
var timerInterval;

//TODO faire des paramètres

for(let i = 1 ; i <= 100 ; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    container.appendChild(cell).id = i;
}

function updateTextsPositions(){
    textCharacterPosition.innerHTML = `Snail Position: ${findCharacterPosition()}`;
    textFoodPosition.innerHTML = `Food Position: ${findFoodPosition()}`;
}
function resetMap() {
    window.clearTimeout(timerInterval);
    container.style.backgroundImage = "url('./images/plains.png')";
    findPathButton.disabled = false;
    resetButton.style.backgroundColor = "rgb(111, 111, 255)";
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        let randomNum = Math.random();
        if(randomNum < 0.1) {
            cell.innerHTML = "🌳";
        } else {
            cell.innerHTML = "🟩";
        }
    }
    
    function randomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function characterAndFood() {
        let randomNumCharacter = randomNumber();
        let randomNumFood = randomNumber();
        let cellCharacter = document.querySelector(`[id='${randomNumCharacter}']`);
        let cellFood = document.querySelector(`[id='${randomNumFood}']`);
        if(randomNumCharacter != randomNumFood){
            cellCharacter.innerHTML = "🥬";
            cellFood.innerHTML = "🐌";
        } else {
            characterAndFood();
        }
    }
    characterAndFood();
    updateTextsPositions();
}

function findCharacterPosition() {
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        if(cell.innerHTML == "🐌"){
            return i;
        }
    }
}

function findFoodPosition() {
    for(let i = 1 ; i <= 100 ; i++ ){
        let cell = document.querySelector(`[id='${i}']`);
        if(cell.innerHTML == "🥬"){
            return i;
        }
    }
}

function replaceCell(ancientCell, newCell) {
    ancientCell.innerHTML = "🟦";
    newCell.innerHTML = "🐌";
}

function detectTree(ancientCell, newCell) {
    if(newCell.innerHTML != "🌳") {
        return true;
    } else return false;
}

function moveUp(positionCharacter) {
    let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
    let newCell = document.querySelector(`[id='${positionCharacter - 10}']`);
    if(newCell.innerHTML != "🌳") {
        replaceCell(ancientCell, newCell);
    } else {
        newCell = document.querySelector(`[id='${positionCharacter + 1}']`);
        if(newCell.innerHTML != "🌳") {
            newCell = document.querySelector(`[id='${positionCharacter - 1}']`);
            replaceCell(ancientCell, newCell);
        }
    }
}

function moveDown(positionCharacter) {
    let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
    let newCell = document.querySelector(`[id='${positionCharacter + 10}']`);
    if(newCell.innerHTML != "🌳") {
        replaceCell(ancientCell, newCell);
    } else {
        newCell = document.querySelector(`[id='${positionCharacter + 1}']`);
        if(newCell.innerHTML != "🌳") {
            newCell = document.querySelector(`[id='${positionCharacter - 1}']`);
            replaceCell(ancientCell, newCell);
        }
    }
}

function moveLeft(positionCharacter) {
    let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
    let newCell = document.querySelector(`[id='${positionCharacter - 1}']`);
    if(newCell.innerHTML != "🌳") {
        replaceCell(ancientCell, newCell);
    } else {
        newCell = document.querySelector(`[id='${positionCharacter + 10}']`);
        if(newCell.innerHTML != "🌳") {
            newCell = document.querySelector(`[id='${positionCharacter - 10}']`);
            replaceCell(ancientCell, newCell);
        }
    }
}

function moveRight(positionCharacter) {
    let ancientCell = document.querySelector(`[id='${positionCharacter}']`);
    let newCell = document.querySelector(`[id='${positionCharacter + 1}']`);
    if(newCell.innerHTML != "🌳") {
        replaceCell(ancientCell, newCell);
    } else {
        newCell = document.querySelector(`[id='${positionCharacter + 10}']`);
        if(newCell.innerHTML != "🌳") {
            newCell = document.querySelector(`[id='${positionCharacter - 10}']`);
            replaceCell(ancientCell, newCell);
        }
    }
}

function characterMove() {
    updateTextsPositions();
    let positionCharacter = findCharacterPosition();
    let positionFood = findFoodPosition();
    let forwardCell = document.querySelector(`[id='${positionCharacter + 1}']`);
    let backwardCell = document.querySelector(`[id='${positionCharacter - 1}']`);
    let aboveCell = document.querySelector(`[id='${positionCharacter + 10}']`);
    let belowCell = document.querySelector(`[id='${positionCharacter - 10}']`);
    

    if(positionCharacter >= 1 && positionCharacter <= 10){
        if(positionCharacter > positionFood) {
            let difference = positionCharacter - positionFood;
            if(difference >= 1 && difference < 10) {
                moveLeft(positionCharacter);
            } else if(difference >= 10 && difference < 20) {
                moveLeft(positionCharacter);
            } else if(difference >= 20){
                moveUp(positionCharacter)
            }
        } else {
            let difference = positionFood - positionCharacter;
            if(difference >= 1 && difference < 10) {
                moveRight(positionCharacter);
            } else if(difference >= 10 && difference < 20) {
                moveRight(positionCharacter);
            } else if(difference >= 20){
                moveDown(positionCharacter);
            }
        }
    } else {
        if(belowCell.innerHTML == "🥬"){
            moveUp(positionCharacter);
            return true;
        } else if(forwardCell.innerHTML == "🥬"){
            moveRight(positionCharacter);
            return true;
        } else if(backwardCell.innerHTML == "🥬"){
            moveLeft(positionCharacter);
            return true;
        } else {
            if(positionCharacter > positionFood) {
                let difference = positionCharacter - positionFood;
                if(difference >= 1 && difference < 10) {
                    moveLeft(positionCharacter);
                } else if(difference >= 10 && difference < 20) {
                    moveLeft(positionCharacter);
                } else if(difference >= 20){
                    moveUp(positionCharacter)
                }
            } else {
                let difference = positionFood - positionCharacter;
                if(difference >= 1 && difference < 10) {
                    moveRight(positionCharacter);
                } else if(difference >= 10 && difference < 20) {
                    moveDown(positionCharacter);
                } else if(difference >= 20){
                    moveDown(positionCharacter);
                }
            }
        }
    }
}

function findPath() {
    findPathButton.disabled = true;
    timerInterval = setTimeout(function(){
        if(characterMove() == true){
            console.log("Fin du jeu !");
            container.style.backgroundImage = "url('./images/finishSnail.png')";
            textCharacterPosition.innerHTML = `Snail Position: ${findCharacterPosition()}`;
            resetButton.style.backgroundColor = "rgb(111, 255, 111)";
        } else{
            findPath();
        }
    }, 300);
}

resetButton.addEventListener('click', function() {
    resetMap();
});

findPathButton.addEventListener('click', function() {
    findPath();
});

resetMap();
updateTextsPositions();