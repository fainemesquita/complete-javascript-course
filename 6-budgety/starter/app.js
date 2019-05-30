/* App structure

//Budget module/scope
var budgetController = ( function(){
    var x = 23;
    var add = function(a){
        return x + a;
    }

//this method can access the budget controller because of closures with: budgetController.publicTest(var)
    return{
        publicTest: function(b){
            return(add(b));
        }
    }
})();


//UI module/scope

var UIController = (function() {
    //code
})();


//App controller: connects Budget/Data and UI

var controller = (function(budgetCtrl, UICtrl) {

    var z = budgetCtrl.publicTest(5);
    return {
        anotherPublic: function(){
            console.log(z);
        }
    }

})(budgetController, UIController);

*/

//Budget controller
var budgetController = (function () {
    
    //object  constructor
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp:[],
            inc:[]
        }

        totals: {
            exp:0,
            inc:0
        }

    }

})();


//UI controller

var UIController = (function () {
    
    //object to store all strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    };

    return {
        //another closure: the object below will have acces to the function bove.

        //method to return all three inputs (object so we can return more than one value)
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        //method exposes DOMstrings to public
        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();


//Global App controller

var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function(){

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        //Anonymous function can also receive parameters.  "event" already tells the browser to listen to any key.
        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

   
    var ctrlAddItem = function () {
        //event handler to add button
        // 1. get field input data

        var input = UICtrl.getInput();

        // 2. add item to budget controller

        // 3. add item to UI

        // 4. calculate budget

        // 5. display budget

    };
    

    //public initialisation function
    return {
        init: function(){
            console.log('application started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

//call init function
controller.init();