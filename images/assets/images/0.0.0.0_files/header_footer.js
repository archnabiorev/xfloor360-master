/*===========================================
=            PLUGIN DEFINITIONS             =
===========================================*/

var header_footer = function(){


/*----------  Init and animators  ----------*/

var _self = this;

//Header animation definition
_self.headerTL = new TimelineMax();
_self.headerTL.to( $('#header-pullbar') , 0.3 , { css:{ top : 0 } } );
_self.headerTL.to( $('.header-close-btn') , 0.3 , { css:{ className : '+=active' } } );
_self.headerTL.to( $('#header-pullbar div') , 0.3 , { css:{ className : '+=animated fadeInUp' } } , '-0.3' );
_self.headerTL.stop();

//Content wrapper definition
_self.contentWrapperTL = new TimelineMax();
_self.contentWrapperTL.to( $('#footer-content-wrapper') , 0.6 , { css : { marginTop : "0%" , height:"100%" } }  );
_self.contentWrapperTL.stop();

//Play header animation
_self.headerPlay = function(){
_self.headerTL.play();
//$('#header-pullbar .header-close-btn').addClass('active');
};

//Reverse header animation
_self.headerReverse = function(){
_self.headerTL.reverse();
//$('#header-pullbar .header-close-btn').removeClass('active');
};

_self.showContentWrapper = function(t , d){
_self.headerTL.reverse();
var render = Mustache.render(t , {data : d} );
$('#footer-content-wrapper .footer-content').html(render);

$('#footer-wrapper .footer-center').removeClass('animated fadeInUp');
$('#footer-wrapper .footer-center').addClass('animated fadeOutDown');

$('.open-notch .notch-content').removeClass('animated fadeOutDown open-notch-hide');
$('.open-notch .notch-content').addClass('animated fadeInUp');
_self.contentWrapperTL.play();
};

_self.hideContentWrapper = function(){

$('.open-notch .notch-content').removeClass('animated fadeInUp');
$('.open-notch .notch-content').addClass('animated fadeOutDown');
$('#footer-wrapper .footer-center').removeClass('animated fadeOutDown');
$('#footer-wrapper .footer-center').addClass('animated fadeInUp');
_self.contentWrapperTL.reverse();

};

return _self;
};


/*=====  End of PLUGIN DEFINITIONS   ======*/




/*=====================================================
=            Constructor and Event Binders            =
=====================================================*/

$(function(){

var headfoot = new header_footer();

$(document).on('click' , '#menu-button' , function(e){
e.preventDefault();
headfoot.headerPlay();
});

$(document).on('click' , '.footer-link' , function(e){
e.preventDefault();
headfoot.headerReverse();
});

// $(document).on('click' , '.header-button , .footer-link' , function(e){
// e.preventDefault();

// var template = $('#sample-template').html();
// var data = [{nothing : "important"}];

// headfoot.showContentWrapper(template , data);
// });

$(document).on('click' , '.header-button , .footer-link' , function(e){
e.preventDefault();
if( $(this).data('title') ){
	var tempData = $(this).data('id');
}
if( $(this).data('bgurl') ){
var bgurl = $(this).data('bgurl');
if(bgurl.trim().length){
	$('#footer-content-wrapper').css('background-image',"url("+bgurl+")");
}else{
	$('#footer-content-wrapper').css('background',false)
}

}
if( $(this).data('title') ){
var title = $(this).data('title');
if(title.trim().length){
	$('#footer-title-modal').text(title);
}

}
var template = $(tempData).html();
var data = [{nothing : "important"}];

headfoot.showContentWrapper(template , data);
});

$(document).on('click' , '#footer-content-wrapper .footer-content-closer .footer-content-close-btn' , function(e){
	e.preventDefault();
	headfoot.hideContentWrapper();
});

$(document).on('click' , '.header-close-btn' , function(e){
	e.preventDefault();
	headfoot.headerReverse();
});



});// ./ready function
/*=====  End of Constructor and Event Binders  ======*/




