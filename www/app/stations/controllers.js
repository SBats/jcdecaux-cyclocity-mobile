'usse strict';

function StationController(details, $scope, StationsService) {
    console.log(details);
    $scope.details = details;

    function getDistance() {
        $scope.distanceToStation = '...';
        StationsService.getDistanceToStation()
            .then(
                function (distance) {
                    $scope.distanceToStation = distance;
                }
            );
    }

    getDistance();
}

module.exports = {
    StationController: StationController
};