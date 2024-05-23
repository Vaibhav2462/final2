const { CAMERAMAN } = require('../constants');
const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');

const PROBABILITY = 0.04;

module.exports = class CameraMan extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.CAMERA_MAN);
    }

    isWorkDone() {
        return parseFloat(Math.random().toFixed(2)) > PROBABILITY;
    }

    getRole(){
        return CAMERAMAN;
    }
}
