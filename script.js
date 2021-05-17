//CANVAS ATTEMPT
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let x = canvas.width/2
let y = canvas.height-30
let splashX = 10
let splashY = 10
let splashRadius = 5
let boat;
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
    else if(e.key == "ArrowLeft" && x > 0) {
        boat.leftPressed = true
    }
    else if(e.key == "ArrowUp" && y > 0) {
        boat.upPressed = true
    }
    else if(e.key == "ArrowDown" && y < canvas.height) {
        boat.downPressed = true
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


// function Splash () {
//     ctx.beginPath()
//     ctx.arc( splashX, splashY, splashRadius, 0, Math.PI*2)
//     ctx.fillStyle = "#00FFFF"
//     ctx.fill()
//     ctx.closePath()
// }


function Boat (x, y, rectRadius ) {
    this.rectRadius = rectRadius
    this.x = canvas.width/2;
    this.y = canvas.height-30;
    this.rightPressed = false
    this.leftPressed = false
    this.upPressed = false
    this.downPressed = false
    this.draw = function() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.rectRadius, 10)
        ctx.fillStyle = "#ff000"
        ctx.fill()
        ctx.closePath()
    }
    this.movementSpeed = function() {
        if(this.rightPressed) {
            this.x += 1
        } else if (this.x > canvas.width) {
            this.x = 0
        } else if(this.leftPressed) {
            this.x -= 1
        } else if (this.x < 0) {
            this.x = canvas.width
        }
        else if(this.upPressed) {
            this.y -= 1
        } else if ( this.y < 0) {
            this.y = canvas.height
        }
        else if(this.downPressed) {
            this.y += 1
        } else if ( this.y > canvas.height) {
            this.y = 0            
        }
    }
    this.update = function () {
        this.draw();
        this.movementSpeed();    
    }
}


function init() {
    let rectRadius = 10
    boat = new Boat(x,y,rectRadius)
    // splash ()
}

const animate = setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boat.update();
}, 10)

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