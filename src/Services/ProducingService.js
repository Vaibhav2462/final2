const { ZERO } = require("../constants");

module.exports = class ProducingService {
    constructor() {
        this.movieArchive = [];
    }   

    initMovieProduction() {
        this.currentDays = this.scheduledDays;
    }

    hasNextWorkingDay() {
        return this.currentDays > ZERO;
    }

    makeProgress() {
        this.currentDays--;
    }

    isProductionDaySuccessful(staff) {
        return staff.filter(person => person.getRole() === 'Actor' || person.getRole() === 'Cameraman' || person.getRole() === 'SuperStar')
            .map(person => person.isWorkDone())
            .reduce((crewSuccess, crewAction) => crewSuccess && crewAction, true);
    }

    getProgress() {
        return this.currentDays;
    }

    getScheduledDaysInProduction(){
        return this.scheduledDays;
    }

    setScheduledDaysInProduction(scheduledDays){
        this.scheduledDays = scheduledDays;
    }
    produceMovie(staffingService){
        const accountant = staffingService.getAccountant();
        const staff = staffingService.getStudioStaff();
        while (this.hasNextWorkingDay()) {
            this.doWorkForTheDay(staff);
            accountant.paySalary(staff);
        }
    }

    doWorkForTheDay(staff){
        if (this.isProductionDaySuccessful(staff)) {
            this.makeProgress();
        }
    }
}
