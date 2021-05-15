document.addEventListener('DOMContentLoaded', function () {
    
    let boat = document.getElementsByClassName('boat')

    let moveUp = () => {
        boat.style.top = parseInt(boat.style.top) - 5 + 'px'
    } 
    let moveRight = () => {
        boat.style.right = parseInt(boat.style.right) - 5 + 'px'
    } 
    let moveDown = () => {
        boat.style.top = parseInt(boat.style.top) + 5 + 'px'
    } 
    let moveLeft = () => {
        boat.style.right = parseInt(boat.style.right) + 5 + 'px'
    } 

    boat.addEventListener('keydown', (e) => {
            e.preventdefault() 
        let movementHandler = e => {
            switch (e.keyCode) {
                case (87):
                moveUp()
                break
                case (68):
                moveRight()
                break
                case (83):
                moveDown()
                break
                case (65):
                moveLeft()
                break
            } 
        }
    })        
})
  