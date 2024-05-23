const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const Accountant = require('./Accountant');
const CameraMan = require('./CameraMan');
const Actor = require('./Actor');
const NoSuchProfession = require('../thirdparty/NoSuchProfession');
const SuperStar = require('./SuperStar');
const { RECRUITER } = require('../constants');

module.exports = class Recruiter extends StudioEmployee {
    personMap = {
        'accountant':Accountant,
        'cameraman':CameraMan,
        'superstar':SuperStar,
        'actor':Actor
    }
    constructor(name) {
        super(name, Salaries.RECRUITER);
    }

    hire(name, personType) {
        const personClass = this.personMap[personType.toLowerCase()];
        if(!personClass){
            throw new NoSuchProfession(personType);
        }
        personClass(name);
    }

    getRole(){
        return RECRUITER;
    }
}
