'use strict';
angular.module("fitnessAssessment-client-2")
.controller('MainController', function($scope, $route, $routeParams, $location){
		 $scope.$route = $route;
	     $scope.$location = $location;
	     $scope.$routeParams = $routeParams;
	     //$scope.state = $state;
	     // console.log("data = " + data);
	     // debugger;
})
 .controller('LoginController', function($scope, $routeParams, $location,dataService,FlashService, authenticationService) {
	 $scope.name = "LoginController";
	 $scope.params = $routeParams;
	 $scope.$location = $location;
	 $scope.currentUser = null;

	 initController();

	 function initController() {
	    // reset login status
	    authenticationService.ClearCredentials();
	  }

	 $scope.login = function(){
	 	// debugger;
	 	console.log("about to call the login service,  username = " + username.value + ", password = " + password.value);

	 	dataService.login(username.value,password.value).then(function(response) {
	        if (response.success) {
	            //debugger;
	            console.log("LoginController.login, response is success");
	            console.log("LoginController.login, response data = " + JSON.stringify(response.data));
	            authenticationService.SetCredentials(username, password);
	            // vm.dataLoading = false;

	            $location.path('/Home');
	        } else {
	            console.log("LoginController.login, response is failure, message from Backendless = " + response.message);
	            FlashService.Error(response.message);
	            // vm.password="";
	            // vm.dataLoading = false;
	        }
	    });   

	 };

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