const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const game =  document.querySelector(".game")
const person =  document.querySelector(".person")
const questionNumber = document.querySelector(".questionNumber");
const speech = document.querySelector(".speech");
const final = document.querySelector(".final");
const next = document.querySelector(".next");
var startingX, startingY, movingX, movingY;
let startGame = false
let current = 0;
let swipe
let left
let right
let score
let leftGender = 1
let rightGender = 2
let totalQuestion = 0;
let characterGender;
let move = {step: 3}

//girl = 1
//boy = 2
const character = [
    {gender:"1", image:"./img/Female 1.png"},
    {gender:"2", image:"./img/Male 1.png"},
    {gender:"1", image:"./img/Female 2.png"},
    {gender:"2", image:"./img/Male 2.png"},
    {gender:"1", image:"./img/Female 3.png"},
    {gender:"2", image:"./img/Male 3.png"}]

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
    game.classList.remove("hide")
    totalQuestion = Math.floor(Math.random() * 15) + 1
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
            <p>Super Helper Goob Job!</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
            </button>`
            let playAgainBtn =  document.querySelector(".playAgain");
            playAgainBtn.addEventListener("click", () => {
                final.classList.add("hide")
                selection.classList.remove("hide")
            })
        }
        else if(score >= pass){
            console.log("P")
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/thankYouImage.png">
            <p>Thank You!</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
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
            <p>Please pay attention</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
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
    let randomcharacterIndex = Math.floor(Math.random() * character.length);
    console.log(randomcharacterIndex)
    characterGender = character[randomcharacterIndex].gender
    person.innerHTML=`
    <img class="c" src="${character[randomcharacterIndex].image}">`
    let border = game.getBoundingClientRect();
    person.x = (border.width / 2) - 25
    person.style.left = person.x + "px"
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
        let border = game.getBoundingClientRect();
        console.log(person.x)
        if(left == true){
            movingY = null;
            movingX = null;
            person.x = person.x - move.step
            person.style.left = person.x + "px"
            if(person.x < 0){
                if(characterGender == leftGender){
                    score = score + 1
                    speech.classList.remove("hide")
                    console.log("r")
                    left = false
                    speech.style.color = "#DFB0B6"
                    speech.style.border = "5px solid #DFB0B6"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Thank You!</p>"
                }
                else{
                    console.log("w")
                    left = false
                    speech.classList.remove("hide")
                    speech.style.color = "red"
                    speech.style.border = "5px solid red"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Ah! Wrong Toliet!</p>"
                }
                let delay = setTimeout(() => {
                    speech.classList.add("hide")
                    Question()
                  }, 1000);
            }
        }
        if(right == true){
            movingY = null;
            movingX = null;
            person.x = person.x + move.step
            person.style.left = person.x + "px"
            if(person.x > (border.width - 50)){
                if(characterGender == rightGender){
                    score = score + 1
                    speech.classList.remove("hide")
                    console.log("r")
                    right = false
                    speech.style.color = "#77A8AC"
                    speech.style.border = "5px solid #77A8AC"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Thank You!</p>"
                }
                else{
                    console.log("w")
                    right = false
                    speech.classList.remove("hide")
                    speech.style.color = "red"
                    speech.style.border = "5px solid red"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Ugh! Wrong Toliet!</p>"
                }
                let delay = setTimeout(() => {
                    speech.classList.add("hide")
                    Question()
                  }, 1000);
            }
        }
        window.requestAnimationFrame(moving);
    }
}