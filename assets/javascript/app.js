// create a question constructor
function Question(body, a, b, c, d, correctKey){
  this.body = body;
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.correctKey = correctKey;

  //Object methods
  this.isCorrectAnswer = (answer) => {
    if(answer === this.correctKey){
      return true;
    }
    else {
      return false;
    }
  };
}

//array to hold question objects
let questionObjectArray = [];

//making a test Question
const test = new Question("This is a Test Question", "first", "second", "third", "fourth", "b");
questionObjectArray.push(test);
const q1  = new Question("How many planets are in the Solar System?", "Eight", "Seven", "Nine", "Too Many To Count", "a");
questionObjectArray.push(q1);
const q2 = new Question("What is the Nearest Galaxy to our Own?", "Olsec-1", "Milky Way", "Andromeda", "The Degoba System", "c");
questionObjectArray.push(q2);
const q3 = new Question("What is the largest planet in the solar system?", "Uranus", "Mars", "Saturn", "Jupiter", "d");
questionObjectArray.push(q3);
const q4 = new Question("Which type of celestial body lies at the center of our galaxy?", "Star", "Black Hole", "Gas Cloud", "Pulsar", "b");
questionObjectArray.push(q4);
const q5 = new Question("Where do our solar system's comets come from?", "They break off of large moons", "The Asteroid Belt", "The Ort Cloud", "Cthulhu", "c");
questionObjectArray.push(q5);
const q6 = new Question("How long does it take light from the Sun to reach Earth", "15 seconds", "8 minutes", "1-2 hours", "25 milliseconds", "b");
questionObjectArray.push(q6);
const q7 = new Question("What protects life on planet Earth is protected from solar winds", "Earth's Magnetic Field", "The Ionosphere", "The Moon", "A Solar WindBreaker", "a");
questionObjectArray.push(q7);
const q8 = new Question("Which man-made spacecraft to has been able to enter interstellar space?", "Pathfinder", "Juno", "Voyager 1", "No Satellite has gone that far", "c");
questionObjectArray.push(q8);

//create the game object literal, only need one so no constructor

//this is performing controller logic
const game = {
  //properties
  intervalID: null,
  state: null,
  timeLimit: null,
  timeLeft: null,
  correctAnswers: null,
  incorrectAnswers: null,
  current: null,


  //methods
  init: () => {
    game.current = game.getQuestion();
    game.state = false;
    game.timeLimit = 8000; //ms
    game.timeLeft = game.timeLimit / 1000; // this is to display the seconds
    game.correctAnswers = 0;
    game.incorrectAnswers = 0;
  },

  startGame: () => {
    game.state = true;
    game.displayQuestion();
    game.startTimer();
  },
  nextQuestion: ()=> {
    if(!game.isGameOver()){
      game.current = game.getQuestion();
      game.displayQuestion();
      game.resetTimer();
    }
  },

  resetTimer: () => {
    game.timeLeft = game.timeLimit / 1000; //this is to display in seconds
  },

  submitAnswer: (answer, question) => {
    //this game object method will call the question method checkAnswer()
    //increments either correct or incorrect answer counts
    if(question.isCorrectAnswer(answer)){
      game.correctAnswers++;
    }
    else {
      game.incorrectAnswers++;
    }
    $("#correct").html("Correct: "+game.correctAnswers);
    $("#incorrect").html("Incorrect: "+game.incorrectAnswers);
  },

  getQuestion: () => {
    //returns a random question from the question array.
    let q = questionObjectArray.splice(Math.floor(Math.random() * questionObjectArray.length), 1 )
    q = q[0];//splice is going to return a single item array;
    return q;
  },

  startTimer: () => {
    game.intervalID = setInterval(game.countDown, 1000);
  },

  stopTimer: () => {
    clearInterval(game.intervalID);
  },

  countDown: () => {
    game.timeLeft--;
    if(game.timeLeft>=0){
      $("#timer").html(game.timeLeft);
    } else {
      game.stopTimer();
    }
  },

  displayQuestion: () => {
      $("#body").html(game.current.body);
      $("#a").html(game.current.a);
      $("#b").html(game.current.b);
      $("#c").html(game.current.c);
      $("#d").html(game.current.d);
    },

  isGameOver: () => {
    if(questionObjectArray.length == 0){
      game.state = false;
      game.gameOver();
      return true;

    } else {
      game.state = true;
      return false;
    }
  },
  gameOver: ()=>{
    $("form").hide();
    $("#submit").hide();
    $("#body").html("Congratulations, you've reached the End!");
    $("#timer").remove();
  }
};

//need to do DOM manipulation
//function for displaying the current question

$("#submit").hide();
$("#submit").on("click",() => {
  //did some checking here, need to implement game functionality yet though
  let ans = $("input[name=answer]:checked").val();
  game.submitAnswer(ans, game.current);
  game.nextQuestion();
});
$("form").hide();
$("#submit").hide();
$("#start").on("click", () => {
  game.init();
  game.startGame();

  $("form").show();
  $("#submit").show();
  $("#start").hide();
});
