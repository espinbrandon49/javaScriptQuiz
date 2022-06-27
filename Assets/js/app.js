const question = document.getElementsByClassName('question')
let time = 180
let score = 0

// START GAME
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

  // checks the answer  
  const checkAnswer = (() => {
    const correctAnswer = correctAnswers()

    // timer for checkAnswer results display 
    const runValidate = () => {
      const validateTimer = setTimeout(
        function validate() {
          document.getElementById('validate').innerHTML = ''
        }, 1000)
    }

    //checks the answer and displays a result
    const answerChecker = (() => {
      document.querySelectorAll('input').forEach((input) => {
        // correct answer - score incremented by 1
        if (input.checked == true && input.value == correctAnswer) {
          score++
          document.getElementById('validate').innerHTML += '<em>correct!</em>'
          runValidate()
          console.log(input.value) //soon to be rendered as an alert
          // incorrect - time decremented by 20
        } else if (input.checked == true && input.value != correctAnswer) {
          time -= 20
          document.getElementById('validate').innerHTML += '<em>incorrect!</em>'
          runValidate()
          console.log(input.value) //soon to be rendered as an alert
        }
      })
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
      //user can see the number of questions remaining
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

// The timer runs out or all of the questions have been answered
const gameOver = () => {
  time = 0
  document.getElementById('score').innerHTML = score
  document.getElementById('questionsSection').setAttribute('style', 'display: none')
  document.getElementById('gameOver').setAttribute('style', 'display: block')
}

// Submits your score to highscores and displays highscores
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

document.getElementById('start').addEventListener('click', startGame)
document.querySelectorAll('input').forEach(choice => choice.addEventListener('click', answersQuestion))
document.getElementById('submit').addEventListener('click', submitScore)
document.getElementById('goBack').addEventListener('click', () => location.reload())
document.getElementById('clearHighScores').addEventListener('click', () => {
  localStorage.clear()
  document.getElementById('scoresList').setAttribute('style', 'display: none')
})

// populate the game
// css MINIMAL
// sort high scores



