'usse strict';

function StationController(data) {
    console.log(data);
    this.data = data;
}

module.exports = {
    StationController: StationController
};