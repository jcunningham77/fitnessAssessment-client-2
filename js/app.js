(function () {
    'use strict';

	angular.module('fitnessAssessment-client-2',['ngRoute', 'ngCookies'])
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
		  .when('/UserInfo', {
		    templateUrl: 'templates/user.html',
		    controller: 'UserController'
		    // data: { active:"home"}
		    // active=home;
		  })		  
		  .otherwise({ redirectTo: '/Home' });
	})
	.run(run);

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
