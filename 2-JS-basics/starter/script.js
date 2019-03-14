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



var avrgJohn = (89 + 120 + 103) / 3;
var avrgMike = (116 + 94 + 123) / 3;
var avrgMary = (97 + 134 + 105) / 3;

if (avrgJohn > avrgMike && avrgJohn > avrgMary){
    console.log( 'The winner is John with a score of:' + '' + avrgJohn )
}   else if (avrgMike > avrgJohn && avrgMike > avrgMary){
    console.log( 'The winner is Mike with a score of:' + '' + avrgMike )
}   else if (avrgMary > avrgJohn && avrgMary > avrgMike ){
    console.log( 'The winner is Mary with a score of:' + '' + avrgMary )
}   else {
    console.log ('draw');
}







