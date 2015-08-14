/**
 * Title: Endpoints Loader
 * Autor: Oscar Escamilla
 * Version: 1.0
 */
var endpoint = {
	getproperties : function() {		
		$.ajax({
		    async: false,
		    url: "properties/endpoint.json",
		    success: function( data ) {		    	
		    	endpoint.main = data.main;
				endpoint.getNmisStatus = endpoint.main + data.getNmisStatus;
				endpoint.getNmisGroups = endpoint.main + data.getNmisGroups;
				endpoint.getOpFlowTopN = endpoint.main + data.getOpFlowTopN;
			}
		});
	}
};