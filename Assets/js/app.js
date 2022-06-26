const cat = document.getElementById('cat')
const rupert = document.getElementById('rupert')
const answerArray = [cat, rupert]

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
function submitAnswer() {
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
  answerArray.forEach(answer => {
      if (window.getComputedStyle(answer).display == 'block') {
        answer.setAttribute('style', 'display:none;')
        answer.classList.add('answered')
        answerArray[Math.floor(Math.random() * 2)].setAttribute('style', 'display: block')
      }})
}

//eventListener
document.querySelector('.button').addEventListener('click', () => {
  submitAnswer()
  nextQuestion()
})

//rupert.setAttribute('style', 'display:block')
//cat.setAttribute('style', 'display:none')
//console.log(window.getComputedStyle(cat).display)

/*if (answerArray[Math.floor(Math.random() * 2)].className != 'answered') {
answerArray[Math.floor(Math.random() * 2)].setAttribute('style', 'display: block')
      } */     

