'use strict';

/**
 * @ngdoc function
 * @name floorxApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the floorxApp
 */
angular.module('floorxApp')
  .controller('FavoritesCtrl', function ($scope, userService) {
    $scope.loaded = false;

    userService.getAdditionalInfo().then(function(resp){
        console.log(resp);
        $scope.loaded = true;
        $scope.favs = resp;
        $scope.$apply();
        $('#fs-loading').hide();

        //filter 


    }).catch(function(err){
      alert(err);
      console.log(err);
        $scope.loaded = true;
        $scope.$apply();
        $('#fs-loading').hide();
    });

    $scope.delete = function(id){
        //ask 

        swal({
              title: 'Remove this from your favorites?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes!'
            }).then((result) => {
              if (result.value) {
                var user = firebase.auth().currentUser;
                var uid = user.uid;
                if( !uid ){
                    swal(
                  'Error!',
                  'Please try again.',
                  'error'
                            )
                    return false;
                }
                firebase.database().ref('/homeXusers/'+uid+'/favorites').child(id).remove().then(function(snap){
                    swal(
                  'Deleted!',
                  '',
                  'success'
                )
                    //pop it out 
                    $('#fav-'+id).remove();
                }).catch(function(err){
                    swal(
                  'Error!',
                  'Please try again.',
                  'error'
                )
                })
                
              }
            });

                };

  });
