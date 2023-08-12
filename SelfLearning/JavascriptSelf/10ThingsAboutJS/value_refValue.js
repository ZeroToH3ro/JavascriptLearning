let var1 = 'My string';
let var2 = var1;
var2 = 'My new string';
console.log(var1);
// 'My string'
console.log(var2);
// 'My new string'

let var3 = {name: 'John'};
let var4 = var3;
var4.name = 'Jhim';

console.log(var3);
console.log(var4);