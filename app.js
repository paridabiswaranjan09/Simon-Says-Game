let gameSeq= [];
let userSeq= [];

let btns=["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// document.querySelector("body").style.backgroundColor = "lemon";

// Game start

document.addEventListener("keypress", function(){
    if(started == false){
        // console.log("Game Started");
        started = true;
        levelUp();
    }

});

//Flash Lite

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}


// Level Up

function levelUp(){
    userSeq= [];
    level++;
    h2.innerText =  `Level ${level}`;

    let ranIdx = Math.floor(Math.random()*4);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameFlash(ranBtn);
    
    gameSeq.push(ranColor);
    // console.log(gameSeq);
}

//CHECK ANNSWER

function checkAns(idx){
    // console.log(`Curr level:`, level);

    if(userSeq[idx] === gameSeq[idx]){
        // console.log("Same Value")
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,700);
        }
    }else{
         if(level > highScore){
        highScore = level;
         document.querySelector("#high").innerText = `Highest Score: ${highScore}`;
    }
        h2.innerHTML =  `Game Over!! Your score was <b>${level}</b>  <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgba(162, 254, 219, 0.81)";
        },250)
        reset();
    }

}
//User btn press


function btnPress(){
   let btn = this;
   userFlash(btn);

   userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
  
//reset game 

function reset(){
    started =false;
    level = 0;
    gameSeq = [];
    userSeq= [];
}