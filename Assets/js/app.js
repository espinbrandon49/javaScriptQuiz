const answers = () => {
  let answer
  if (document.querySelector('.question1').style.display == 'block') {
    answer =='cat'
  }
  console.log(answer)
  return answer
}
answers()

function submitAnswer() {
  document.querySelectorAll('input').forEach((input) => {
    if (input.checked == true && input.value == 'q1A') {
       console.log(input.value)
    }
  })
}
document.querySelector('.button').addEventListener('click', submitAnswer)
