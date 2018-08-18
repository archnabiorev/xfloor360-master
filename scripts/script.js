/*		 jQuery(document).ready(function ($) {
            var options = {
                $AutoPlay: 1,                                  
                $DragOrientation: 1                            
            };

            var jssor_slider1 = new $JssorSlider$('slider1_container', options);
        });*/

var AccordionPatches = function(){
  var $myGroup = $('#floorvars-wrapper');
  	  $myGroup.on('change','.option-input', function() {
      $myGroup.find('.collapse.in').collapse('hide');
  });


 }();
var AccordionMobile = function(screenWidth){
return;
    if(screenWidth<769){
     // alert('mobile');
        $('div#MobileOPtions .tab-pane.active').removeClass('active');
        $('.custom-tabs li.active').removeClass('active');
        $('.custom-tabs li').find('a').attr('aria-expanded',"false");
      //  $('.custom-tabs').tab('hide');

        var SingleWidth = $('#elevation-wrapper .single-elevation').width();
        var SingleWidth = 190+30;
        var CountSingle = $('#elevation-wrapper .single-elevation').length;

        console.log(SingleWidth,CountSingle);
        $('#elevation-wrapper').css({
          width: ( SingleWidth*CountSingle ) +'px'
        });
    }else{
       $('#elevation-wrapper').css({
         width: 'auto'
       })
    }

};

/*var MainStage = function(y,ex){

  ///console.log(e,y);

  var expanded = (ex == 'true') ? $(this).attr('aria-expanded') : false;

  //getting Height
  if(expanded=='true'){
    var NewHeightIs = $(window).height() - (350);
  }else{
     var NewHeightIs = $(window).height() - (100);
  }
  if( y<768  ){
   // alert(expanded)
   
  $('div#some_id').height( NewHeightIs )



  }

}*/
$('div#MobileOPtions a[data-toggle="tab"]').on('shown.bs.tab', function ( y ) {
   //var target = $(e.target).attr("href") // activated tab
  // MainStage( $(window).width(),true );

});
 var HeightSetter = function(target,screenWidth,menus){
      //initial parameters
      var _this = target;
      var mobile = (screenWidth<769) ? true : false;
    
      // cacl header & menu
      var Mheight = $('#footer-wrapper').height();
      var Hheight = (menus==true) ? $('#header').height()  : 40;
      var screenHeight =$(window).height();

      //calculating height
      var calcNewHeight = parseInt( screenHeight - Mheight - Hheight );

     // console.log(target,screenWidth,screenHeight, Mheight, Hheight, calcNewHeight);
      if(!mobile){
        $(_this).css({
          height: calcNewHeight+'px'
        });
      }else{
         $(_this).css({
          height: ( calcNewHeight - 70 )+'px'
        });
      }
 }


window.fixHeights = function(){

   AccordionMobile( $(window).width() );
  
   // HeightSetter('.front-image-wrapper', $(window).width(), true );
   HeightSetter('.col-sm-4.col-lg-3.dark-bg.viewhieght', $(window).width(), true );

};

$(window).on('resize', function () {
  // body...
   // AccordionMobile( $(window).width() );
   // HeightSetter('#some_id', $(window).width(), true );
   // HeightSetter('.front-image-wrapper', $(window).width(), true );
   // HeightSetter('.col-sm-4.col-lg-3.dark-bg.viewhieght', $(window).width(), true );
    HeightSetter('#some_id', $(window).width(), true );
   fixHeights();

});
fixHeights();
$('span#close').on('click',function(){
  //AccordionMobile( $(window).width() );
  // $('div#some_id').height( $('div#some_id').height()+250);
  // MainStage( $(window).width(),false );

  if($(window).width()<769){
     // alert('mobile');
        $('div#MobileOPtions .tab-pane.active').removeClass('active');
        $('.custom-tabs li.active').removeClass('active');
        $('.custom-tabs li').find('a').attr('aria-expanded',"false");
        $('#some_id,div#interactive-wrapper>div').height(  $(window).height() - 140 );
  }

});
$(document).on('click' , '.custom-tabs li' , function(){
  if( $(window).width()<769 ){
     $(this).find('a').attr('aria-expanded',"true");

     $('#some_id,div#interactive-wrapper>div').height(  $(window).height() - 370 );
  }
});
var MortageCalc = function(target){
  return false;
                    var snapSlider = document.getElementById( target );
 
                    var attrsb = snapSlider.attributes;
                    // console.log(attrsb,attrsb['data-min']['value'],attrsb['data-max']['value']);
                    var startfrom = ( typeof(attrsb['data-start']['value']) == 'undefined') ? 0 : parseInt(attrsb['data-start']['value']);
                    noUiSlider.create(snapSlider, {
                      start: startfrom,
                      behaviour: 'snap',
                      connect: [true, false],
                      range: {
                        'min':  parseInt(attrsb['data-min']['value']),
                        'max':  parseInt(attrsb['data-max']['value'])
                      },
                      format: wNumb({
                        decimals: parseInt(attrsb['data-decimal']['value']),
                        thousand: ','
                    })
                    });
 
                    var Thousand = wNumb({
                        thousand: ','
                    });
                    var ThousandWithDeci = wNumb({
                        thousand: ',',
                        decimals: '2',
                    });
 
 
 
                    var rangeSliderValueElement = document.getElementById( target+'-value');
 
                   snapSlider.noUiSlider.on('update', function( values, handle ) {
                          rangeSliderValueElement.innerHTML = values[handle];
 
                          /************************
             
                          Calculater
 
                          *************************/
                        //    var varTax = parseInt($('#pslider3-value').text() );
                        //  var ProTax =  ( varTax != 0 ) ? varTax/100 : 0;
                          var ActualHomePrice = parseInt($('#UpdatedPrice').text().replace(',','') );
 
                         //Set HomePriceInPopUp
                          $('.loanAmountCounter').text( Thousand.to(ActualHomePrice) );
                         
 
                          var UpdatedHomePrice = ActualHomePrice;
                          var DownPayment = $('#pslider-value').text();
                          //Set DownPayment In PopUp
                          $('#downPaymentTotal').text( Thousand.to(DownPayment) );
                          DownPayment = parseInt( DownPayment.replace(',','') );
                          var leftToPay = (UpdatedHomePrice - DownPayment).toFixed(2);
                         //console.log('Price',parseInt(UpdatedHomePrice));
                         
                         /*
               
                        Finding Compond Interest & Amount
 
                         */
                         var Rate =  parseInt( $('#pslider1-value').text() );
 
                         Rate = ( Rate != 0 || Rate == 100 ) ? Rate/100: 0;
                         var TotalTerm = parseInt( $('#pslider2-value').text() );
                         $('#loanTermCounter').text( $('#pslider2-value').text() );
                         TotalTerm = ( TotalTerm != 0 ) ? TotalTerm : 1
                         
                         //console.log(Rate,TotalTerm,leftToPay);
                         
                         var CompondAmount =leftToPay*( Math.pow( ( 1 + Rate ), TotalTerm ) );
 
                         var CompondInterest = ( CompondAmount - leftToPay );
 
                         //console.log('Compound Amount',CompondAmount,CompondInterest);
                        // console.log(CompondAmount,TotalTerm);
                         var EMI = parseInt( CompondAmount/( TotalTerm*12 ) );
 
 
                         $('.total-emi-counter').text( Thousand.to( EMI ) );
                         //console.log(EMI);
 
 
 
                    });
              };
         
 var safeLoad = function(url , TAG){
   // console.log("SAFE LOADING : "+url);
                return new Promise( function(resolve , reject){
                    //preload this image to the queue
                    var tag = ( typeof TAG == "undefined" ) ? uuid() : TAG;
                    var queue = new createjs.LoadQueue(true , null , true);
                    queue.loadFile({ id:tag , src : url , crossOrigin:"Anonymous" });

                    queue.on("fileload" , function(){
                        MEGAQUEUE[ tag ] = queue;
                        resolve({ id : tag , queue:queue });

                    }, this);

                });
            };