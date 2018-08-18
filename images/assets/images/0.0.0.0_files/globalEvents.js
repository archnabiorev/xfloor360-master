$(function(){
/*	$(document).ready(function(){
		
	});
*/


var duration = 500; //in `ms`
var minHeight = '40%';
var minWidth = '40%';
var  xWid = $(window).width();

window.heightfix = function(){
	var xWid = $(window).width();
	var tgh = $("#trigger-area").height() + ($(window).height()-$("footer#footer-wrapper").offset().top) ;
	var ntgh  = $(window).height() - tgh;
	 //var  xWid = $(window).width();
	 if(xWid>991){
		$('#variation-holder').height( ntgh+'px' );
		$('#variation-overlay').height( ntgh +'px' );
	}else{
		$('#variation-holder').height('85px');
		$('#variation-overlay').height('0px');
	}
	console.log(ntgh,tgh);

}


function jsfix(){

	 	if(xWid>991){
				$('#variation-overlay').delay(500).animate({width : minWidth,'min-width' : '450px','margin-left':'0px', 'padding-left': '160px'} , duration);
			}else{
				$('#variation-overlay').delay(500).animate({height : minHeight,'margin-bottom':'0px','padding-top':'30px'} , duration);
			}
}
//setTimeout( heightfix, 3000 );
$( window ).on('resize',heightfix);

	

//variation switcher
$.get('mustache/variations.mst' , function(template){
	Mustache.parse(template);
	window.variationTemplate = template;
});

var variationSwitcher = function(data , id , label , isThemeSelector){
	return Mustache.render( variationTemplate , {  variation : data , isThemeSelector : isThemeSelector, label : label, id : id} );

};

$(document).on('click' , '.single-variation' , function(){
			if(xWid>991){
				$('#variation-overlay').animate({width : '0%', 'min-width' : '0px','max-width' : '450px','margin-left':'-10px'} , 300);
			}else{
				$('#variation-overlay').animate({height : '0%','margin-bottom':'-30px','padding-top':'30px'} , 300);
			}
			$(".single-variation.active").removeClass('active');



	jsfix();
	//show section related to this
	var target = $(this).data('target');
	var id = $(this).data('id');

	if( $(this).data('id') == "module_theme" ){
			var data = $(target).data('theme-variations');
	}else{
			var data = $(target).data('variations');
	}

	var variation_label = $(this).find('.variation-text span').text();
	
	if( $(this).data('id') == "module_theme" ){
		$('#variation-overlay').html( variationSwitcher(data , id , variation_label , true) );
	}else{
	$('#variation-overlay').html( variationSwitcher(data , id , variation_label) );
		}


		$(this).siblings().removeClass('active');
		$(this).addClass('active');

});

$(document).on( 'click' , '.close-menu' ,function(){
			//$('#variation-overlay').removeClass('variation-overlay-fullscreen');
			
			if(xWid>991){
			$('#variation-overlay').animate({width : '0%', 'min-width' : '0%','margin-left':'-10px'} , 150);
			}else{
					$('#variation-overlay').animate({height : '0%','margin-bottom':'-30px','padding-top':'30px'} , 150);
			}
			$(".single-variation.active").removeClass('active');
});

$(document).on('keydown' , function(e){

	if( e.keyCode == 27  ){
		//$('#variation-overlay').removeClass('variation-overlay-fullscreen');
		if(xWid>991){
			$('#variation-overlay').animate({width : '0%', 'min-width' : '0%','margin-left':'-10px'} , 150);
		}else{
			$('#variation-overlay').animate({height : '0%','margin-bottom':'-30px','padding-top':'30px'} , 150);	
		}
		$(".single-variation.active").removeClass('active');
	}

});

//temporary code

$(document).on('change' , '.pat-chooser' , function(){
	var target = $('#target-pat-scope').text();
	$(target).css({
		background : "url('images/pats/"+$(this).val()+"')"
	});
});



var imageResizer = function(height){
	$('#image-holder img').css({
		height : height+'px'
	});
}

$(window).on('resize' , function(e){
	imageResizer( ( $(window).height()-60 ) );
});
setTimeout(function(){
	imageResizer( ( $(window).height()-60 ) );
}  , 3000);

});


var fullscreenLoading = function(){

	_self = this;
	_self.start = function(){
	//remove loading if already there 
	$('#fs-loading').show();
		};

	_self.stop = function(){
		$('#fs-loading').hide();
	};

return _self;
};



var partialLoading = function(){

	_self = this;
	_self.start = function(){
		$('.partialLoading').css({
			height : '25px'
		});
		};

	_self.stop = function(){
		$('.partialLoading').css({
			height : '0px'
		});
	};

	return _self;

};



window.IconPatch = function(){
	console.log("called");
	xWid = $(window).width();
	if(xWid>991){
		 var count = $('#single-variation-holder li').length;
		 var heightLi = ( $('#variation-holder').height()/count ).toFixed(1);
		//var des = (count==6) ? 14 : 18;
		var desChild = (count==6) ? 10 : 40;
		$('#single-variation-holder .single-variation').css('height',heightLi+'px');
		// $('#single-variation-holder .single-variation .variation-tab').css('transform','translateY('+desChild+'%)');
		//console.log(des,desChild);
	}else{
		$('#single-variation-holder .single-variation').css('height','auto');
	}
	
};

//IconPatch();
// $(document).on('ready',IconPatch);
$(window).on('resize', function(){
	IconPatch();
});

// var DeviceDetect = function(){

// 	        if(OSname == 'Linux x86_64' || OSname =='iOS'){
	        
// 	        	$('#variation-holder').height('85px');
// 				$('#variation-overlay').height('0px');		
	         
// 	          $('#single-variation-holder .single-variation').css('height','auto');
// 	          var stylesheet = '<style>@import url(styles/iOS.css);</style>';
// 	        }else{
// 	          stylesheet = '';
// 	        }
	             
// 	        $('body').append(stylesheet);

//  }();

