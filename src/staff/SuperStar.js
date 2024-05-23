const { DECIMAL_PLACES, SUPERSTAR } = require('../constants');
const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const PROBABILITY = 0.01;
module.exports = class SuperStar extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.ACTOR);
    }

    isWorkDone() {
        const successChance = parseFloat(Math.random().toFixed(DECIMAL_PLACES)) > PROBABILITY;
        return successChance;
    }

    getRole(){
        return SUPERSTAR;
    }
}
