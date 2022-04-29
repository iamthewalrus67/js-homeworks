/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.needed_ingridients = {
            'spaghetti': 1,
            'tomato': 1,
            'meat': 1,
        };
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.needed_ingridients = {
            'potato': 1,
        };
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.needed_ingridients = {
            'meat': 1,
        };
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(7);
        this.needed_ingridients = {
            'meat': 1,
            'potato': 1,
        };
    }
}

class Ingridient {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Kitchen {
    constructor() {
        this.fridge = {};
        this.orders = [];
    }

    addToFridge(ingridients) {
        for (const ingridient of ingridients) {
            this.fridge[ingridient.name] = this.fridge[ingridient.name] + ingridient.quantity || ingridient.quantity;
        }
    }

    order(order) {
        if (this.checkIngridients(order)) {
            this.orders.push(order);
        } else {
            throw new Error("Not enough ingridients in fridge");
        }
    }

    async cookFastestOrder() {
        if (this.orders.length == 0) {
            throw new Error("No orders");
        }
    
        let minCookingTimeOrder = this.orders[0];
        let minCookingTimeOrderIndex = 0;
        for (const [index, order] of this.orders.entries()) {
            if (minCookingTimeOrder.cookingTime < order.cookingTime) {
                minCookingTimeOrder = order;
                minCookingTimeOrderIndex = index;
            }
        }

        this.orders.splice(minCookingTimeOrderIndex, 1);
        return await minCookingTimeOrder.cook();
    }

    async cookAllOrders() {
        if (this.orders.concat.length == 0) {
            throw new Error("No orders");
        }

        let dishes = [];
        for (const order of this.orders) {
            if (this.checkIngridients(order)) {
                this.spendIngridients(order);
                let dish = await order.cook();
                dishes.push(dish);
            } else {
                throw new Error("Not enough ingridients in fridge");
            }
        }

        return dishes;
    }

    checkIngridients(order) {
        for (const [ingridient, quantity] of Object.entries(order.needed_ingridients)) {
            if ((this.fridge[ingridient] || 0) < quantity) {
                return false;
            }
        }

        return true;
    }

    spendIngridients(order) {
        for (const [ingridient, quantity] of Object.entries(order.needed_ingridients)) {
            this.fridge[ingridient] -= quantity;
        }
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    console.log(await kitchen.cookAllOrders()); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
