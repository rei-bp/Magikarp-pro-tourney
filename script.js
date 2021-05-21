
//global vars
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let boat
let splash
let bag = []
let displaySortWeight = []
let displayFishNum = []
let hiScoreArr = []
let karp = document.querySelector('.karp-container')
let space = false
let bait = 10
let restart = false
let totalHiScore = 0


//image vars

let gyradosImg = new Image ()
gyradosImg.src = 'css/imgs/gyradossprite.png'

const images = {}
images.player = new Image()
images.player.src = 'css/imgs/newlapras.png'


let splashImg = new Image()
splashImg.src = 'css/imgs/watersplash.png'
splashFrameX = 0
splashFrameY= 0



const playerWidth = '64'
const playerHeight = '63'
let playerFrameX = 0
let playerFrameY = 0
let playerYLeft = 1
let playerYRight = 2
let playerYUp = 3



//Music
var myAudio = new Audio('audio/surf.mp3')
myAudio.loop = true

function playAudio() { 
  myAudio.play()
} 

function pauseAudio() { 
  myAudio.pause()
}

function drawSprite(img, sX,sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}



//global functions
function restartinit() {
    restart = true
    restartHandler()
}


function restartHandler() {
if (restart === true) {
    hiScoreArr.push(totalHiScore)
    hiScoreArr.sort(function (a, b) {
        return b-a
    })
    document.querySelector('.hi-score').innerText = 'HI SCORE: '+hiScoreArr[0]+'lbs'
    bag.length = 0
    displaySortWeight.length = 0
    displayFishNum.length = 0
    document.getElementById('fish1').innerText = " "
    document.getElementById('fish2').innerText = " "
    document.getElementById('fish3').innerText = " "
    document.getElementById('fish4').innerText = " "
    document.getElementById('fish5').innerText = " "
    } else {
        restart = false
    }
}

function display() {
    if (boat.fishCaught === 1 || displaySortWeight[0] > 0) {
        document.getElementById('fish1').innerText = displaySortWeight[0]
    }
    if (boat.fishCaught === 2 || displaySortWeight[1] > 0) {
        document.getElementById('fish2').innerText = displaySortWeight[1]
    }
    if (boat.fishCaught === 3 || displaySortWeight[2] > 0) {
        document.getElementById('fish3').innerText = displaySortWeight[2]
    }
    if (boat.fishCaught === 4 || displaySortWeight[3] > 0) {
        document.getElementById('fish4').innerText = displaySortWeight[3]
    }
    if (boat.fishCaught === 5 || displaySortWeight[4] > 0) {
        document.getElementById('fish5').innerText = displaySortWeight[4]
    }
}

let reducer = (a, b) => {
    if (displaySortWeight.length > 5) {
        displaySortWeight.pop()
        return a + b
    } else {
        return a + b
    }
}

function randomWeight() {
    return Math.floor(Math.random()*(450-50)+50)/10
}

function randomSplashGenerator () {
    splash.x = Math.floor(Math.random()*770)
    splash.y = Math.floor(Math.random()*570)
}


function getDistance(x1,y1,x2,y2) {
    let xDistance = x2 - x1
    let yDistance = y2- y1
    return Math.sqrt(Math.pow(xDistance, 2) + 
    Math.pow(yDistance,2)
    )
}
function Fish (fishNumber, fishWeight) {
    this.fishNumber = fishNumber
    this.fishWeight = fishWeight
    function sortData (){
        displaySortWeight.sort(function (a, b) {
            return b-a
        })
    }
    displayFishNum.push(fishNumber) 
    displaySortWeight.push(fishWeight)
    sortData()
    totalHiScore = displaySortWeight.reduce((a, b) => {
        if (displaySortWeight.length > 5) {
            displaySortWeight.pop()
            return a + b
        } else {
            return a + b
        }
    }).toFixed(1)

    document.querySelector('.fish-text-animation-weight').innerText = 'Weight: '+this.fishWeight+' lbs'
    document.getElementById('6').innerText = totalHiScore+" lbs"
    
    
}
function fishHandler () {
    if (boat.fishing === true) {
        boat.fishCaught++
        bait--
        let caughtFish = new Fish(bag.length, randomWeight())
        bag.push(caughtFish)
        // karp.style.display = `block;`
        boat.fishing = false
        randomSplashGenerator()
        display()
        console.log(bag)
        setTimeout(() => {
        karp.style.animation = "fade-out 2s";
        }, 2000)
        
    } 
}  

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        boat.rightPressed = true
        playerFrameY = 2
            if (boat.x > canvas.width) {
                boat.rightPressed = false
            }
    }
    else if(e.key == "ArrowLeft") {
        boat.leftPressed = true
        playerFrameY = 1
            if (boat.x < 0) {
                boat.leftPressed = false
            }
    }    
    else if(e.key == "ArrowUp") {
        boat.upPressed = true
        playerFrameY = 3
            if (boat.y < 0) {
                boat.upPressed = false
            }
    }
    else if(e.key == "ArrowDown") {
        boat.downPressed = true
        playerFrameY = 0
            if (boat.y > canvas.height) {
                boat.downPressed = false
            }
    }
    else if (e.key == " ") {
        space = true
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
        boat.rightPressed = false
    }
    else if(e.key == "ArrowLeft") {
        boat.leftPressed = false
    }
    else if(e.key == "ArrowUp") {
        boat.upPressed = false
    }
    else if(e.key == "ArrowDown") {
        boat.downPressed = false
    }
    else if(e.key == " ") {
        space = false
    }
}

//object function


function Gyrados () {
    this.x = 500
    this.y = 300
    this.radius = 100
    this.sW = 100
    this.sH = 100
    this.frameX = 0
    this.frameY = 0
    this.gameFrame = 0
    this.staggerFrame = 15
    this.draw = function () {
        // ctx.drawImage(gyradosImg, this.x, this.y, 250, 300)
        drawSprite(gyradosImg, this.sW*this.frameX, this.sW*this.frameY, this.sW, this.sH, this.x, this.y, 200, 200)
        if (this.gameFrame % this.staggerFrame == 0 ) {
            if (this.frameX < 1) {
                     this.frameX++
                 } else {
                     this.frameX = 0
                 }
         }
         this.gameFrame++
    }
    this.update = function () {
        this.draw()
    }
}



function Splash () {
    this.x = 30//Math.floor(Math.random()*(canvas.width- this.splashRadius))
    this.y = 30//Math.floor(Math.random()*(canvas.height-this.splashRadius))
    this.splashRadius = 20
    this.gameFrame = 0
    this.staggerFrame = 15
    this.sW = 150
    this.sH = 66
    this.draw = function () {
       drawSprite(splashImg, this.sW*splashFrameX, this.sH*splashFrameY, this.sW, this.sH, this.x, this.y, 75,50)
       if (this.gameFrame % this.staggerFrame == 0 ) {
           if (splashFrameX < 2) {
                    splashFrameX++
                } else {
                    splashFrameX = 0
                }
        }
        this.gameFrame++
            // this.x = Math.floor(Math.random()*(canvas.width- this.splashRadius));
        // this.y = Math.floor(Math.random()*(canvas.height-this.splashRadius));
        // ctx.beginPath()
        // ctx.arc( this.x, this.y, this.splashRadius, 0, Math.PI*2)
        // ctx.fillStyle = "#000080"
        // ctx.fill()
        // ctx.closePath()
    }
    this.update = function () {
        this.draw()
    }
}

function Boat () {
    this.rectRadius = 10
    this.x = 400
    this.y = 400
    this.rightPressed = false
    this.leftPressed = false
    this.upPressed = false
    this.downPressed = false
    this.boatRadius = 50
    this.fishing = false
    this.fishCaught = 0
    this.left = playerYLeft
    this.right = playerYRight
    this.up = playerYUp
    this.gameFrame = 0
    this.staggerFrame = 10
    // this.draw = function() {
    //     ctx.rect(this.x, this.y, this.rectRadius, 10)
    //     ctx.fillStyle = "#ff0000"
    //     ctx.fill()
    //     ctx.beginPath()
    //     ctx.arc( this.x, this.y, this.boatRadius, 0, Math.PI*2)
    //     ctx.closePath()
    // }

    this.draw = function () {
        drawSprite(images.player, playerWidth*playerFrameX, playerHeight*playerFrameY, playerWidth, playerHeight, this.x, this.y, playerWidth, playerHeight)
        if (this.gameFrame % this.staggerFrame == 0 ) {
            if (playerFrameX < 3) {
                     playerFrameX++
                 } else {
                     playerFrameX = 0
                 }
            } 
         this.gameFrame++
    }

    this.movementSpeed = function() {
        if(this.rightPressed) {
            this.x += 1.5
        } if(this.leftPressed) {
            this.x -= 1.5
        } if(this.upPressed) {
            this.y -= 1.5
        } if(this.downPressed) {
            this.y += 1.5
        } if (this.x < 0) {
            this.x = canvas.width
        } if (this.x > canvas.width) {
            this.x = 0
        } if ( this.y > canvas.height) {
            this.y = 0            
        } if ( this.y < 0) {
            this.y = canvas.height
        } 
    }
    this.update = function () {
        this.draw()
        this.movementSpeed()
    }
}

function init() {
    boat = new Boat()
    splash = new Splash()
    gyrados = new Gyrados()
}

const animate = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boat.update()
    splash.update()
    gyrados.update()
    restart = false
    displaySortWeight
    if (getDistance(boat.x, boat.y, splash.x, splash.y) < boat.boatRadius + splash.splashRadius && space === true) {
        boat.fishing = true
        fishHandler()
        karp.style.animation = "fade-in 2s";

        // do something
        // console.log (`${getDistance(boat.x, boat.y, splash.x, splash.y)} is less than ${boat.boatRadius + splash.splashRadius}`)
    } else {
        boat.fishing = false
    }
    if (getDistance(boat.x, boat.y, gyrados.x+50, gyrados.y+50) < boat.boatRadius + gyrados.radius) {
        restartinit()
        console.log('hit gyrados')
    }
}, 30)

const splashAnimate = setInterval(function() {
    randomSplashGenerator()
}, 3000)

const gyradosAnimate = setInterval(function() {
    gyrados.x = Math.floor(Math.random()*650)
    gyrados.y = Math.floor(Math.random()*300)
}, 6500)


init();

