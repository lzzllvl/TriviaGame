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
let test = new Question("This is a Test Question", "first", "second", "third", "fourth", "b");
questionObjectArray.push(test);

//need to make an intervalID for setting timer
var intervalID;


//create the game object literal, only need one so no constructor
//this is performing controller logic
const game = {
  //properties
  state: null,
  timeLimit: null,
  timeLeft: null,
  correctAnswers: null,
  incorrectAnswers: null,


  //methods
  init: () => {
    game.state = false;
    game.timeLimit = 7000; //ms
    game.timeLeft = game.timeLimit / 1000; // this is to display the seconds
    game.correctAnswers = 0;
    game.incorrectAnswers = 0;
  },

  startGame: () => {
    game.state = true;
    game.startTimer();
  },

  resetTimer: () => {
    game.timeLeft = game.timeLimit / 1000; //this is to display in seconds
  },

  submitAnswer: () => {},

  checkAnswer: (answer, question) => {
    //this game object method will call the question method checkAnswer()
    //increments either correct or incorrect answer counts
    if(question.isCorrectAnswer(answer)){
      game.correctAnswers++;
    }
    else {
      game.incorrectAnswers++;
    }
  },

  getQuestion: () => {
    //returns a random question from the question array.
    return questionObjectArray.splice(Math.floor(Math.random() * questionObjectArray.length), 1 )
  },

  startTimer: () => {
    intervalID = setInterval(count, 1000);
  },

  stopTimer: () => {
    clearInterval(intervalID);
  },

  count: () => {
    game.timeLeft--;
    $("#timer").html(game.timeLeft);
  }
};
//TODO need to fix the submit answer and display question functions to give
// global access

//need to do DOM manipulation
//function for displaying the current question
let displayQuestion = () => {
  let current = game.getQuestion();
  current = current[0]; // get question returns a one item array
  $("#body").html(current.body);
  $("#a").html(current.a);
  $("#b").html(current.b);
  $("#c").html(current.c);
  $("#d").html(current.d);
}

//this is designed as a array.map() callback
let addAnswerClicks = () => {
    const letters = ["a", "b", "c", "d"]
    for(let i = 0; i < letters.length; i++){
      var id = "#"+letters[i];
      $(id).on("click", () => {
        //game.submitAnswer has not been implemented yet.
        game.submitAnswer(letters[i]);
      })
    }
  };


displayQuestion();
addAnswerClicks();
game.init();
