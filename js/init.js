(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();


    $("#mc-embedded-subscribe-form").submit(function(e){
    	var $form = $(this);
    	e.preventDefault();
        $.ajax({
            type     : "POST",
            cache    : false,
            url      : $(this).attr('action'),
            data     : $(this).serialize(),
            success  : function(data) {
            	console.log(data);
                //$(".printArea").empty().append(data).css('visibility','visible');
            }
        });
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
