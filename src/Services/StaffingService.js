module.exports = class StaffingService {
    constructor() {
    }

    getRecruiter() {
        return this.recruiter;
    }

    setRecruiter(recruiter){
        this.recruiter = recruiter;
    }

    getAccountant() {
        return this.accountant;
    }

    setAccountant(accountant){
        this.accountant = accountant;
    }

    setStudioStaff(staff){
        this.studioStaff = [...staff.getActorsCollection(),...staff.getCameramanCollection()];
    }

    getStudioStaff(){
        return this.studioStaff;
    }

    getNonStudioStaff(){
        return [this.accountant,this.recruiter];
    }

    getStaff(){
        return [...this.accountant,this.recruiter,...this.studioStaff];
    }
    
}
