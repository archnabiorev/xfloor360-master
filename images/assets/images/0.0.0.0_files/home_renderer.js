var home_app = function(base , layers , SCOPE){

var _self = this; 

var stage = '';
var modules = {};

_self.init = function(baseImg){
		var iID = uuid();
		safeLoad(baseImg , iID).then(function(response){
			var img =  response.queue.getResult(response.id);
			window.gohan= img;
			document.getElementById('lotCanvas').width = img.width;
			document.getElementById('lotCanvas').height = img.height;

			stage = new createjs.Stage('lotCanvas');//Add new stage

			_self.base = new createjs.Bitmap( img );//Add new base


			
			//add base to scene
			stage.addChild(_self.base);
			_self.base.x = 0;
			_self.base.y = 0;
			stage.update();

			//cache basic layers
			_self.cacheBasicLayers(base).then(function(cached){

			$('#lotBuilderForm').remove();
			$('#overlay').remove();

			$(window).trigger('resize');
			//swal.close();
			_self.renderOverlays(base ,layers , cached);

			}).catch(function(err){
				alert(err);
				console.log(err);
			});
		}).catch(function(error){
			alert(error);
			console.log(error);
		});

};

_self.cacheBasicLayers = function(base){

return new Promise(function(resolve , reject){

var count = 0;
var final = base.modules.length;
var cached = {};

for( i in base.modules ){
	var mod = base.modules[i];

	safeLoad(mod.layerImgUrl , mod.id).then(function(cache){
		count = count+1;
		cached[cache.id] = cache;
		if( count == final){
			resolve(cached);
		}
	}).catch(function(err){
		reject(err);
	});

}


	});

};


_self.renderOverlays = function(base ,layers , cached){

//Loop through each layer
console.log(cached);
	for( i in base.modules ){

		var dat = base.modules[i];
		

		var new_rect = _self.rectDrawer({
		id 			: dat.id,
		label 		: dat.label,
		drawX 		: dat.drawX,
		drawY 		: dat.drawY,
		dataSF		: dat.dataSF,
		w     		: cached[dat.id].queue.getResult(dat.id).width,
		h     		: cached[dat.id].queue.getResult(dat.id).height,
		image 		: cached[dat.id].queue.getResult(dat.id),
		strokeColor : "rgba(0, 255 , 0,0.5)",
		fillColor   : "rgba(0,0 , 255 ,0.5)",
		strokeStyle : 2,
		});
		modules[dat.id] = new_rect;
	}


	_self.renderToolbar(base ,layers);

};

//Draw rectangle module
_self.rectDrawer = function( config )	{

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
			 	// var finalRect = new createjs.Bitmap(config.image.src);
			 	var finalRect = new createjs.Bitmap(config.image);
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

			stage.addChild(finalRect);
			stage.update();


			return finalRect;
}


_self.responsiveFix = function(){

					var WidX=$("#lotContainer canvas#lotCanvas").attr('width');
	                var HigX=$("#lotContainer canvas#lotCanvas").attr('height');
	                var ratio = WidX/HigX;
	               var AspRatio = $(window).width()/$(window).height();
                  //console.log(ratio);
                    // if(ratio>1.55){
                    //     $('head').append('<style type="text/css">@media (min-width: 1200px) {#lotCanvas {width: 100%; height: auto;}}</style>');
                    //     console.log("Custom Css Injected",ratio);
                    // }
					if(AspRatio > ratio){
                        $('#responsive-fix').html('#lotCanvas {width: auto !important; height: 100vh  !important;}');
                        console.log("ASP Hight Css Injected",AspRatio,ratio);
                    }else{
                    	$('#responsive-fix').append('#lotCanvas {width: 100% !important; height: auto  !important;}');
                        console.log("ASP width Css Injected",AspRatio,ratio);
                    }
                    console.log('log',AspRatio)
                    if($(window).width()>992){
	                    if(AspRatio>2.1){
	                    	$('#patch').html('.single-variation .variation-icon img { width: 30px !important;  height: 30px  !important;}');
	                        console.log("Injected",AspRatio);
	                    }else{
	                    	$('#patch').html('');
	                    }
                	}
}; 

_self.renderToolbar = function( base , layers ){
	for ( i in base.modules ){
		base.modules[i]["layerData"] = layers[ base.modules[i]["layerPackID"] ];
	}


	_self.responsiveFix();
	$(window).on('resize' , _self.responsiveFix );
	
	//send this data for rendering 
	console.log(base.modules);

	//---hack
	var icons = [
	{
		id:"TEMPLATE_d79356f8_5bbf_6783_a558_4207bf647669",
		icons:["door.png","hardyboard.jpg","siding.png","trim.png"]
	},

	{
		id:"TEMPLATE_57b3d717_8e8a_e4f0_e9d0_dcf227821ceb",
		icons:["door.png","siding.png","trim.png","wall.png","window.png"]
	},

	{
		id:"TEMPLATE_49b90b70_c8ce_6d81_5adc_c4770eb46de7",
		icons:["door.png","hardyboard.jpg","siding.png","trim.png"]
	},

	{
		id:"TEMPLATE_81f34361_3ec7_e10e_f13c_9df0ccbdcd35",
		icons:["door.png","facias.png","hardyboard.jpg","trim.png","wall.png"]
	},

	{
		id:"TEMPLATE_341959f8_7b02_b738_4efa_19647156493a",
		icons:["door.png","siding.png","trim.png","wall.png","window.png"]
	}



	];

	for(var i in base.modules){
			base.modules[i]["icon"] = icons[4]["icons"][i];
	}

	base.modules.push({
		currentLayer :"Red1",
		dataSF: 100,
		drawX : 422,
		drawY : 465,
		icon : "theme.png",
		id : "module_theme",
		label : "Color Scheme",
		layerData : [],
		layerImgUrl : "./images/variation-icons/theme.png",
		layerPackID : "variation-module_theme"
	
	});
	window.variationx = base.modules;
	//---- ./hack
		
	SCOPE.variations = base.modules;
	SCOPE.themes = base.themes_sanitized;



	SCOPE.getVariations = function(id){
		return layers[id];
	};

	var SW = new sideWidget('#sidebar-widget' , data , {
		selectedColor : "#7ac32b",
		generalColor : "#0d5f70"
	});
	
	SCOPE.$apply();
	//heightfix();
	IconPatch();




	// var render = $.get('toolbar.mst' , function(template){
	// 	var data = Mustache.render( template , {data : base.modules } );
	// 	$('#builder_controls').html( data );
	// });

};

_self.init(base.base);

_self.loadVariation = function(moduleName , variationSRC , moduleID ){


	return new Promise(function(resolve, reject){


		if( typeof MEGAQUEUE[ moduleName ] == "undefined" ){


		safeLoad(variationSRC , moduleName).then(function(response){
		console.log("NEW");
		//fetch the image
		var img = response.queue.getResult(response.id);
		//change this image
		modules[moduleID].image.src = img.src;
		resolve("done");
		
		}).catch(function(err){
		alert(err);
		console.log(err);
		});

		}else{
		console.log('ALREADY');
		//fetch the image
		var img = MEGAQUEUE[moduleName].getResult(moduleName);
		//change this image
		modules[moduleID].image.src = img.src;
		resolve("done");


		}

	});

};

//Event binder

//$(document).on('click' , '.variation-switcher,li.single-sub-variation' , function(e){
$(document).on('click' , 'li.single-sub-variation' , function(e){
e.preventDefault();
var moduleID = $(this).find(".variation-switcher").data('id');
var moduleName = $(this).find(".variation-switcher").data('module');
var variationSRC = $(this).find(".variation-switcher").data('variation');
//Show loading 
//console.log(variationSRC,moduleName);
if( typeof MEGAQUEUE[ moduleName ] == "undefined" ){


	safeLoad(variationSRC , moduleName).then(function(response){
	//console.log("NEW");


	//fetch the image
	var img = response.queue.getResult(response.id);
	//change this image
	modules[moduleID].image.src = img.src;
	stage.update();

	}).catch(function(err){
	alert(err);
	console.log(err);
	});
	
}else{
	//console.log('ALREADY');
	//fetch the image
	var img = MEGAQUEUE[moduleName].getResult(moduleName);
	//change this image
	modules[moduleID].image.src = img.src;
	stage.update();



}

//***add class for showing curruntly selected 
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

});


/*----------  Theme Switcher  ----------*/

$(document).on('click' , '.single-sub-variation-theme' , function(e){
	
	e.preventDefault();
	var content = $(this).find('.theme-swtich-trigger').data('content');
	var i;
	var buncher = [];
	for( i in content ){
		var theme = content[i];
		var contentSlimmed = theme.value.split('[*]');

		var id = theme.module;
		var module = contentSlimmed[1];
		var variationSRC = contentSlimmed[0];

		buncher.push( _self.loadVariation(module , variationSRC , id) );
	}

	Promise.all(buncher).then(function(response){
		swal({
			type: 'success',
 			title: 'Theme Loaded',
 			showConfirmButton: false,
 			timer: 2500
 		});
		stage.update();
	}).catch(function(err){
		swal({type: 'success', title:err});
		console.log(err);
	});




//***add class for showing curruntly selected 
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

});

};

