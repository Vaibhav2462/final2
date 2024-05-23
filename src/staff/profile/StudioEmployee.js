module.exports = class StudioEmployee {
    constructor(name, initialSalary) {
        this.name = name;
        this.salary = initialSalary;
        this.totalEarnedMoney = 0; 
    }

    getEarnedMoney() {
        return this.totalEarnedMoney;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }

    recieveSalary(paidSum) {
        this.totalEarnedMoney += paidSum;
    }
}
