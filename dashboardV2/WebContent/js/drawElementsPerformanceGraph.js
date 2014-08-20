/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsPerformanceGraph = {
		containerChart:"",
		dataChartInterface : [],
		nodePerformance : "",
		nmis : "",
		idResourceInterfaz: "",
		intfNodePerformance:"",
		subtitlePerformance:"",
		chartIdPerformance:"",
		metricUnit:"",
		endUnix: "",
		endDate: "",
		startDate: "",
		
		init : function(codeNet) {			
			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				/*Genera Menu*/
				generateMenu();
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsPerformanceGraph.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){		
			cnocConnector.invokeMashup(cnocConnector.service2, {"codenet" : codenet},drawElementsPerformanceGraph.drawListNodes, "listNodes", "listNodesP");
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "performanceGraph");
			drawElementsPerformanceGraph.builder($("#SelectCustomer").val());

		},drawListNodes: function (datos, container, divTable){
			
			$( "#cmbNodesPerformanceC" ).mask("Waiting...");
			var selText = cnocConnector.drawSelectNodePerformanceGraph(datos, "SelectNode", "performance");

		},drawChartHealth:function(name){
			
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "Availability";
			drawElementsPerformanceGraph.metricUnit = "% Health Statistics";
			var availability = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"health","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, availability, drawElementsPerformanceGraph.containerChart, "availability", "#0C66ED", false, name);
			
		},drawChartCPU: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "CPU Util";
			drawElementsPerformanceGraph.metricUnit = "% CPU Util.";
			var cpu = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cpu","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, cpu, drawElementsPerformanceGraph.containerChart, "cpu", "#0C66ED", false, name);	
			
		},drawChartMemoryIO: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "2";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.idResourceInterfaz = "";
			drawElementsPerformanceGraph.metricUnit = "% Mem. Utilisation";
			drawElementsPerformanceGraph.subtitlePerformance = "Mem Util IO";
			//var MemoryFreeIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformanceGraph.nodePerformance+'","translation":"","field":"MemoryFreeIO"}}'};
			//var MemoryUsedIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformanceGraph.nodePerformance+'","translation":"","field":"MemoryUsedIO"}}'};
			var MemoryIO = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"mem-io","node":"'+name+'","translation":"","resource":"nodehealth","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, MemoryIO, drawElementsPerformanceGraph.containerChart, "MemoryIO", "#0C66ED", false, name);
			//drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, MemoryUsedIO, "containerChartPerformance", "MemoryUsedIO","#2BC70D", false);
		},drawChartMemoryProc: function(name){
			
			drawElementsPerformanceGraph.chartIdPerformance = "3";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.idResourceInterfaz = "";
			drawElementsPerformanceGraph.metricUnit = "% Mem. Utilisation";
			drawElementsPerformanceGraph.subtitlePerformance = "Mem Util PROC";

			var MemoryProc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"mem-proc","node":"'+name+'","translation":"","resource":"nodehealth","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, MemoryProc, drawElementsPerformanceGraph.containerChart, "MemoryProc", "#0C66ED", false, name);
		},drawInterfaceUtil: function(name, idResourceInterfaz){		
			
			drawElementsPerformanceGraph.chartIdPerformance = "4";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.metricUnit = "% Avg Util ";
			var autil = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"interface","index_graph_type": "autil","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, autil, drawElementsPerformanceGraph.containerChart, "autil", null, false, name);
			
		},drawInterfaceErrors: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "5";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.metricUnit = "Percentage";
			
			var errpkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "errpkts_hc","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, errpkts_hc, drawElementsPerformanceGraph.containerChart, "errpkts_hc",null, true, name);
			
		},drawInterfacePkts: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "6";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance += drawElementsPerformanceGraph.intfNodePerformance;
			drawElementsPerformanceGraph.metricUnit = "Packets/Second";
						
			var pkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "pkts_hc","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};			
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, pkts_hc, drawElementsPerformanceGraph.containerChart, "pkts_hc",null, true, name);
			
			//{"model":"nmis_rrd","model_view":"graph","parameters":{"1405040812":"10-Jul-2014","end_date_raw":1405040812,"start_date_raw":1404436012,"graph_type":"pkts_hc","index_graph_type": "pkts_hc","resource_index": "5","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"","item":""}}
			
			//sample utilizacion in/out
			//{"model":"nmis_graph","model_view":"raw","parameters":{"1405040812":"10-Jul-2014","end_date_raw":1405040812,"start_date_raw":1404436012,"graph_type":"interface", "lineType": "line","index_graph_type": "autil","resource_index": "5","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"","item":"","axis":"0"}}
			
			//sample pkts_hc in/out
			//{"model":"nmis_graph","model_view":"raw","parameters":{"1405040812":"10-Jul-2014","end_date_raw":1405040812,"start_date_raw":1404436012,"graph_type":"pkts_hc", "lineType": "line","index_graph_type": "pkts_hc","resource_index": "5","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"","item":"","axis":"0"}}
			
			//{"model":"nmis_graph","model_view":"raw","parameters":{"1405040812":"10-Jul-2014","end_date_raw":1405040812,"start_date_raw":1404436012,"graph_type":"pkts_hc", "lineType": "line","index_graph_type": "pkts_hc","resource_index": "5","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"","item":"","axis":"0"}}
			
		},drawInterfaceQos: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "7";
			drawElementsPerformanceGraph.metricUnit = "";
			
			var qos =  {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, qos, drawElementsPerformanceGraph.containerChart, "qos",null, true, name);
			//var DropByte = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformanceGraph.idResourceInterfaz+'","node":"'+.nodePerformance+'","translation":"","field":"DropByte","item":"'+classQos+'"}}'};
			//var PrePolicyByte = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformanceGraph.idResourceInterfaz+'","node":"'+drawElementsPerformanceGraph.nodePerformance+'","translation":"","field":"PrePolicyByte","item":"'+classQos+'"}}'};
			//{"model":"nmis_rrd","model_view":"graph","parameters":{"1405040812":"10-Jul-2014","end_date_raw":1405040812,"start_date_raw":1404436012,"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "5","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"PrePolicyByte","item":"class-default--WAN--Precedencia2"}}
			//drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, DropByte, "containerChartPerformance", "DropByte","#0C66ED");
			//drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, PrePolicyByte, "containerChartPerformance", "PrePolicyByte","#2BC70D");
			
		},drawChartsPerformance: function(url, params, container, labelMetric, color, otherMetrics, name){
			
			var containerT =  container.split("-");
			var result =  containerT[1] %= 2;
			
			var dataChartPerformance = [];
			
			function onDataReceived(series) {
				//drawElementsPerformanceGraph.dataChartPerformance.push(series);
				//cnocConnector.drawChartPerformanceGraph(drawElementsPerformanceGraph.dataChartPerformance, container, otherMetrics);
				dataChartPerformance.push(series);				
				cnocConnector.drawChartPerformanceGraph(dataChartPerformance, container, otherMetrics, name);
	       	}
			
			//if((name.indexOf("_UPS") < 0) && labelMetric === "cpu"){
				
				if(result == 1){
					$("#containerChartPerformance1").append("<div id="+container+" class='panel panel-primary'><div>");
				}else{
					$("#containerChartPerformance2").append("<div id="+container+" class='panel panel-primary'><div>");
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
		   				if(labelMetric === "pkts_hc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "cpu" || labelMetric === "availability" || labelMetric === "MemoryIO" || labelMetric === "MemoryProc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "qos"){	   					
		   					var json = response.replyData.data;
		   					var colorP = ["#0FFF00","#FFBB00","#0061FF","#33297A","#A80DFF","#C4FF0D","#FF0D45","#FF8A0D"];
		   					for(var idx=0; idx<json.length; idx++){
		   						dataChart = "";
		   						var jsonData = response.replyData.data[idx].data;
		   						var nameGraph = response.replyData.data[idx].name;
		   						
		   						if(labelMetric === "autil"){
		   							drawElementsPerformanceGraph.subtitlePerformance = response.replyData.options.titleText;
		   						}
		   						
		   						dataChart = {color:colorP[idx], name:nameGraph, data: jsonData};
		   						onDataReceived(dataChart);
		   					}
		   				}else{
		   					dataChart = {color:color, name:labelMetric, data: response.replyData.data[0].data};
		   					onDataReceived(dataChart);
		   				}	   				
		   				
		   			}
		   		});
				
			//}
			
			
			
		},drawInterfacesNodes:function(datos){
			$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
			try{
				if (datos.results.datum.length > 1) {
					for(var i=0; i<datos.results.datum.length; i++){
						var nodeTmp = datos.results.datum[i].url.toString().split("/");
						var node = nodeTmp[4];
						var interfaces = node +"|"+datos.results.datum[i].tokens[1]+"|"+datos.results.datum[i].tokens[2]+"|"+drawElementsPerformanceGraph.nmis;
						drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
					}					
				}else{
					var nodeTmp = datos.results.datum.url.toString().split("/");
					var node = nodeTmp[4];
					var interfaces = node +"|"+datos.results.datum.tokens[1]+"|"+datos.results.datum.tokens[2]+"|"+drawElementsPerformanceGraph.nmis;
					drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
				}
			}catch(e){
				console.log(e);
			}		

			$("#cmbNodesPerformanceInterfaz").empty();
			$("#cmbNodesPerformanceInterfaz").append("<select id='cmbInterfazGraph' data-placeholder='Select Interfaz' multiple='multiple' style='width:100%; margin-left: 5%;' ></select>");
			
			if (drawElementsPerformanceGraph.dataChartInterface.length > 1) {
				for ( var i = 0; i < drawElementsPerformanceGraph.dataChartInterface.length; i++) {
					
					var data = drawElementsPerformanceGraph.dataChartInterface[i].toString().split("|");
					
					jQuery("#cmbInterfazGraph").append(
							"<option value='"
									+ data[0]+"|"+data[2]+"|"+data[3]+"'>"
									+ data[0]+"|"+data[1]
									+ "</option>");
				}
			}else{
				var data = drawElementsPerformanceGraph.dataChartInterface.toString().split("|");
				
				jQuery("#cmbInterfazGraph").append(
						"<option value='"
								+ data[0]+"|"+data[2]+"|"+data[3]+"'>"
								+ data[0]+"|"+data[1]
								+ "</option>");
			}
			
 			
 			$('#cmbInterfazGraph').multiselect({
	        	includeSelectAllOption: true,
	        	enableFiltering: true,
	        	maxHeight: 450
	        });

 			$( "#cmbNodesPerformanceInterfazC" ).unmask();
		},refreshChart:function(){
			
			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
			var endDate = ((new Date().getTime()).toString()).substring(0,10);
			
			drawElementsPerformanceGraph.dataChartPerformance.length = 0;
			drawElementsPerformanceGraph.endUnix = endDate;
			drawElementsPerformanceGraph.endDate = "";
			drawElementsPerformanceGraph.startDate = startDate;
			
			if(drawElementsPerformanceGraph.chartIdPerformance === "1"){
				drawElementsPerformanceGraph.drawChartCPU();
			}else if(drawElementsPerformanceGraph.chartIdPerformance === "2"){
				drawElementsPerformanceGraph.drawChartMemoryIO();
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
			drawElementsPerformanceGraph.dataChartMemory.push(series);
           	$.plot("#"+divTable, drawElementsPerformanceGraph.dataChartMemory,options_plot);
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