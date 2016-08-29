weatherApp.controller('homeController',['$scope','cityService', function($scope, cityService){

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService', function($scope, $resource,$routeParams,cityService){

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&appid=bcc5e4f55c68930c3d3e6e684ed45e23" ,{
        callback: "JSON_CALLBACK" },{ get: {method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt:$scope.days });

    /*console.log($scope.weatherResult);*/

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }

}]);