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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem;
          
            //create new ID: last element of the array (exp or inc) + 1
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else{
                ID = 0;
            }

            //create new item based on inc or exp type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income (ID, des, val);
            }

            //push item into data structure
            data.allItems[type].push(newItem);
            
            //return new element
            return newItem;
        },


        calculateBudget: function() {
            
            // calculate total income and expenses - private function
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate % of income already spent
            if (data.totals.income > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1;
            }
            
        },

        getBudget: function() {
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    };

})();


//UI controller

var UIController = (function () {
    
    //object to store all strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };

    return {
        //another closure: the object below will have acces to the function bove.

        //method to return all three inputs (object so we can return more than one value)
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml;

            //create html string with placeholder text

            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };
            

            //replace placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            // insert html into the dom
            //beforeend adds a child to the end of income/expense__list (from html file)
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            //gives an array type to field so it can be sliced
            fieldsArr = Array.prototype.slice.call(fields);

            //loops over all elements of the fields array and sets the value of all of them to the empty string
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            //brings focus back to description
            fieldsArr[0].focus();
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

    var updatebudget = function () {

        // 1. calculate budget
        budgetCtrl.calculateBudget();

        // 2. return budget
        var budget = budgetCtrl.getBudget();


        // 3. display budget on the UI
        console.log(budget);
    };
    
    
    var ctrlAddItem = function () {
        var input, newItem;

        //event handler to add button
        // 1. get field input data

        var input = UICtrl.getInput();

        //isNAN(): tests if a paramter is not a number
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add item to UI
            UICtrl.addListItem(newItem, input.type);

            //4. clear the fields

            UICtrl.clearFields();

            //5. calculate and update budget
            updatebudget();

        }


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