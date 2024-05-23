const assert = require('assert');

const MovieStudio = require('../src/MovieStudio');
const StudioStaff = require('../src/staff/team/StudioStaff');
const Actor = require('../src/staff/Actor');
const CameraMan = require('../src/staff/CameraMan');
const Genre = require('../src/thirdparty/Genre');
const InsufficientBudgetException = require('../src/thirdparty/InsufficientBudgetException');
const SuperStar = require('../src/staff/SuperStar');
const StaffingService = require('../src/Services/StaffingService');
const Accountant = require('../src/staff/Accountant');
const Recruiter = require('../src/staff/Recruiter');
const ProducingService = require('../src/Services/ProducingService');
const FinanceService = require('../src/Services/FinanceService');

describe('MovieStudio', () => {
    
    
    const staffingService = new StaffingService();
    const producingService = new ProducingService();
    const financialService = new FinanceService();

    const accountant = new Accountant('William Welch Deloitte',financialService);
    const recruiter = new Recruiter('Andrew Carnegie');

    staffingService.setAccountant(accountant);
    staffingService.setRecruiter(recruiter);

    const movieStudio = new MovieStudio(financialService,producingService,staffingService);

    it('should create movie Titanic with valid movie definition', () => {
        
        const PRODUCTION_SCHEDULE = 160;
        const budget = 150000000;
        const staff = new StudioStaff([
            new SuperStar('Leo DiCaprio'), new SuperStar('Kate Winslet'),
            new Actor('Billy Zane'), new Actor('Kathy Bates'),
            new Actor('Frances Fisher'), new Actor('Bernard Hill'),
            new Actor('Jonathan Hyde'), new Actor('Danny Nucci'),
            new Actor('David Warner'), new Actor('Bill Paxton')
        ], [
            new CameraMan('Guy Norman Bee'),
            new CameraMan('Marcis Cole'),
            new CameraMan('Tony Guerin')
        ]);
        staffingService.setStudioStaff(staff);
        producingService.setScheduledDaysInProduction(PRODUCTION_SCHEDULE);
        financialService.setBudget(budget);
        
        const movie = movieStudio.createMovie('Titanic', Genre.DRAMA);
        assert.equal(movie.isFinished, true);
    });

    it('should create movie StarWars with valid movie definition', () => {
        const PRODUCTION_SCHEDULE = 90;
        const staff = new StudioStaff([
            new SuperStar('Mark Hamill'), new SuperStar('Harrison Ford'),
            new Actor('Carrie Fischer'), new Actor('Billy Dee Williams'),
            new Actor('Anthony Daniels'), new Actor('David Prowse'),
            new Actor('Peter Mayhew')
        ], [
            new CameraMan('John Campbell'),
            new CameraMan('Bill Neil')
        ]);
        const budget = 50000000;
        staffingService.setStudioStaff(staff);
        producingService.setScheduledDaysInProduction(PRODUCTION_SCHEDULE);
        financialService.setBudget(budget);
        const movie = movieStudio.createMovie('Star Wars: Episode VI – Return of the Jedi', Genre.SCIFI);
        assert.equal(movie.isFinished, true);
    });

    it('should create Empty Movie with Empty movie definition', () => {
        const PRODUCTION_SCHEDULE = 1;
        const staff = new StudioStaff([], []);
        const budget = 1;
        staffingService.setStudioStaff(staff);
        producingService.setScheduledDaysInProduction(PRODUCTION_SCHEDULE);
        financialService.setBudget(budget);
        const movie = movieStudio.createMovie('Noname', Genre.COMEDY);
        assert.equal(movie.isFinished, true);
    });

    it('should fail create movie when budget exceeds', () => {
        const PRODUCTION_SCHEDULE = 200;
        const staff = new StudioStaff([
            new Actor('Taylor Kitsch'),
            new Actor('Lynn Collins'),
            new Actor('Samantha Morton'),
            new SuperStar('Mark Strong'),
            new Actor('Ciarán Hinds'),
            new Actor('Dominic West'),
            new Actor('James Purefoy'),
            new SuperStar('Willem Dafoe')
        ], [
            new CameraMan('Carver Christians'),
            new CameraMan('Scott Bourke'),
            new CameraMan('Quentin Herriot'),
            new CameraMan('Brandon Wyman')
        ]);
        const budget = 100000000;
        staffingService.setStudioStaff(staff);
        producingService.setScheduledDaysInProduction(PRODUCTION_SCHEDULE);
        financialService.setBudget(budget);
        const movie = movieStudio.createMovie('John Carter', Genre.FANTASY);
        assert.equal(movie.isFinished, false);
    });

    it('should throw InsufficientBudgetException when Insufficient Budget', () => {
        const PRODUCTION_SCHEDULE = 250;
        const staff = new StudioStaff([
            new SuperStar('Channing Tatum'),
            new SuperStar('Taylor Kitsch'),
            new SuperStar('Keanu Reeves'),
            new SuperStar('Josh Holloway'),
            new SuperStar('Léa Seydoux'),
            new SuperStar('Hugh Jackman'),
            new Actor('Rebecca Ferguson',),
            new SuperStar('Abbey Leee')
        ], [
            new CameraMan('Carver Christians'),
            new CameraMan('Scott Bourke'),
            new CameraMan('Quentin Herriot'),
            new CameraMan('Brandon Wyman')
        ]);
        const budget = 100000000;
        staffingService.setStudioStaff(staff);
        producingService.setScheduledDaysInProduction(PRODUCTION_SCHEDULE);
        financialService.setBudget(budget);
        assert.throws(() => movieStudio.createMovie('Gambit', Genre.FANTASY), InsufficientBudgetException);
    });
});
