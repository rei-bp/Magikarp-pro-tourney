//CANVAS ATTEMPT
//global vars
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let boat
let splash
let bag = []
let displayWeight = []
let displayFishNum = []
let space = false
//display fish data
// let displayWeightFish = bag.map((displayFish) => {
//     return displayFish.fishWeight
// }
//global functions
function randomWeight() {
    return Math.floor(Math.random()*(45-5)+5)
}

function randomSplashGenerator () {
    splash.x = Math.floor(Math.random()*795)
    splash.y = Math.floor(Math.random()*595)
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
    displayFishNum.push(fishNumber)
    displayWeight.push(fishWeight)
}
function fishHandler () {
    if (boat.fishing === true) {
        let caughtFish = new Fish(bag.length, randomWeight())
        bag.push(caughtFish)
        boat.fishing = false
        randomSplashGenerator()
        document.getElementById('1').innerText = `${displayWeight[0]} lbs`
        document.getElementById('2').innerText = `${displayWeight[1]} lbs`
        document.getElementById('3').innerText = `${displayWeight[2]} lbs`
        document.getElementById('4').innerText = `${displayWeight[3]} lbs`
        document.getElementById('5').innerText = `${displayWeight[4]} lbs`
        console.log(bag)
        
    } 
}  


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        boat.rightPressed = true
            if (boat.x > canvas.width) {
                boat.rightPressed = false
            }
    }
    else if(e.key == "ArrowLeft") {
        boat.leftPressed = true
            if (boat.x < 0) {
                boat.leftPressed = false
            }
    }    
    else if(e.key == "ArrowUp") {
        boat.upPressed = true
            if (boat.y < 0) {
                boat.upPressed = false
            }
    }
    else if(e.key == "ArrowDown") {
        boat.downPressed = true
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

function Splash () {
    this.x = 30//Math.floor(Math.random()*(canvas.width- this.splashRadius))
    this.y = 30//Math.floor(Math.random()*(canvas.height-this.splashRadius))
    this.splashRadius = 5
    this.draw = function () {
        // this.x = Math.floor(Math.random()*(canvas.width- this.splashRadius));
        // this.y = Math.floor(Math.random()*(canvas.height-this.splashRadius));
        ctx.beginPath()
        ctx.arc( this.x, this.y, this.splashRadius, 0, Math.PI*2)
        ctx.fillStyle = "#000080"
        ctx.fill()
        ctx.closePath()

    }
    this.update = function () {
        this.draw()
    }
}

function Boat () {
    this.rectRadius = 10
    this.x = canvas.width/2
    this.y = canvas.height-30
    this.rightPressed = false
    this.leftPressed = false
    this.upPressed = false
    this.downPressed = false
    this.boatRadius = 40
    this.fishing = false
    this.fishCaught = 0
    this.draw = function() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.rectRadius, 10)
        ctx.fillStyle = "#ff0000"
        ctx.fill()
        ctx.arc( this.x, this.y, this.boatRadius, 0, Math.PI*2)
        // ctx.stroke()
        ctx.closePath()
    }
    this.movementSpeed = function() {
        if(this.rightPressed) {
            this.x += 3
        } if (this.x > canvas.width) {
            this.x = 0
        } if(this.leftPressed) {
            this.x -= 3
        } if (this.x < 0) {
            this.x = canvas.width
        }
        if(this.upPressed) {
            this.y -= 3
        } if ( this.y < 0) {
            this.y = canvas.height
        }
        if(this.downPressed) {
            this.y += 3
        } if ( this.y > canvas.height) {
            this.y = 0            
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
    bag
}

const animate = setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boat.update()
    splash.update()
    if (getDistance(boat.x, boat.y, splash.x, splash.y) < boat.boatRadius + splash.splashRadius && space === true) {
        boat.fishing = true
        fishHandler()
        // do something
        // console.log (`${getDistance(boat.x, boat.y, splash.x, splash.y)} is less than ${boat.boatRadius + splash.splashRadius}`)
    } else {
        boat.fishing = false
    }
}, 20)

const splashAnimate = setInterval(function(){
    randomSplashGenerator()
}, 2000)


init();

