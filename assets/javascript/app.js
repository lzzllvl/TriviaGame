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
const q1  = new Question("How many planets are in the Solar System?", "Eight", "Seven", "Nine", "Infinite", "a");
questionObjectArray.push(q1);
const q2 = new Question("What is the Nearest Galaxy to our Own?", "Olsec-1", "Milky Way", "Andromeda", "The Degoba System", "c");
questionObjectArray.push(q2);

//need to make an intervalID for setting timer


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
    game.timeLimit = 10000; //ms
    game.timeLeft = game.timeLimit / 1000; // this is to display the seconds
    game.correctAnswers = 0;
    game.incorrectAnswers = 0;
  },

  startGame: () => {
    game.state = true;
    game.displayQuestion();
    game.addAnswerClicks();
    game.startTimer();
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
    game.current = game.getQuestion();
    game.displayQuestion();
    game.addAnswerClicks();
    game.resetTimer();
  },

  checkAnswer: () => {


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
    $("#timer").html(game.timeLeft);
  },

  addAnswerClicks: () => {
      const letters = ["a", "b", "c", "d"];
      for(let i = 0; i < letters.length; i++){
        let id = "#"+letters[i];
        $(id).on("click", () => {
          //game.submitAnswer has not been implemented yet.
          game.submitAnswer(letters[i], game.current);
        })
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
      console.log("question Array empty");
    }
  }
};
//TODO need to fix the submit answer and display question functions to give
// global access

//need to do DOM manipulation
//function for displaying the current question

// let current = game.getQuestion();
// current = current[0]; // get question returns a one item array


game.init();
