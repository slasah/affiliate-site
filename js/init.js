(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();


    $("#mc-embedded-subscribe-form").submit(function(e){
    	 e.preventDefault();
    	 submitSubscribeForm($("#mc-embedded-subscribe-form"));

    });


    function submitSubscribeForm($form) {
    $.ajax({
        type: "GET",
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",

        error: function(error){
            // According to jquery docs, this is never called for cross-domain JSONP requests
        },

        success: function(data){
        	var resultHeader   = "Oh no something went wrong";
            var resultMessage  = data.msg || "Sorry. Unable to subscribe. Please try again later.";
            var messageContent = $("#mceResponse");
            //var messageContentText = "Sign up to our mailing list and have all the offers emailed to you directly.";
            var messageHeader  = $("#mailListHeader");
            var field 		   = "";
            var firstCharacter = resultMessage.substring(0,1);

            //messageContent.html(messageContentText);

            $( "label" ).removeClass('error');

            if (data.result != "success") {

                if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                	resultHeader  = "Don't stress!";
                    resultMessage = "You're already on the list";
                } else {

                	switch(firstCharacter) {
                		
                		case "0":
                			field = "mce-EMAIL";
                		break;

                		case "1":
                			field = "mce-FNAME";
                		break;

                		case "2":
                			field = "mce-LNAME";
                		break;

                	}

					if (field != "") {
						$("label[for=" + field + "]").attr('data-error', 'wrong');
						$("label[for=" + field + "]").addClass('error');
					}
					resultMessage = resultMessage.substring(4);
					messageContent.html(resultMessage);
					}
            } else {
            	resultHeader  = "Almost there!";
                resultMessage = "Thanks, you must now confirm the subscription by following the instructions in the email we just sent you.";
            }
         

            $(".formRow").fadeOut( "slow", function() {
	            console.log(resultMessage);
	            $("#closeMailList").show();
	            messageContent.html(resultMessage);
	            messageHeader.html(resultHeader);
        	});

        }
    });
}


  }); // end of document ready
})(jQuery); // end of jQuery name space
