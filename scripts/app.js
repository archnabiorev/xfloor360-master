'use strict';

/**
 * @ngdoc overview
 * @name floorxApp
 * @description
 * # floorxApp
 *
 * Main module of the application.
 */
angular
  .module('floorxApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    '720kb.socialshare'
  ])
      .run(function($rootScope , userService) {


    /*====================================
    =            Auth Actions            =
    ====================================*/
    $rootScope.fblogin = function(){

      userService.fbLogin().then(function(d){
       $('#Loginmodal').modal('hide'); 
      }).catch(function(e){
        swal('Error' , 'An error occured' , 'error');
      });
      
    };

    $rootScope.signup = function(){
      var name = this.su_name;
      var email = this.su_email;
      var password = this.su_password;

      userService.emailSignUp(name , email , password).then(function(resp){
          $('#Loginmodal').modal('hide'); 
      }).catch(function(err){
        swal('Error' , err.message , 'error');
        console.log(err);
      });

    };

    $rootScope.signin = function(){
      var email = this.si_email;
      var password = this.si_password;

      userService.emailSignIn(email , password).then(function(resp){
          $('#Loginmodal').modal('hide'); 
      }).catch(function(err){
        swal('Error' , err.message , 'error');
        console.log(err);
      });

    };

    $rootScope.resetpassword = function(){
      var email = this.email;
      userService.resetPassword(email).then(function(){
        swal('Success' , 'Password reset link sent to your email address' , 'success');
        $('#Loginmodal').modal('hide'); 
      }).catch(function(err){
        var message = err.message.toString();
        //swal('Error' , err.message , 'error');
        swal('Error' , message , 'error');
        
      });
    };



    $rootScope.logout = function(){
      userService.logout();
      window.location.href= "/#/!/"
      window.location.reload();
    };


    $rootScope.googlelogin = function(){
      userService.googleLogin().then(function(d){
        $('#Loginmodal').modal('hide'); 
      }).catch(function(e){
        console.log(e);
        var message = err.message.toString();
        swal('Error' , message , 'error');
      });


    };
    
    
    /*=====  End of Auth Actions  ======*/
    

    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        //show the loading 
        $('#fs-loading').show();

        if( next.indexOf('app') == -1 ){
          $('#footer-wrapper').hide();
          $('#sidebar-widget').hide();
        }


        
        firebase.auth().onAuthStateChanged(function(user) {

          //prevent access to these pages
        if( (next.indexOf('profile') != -1) || (next.indexOf('favorites') != -1) ){
            if( !user ){
            window.location.href="/#!/";
          }

        }        

          if (user) {
            $rootScope.authed = true;
            $rootScope.user = user;
            //!!Dangerous to use $apply!!
            $rootScope.$apply(); 
          } else {
            //try to get the token
            // $.ajax({
            //   url : 'http://localhost:5567/cookietech.php?getToken=session'
            // }).done(function(resp){
            //   // alert(resp)
            // }).fail(function(err){
            //     console.log(JSON.stringify(err))
            // })

            $rootScope.authed = false;
            //!!Dangerous to use $apply!!
            $rootScope.user = [];
            $rootScope.$apply();
          }
        });

        var head = firebase.database().ref('/header').once('value');
        var foot = firebase.database().ref('/footer').once('value');
        var _all = [head , foot];

        Promise.all(_all).then(function(data){
          //apply them
          var h = data[0].val();
          var f = data[1].val();
          h = (h) ? h : { logo : './HomeX.png' };
          $('#trigger-logo').find('img').eq(0).attr('src' , h.logo);
        }).catch(function(e){
          alert(e);
          console.log(e);
        });

    });
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
          .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl',
        controllerAs: 'favorites'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/forgot', {
        templateUrl: 'views/forgot.html',
        controller: 'ForgotCtrl',
        controllerAs: 'forgot'
      })
      .when('/final/:id' , {
        templateUrl: 'views/pdfpage.html',
        controller: 'FinalCtrl',
        controllerAs: 'final'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
