const question = document.getElementsByClassName('question')
let time = 5
let score = 0

// START GAME
const startGame = () => {
  // closes introduction and displays the first question
  const firstQuestion = (() => {
    question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
    document.getElementById('introduction').setAttribute('style', 'display: none')
    document.getElementById('questionsSection').setAttribute('style', 'display: flex')
  })()

  // starts the game timer
  const startTimer = setInterval(
    function starTimerNow() {
      if (time > 0) {
        time--
        document.getElementById('timer').innerHTML = time
      } else {
        clearInterval(startTimer)
        gameOver()
        //console.log('pink') //soon to be scoreBoard.display=block;
      }
    }, 1000)
}

// USER ANSWERS A QUESTION
const answersQuestion = () => {

  //identifies the correct answer for the question being displayed
  const correctAnswers = () => {
    const cat = document.getElementById('cat')
    const rupert = document.getElementById('rupert')
    let answer
    if (window.getComputedStyle(cat).display != "none") {
      answer = 'q1D'
    } else if (window.getComputedStyle(rupert).display != "none") {
      answer = 'q2A'
    }
    return answer
  }

  // processes the user answer for scoring  
  const processAnswer = (() => {
    const correctAnswer = correctAnswers()
    document.querySelectorAll('input').forEach((input) => {
      // correct answer - score incremented by 1
      if (input.checked == true && input.value == correctAnswer) {
        score++
        console.log(input.value)
        // incorrect - time decremented by 20
      } else if (input.checked == true && input.value != correctAnswer) {
        time -= 20
        console.log('incorrect:' + time)
      }
    })
    console.log(score)
  })()

  // closes the answered question and displays a new one
  const nextQuestion = (() => {
    let questionNumber = 1
    questionNumber++
    // closes current question 
    const questionAnswered = (() => {
      for (let i = 0; i < question.length; i++) {
        if (window.getComputedStyle(question[i]).display == 'block') {
          question[i].setAttribute('style', 'display:none;')
          question[i].classList.remove('question')
        }
      }
      //user can see the number of questions remaining
      document.getElementById('qNumber').innerHTML = questionNumber
    })()

    // opens a new question
    const newQuestion = (() => {
      if (question.length != 0) {
        question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
      } else {
        // all questions have been answered, end timer
        gameOver()
        // time = 0
        // document.getElementById('timer').innerHTML = time
      }
    })()
  })()
}

const gameOver = () => {
  console.log('GAME OVER')
  time = 0
  document.getElementById('timer').innerHTML = time
  document.getElementById('score').innerHTML = score
  console.log(question)
document.getElementById('questionsSection').setAttribute('style', 'display: none')
}

//eventListener to submit answer
document.getElementById('start').addEventListener('click', startGame)
//eventListener to submit answer
document.querySelectorAll('input').forEach(choice => choice.addEventListener('click', answersQuestion))

// high scores
// local storage to persist high scores
// populate the game
// css MINIMAL

