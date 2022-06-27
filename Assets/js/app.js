const question = document.getElementsByClassName('question')
let time = 180
let score = 0

// START QUIZ
const startGame = () => {
  // closes introduction and displays the first question
  const firstQuestion = (() => {
    question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
    document.getElementById('introduction').setAttribute('style', 'display: none')
    document.getElementById('questionsSection').setAttribute('style', 'display: flex')
    document.getElementById('timer').setAttribute('style', 'display: block')
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
      }
    }, 1000)
}

// TAKE QUIZ - User answers the quiz questions
const answersQuestion = () => {
  //identifies the correct answer for the question being displayed
  const correctAnswers = (() => {
    let answer
    const cat = document.getElementById('cat')
    const rupert = document.getElementById('rupert')
    const trueBoolean = document.getElementById('trueBoolean')
    const upperSlice = document.getElementById('upperSlice')

    const runValidate = () => {
      const validateTimer = setTimeout(
        function validate() {
          document.getElementById('validate').innerHTML = ''
        }, 1000)
    }

    const correctAnswer = () => {
      score++
      console.log(score)
      document.getElementById('validate').innerHTML += '<em>correct!</em>'
      runValidate()
    }
    const incorrectAnswer = () => {
      time -= 20
      console.log(time)
      document.getElementById('validate').innerHTML += '<em>incorrect</em>'
      runValidate()
    }

    constSelectAnswer = (() => {
      if (window.getComputedStyle(cat).display != "none") {
        answer = 'q1D'
        const question1 = document.getElementsByClassName('q1')
        for (let i = 0; i < question1.length; i++) {
          if (question1[i].checked == true && question1[i].value == answer) {
            console.log('pink')
            correctAnswer()
          } else {
            incorrectAnswer()
            console.log('red')
            break
          }
        }
      } else if (window.getComputedStyle(rupert).display != "none") {
        answer = 'q2A'
        const question2 = document.getElementsByClassName('q2')
        for (let i = 0; i < question2.length; i++) {
          if (question2[i].checked == true && question2[i].value == answer) {
            console.log('pink')
          } else {
            console.log('red')
          }
        }
      } else if (window.getComputedStyle(trueBoolean).display != "none") {
        answer = 'q3C'
        const question3 = document.getElementsByClassName('q3')
        for (let i = 0; i < question3.length; i++) {
          if (question3[i].checked == true && question3[i].value == answer) {
            console.log('pink')
          } else {
            console.log('red')
          }
        }
      } else if (window.getComputedStyle(upperSlice).display != "none") {
        answer = 'q4B'
        const question4 = document.getElementsByClassName('q4')
        for (let i = 0; i < question4.length; i++) {
          if (question4[i].checked == true && question4[i].value == answer) {
            console.log('pink')
          } else {
            console.log('red')
          }
        }
      }
    })()
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
      document.getElementById('qNumber').innerHTML = questionNumber
    })()

    // opens a new question
    const newQuestion = (() => {
      if (question.length != 0) {
        question[Math.floor(Math.random() * question.length)].setAttribute('style', 'display: block')
      } else {
        // all questions have been answered
        gameOver()
      }
    })()
  })()
}

// END QUIZ -The timer runs out or all of the questions have been answered
const gameOver = () => {
  time = 0
  document.getElementById('score').innerHTML = score
  document.getElementById('questionsSection').setAttribute('style', 'display: none')
  document.getElementById('gameOver').setAttribute('style', 'display: block')
}

// HIGH SCORES (localStorage) - Submits your score to highscores and displays highscores
const submitScore = (e) => {
  let highScores = [];
  e.preventDefault()

  // stores local storage helper functions in an object
  const localStorageFunctions = {
    set: function setHighScores() {
      localStorage.setItem('highScores', JSON.stringify(highScores))
    },
    get: function getHighScores() {
      highScores = JSON.parse(localStorage.getItem('highScores'))
    }
  }

  // gets current highScores from localStorage
  const loadHighScores = (() => !localStorage.highScores
    ? localStorageFunctions.set()
    : localStorageFunctions.get()
  )()

  // adds the new score and initials to highScores 
  const addScore = (() => {
    const myInitials = document.getElementById('initials').value
    highScores.push(`${myInitials} - ${score}`);
    localStorageFunctions.set()
  })()

  // displays high score
  const displayHighScores = (() => {
    document.getElementById('gameOver').setAttribute('style', 'display: none')
    document.getElementById('highScores').setAttribute('style', 'display: block')
    highScores.forEach(entry =>
      document.getElementById('scoresList').innerHTML += `${entry} <br/>`)
  })()
}

// EVENT LISTENERS
//Start button
document.getElementById('start').addEventListener('click', startGame)

//Answers a question
document.querySelectorAll('input').forEach(choice => choice.addEventListener('click', answersQuestion))

// Submit Score button
document.getElementById('submit').addEventListener('click', submitScore)

// Go Back button (to quiz start)
document.getElementById('goBack').addEventListener('click', () => location.reload())
// Clear High Scores button (clears local storage)

document.getElementById('clearHighScores').addEventListener('click', () => {
  localStorage.clear()
  document.getElementById('scoresList').setAttribute('style', 'display: none')
})
    /*
const answerChecker = (() => {
document.querySelectorAll('input').forEach((input) => {
// correct answer - score incremented by 1
if (input.checked == true && input.value == correctAnswer) {
score++
//console.log(time)
// console.log(score)
console.log(input.value, ':true')
document.getElementById('validate').innerHTML = '<em>correct!</em>'
runValidate()
// incorrect - time decremented by 20
} else if (input.checked == true && input.value != correctAnswer) {
time -= 20
// console.log(time)
//console.log(score)
console.log(input.value, ':false')
document.getElementById('validate').innerHTML = '<em>incorrect!</em>'
runValidate()
}
})
})()*/