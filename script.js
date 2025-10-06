// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("Current-question");
const totalQuestionSpan = document.getElementById("Total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementbyId("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");



const quizQuestions = [
    {
        question: "What is the capital City of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Seychelles", correct: false},
        ],
    },
    {
        question: "Which planet is Known as the Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "jupiter", correct: false},
            {text: "Saturn", correct: false},
        ],
    },
    {
        question: "What is the largest Ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Artic Ocean", correct: false},
            {text: "Pacific ocean", correct: true},
        ],
    },
    {
        question: "What is the Chemical Symbol for Gold?",
        answers: [
            {text: "Go", correct: false},
            {text: "Gd", correct: false},
            {text: "Au", correct: true},
            {text: "Ag", correct: false},
        ],
    },
    {
        question: "Which of these is Not a programming Language?",
        answers: [
            {text: "C", correct: false},
            {text: "Javascript", correct: false},
            {text: "Manuscript", correct: true},
            {text: "Python", correct: false},
        ],
    },
];


// QUIZ STATE VARS
let currentQuestion = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", () => {
    console.log('Quiz Started');
});
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classicList.remove("active");
    QuizScreen.classicList.add("active");

    showquestion()
}

function showquestion(){
    // reset state
    answerDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    answerContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectanswer);
        answerContainer.appendChild(button);
    });

}
function selectAnswer(event) {
    if(answersDisabled) return
    answerDisabled = true
    const selectedButton = event.target;
    const iscorrect = selectedButton.dataset.correct === "true"

    Array.from(answerContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
          button.classList.add("correct");  
        } else if (button === selectedButton) {
            button.classList.add("incorrect")
        }
    });

    if(iscorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;
        // check if there aremore questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showquestion()
        }
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = scores;

    const percentage = (score/quizQuestions.length) = 100
    if(percentage == 100) {
        resultMessage.textContent = "Perfect! You're a  Genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You are Awesome!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good Effort! Keep Studying!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Nice Attempt! Study Smart!";
    } else {
        resultMessage.textContent = "Keep Studying! You'll Catch UP!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}