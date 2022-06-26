const cat = document.getElementById('cat')
const rupert = document.getElementById('rupert')

//identifies the correct answer for the question being displayed
const correctAnswers = () => {
  let answer
  if (window.getComputedStyle(cat).display != "none") {
    answer = 'q1D'
  } else if (window.getComputedStyle(rupert).display != "none") {
    answer = 'q2A'
  }
  return answer
}

// grades the answer for scoring
let count = 0
const submitAnswer = () => {
  const correctAnswer = correctAnswers()
  document.querySelectorAll('input').forEach((input) => {
    if (input.checked == true && input.value == correctAnswer) {
      count++
      console.log(input.value)
    }
  })
  return count
}

// closes the answered question and displays a new one
const nextQuestion = () => {
  let question = document.getElementsByClassName('question')
  const questionAnswered = (() => {
    for (let i = 0; i < question.length; i++) {
      if (window.getComputedStyle(question[i]).display == 'block') {
        question[i].setAttribute('style', 'display:none;')
        question[i].classList.remove('question')
      }
    }
  })()
  const newQuestion = (() => {
    if (question.length != 0) {
      question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
      console.log(question)
    } else {
      console.log('pink') //soon to be scoreBoard
    }
  })()
}

const gameTimer = () => {
  let time = 5
  const startTimer = setInterval(
    function starTimer() {
      if (time > 0) {
        time--
        document.getElementById('timer').innerHTML = time
      } else {
        console.log('pink') //soon to be scoreBoard
        clearInterval(startTimer)
      }
    }, 1000)
}

//eventListener to submit answer
document.querySelector('.button').addEventListener('click', () => {
  submitAnswer()
  nextQuestion()
  gameTimer()
})



