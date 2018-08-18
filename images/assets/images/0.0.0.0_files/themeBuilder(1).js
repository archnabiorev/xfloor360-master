'use strict';

/**
 * @ngdoc function
 * @name colorappsApp.controller:ThemebuilderCtrl
 * @description
 * # ThemebuilderCtrl
 * Controller of the colorappsApp
 */
angular.module('colorappsApp')
  .controller('ThemebuilderCtrl', function ($scope , $routeParams) {
    
    var homeid = $routeParams.homeid;
    var theme = new themeBuilder( homeid );

  });
