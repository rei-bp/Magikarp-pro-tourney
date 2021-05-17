//CANVAS ATTEMPT
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
// let x = canvas.width/2
// let y = canvas.height-30
// let splashX = 10
// let splashY = 10
// let splashRadius = 5
let boat
let splash
// let rectRadius = 10
// let rightPressed = false
// let leftPressed = false
// let upPressed = false
// let downPressed = false

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
}

function Splash () {
    this.splashRadius = 5
    this.x = 30;
    this.y = 30;
    this.draw = function () {
        ctx.beginPath()
        ctx.arc( this.x, this.y, this.splashRadius, 0, Math.PI*2)
        ctx.strokeStyle = "#000080"
        ctx.closePath()
    }
    this.update = function () {
        this.draw();
    }
}

function Boat () {
    this.rectRadius = 10
    this.x = canvas.width/2;
    this.y = canvas.height-30;
    this.rightPressed = false
    this.leftPressed = false
    this.upPressed = false
    this.downPressed = false
    this.draw = function() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.rectRadius, 10)
        ctx.fillStyle = "#ff000"
        ctx.fill()
        ctx.closePath()
    }
    this.movementSpeed = function() {
        if(this.rightPressed) {
            this.x += 1
        } if (this.x > canvas.width) {
            this.x = 0
        } if(this.leftPressed) {
            this.x -= 1
        } if (this.x < 0) {
            this.x = canvas.width
        }
        if(this.upPressed) {
            this.y -= 1
        } if ( this.y < 0) {
            this.y = canvas.height
        }
        if(this.downPressed) {
            this.y += 1
        } if ( this.y > canvas.height) {
            this.y = 0            
        }
    }
    this.update = function () {
        this.draw();
        this.movementSpeed();    
    }
}


function init() {
    boat = new Boat()
    splash = new Splash()
}

const animate = setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boat.update()
    splash.update()
}, 10)

// const splashAnimate = setInterval(function(){
//     splash.update()
// }, 5000)

init();

// document.addEventListener('DOMContentLoaded', function () {
    
//     let boat = document.getElementsByClassName('boat')

//     let moveUp = () => {
//         boat.style.top = parseInt(boat.style.top) - 5 + 'px'
//     } 
//     let moveRight = () => {
//         boat.style.right = parseInt(boat.style.right) - 5 + 'px'
//     } 
//     let moveDown = () => {
//         boat.style.top = parseInt(boat.style.top) + 5 + 'px'
//     } 
//     let moveLeft = () => {
//         boat.style.right = parseInt(boat.style.right) + 5 + 'px'
//     }
    

//     boat.addEventListener('keydown', (e) => {
//             e.preventdefault() 
//         let movementHandler = e => {
//             switch (e.keyCode) {
//                 case (87):
//                 moveUp()
//                 break
//                 case (68):
//                 moveRight()
//                 break
//                 case (83):
//                 moveDown()
//                 break
//                 case (65):
//                 moveLeft()
//                 break
//             } 
//         }
//     })        
// })