// global variables
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
let wwm_money = ["50", "100", "200", "300", "500", "1000", "2000", "4000", "8000", "10.000", "32.000", "64.000", "125.000", "500.000", "1.000.000"]
let money = 0;
let Name = "Name";

// the audio variables
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/wrong.mp3');

// short form of getElementByID
function docId(id) {
    return document.getElementById(id);
}

// function to organize the playround
function showQuestion() {
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
    docId('endhead-image').src = "./img/winner.jpg";
    showEndText();
    is_wwm_wrong = false;
}

// decider which text is showing on the Endscreen
function showEndText() {
    if(play_modi == "wwm"){
        wwmEndText();            
    } else {
        allEndText();
    }
}

// the textopportunitys for the WWM version
function wwmEndText() {
    if (rightAnswers == 15) {
        docId('endText').innerHTML = `Wenn das eine richtige Show wäre, wärst du ${Name} jetzt reich! Wenn du die Antworten nu in den Entwicklertools nachgesehen ast, bewirb dich doch bei der Developer Akademie. <a href="https://developerakademie.com/">Link</a>`;
    } else if (rightAnswers > 9 && !is_wwm_wrong) {
        docId('endText').innerHTML = `${Name}, das war Klasse. Du hast gezeigt das du zur Quizspitze gehörst. ${money}€ wäre dein, wenn wir im Fernsehen wären, willst du es nicht mal auf dem Stuhl versuchen?`;
    } else if (rightAnswers > 9 && is_wwm_wrong) {
        docId('endText').innerHTML = `Groß waren die Augen. Immer noch groß ist das Kissen auf das du gefallen bist. ${Name}, du bist um ${money} Gedanken reicher.`;
    } else if (rightAnswers > 4 && !is_wwm_wrong){
        docId('endText').innerHTML = `Ein Teil vom süßen Leben sei dir gegeben. Zumindest in den ${money} Gedanken. ${Name}, danke fürs Spielen.`;
    } else if (rightAnswers > 4 && is_wwm_wrong) {
        docId('endText').innerHTML = `${Name} uff, das lief jetzt nicht so wie geplant. Nur ${money}€ blieben übrig. Trotzdem hatten wir viel Spaß zusammen.`;
    } else if (rightAnswers > 0 && !is_wwm_wrong){
        docId('endText').innerHTML = `${Name}, bekommt ${money}€ Taschengeld. Ein kleiner Schritt für große Wünsche.`;
    } else {
        docId('endText').innerHTML = `Na Hoppla ${Name}. Wie konnte das passieren? Jetzt aber Hop Hop nochmal von vorne. Ohne Gewinn gehst du heute nicht heim.`;
    }
}

// the textopportunitys for the WWM version
function allEndText() {
    if(rightAnswers > 12){
        docId('endText').innerHTML = `Wow ${Name}, das war Unglaublich! Du bist ein wahrer Quizmeister! ${rightAnswers} von ${playround.length} waren richtig!`;
    } else if (rightAnswers > 7) {
        docId('endText').innerHTML = `Nicht schlecht Herr Specht, ähm... Ich meine ${Name}. ${rightAnswers} von ${playround.length} richtig. Das kann sich sehen lassen!`;
    } else if (rightAnswers > 3) {
        docId('endText').innerHTML = `Puh! Das war nicht so leicht, aber beim nächsten Mal bist du noch besser, oder ${Name}? ${rightAnswers} von ${playround.length} waren richtig`;                
    } else {
        docId('endText').innerHTML = `Schade ${Name}.Leider nur ${rightAnswers} von ${playround.length}. Aber auch ein Quizmeister fällt nicht vom Himmel.`;                
    }
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
    questionImage(question);
    docId('img-q').classList.remove("d-none");
    docId('img-q').innerHTML = question['question'];
    answerList(question);
    moneyTalk();
    activateButton();
    surrenderButton();
}

// Shows the image of the question
function questionImage(question) {
    if (question['category'] == "geo") {
        docId('header-image').src = question['img']
    } else {
        docId('header-image').src = "./img/question-mark.jpg"
    }
}

// the answers of the question
function answerList(question){
    docId('answer_1').innerHTML = question['answer_1'];
    docId('answer_2').innerHTML = question['answer_2'];
    docId('answer_3').innerHTML = question['answer_3'];
    docId('answer_4').innerHTML = question['answer_4'];
}

// Shows the current Question (or moneyworth of the question)
function moneyTalk() {
    if (play_modi == "wwm") {
        docId('moneytalk').innerHTML = `
        <b>${wwm_money[currentQuestion]}€ Frage</b>
        `;
    } else {
        docId('moneytalk').innerHTML = `<b id="q-cur">1</b> von <b id="q-len">5</b> Fragen`;
        docId('q-cur').innerHTML = currentQuestion + 1;
        docId('q-len').innerHTML = playround.length;
    }
}

// the answerbuttons getting active again
function activateButton() {
    for (let i = 1; i < 5; i++){
        docId(`answer_${i}`).disabled = false;
    }
}

// Surrender button only shows in WWM mode
function surrenderButton() {
    if (play_modi == "wwm") {
        docId('surrender').classList.remove('d-none');
    } else {
        docId('surrender').classList.add('d-none');
    }
}

// check if the answer button already selected
function answerChoose(selection) {
    if (is_answer_selected){
        activUnchooseAnswer(selection);
        docId(`next-button`).disabled = true;
    } else {
        activChooseAnswer(selection);
        docId(`next-button`).disabled = false;
    }
}

// the selecting of the button
function activChooseAnswer(selection) {
    buttonDisabledToogle(true);
    docId(selection).disabled = false;
    docId(selection).style.backgroundColor = "rgb(219 173 93)";
    is_answer_selected = true;
    docId(`next-button`).onclick = function() {confirm(selection)};
}

//unselecting of the button
function activUnchooseAnswer(selection) {
    buttonDisabledToogle(false);
    is_answer_selected = false;
    docId(selection).style.backgroundColor = "";
}

// disable or enable the buttons
function buttonDisabledToogle(boolean) {
    for (let i = 1; i < 5; i++){
        docId(`answer_${i}`).disabled = boolean;
    }
}

// showing the result of the choice after confirmation
function confirm(selection) {
    let question = playround[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    docId(idOfRightAnswer).disabled = true;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        correctAnswer(selection);
    } else {
        wrongAnswer(selection, idOfRightAnswer);
    }
    docId('next-button').setAttribute('onclick', 'nextQuestion()');
}

// all happend if answer is correct
function correctAnswer(selection) {
    docId(selection).classList.add('bg-success');
        AUDIO_SUCCESS.play();
        money = wwm_money[rightAnswers];
        rightAnswers++;
        if (currentQuestion == 14) {
            docId('next-button').innerHTML = "Quiz Beenden"
        } else {
            docId('next-button').innerHTML = "Nächste Frage"    
        };
}

//all happend if answer is wrong
function wrongAnswer(selection, idOfRightAnswer) {
    docId(selection).classList.add('bg-danger');
    docId(idOfRightAnswer).classList.add('bg-success');
    AUDIO_FAIL.play();
    if (play_modi == "wwm") {
        docId('next-button').innerHTML = "Game Over";
        is_wwm_wrong = true;
    }
    else {
        docId('next-button').innerHTML = "Nächste Frage";
    }
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
 // transform buttons back to default
function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        docId(`answer_${i}`).classList.remove('bg-success');
        docId(`answer_${i}`).classList.remove('bg-danger');
        docId(`answer_${i}`).style.backgroundColor = "";
        docId(`next-button`).innerHTML = "  Bestätigen  "
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
    Name = docId('name').value;
    docId('playround').classList.remove("d-none");
    docId('startscreen').classList.add("d-none");
    showQuestion();
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
    questionByLevel(test);
    for (let i = 0; i < test.length; i++) {
        random = Math.floor(Math.random() * test[i].length)
        result.push(questions[test[i][random]])
    }
    return result;
}

// getting all questions sorted by level
function questionByLevel(test) {
    for (let i = 0; i < 15; i++) {
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
}
