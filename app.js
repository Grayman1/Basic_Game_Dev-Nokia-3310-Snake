document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0  // Start snake at first div in our grid
  let appleIndex = 0 // Start apple at div in the grid
  let currentSnake = [2, 1, 0] // so the div in our grid being 2 (for the HEAD), and 0 being the end (TAIL, with all 1's being the body from now on)   
  let direction = 1
  let score = 0
  let speed = 1.1
  let intervalTime = 0
  let interval = 0

  // To start and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  // Function that deals with ALL the move outcomes of the Snake
  function moveOutcomes() {

    // Deals with snake hitting border and snake hitting self
    if(
      (currentSnake[0] + width >= (width * width) && direction === width) ||  // If snake hits button
      (currentSnake[0] % width === width -1 && direction === 1)  ||  // If snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || // If snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || // If snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') // If snake runs into itself
    ) {
      return clearInterval(interval) // This will clear the interval if any of the above happens
    }

    const tail = currentSnake.pop()  // Remove lst item of the array and show it
    squares[tail].classList.remove('snake') //Remove class from teh TAIL
    currentSnake.unshift(currentSnake[0] + direction) //Gives direction to the head of the array

    // Deals with snake getting the apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)    
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  // Generate new apple once applie is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)   
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
  }


  // Assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 // If we press the right arrow button, the snake will move to the right one
    }
    else if(e.keyCode === 38) {
      direction = -width  // If we press the up arrow, the snake will go back  10 divs, appearing to move up
    }
    else if(e.keyCode === 37) {
      direction = -1      // If we press the left button, the snake will go to the left one div
    }
    else if(e.keyCode === 40) {
      direction = +width // If we press the down arrow, the snake will advance  10 divs, appearing to move down
      
    }    
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)  
})