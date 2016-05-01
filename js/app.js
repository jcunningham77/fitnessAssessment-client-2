(function () {
    'use strict';

	angular.module('fitnessAssessment-client-2',['ngRoute', 'ngCookies'])
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
	  .config(function($routeProvider, $locationProvider) {
	  	// debugger;
		  $routeProvider

		   .when('/Login', {
		    templateUrl: 'templates/login.html',
		    controller: 'LoginController',
		    // data: { active:"login" }
		    
		  })
		  .when('/Register', {
		    templateUrl: 'templates/register.html',
		    controller: 'RegistrationController',
		    // data: { active:"register" }
		    // active=register;
		  }) 
		  .when('/Home', {
		    templateUrl: 'templates/home.html',
		    controller: 'HomeController',
		    // data: { active:"home"}
		    // active=home;
		  })
		  .otherwise({ redirectTo: '/Home' });
	})
	.run(run)
	.service('dataService',function($http){

		var TAG = "dataService";

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

		this.login = function(username,password){
			  var config = {
	                headers : {
	                    'authorization': undefined,
	                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
	                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
	                    'application-type':'REST',
	                    'Content-Type':'application/json'
	                }
	            }
	            // $http.post('https://api.backendless.com/v1/users/login', { login: username, password: password },config)
	            //    .success(function (response) {
	            //     console.log("success login = " + response.data.message);
	            //        callback(response);
	            //    });
	            console.log("about to invoke Backendless login API call, username = " + username + " and password = " + password);
	            

	            // return $http.post('https://api.backendless.com/v1/users/login', { login: username, password: password },config).then(handleSuccess, handleError);
	            // debugger;
	            return $http.post('https://api.backendless.com/v1/users/login', { login: username, password: password },config).then(handleSuccess, handleError);

		}

	   function handleSuccess(res) {
	        var response;
	        response = { success: true };
	        // debugger;
	        console.log(TAG + " handleSuccess: res = " + JSON.stringify(res));
	        console.log(TAG + " handleSuccess: response = " + JSON.stringify(response));
	        if(response.success){
	            console.log("response.success is true");
	        } else {
	            console.log("response.success is false");
	        }
	        return  response;
	    }	

	    function handleError(res) {
		    // debugger;
		    console.log("the error was = " + res.data.message);
		   
		    return { success: false, message: res.data.message};
	    }
	  })
	.factory('authenticationService', function authenticationService($rootScope,$http,$cookieStore){
		var TAG = "authenticationService";
	    var service = {};

	    service.SetCredentials = SetCredentials;
	    service.ClearCredentials = ClearCredentials;

	    

	    var Base64 = {

	        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

	        encode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;

	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);

	                enc1 = chr1 >> 2;
	                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                enc4 = chr3 & 63;

	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }

	                output = output +
	                    this.keyStr.charAt(enc1) +
	                    this.keyStr.charAt(enc2) +
	                    this.keyStr.charAt(enc3) +
	                    this.keyStr.charAt(enc4);
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        },

	        decode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;

	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            var base64test = /[^A-Za-z0-9\+\/\=]/g;
	            if (base64test.exec(input)) {
	                window.alert("There were invalid base64 characters in the input text.\n" +
	                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
	                    "Expect errors in decoding.");
	            }
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	            do {
	                enc1 = this.keyStr.indexOf(input.charAt(i++));
	                enc2 = this.keyStr.indexOf(input.charAt(i++));
	                enc3 = this.keyStr.indexOf(input.charAt(i++));
	                enc4 = this.keyStr.indexOf(input.charAt(i++));

	                chr1 = (enc1 << 2) | (enc2 >> 4);
	                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                chr3 = ((enc3 & 3) << 6) | enc4;

	                output = output + String.fromCharCode(chr1);

	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }

	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";

	            } while (i < input.length);

	            return output;
	        }
	    }


	    function SetCredentials(username, password) {
	        var authdata = Base64.encode(username + ':' + password);

	        $rootScope.globals = {
	            currentUser: {
	                username: username,
	                authdata: authdata
	            }
	        };



	        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
	        $cookieStore.put('globals', $rootScope.globals);
	    }

	    function ClearCredentials() {
	        $rootScope.globals = {};
	        $cookieStore.remove('globals');
	        $http.defaults.headers.common.Authorization = 'Basic';
	    }

	    return service;


	})
	.factory('FlashService', function FlashService($rootScope) {
	        var service = {};

	        service.Success = Success;
	        service.Error = Error;

	        initService();

	        return service;

	        function initService() {
	            $rootScope.$on('$locationChangeStart', function () {
	                clearFlashMessage();
	            });

	            function clearFlashMessage() {
	                var flash = $rootScope.flash;
	                if (flash) {
	                    if (!flash.keepAfterLocationChange) {
	                        delete $rootScope.flash;
	                    } else {
	                        // only keep for a single location change
	                        flash.keepAfterLocationChange = false;
	                    }
	                }
	            }
	        }

	        function Success(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'success', 
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }

	        function Error(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'error',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }
	    });


	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        // debugger;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        	console.log("event = " + event);
        	console.log("next = " + next);
        	console.log("current = " + current);
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/Login', '/Register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/Login');
            }
        });
    }
		
	
})();
