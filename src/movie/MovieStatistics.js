const { ZERO } = require("../constants");

module.exports = class MovieStatistics {
    constructor(staffingService,financialService) {
        this.staffingService = staffingService;
        this.financialService = financialService;
     }
    
    printProducedMovieStatistics() {
        const budgetSpent = this.financialService.getInitialBudget() - this.financialService.getCurrentBudget();
        console.log(`Budget: ${this.financialService.getInitialBudget()} initial, ${budgetSpent} spent, ${this.financialService.getCurrentBudget()} economy`);

        this.staffingService.getStudioStaff().forEach(person => {
            console.log(`${person.getRole()}: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`);
        });
    }


    printMovieArchiveStatistics(movieArchive) {
        console.log(`Movies in archive: ${movieArchive.length}`);
        movieArchive.forEach(movie => {
            console.log(`Total: ${movie.crew['Actor']} actors, ${movie.crew['Cameraman']} cameramen, superstars: [${movie.superstars}]`);
        });
    }
}
