const Salaries = require('../thirdparty/Salaries');
const BudgetIsOverException = require('../thirdparty/BudgetIsOverException');
const StudioEmployee = require('./profile/StudioEmployee');
const { ACCOUNTANT, ZERO } = require('../constants');

module.exports = class Accountant extends StudioEmployee {
    constructor(name,financialService) {
        super(name, Salaries.ACCOUNTANT);
        this.financialService = financialService
    }

    paySalary(staff) {
        staff.forEach( person => {
            const salary = person.getSalary();
            person.recieveSalary(salary);
            if ((this.financialService.getCurrentBudget() - salary) < ZERO) {
                this.financialService.initBudget(ZERO);
                throw new BudgetIsOverException();
            }
            this.financialService.decreaseBudget(salary);
        });
    }

    getRole(){
        return ACCOUNTANT;
    }
}
