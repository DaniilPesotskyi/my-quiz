const questions = [
    {
        question: "What is the capital city of Spain?",
        answers: [
            {
                isCorrect: true,
                answerText: 'Madrid'
            },
            {
                isCorrect: false,
                answerText: 'Barcelona'
            },
            {
                isCorrect: false,
                answerText: 'Seville'
            },
        ]
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: [
            {
                isCorrect: false,
                answerText: 'Venus'
            },
            {
                isCorrect: false,
                answerText: 'Mars'
            },
            {
                isCorrect: true,
                answerText: 'Mercury'
            },
        ]
    },
    {
        question: "Who directed the movie Jaws?",
        answers: [
            {
                isCorrect: true,
                answerText: 'Steven Spielberg'
            },
            {
                isCorrect: false,
                answerText: 'George Lucas'
            },
            {
                isCorrect: false,
                answerText: 'Martin Scorsese'
            },
        ]
    },
    {
        question: "What is the capital of Brazil?",
        answers: [
            {
                isCorrect: false,
                answerText: 'Rio de Janeiro'
            },
            {
                isCorrect: false,
                answerText: 'São Paulo'
            },
            {
                isCorrect: true,
                answerText: 'Brasília'
            },
            {
                isCorrect: false,
                answerText: 'Belo Horizonte'
            },
        ]
    },
    {
        question: "Which of the following animals is not a mammal?",
        answers: [
            {
                isCorrect: false,
                answerText: 'Bat'
            },
            {
                isCorrect: true,
                answerText: 'Crocodile'
            },
            {
                isCorrect: false,
                answerText: 'Cat'
            },
            {
                isCorrect: false,
                answerText: 'Dog'
            },
        ]
    },
    {
        question: "Which artist painted the famous work 'The Persistence of Memory'?",
        answers: [
            {
                isCorrect: false,
                answerText: 'Claude Monet'
            },
            {
                isCorrect: true,
                answerText: 'Salvador Dalí'
            },
            {
                isCorrect: false,
                answerText: 'Pablo Picasso'
            },
        ]
    },
]

const quizWrapRef = document.querySelector('.quiz-wrap')

const headerQuentionRefs = {
    currentAnswer: document.querySelector('.answer-number'),
    answersQnt: document.querySelector('.answers-qnt'),
    restartBtn: document.querySelector('.restart-button'),
}

const quentionRefs = {
    answersList: document.querySelector('.answers-list'),
    question: document.querySelector('.question')
}

const resultModalRefs = {
    backdrop: document.querySelector('.result-modal-backdrop'),
    percentageValue: document.querySelector('.correct-answers-per-value'),
    correctAnswersCounter: document.querySelector('.correct-answers-value'),
    totalQuestions: document.querySelector('.total-questions-value'),
    restartBtn: document.querySelector('.result-restart-btn')
}

const questionsQuantity = questions.length
let currentQuestionIndex = 0
let correctAnswersCounter = 0;

quentionRefs.answersList.addEventListener('click', onAnswerClick)
headerQuentionRefs.restartBtn.addEventListener('click', onRestartQuentionClick)

resultModalRefs.restartBtn.addEventListener('click', onRestartQuizButtonClick)

// Generate first question
updateQuentionsUserInterface(questions)

function onAnswerClick(e) {
    if(e.target.nodeName !== 'LI') {
        return
    }

    // Check correct answer 
    isAnswerCorrectCheck(e)

    // Check on questions ended
    if(currentQuestionIndex === questions.length - 1) {
        setTimeout(() => {
            openModalWindow()
        }, 1500)
        return
    }
    
    // To the next question
    currentQuestionIndex += 1
    
    // Update interface with new question
    setTimeout(() => {
        updateQuentionsUserInterface(questions)
    }, 1000)
}

function createAnswersMarkup(questions) {
    return questions[currentQuestionIndex].answers.map((answer) => {
        return `<li class="answer">${answer.answerText}</li>`
    }).join('')
}

function updateQuentionsUserInterface(questions) {
    quentionRefs.answersList.innerHTML = "";
    
    // Update question counter
    headerQuentionRefs.currentAnswer.textContent = currentQuestionIndex + 1
    headerQuentionRefs.answersQnt.textContent = questions.length

    // Update textfield of question
    quentionRefs.question.textContent = questions[currentQuestionIndex].question

    // Fill in list with answers
    quentionRefs.answersList.insertAdjacentHTML('beforeend', createAnswersMarkup(questions))
}

function isAnswerCorrectCheck(e) {
    let answersArray = []

    let answersQnt = questions[currentQuestionIndex].answers.length

    // Make an array of answers
    for (let i = 0; i < answersQnt; i += 1) {
        answersArray.push(quentionRefs.answersList.children[i])
    }

    // Check answer on true or false
    if(questions[currentQuestionIndex].answers[answersArray.indexOf(e.target)].isCorrect === true) {
        e.target.classList.add('answer--correct')
        correctAnswersCounter += 1
        return
    }

    e.target.classList.add('answer--incorrect')
}

function countPercentageCorrectAnswers() {
    return `${Math.round((correctAnswersCounter/questionsQuantity)*100)}%`
}

function makeStatusResult() {
    if(countPercentageCorrectAnswers() <= 35) {
        return 'Low'
    }

    if(countPercentageCorrectAnswers() >= 75) {
        return 'High'
    }

    return 'Medium'
}

function onRestartQuentionClick() {
    currentQuestionIndex = 0;
    correctAnswersCounter = 0;

    updateQuentionsUserInterface(questions)
}

function openModalWindow() {
    resultModalRefs.percentageValue.textContent = countPercentageCorrectAnswers();
    resultModalRefs.correctAnswersCounter.textContent = correctAnswersCounter;
    resultModalRefs.totalQuestions.textContent = questionsQuantity;

    resultModalRefs.backdrop.classList.toggle('result-modal-backdrop--is-hidden')
}

function onRestartQuizButtonClick() {
    resultModalRefs.backdrop.classList.toggle('result-modal-backdrop--is-hidden')

    currentQuestionIndex = 0
    correctAnswersCounter = 0;

    onRestartQuentionClick()
}