'use strict';

/**
 * @ngdoc function
 * @name floorxApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the floorxApp
 */
angular.module('floorxApp')
  .controller('UserCtrl', function ($scope , userService) {
    $scope.fblogin = function(){

  		userService.fbLogin().then(function(d){
  			alert(d);
  		}).catch(function(e){
  			alert(e);
  		});
  		
  	};

  	$scope.googlelogin = function(){
  		userService.googleLogin().then(function(d){
  			alert("Success");
  		}).catch(function(e){
  			alert("error");
  		});

  	};

  	$scope.emaillogin = function(){
  		var email = this.email;
  		var password = this.password;
  		$scope.form_submitting = true;
  		userService.emailLogin(email , password).then(function(d){
  			alert("Success");
  		}).catch(function(e){
  			$scope.error = e;
  			$scope.form_submitting = false;
  			$scope.$apply();
  		});

  	};

  	$scope.text = "Login";
    $('#fs-loading').hide();

  });
