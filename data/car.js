class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
    }

    getInfo() {
        return `${this.#brand} ${this.#model}, speed ${
            this.speed
        } km/h, trunk now is ${this.isTrunkOpen ? 'Open' : 'Closed'}`;
    }

    go() {
        if (this.isTrunkOpen) {
            return;
        }
        if (this.speed <= 195) this.speed += 5;
    }

    brake() {
        if (this.speed >= 5) this.speed -= 5;
    }

    openTrunk() {
        if (this.speed) {
            return;
        }
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    getInfo() {
        return super.getInfo() + `, accelration is ${this.acceleration}`;
    }

    go() {
        if (this.speed <= 300 - this.acceleration)
            this.speed += this.acceleration;
    }

    openTrunk() {
        return;
    }

    closeTrunk() {
        return;
    }
}

const toyota = new Car('Toyota', 'Corolla');
const tesla = new Car('Tesla', 'model 3');
const mcLaren = new RaceCar('McLaren', 'F1', 20);

toyota.go();
toyota.go();
tesla.go();
toyota.go();
tesla.go();
tesla.go();
toyota.go();
toyota.go();
toyota.go();
tesla.go();
toyota.go();
tesla.go();
tesla.go();
toyota.go();
toyota.go();
toyota.go();
tesla.go();
toyota.go();
tesla.go();
tesla.go();
toyota.go();
toyota.go();
toyota.go();
tesla.go();
toyota.go();
tesla.go();
tesla.go();
toyota.go();
toyota.brake();
tesla.brake();
toyota.brake();
tesla.brake();
toyota.brake();
tesla.brake();
toyota.brake();
tesla.brake();
toyota.brake();
tesla.brake();
mcLaren.go();

console.log(toyota.getInfo());
console.log(tesla.getInfo());
console.log(mcLaren.getInfo());
