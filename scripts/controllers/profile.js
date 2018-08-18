'use strict';

/**
 * @ngdoc function
 * @name userauthApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the floorxApp
 */
angular.module('floorxApp')
  .controller('ProfileCtrl', function ($scope , userService , $rootScope) {
  	
    //get user's extra fields from database
    $scope.hasLoaded = false;
    userService.getAdditionalInfo().then(function(resp){
      $scope.hasLoaded = true;
      $scope.userData = resp;
      $scope.$apply();
      console.log(resp);
      $('#fs-loading').hide();
    }).catch(function(err){
      $scope.hasLoaded = true;
      console.log(err);
      $scope.$apply();
      alert("An error occured");
    });

    $scope.update = function(){
    	var frm = this;
      var formElement = frm.update_form.$$element[0];


    	var data = {

    		uid : formElement.uid.value,
        name : formElement.name.value,
        company : formElement.company_name.value,
        position : formElement.position.value,
        work_number : formElement.work_number.value,
        work_address : formElement.work_address.value

    	};
    	userService.updateProfile(data).then(function(resp){
    		alert('updated');
    	}).catch(function(e){
    		alert('error');
        console.log(e);
    	});
    };

    $scope.update_password = function(){
      
      var password = document.getElementById('new-password').value;
      userService.updatePassword( password ).then(function(){
        alert('Password Changed');
      }).catch(function(e){
        alert('An error occured');
        console.log(e);
      });

    };

  });
