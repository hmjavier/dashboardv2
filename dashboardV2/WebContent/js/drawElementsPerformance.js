/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsPerformance = {
		dataChartPerformance : [],
		nodePerformance : "",
		nmis : "",
		idResourceInterfaz: "",
		intfNodePerformance:"",
		subtitlePerformance:"",
		chartIdPerformance:"",
		endUnix: "",
		endDate: "",
		startDate: "",
		vendor:"",
		qosIn:"",
		
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsPerformance.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){	
			
			cnocConnector.invokeMashup(cnocConnector.service2, {"codenet" : codenet},drawElementsPerformance.drawListNodes, "listNodes", "listNodesP");
		
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "performance");
			
			var codeNet = $("#SelectCustomer").val(); 

			drawElementsPerformance.builder(codeNet);

		},drawListNodes: function (datos, container, divTable){

			var selText = cnocConnector.drawSelectNodePerformance(datos, "SelectNode", "performance");
		
		},selectPingOnly:function(){
			$("#treeContainerInterfaz").empty();			
			
			var msg = '</br><div class="alert alert-info" >Note: Ping Only</br></div>';
			$("#treeContainerInterfaz").append(msg);
			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
			tree += "<li id='responseP' class='responseP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Response</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTree();
			
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});
			
			$( ".responseP" ).click(function() {
				drawElementsPerformance.drawChartResponse();
			});
			
		},selectUps:function(){
			$("#treeContainerInterfaz").empty();			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
			tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Battery</i></span><ul>";
			tree += "<li id='UpsBatteryRemaing' class='UpsBatteryRemaing'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Battery Remaing</a></i></span></li></ul>";
			
			tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Voltage</i></span><ul>";
			tree += "<li id='inputVolt' class='inputVolt'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Input Volt</a></i></span></li>";
			tree += "<li id='outputVolt' class='outputVolt'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Output Volt</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTree();			
			
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});
			
			$( ".UpsBatteryRemaing" ).click(function() {
				drawElementsPerformance.drawChartUpsBatRemaing();
			});
			
			$( ".inputVolt" ).click(function() {
				drawElementsPerformance.drawChartUpsInVolt();
			});
			
			$( ".outputVolt" ).click(function() {
				drawElementsPerformance.drawChartUpsOutVolt();
			});
			
		},selectInterfaz : function(datos, selector, opt) {
						
			$("#treeContainerInterfaz").empty();			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");
			
			var tree = "<ul>";	

			if(drawElementsPerformance.vendor === "HuaweiRouter"){
				tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance HUAWEI</span><ul>";
				tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'>Health</i></span></li>";
				tree += "<li id='cpuPH' class='cpuPH'><span class='treeNode'><i class='icon-minus-sign'>CPU</i></span></li>";			
				tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Memory</i></span><ul>";
				tree += "<li id='memProcH' class='memProcH'><span class='treeNode '><i class='icon-minus-sign'>Memory Proc</i></span></li>";
				tree += "</ul></li>";
				tree += "</ul></li></ul>";
				tree += "<ul>";
				
			}else{
				tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
				tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
				tree += "<li id='cpuP' class='cpuP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>CPU</a></i></span></li>";			
				tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Memory</i></span><ul>";
				tree += "<li id='memProc' class='memProc'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Memory Proc</a></i></span></li>";
				tree += "<li id='memIo' class='memIo'><span class='treeNode '><a href='#nodeChart'>Memory I/O</a></span></li>";
				tree += "</ul></li>";
				tree += "</ul></li></ul>";
				tree += "<ul>";
			}
			
			
			
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Interface </span><ul>";
			try {
				if (datos.results.datum.length > 1) {
					for(var i=0; i<datos.results.datum.length; i++){
						tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.results.datum[i].name.toString()+"</a></i></span>";
						if(datos.results.datum[i].active.toString() === "1"){
							tree+= "<ul><li><span class='treeNode badge badge-warning'><i class='icon-minus-sign'></i>QOS</span><ul>";
							if(datos.results.datum[i].classes.length > 1){
								for(var j=1; j<datos.results.datum[i].classes.length; j ++){
									tree+= "<li><span class='treeNode'><i id='"+datos.results.datum[i].name.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum[i].classes[j]+"</a></i></span></li>";
								}
							}else{
								tree+= "<li><span class='treeNode'><i id='"+datos.results.datum[i].name.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum[i].classes+"</a></i></span></li>";
							}
							
							tree+= "</ul></li></ul>";
						}
						tree+="</li>";
					}					
				}else{
					tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.results.datum.name.toString()+"</a></i></span>";
					if(datos.results.datum.active.toString() === "1"){
						tree+= "<ul><li><span class='treeNode badge badge-warning'><i class='icon-minus-sign'></i>QOS</span><ul>";
						if(datos.results.datum.classes.length > 1){
							for(var j=1; j<datos.results.datum.classes.length; j ++){
								tree+= "<li><span class='treeNode'><i id='"+datos.results.datum.name.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum.classes[j]+"</a></i></span></li>";
							}
						}else{
							tree+= "<li><span class='treeNode'><i id='"+datos.results.datum.name.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum.classes+"</a></i></span></li>";
						}
						
						tree+= "</ul></li></ul>";
					}
					tree+="</li>";
				}
			}catch(e){
				console.log(e);
			}

			tree+= "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTree();
			
			/************************************************************************/
			/* funciones para equipos tipo Huawei*/

			$( ".cpuPH" ).click(function() {
				drawElementsPerformance.drawChartCPUHuawei();
			});
			
			$( ".memProcH" ).click(function() {
				drawElementsPerformance.drawChartMemHuawei();
			});
			
			/************************************************************************/
			/* funciones para equipos varios*/
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});						
			
			$( ".cpuP" ).click(function() {
				drawElementsPerformance.drawChartCPU();
			});			
			
			$( ".memIo" ).click(function() {
				drawElementsPerformance.drawChartMemoryIO();
			});
			
			
			$( ".memProc" ).click(function() {
				drawElementsPerformance.drawChartMemoryProc();
			});
			
			$( ".intfChart" ).click(function() {

				drawElementsPerformance.subtitlePerformance = "";
				drawElementsPerformance.subtitlePerformance = "Interfaz Average: ";
				drawElementsPerformance.idResourceInterfaz = "";

				var idResource = "";
				try{
					var tmp = $(this).text().split("--");
					idResource = (tmp[2]).trim().substring(0,20);
					drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1]; 
				}catch(e){
					console.log(e);
					drawElementsPerformance.intfNodePerformance = $(this).text();
				}				
				drawElementsPerformance.idResourceInterfaz = idResource;

				drawElementsPerformance.drawInterfaceUtil("autil");
			});
			
			$( ".intfChartQos" ).click(function() {
				var classQos = $(this).text();
				drawElementsPerformance.subtitlePerformance = "";								
				drawElementsPerformance.idResourceInterfaz = "";
				var idResource = "";
				
				try{
					var tmp =  $(this).attr( 'id' ).split("--");
					idResource = (tmp[2]).trim().substring(0,20);
					drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1]; 
				}catch(e){
					console.log(e);
					drawElementsPerformance.intfNodePerformance = $(this).text();
				}
				
				drawElementsPerformance.subtitlePerformance = "QOS: "+tmp[0]+ " -- " +tmp[1]+"</br>"+$(this).text();
				drawElementsPerformance.idResourceInterfaz = idResource;				
				drawElementsPerformance.drawInterfaceQos(classQos);
				
			});
		},drawChartResponse:function(){
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Response Time ";
			drawElementsPerformance.metricUnit = "ms";
			var response = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"response","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};

			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, response, "containerChartPerformance", "response", "#0C66ED", false);
		},drawChartUpsOutVolt:function(){
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Voltage ";
			drawElementsPerformance.metricUnit = "Volt";
			var upsvoltout = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"upsvoltout","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, upsvoltout, "containerChartPerformance", "upsvoltout", "#0C66ED", false);
		},drawChartUpsInVolt:function(){
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Voltage ";
			drawElementsPerformance.metricUnit = "Volt";
			var upsvoltin = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"upsvoltin","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, upsvoltin, "containerChartPerformance", "upsvoltin", "#0C66ED", false);
		},drawChartUpsBatRemaing:function(){
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Battery Remaing";
			drawElementsPerformance.metricUnit = "";
			var batteryRemaing = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"batcharremain","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"UpsBatteryRemaing"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, batteryRemaing, "containerChartPerformance", "batteryRemaing", "#0C66ED", false);
		},drawChartHealth:function(){
			
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Availability";
			drawElementsPerformance.metricUnit = "% Health Statistics";
			var availability = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"health","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, availability, "containerChartPerformance", "availability", "#0C66ED", false);
			
		},drawChartCPU: function(){
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "CPU Util";
			drawElementsPerformance.metricUnit = "% CPU Util.";
			var avgBusy1 = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"avgBusy1"}}',"ip":drawElementsPerformance.nmis};
			var avgBusy5 = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"avgBusy5"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy1, "containerChartPerformance", "avgBusy1", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy5, "containerChartPerformance", "avgBusy5","#2BC70D", false);	
			
		},drawChartMemoryIO: function(){
			drawElementsPerformance.chartIdPerformance = "2";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.idResourceInterfaz = "";
			drawElementsPerformance.metricUnit = " ";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Mem Util IO";
			drawElementsPerformance.metricUnit = " ";
			var MemoryFreeIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryFreeIO"}}',"ip":drawElementsPerformance.nmis};
			var MemoryUsedIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryUsedIO"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryFreeIO, "containerChartPerformance", "MemoryFreeIO", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryUsedIO, "containerChartPerformance", "MemoryUsedIO","#2BC70D", false);
		
		},drawChartMemoryProc: function(){
			
			drawElementsPerformance.chartIdPerformance = "3";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Mem Util PROC";
			drawElementsPerformance.metricUnit = " ";
			var MemoryFreePROC = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryFreePROC"}}',"ip":drawElementsPerformance.nmis};
			var MemoryUsedPROC = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryUsedPROC"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryFreePROC, "containerChartPerformance", "MemoryFreePROC", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryUsedPROC, "containerChartPerformance", "MemoryUsedPROC","#2BC70D", false);
			
		},drawInterfaceUtil: function(unidad){		
			drawElementsPerformance.chartIdPerformance = "4";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			
			if(unidad==="autil"){
				drawElementsPerformance.metricUnit = "% Avg Util ";
			}else if(unidad==="abits"){
				drawElementsPerformance.metricUnit = "Avg bps ";
			}
			
			var autil = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"interface","index_graph_type":"'+unidad+'","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, autil, "containerChartPerformance", "autil", null, true);

		},drawInterfaceErrors: function(){
			drawElementsPerformance.chartIdPerformance = "5";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			drawElementsPerformance.metricUnit = "Percentage";
			
			var errpkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "errpkts_hc","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, errpkts_hc, "containerChartPerformance", "errpkts_hc",null, true);

		},drawInterfacePkts: function(){
			drawElementsPerformance.chartIdPerformance = "6";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			drawElementsPerformance.metricUnit = "Packets/Second";
			
			var pkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "pkts_hc","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, pkts_hc, "containerChartPerformance", "pkts_hc",null, true);
		
		},drawInterfaceQos: function(classQos){
			drawElementsPerformance.chartIdPerformance = "7";
			//drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			//drawElementsPerformance.subtitlePerformance = classQos;
			drawElementsPerformance.metricUnit = "Avg Bits Per Second";
			var DropByteOut = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"DropByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};			
			var PrePolicyByteOut = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"PrePolicyByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, DropByteOut, "containerChartPerformance", "DropByte-Out","#0C66ED");
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, PrePolicyByteOut, "containerChartPerformance", "PrePolicyByte-Out","#2BC70D");
			
			if(drawElementsPerformance.qosIn){
				var DropByteIn = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-in","index_graph_type": "cbqos-in","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"DropByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};			
				var PrePolicyByteIn = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-in","index_graph_type": "cbqos-in","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"PrePolicyByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};
				
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, DropByteIn, "containerChartPerformance", "DropByte-In","#FF0D45");
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, PrePolicyByteIn, "containerChartPerformance", "PrePolicyByte-In","#33297A");
			}

		},drawChartCPUHuawei: function(){
			drawElementsPerformance.chartIdPerformance = "8";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "CPU Util";
			drawElementsPerformance.metricUnit = "% CPU Util.";
			var avgBusy1 = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cpu-huawei","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy1, "containerChartPerformance", "avgBusy1", "#0C66ED", false);

			
		},drawChartMemHuawei: function(){
			drawElementsPerformance.chartIdPerformance = "9";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Memory Util";
			drawElementsPerformance.metricUnit = "% Memory Util.";
			var memoryH = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"mem-proc-huawei","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, memoryH, "containerChartPerformance", "memoryH", "#0C66ED", false);

			
		},drawChartsPerformance: function(url, params, container, labelMetric, color, otherMetrics){
			
			$( "#" + container ).mask("Waiting...");
			
			function onDataReceived(series) {
				drawElementsPerformance.dataChartPerformance.push(series);
				cnocConnector.drawChartPerformance(drawElementsPerformance.dataChartPerformance, container, otherMetrics);		
				$( "#" + container ).unmask();
	       	}
			
			$.ajax({
	   			type : 'GET',
	   			dataType : 'jsonp',
	   			url : url,
	   			data : params,
	   			error : function(jqXHR, textStatus, errorThrown) {
	   				console.log(jqXHR);
	   			},
	   			success: function(response) {	   				

	   				var dataChart = "";
	   				if(labelMetric === "pkts_hc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "availability" || labelMetric === "upsvoltin" || labelMetric === "upsvoltout" || labelMetric === "memoryH"){	   					
	   					var json = response.replyData.data;
	   					var colorP = ["#0FFF00","#FFBB00","#0061FF","#33297A","#A80DFF","#C4FF0D","#FF0D45","#FF8A0D"];
	   					for(var idx=0; idx<json.length; idx++){
	   						dataChart = "";
	   						var jsonData = response.replyData.data[idx].data;
	   						//var colorP = response.replyData.data[idx].color;
	   						var name = response.replyData.data[idx].name;
	   						dataChart = {color:colorP[idx], name:name, data: jsonData};
	   						onDataReceived(dataChart);
	   					}
	   				}else{
	   					dataChart = {color:color, name:labelMetric, data: response.replyData.data[0].data};
	   					onDataReceived(dataChart);
	   				}	   				
	   				
	   			}
	   		});
			
		},refreshChart:function(){
			
			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
			var endDate = ((new Date().getTime()).toString()).substring(0,10);

			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.endUnix = endDate;
			drawElementsPerformance.endDate = "";
			drawElementsPerformance.startDate = startDate;
			
			if(drawElementsPerformance.chartIdPerformance === "1"){
				drawElementsPerformance.drawChartCPU();
			}else if(drawElementsPerformance.chartIdPerformance === "2"){
				drawElementsPerformance.drawChartMemoryIO();
			}else if(drawElementsPerformance.chartIdPerformance === "3"){
				drawElementsPerformance.drawChartMemoryProc();
			}else if(drawElementsPerformance.chartIdPerformance === "4"){
				drawElementsPerformance.drawInterfaceUtil("autil");
			}else if(drawElementsPerformance.chartIdPerformance === "5"){
				drawElementsPerformance.drawInterfaceErrors();
			}else if(drawElementsPerformance.chartIdPerformance === "6"){
				drawElementsPerformance.drawInterfacePkts();
			}else if(drawElementsPerformance.chartIdPerformance === "7"){
				drawElementsPerformance.drawInterfaceQos();
			}else if(drawElementsPerformance.chartIdPerformance === "8"){
				//drawElementsPerformance.drawInterfaceQos();
			}
			
		}		
		/*,drawChartPerformanceMemory: function(container, divTable){
		console.log("uno");
		$("#"+container).append("<div id='"+divTable+"' class='placeholder' style='height: 200px;'></div>");
		
		var MemoryFreeIO = {"jsonRequest":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryFreeIO"}}}'};
		var MemoryFreePROC = {"jsonRequest":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryFreePROC"}}}'};
		var MemoryUsedIO = {"jsonRequest":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryUsedIO"}}}'};
		var MemoryUsedPROC = {"jsonRequest":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryUsedPROC"}}}'};
		
		//this.drawChartsP(cnocConnector.service1, MemoryFreeIO, divTable, "MemoryFreeIO");
		this.drawChartsP(cnocConnector.service1, MemoryFreePROC, divTable, "MemoryFreePROC");
		//this.drawChartsP(cnocConnector.service1, MemoryUsedIO, divTable, "MemoryUsedIO");
		this.drawChartsP(cnocConnector.service1, MemoryUsedPROC, divTable, "MemoryUsedPROC");
		
	},drawChartsP: function(url, params, divTable, labelMetric){
		console.log("dos");

		$(".placeholder").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x);
			$("#y").text(pos.y.toFixed(2));
			
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0],
					y = item.datapoint[1].toFixed(2);
					showTooltip(item.pageX, item.pageY, new Date((x/1000) * 1000) + " = " + y);	
				}			
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
		
		function onDataReceived(series) {
			console.log("tres");
			drawElementsPerformance.dataChartMemory.push(series);
           	$.plot("#"+divTable, drawElementsPerformance.dataChartMemory,options_plot);
       	}
		
		$.ajax({
	   			type : 'GET',
	   			dataType : 'jsonp',
	   			url : url,
	   			data : params,
	   			error : function(jqXHR, textStatus, errorThrown) {
	   				console.log("cuatro");
	   				console.log(jqXHR);
	   			},
	   			//success : onDataReceived
	   			success: function(response) {
	   				console.log(response);
	   				var dataChart = {label:labelMetric, data: response.replyData.data[0].data};
	   				onDataReceived(dataChart);
	   			}
	   		});
	},drawPerformancexxxxx: function(datos, container, divTable){
		
		console.log(datos);
		
		$("#"+container).append("<div id='"+divTable+"' class='placeholder' style='height: 200px;'></div>");
		
		/*

		$("#"+container).append("<p id='choices' style='float:right; width:135px;'></p>");
		
		
		
		var datasets = {
				"usa": {
					label: "USA",
					data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
				},        
				"russia": {
					label: "Russia",
					data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
				},
				"uk": {
					label: "UK",
					data: [[1988, 62982], [1989, 62027], [1990, 60696], [1991, 62348], [1992, 58560], [1993, 56393], [1994, 54579], [1995, 50818], [1996, 50554], [1997, 48276], [1998, 47691], [1999, 47529], [2000, 47778], [2001, 48760], [2002, 50949], [2003, 57452], [2004, 60234], [2005, 60076], [2006, 59213]]
				},
				"germany": {
					label: "Germany",
					data: [[1988, 55627], [1989, 55475], [1990, 58464], [1991, 55134], [1992, 52436], [1993, 47139], [1994, 43962], [1995, 43238], [1996, 42395], [1997, 40854], [1998, 40993], [1999, 41822], [2000, 41147], [2001, 40474], [2002, 40604], [2003, 40044], [2004, 38816], [2005, 38060], [2006, 36984]]
				},
				"denmark": {
					label: "Denmark",
					data: [[1988, 3813], [1989, 3719], [1990, 3722], [1991, 3789], [1992, 3720], [1993, 3730], [1994, 3636], [1995, 3598], [1996, 3610], [1997, 3655], [1998, 3695], [1999, 3673], [2000, 3553], [2001, 3774], [2002, 3728], [2003, 3618], [2004, 3638], [2005, 3467], [2006, 3770]]
				},
				"sweden": {
					label: "Sweden",
					data: [[1988, 6402], [1989, 6474], [1990, 6605], [1991, 6209], [1992, 6035], [1993, 6020], [1994, 6000], [1995, 6018], [1996, 3958], [1997, 5780], [1998, 5954], [1999, 6178], [2000, 6411], [2001, 5993], [2002, 5833], [2003, 5791], [2004, 5450], [2005, 5521], [2006, 5271]]
				},
				"norway": {
					label: "Norway",
					data: [[1988, 4382], [1989, 4498], [1990, 4535], [1991, 4398], [1992, 4766], [1993, 4441], [1994, 4670], [1995, 4217], [1996, 4275], [1997, 4203], [1998, 4482], [1999, 4506], [2000, 4358], [2001, 4385], [2002, 5269], [2003, 5066], [2004, 5194], [2005, 4887], [2006, 4891]]
				}
			};

			// hard-code color indices to prevent them from shifting as
			// countries are turned on/off

			var i = 0;
			$.each(datasets, function(key, val) {	
				val.color = i;
				++i;
			});

			// insert checkboxes 
			var choiceContainer = $("#choices");
			$.each(datasets, function(key, val) {
				choiceContainer.append("<br/><input type='checkbox' name='" + key +
					"' checked='checked' id='id" + key + "'></input>" +
					"<label for='id" + key + "'>"
					+ val.label + "</label>");
			});

			choiceContainer.find("input").click(plotAccordingToChoices);

			function plotAccordingToChoices() {

				var data = [];

				choiceContainer.find("input:checked").each(function () {
					var key = $(this).attr("name");
					if (key && datasets[key]) {
						data.push(datasets[key]);
					}
				});

				if (data.length > 0) {
					$.plot("#"+divTable, data,options_plot);
				}
			}

			plotAccordingToChoices();*/
		
		/*
		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

		// A null signifies separate line segments

		var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];

		*/
		/*
		$(".placeholder").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x);
			$("#y").text(pos.y.toFixed(2));
			
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0],
					y = item.datapoint[1].toFixed(2);
					showTooltip(item.pageX, item.pageY, new Date((x/1000) * 1000) + " = " + y);	
				}
			
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
		
		$.plot("#"+divTable, [{
			label:"MemoryFreePROC",
			data: datos.replyData.data[0].data
		}],options_plot);
	}*/
};
