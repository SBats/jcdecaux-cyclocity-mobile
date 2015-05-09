'usse strict';

function StationController(details) {
    var self = this;

    console.log(details);
    self.details = details;
}

module.exports = {
    StationController: StationController
};