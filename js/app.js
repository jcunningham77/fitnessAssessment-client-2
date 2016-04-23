angular.module('fitnessAssessment-client-2',['ngRoute'])
.controller('MainController', function($scope, $route, $routeParams, $location){
	 $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
})
 .controller('LoginController', function($scope, $routeParams) {
     $scope.name = "LoginController";
     $scope.params = $routeParams;
 })
  .controller('RegistrationController', function($scope, $routeParams) {
     $scope.name = "RegistrationController";
     $scope.params = $routeParams;
 })
   .controller('HomeController', function($scope, $routeParams) {
     $scope.name = "HomeController";
     $scope.params = $routeParams;
 })
  .config(function($routeProvider, $locationProvider) {

	  $routeProvider

	   .when('/Login', {
	    templateUrl: 'templates/login.html',
	    controller: 'LoginController'
	  })
	  .when('/Register', {
	    templateUrl: 'templates/register.html',
	    controller: 'RegistrationController'
	  }) 
	  .when('/Home', {
	    templateUrl: 'templates/home.html',
	    controller: 'HomeController'
	  })
	  .otherwise({ redirectTo: '/Login' });
});