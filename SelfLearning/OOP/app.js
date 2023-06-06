class Car {
    constructor(name, make, price){
        this.name = name;
        this.make = make;
        this.price = price;
    }

    getDetail(){
        return `The name of the car is ${this.name}`;
    }
}

const car1 = new Car('BMW', 'Ford', 2000);
document.getElementById('demo').innerHTML = car1.getDetail();