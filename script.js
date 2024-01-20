// start screen Animation
const tl =  gsap.timeline({default: {duration: 1}})
tl.fromTo('.carLogo', {y:100, opacity: 0}, {y:0, opacity: 1}, '<50%')

// Gmae Play

// Selectors
const carLogo = document.querySelector(".carLogo")
const User = document.querySelector(".user")
const Game = document.querySelector(".Game")
const score = document.querySelector(".Score")
const startscreen = document.querySelector(".startScreen")
const gamearea = document.querySelector(".gameArea")
const startText = document.querySelector(".starttext")
const RacerLogo = document.querySelector(".Racer-txt")


let player= {
    speed: 5, score: 0
}

let buttons= { 
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false 
}

startscreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)
score.innerHTML = "Score: "+player.score

function pressOn(e) {
    e.preventDefault()
    buttons[e.key]=true
}

function pressOff(e) {
    e.preventDefault()
    buttons[e.key]=false
}

function playgame() {     
    let car = document.querySelector(".car")   
    movingline()
    movingenemy(car)
    if (player.score == 500){
        player.speed = 6
    }
    if (player.score == 1000){
        player.speed = 8
    }
    if(player.score == 1500){
        player.speed = 10
    }
    if(player.score == 2500){
        player.speed = 12
    }
    if(player.score == 5000){
        player.speed = 14
    }
    if(player.score == 10000){
        player.speed = 16
    }
    let road = gamearea.getBoundingClientRect()
    if (player.start) {
        if(buttons.ArrowUp && player.y > road.top){
            player.y -= player.speed
        }
        if(buttons.ArrowDown && player.y < (road.height-50)){
            player.y += player.speed
        }
        if(buttons.ArrowLeft && player.x > 0){
            player.x -= player.speed
        }
        if(buttons.ArrowRight && player.x < (road.width-70)){
            player.x += player.speed
        }
        car.style.left = player.x + 'px'
        car.style.top = player.y + 'px'
        window.requestAnimationFrame(playgame)    
        player.score ++
        score.innerText = "Score: "+player.score
    }
}

function movingline() {
    let Lines = document.querySelectorAll(".line")
    Lines.forEach(function(item){
        if(item.y >= 1500){
            item.y -= 1500
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })
}

function iscolide(a,b){
    let Arect = a.getBoundingClientRect()
    let Brect = b.getBoundingClientRect()
    return !(
        (Arect.bottom < Brect.top) ||
        (Arect.top > Brect.bottom) ||
        (Arect.right < Brect.left) ||
        (Arect.left > Brect.right)
   )
}

function movingenemy(car) {
    let Enemy = document.querySelectorAll(".enemy")
    Enemy.forEach(function(item){
        if(iscolide(car,item)){
            endGame()
        }
        if(item.y >= 1500){
            item.y =-600
            item.style.left = Math.floor(Math.random()*150) + "px"
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })
}


function endGame(){
    player.start = false
    player.speed = 5
    startscreen.classList.remove("Hide")
    startText.innerHTML = "Game Over <br> Click To Start Again"
    startscreen.style.backgroundImage = "linear-gradient(to left , #ff0000, #ff6b6b)"
    carLogo.style.rotate = "60deg"
}

function start() {
    startscreen.classList.add("Hide")
    gamearea.classList.remove("Hide")
    gamearea.innerHTML= ""
    player.start = true
    player.score = 0
// Car     
    window.requestAnimationFrame(playgame)
    let Car = document.createElement("div")
    Car.setAttribute("class","car")
    gamearea.appendChild(Car)
    player.x = Car.offsetLeft
    player.y = Car.offsetTop
// Lines on the road
    for (let i=0 ;i < 10 ;i++){
        let div = document.createElement("div")
        div.classList.add("line")
        div.y = i*150
        div.style.top = (i*150) + "px"
        gamearea.appendChild(div)
    }
// Enemy Car
    for (let i = 0 ;i < 5 ;i++){
        let Enemy = document.createElement("div")
        Enemy.classList.add("enemy")
        Enemy.y = ((i+1)*600)*-0.7
        Enemy.style.top = Enemy.y+"px"
        Enemy.style.left = Math.floor(Math.random()*150) +"px"
        Enemy.style.backgroundImage = "url(pics/RedCar.svg)"
        Enemy.style.rotate = "180deg"
        gamearea.appendChild(Enemy)
    }
} 