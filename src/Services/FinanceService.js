const INITIAL_BUDGET = 1000000;
module.exports = class FinanceService {
    setBudget(budget){
        this.initialBudget = this.currentBudget = INITIAL_BUDGET + budget;
    }

    decreaseBudget(paidSum) {
        this.currentBudget = this.currentBudget - paidSum;
    }

    getCurrentBudget() {
        return this.currentBudget;
    }

    getInitialBudget(){
        return this.initialBudget;
    }
}
