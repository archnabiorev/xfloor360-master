'use strict';

/**
 * @ngdoc function
 * @name colorappsApp.controller:SelectorCtrl
 * @description
 * # SelectorCtrl
 * Controller of the colorappsApp
 */
angular.module('colorappsApp')
  .controller('SelectorCtrl', function ($scope , lotid) {
    
    $scope.lots = lotid;
  	$scope.go = function ( path , id) {
  		window.location.href = "/#!/"+path+"/"+id;
		};

	$scope.rldngo = function ( path , id) {
  		window.location = "/#!/"+path+"/"+id;
  		window.location.reload();
		};



  });
