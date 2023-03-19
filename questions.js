let questions = [
    {
        "question": "Wer ist deutscher Rekordmeister im Volleyball der Frauen?",
        "answer_1": "MTV Stuttgart",
        "answer_2": "USC Münster",
        "answer_3": "SSC Schwerin",
        "answer_4": "Rote Raben Vilsbiburg",
        "right_answer": 3,
        "category": "sport",
        "level": 2,
    },

    {
        "question": "In welchsem Jahr war Deutschland zuletzt Handball Europameister?",
        "answer_1": "2007",
        "answer_2": "2016",
        "answer_3": "1998",
        "answer_4": "1996",
        "right_answer": 2,
        "category": "sport",
        "level": 1,
    },

    {
        "question": "Welches Land gewann die Weltmeisterschaft im Fußball nie im eigenen Land?",
        "answer_1": "Argentinien",
        "answer_2": "Frankreich",
        "answer_3": "Deutschland",
        "answer_4": "Brasilien",
        "right_answer": 4,
        "category": "sport",
        "level": 3,
    },

    {
        "question": "In welchem Jahr gewann Steffi Graf alle 4 Grand-Slam Turniere?",
        "answer_1": "1993",
        "answer_2": "1996",
        "answer_3": "Nie",
        "answer_4": "1988",
        "right_answer": 4,
        "category": "sport",
        "level": 4,
    },

    {
        "question": "Wer holte die meisten Olympische Medaillen im Reitsport?",
        "answer_1": "Deutschland",
        "answer_2": "USA",
        "answer_3": "Schweden",
        "answer_4": "Großbritiannen",
        "right_answer": 1,
        "category": "sport",
        "level": 5,
    },

    {
        "question": "Welche Position gibt es nicht im American Fottball?",
        "answer_1": "Totalback",
        "answer_2": "Quarterback",
        "answer_3": "Halfback",
        "answer_4": "Tight End",
        "right_answer": 1,
        "category": "sport",
        "level": 6,
    },

    {
        "question": "Wer ist deutscher Rekordmeister im Basketball der Herren?",
        "answer_1": "Alba Berlin",
        "answer_2": "Bayern München",
        "answer_3": "Brose Bamberg",
        "answer_4": "Bayer Leverkusen",
        "right_answer": 4,
        "category": "sport",
        "level": 7,
    },

    {
        "question": "Aus welchem Land kam der am längsten amtierende Schachweltmeister?",
        "answer_1": "Russland",
        "answer_2": "Deutschland",
        "answer_3": "Norwegen",
        "answer_4": "USA",
        "right_answer": 2,
        "category": "sport",
        "level": 8,
    },

    {
        "question": "Über den Sieg welcher Mannschaft konnte sich Bill Murray bei der World Series 2016 freuen?",
        "answer_1": "New York Yankees",
        "answer_2": "Chicago White Sox",
        "answer_3": "Chicago Cubs",
        "answer_4": "Boston Red Sox",
        "right_answer": 3,
        "category": "sport",
        "level": 9,
    },

    {
        "question": "Was ist die Höchste Geschwindkeit, die jemals in einem Formel 1 Grand Prix erreicht wurde?",
        "answer_1": "350 km/h",
        "answer_2": "361 km/h",
        "answer_3": "372 km/h",
        "answer_4": "383 km/h",
        "right_answer": 3,
        "category": "sport",
        "level": 10,
    },

    {
        "question": "In welchem Land steht dieser Fels?",
        "answer_1": "USA",
        "answer_2": "Kolumbien",
        "answer_3": "Kroatien",
        "answer_4": "Laos",
        "right_answer": 2,
        "category": "geo",
        "level": 1,
        "img": "./img/Penol.jpg",
    },
    
    {
        "question": "In welchem Land steht dieser Turm?",
        "answer_1": "Paris",
        "answer_2": "Italien",
        "answer_3": "Frankreich",
        "answer_4": "Dublin",
        "right_answer": 3,
        "category": "geo",
        "level": 2,
        "img": "./img/Eifelturm.jpg",
    },

    {
        "question": "In welchem Land finden wir dieses Bauwerk?",
        "answer_1": "Ägypten",
        "answer_2": "Sudan",
        "answer_3": "Israel",
        "answer_4": "Liberia",
        "right_answer": 1,
        "category": "geo",
        "level": 3,
        "img": "./img/Pyramide.jpg",
    },

    {
        "question": "In welchem Ort befindet sich diese Grabstelle?",
        "answer_1": "Bankok",
        "answer_2": "Istanbul",
        "answer_3": "Medina",
        "answer_4": "Agra",
        "right_answer": 4,
        "category": "geo",
        "level": 4,
        "img": "./img/Taj Mahal.jpg",
    },

    {
        "question": "Diese antiken Stätten sind ein Wahrzeichen von?",
        "answer_1": "Kambodscha",
        "answer_2": "Peru",
        "answer_3": "Mexico",
        "answer_4": "Honduras",
        "right_answer": 1,
        "category": "geo",
        "level": 5,
        "img": "./img/Ankor Thom.jpg",
    },

    {
        "question": "Welcher Fluss ist hier zu sehen?",
        "answer_1": "Rom",
        "answer_2": "Tiber",
        "answer_3": "Vatikan",
        "answer_4": "Po",
        "right_answer": 2,
        "category": "geo",
        "level": 6,
        "img": "./img/Rom.jpg",
    },

    {
        "question": "In welcher Stadt steht diese Brücker?",
        "answer_1": "Lissabon",
        "answer_2": "Mexico-City",
        "answer_3": "Quito",
        "answer_4": "San Fransico",
        "right_answer": 1,
        "category": "geo",
        "level": 7,
        "img": "./img/Lissabon.jpg",
    },
    
    {
        "question": "Zu welchem Land gehört der Affenfelsen mit Blick auf Afrika?",
        "answer_1": "Portugal",
        "answer_2": "Spanien",
        "answer_3": "Italien",
        "answer_4": "Großbritiannen",
        "right_answer": 4,
        "category": "geo",
        "level": 8,
        "img": "./img/Gibraltar.jpg",
    },

    {
        "question": "Zu welchem Land gehört die Pilgerstätte?",
        "answer_1": "Vereinigte Arabische Emirate",
        "answer_2": "Katar",
        "answer_3": "Saudi Arabien",
        "answer_4": "Bahrain",
        "right_answer": 3,
        "category": "geo",
        "level": 9,
        "img": "./img/Mekka.jpg",
    },

    {
        "question": "In welchem Land stehen die meisten dieser Pagoden?",
        "answer_1": "Thailand",
        "answer_2": "Indien",
        "answer_3": "Nepal",
        "answer_4": "Myanmar",
        "right_answer": 1,
        "category": "geo",
        "level": 10,
        "img": "./img/Pagode.jpg",
    },
]