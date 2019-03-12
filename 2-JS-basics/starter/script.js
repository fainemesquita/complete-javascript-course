var BMI = mass / (height * height);

var MarkMass = 80;
var JohnMass = 100;

var MarkHeight = 180;
var JohnHeight = 190;

MarkBMI = MarkMass / (MarkHeight * MarkHeight);
JohnBMI = JohnMass / (JohnHeight * JohnHeight);

var MarkHigherBMI = MarkBMI > MarkBMI;

console.log('Is Mark\'s BMI higher?' + ' ' + MarkHigherBMI )