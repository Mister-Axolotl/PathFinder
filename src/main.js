let tab = [["⬜", "🟥", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "🟥", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "🟥", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥" ], ["⬜", "⬜", "🟥", "⬜", "⬜", "🟥", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜" ], ["⬜", "⬜", "⬜", "🟥", "⬜", "⬜", "⬜", "⬜", "🟥", "⬜" ], ["⬜", "⬜", "⬜", "⬜", "⬜", "🟥", "⬜", "⬜", "🌊", "⬜" ]];

var playButton = document.querySelector('#play');
var container = document.querySelector(".grid-container");

for(let i = 1 ; i <= 100 ; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    container.appendChild(cell).id = i;
}

playButton.addEventListener('click', function() {
    tab[0][0] = "👦";
    
});