//module
var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);

//routes
weatherApp.config(function ($routeProvider) {

    $routeProvider

       .when('/', {
           templateUrl:'templates/home.html',
           controller:'homeController'
       })

       .when('/forecast', {
           templateUrl:'templates/forecast.html',
           controller:'forecastController'
       })
       .otherwise({redirectTo:'/'})

});

//services
weatherApp.service('cityService', function(){

    this.city = "Zaporizhia";
});


//controllers
weatherApp.controller('homeController',['$scope','cityService', function($scope, cityService){

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource','cityService', function($scope, $resource, cityService){

    $scope.city = cityService.city;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?appid=bcc5e4f55c68930c3d3e6e684ed45e23" ,{
         callback: "JSON_CALLBACK" },{ get: {method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt:2 });

    console.log($scope.weatherResult);
}]);