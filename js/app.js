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
		console.log("data from the response = " + JSON.stringify(response.data));	
		$scope.users = response.data.data;
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
		// $http.get('mock/users.json')
		// .then(callback)
            var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }
            $http.get('https://api.backendless.com/v1/data/Users?props=firstName,lastName,objectId', config).then(callback, handleError);
	}

    function handleError(res) {
	    // debugger;
	    console.log("the error was = " + res.data.message);
	   
	    return { success: false, message: res.data.message};
    }
  });