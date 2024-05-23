module.exports = class StudioStaff {
    constructor(actorsCollection, cameramanCollection) {
        this.actorsCollection = actorsCollection;
        this.cameramanCollection = cameramanCollection;
    }

    getActorsCollection() {
        return this.actorsCollection;
    }

    getCameramanCollection() {
        return this.cameramanCollection;
    }

    getStudioStaffCount(){
        return this.actorsCollection.length + this.cameramanCollection.length
    }
}
