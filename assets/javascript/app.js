// create a question constructor

function Question(body, a, b, c, d, correctKey){
  this.body = body;
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.correctKey = correctKey;

  //Object methods

}

let questionObjectArray = [];

//making a test Question
let test = new Question("This is a Test Question", "first", "second", "third", "fourth", "B");
questionObjectArray.push(test);
//create the game object literal, only need one so no constructor
//this is performing controller logic
const game = {
  //properties
  state: null,
  time: 0,

  //methods
  reset: ()=> {},
  submitAnswer: ()=> {},
  checkAnswer: ()=> {},
  getNextQuestion: ()=> {},
  startTimer: ()=> {},
  stopTimer: ()=> {},

};
