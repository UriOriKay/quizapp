let rightAnswers = 0;
let currentQuestion = 0;
let topics = ["sport", "film", "geo", "literature", "mix"];
let modis = ["all", "wwm"]
let is_topic_selected = false;
let is_modi_selected = false;

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
    docId('img-q').style = 'display: none;';
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
    if (question['category'] == "geo") {
        docId('header-image').src = question['img']
    } else {
        docId('header-image').src = "./img/question-mark.jpg"
    }
    docId('img-q').style = '';
    docId('img-q').innerHTML = question['question'];
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

function rightAnswerSelected(selectedQuestionNumber, question) {
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

function topicChoose(topic) {
    if (is_topic_selected) {
        activUnchoose(topic);
    } else {
        activChoose(topic);
    }
    btn_active()
}

function activChoose(topic) {
    for (let i = 0; i < topics.length; i++) {
        docId(topics[i]).disabled = true;
    }
    docId(topic).disabled = false;
    docId(topic).style.backgroundColor = "rgb(219 173 93)";
    is_topic_selected = true;
}

function activUnchoose(topic) {
    for (let i = 0; i < topics.length; i++) {
        docId(topics[i]).disabled = false;
    }
    is_topic_selected = false;
    docId(topic).style.backgroundColor = "";
}

function modiChoose(modi) {
    if (is_modi_selected) {
        activModiUnchoose(modi);
    } else {
        activModiChoose(modi);
    }
    btn_active()
}

function activModiChoose(modi) {
    for (let i = 0; i < modis.length; i++) {
        docId(modis[i]).disabled = true;
    }
    is_modi_selected = true;
    docId(modi).disabled = false;
    docId(modi).style.backgroundColor = "rgb(219 173 93)";
}

function activModiUnchoose(modi) {
    for (let i = 0; i < modis.length; i++) {
        docId(modis[i]).disabled = false;
    }
    is_modi_selected = false;
    docId(modi).style.backgroundColor = "";
}

function btn_active() {
    if (is_modi_selected && is_topic_selected && docId("name").value != "") {
        docId("modus-button").disabled = false;
    } else {
        docId("modus-button").disabled = true;
    }
}

function quizStart() {
    topic = quiztopic();
    modus = quizmodus();
    playround = whichQuestions(topic, modus);
    console.log(playround)
}


function quiztopic() {
    for (let i = 0; i < topics.length; i++) {
        if (docId(topics[i]).disabled == false) {
            return topics[i]
        }
    }
}

function quizmodus() {
    for (let i = 0; i < modis.length; i++) {
        if (docId(modis[i]).disabled == false) {
            return modis[i]
        }
    }
}

function whichQuestions(topic, modi) {
    let round = [];
    if (topic != "mix") {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i]['category'] == topic) {
                round.push(i);
            }
        }
    }else {
        round = textFunktion();
    }
    console.log(round);
    return round;
}

function textFunktion() {
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
