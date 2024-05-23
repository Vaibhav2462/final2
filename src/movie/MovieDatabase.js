module.exports = class MovieDatabase{
    constructor(){
        this.movieArchive = [];
    }
    loadMovieDatabase(provider,fileName,movieStatistics) { 
        this.movieArchive = [];
        
        const resource = provider.loadResource(fileName);
        try {
            const movies = JSON.parse(resource);
            for (const movie of movies) {
                this.addMovieToArchive(movie);
            }
        } catch (e) {
            console.log('Movie archive is damaged or empty');
        }
    }

    addMovieToArchive(movie) {
        this.movieArchive.push(movie);
    }

    getMovieArchive(){
        return this.movieArchive;
    }
}