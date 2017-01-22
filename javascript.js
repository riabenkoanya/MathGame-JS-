var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    //if we are playing
    if (playing) {
        
        location.reload(); //reload page

    } else { //if we are not playing
    
        //change mode to playing 
        playing = true;
                
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
       
        //show countdown box 
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide game over box
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startCountdown();
        
        //generate a new Q&A
        generateQA();
    }
}

for(var i=1; i<5; i++){
//clicking on answer box
document.getElementById("box"+i).onclick = function(){
    //check if we are playing
    if (playing==true){ //yes
        if (this.innerHTML == correctAnswer){
            //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;            
            //hide wrong box and show correct
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct")
            }, 1000);
            
            //generate new question
            generateQA();
        }else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong")
            }, 1000)
        }
    }
}
    
}
    
    
    //if we are playing 
        //reload page
    //if we are not playing
        //set score to 0
        //show countdown box
        //reduce time by 1sec in loops
            //time left?
                //yes->continue
                //no->gameover
        //change button to reset
            //generate new Q&A
    
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                // show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec
            
//fucntions

//start counter
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
     document.getElementById("timeremainingvalue").innerHTML = timeremaining;
     if (timeremaining === 0) {//gameover
         stopCountdown();    
        show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>You score is "+ score +".</p>";
        hide("timeremaining");
        hide("correct");
        hide("wrong");
        playing = false;
     document.getElementById("startreset").innerHTML = "Start Game";
     }
    }, 1000);        
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide an elements
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show an elements
function show(Id) {    document.getElementById(Id).style.display= "block";
}

//generate questions and multiple answers
function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x+"x"+y;
    var correctPosition = 1+Math.round(3*Math.random());   document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with correct answer
                           
    //fill other boxes with wrong answer
    var answers = [correctAnswer];
    for (var i=1; i<5; i++){
        if (i !== correctPosition){
            var wrongAnswer;
            
            do{//a wrong answer
                wrongAnswer= (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }  while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}