let questions = [
    {
        "question": "Wer ist deutscher Rekordmeister im Volleyball der Frauen?",
        "answer_1": "MTV Stuttgart",
        "answer_2": "USC Münster",
        "answer_3": "SSC Schwerin",
        "answer_4": "Rote Raben Vilsbiburg",
        "right_answer": 4,
        "category": "Sport"
    },

    {
        "question": "In welchsem Jahr war Deutschland zuletzt Handball Europameister?",
        "answer_1": "2007",
        "answer_2": "2016",
        "answer_3": "1998",
        "answer_4": "1996",
        "right_answer": 4,
        "category": "Sport"
    },

    {
        "question": "In welchem Regelwerk gibt es ein Textilvergehen?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt",
        "right_answer": 2,
        "category": "Sport"
    },   
]

let currentQuestion = 0;

function init(){
    docId('q-len').innerHTML = questions.length;

    showQuestion();
}


function docId(id) {
    return document.getElementById(id);
}

function showQuestion() {
    let question = questions[currentQuestion];
    docId('questiontext').innerHTML = question['question'];
    docId('answer_1').innerHTML = question['answer_1'];
    docId('answer_2').innerHTML = question['answer_2'];
    docId('answer_3').innerHTML = question['answer_3'];
    docId('answer_4').innerHTML = question['answer_4'];
}

function answer (selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1)

    let idOfRightAnswer = `answer_${question['right_answer']}`

    if(selectedQuestionNumber == question['right_answer']){
        console.log('Richtige Antwort!!');
        docId(selection).parentNode.classList.add('bg-success');
    } else {
        docId(selection).parentNode.classList.add('bg-danger');
        docId(idOfRightAnswer).parentNode.classList.add('bg-success')
    }   
    docId('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    docId('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons(){
    for (let i = 1; i < 5; i++) {
        docId(`answer_${i}`).parentNode.classList.remove('bg-success');
        docId(`answer_${i}`).parentNode.classList.remove('bg-danger');
    }
}