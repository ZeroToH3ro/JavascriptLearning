//Program sum of 2 numbers
function myDisplayer(something) {
    document.getElementById("demo").innerHTML = something;
  }
  
function myCalculator(num1, num2, myCallback) {
    let sum = num1 + num2;
    myCallback(sum);
}
  
myCalculator(5, 5, myDisplayer);

//Program remove negative 
//Create an array
const myNumbers = [12, 20, -32, 45, -90, 10];
const removeNegative = function (numbers, callback) {
    const result = [];
    for(const x of numbers) {
        if (callback(x)) {
            result.push(x);
        }
    }
    return result;
}
const posNumber = removeNegative(myNumbers, (x) => x >= 0);
document.getElementById("pos").innerHTML = posNumber; 