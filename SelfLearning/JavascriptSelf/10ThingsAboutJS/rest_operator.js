function sumValues(...input){
    let result = input.reduce((sum, value) => {
        return sum += value;
    })
    return result;
}

const test = sumValues(2,3,4,5);
console.log(test);