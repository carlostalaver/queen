var app = angular.module("queen", ['ngRoute'])
app.config(['$routeProvider', function ($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: "./app/views/homeView.html",
      controller: 'homeController'
    })
    .when('/banda', {
      templateUrl: "./app/views/bandaView.html",
      controller: 'bandaController'
    })
    .otherwise({
      redirectTo:'/'
    });
}]);
 

app.controller('homeController', ["$scope", "$location", function($scope, $location){
  $scope.greeting = "Hola! Estas siendo controlado por el homeController.";
  $scope.currentLocation = $location.path();
}]) 


app.controller('bandaController', ["$scope", "$location", function($scope, $location){
  $scope.greeting = "Hola! Estas siendo controlado por el bandaController."
  var current = new Date();
  $scope.fechaActual = current.getDate() + "/"+ current.getMonth() + "/" + current.getFullYear();
  $scope.currentLocation = $location.path();
}]) 