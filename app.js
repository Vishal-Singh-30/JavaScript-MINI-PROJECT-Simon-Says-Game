// logic of game ! 
// 2 arr for game & user sequence ->
let gameSequence = [];
let userSequence = [];

// boolean variable to check ( if the game has started or not )
let started = false;
// level variable ->
let level = 0;
// highest score ->
let highestScore = -10;

// access h2 
let h2 = document.querySelector("h2");

// array of btns
let btns = ["green", "yellow", "red", "blue"];


// now we want that if any key is pressed game begins -> 
document.addEventListener("keypress", ()=>{ // add event listener to whole page (document)
    if(started == false){
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

// function to flash button ! 
function btnFlash(btn) {
    btn.classList.add("flash");
    // after some time we will remove that class !
    setTimeout(function(){
        btn.classList.remove("flash")
    },200);
}


// function to level up ->
function levelUp() {
    userSequence = [];
    level = level + 1;
    // change the h2 heading 
    h2.innerText = `Level ${level}`;
    // choose random button!
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    // now we will access the btn of the random color !
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    // button flash
    btnFlash(randomBtn);

}

function checkSequence(idx) {
    // curr level = size of game and user sequence !
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        // update highest score !
        if(level > highestScore){
            highestScore = level;
        }
        h2.innerHTML = `Game Over! <br><br> Your score was <span style="color: red;"><b>${level}</b></span> <br><br> Highest Score ${highestScore} <br><br><br> Press any key to Start.`;
        
        document.querySelector("body").style.backgroundColor = "red";
        // flash whole screen red !
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        // reset game function !
        resetGame();
    }
}


// button press function 
function btnPress() {
    let btn = this; // btn which is pressed 
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    // check sequence !
    checkSequence(userSequence.length-1);
}

// access all btns ->
let allBtns = document.querySelectorAll(".btn");

// loop on all button to add event listener ->
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}


function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}