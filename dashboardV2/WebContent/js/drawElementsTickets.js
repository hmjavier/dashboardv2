/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */
var drawElementsTickets = {

	init : function(codeNet) {	

		if (codeNet != undefined) {

			this.builder(codeNet);
		} else {

			/*Genera Menu*/
			generateMenu();
						
			cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsTickets.selectCustom, "SelectCustomer", "opt");

			this.builder(codeNet);

		}

	},
	builder : function(codeNet) {
	
		cnocConnector.invokeMashup(cnocConnector.service1, {"code_net":codeNet},drawElementsTickets.drawBizserviceList, "listBizserviceT", "listBizserviceTi");
	
	},selectCustom : function(datos, selector, opt) {

		var selText = cnocConnector.drawSelect(datos, selector, "tickets");

	},drawBizserviceList: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].network_code.toString());
					fields.push(datos.records.record[i].company.toString());							
					fields.push(datos.records.record[i].sector.toString());
					fields.push(datos.records.record[i].logical_name.toString());
					fields.push(datos.records.record[i].unique_identifier.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].location_code.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.network_code.toString());
				fields.push(datos.records.record.company.toString());							
				fields.push(datos.records.record.sector.toString());
				fields.push(datos.records.record.logical_name.toString());
				fields.push(datos.records.record.unique_identifier.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.location_code.toString());					
				rowsData.push(fields);
			}
		} catch (err) {	
			console.log(err);
		};
		var rowsHeaders = [ {
			"sTitle" : "Code Net"
		}, {
			"sTitle" : "Company"
		}, {
			"sTitle" : "Sector"
		}, {
			"sTitle" : "Logical Name"
		}, {
			"sTitle" : "Unique Identifier"
		}, {
			"sTitle" : "Location"
		}, {
			"sTitle" : "Location Code"
		}];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
	}
};