function getEmails (reportType) {
	
//	console.log(reportType);

$.ajax({
		url: "js/jsEscalaciones/email.json",
		type: 'GET',
		dataType: 'json',
		chache: false,
		success: function(data) {		
			
			if (data == '' || data == null) {
				$( "#dialog_text" ).text("No information Retrived");
				$( "#dialog" ).dialog( "open" );
			
			} else {
//				console.log(data);
				$.each(data.reports, function(key, value) {
//					console.log(key + ", " + value);
					$.each(value, function(k, v) {
//						console.log(k + ", " + v);
						if (v.id == reportType) {
//							console.log("found it...");
				            // found it...
							$( '#to_ES' ).val(v.to);
							$( '#cc_ES' ).val(v.cc);
				            return false; // stops the loop
				        }
					});
				});
			}
		},
		error: function(data,status,er) {
			$( "#error_dialog_text" ).text("Error loading email file");
			$( "#error_dialog" ).dialog( "open" );
	    }
	});
}