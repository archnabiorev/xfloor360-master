'use strict';

/**
 * @ngdoc function
 * @name floorxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the floorxApp
 */
angular.module('floorxApp')
  .controller('MainCtrl', function ($scope) {

  	 /*===========================================
      =            MORTGAGE CALCULATOR            =
      ===========================================*/
      
      $scope.mortgage__down_payment = 60000;
      $scope.mortgage__home_price = 300000;
      $scope.mortgage__down_percent = 20;
      $scope.mortgage__loan_term = "30";
      $scope.mortgage__rate = 4.434;
      $scope.mortgage__pmi = false;
      $scope.mortgage__property_tax = 3600;
      $scope.mortgage__property_tax_percent = 1.2;
      $scope.mortgage__home_insurance = 800;
      $scope.mortgage__hoa = 300;
      $scope.mortgage__taxes = false;
      $scope.A = 1280;

      $scope.updateDownVal = function(){
      	$scope.mortgage__down_payment = ( ( parseFloat($scope.mortgage__home_price) ) * ( parseFloat($scope.mortgage__down_percent)/100 ) ).toFixed(2);
      	$scope.updateMortgage();
      };

      $scope.updateDownPercent = function(){
      	$scope.mortgage__down_percent = ( ( parseFloat($scope.mortgage__down_payment)/parseFloat($scope.mortgage__home_price) )*100 ).toFixed(2);
      	$scope.updateMortgage();
      };

      $scope.updatePropVal = function(){
      	$scope.mortgage__property_tax = ( ( parseFloat($scope.mortgage__home_price) ) * ( parseFloat($scope.mortgage__property_tax_percent)/100 ) ).toFixed(2);
      	$scope.updateMortgage();
      };

      $scope.updatePropPercent = function(){
      	$scope.mortgage__property_tax_percent = ( ( parseFloat($scope.mortgage__property_tax)/parseFloat($scope.mortgage__home_price) )*100 ).toFixed(2);
      	$scope.updateMortgage();
      };

      $scope.formatter = function(id){

        //HTML ATTR
        //ng-change="formatter('mortgage__down_payment')" 

        var ele = document.getElementById(id);
        var val = ele.value.trim();
        val = val.replace(/\D/g,'');
        var rawVal = ( isNaN(parseInt(val)) ) ? 0 : parseInt(val);

        if( isNaN(parseInt(val)) ){
          ele.value = '$0';
          ele.setAttribute('data-value' , 0);
        }

        var valArr = val.split('');
        var valLen = valArr.length;
        //parse 
        var commas = (valArr.length % 3 == 0) ? Math.floor(valArr.length/3)-1 : Math.floor(valArr.length/3);
        var nextCommaAt = length-3;
        var counter = 0;
        while( (counter < commas) && (valArr.length > 3) ){
          counter++;
          valArr.splice(nextCommaAt , 0 , ",");
          nextCommaAt = nextCommaAt - 4;
          console.log('ADDING COMMA #'+counter);
        }
        console.log('FINAL : '+valArr.join(''));

        ele.value = '$'+valArr.join('');
        ele.setAttribute('data-value' , rawVal);

        return [rawVal , valArr.join('')];
      };


      $scope.updateMortgage = function(){


        var basePrice = $scope.mortgage__home_price,
        downPayment = $scope.mortgage__down_payment,
        dpPercent = $scope.mortgage__down_percent,
        nYears    = $scope.mortgage__loan_term,
        interest  = $scope.mortgage__rate;

        // $scope.mortgage__home_price = 
        // $scope.mortgage__pmi = 
        // $scope.mortgage__property_tax = 
        // $scope.mortgage__property_tax_percent = 
        // $scope.mortgage__home_insurance = 
        // $scope.mortgage__hoa = 



        var monthlyPayment = function( P , T , R, N  ){


        var principal = parseFloat(P);
        var interest = parseFloat(R) / 100 / 12;
        var payments = parseFloat(T) * N;

        var x = Math.pow(1 + interest, payments);
        var monthly = (principal*x*interest)/(x-1);
        if (isFinite(monthly)){
        return  monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
        }else{
        return "ERROR!";
        }


        }

        var taxes = function( principal , propertyPercent, insurance , HOA ){

        return (principal*propertyPercent) + (insurance/12) + HOA;

        }

        var A =  monthlyPayment( basePrice-downPayment , nYears , interest , 12 );
        var data = [ 0 , 0 , 0 , A ];
        if( $scope.mortgage__taxes ){

          A = parseFloat(A) + ( parseFloat( $scope.mortgage__property_tax )/12) + ( parseFloat( $scope.mortgage__home_insurance ) / 12 ) + parseFloat( $scope.mortgage__hoa );
          A = parseFloat(A).toFixed(2);
          data[0] = ( parseFloat( $scope.mortgage__property_tax )/12).toFixed(2);
          data[1] = ( parseFloat( $scope.mortgage__home_insurance ) / 12 ).toFixed(2);
          data[2] = parseFloat( $scope.mortgage__hoa );


        }else{
          A = parseFloat(A).toFixed(2);
        }
        //update values 
          //chart | ["Taxes", "Insurance", "HOA", "P&I"]
          data[3] = A;
          donutChart.data.datasets[0].data = data;
          donutChart.options.elements.center.text = `$${A}`;
          donutChart.update();
          $scope.A = A;
          console.log(A);



      };
      
      
      /*=====  End of MORTGAGE CALCULATOR  ======*/
    		
    	  //MortageCalc('pslider');
          //MortageCalc('pslider1');
          //MortageCalc('pslider2');

          //var FX = new floorx();

  });
