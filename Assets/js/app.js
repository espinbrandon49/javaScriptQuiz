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

let count = 0
const submitAnswer = () => {
  const correctAnswer = correctAnswers()
  document.querySelectorAll('input').forEach((input) => {
    if (input.checked == true && input.value == correctAnswer) {
      count++
      console.log(input.value)
    }
  })
  console.log(count)
  return count
}

const nextQuestion = () => {
  let question = document.getElementsByClassName('question')
  //let answered = document.getElementsByClassName('answered')
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

//eventListener
document.querySelector('.button').addEventListener('click', () => {
  submitAnswer()
  nextQuestion()
})



