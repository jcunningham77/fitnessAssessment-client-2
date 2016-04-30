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
   .controller('HomeController', function($scope, $routeParams, dataService) {
     $scope.name = "HomeController";
     $scope.params = $routeParams;
     dataService.getUsers(function(response){
		// debugger;
		console.log("data from the response = " + response.data);	
		$scope.users = response.data;
	});

     	$scope.deleteUser = function(user, $index){
		console.log("the index we are about to delete is = " + $index);
		//dataService.deleteTodo(todo);
		$scope.users.splice($index,1);
	};

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
	  .otherwise({ redirectTo: '/Home' });
})
.service('dataService',function($http){

	this.getUsers = function(callback){
		console.log("in the dataService getUsers method");
		$http.get('mock/users.json')
		.then(callback)
	}
  });