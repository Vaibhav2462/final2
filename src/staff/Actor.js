const { DECIMAL_PLACES, ACTOR } = require('../constants');
const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const PROBABILITY = 0.04;
module.exports = class Actor extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.ACTOR);
    }

    isWorkDone() {
        const successChance = parseFloat(Math.random().toFixed(DECIMAL_PLACES)) > PROBABILITY;
        return successChance;
    }

    getRole(){
        return ACTOR;
    }
}
