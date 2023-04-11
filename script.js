let rightAnswers = 0;
let currentQuestion = 0;
let topics = ["sport", "film", "geo", "literature", "mix"];
let modis = ["all", "wwm"]
let is_topic_selected = false;
let is_modi_selected = false;
let play_modi= "";
let is_wwm_wrong = false;
let is_answer_selected = false;
let playround = [];

let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/wrong.mp3');

// short form of getElementByID
function docId(id) {
    return document.getElementById(id);
}

// function to organize the playround
function showQuestion() {
    docId('q-len').innerHTML = playround.length;
    if (gameIsOver() || is_wwm_wrong) {
        ShowEndScreen();
    } else {
        updateProgressBar();
        console.log()
        updateToNextQuestion();
    }
}

// check if the game is over
function gameIsOver() {
    return currentQuestion >= playround.length;
}

// showing the results of the quiz
function ShowEndScreen() {
    docId('endScreen').classList.remove("d-none");
    docId('playround').classList.add("d-none");
    docId('img-q').classList.add("d-none");
    docId('q-len-end').innerHTML = playround.length;
    docId('r-answers').innerHTML = rightAnswers;
    docId('endhead-image').src = "./img/winner.jpg";
    is_wwm_wrong = false;
}

// the progress of the Progressbar
function updateProgressBar() {
    console.log(playround);
    let percent = (currentQuestion + 1) / playround.length;
    percent *= 100;
    percent = percent.toFixed(0);
    docId('progress-bar').innerHTML = `${percent} %`;
    docId('progress-bar').style.width = `${percent}%`;
}

// show a new question
function updateToNextQuestion() {
    let question = playround[currentQuestion];
    if (question['category'] == "geo") {
        docId('header-image').src = question['img']
    } else {
        docId('header-image').src = "./img/question-mark.jpg"
    }
    docId('img-q').classList.remove("d-none");
    docId('img-q').innerHTML = question['question'];
    docId('answer_1').innerHTML = question['answer_1'];
    docId('answer_2').innerHTML = question['answer_2'];
    docId('answer_3').innerHTML = question['answer_3'];
    docId('answer_4').innerHTML = question['answer_4'];
    docId('q-cur').innerHTML = currentQuestion + 1;
}


function answerChoose(selection) {
    if (is_answer_selected){
        activUnchooseAnswer(selection);
    } else {
        activChooseAnswer(selection);
    }
    btn_active_answer();
}

function activChooseAnswer(selection) {
    for (let i = 1; i < 5; i++){
        docId(`answer_${i}`).disabled = true;
    }
    docId(selection).disabled = false;
    docId(selection).style.backgroundColor = "rgb(219 173 93)";
    is_answer_selected = true;
    docId(`next-button`).onclick = function() {confirm(selection)};
}

function activUnchooseAnswer(selection) {
    for (let i = 1; i < 5; i++) {
        docId(`answer_${i}`).disabled = false;
    }
    is_answer_selected = false;
    docId(selection).style.backgroundColor = "";
}

function btn_active_answer() {
    if (is_answer_selected) {
        docId(`next-button`).disabled = false;
    } else {
        docId(`next-button`).disabled = true;
    }
}

function confirm(selection) {
    let question = playround[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        docId(selection).classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightAnswers++;
        docId('next-button').innerHTML = "Nächste Frage";
    } else {
        docId(selection).classList.add('bg-danger');
        docId(idOfRightAnswer).classList.add('bg-success');
        AUDIO_SUCCESS.play();
        if (play_modi = "wwm") {
            docId('next-button').innerHTML = "Game Over";
            is_wwm_wrong = true;

        }
        else {
            docId('next-button').innerHTML = "Nächste Frage";
        }
    }
    docId('next-button').setAttribute('onclick', 'nextQuestion()');

}


// check if the answer correct
function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

// update to the next question
function nextQuestion() {
    currentQuestion++;
    docId('next-button').disabled = true;
    is_answer_selected = false;
    resetAnswerButtons();
    showQuestion();
}
 // make ^buttons back to default
function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        docId(`answer_${i}`).classList.remove('bg-success');
        docId(`answer_${i}`).classList.remove('bg-danger');
        docId(`answer_${i}`).style.backgroundColor = "";
        docId(`next-button`).innerHTML = "Bestätigen"

    }
}

// restart the game
function restartGame() {
    docId('header-image').src = "./img/question-mark.jpg";
    rightAnswers = 0;
    currentQuestion = 0;
    docId('startscreen').classList.remove("d-none");
    docId('endScreen').classList.add("d-none");
}

// click on the topic button let's to action on the buttons
function topicChoose(topic) {
    if (is_topic_selected) {
        activUnchoose(topic);
    } else {
        activChoose(topic);
    }
    btn_active()
}

// the choosen button get golden
function activChoose(topic) {
    for (let i = 0; i < topics.length; i++) {
        docId(topics[i]).disabled = true;
    }
    docId(topic).disabled = false;
    docId(topic).style.backgroundColor = "rgb(219 173 93)";
    is_topic_selected = true;
}

// the unchoosen button getting disable
function activUnchoose(topic) {
    for (let i = 0; i < topics.length; i++) {
        docId(topics[i]).disabled = false;
    }
    is_topic_selected = false;
    docId(topic).style.backgroundColor = "";
}

// click on the modus button let's to action on the buttons
function modiChoose(modi) {
    if (is_modi_selected) {
        activModiUnchoose(modi);
    } else {
        activModiChoose(modi);
    }
    btn_active()
}

// the choosen button get golden
function activModiChoose(modi) {
    for (let i = 0; i < modis.length; i++) {
        docId(modis[i]).disabled = true;
    }
    is_modi_selected = true;
    play_modi = modi;
    docId(modi).disabled = false;
    docId(modi).style.backgroundColor = "rgb(219 173 93)";
}


// the unchoosen button getting disable
function activModiUnchoose(modi) {
    for (let i = 0; i < modis.length; i++) {
        docId(modis[i]).disabled = false;
    }
    is_modi_selected = false;
    docId(modi).style.backgroundColor = "";
}

//check if quizstartbutton be is avaiable
function btn_active() {
    if (is_modi_selected && is_topic_selected && docId("name").value != "") {
        docId("modus-button").disabled = false;
    } else {
        docId("modus-button").disabled = true;
    }
}

//start of the quizround
function quizStart() {
    let topic = quiztopic();
    let modus = quizmodus();
    playround = whichQuestions(topic);
    docId('playround').classList.remove("d-none");
    showQuestion();
    docId('startscreen').classList.add("d-none");
}

// which topic is choosen?
function quiztopic() {
    for (let i = 0; i < topics.length; i++) {
        if (docId(topics[i]).disabled == false) {
            return topics[i]
        }
    }
}

//which modus is choosen?
function quizmodus() {
    for (let i = 0; i < modis.length; i++) {
        if (docId(modis[i]).disabled == false) {
            return modis[i]
        }
    }
}

// function which create the questions for the round
function whichQuestions(topic) {
    let round = [];
    if (topic != "mix") {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i]['category'] == topic) {
                round.push(questions[i]);
            }
        }
    } else {
        round = mixQuestions();
    }
    console.log(round);
    return round;
}

// function which create the questions for a mixround
function mixQuestions() {
    test = []
    result = []
    for (let i = 0; i < 10; i++) {
        test[i] = [];
        for (let j = 0; j < questions.length; j++) {
            if (questions[j]['level'] == i + 1) {
                if (test[i] == null) {
                    test[i] = j
                } else {
                    test[i].push(j);
                }
            }
        }
    }
    for (let i = 0; i < test.length; i++) {
        random = Math.floor(Math.random() * test[i].length)
        result.push(test[i][random])
    }
    return result;
}
