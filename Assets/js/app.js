let question = document.getElementsByClassName('question')
let time = 60
// start game 
const startGame = () => {
  // closes introduction and displays the first question
  const firstQuestion = (() => {
    question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
    document.getElementById('introduction').setAttribute('style', 'display: none')
    document.getElementById('questionsSection').setAttribute('style', 'display: flex')
    document.getElementById('submitAnswer').setAttribute('style', 'display: block')
  })()

  // starts the game timer
  const startTimer = setInterval(
    function starTimerNow() {
      if (time > 0) {
        time--
        document.getElementById('timer').innerHTML = time
      } else {
        clearInterval(startTimer)
        console.log('pink') //soon to be scoreBoard.display=block;
      }
    }, 1000)
}

//identifies the correct answer for the question being displayed
const cat = document.getElementById('cat')
const rupert = document.getElementById('rupert')

const correctAnswers = () => {
  let answer
  if (window.getComputedStyle(cat).display != "none") {
    answer = 'q1D'
  } else if (window.getComputedStyle(rupert).display != "none") {
    answer = 'q2A'
  }
  return answer
}

// grades the answer for scoring subtracting time for an incorrect answer
let count = 0
const submitAnswer = () => {
  const correctAnswer = correctAnswers()
  document.querySelectorAll('input').forEach((input) => {
    if (input.checked == true && input.value == correctAnswer) {
      count++
      console.log(input.value)
    } else if (input.checked == true && input.value != correctAnswer){
      time -= 20
      console.log(time)
    }
  })
  console.log(count)
  return count
}

// closes the answered question and displays a new one
let questionNumber = 1
const nextQuestion = () => {
  questionNumber++
// closes current question 
  const questionAnswered = (() => {
    for (let i = 0; i < question.length; i++) {
      if (window.getComputedStyle(question[i]).display == 'block') {
        question[i].setAttribute('style', 'display:none;')
        question[i].classList.remove('question')
      }
    }
  })()
// opens a new question
  const newQuestion = (() => {
    if (question.length != 0) {
      question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
    } else {
      document.getElementById('submitAnswer').setAttribute('style', 'display:none')
    }
  })()
  document.getElementById('qNumber').innerHTML = questionNumber
}


//eventListener to submit answer
document.getElementById('start').addEventListener('click', startGame)

//eventListener to submit answer
document.getElementById('submitButton').addEventListener('click', () => {
  submitAnswer()
  nextQuestion()
})

// scoreboard
// local storage to persist high scores
// populate the game
// css MINIMAL
//make the fieldset required



  // All question(article) elements are "display:none;" by CSS code I use.  
  //  An elements display attribute is set to "display:block;" randomly  when submitAnswer button is clicked 
  //Then returned to "display:none;" when submitAnswer button is clicked This also removes the className
  // Removing the className prevents the element from being called again as the questions that are displayed are randomly selected from a classList array
  //The game ends when the timer up or classList array of .question is empty