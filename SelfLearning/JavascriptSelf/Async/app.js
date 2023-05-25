setTimeout(myFunction, 3000);

function myFunction() {
    document.getElementById("demo").innerHTML = "No Pain No Gain";
}

// setTimeout(function() { myFunction("I love You !!!"); }, 3000);

// function myFunction(value) {
//   document.getElementById("demo").innerHTML = value;
// }

setInterval(myDateTimeFunction, 3000);

function  myDateTimeFunction() {
    let d = new Date();
    document.getElementById("interval").innerHTML = 
    d.getHours() + " : " + 
    d.getMinutes() + " : " +
    d.getSeconds();
}