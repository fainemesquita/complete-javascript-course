// Lecture: Function constructor
// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };


// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge  = function() {
//     console.log(2016 - this.yearOfBirth);
// };

// Person.prototype.lastName = 'Smith';


// // "new" makes "this" point to the new object being created instead of the global Person
// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);


// Lecture: Object.create

// var personProto = {
//     calculateAge: function() {
//         console.log(2016 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//     name: { value: 'Jane' },
//     yearOfBirth: { value: 1969 },
//     job: { value: 'designer' }
// });



/////////////////////////////
// Lecture: Primitives vs objects
/*
// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);



// Objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/




/////////////////////////////
// Lecture: Passing functions as arguments

/*
var years = [1988, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2019 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.88 * el));
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(fullAges);
console.log(ages);
console.log(rates);
*/

/////////////////////////////
// Lecture: Functions returning functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');

interviewQuestion('teacher')('Mark');
*/



/////////////////////////////
// Lecture: IIFE
/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//console.log(score);


(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);
*/



/////////////////////////////
// Lecture: Closures
/*
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);

//retirement(66)(1990);
*/



//job can be accessed even after interviewQuestion has alredy returned because the scope chain is always intact
// function interviewQuestion(job) {
//     return function(name) {
//         if (job === 'designer') {
//             console.log(name + ', can you please explain what UX design is?');
//         } else if (job === 'teacher') {
//                 console.log('What subject do you teach, ' + name + '?');
//         } else {
//                 console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }


// interviewQuestion('teacher')('Mark');



/////////////////////////////
// Lecture: Bind, call and apply
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};


john.presentation('formal', 'morning');

//call method allow us to set the 'this' variable (replaced john ny emily)
john.presentation.call(emily, 'friendly', 'afternoon');

//similar to call method but accespts ther arguments as an array
// john.presentation.apply(emily, ['friendly', 'afternoon']);
// it doesn't work only because the function doesn't expect an array

//create a function with pre-set arguments
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('afternoon');

*/

/*
var years = [1988, 1965, 1937, 2005, 2000];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2019 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

//calcAge only takes two arguments (el and year) but fullJapan also includes the limit. With the bind method, a copy of the fullAge function is created and the limit preset to 20, so we are only passing the element like in the previous example el >= 18
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);
*/



/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


//immediately invoked function expression IIFE -> creates a new scope in where the function is executed
/*
(function() {

    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.askQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (answ) {
        if (answ == this.correctAnswer) {
            console.log('correct answer');
        } else {
            console.log('wrong answer');

        }
    };


    var q1 = new Question('Is my name Faine?', ['yes', 'no', 'maybe'], 0);

    var q2 = new Question('Am I 30yo?', ['yes', 'no', 'maybe'], 1);

    var questions = [q1, q2];

    var questionNumber = Math.floor(Math.random() * questions.length);


    questions[questionNumber].askQuestion();

    var answer = parseInt(prompt('Select the answer number'));

    questions[questionNumber].checkAnswer(answer);
    
})();

*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function() {

    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.askQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (answ, callback) {
        var sc;
        if (answ == this.correctAnswer) {
            console.log('correct answer');
            sc = callback(true)

        } else {
            console.log('wrong answer');
            sc = callback(false);
        }

        this.displayScore(sc);
    };

    Question.prototype.displayScore = function(score){
        console.log('Your score is: ' + score)
        console.log('-----------------------------')
    }

    var q1 = new Question('Is my name Faine?', ['yes', 'no', 'maybe'], 0);

    var q2 = new Question('Am I 30yo?', ['yes', 'no', 'maybe'], 1);

    var questions = [q1, q2];

    function score(){
        var sc = 0;
        return function(correctAnswer){
            if(correctAnswer){
                sc++;
            }
            return sc
        }
    }
    var keepScore = score(); 

    function nextQuestion() {

        var questionNumber = Math.floor(Math.random() * questions.length);
    
        questions[questionNumber].askQuestion();
    
        var answer = prompt('Select the answer number');
    
        if (answer !== 'exit') {

            questions[questionNumber].checkAnswer(parseInt(answer), keepScore);
            
            nextQuestion();
        }
    }

    nextQuestion();

})();