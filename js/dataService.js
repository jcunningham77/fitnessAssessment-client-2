'use strict';
angular.module("fitnessAssessment-client-2")	
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

    this.register = function(user){
            var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }

             console.log("about to invoke Backendless register API call, first = " + user.firstName + " and last = " + user.lastName);

             return $http.post('https://api.backendless.com/v1/users/register', user,config).then(handleSuccess, handleError);
           

    }

   function handleSuccess(res) {
        var response;
        response = { success: true,data:res };
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