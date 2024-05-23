module.exports = class Movie {
    constructor(name, genre) {
        this.name = name;
        this.genre = genre;
        this.isFinished = false;
    }

    success() {
        this.isFinished = true;
    }

    toString() {
        return `Movie ${this.name} [${this.genre}], status: ${this.isFinished ? 'finished' : 'in production'}, days in production: ${this.daysInProduction}`;
    }
}
