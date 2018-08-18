'use strict';

/**
 * @ngdoc overview
 * @name colorappsApp
 * @description
 * # colorappsApp
 *
 * Main module of the application.
 */
angular
  .module('colorappsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/app/:id', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/', {
        templateUrl: 'views/selector.html',
        controller: 'SelectorCtrl',
        controllerAs: 'selector'
      })
      .when('/themebuilder/:homeid', {
        templateUrl: 'views/themebuilder.html',
        controller: 'ThemebuilderCtrl',
        controllerAs: 'themebuilder'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
