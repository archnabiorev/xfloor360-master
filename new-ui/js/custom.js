(function($) {
  "use strict";

$(document).ready(function(){

    var newImagePath = $('.nav-tabs a.authentication-modal-form.active').find("img").data("activeimage");
    $('.nav-tabs a.authentication-modal-form.active').find("img").attr("src",newImagePath);

    $('.nav-tabs a.authentication-modal-form').on('shown.bs.tab', function(event){
           $(".nav-tabs li.nav-item .authentication-modal-form").each(function(){
              if( !$(this).hasClass("active") ){
                  var currentImagePath = $(this).find('img').data("nonactive");
                  $(this).find('img').attr("src",currentImagePath);
              }else{
                var newImagePath = $(this).find("img").data("activeimage");
                $(this).find("img").attr("src",newImagePath);
              }
            });
      });


    /*** Begin favorite-home-pop-up ***/
      $(".favorite-home-pop-up").click(function(){
            swal({
              title: "Add Favorite",
              text: "Please label this favorite",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              inputPlaceholder: "Write something",
              imageUrl: 'images/info-icon.png'
            }, function (inputValue) {
              if (inputValue === false) return false;
              if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
              }
              swal("Success!", "Added to favorites" + inputValue, "success");
            });
      });


      /*** Begin xfloor page Save Button ***/
      $(".save-btn").click(function(){
        swal("Saved", "Note has been saved", "success")
      });

        

});

})(jQuery);