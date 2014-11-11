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
			
			
			/*if(codenet.indexOf('L')>=0 || codenet.indexOf('N000269')>=0){
				this.mapaMundial(codenet);
			}else{
				this.mapaGeneral(codenet);
			}*/
			

			this.mapaGeneral(codenet, null ,false);
			
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : ""},drawElementsGral.countStatus, "countAll", "countAllG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "reachable"},drawElementsGral.countStatus, "countReachable", "countReachableG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "degraded"},drawElementsGral.countStatus, "countDegraded", "countDegradedG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "unreachable"},drawElementsGral.countStatus, "countUnreachable", "countUnreachableG");
			cnocConnector.invokeMashup(cnocConnector.service5, {"code_net" : codenet},drawElementsGral.countTotal, "cOpen", "cOpenG");
			cnocConnector.invokeMashup(cnocConnector.service15, {"code_net" : codenet},drawElementsGral.countTotal, "cIncident", "cIncidentG");			
			
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");		
			var codeNet = $("#SelectCustomer").val(); 
			drawElementsGral.builder(codeNet);

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
			
		},mapaGeneral:function(codenet, typeData, flgNacional){
			$( "#mapGral").mask("Waiting...");
			var states = [];

			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				url: cnocConnector.service20,
				data: {network_code:codenet, type:typeData},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("error");
					console.log(jqXHR);
					$( "#mapGral").unmask();
					//drawElementsGral.mapaGeneral(cnocConnector.codeNetGlobal);
				},
				success : function(response) {
					console.log(response);
					var tmp = "";
					if(response.results){
						tmp = response.results.international.toString();
					}else{
						tmp = response.international.toString();
					}
					
					try{

						if(tmp === "false" || flgNacional === true){
							console.log("nacional");
							$.each( response, function( key, val ) {
								$.each( val, function( key, val ) {
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
										
										var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
										
										if(parseInt(unreachableT)> (totalN * .02)){
											color = "#FF1600";
										}else if(parseInt(degradedT)> (totalN * .05)){
											color = "#FFE200";
										}else {
											color ="#22FF00";
										}									
									});
									
									array.push(key);
									array.push("Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT);
									array.push(color);
									states.push(array);
								});								
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
						        	
						        	//if(states[a][0].indexOf(estado['name'].toUpperCase()) >-1 ){
						        	if(states[a][0] === estado['name'].toUpperCase() ){

						            var coords = estado['coords'];
						            for (var j = 0; j < coords.length; j++) {
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
						            
						            
						            //if(codenet === 'N000269'){
						            	google.maps.event.addListener(map, 'zoom_changed', function() {
							            	var zoomLevel = map.getZoom();					            	
							                if (zoomLevel == 3) {
							                	//drawElementsGral.mapaMundial(codenet);
							                	drawElementsGral.mapaGeneral(codenet, null , false);
							                }
						        		});
						            //}

						          } //Cierre IF
						        } // Cierre FOR states
						      }
						}else if(tmp === "true"){
							console.log("soy internacional");
							var records = [];
							$.each( response, function( key, val ) {																
								$.each( val, function( key, val ) {
									
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
						    console.log(countries);
						    var rows = polygons.mundial.records.record;

						    jQuery.each(rows, function(index, item) {
						      var poly = [];
						      //console.log(item[0]);
						      if (item[0] === "Antarctica")
						    	  return true;
				        

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
						            
									if(codenet.indexOf('N')>=0){
										google.maps.event.addListener(mapaNacional, 'click', function(){
											console.log("ejecuto nacional");
							            	drawElementsGral.mapaGeneral(codenet,"NACIONAL", true);
							            });	
									}

						      	}
						    });
							
						}
					}catch(e){
						console.log(e);
						//response = null;
						console.log("fallo");
						//drawElementsGral.mapaGeneral(codenet);
					}
					

					/*
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
				        	
				        	//if(states[a][0].indexOf(estado['name'].toUpperCase()) >-1 ){
				        	if(states[a][0] === estado['name'].toUpperCase() ){

				            var coords = estado['coords'];
				            for (var j = 0; j < coords.length; j++) {
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
				            
				            if(codenet === 'N000269'){
				            	google.maps.event.addListener(map, 'zoom_changed', function() {
					            	var zoomLevel = map.getZoom();					            	
					                if (zoomLevel == 3) {
					                	drawElementsGral.mapaMundial(codenet);
					                }
				        		});
				            }

				          } //Cierre IF
				        } // Cierre FOR states
				      }*/
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
				            
				            if(codenet === 'N000269'){
				        		google.maps.event.addListener(mapaNacional, 'click', function(){
					            	drawElementsGral.mapaGeneral(codenet);
					            });		
				            }
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
						tableT += "<tr class='warning'><td><a href='#nodeResource'>"+datos.records.record[i].name.toString()+"</a></td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="reachable"){
						tableT += "<tr class='success'><td><a href='#nodeResource'>"+datos.records.record[i].name.toString()+"</a></td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="unreachable"){
						tableT += "<tr class='danger'><td><a href='#nodeResource'>"+datos.records.record[i].name.toString()+"</a></td></tr>";
					};					
				};
			} else {
				if(datos.records.record.status_value.toString()==="degraded"){
					tableT += "<tr class='warning'><td><a href='#nodeResource'>"+datos.records.record.name.toString()+"</a></td></tr>";
				}else if(datos.records.record.status_value.toString()==="reachable"){
					tableT += "<tr class='success'><td><a href='#nodeResource'>"+datos.records.record.name.toString()+"</a></td></tr>";
				}else if(datos.records.record.status_value.toString()==="unreachable"){
					tableT += "<tr class='danger'><td><a href='#nodeResource'>"+datos.records.record.name.toString()+"</a></td></tr>";
				}
			}
		} catch (err) {
			console.log(err);
		};
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
		
		if(datos.records.record.model.toString() === "PingOnly"){
			cnocConnector.invokeMashup(cnocConnector.service25, {"hostname" : datos.records.record.name.toString()},drawElementsGral.drawPingOnly, "msgPingOnly", "msgPingOnlyG");
		}else{
			cnocConnector.invokeMashup(cnocConnector.service19, {"node" : datos.records.record.name.toString()},drawElementsGral.drawListNodeDetail, "listNodeDetail", "listNodeDetailG");
			cnocConnector.invokeMashup(cnocConnector.service21, {"node" : datos.records.record.name.toString()},drawElementsGral.drawGridInterface, "listInterfaces", "listInterfacesG");
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
		
	},command: function(datos, container, divTable) {
		$( '#resultCommand' ).text(datos);
		
		var modal = bootbox.dialog({
			message: $("#cmd").html(),
			title: "Command result for " + cnocConnector.nodeGlobal,
			buttons: [{
				label: "Close",
				className: "btn btn-default",
				callback: function() { }
			}],
			show: false,
			onEscape: function() {
				modal.modal("hide");
			}
		});
		
		$( '#page-wrapper' ).unmask();
				
		modal.modal("show");
		
	},ipAccounting: function(data) {
		
		modalIP = bootbox.dialog({
			message: $("#ipAcc").html(),
			title: "IP Accounting Report: " + cnocConnector.nodeGlobal,
			buttons: [{
				label: " Send Report",
				className: "btn btn-primary glyphicon glyphicon-send btnIP",
				callback: function() {
					
					var button = modalIP.find( '.btnIP' );
					var contactMail = modalIP.find( '#contactEmailIP' );
					var message = modalIP.find( '#messageIP' );
					
					data.contactMail = contactMail.val();					
					
					$( message ).attr("disabled", "disabled");
					
					$(button).attr("disabled", "disabled");
					$(button).text("Waiting...");					
					
					$( contactMail ).attr("disabled", "disabled");
					$( message ).val("Waiting...");
					
					if (data.contactMail == "" || data.contactMail == null || data.contactMail == undefined) {						
						
						$( contactMail ).removeAttr("disabled");
						
						$( message ).val("Contact Email is required.");
						
						$( button ).text(" Send Report");
						$( button ).removeAttr("disabled");
						
					} else {
						cnocConnector.invokeMashup(
								cnocConnector.service32,
								{
									"network_code" : data.network_code,
									"hostname" : data.hostname,
									"emails" : data.contactMail
								},
								drawElementsGral.ipEmail,
								"commandNS",
								"ipAccountingContainerNS");
					}
					
					return false;
				}
			}, {
				label: "Close",
				className: "btn btn-default",
				callback: function() { }
			}],
			show: false,
			onEscape: function() {
				modalIP.modal("hide");
			}
		});

		modalIP.modal("show");
		
	}, ipEmail : function(data) {
		console.log(data);
		if (data == '' || data == null) {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val("No information Retrived.");			
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
			
		} else if (data.indexOf("IP Accounting Report has been sent") > -1 || 
				data.indexOf("There is another IP Accounting") > -1) {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val("IP Accounting Report has been sent and can take some minutes to arrive.");
			modalIP.find( '#messageIP' ).removeAttr("disabled");
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
		} else {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val(data);
			modalIP.find( '#messageIP' ).removeAttr("disabled");
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
		}
	},treeData: function(datos, container, divTable){

		var name = datos.records.record.name;
		var nmis = datos.records.record.nmisserver;
		var model = datos.records.record.model;
		drawElementsPerformance.qosIn = false;
		
		
		drawElementsPerformance.dataChartPerformance.length = 0;
		drawElementsPerformance.nodePerformance = name;
		drawElementsPerformance.nmis = nmis;					
		var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
		var endDate = ((new Date().getTime()).toString()).substring(0,10);
		
		drawElementsPerformance.endUnix = endDate;
		drawElementsPerformance.endDate = "";
		drawElementsPerformance.startDate = startDate;
		
		
		if(model === 'PingOnly'){
			drawElementsPerformance.selectPingOnly();
			drawElementsPerformance.drawChartHealth();
		}else{
			if(name.indexOf("_UPS") > 0){
				drawElementsPerformance.selectUps();
				drawElementsPerformance.drawChartHealth();
			}else{
				
				cnocConnector.invokeMashup(cnocConnector.service29, {
					"name" : name
				},function(datos){
					var vendor = datos.records.record.nodemodel;
					drawElementsPerformance.vendor = vendor;
					
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json",
						"ip":nmis
					},drawElementsPerformance.selectInterfaz, "SelectInterfaz", "cmbInterfazP");
					
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/",
						"ip":nmis
					},function(data){							
						for(var x=0; x<data.length; x++){
							if(data[x].name==="cbqos-in"){
								drawElementsPerformance.qosIn = true;
							}
						}
					}, null, null);
					
					drawElementsPerformance.drawChartHealth();
				},"","");
				
			}
		}			
	}
};
