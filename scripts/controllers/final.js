
'use strict';

/**
 * @ngdoc function
 * @name floorxApp.controller:FinalCtrl
 * @description
 * # FinalCtrl
 * Controller of the floorxApp
 */
angular.module('floorxApp')
  .controller('FinalCtrl', function ($scope , userService , $location , $routeParams) {
  $('#footer-wrapper').hide();
  $('#sidebar-widget').hide();
  /*===================================
  =            INNER LOGIC            =
  ===================================*/
    var id =  $routeParams.id
    var sessionID = id;
    $scope.sessionID = id;
        firebase.database().ref('/forbesxFloor/'+id).once('value').then(function(snapshot){
        var result = snapshot.val();
      if( result ){

         var data = result; 
         console.log(data)
          data['base'] = {image : data.image};
       if(data.homeXData){
         data.base.image = data.image;
         $scope.homexdata = data.homeXData;
         window.testttt = data.homeXData;
       }else{
         $scope.homexdata = false;
       }
       //////////

       window.tester = GLOBAL_FINAL_HOMEX.items;
       $scope.data = data;
       $scope.base = 263000;

       var itemsTotal = 0;
       $scope.$apply();
       $('#fs-loading').hide();
       //////////
      }else{
        alert('Nothing Found')
        window.location.href= "/#/!/"
        window.location.reload();
      }

    })
  
  
  /*=====  End of INNER LOGIC  ======*/
  
    $scope.shareDialog = function(){
      $('#share-modal').modal('show')
    }
  
   
   $scope.getFormattedCurrency = function(amount){
      return _formatter.to(amount);
    };

   var _formatter = wNumb({
                        decimals: 0,
                        thousand: ','
                    });
    $scope.getFormattedCurrency = function(amount){
      return _formatter.to(amount);
    };
   

var injCheck  = [];

$scope.injectCheck = function(category){
  if( injCheck.indexOf(category()) == -1 ){
    injCheck.push(category());
    return true;
  }else{
    return false;
  }
};

$scope.downloadPdf = function(id){

      if( $('#download-pdf').attr('data-link') ){
        window.open( $('#download-pdf').attr('data-link') );
        return false;
      }

      $('body').block({ css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff'
        }, 
         overlayCSS:  { 
        backgroundColor: '#fff', 
        opacity:         0.6, 
        cursor:          'wait' 
    }, 
 
        message : 'Generating PDF'
         });

      var sid = id;
      var filename = uuid();
      $.ajax({
        url : 'http://45.118.133.182:4300/'+sid+'/'+filename
      }).done(function(link){
          $('#download-pdf').attr('data-link' , link);
          console.log(link);
          window.open( link );
          $('body').unblock();
      }).fail(function(err){
          alert('Please try again');
          console.log(err);
          $('body').unblock();
      });
    };

   $scope.addToFavorite = function(__id , __image){
      swal({
              title: 'Add Favorite',
              text: "Please label this favorite",
              type: 'info',
              input : 'text',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes!'
            }).then((result) => {
              if (result.value) {
                
                /*===========================
                =            YES            =
                ===========================*/
                
                                
                  var __name = result.value;
                  //show loader
                  $('body').block({
                                  overlayColor: '#000000',
                                  type: 'loader',
                                  state: 'success',
                                  message: 'Saving <span id="progress-percentage"></span>'
                              });

                  userService.addToFavorite(__id , __image , __name).then(function(){
                    swal("Success" , "Added to favorites" , "success");
                    $('body').unblock();
                  }).catch(function(err){
                    $('body').unblock();
                    swal("Error" , "An error occured" , "error");
                    console.log(err);
                  });

                
                /*=====  End of YES  ======*/
                
                
              }
            });

              
   };

  });

