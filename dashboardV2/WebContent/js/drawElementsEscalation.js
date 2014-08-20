/**
 * hmjavier Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsEscalation = {
		
	init : function(codeNet) {
		
		console.log(codeNet);
		
		$(".btn-group > .btn").click(function(){
		    $(this).addClass("active").siblings().removeClass("active");
		});		

	}, getCSC: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			buildCSC(data, container);
	}, getGFC: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			buildGFC(data, container);
	}, get_CNOC_NOTI: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			build_CNOC_NOTI(data, container);
	}, get_ESCALACION_CASE: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			build_ESCALACION_CASE(data, container);
	}, get_SMS_INT: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			build_SMS_INT(data, container);
	}, get_SMS_CLIE: function(data, container) {				
		
		if (data.records == '' || data == null)
			bootbox.alert("Can't retrieve information");
		else
			build_SMS_CLIE(data, container);
	}
};