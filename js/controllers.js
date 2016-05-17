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
 .controller('LoginController', function($scope, $routeParams, $location,dataService, flashService, authenticationService) {
	  // debugger;
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
	 	
	 	console.log("about to call the login service,  username = " + username.value + ", password = " + password.value);

	 	dataService.login(username.value,password.value).then(function(response) {
	        if (response.success) {
	            //debugger;
	            console.log("LoginController.login, response is success");
	            console.log("LoginController.login, response data = " + JSON.stringify(response.data));

	            authenticationService.SetCredentials(username, password);
	            // console.log("LoginController.login - data from response to be stored in auth:");
	            // console.log("email:" + response.data.config.data.email);
	            // console.log("pw:" + response.data.config.data.password);
	            // authenticationService.SetCredentials(response.data.config.data.email, response.data.config.data.password);
	            // vm.dataLoading = false;

	            $location.path('/Home');
	        } else {
	            console.log("LoginController.login, response is failure, message from Backendless = " + response.message);
	            flashService.Error(response.message);
	            // vm.password="";
	            // vm.dataLoading = false;
	        }
	    });   

	 };

})
.controller('RegistrationController', function($scope, $routeParams, $location, dataService, flashService, authenticationService) {
	 $scope.name = "RegistrationController";
	 $scope.params = $routeParams;

	 $scope.register = function() {
	 	 // debugger;
	 	 //note here we are accessing the user object scoped from the login template (ng-model)
	 	//this is different from the logi controller - that is acessing the field value of the input field
	 	console.log("about to call the register service,  firstname = " + this.user.firstName + ", lastname = " + this.user.lastName);
	 	dataService.register(this.user).then(function(response){
	 		if (response.success){
	 			// debugger;
	 			console.log("RegistrationController.login, response data = " + JSON.stringify(response.data));
	 			authenticationService.SetCredentials(response.data.config.data.email, response.data.config.data.password);
	 			$location.path('/Home');
	 		} else {
	 			console.log("RegistrationController.login, response is failure, message from Backendless = " + response.message);
	 			flashService.Error(response.message);
	 		}
	 	});

	 }
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
.controller('UserController',function($scope,$routeParams,dataService){
	$scope.name = "UserController";
	$scope.params = $routeParams;

	dataService.getUserInfo(function(response){
		console.log("data from the response = " + JSON.stringify(response.data));
		$scope.user = response.data;	
	});

	$scope.oneAtATime = true;

  	$scope.status = {
    	isFirstOpen: true,
    	isFirstDisabled: false
  	};

}).controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});



