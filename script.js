const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const selection = document.querySelector(".selection")
const easy = document.querySelector(".easy")
const normal = document.querySelector(".normal")
const hard = document.querySelector(".hard")
const game =  document.querySelector(".game")
const person =  document.querySelector(".person")
const questionNumber = document.querySelector(".questionNumber");
const speech = document.querySelector(".speech");
const final = document.querySelector(".final");
var startingX, startingY, movingX, movingY;
let startGame = false
let current = 0;
let swipe
let left
let right
let score
let once
let leftGender = 1
let rightGender = 2
let totalQuestion = 0;
let characterGender;
let move = {step: 0.5}

//girl = 1
//boy = 2
const character = [
    {gender:"1", image:"./img/Female 1.png"},
    {gender:"2", image:"./img/Male 1.png"},
    {gender:"1", image:"./img/Female 2.png"},
    {gender:"2", image:"./img/Male 2.png"}]

  function touchstart(evt) {
    startingX = evt.touches[0].clientX
    startingY = evt.touches[0].clientY
  }
  function touchmove(evt) {
    movingX = evt.touches[0].clientX
    movingY = evt.touches[0].clientY
  } 
  function handleInput() {
    control();
}
function control(){
    if(startGame == true & swipe == false){
        console.log(startingX)
        console.log(movingX)
        if(startingX + 100 < movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
          console.log("right")
          right = true
          swipe = true;
        }
        else if(startingX-100 > movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
          console.log("left")
          left = true
          swipe = true;
        }
      else if(swipe != true){
        console.log("f")
          return
      }
}
}

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    selection.classList.remove("hide")
})
easy.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    totalQuestion = 10
    startGame = true
    score = 0
    current = 0
    Question()
    moveCharacter()
})

function Question(){
    let pass = totalQuestion /2;
    if(current == totalQuestion){
        console.log(score)
        final.classList.remove("hide")
        game.classList.add("hide")
        if(score == totalQuestion){
            console.log("A")
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/Super helperImage.png">
            <img class="text" src="./img/Super helper.png">
            <button class="playAgain">
                <img class="btn" src="./img/playAgain.png">
            </button>`
            let playAgainBtn =  document.querySelector(".playAgain");
            playAgainBtn.addEventListener("click", () => {
                final.classList.add("hide")
                selection.classList.remove("hide")
            })
        }
        else if(score > pass){
            console.log("P")
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/thankYouImage.png">
            <img class="text" src="./img/ThankyouText.png">
            <button class="playAgain">
                <img class="btn" src="./img/playAgain.png">
            </button>`
            let playAgainBtn =  document.querySelector(".playAgain");
            playAgainBtn.addEventListener("click", () => {
                final.classList.add("hide")
                selection.classList.remove("hide")
            })
        }
        else if(score < pass){
            console.log("f")
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/attention.png">
            <img class="text" src="./img/Please pay attention.png">
            <button class="playAgain">
                <img class="btn" src="./img/playAgain.png">
            </button>`
            let playAgainBtn =  document.querySelector(".playAgain");
            playAgainBtn.addEventListener("click", () => {
                final.classList.add("hide")
                selection.classList.remove("hide")
            })
        }
        return
    }
    current += 1;
    questionNumber.innerHTML = current + " / " + totalQuestion;
    let randomcharacterIndex = Math.floor(Math.random() * 4);
    console.log(randomcharacterIndex)
    characterGender = character[randomcharacterIndex].gender
    person.innerHTML=`
    <img class="c" src="${character[randomcharacterIndex].image}">`
    person.x = 50;
    person.style.left = person.x + "%"
    swipe = false
    left = false
    right = false
}

function moveCharacter(){
    if(startGame){
        window.requestAnimationFrame(moving);
    }
}
function moving(){
    if(startGame){
        console.log(person.x)
        if(left == true){
            movingY = null;
            movingX = null;
            person.x = person.x - move.step
            person.style.left = person.x + "vmin"
            if(person.x < 0){
                if(characterGender == leftGender){
                    score = score + 1
                    console.log("r")
                    left = false
                    once = false
                    speech.style.backgroundImage = "url('./img/ThankYou.png')"
                }
                else{
                    console.log("w")
                    left = false
                    once = false
                    speech.style.backgroundImage = "url('./img/wrong2.png')"
                }
            }
            let delay = setTimeout(() => {
                if(once == false){
                    person.x = 50
                    person.style.left = person.x + "vmin"
                    speech.style.backgroundImage = "none"
                    Question()
                    once = true
                }
              }, 2500);
        }
        if(right == true){
            movingY = null;
            movingX = null;
            person.x = person.x + move.step
            person.style.left = person.x + "vmin"
            if(person.x > 100){
                if(characterGender == rightGender){
                    score = score + 1
                    console.log("r")
                    right = false
                    once = false
                    speech.style.backgroundImage = "url('./img/ThankYou2.png')"
                }
                else{
                    console.log("w")
                    right = false
                    once = false
                    speech.style.backgroundImage = "url('./img/wrong1.png')"
                }
                let delay = setTimeout(() => {
                    if(once == false){
                        person.x = 50
                        person.style.left = person.x + "vmin"
                        speech.style.backgroundImage = "none"
                        Question()
                        once = true
                    }
                  }, 2500);
            }
        }
        window.requestAnimationFrame(moving);
    }
}