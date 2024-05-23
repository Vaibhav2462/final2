const InsufficientBudgetException = require('./thirdparty/InsufficientBudgetException');
const Movie = require('./movie/Movie');
const MovieStatistics = require('./movie/MovieStatistics');
const { DECIMAL_PLACES, ZERO, HUNDRED } = require('./constants');
const MovieDatabase = require('./movie/MovieDatabase');
const FileManager = require('./Framework/FileManager');


const POTENTIAL_RISK = 15; // percent

module.exports = class MovieStudio {
    constructor(financialService,producingService,staffingService,) {
        this.financialService = financialService;
        this.staffingService = staffingService;
        this.producingService = producingService;
        this.movieStatistics = new MovieStatistics(this.staffingService,this.financialService);
        this.movieDatabase = new MovieDatabase();
        this.fileManager = new FileManager();
        this.movieDatabase.loadMovieDatabase(this.fileManager,'film_archive.json',this.movieStatistics);
        this.movieStatistics.printMovieArchiveStatistics(this.movieDatabase.getMovieArchive());
    }

    createMovie(movieName,genre) {
        const movie = new Movie(movieName,genre);
        if (this.canBeProduced()) {
            this.producingService.initMovieProduction();

            try{
                this.producingService.produceMovie(this.staffingService);
            }
            catch (e) {
                this.showFailedDetails();
                return movie;
            }   
            movie.success();
            this.movieStatistics.printProducedMovieStatistics();
            this.movieDatabase.addMovieToArchive(movie);
        } else {
            throw new InsufficientBudgetException('Movie cannot be produced - budget is insufficient');
        }

        return movie;
    }

    showFailedDetails(){
        console.log(`Movie production failed. Budget is over. Current progress is ${
            parseFloat((this.producingService.getProgress() / this.producingService.getScheduledDaysInProduction()) * HUNDRED).toFixed(DECIMAL_PLACES)
        } %`);
    }

    canBeProduced() {
        const estimatedBudget = this.staffingService.getNonStudioStaff()
            .map(employee => employee.getSalary())
            .reduce((acc, salary) => acc + salary * this.producingService.getScheduledDaysInProduction() * Math.round(HUNDRED + POTENTIAL_RISK / HUNDRED), ZERO);
        return this.financialService.getInitialBudget() >= estimatedBudget;
    }
}
