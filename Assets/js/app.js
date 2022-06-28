let time = 18000; score = 0; questionNumber = 1

// START QUIZ
const startQuiz = () => {
  // closes introduction and displays the first question
  const firstQuestion = (() => {
    const question1 = document.getElementsByClassName('question')
    question1[Math.floor(Math.random() * question1.length)].setAttribute('style', 'display: block')
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
        quizOver()
      }
    }, 1000)
}

// TAKE QUIZ - User answers the quiz questions
const takeQuiz = () => {

  const questionsAndAnswers = (() => {

    // provides feedback for the answers selected, stored in an object
    answerFeedback = {
      feedBackTimer: function runValidate() {
        const validateTimer = setTimeout(
          function validate() {
            document.getElementById('validate').innerHTML = ''
          }, 1000)
      },

      correct: function correctAnswer() {
        score++
        console.log(score)
        document.getElementById('validate').innerHTML += '<em>correct!</em>'
        this.feedBackTimer()
      },

      incorrect: function incorrectAnswer() {
        time -= 20
        console.log(time)
        document.getElementById('validate').innerHTML += '<em>incorrect</em>'
        this.feedBackTimer()
      }
    }

    // identifies the correct answer for the question being displayed
    const selectAnswer = (() => {
      const cat = document.getElementById('cat')
      const rupert = document.getElementById('rupert')
      const trueBoolean = document.getElementById('trueBoolean')
      const upperSlice = document.getElementById('upperSlice')
      const meow1 = document.getElementById('meow1')
      const meow2 = document.getElementById('meow2')
      const meow3 = document.getElementById('meow3')
      const meow4 = document.getElementById('meow4')
      const meow5 = document.getElementById('meow5')

      if (window.getComputedStyle(cat).display != "none") {
        const question1 = document.getElementById('q1D')
        question1.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(rupert).display != "none") {
        const question2 = document.getElementById('q2A')
        question2.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(trueBoolean).display != "none") {
        const question3 = document.getElementById('q3C')
        question3.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(upperSlice).display != "none") {
        const question4 = document.getElementById('q4B')
        question4.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(meow1).display != "none") {
        const question5 = document.getElementById('q5C')
        question5.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(meow2).display != "none") {
        const question6 = document.getElementById('q6B')
        question6.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(meow3).display != "none") {
        const question7 = document.getElementById('q7D')
        question7.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(meow4).display != "none") {
        const question8 = document.getElementById('q8A')
        question8.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      } else if (window.getComputedStyle(meow5).display != "none") {
        const question9 = document.getElementById('q9B')
        question9.checked ? answerFeedback.correct() : answerFeedback.incorrect()
      }
    })()
  })()

  // closes the answered question and displays a new one
  const nextQuestion = (() => {
    const question = document.getElementsByClassName('question')

    //updates question number
    questionNumber++; document.getElementById('questionNumber').innerHTML = questionNumber

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
        // all questions have been answered
        quizOver()
      }
    })()
  })()
}

// END QUIZ -The timer runs out or all of the questions have been answered
const quizOver = () => {
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
    highScores.push(`${score}${myInitials}`);
    localStorageFunctions.set()
  })()

  // displays high score
  const displayHighScores = (() => {
    document.getElementById('gameOver').setAttribute('style', 'display: none')
    document.getElementById('highScores').setAttribute('style', 'display: block')
    highScores.forEach(entry =>
      document.getElementById('scoresList').innerHTML += `${entry} <br/>`)
  })()

  console.log(highScores)
}

// EVENT LISTENERS
//Start button
document.getElementById('start').addEventListener('click', startQuiz)

// Display highScores
document.getElementById('highScoresLink').addEventListener('click', () => {
  document.getElementById('introduction').setAttribute('style', 'display: none')
  document.getElementById('highScores').setAttribute('style', 'display: block')
})

// Answers a question
document.querySelectorAll('input').forEach(choice => choice.addEventListener('click', takeQuiz))

// Submit Score button
document.getElementById('submit').addEventListener('click', submitScore)

// Go Back button (to quiz start)
document.getElementById('goBack').addEventListener('click', () => location.reload())

// Clear High Scores button (clears local storage)
document.getElementById('clearHighScores').addEventListener('click', () => {
  localStorage.removeItem('highScores')
  document.getElementById('scoresList').setAttribute('style', 'display: none')
})

/**
 * sort highscores
 * CSS
 */

