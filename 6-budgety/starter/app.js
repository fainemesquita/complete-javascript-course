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