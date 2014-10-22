/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsSct = {
		dataChartSct : [],
		subtitleChartSct:"",
		metricUnitChartSct:"",
		
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);				
			
			} else {
				
				this.builder(codeNet);
				this.setMarkersMap();
				//cnocConnector.invokeMashup(cnocConnector.service1, {},drawElementsSct.selectCustom, "SelectCustomer", "opt");

			}

		},builder: function(codenet){				
				
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : ""},drawElementsSct.countStatus, "countAllSct", "countAllSctG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "1"},drawElementsSct.countStatus, "onlineSct", "onlineSctG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "2"},drawElementsSct.countStatus, "offline", "offlineG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "3"},drawElementsSct.countStatus, "invalid", "invalidG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "0"},drawElementsSct.countStatus, "noDetected", "noDetectedG");
			
			cnocConnector.invokeMashup(cnocConnector.service3, {"id":"","status":""},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			
			this.setMarkersMap();
			
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");		
			var codeNet = $("#SelectCustomer").val(); 
			drawElementsSct.builder(codeNet);

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
			
		},drawListNodes: function (datos, container, divTable){
			jQuery("#" + container).empty();	
			var tableT = "";
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						if(datos.records.record[i].nestate.toString()==="0"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="1"){
							tableT += "<tr class='success'><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="2"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="3"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						};					
					};
				} else {
					if(datos.records.record.nestate.toString()==="0"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="1"){
						tableT += "<tr class='success'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource'>"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="2"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="3"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					};	
				}
			} catch (err) {	};
			/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
			try {
				var rowsHeaders = [{
					"sTitle" : "Node Name"
				}];
			} catch (err) {	};
			
			var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);		
			
		}, drawInterfazTree: function(datos, container, divPanel){
			
			console.log(datos);
			
			$("#treeContainerInterfaz").empty();			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='cpuSct' class='cpuSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>CPU</a></i></span></li>";
			tree += "<li id='memSct' class='memSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>MEMORY</a></i></span></li>";
			tree += "<li id='pingSct' class='pingSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>PING</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			tree += "<ul><li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Interface </span><ul>";
			try {
				if (datos.records.record.length > 1) {
					for(var i=0; i<datos.records.record.length; i++){
						tree+= "<li id ='interfazNode' class='interfazNode'><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.records.record[i].displayvalue.toString()+"</a></i></span>";						
						tree+="</li>";
					}					
				}else{
					tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.records.record.displayvalue.toString()+"</a></i></span>";						
					tree+="</li>";
				}
			}catch(e){
				console.log(e);
			}

			tree+= "</ul></li></ul>";
			
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTreeSct();
			
			
			$( ".cpuSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service6, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawCharCPU, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".memSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service7, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawCharMem, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".pingSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service5, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawChartPingSct, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".interfazNode" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				
				var tmp = $(this).text();
				
				cnocConnector.invokeMashup(cnocConnector.service8, {"id":cnocConnector.nodeGlobal,"intf":tmp},drawElementsSct.drawCharUtilInt, "containerChartPingSct", "containerChartPingSctG");
			});
			
		},drawListNodeDetail: function(datos, container, divTable){
			try {
				$('#createtime').val(datos.records.record.createtime.toString());
				$('#lastpolltime').val(datos.records.record.lastpolltime.toString());
				$('#netype').val(datos.records.record.netype.toString());
				$('#neip').val(datos.records.record.neip.toString());
				$('#necategory').val(datos.records.record.necategory.toString());
				$('#displaytype').val(datos.records.record.displaytype.toString());
				$('#neosversion').val(datos.records.record.neosversion.toString());
				$('#nename').val(datos.records.record.nename.toString());
				$('#nemac').val(datos.records.record.nemac.toString());
				$('#version').val(datos.records.record.version.toString());
			}catch(e){
				console.log(e);
			}
		},drawChartPingSct:function (datos, container, divTable){
			drawElementsSct.metricUnitChartSct = "ms";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"Ping");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].nepingresptime, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"Ping", data: data};
			onDataReceived(dataChart);
			
		},drawCharCPU:function(datos, container, divTable){
			console.log(datos);
			
			drawElementsSct.metricUnitChartSct = "% CPU Util";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"CPU Util");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].cpuusage, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"CPU", data: data};
			onDataReceived(dataChart);
			
		},drawCharMem:function(datos, container, divTable){
			console.log(datos);
			
			drawElementsSct.metricUnitChartSct = "% MEM Util";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"Memory Util");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].memusage, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"MEM", data: data};
			onDataReceived(dataChart);
			
		},drawCharUtilInt:function(datos, container, divTable){
			console.log(datos);
			
			drawElementsSct.metricUnitChartSct = "Octets Speed";
			
			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"Octets Speed");		
	       	}
			
			var data = [], i;
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifhcoutoctetsspeed)
	        	});
	        }
	        	        
	        var dataChart = {color:"#0C66ED", name:"Out Octets", data: data};
			onDataReceived(dataChart);
			
			/*********************************************************************/
			
			var data = [], i;
			
			for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifhcinoctetsspeed)
	        	});
	        }
	        
	        var dataChart = {color:"#2BC70D", name:"In Octets", data: data};
			onDataReceived(dataChart);
			
		}, setMarkersMap: function(){
			
			$( "#containerMapSCT").mask("Waiting...");
			var markers = [];
			var iterator = 0;
			var morelosState = new google.maps.LatLng(18.7318964, -99.0633631);
			var map;

			
			var morelosSCTSites = [
			               ['44327_USG', 18.68378, -99.11965, 20],
			               ['44375_USG', 18.908121, -98.9726968, 19],
			               ['44586_USG', 18.76278, -99.12032, 18],
			               ['44600_USG', 18.847953, -98.9488239, 17],
			               ['44311_USG', 18.7412,	-98.95368, 16],
			               ['44327_USG', 18.68378,	-99.11965, 15],
			               ['44375_USG', 18.908121,	-98.9726968, 14],
			               ['44478_USG', 19.013541,	-99.0613863, 13],
			               ['44553_USG', 18.815151,	-98.9507069, 12],
			               ['44586_USG', 18.847953, -98.9488239, 11],
			               ['44600_USG', 18.76278,	-99.12032, 10],
			               ['44653_USG', 18.891104,	-99.0275055, 9],
			               ['44665_USG', 18.942899,	-98.9033196, 8],
			               ['44838_USG', 18.69183,	-99.119, 7],
			               ['44943_USG', 18.882549,	-99.0673166, 6],
			               ['44952_USG', 18.931001,	-99.0282406, 5],
			               ['44979_USG', 18.943607,	-98.9063966, 4],
			               ['45015_USG', 18.580985,	-98.7483515, 3],
			               ['45028_USG', 18.526381,	-98.7930463, 2],
			               ['45150_USG', 18.6168,	-99.17789, 1]
			             ];
							
				  var mapOptions = {
				    zoom: 10,
				    center: morelosState,
				    mapTypeId: google.maps.MapTypeId.TERRAIN,
			        styles: stylesMap
				  };
			      
				  map = new google.maps.Map(document.getElementById('containerMapSCT'), mapOptions);
				  
				  
				  var estados = polygons.mexico.records.record;

			      for (var i = 0; i < estados.length; i++) {
			        var estado = estados[i];
			        var polygon = [];	

			        	if("MORELOS" === estado['name'].toUpperCase() ){
			        		console.log("si entro");
			            var coords = estado['coords'];
			            for (var j = 0; j < coords.length; j++) {
			              var coord = coords[j];
			              var point = new google.maps.LatLng(coord[1], coord[0]);
			              polygon.push(point);
			            }
			            
			            mapaNacional = new google.maps.Polygon({
			              paths: polygon,
			              strokeColor: '#22FF00',
			              strokeOpacity: 0.8,
			              strokeWeight: 3,
			              fillColor: '#22FF00',
			              fillOpacity: 0.35
			            });
			            mapaNacional.setMap(map);
			            
			          } 
			      }
			      
				  drop();


			function drop() {
			  for (var i = 0; i < morelosSCTSites.length; i++) {
			    setTimeout(function() {
			      addMarker();
			    }, i * 200);
			  }
			}
			
			
			function addMarker() {
				
				 for (var i = 0; i < morelosSCTSites.length; i++) {
		                var sites = morelosSCTSites[i];
		                var myLatLng = new google.maps.LatLng(sites[1], sites[2]);
		                var marker = new google.maps.Marker({
		                    position: myLatLng,
		                    map: map,
		                    title: sites[0],
		                    zIndex: sites[3]//,
		                    //animation: google.maps.Animation.DROP
		                });
		              }
			}
			$( "#containerMapSCT").unmask();
		},gridAp: function(datos, container, divTable){
			var rowsData = new Array();
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						var fields = new Array();
						if(datos.records.record[i].status.toString() === "8"){
							fields.push("<span class=\"success\">Online</span>");
						}else{
							fields.push("<td class='danger'>Offline</td>");
						}
						
						fields.push(datos.records.record[i].apname.toString());
						fields.push(datos.records.record[i].mac.toString());
						fields.push(datos.records.record[i].aptype.toString());
						fields.push(datos.records.record[i].regionlocation.toString());
						rowsData.push(fields);
					}
				} else {
					var fields = new Array();
					fields.push(datos.records.record.status.toString());
					fields.push(datos.records.record.apname.toString());
					fields.push(datos.records.record.mac.toString());
					fields.push(datos.records.record.aptype.toString());
					fields.push(datos.records.record.regionlocation.toString());
					rowsData.push(fields);
				}
			} catch (err) {	};
			var rowsHeaders = [ {
				"sTitle" : "Status"
			}, {
				"sTitle" : "AP Name"
			}, {
				"sTitle" : "MAC"
			}, {
				"sTitle" : "AP Type"
			}, {
				"sTitle" : "Location"
			} ];
			cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			
		}
};