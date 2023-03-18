let rightAnswers = 0;
let currentQuestion = 0;

let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/wrong.mp3');

function init() {
    docId('q-len').innerHTML = questions.length;

    showQuestion();
}


function docId(id) {
    return document.getElementById(id);
}

function showQuestion() {
    if (gameIsOver()) {
        ShowEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function ShowEndScreen() {
    docId('endScreen').style = '';
    docId('questionBody').style = 'display: none;';
    docId('q-len-end').innerHTML = questions.length;
    docId('r-answers').innerHTML = rightAnswers;
    docId('header-image').src = "./img/winner.jpg";
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent *= 100;
    percent = percent.toFixed(0);
    docId('progress-bar').innerHTML = `${percent} %`;
    docId('progress-bar').style.width = `${percent}%`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    docId('questiontext').innerHTML = question['question'];
    docId('answer_1').innerHTML = question['answer_1'];
    docId('answer_2').innerHTML = question['answer_2'];
    docId('answer_3').innerHTML = question['answer_3'];
    docId('answer_4').innerHTML = question['answer_4'];
    docId('q-cur').innerHTML = currentQuestion + 1;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1)

    let idOfRightAnswer = `answer_${question['right_answer']}`

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        docId(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    } else {
        docId(selection).parentNode.classList.add('bg-danger');
        docId(idOfRightAnswer).parentNode.classList.add('bg-success')
        AUDIO_FAIL.play();
    }
    docId('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    docId('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        docId(`answer_${i}`).parentNode.classList.remove('bg-success');
        docId(`answer_${i}`).parentNode.classList.remove('bg-danger');
    }
}

function restartGame() {
    docId('header-image').src = "./img/question-mark.jpg";
    rightAnswers = 0;
    currentQuestion = 0;
    docId('questionBody').style = "";
    docId('endScreen').style = 'display: none;';
    init();
}