var sideWidget = function( ele ,  data , options ){

_sw = this;

window.bigReso = true;
var options = options || {};
_sw.defaults = {
	width : options.width || 150,//px
	height : options.height || $(window).height(), //px,
	smallHeight : options.smallHeight || 100,
	breakpoint : 900 || options.breakpoint,
	selectedColor : options.selectedColor || "#00ff00",
	generalColor : options.generalColor || "#ff0000" 

};



/*----------  Function Definitions  ----------*/
_sw.init = function(){

	//Get the template file 
	$.get('bower_components/ps-responsive-grid-sidebar/dist/side-widget.mst' , function(template){

		Mustache.parse(template);
		var render = Mustache.render(template , { data : data } );
		$(ele).html(render);

		//set colors 
		$('#side-widget').css({
			background : _sw.defaults.generalColor
		});

		_sw.fitNbound();


	});

};


_sw.bigDimesionsSetter = function(){
	bigReso = true;


	if( $('#side-widget-data-container').hasClass('side-widget-data-container-vertical') ){
		$('#side-widget-data-container').removeClass('side-widget-data-container-expanded-vertical');
		$('#side-widget-data-container').removeClass('side-widget-data-container-vertical');
		$('#side-widget-data-container').addClass('side-widget-data-container-expanded');
	}
	$('#side-widget-data-container').removeClass('side-widget-data-container-vertical');
	//set sidebar dims
	$('#side-widget').css({
		width : _sw.defaults.width,
		height : _sw.defaults.height,
		bottom : 'auto'
	});

	//set sidebar element dims
		//get number of elements
		var eles = data.length;
		var fit = ( ( eles*_sw.defaults.width ) <= $(window).height() ) ? $(window).height()/eles : ( $(window).height()/(Math.floor($(window).height()/_sw.defaults.width)) );
	$('#side-widget .side-widget-section').css({
		width : _sw.defaults.width,
		height : fit,
		float : 'none'
	});
	$('#side-widget .side-widget-section .side-widget-section-wrapper').css({
		
			position : "absolute",
			top : "50%",
			transform : "translateY(-50%) translateX(-50%)",
			left : "50%"

		
	});

	//set wrapper width
	$('#side-widget-section-wrapper').css({
		width : _sw.defaults.width,
		height : eles*fit
	});

	//set the data container 
	$('#side-widget-data-container').css({
		"margin-left" : _sw.defaults.width,
		bottom : 'auto',
		top : 0

	});

	//now initiate the scrollbar
	 $("#side-widget").mCustomScrollbar({
	 	scrollbarPosition : 'outside',
	 	documentTouchScroll : true,
	 	mouseWheel : { enable : true , deltaFactor : 1000 },
	 	scrollButtons:{ enable: true },
	 	theme : 'dark-thin',
	 	axis : "y",
	 	snapAmount : [ fit , fit ]
	 });



};


_sw.smallDimesionsSetter = function(){
	
	if( $('#side-widget-data-container').hasClass('side-widget-data-container-expanded') ){
		$('#side-widget-data-container').removeClass('side-widget-data-container-expanded');
		$('#side-widget-data-container').addClass('side-widget-data-container-expanded-vertical');
	}

	$('.data-container-active')

	bigReso  = false;
	//set sidebar dims
	$('#side-widget').css({
		width : '100%',
		height : _sw.defaults.smallHeight,
		bottom: 0
	});

	//set sidebar element dims
		//get number of elements
		var eles = data.length;
		var fit = ( ( eles*_sw.defaults.width ) <= $(window).width() ) ? $(window).width()/eles : ( $(window).width()/(Math.floor($(window).width()/_sw.defaults.width)) );
	$('#side-widget .side-widget-section').css({
		width : fit,
		height : _sw.defaults.smallHeight,
		float: 'left'
	});

	$('#side-widget-data-container').addClass('side-widget-data-container-vertical');

	//set wrapper width
	$('#side-widget-section-wrapper').css({
		width : eles*fit
	});

	//set the data container 
	$('#side-widget-data-container').css({
		"margin-left" : 0,
		top : 'auto'
	});



	//now initiate the scrollbar
	 $("#side-widget").mCustomScrollbar({
	 	scrollbarPosition : 'outside',
	 	//documentTouchScroll : true,
	 	axis:"x",
	 	mouseWheel : { enable : true , deltaFactor : 1000 },
	 	scrollButtons:{ enable: true },
	 	theme : 'dark-thin',
	 	snapAmount : [ fit , fit ]
	 });



};

_sw.fitNbound = function(){
$("#side-widget").mCustomScrollbar("destroy");
( $(window).width() <= _sw.defaults.breakpoint ) ? _sw.smallDimesionsSetter() : _sw.bigDimesionsSetter();
};

//begin 
_sw.init();


/*----------  Bind Events  ----------*/

$(document).on('click' , '.side-widget-section' , function(e){
	e.preventDefault();
	if( bigReso ){
		$(this).removeClass('data-container-active-vertical');
		$(this).addClass('data-container-active');
		$('#side-widget-data-container').addClass('side-widget-data-container-expanded');
			}else{
				    $(this).removeClass('data-container-active');
					$(this).addClass('data-container-active-vertical');
					$('#side-widget-data-container').addClass('side-widget-data-container-expanded-vertical');
			}
});

$(document).on('click' , '#side-widget-data-container-close' , function(e){
			$('.side-widget-section').removeClass('data-container-active data-container-active-vertical');
		if( bigReso ){
	$('#side-widget-data-container').removeClass('side-widget-data-container-expanded');
			}else{
				$('#side-widget-data-container').removeClass('side-widget-data-container-expanded-vertical');
			}
});


$(window).on('resize' , function(){
	_sw.fitNbound();
});



return _sw;
};

