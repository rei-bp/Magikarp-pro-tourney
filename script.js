//CANVAS ATTEMPT
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let x = canvas.width/2
let y = canvas.height-30
let splashX = 0
let splashY = 0
let splashRadius = 5
let rectRadius = 10
let rightPressed = false
let leftPressed = false
let upPressed = false
let downPressed = false

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = true 
    }
    else if(e.key == "ArrowLeft" && x > 0) {
        leftPressed = true
    }
    else if(e.key == "ArrowUp" && y > 0) {
        upPressed = true
    }
    else if(e.key == "ArrowDown" && y < canvas.height) {
        downPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
         rightPressed = false
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false
    }
    else if(e.key == "ArrowUp") {
        upPressed = false
    }
    else if(e.key == "ArrowDown") {
        downPressed = false
    }
}

function boat () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.rect(x, y, rectRadius, 10)
    ctx.fillStyle = "#ff000"
    ctx.fill()
    ctx.closePath()
    if(rightPressed) {
        x += 1
        } else if (x > canvas.width) {
            x = 0
    } else if(leftPressed) {
        x -= 1
        } else if (x < 0) {
            x = canvas.width
    }
    else if(upPressed) {
        y -= 1
        } else if ( y < 0) {
            y = canvas.height
    }
    else if(downPressed) {
        y += 1
        } else if ( y > canvas.height) {
            y = 0            
        }
}


function draw() {
    boat ()
    }
    
    

setInterval(draw, 10)

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