$(document).on('click' , '.sb-toggler' , function(e){
e.preventDefault();
if( $(this).hasClass('sidebar-expanded') ){

	$('#sidebar').removeClass('sidebar-expand');
	$(this).removeClass('sidebar-expanded');


}else{

	$('#sidebar').addClass('sidebar-expand');
	$(this).addClass('sidebar-expanded');

}

});