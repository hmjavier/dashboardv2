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
				endpoint.getDegradedNodes = endpoint.main + data.getDegradedNodes;
				endpoint.getBackups = endpoint.main + data.getBackups;
				endpoint.getIpsla = endpoint.main + data.getIpsla;
				endpoint.getBackupsDown = endpoint.main + data.getBackupsDown;				
			}
		});
	}
};