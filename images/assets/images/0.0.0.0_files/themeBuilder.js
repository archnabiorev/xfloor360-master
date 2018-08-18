var themeBuilder = function(homeId){

_self = this;
_self.homeId = homeId;

_self.init = function(){

dbModel.getLotById(_self.homeId).then(function(snapshot){

	console.log(snapshot);
	var homes = snapshot.lots.val();
	var layers = snapshot.layerpacks.val();
	console.log('=-=-=-=-=-=-=-=-= RAW =-=-=-=-=-=-==-=');
	console.log(layers);

	var data = [];
	for( i in homes.modules ){
		var tmp = {
			label : homes.modules[i].label,
			id : homes.modules[i].id,
			modules : layers[ homes.modules[i].layerPackID ]
		};
		data.push( tmp );
	}
	console.log('=-=-=-=-=-=-=-=-= PROCESSED =-=-=-=-=-=-==-=');
	console.log(data);
	var themes = [];
	for ( key in homes.themes){
		var theme = homes.themes[key];
		var temp = {
			id      : key,
			content : JSON.stringify(theme.content),
			title   : theme.title
		};
		themes.push(temp);
	}
	
	$.get('/mustache/themebuilder.mst' , function(template){

		var render = Mustache.render( template , {data : data , themes : themes } );
		$('#theme-content-wrapper').html(render);

	});


}).catch(function(err){

	alert(err);
	console.log(err);

});


};

_self.loadTheme = function(themeid , title, content){
	
	//clear form
	$('#theme-adder')[0].reset();

	//set themeid
	$('#theme-adder').data("themeid" , themeid);

	//inject title 
	$('input[name="title"]').val(title);





	for( i in content ){
		var item = content[i];
		var img = item.value;

		$('input[type="radio"]').each(function(){
			console.log("COMPARING <--");
			console.log( img );
			console.log( $(this).attr('value').trim() );
			if( $(this).attr('value').trim() == img ){
				$(this).prop("checked" , true);
			}
		});

	}

};


/*----------  Event Handlers   ----------*/

$(document).on('submit' , '#theme-adder' , function(e){

e.preventDefault();

//disable the submit button 
$(this).find('input[type="submit"]').prop('disabled' , true);

var frmData = $(this).serializeArray();
var theme = { title : "" , content : [] };
for( i in frmData ){
	var item = frmData[i];
	if( item.name == "title" ){
			theme.title = item.value;
	}else{

		var tmp = {
		module : item.name,
		value : item.value
	};

	theme.content.push(tmp);

	}
}
var themeid = $('#theme-adder').data('themeid');
dbModel.addNewTheme(_self.homeId , theme , themeid).then(function(response){
	if( !themeid ){

	alert("New Theme Added Successfully");
	//reset the form 
	$('#theme-adder')[0].reset();
	$('#theme-adder').data('themeid' , undefined);
	$('#theme-adder').find('input[type="submit"]').prop('disabled' , false);
		}else{

		alert("Theme updated Successfully. This page will now refresh automatically. ");
		//reset the form 
		$('#theme-adder')[0].reset();
		$('#theme-adder').data('themeid' , undefined);
		$('#theme-adder').find('input[type="submit"]').prop('disabled' , false);
		window.location.reload();

		}
}).catch(function(err){
	alert("An error occured in saving the theme, please try again");
	console.log(err);
	$('#theme-adder').find('input[type="submit"]').prop('disabled' , false);
});

console.log("-=-=-=-=-=-=-=-=- DATA FINAL -=-=-=-==-");
console.log(theme);

});

$(document).on('click' , '.edit-created-theme' , function(e){
	e.preventDefault();
	var id = $(this).data('id');
	var content = $(this).data('content');
	var title = $(this).data('title');
	_self.loadTheme(id , title ,  content);
});


//begin
_self.init();

return _self;
};