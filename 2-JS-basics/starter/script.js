// var BMI = mass / (height * height);

// var MarkMass = 80;
// var JohnMass = 100;

// var MarkHeight = 180;
// var JohnHeight = 190;

// MarkBMI = MarkMass / (MarkHeight * MarkHeight);
// JohnBMI = JohnMass / (JohnHeight * JohnHeight);

// var MarkHigherBMI = MarkBMI > MarkBMI;

// console.log('Is Mark\'s BMI higher?' + ' ' + MarkHigherBMI )



/* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

// var avrgJohn = (89 + 120 + 103) / 3;
// var avrgMike = (116 + 94 + 123) / 3;


// console.log( avrgJohn > avrgMike ?  'the winner is John with a score of:' + '' + avrgJohn : 'the winner is Mike with a score of:' + '' + avrgMike )



// var avrgJohn = (89 + 120 + 103) / 3;
// var avrgMike = (116 + 94 + 123) / 3;
// var avrgMary = (97 + 134 + 105) / 3;

// if (avrgJohn > avrgMike && avrgJohn > avrgMary){
//     console.log( 'The winner is John with a score of:' + '' + avrgJohn )
// }   else if (avrgMike > avrgJohn && avrgMike > avrgMary){
//     console.log( 'The winner is Mike with a score of:' + '' + avrgMike )
// }   else if (avrgMary > avrgJohn && avrgMary > avrgMike ){
//     console.log( 'The winner is Mary with a score of:' + '' + avrgMary )
// }   else {
//     console.log ('draw');
// }







// * CODING CHALLENGE 3
// */

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/
/** */





// function tip(bill){
//     if (bill < 50){
//         return (bill * 2/10)
//     }

//     if (bill >= 50 && bill <= 200){
//         return (bill * 15/100)
//     }

//     if (bill > 200) {
//         return (bill * 1/10)
//     }
// }

// var bills = [124, 48, 268];
// var tips = [tip(bills[0]), 
//             tip(bills[1]),
//             tip(bills[2])];
// var totalBill = [bills[0] + tips[0],
//                 bills[1] + tips[1],
//                 bills[2] + tips[2]]            
            
// console.log(tips);
// console.log(totalBill);



/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/

var john = {
    name: 'John S',
    mass: 80,
    height: 1.80,
    calcBMI: function (){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
}

var mark = {
    name: 'Mark L',
    mass: 80,
    height: 1.70,
    calcBMI: function (){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
}

if (john.calcBMI() > mark.calcBMI()){ //Need to call the method only once
    console.log('John')
} else if (john.BMI < mark.BMI){
    console.log('mark')
} else{
    console.log('same')
}


console.log(john.BMI)
console.log(mark.BMI)