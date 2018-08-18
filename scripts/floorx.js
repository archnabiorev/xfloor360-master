window.MortageCalcInit = false;
var floorx = function(){


_self = this;
 FLOORXDATA[0].image = GLOBAL_IMAGE;
_self.fxData = FLOORXDATA;
//window.stages = [];
_self.stages  = [];		
window.GLOBAL_LAST_NTH = 0;
window.forcedEvent = false;

_self.loadAllElevations = function(){

	$.get('floorx-data/templates/elevation-left.mst' , function(template){
		console.log(_self.fxData);
		var render = Mustache.render(template , { elevations :  _self.fxData });

		$('#elevation-wrapper').html(render);

		$('.single-elevation').eq(0).trigger('click');

		//process 

		setTimeout(function(){
			$('#fs-loading').fadeOut();
		}, 2000);


	});

}

_self.loadFloorByIds = function(floorIDs , preventInteractive){

	var floors_struct = [];
	for( var _i = 0 ; _i < floorIDs.length ; _i++ ){
			var floor = FLOORSLIST[ floorIDs[_i] ];
			var t = {
			floor_name : (floor.alias) ? floor.alias : floor.label,
			img : floor["layers"]["bg"]["layers"]["image"],
			FLOORID : floorIDs[_i],
			id : floorIDs[_i],
			variations : floor.client_data
					}
		floors_struct.push(t);

		}
	

	

	// $.get('floorx-data/templates/floors-left.mst' , function(template){
	// 	var render = Mustache.render( template , { floors : floors_struct } );
	// 	$('#floorvars-wrapper').html(render);
	// 	if( !preventInteractive ){
	// 		_self.loadInteractive(floorIDs);	
	// 	}
	// 			});

	$.get('floorx-data/templates/floors-left.mst' , function(template){
		var template = Handlebars.compile(template);
		// var render = Mustache.render( template , { floors : floors_struct } );
		var render = template({ floors : floors_struct });
		console.log(floors_struct);
		$('#floorvars-wrapper').html(render);
		
		if( !preventInteractive ){
			_self.loadInteractive(floorIDs);	
		}

		//hide preventers
		$('.layer-controller').each(function(){
				if( $(this).attr('data-controller-layer') ){
					$('.layer-'+$(this).attr('data-controller-layer')).hide()
					$('.layer-'+$(this).attr('data-controller-layer')).find('.floor-element-switcher').addClass('is-data-controller-layer')
					$('.layer-'+$(this).attr('data-controller-layer')).find('.floor-element-switcher').attr('data-parent-group-switch' , $(this).attr('data-id') )
					// $('.layer-'+$(this).find('.floor-element-switcher').attr('data-controller-layer')).addClass('is-data-controller-layer')
					// $('.layer-'+$(this).find('.floor-element-switcher').attr('data-controller-layer')).attr('data-parent-group-switch' , $(this).attr('data-id') )
				}
		})

		//bind preventors to parent
		// $(document).on('change' , '.is-data-controller-layer' , function(){
		// 	var _parentClass = '.layer-'+$(this).attr('data-parent-group-switch')+'-controller'
		// 	alert( $(this).prop('checked') )
		// 	if( $(this).prop('checked') ){
		// 		$(_parentClass).prop('checked' , true).trigger('change')
		// 	}else{
		// 		$(_parentClass).prop('checked' , false).trigger('change')
		// 	}
		// })	

				});





}

_self.loadInteractive = function(floorIDs){
	window.stages = {};
	window.floorModules = {};
	window.floorModulesRects = {};

	
	//TODO : destroy if present
	$.get('floorx-data/templates/right-floors.mst' , function(template){
		
		//right elevation
		var render = Mustache.render(template , { floorList : floorIDs });
		$('#interactive-pre-wrapper').html(render);
		for( var i = 0 ; i < floorIDs.length ; i++ ){
			var stageid = 'stage-'+floorIDs[i];
			var base = FLOORSLIST[floorIDs[i]]["layers"]["bg"]["layers"]["image"];
			stage = new createjs.Stage(stageid);//Add new stage
			stages[stageid] = stage;
			_self.floorCanvasRenderer(stageid , stage , base);

			$("#"+stageid).panzoom();

			// Pass options
			$("#"+stageid).panzoom({
			  minScale: 1,
			  maxScale : 2,
			  $zoomRange: $("input[type='range']")
			});

			$("#"+stageid).panzoom("zoom" , 1.1);

			


			}

			$(window).trigger('resize');
			
			//bind event 
			$('.collapse-parent').on('hide.bs.collapse', function () {
			  var target = $(this).data('target');
			  $(target).removeClass('active').addClass('collapsed');
			});

			$('.collapse-parent').on('show.bs.collapse', function () {
			  var target = $(this).data('target');
			  $(target).removeClass('collapsed').addClass('active');
			});

			$('.floor-selectron').eq(0).trigger('click');





	});


};


_self.floorCanvasRenderer = function(stageID , stage,base){
	safeLoad(base , "test").then(function(response){
	var img =  response.queue.getResult(response.id);
	document.getElementById(stageID).width = img.width;
	document.getElementById(stageID).height = img.height;

	_self.base = new createjs.Bitmap( img );//Add new base

	//add base to scene
	stage.addChild(_self.base);
	_self.base.x = 0;
	_self.base.y = 0;
	stage.update();
	});








}

_self.rectDrawer = function( config )	{

				var stage = stages[config.stageid];
			//required keys of config, if any of this is missing, it should return error
			var required = ["id","label","drawX","drawY","dataSF","w","h","strokeColor","fillColor","strokeStyle"];


			for ( i in required){
				var _key = required[i];
				if( typeof config[_key] == "undefined" ){
					alert( "Error in drawing, value of \" "+_key+" \" is missing, please check log for more details" );
					console.log("Tried to render rect with following config : ");
					console.log(config);
					return false;
				}
			}

			
			//always make sure that the argument length is on less than total
			//the last argument tells if update has to be made or not

			if( typeof config.image == "undefined" ){
			var finalRect = new createjs.Shape();
			var strokeColor = finalRect.graphics.beginStroke( config.strokeColor ).command;
			var fillColor = finalRect.graphics.beginFill( config.fillColor).command;
			finalRect.graphics.setStrokeStyle(config.strokeStyle);
			finalRect.snapToPixel = true;
			finalRect.graphics.drawRect(0, 0, config.w, config.h);

			}else{
				config.image.crossOrigin = "Anonymous";
			 	
			 	 var box = new createjs.Shape();
				 box.graphics.beginLinearGradientFill(["#ff0000", "rgba(255, 0, 0, 1)"], [1, 0.9], 0, 0, config.w, config.h)
				 box.graphics.drawRect(0, 0, config.w, config.h);
				 box.cache(0, 0, config.w, config.h);

				var finalRect = new createjs.Bitmap(config.image);
				finalRect.filters = [
				     new createjs.AlphaMaskFilter(box.cacheCanvas)
				 ];
				 finalRect.cache(0, 0, config.w , config.h);




			}
			

			 



			 //finalRect.graphics.beginBitmapFill(img, "no-repeat");
			

			finalRect.regX = config.image.width/2;
			finalRect.regY = config.image.height/2;
			
			//Append data
			finalRect.data = {
				dataX : config.drawX,
				dataY : config.drawY,
				dataW : config.w,
				dataH : config.h,
				layerPackID : config.layerPackID,
				current : config.currentLayer,
				dataSF : config.dataSF,
				hasDragged : false,
				label : config.label,
			};
			finalRect.id = config.id;

			finalRect.x = config.drawX + ( config.image.width/2 );
			finalRect.y = config.drawY + ( config.image.height/2 );
			// finalRect.x = config.drawX;
			// finalRect.y = config.drawY;
			finalRect.dataSF = config.dataSF;


			
			
				
			

			finalRect.commands = { strokeColor : strokeColor  , fillColor : fillColor   };
			//finalRect.commands = { bitmap : finalRect   };
			

			//bind event listeners
			// finalRect.addEventListener('click' , onModuleClick);
			// finalRect.addEventListener('pressmove' , onModuleDragging);
			// finalRect.addEventListener('pressup' , onModuleDragStop);

			//add rectangle 
			var rect = new createjs.Shape();
			var strokeColor = rect.graphics.beginStroke( 'rgba(0,0,0,0.0)' ).command;
			var fillColor = rect.graphics.beginFill( 'rgba(96, 181, 0, 0.5)' ).command;
			rect.graphics.setStrokeStyle( 2 );
			rect.snapToPixel = true;
			rect.graphics.drawRect(0, 0, config.w, config.h);

			rect.regX = config.image.width/2;
			rect.regY = config.image.height/2;

			rect.x = config.drawX + ( config.image.width/2 );
			rect.y = config.drawY + ( config.image.height/2 );


			floorModulesRects[config.moduleID] = rect;
			stage.addChild(finalRect);
			stage.addChild(rect);
			stage.update();


			return finalRect;
}

_self.loadNthElevation = function(nth){
	$('#fs-loading').fadeOut(500);	
	$.get('floorx-data/templates/elevation-right.mst' , function(template){
		
		//right elevation
		//_self.fxData[nth].image = GLOBAL_IMAGE;
		var render = Mustache.render(template , _self.fxData[nth]);

		$('#right-wrapper').html(render);

	});

	$.get('floorx-data/templates/top-details.mst' , function(template){
		
		//left elevation

		var render = Mustache.render(template , _self.fxData[nth]);

		$('#bs-example-navbar-collapse-1').html(render);

	});

	//texts 
	$('#elevation-name').text(_self.fxData[nth].name);

	//inject floor 

	//_self.loadFloorByIds(_self.fxData[nth].planID);

};




_self.loadAllElevations();

/*----------  Events  ----------*/


// $(document).on('click' , '#floor-tab' , function(){
$(document).on('click' , '#imageGallery-tab' , function(){

	$('#right-wrapper').fadeOut();
	$('.top-img--custom').block({ css: {
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
 
        message : 'Processing'
         });
	setTimeout(function(){
		$('.top-img--custom').unblock();
		$('.elevation-home-img').hide();
		$('#interactive-pre-wrapper').fadeIn();
		$('.floor-plan-img').fadeIn();
	},1000);
	

	// $('#right-wrapper').block();
	// _self.loadFloorByIds(_self.fxData[GLOBAL_LAST_NTH].planID);
	// $(this).attr('aria-expanded',"true");

	//$('.custom-tabs').tab('show');

	//slider

$('.slider--instance').each(function(){

var range = $(this)[0];
var id = $(this).attr('data-target');
if( !range.noUiSlider ){

noUiSlider.create(range, {
	range: {
		'min': 1,
		'max': 2
	},
	step: 0.05,
	start:1.1,
	data_target : id,
	// Display colored bars between handles
	connect: true,

	// Put '0' at the bottom of the slider
   direction: 'rtl',
	orientation: 'vertical',



	// Move handle on tap, bars are draggable
	behaviour: 'tap-drag',
	tooltips: false,
	format: wNumb({
		decimals: 1
  })
});

range.noUiSlider.on('slide' , function(val){
	var id = this.options.data_target;
	console.log( parseFloat( val[0] ) );
	zoom__( parseFloat( val[0] ) , 'stage-'+id);
});

		}


});




});

$(document).on('click' , '#community-tab' , function(){

_self.loadNthElevation(GLOBAL_LAST_NTH);

	$('#right-wrapper').show();
	$('#interactive-pre-wrapper').hide();
	$('.elevation-home-img').show();
	$('.floor-plan-img').hide();
	// $('.elevation-home-img').hide();

});


$(document).on('click' , '#notes-tab' , function(){

	var note = window.localStorage.getItem("floor-note");

	$('#note-textarea').val(note);

});

var uploadImage = function(base64 , imgRef)
    {

        return new Promise(function(resolve , reject){

      var lotIdRef = storageRef.child( imgRef );
            var uploadTask = lotIdRef.putString(base64, 'data_url' ); 

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'

        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          $('#progress-percentage').html( Math.round(progress) +'%');
          switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
          }
        },
        function(error) {
          reject(error);
        }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        resolve(uploadTask.snapshot);
        }
        );



        });


    };


$(document).on('click' , '#finish-modulesz' , function(e){
	e.preventDefault();
	//window.location.href= "/#!/final";

	
	e.preventDefault();
	//swal("Finish" ,"Selection completed. We'll be in contact with you soon." , "success");

	//Create linkable 

	var linkData = {
		image : $('.front-image-wrapper').find('img').eq(0).attr('src'),
		modules : GLOBAL_FINAL.modules,
		homeXData : GLOBAL_FINAL_HOMEX,
		floorplans : { 'First Floor' : 'imageURL' },
		elevationName : $('#footer-home-name').text().trim()
	};
	/*==================================
	=            SAVE TO DB            =
	==================================*/
	
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
 
        message : 'Saving session <span id="progress-percentage"></span>'
         });

           var sessionid = uuid();
           var image = $('canvas')[0].toDataURL();
           var imageId = uuid();
          
          uploadImage(image , imageId+'.png' ).then(function(favImage){

          	linkData.floorplans['First Floor'] = favImage.downloadURL
            firebase.database().ref('/forbesxFloor/'+sessionid).set(linkData).then(function(snap){
            
            	//window.location.href = 'http://forbes.xfloor360.com/#!/?id='+sessionid;
            	$('body').unblock();
            	//store data in global var
				GLOBAL_FINAL.base.image = $('canvas')[0].toDataURL();
				GLOBAL_FINAL.modules = [
				];

				window.location.href = "/#!/final/"+sessionid;

          }).catch(function(err){
            //reject(err);
            alert(err);
            console.log(err);
            $('body').unblock();

          });


          }).catch(function(err){
          	alert(err);
            console.log(err);
            $('body').unblock();

          });

          

	
	
	/*=====  End of SAVE TO DB  ======*/
	



	
	//$('#fs-loading').hide();
	$('#side-widget').hide();


	//swal("Finish" ,"Selection completed. We'll be in contact with you soon." , "success");
});


$(document).on('click' , '#clear-button' , function(){

	var note = window.localStorage.setItem("floor-note" , "");

	$('#note-textarea').val("");

	swal('Cleared' , "Note has been cleared" , "success");

});




$(document).on('click' , '.single-elevation' , function(e){

	//clear  and set global

	window.GLOBAL_FINAL = {
      base : {
        image : '',
        title : '',
        beds : 0,
        baths : 0,
        sqft : 0,
        garage : 0,
        price : 0 
      },
      floorImages : [],
      
       modules : {
      
      // moduleID : {
      //   name : '',
      //   price : '',
      //   imgUrl : ''
      // }
      
       }

    };

e.preventDefault();
//get index 
var index = $(this).index();
GLOBAL_LAST_NTH = index;
_self.loadNthElevation(index);

//inject 
	var ele = $(this);
	GLOBAL_FINAL.base.image = ele.find('img').eq(0).attr('src');
	GLOBAL_FINAL.base.title = ele.data('name');
	GLOBAL_FINAL.base.beds = ele.data('bedrooms');
	GLOBAL_FINAL.base.baths = ele.data('bathrooms');
	GLOBAL_FINAL.base.sqft = ele.data('total');
	//GLOBAL_FINAL.base.garage = ele.data('name');
	GLOBAL_FINAL.base.price = ele.data('price');

	var planIDs = $(this).data('floors');

	planIDs = planIDs.split(',');
	for( var i in planIDs ){
		GLOBAL_FINAL.modules[ FLOORSLIST[planIDs[i]].alias ] = { extraInfo : { image : FLOORSLIST[planIDs[i]].layers["bg"]["layers"]["image"] } };
		GLOBAL_FINAL.floorImages.push( FLOORSLIST[planIDs[i]].layers["bg"]["layers"]["image"] );
	}



//./inject

_self.loadFloorByIds(_self.fxData[GLOBAL_LAST_NTH].planID , false);

//fixHeights();
if( MortageCalcInit ){

// var t = document.getElementById('pslider');
// t.noUiSlider.updateOptions({
//     range: {
//         'min': 0,
//         'max': parseInt( $(this).data('price').replace(',' , '') )
//     }
// });
}


window.MortageCalcInit = true;
//apply data to footer
$('#footer-beds').html( $(this).data('bedrooms') );
$('#UpdatedPrice').html( $(this).data('price') );
$('#footer-baths').html( $(this).data('bathrooms') );
$('#footer-area').html( $(this).data('total') );
$('#footer-home-name').html( $(this).data('name') );

$('#popup-base').html( $(this).data('price') );
$('#total-price-counter').html( $(this).data('price') );



//fixHeights();

});


_self.loadNthElevation(0);
$(window).trigger('resize');

$(document).on('click' , '.floor-selector' , function(){

var show = 'stage-'+ $(this).data('floorid');	
//hide all the floors
$('.floor-selector').each(function(){
	var i = $(this).data('floorid');	
	$('#stage-'+i+'-wrapper').hide();
});

var floorToRetain = 'ul'+$(this).attr('id')

$('.collapse-parent').each(function(){
	if( $(this).attr('id') != floorToRetain ){
		$(this).collapse('hide')
	}
})

$('#'+show+'-wrapper').show();

$(window).trigger('resize');


});

_self._formatter = wNumb({
                        decimals: 0,
                        thousand: ','
                    });
    



$(document).on('change' , '.floor-element-switcher' , function(e){

	
	
	var stage = $(this).data('stageid');
	var moduleID = $(this).data('combo'); 
	var coords = $(this).data('coords');
	var image = $(this).data('url');
	var price = $(this).data('price');
	// var name = $(this).data('name');
	var name = $(this).attr('data-module-name');
	
	var floor = $(this).data('floor');

	var floor_name = $(this).attr('data-floor-name');

	var ele = $(this);
	var category_label = $(this).attr('data-module-parent');
	
	if( typeof e.originalEvent != "undefined"){
		// modulePairingSystem( ele );	
	}


	if( typeof floorModules[moduleID] == "undefined" ){

		//show loader

	$('.top-img--custom').block({ css: {
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
 
        message : 'Processing'
         });

		//draw new 
		safeLoad(image , "test").then(function(response){
		var img =  response.queue.getResult(response.id);
		var new_rect = _self.rectDrawer({
		id 			: uuid(),
		stageid 	: stage,
		moduleID    : moduleID, 
		label 		: "Doesnt matter",
		drawX 		: coords[0],
		drawY 		: coords[1],
		dataSF		: '',
		w     		: img.width,
		h     		: img.height,
		image 		: img,
		strokeColor : "rgba(0, 255 , 0,0.5)",
		fillColor   : "rgba(0,0 , 255 ,0.5)",
		strokeStyle : 2,
		});
		floorModules[moduleID] = new_rect;

		if( moduleID == "layer_4ce007c6_36d5_3381_77dd_16a45424c3ba.png" ){
			floorModulesRects[moduleID].alpha = 0;
			stages[stage].update();
		}

		$('.top-img--custom').unblock();
		//add module 
			if( typeof  GLOBAL_FINAL.modules[floor_name] == "undefined"){
				GLOBAL_FINAL.modules[floor_name] = {};
			}

			if( typeof  GLOBAL_FINAL.modules[floor_name][category_label.trim()] == "undefined"){
				GLOBAL_FINAL.modules[floor_name][category_label.trim()] = {};
			}

			

			
			
			
			
			GLOBAL_FINAL.modules[floor_name][category_label.trim()][name.trim()] = {
							        name : name.trim(),
							        price : price,
							        imgUrl : image,
							        category : category_label
							      };
				});
		stages[stage].update();
		setTimeout(function(){
			GLOBAL_FINAL.modules[floor_name]['extraInfo']['image'] = $('#'+stage)[0].toDataURL();
		},100);


		//start filling
				var UpdatedPrice = $('#UpdatedPrice').text();
				UpdatedPrice =  parseFloat(UpdatedPrice.replace(',' , ''))  + parseFloat(price);
				var total = UpdatedPrice;
				$('#UpdatedPrice').text( _self._formatter.to(UpdatedPrice) );

				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );

				//dialog box
				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );
				var base = ( isNaN(parseFloat( $('#UpdatedPrice').data('base-price') ) ) ) ? 0 : parseFloat( $('#UpdatedPrice').data('base-price') );
				$('#popup-options-selected').html( _self._formatter.to( total - base ) );
				//update slider
			// 	var pslider = document.getElementById('pslider');

			// 	pslider.noUiSlider.updateOptions({
			// 	range: {
			// 	'min': 0,
			// 	'max': total
			// 	}
			// });

		// end filling
		
	}else{

		if( $(this).is(':checked') ){

			//start filling
				var UpdatedPrice = $('#UpdatedPrice').text();
				UpdatedPrice =  parseFloat(UpdatedPrice.replace(',' , ''))  + parseFloat(price);
				var total = UpdatedPrice;
				$('#UpdatedPrice').text( _self._formatter.to(UpdatedPrice) );

				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );

				//dialog box
				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );
				var base = ( isNaN(parseFloat( $('#UpdatedPrice').data('base-price') ) ) ) ? 0 : parseFloat( $('#UpdatedPrice').data('base-price') );
				$('#popup-options-selected').html( _self._formatter.to( total - base ) );
				//update slider
			// 	var pslider = document.getElementById('pslider');

			// 	pslider.noUiSlider.updateOptions({
			// 	range: {
			// 	'min': 0,
			// 	'max': total
			// 	}
			// });

		// end filling

			floorModules[moduleID].alpha=1;
			if( moduleID != "layer_4ce007c6_36d5_3381_77dd_16a45424c3ba.png" ){
		
			floorModulesRects[moduleID].alpha = 1;

		}
			stages[stage].update();
			
			setTimeout(function(){
			GLOBAL_FINAL.modules[floor_name]['extraInfo']['image'] = $('#'+stage)[0].toDataURL();
			},1000);

			//add module 
			if( typeof  GLOBAL_FINAL.modules[floor_name] == "undefined"){
				GLOBAL_FINAL.modules[floor_name] = {};
			}
			
			
			
			GLOBAL_FINAL.modules[floor_name][category_label.trim()][name.trim()] = {
							        name : name.trim(),
							        price : price,
							        imgUrl : image,
							        category : category_label
							      };
			


			//$('.main').unblock();
		}else{

			//start filling
				var UpdatedPrice = $('#UpdatedPrice').text();
				UpdatedPrice =  parseFloat(UpdatedPrice.replace(',' , ''))  + parseFloat(price);
				var total = UpdatedPrice;
				$('#UpdatedPrice').text( _self._formatter.to(UpdatedPrice) );

				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );

				//dialog box
				$('#total-price-counter').html( _self._formatter.to(UpdatedPrice) );
				var base = ( isNaN(parseFloat( $('#UpdatedPrice').data('base-price') ) ) ) ? 0 : parseFloat( $('#UpdatedPrice').data('base-price') );
				$('#popup-options-selected').html( _self._formatter.to( total - base ) );
				//update slider
			// 	var pslider = document.getElementById('pslider');

			// 	pslider.noUiSlider.updateOptions({
			// 	range: {
			// 	'min': 0,
			// 	'max': total
			// 	}
			// });

		// end filling
			
			floorModules[moduleID].alpha=0;
			floorModulesRects[moduleID].alpha = 0;
			stages[stage].update();

			//remove 

			delete GLOBAL_FINAL.modules[floor_name][category_label.trim()][name.trim()];
			stages[stage].update();
			setTimeout(function(){
			GLOBAL_FINAL.modules[floor_name]['extraInfo']['image'] = $('#'+stage)[0].toDataURL();
			},1000);

			// $('.main').unblock();
		}

	}
	
});

var increment = 0.1;
//----- OLD
// $(document).on('click' , '.plan-zoom-reset' , function(){
// var target = $('#stage-'+ $(this).data('target') );

// target.panzoom( 'zoom' , 1.1 , {animate : true});
// target.panzoom( 'pan' , 0, 0 , {animate : true} );
// $('.zoom-text-'+ $(this).data('target')).text( '10%' );
// $('.plan-zoomout , .plan-zoomin').data('val', 1.1);
// });

// $(document).on('click' , '.plan-zoomin' , function(){
// var target = $('#stage-'+ $(this).data('target') );
// var z = $(this).data('val');
// z = parseFloat(z);
// z =  (z > 1.9) ? 2 : z+increment;
// $('.plan-zoomout , .plan-zoomin').data('val', z);
// $('.zoom-text-'+ $(this).data('target')).text( parseInt ( ( (z-1)/1)*100 )+'%' );
// target.panzoom("zoom", z, { animate : true });
// });

// $(document).on('click' , '.plan-zoomout' , function(){
// var target = $('#stage-'+ $(this).data('target') );
// var z = $(this).data('val');
// z = parseFloat(z);
// z =  (z < 1.1) ? 1 : z - increment;
// $('.plan-zoomout , .plan-zoomin').data('val', z);
// $('.zoom-text-'+ $(this).data('target')).text( parseInt ( ( (z-1)/1)*100 )+'%' );
// target.panzoom("zoom", z, { animate : true });
// });



window.zoom__reset = function(id){

$('#slider-huge--'+id)[0].noUiSlider.set(1.1);

$('#stage-'+id).panzoom( 'zoom' , 1 , {animate : true});
$('#stage-'+id).panzoom( 'pan' , 0, 0 , {animate : true} );
};

window.zoom__ = function(z , id){
z =  (z > 1.9) ? 2 : z;
console.log( z );
$('#'+id).panzoom("zoom", z, { animate : true });
};

window.zoom__in = function(){
var target = $('#stage-'+ $(this).data('target') );
var z = $(this).data('val');
z = parseFloat(z);
z =  (z > 1.9) ? 2 : z+increment;
$('.plan-zoomout , .plan-zoomin').data('val', z);
$('.zoom-text-'+ $(this).data('target')).text( parseInt ( ( (z-1)/1)*100 )+'%' );
target.panzoom("zoom", z, { animate : true });
};

window.zoom__out = function(){
var target = $('#stage-'+ $(this).data('target') );
var z = $(this).data('val');
z = parseFloat(z);
z =  (z < 1.1) ? 1 : z - increment;
$('.plan-zoomout , .plan-zoomin').data('val', z);
$('.zoom-text-'+ $(this).data('target')).text( parseInt ( ( (z-1)/1)*100 )+'%' );
target.panzoom("zoom", z, { animate : true });
};




$(document).on('submit' , '#notes-form' , function(e){
e.preventDefault();

window.localStorage.setItem("floor-note" , $('#note-textarea').val() );

swal('Saved' , "Note has been saved" , "success");
});





function fixRightView(){
	$('#interactive-wrapper canvas').css({
		height : $(window).outerHeight() - 252 + 50
	});
}
$(window).on('resize' , function(){
	fixRightView();
});
fixRightView();
return _self;
};



$(document).on('click' , '#next-btn' , function(e){
	e.preventDefault();
	
	
	 var linkData = {
		image : $('.front-image-wrapper').find('img').eq(0).attr('src'),
		modules : GLOBAL_FINAL.modules,
		homeXData : GLOBAL_FINAL_HOMEX,
		floorplans : { 'First Floor' : 'imageURL' },
		elevationName : $('#footer-home-name').text().trim()
	};
	var sessionid =  getAllUrlParams(window.location.href)["id"];
	firebase.database().ref('/sessions/'+sessionid).once('value').then(function(snapshot){
		var sessiondata = snapshot.val()

		sessiondata["xFloor360"] = linkData;

		firebase.database().ref('/sessions/'+sessionid).set(sessiondata).then(function(){
			window.location.href = 'http://dev.xdesign360.com/#!/app/KITCHEN_TEMPLATE_c70ddda0_dd47_646b_d5ec_2b3f2f363bd9?id='+sessionid+'&token='+____token;
		}).catch(function(err){
			alert(err);
		});

	}).catch(function(err){
		console.log(err);
	});


	
	
});


/*=====================================
=            LOGIC BINDERS            =
=====================================*/

/*----------  Parent Layer Controller  ----------*/
$(document).on('change' , '.layer-controller' , function(e){
e.preventDefault();
	var id = $(this).attr('data-id');
	var linkedlayer = $(this).attr('data-controller-layer');
	// var conflicting = ( $(this).attr('data-conflicts') ) ? $(this).attr('data-conflicts') : false;
	if( $(this).prop('checked') ){

		//hide the restrictor
		$('.group-'+id+'-child-preventor').hide()

		//trigger the linked layer 
		$('.layer-'+linkedlayer+'-checkbox').prop('checked' , true).trigger('change')

		/*================================
		=            CONFLICT            =
		================================*/

		//turn off the conflicting layers 

	var conflicting = ( $(this).attr('data-conflicts') ) ? ( ( typeof $(this).attr('data-conflicts') == "string" ) ? JSON.parse( $(this).attr('data-conflicts') ) : $(this).attr('data-conflicts') )  : [];
	for( var idx in conflicting ){
		if( $('.layer-'+conflicting[idx]+'-checkbox').prop('checked') ){
			$('.layer-'+conflicting[idx]+'-checkbox').prop('checked' , false).trigger('change')

			}
	}
		
		/*=====  End of CONFLICT  ======*/
		


	}else{
			
			//if controller
			
		
		//show the restrictor
		$('.group-'+id+'-child-preventor').show()

		//trigger the linked layer 
		if( $('.layer-'+linkedlayer+'-checkbox').prop('checked') ){
		$('.layer-'+linkedlayer+'-checkbox').prop('checked' , false).trigger('change')
			}
			
			//shut children
			$('.wrapper-for-'+id+'-parent').find('.is-option-child').each(function(){
				if( $(this).find('input[type="checkbox"]').prop('checked') ){
					$(this).find('input[type="checkbox"]').prop('checked' , false).trigger('change');
				}
			});
			
	}

});

/*----------  Subsection comment block  ----------*/

$(document).on('change' , '.floor-element-switcher' , function(e){
	var id = $(this).attr('data-id');

	if( $(this).prop('checked') ){
		$('.dependent-'+id+'-preventor').hide()

		var conflicting = ( $(this).attr('data-conflicts') ) ? ( ( typeof $(this).attr('data-conflicts') == "string" ) ? JSON.parse( $(this).attr('data-conflicts') ) : $(this).attr('data-conflicts') )  : [];

			for( var idx in conflicting ){
		if( $('.layer-'+conflicting[idx]+'-checkbox').prop('checked') ){
			$('.layer-'+conflicting[idx]+'-checkbox').prop('checked' , false).trigger('change')

			}
		}

	}else{
		if( $('.dependent-'+id+'-element').prop('checked') ){
		$('.dependent-'+id+'-element').prop('checked' , false).trigger('change');
			}
		$('.dependent-'+id+'-preventor').show();
	}


	

});





/*=====  End of LOGIC BINDERS  ======*/
