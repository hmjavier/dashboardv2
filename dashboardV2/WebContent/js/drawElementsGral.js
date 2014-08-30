/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsGral = {
		dataChartMemory : [],
		
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsGral.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){				
				
			cnocConnector.invokeMashup(cnocConnector.service13, {"codenet" : codenet},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			
			cnocConnector.invokeMashup(cnocConnector.service12, {"codenet" : codenet},drawElementsGral.chartGroups, "chartGrupos", "chartGruposG");
			
			
			if(codenet.indexOf('L')>=0 ){
				this.mapaMundial(codenet);
			}else{
				this.mapaGeneral(codenet);
			}
			
			
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : ""},drawElementsGral.countStatus, "countAll", "countAllG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "reachable"},drawElementsGral.countStatus, "countReachable", "countReachableG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "degraded"},drawElementsGral.countStatus, "countDegraded", "countDegradedG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "unreachable"},drawElementsGral.countStatus, "countUnreachable", "countUnreachableG");
			cnocConnector.invokeMashup(cnocConnector.service5, {"code_net" : codenet},drawElementsGral.countTotal, "cOpen", "cOpenG");
			cnocConnector.invokeMashup(cnocConnector.service15, {"code_net" : codenet},drawElementsGral.countTotal, "cIncident", "cIncidentG");			
			
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");
			drawElementsGral.builder($("#SelectCustomer").val());			

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);

			
		},mapaGeneral:function(codenet){
			$( "#mapGral").mask("Waiting...");
			var states = [];

			$.ajax({
				type : 'GET',
				dataType : 'json',
				url: cnocConnector.service20,
				data: {network_code:codenet},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					$( "#mapGral").unmask();
					drawElementsGral.mapaGeneral(cnocConnector.codeNetGlobal);
				},
				success : function(response) {
					
					$.each( response, function( key, val ) {
						var array = [];
						var reachableT = 0;
						var degradedT = 0;
						var unreachableT = 0;
						var color ="#22FF00";
						$.each( val, function( key, val ) {
							if(key.toString() === "reachable"){
								reachableT = val;
							}
							
							if(key.toString() === "degraded"){
								degradedT = val;
							}
							
							if(key.toString() === "unreachable"){
								unreachableT = val;
							}
						});
						
						var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
						
						if(parseInt(unreachableT)> (totalN * .02)){
							color = "#FF1600";
						}else if(parseInt(degradedT)> (totalN * .05)){
							color = "#FFE200";
						}else {
							color ="#22FF00";
						}
						
						array.push(key);
						array.push("Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT);
						array.push(color);
						states.push(array);
						
					});

		            var mapOptions = {
							zoom: 5,
							center: new google.maps.LatLng(21.8833, -102.3),
							mapTypeId: google.maps.MapTypeId.TERRAIN, 
							infoWindow: null,
							styles: stylesMap
						};
					var mapaNacional;
					map = new google.maps.Map(document.getElementById('mapGral'), mapOptions);
					
					infoWindow = new google.maps.InfoWindow({
					        content: "Cargando . . ."
					});
					
					 var bounds = new google.maps.LatLngBounds();
				     var estados = polygons.mexico.records.record;

				      for (var i = 0; i < estados.length; i++) {
				        var estado = estados[i];
				        var polygon = [];	

				        for (var a = 0; a< states.length; a++) {				        	
				        	
				        	if(states[a][0].indexOf(estado['name'].toUpperCase()) >-1 ){

				            var coords = estado['coords'];
				            for (j = 0; j < coords.length; j++) {
				              var coord = coords[j];
				              var point = new google.maps.LatLng(coord[1], coord[0]);
				              polygon.push(point);
				              bounds.extend(point);
				            }
				            // Construct the polygon.
				            mapaNacional = new google.maps.Polygon({
				              paths: polygon,
				              strokeColor: states[a][2],
				              strokeOpacity: 0.8,
				              strokeWeight: 3,
				              fillColor: states[a][2],
				              fillOpacity: 0.35,
				              info: states[a][0],
				              totalIncidents: states[a][1]
				            });
				            mapaNacional.setMap(map);
				            // Add a listener for the click event.
				            google.maps.event.addListener(mapaNacional, 'mouseover', function(event){
				            	var info = this.info;
				                var total = this.totalIncidents;
				                var contentString = '<div class="tooltipMap"><b>Total Nodes by Status:</b><br>' + 'State: ' + info + ' <br>' + total + '<br></div>';
				                // Replace the info window's content and position.
				                infoWindow.setContent(contentString);
				                infoWindow.setPosition(event.latLng);
				                infoWindow.open(map);
				            });
				            infoWindow = new google.maps.InfoWindow();
				            
				            google.maps.event.addListener(mapaNacional, 'click', function(){
				              //alert("click");
				            });

				            
				          } //Cierre IF
				        } // Cierre FOR states
				      }
				      $( "#mapGral").unmask();
				}
			});

		},mapaMundial:function(codenet){
			$( "#mapGral").mask("Waiting...");

			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : cnocConnector.service28 = serviceG17,
				data: {network_code:codenet},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					$( "#mapGral").unmask();
					drawElementsGral.mapaMundial(cnocConnector.codeNetGlobal);
				},
				success : function(response) {
					var records = [];
					$.each( response, function( key, val ) {
						var reachableT = 0;
						var degradedT = 0;
						var unreachableT = 0;
						var color ="#22FF00";
						$.each( val, function( key, val ) {
							if(key.toString() === "reachable"){
								reachableT = val;
							}
							
							if(key.toString() === "degraded"){
								degradedT = val;
							}
							
							if(key.toString() === "unreachable"){
								unreachableT = val;
							}
						});	
						
						var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
						
						if(parseInt(unreachableT)> (totalN * .02)){
							color = "#FF1600";
						}else if(parseInt(degradedT)> (totalN * .05)){
							color = "#FFE200";
						}else {
							color ="#22FF00";
						}
						records.push({country:key, conteo: "Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT, color:color});
							
					});
					
					var mapOptions = {
							zoom: 2,
							center: new google.maps.LatLng(21.8833, -102.3),
							mapTypeId: google.maps.MapTypeId.TERRAIN, 
							infoWindow: null,
							styles: stylesMap
						};
					var mapaNacional;
					map = new google.maps.Map(document.getElementById('mapGral'), mapOptions);
					
					infoWindow = new google.maps.InfoWindow({
					        content: "Cargando . . ."
					});
					
					
					var countries = {};

				    var totalServicios = 0;

				    
				    for (var i = 0; i < records.length; i++) {
					      var record = records[i];

					      countries[record['country']] = record;
					      totalServicios += parseFloat(record['conteo']);
					    }

				    var rows = polygons.mundial.records.record;

				    jQuery.each(rows, function(index, item) {
				      var poly = [];

				      if (item[0] === "Antarctica")
				        return;

				      if (item[1].type == 'GeometryCollection') {

				        var geos = item[1].geometries;
				        jQuery.each(geos, function(g, k) {
				          poly.push(drawElementsGral.constructNewCoordinates(k));
				        });

				      } else {

				        poly = drawElementsGral.constructNewCoordinates(item[1].geometry);

				      }
				      
				      var color = countries[item[0].toUpperCase()] == null ? '#7B7B7B' : '#0000FF';
				      try{
				    	  color = countries[item[0].toUpperCase()].color;
				      }catch(e){
				      }
				      
				      mapaNacional = new google.maps.Polygon({
				        paths : poly,
				        strokeColor : '#FFFFFF',
				        strokeOpacity : 1,
				        strokeWeight : 1,
				        fillColor : color,
				        fillOpacity : .5,
				        info : countries[item[0].toUpperCase()]
				      });
				      
				      mapaNacional.setMap(map);

				      if (countries[item[0].toUpperCase()] != null) {
				    	  
				    	// Add a listener for the click event.
				            google.maps.event.addListener(mapaNacional, 'mouseover', function(event){
				            	var info = this.info;
				                var total = this.totalIncidents;
				                var contentString = '<div class="tooltipMap"><b>Country:' + info['country'] + '</b><br>' + info['conteo'] + '<br></div>';
				                // Replace the info window's content and position.
				                infoWindow.setContent(contentString);
				                infoWindow.setPosition(event.latLng);
				                infoWindow.open(map);
				            });
				            infoWindow = new google.maps.InfoWindow();
				      }
				    });
					
					$( "#mapGral").unmask();
				}
			});

			
		},constructNewCoordinates : function(polygon) {

		    var newCoordinates = [];
		    var coordinates = polygon['coordinates'][0];
		    for (var i = 0; i < coordinates.length; i++) {
		      var point = new google.maps.LatLng(coordinates[i][1], coordinates[i][0]);
		      newCoordinates.push(point);
		    }

		    return newCoordinates;

		  },chartGroups:function(datos, container, divgroups){
			
			var categorias = new Array();
			var unreachable = new Array();
			var reachable = new Array();
			var degraded = new Array();
			var i = 0;

			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias.push(datos.records.record[i].groups.toString());
						unreachable.push(parseInt(datos.records.record[i].unreachable.toString()));
						reachable.push(parseInt(datos.records.record[i].reachable.toString()));
						degraded.push(parseInt(datos.records.record[i].degraded.toString()));
					}
				} else {
					categorias.push(datos.records.record.groups.toString());
					unreachable.push(parseInt(datos.records.record.unreachable.toString()));
					reachable.push(parseInt(datos.records.record.reachable.toString()));
					degraded.push(parseInt(datos.records.record.degraded.toString()));
				}
			} catch (err) {
				var categorias = new Array();
				var unreachable = new Array();
				var reachable = new Array();
				var degraded = new Array();
			}
			
			var totalNodos = [{
					"name" : "Normal",
					"data" : reachable,									
				},{
					"name" : "Critical",
					"data" : unreachable,									
				},{
					"name" : "Warning",
					"data" : degraded,									
				}];

			var optChart = cnocConnector.drawChartGroups("bar", container, "",totalNodos, categorias);			
			chart = new Highcharts.Chart(optChart);
			
			
	},drawListNodes: function (datos, container, divTable){
		jQuery("#" + container).empty();	
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].status_value.toString()==="degraded"){
						tableT += "<tr class='warning'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="reachable"){
						tableT += "<tr class='success'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="unreachable"){
						tableT += "<tr class='danger'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					};					
				};
			} else {
				if(datos.records.record.status_value.toString()==="degraded"){
					tableT += "<tr class='warning'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="reachable"){
					tableT += "<tr class='success'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="unreachable"){
					tableT += "<tr class='danger'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}
			}
		} catch (err) {	};
		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [{
				"sTitle" : "Node Name"
			}];
		} catch (err) {	};
		
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);		
	},countTotal: function(datos, container, divPanel){
		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		if(container === "relatedIncidentsC" || container === "relatedChangesC"){
			var fields = new Array();
			try{
				if(datos.records.record.length > 1){
					fields.push(datos.records.record.length);
					rowsData.push(fields);
				}else{					
					fields.push(1);
					rowsData.push(fields);
				}							
			}catch(e){
				fields.push(0);
				rowsData.push(fields);
			}					
		}else{
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
		}
				
		
		var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
	},topGrid: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].top.toString());
					fields.push(datos.records.record[i].name.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.top.toString());
				fields.push(datos.records.record.name.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "Percent"
		}, {
			"sTitle" : "Node Name"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	},detailIncidents: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].im.toString());
					fields.push(datos.records.record[i].incident_id.toString());
					fields.push(datos.records.record[i].company.toString());
					fields.push(datos.records.record[i].open_time.toString());
					fields.push(datos.records.record[i].ci_name.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].problem_status.toString());					
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.im.toString());
				fields.push(datos.records.record.incident_id.toString());
				fields.push(datos.records.record.company.toString());
				fields.push(datos.records.record.open_time.toString());
				fields.push(datos.records.record.ci_name.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.problem_status.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "IM"
		}, {
			"sTitle" : "SID"
		},{
			"sTitle" : "Company"
		}, {
			"sTitle" : "Open Time"
		}, {
			"sTitle" : "Node Name"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Status"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
	},gridChangesList : function(datos, container, divTable) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].current_phase.toString());
					fields.push(datos.records.record[i].opentime.toString());
					fields.push(datos.records.record[i].close_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.current_phase.toString());
				fields.push(datos.records.record.opentime.toString());
				fields.push(datos.records.record.close_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {
		}
		;

		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [ {
				"sTitle" : "Change ID"
			}, {
				"sTitle" : "Location"
			}, {
				"sTitle" : "Brief Description"
			}, {
				"sTitle" : "Current Phase"
			}, {
				"sTitle" : "Open Time"
			}, {
				"sTitle" : "Close Time"
			} ];
		} catch (err) {
		}
		;

		var grid = cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);

	},drawListNodeDetail: function(datos, container, divTable){
		try {
			$('#name').val(datos.records.record.name.toString());
			$('#nodevendor').val(datos.records.record.nodevendor.toString());
			$('#sysdescr').val(datos.records.record.sysdescr.toString());
			$('#lastupdatesec').val(datos.records.record.lastupdatesec.toString());
			$('#model').val(datos.records.record.model.toString());
			$('#per_cpu').val(datos.records.record.per_cpu.toString());
			$('#intfcollect').val(datos.records.record.intfcollect.toString());
			$('#sysuptime').val(datos.records.record.sysuptime.toString());
			$('#syscontact').val(datos.records.record.syscontact.toString());
			$('#processorram').val(datos.records.record.processorram.toString());
			$('#nrt').val(datos.records.record.nrt.toString());
			$('#musedio').val(datos.records.record.musedio.toString());
			$('#lastupdate').val(datos.records.record.lastupdate.toString());
			$('#reachability').val(datos.records.record.reachability.toString());
			$('#nodetype').val(datos.records.record.nodetype.toString());
			$('#serialnum').val(datos.records.record.serialnum.toString());
			$('#time_column').val(datos.records.record.time_column.toString());
			$('#per_mused ').val(datos.records.record.per_mused .toString());
			$('#availability').val(datos.records.record.availability.toString());
			$('#sysname').val(datos.records.record.sysname.toString());
		}catch(e){
			console.log(e);
		}
	},drawGetModel: function(datos, container, divTable){
		$("#msgPingOnly").empty();
		if(datos.records.record.model.toString() === "automatic"){			
			cnocConnector.invokeMashup(cnocConnector.service19, {"node" : datos.records.record.name.toString()},drawElementsGral.drawListNodeDetail, "listNodeDetail", "listNodeDetailG");
			cnocConnector.invokeMashup(cnocConnector.service21, {"node" : datos.records.record.name.toString()},drawElementsGral.drawGridInterface, "listInterfaces", "listInterfacesG");			
		}else{
			
			cnocConnector.invokeMashup(cnocConnector.service25, {"hostname" : datos.records.record.name.toString()},drawElementsGral.drawPingOnly, "msgPingOnly", "msgPingOnlyG");
			
		}
	},drawPingOnly:function(datos, container, divTable){
		
		var msg = '<div class="alert alert-info" id="'+divTable+'">Note: Ping Only</br><strong>'+datos.records.record.hostname+'</strong>';
		msg += "</br>IP WAN: "+datos.records.record.ip_wan;
		msg += "</br>Monitoring IP: "+datos.records.record.monitoring_ip;
		msg += "</div>";
		$("#"+container).append(msg);
	},drawGridInterface: function(datos, container, divTable){
		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var tableT = "";
		try {
			
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var int1 = datos.records.record[i].ifadminstatus.toString();
					var int2 = datos.records.record[i].ifoperstatus.toString();
					var classC = "success";
					if(int1 === "up" && int2 === "up"){
						classC = "success";
					}else {
						classC = "danger";
					}
					
					tableT += "<tr class='"+classC+"'><td>"+datos.records.record[i].ifnode.toString()+"</td>";
					tableT += "<td>"+datos.records.record[i].ipadentaddr1.toString()+"</td>";
					tableT += "<td>"+datos.records.record[i].lastupdate.toString()+"</td>";
					tableT += "<td>"+datos.records.record[i].ifoperstatus.toString()+"</td>";
					tableT += "<td>"+datos.records.record[i].ifadminstatus.toString()+"</td></tr>";
				}
			} else {
				var int1 = datos.records.record.ifadminstatus.toString();
				var int2 = datos.records.record.ifoperstatus.toString();
				var classC = "success";
				if(int1 === "up" && int2 === "up"){
					classC = "success";
				}else {
					classC = "danger";
				}
				
				tableT += "<tr class='"+classC+"'><td>"+datos.records.record.ifnode.toString()+"</td>";
				tableT += "<td>"+datos.records.record.ipadentaddr1.toString()+"</td>";
				tableT += "<td>"+datos.records.record.lastupdate.toString()+"</td>";
				tableT += "<td>"+datos.records.record.ifoperstatus.toString()+"</td>";
				tableT += "<td>"+datos.records.record.ifadminstatus.toString()+"</td></tr>";
			}
		} catch (err) {};

		try {
			var rowsHeaders = [ {
				"sTitle" : "Interface"
			}, {
				"sTitle" : "IP"
			}, {
				"sTitle" : "Last Update"
			}, {
				"sTitle" : "Oper Status"
			}, {
				"sTitle" : "Admin Status"
			} ];
		} catch (err) {
		}
		;
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);
		
	},detailIncidentsNode: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].incident_id.toString());
					fields.push(datos.records.record[i].company.toString());
					fields.push(datos.records.record[i].open_time.toString());
					fields.push(datos.records.record[i].hostname.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].problem_status.toString());
					fields.push(datos.records.record[i].resolution_code.toString());
					fields.push(datos.records.record[i].close_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.incident_id.toString());
				fields.push(datos.records.record.company.toString());
				fields.push(datos.records.record.open_time.toString());
				fields.push(datos.records.record.hostname.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.problem_status.toString());
				fields.push(datos.records.record.resolution_code.toString());
				fields.push(datos.records.record.close_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "IM"
		}, {
			"sTitle" : "SID"
		}, {
			"sTitle" : "Company"
		}, {
			"sTitle" : "Open Time"
		}, {
			"sTitle" : "Node Name"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Status"
		}, {
			"sTitle" : "Resolution Code"
		}, {
			"sTitle" : "Close Time"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
	},detailChangesNode: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].company.toString());
					fields.push(datos.records.record[i].open_time.toString());
					fields.push(datos.records.record[i].hostname.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].status.toString());
					fields.push(datos.records.record[i].phase.toString());
					fields.push(datos.records.record[i].type.toString());
					fields.push(datos.records.record[i].implementationcomments.toString());
					fields.push(datos.records.record[i].close_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.company.toString());
				fields.push(datos.records.record.open_time.toString());
				fields.push(datos.records.record.hostname.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.status.toString());
				fields.push(datos.records.record.phase.toString());
				fields.push(datos.records.record.type.toString());
				fields.push(datos.records.record.implementationcomments.toString());
				fields.push(datos.records.record.close_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "Change ID"
		}, {
			"sTitle" : "Company"
		}, {
			"sTitle" : "Open Time"
		}, {
			"sTitle" : "Node Name"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Status"
		}, {
			"sTitle" : "Phase"
		}, {
			"sTitle" : "Type"
		}, {
			"sTitle" : "Comments"
		}, {
			"sTitle" : "Close Time"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	},treeData: function(datos, container, divTable){
		var name = datos.records.record.name;
		var nmis = datos.records.record.nmisserver;
		var model = datos.records.record.model;
		var vendor = datos.records.record.nodemodel;
		
		drawElementsPerformance.dataChartPerformance.length = 0;
		drawElementsPerformance.nodePerformance = name;
		drawElementsPerformance.nmis = nmis;					
		var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
		var endDate = ((new Date().getTime()).toString()).substring(0,10);
		
		drawElementsPerformance.endUnix = endDate;
		drawElementsPerformance.endDate = "";
		drawElementsPerformance.startDate = startDate;
		drawElementsPerformance.vendor = vendor;
		
		if(model === 'PingOnly'){
			drawElementsPerformance.selectPingOnly();
			drawElementsPerformance.drawChartHealth();
		}else{
			if(name.indexOf("_UPS") > 0){
				drawElementsPerformance.selectUps();
				drawElementsPerformance.drawChartHealth();
			}else{
				
				cnocConnector.invokeMashup(cnocConnector.service1, {
					"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json",
					"ip":nmis
				},drawElementsPerformance.selectInterfaz, "SelectInterfaz", "cmbInterfazP");
				
				drawElementsPerformance.drawChartHealth();
			}
		}	
		
	}
};