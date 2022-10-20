const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const game =  document.querySelector(".game")
const person =  document.querySelector(".person")
const questionNumber = document.querySelector(".questionNumber");
const speech = document.querySelector(".speech");
const final = document.querySelector(".final");
const next = document.querySelector(".next");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("completed")
const lose = document.getElementById("lose")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

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
let move = 3

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

Input()

function Input() {
    window.addEventListener("keydown", handleInput, {once: true})
}

async function handleInput(e){
    if(startGame == true & swipe == false){
        switch(e.key){
        case "ArrowLeft":
            left = true
            swipe = true;    
        break
        case "ArrowRight":
            right = true
            swipe = true;
        break
        default:
            Input()
        return
        }
        Input()
    }
    else{
        console.log("d")
        Input()
    }
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
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        began()
    }, 200);
})

function began(){
    game.classList.remove("hide")
    totalQuestion = Math.floor(Math.random() * 15) + 1
    startGame = true
    score = 0
    current = 0
    Question()
    moveCharacter()
}

function Question(){
    let pass = totalQuestion /2;
    if(current == totalQuestion){
        console.log(score)
        final.classList.remove("hide")
        game.classList.add("hide")
        if(score == totalQuestion){
            clap.currentTime = 0
            clap.play()
            final.innerHTML = `
            <img class="title endTitle" src="./img/title.png">
            <img class="img" src="./img/Super helperImage.png">
            <p>You did an excellent job!</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
            </button>
            <button class="home">
            <p class="words"><img src="./img/home.png" class="arrowHead">Back to home</p>
            </button>
            `
        }
        else if(score >= pass){
            completed.currentTime = 0
            completed.play()
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/thankYouImage.png">
            <p>You are a helpful person!</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
            </button>
            <button class="home">
            <p class="words"><img src="./img/home.png" class="arrowHead">Back to home</p>
            </button>`
        }
        else if(score < pass){
            lose.currentTime = 0
            lose.play()
            final.innerHTML = `
            <img class="title" src="./img/title.png">
            <img class="img" src="./img/attention.png">
            <p>Take your time to decide.</p>
            <button class="playAgain">
            <p class="words"><img src="./img/restart.png" class="arrowHead">Play again</p>
            </button>
            <button class="home">
            <p class="words"><img src="./img/home.png" class="arrowHead">Back to home</p>
            </button>`
        }
        let playAgainBtn =  document.querySelector(".playAgain");
        playAgainBtn.addEventListener("click", () => {
            playClickSound()
                let delay = setTimeout(() => {
                    final.classList.add("hide")
                    start.classList.remove("hide")
                }, 200);
        })
        let homeButton =  document.querySelector(".home");
        homeButton.addEventListener("click", () => {
            playClickSound()
            let delay = setTimeout(() => {
              location.assign('https://gimme.sg/activations/dementia/');
            }, 200);
        })
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

        if(border.width < 500){
            move = 3
        }
        if(border.width > 500){
            move = 6
        }
        console.log(person.x)
        if(left == true){
            movingY = null;
            movingX = null;
            person.x = person.x - move
            person.style.left = person.x + "px"
            if(person.x < 0){
                if(characterGender == leftGender){
                    score = score + 1
                    speech.classList.remove("hide")
                    correct.currentTime = 0
                    correct.play()
                    left = false
                    speech.style.color = "#DFB0B6"
                    speech.style.border = "5px solid #DFB0B6"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Thank you!</p>"
                }
                else{
                    wrong.currentTime = 0
                    wrong.play()
                    left = false
                    speech.classList.remove("hide")
                    speech.style.color = "red"
                    speech.style.border = "5px solid red"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Ugh! Wrong toliet!</p>"
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
            person.x = person.x + move
            person.style.left = person.x + "px"
            if(person.x > (border.width - 50)){
                if(characterGender == rightGender){
                    correct.currentTime = 0
                    correct.play()
                    score = score + 1
                    speech.classList.remove("hide")
                    console.log("r")
                    right = false
                    speech.style.color = "#77A8AC"
                    speech.style.border = "5px solid #77A8AC"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Thank you!</p>"
                }
                if(characterGender != rightGender){
                    wrong.currentTime = 0
                    wrong.play()
                    right = false
                    speech.classList.remove("hide")
                    speech.style.color = "red"
                    speech.style.border = "5px solid red"
                    speech.style.top = (border.height /4 - 75) +"px"
                    speech.innerHTML= "<p>Ah! Wrong toliet!</p>"
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

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });