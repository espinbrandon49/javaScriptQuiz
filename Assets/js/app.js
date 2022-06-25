let correctAnswer;
let answer;
function submitAnswer() {
  document.querySelectorAll('input').forEach((input) => {
    if (input.checked) {
       console.log(input)
    }
  })
 // answer == document.getElementById('q1A') ?console.log('answer') : console.log('answer2') 
}
document.querySelector('.button').addEventListener('click', submitAnswer)
