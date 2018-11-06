var currentQuestion = 0,
    userGuess = '',
    numberCorrect = 0;
    currentState = "pressStart",
    correctAnswer = '',
    timer = 5,
    timerTimeout = ''
    localInterval = '';

    questions = new Object();
        questions.question1 = "What animal is best?",
        questions.question2 = "What mammal is taller than a giraffe?",
        questions.question3 = "How fast can a giraffe run?",
        questions.question4 = "How long is a giraffe's neck?",
        questions.question5 = "Which of these is something a giraffe sits down to do?";
    answers = new Object();
        answers.answer1 = ["giraffe", "dog", "cat", "squirrel",                             "giraffe"],
        answers.answer2 = ["a tree", "zebra", "rhino", "literally nothing",                 "literally nothing"]
        answers.answer3 = ["they can't run", "5 MPH", "20 MPH", "35 FREAKING MPH",          "35 FREAKING MPH"],
        answers.answer4 = ["human sized", "6 feet", "they have no neck", "30 feet",         "6 feet"],
        answers.answer5 = ["sleep", "eat", "give birth", "they hate sitting",               "they hate sitting"];




createGame();
resetGame();


function createGame() {

$(".game").append("<div class='titleBox'>Giraffe Trivia</div>"); 
$(".game").append("<div class='questionAndTimer'>");
$(".game").append("<div class='answersBox'>");
$(".game").append("<button class='startButton'>Press Start</button>");
$(".game").append("<button class='resetButton'>Reset</button>");
$(".questionAndTimer").append("<div class='questionBox'>Press Start to play!</div>");
$(".questionAndTimer").append("<div class='timerBox'>You get 5 seconds per question</div>");
$(".answersBox").append("<div class='transitionGif'>")
$(".answersBox").append("<button class='answerButton' id='1'></button>");
$(".answersBox").append("<button class='answerButton' id='2'></button>");
$(".answersBox").append("<button class='answerButton' id='3'></button>");
$(".answersBox").append("<button class='answerButton' id='4'>/button>");
}



function checkIfCorrect(answerNumber){

    if (userGuess === correctAnswer) {
        winTransition();
    }
    else {
        loseTransition()
    }

}

function winTransition() {
    numberCorrect++;
    gifVisibility("show", "win.gif");
    $(".timerBox").html("Correct!");

    setTimeout(function() {
        if (currentQuestion < 5) {

        currentQuestion++;
        showQuestion(currentQuestion);
    }
    else {
        scoreScreen();
    }
    },3000)
}

function loseTransition() {
    gifVisibility("show", "lose.gif");
    $(".timerBox").html("Wrong answer!");

    setTimeout(function() {
        if (currentQuestion < 5) {

            currentQuestion++;
            showQuestion(currentQuestion);
        }
        else {
            scoreScreen();
        }
    },4000)

}
function gifVisibility(visbility, pictureName) 
{
    if (visbility === "show") {
        $("#1").css("visibility","hidden");
        $("#2").css("visibility","hidden");
        $("#3").css("visibility","hidden");
        $("#4").css("visibility","hidden");
        $(".transitionGif").css("background-image", "url(assets/images/"+pictureName+")");
        $(".transitionGif").css("z-index", "1");
        
    }
    else if (visbility === "hide") {
        $("#1").css("visibility","visible");
        $("#2").css("visibility","visible");
        $("#3").css("visibility","visible");
        $("#4").css("visibility","visible");
        $(".transitionGif").css("background-image", "url()");
        $(".transitionGif").css("z-index", "-1");

    }


}

function showQuestion(number) {
    
    console.log("current question: "+number)
    gifVisibility("hide", '');
    $(".timerBox").html("Only "+timer+" seconds left!");
    $(".questionBox").html("Question #"+(number)+": "+questions["question"+number]);
    $("#1").html(answers["answer"+number][0]);
    $("#2").html(answers["answer"+number][1]);
    $("#3").html(answers["answer"+number][2]);
    $("#4").html(answers["answer"+number][3]);
    currentState = "answerQuestion";
    correctAnswer = answers["answer"+number][4];
    startQuestionTimer();
    console.log("correct answer: "+correctAnswer)
    console.log("answers list: "+answers["answer"+number])
    
}
function startQuestionTimer() {
    var timeLeft = 5;
    timerTimeout = setTimeout(noMoreTime, 5000);
    localInterval = setInterval(function() {
        if (timer === 5) {
            $(".timerBox").html("Only "+timer+" seconds left!");
            decrement(timer);
          
        }
        else if (timer > 0) {
            decrement(timer);
        }
        else {
            clearInterval(localInterval);
            timer = 5;
            
        }
    },1000);
}
function decrement(value) {
    value--;
    timer = value;
    $(".timerBox").html("Only "+value+" seconds left!");
}

function noMoreTime() {

    gifVisibility("show", "time.gif");
    clearInterval(localInterval);
    clearTimeout(timerTimeout);
    $(".timerBox").html("You ran out of time!");

    setTimeout(function() {
        if (currentQuestion < 5) {

            currentQuestion++;
            showQuestion(currentQuestion);
            timer = 5;
            $(".timerBox").html("Only "+timer+" seconds left!");
        }
        else {
            scoreScreen();
        }

    },2000)
 ;
}

function resetGame() {
    currentQuestion = 0;
    currentState = "pressStart";
    numberCorrect = 0;
    timer = 5;

    $(".questionBox").html("Press Start to Play");
    $(".timerBox").html("You get 5 seconds per question");

    gifVisibility("hide", "");

    $("#1").html("");
    $("#2").html("");
    $("#3").html("");
    $("#4").html("");

    clearInterval(localInterval);
    clearTimeout(timerTimeout);


}

function scoreScreen() {
    gifVisibility("hide", '');
    $(".questionBox").html("Game Over!");
    $("#1").html("");
    $("#2").html("");
    $("#3").html("");
    $("#4").html("");
    if (numberCorrect === 5) {
        $(".timerBox").html("You are a giraffe expert! You got a: "+numberCorrect/5*100+"%!!" );
    }
    else if (numberCorrect > 5 && numberCorrect > 2) {
        $(".timerBox").html("Not the worst score, just a giraffe casual. You got: "+numberCorrect/5*100+"%" );    
    }
    else {
        $(".timerBox").html("Pathetic. Giraffes deserve better. You got: "+numberCorrect/5*100+"%" );    
    }

}

$(".startButton").on("click", function() {
    if (currentState === 'pressStart') {
        currentQuestion = 1;
        showQuestion(1);

    }
});

$(".resetButton").on("click", function() {
        resetGame();
        


});

$(".answerButton").on("click", function () {

    if (currentState == "answerQuestion") {
        userGuess = $(this).text();
        console.log(userGuess);
        clearInterval(localInterval);
        clearTimeout(timerTimeout);
        checkIfCorrect(userGuess);
        currentState = "winOrLose"
        timer = 5;
    }
})

        
