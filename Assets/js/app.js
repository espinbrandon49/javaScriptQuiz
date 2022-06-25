const question1 = document.getElementById('cat')
const correctAnswers = () => {
  let answer
  if (window.getComputedStyle(question1).display != "none") {
    answer ='q1A'
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

document.querySelector('.button').addEventListener('click', submitAnswer)

