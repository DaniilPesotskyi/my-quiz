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
                isCorrect: false,
                answerText: 'Steven Spielberg'
            },
            {
                isCorrect: true,
                answerText: 'George Lucas'
            },
            {
                isCorrect: false,
                answerText: 'Martin Scorsese'
            },
        ]
    },
]

const headerQuentionRefs = {
    currentAnswer: document.querySelector('.answer-number'),
    answersQnt: document.querySelector('.answers-qnt')
}

const quentionRefs = {
    answersList: document.querySelector('.answers-list'),
    question: document.querySelector('.question')
}

const questionsQuantity = questions.length
let currentQuestionIndex = 0

quentionRefs.answersList.addEventListener('click', onAnswerClick)

// Generate first question
updateUserInterface(questions)

function onAnswerClick(e) {
    if(e.target.nodeName !== 'LI') {
        return
    }

    // Check correct answer 
    isAnswerCorrectCheck(e)

    // Check on questions ended
    if(currentQuestionIndex === questions.length - 1) {
        console.log('STOP CLICK!!!')
        return
    }

    // To the next question
    currentQuestionIndex += 1
    
    // Update interface with new question
    setTimeout(() => {
        updateUserInterface(questions)
    }, 1000)
}

function createAnswersMarkup(questions) {
    return questions[currentQuestionIndex].answers.map((answer) => {
        return `<li class="answer">${answer.answerText}</li>`
    }).join('')
}

function updateUserInterface(questions) {
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
        console.log('NICE')
        return
    }

    console.log("BAD")
}