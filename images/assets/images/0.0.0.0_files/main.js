'use strict';

/**
 * @ngdoc function
 * @name colorappsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the colorappsApp
 */
angular.module('colorappsApp')
  .controller('MainCtrl', function ($scope , lotid , $routeParams) {

    $scope.pats = ["7aa6a6bcc48ce51d747e6af08e4bbf15.jpg","Tex-black.jpg","Tex-white.jpg","dark_leather.png","eight_horns.png","fabric_plaid.png","files","old_wall.png","regal.png","skulls.png","stardust.png","white_brick_wall.png","white_leather.png","wool.png"];
    
    var loading = new fullscreenLoading();
    loading.start();
    //var tempID = "TEMPLATE_49b90b70_c8ce_6d81_5adc_c4770eb46de7";
    //var tempID = lotid;
    var cLOTID = $routeParams.id;
      dbModel.getLotById(cLOTID)
    //SQUARE PSD's
    // var tempID = "TEMPLATE_d79356f8_5bbf_6783_a558_4207bf647669";
    //var tempID = "TEMPLATE_57b3d717_8e8a_e4f0_e9d0_dcf227821ceb";  
      // var tempID = "TEMPLATE_49b90b70_c8ce_6d81_5adc_c4770eb46de7";

    // LANDSCAPE PSD's
    //var tempID = "TEMPLATE_81f34361_3ec7_e10e_f13c_9df0ccbdcd35";
     // var tempID = "TEMPLATE_341959f8_7b02_b738_4efa_19647156493a";


    
      //dbModel.getLotById(tempID)
      .then(function(snapshot){
        //got it ! Render it now 
            var base = snapshot.lots.val();
            var layers = snapshot.layerpacks.val();

            var themes = [];
            var key;
            for ( key in base.themes){
              var theme = base.themes[key];
              var temp = {
                id      : key,
                content : JSON.stringify(theme.content),
                title   : theme.title
              };
              themes.push(temp);
            }
            base.themes_sanitized = themes;
            var app = new home_app(base , layers , $scope);
          
            // $('#lotBuilderForm').remove();
            // swal.close();


          }).catch(function(error){
            alert(error);
            console.log(error);
          });


  });
