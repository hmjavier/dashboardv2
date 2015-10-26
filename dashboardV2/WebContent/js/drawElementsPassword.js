/**
 * Sends change password request
 */
var drawElementsPassword = {
		
	changePassword: function(currentPassword, newPassword) {
		
		cnocConnector.invokeMashup(
	    		cnocConnector.service1, // Service ID
	    		{ // Parameters
	    			"oldPassword" : currentPassword,
	    			"newPassword" : newPassword
	    		},
	    		function (response) { // Callback	    			
	    			if (response.indexOf( 'Result: Success (0)' ) > -1) {
	    				cnocConnector.invokeMashup(
	    			    		cnocConnector.service2, // Service ID
	    			    		{},
	    			    		function (response) { // Callback
	    			    			console.log(response);
	    			    			setTimeout(
	    			    					function() {
	    			    						$.ajax({
	    			    					        type: 'GET',
	    			    					        dataType: 'jsonp',
	    			    					        url: cnocConnector.logout,
	    			    					        error: function (jqXHR, textStatus, errorThrown) {
	    			    					            console.log(jqXHR);
	    			    					            window.location = "index.html";
	    			    					        },
	    			    					        success: function(response) {
	    			    					        	window.location = "index.html";
	    			    					        }
	    			    						});
	    			    					},
	    			    					3000);
	    			    		},
	    			    		"formPass", // Container
	    			    		""	// Div
	    		    	);
	    				
	    				$("#validity_label").html('<div class="alert alert-success">' + response + '. Logging out...' + '</div>');
	    			
	    			} else
	    			$("#validity_label").html('<div class="alert alert-danger">' + response + '. Please try again.' + '</div>');
	    		},
	    		"formPass", // Container
	    		""	// Div
    	);
	}
};