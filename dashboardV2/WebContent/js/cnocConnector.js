var cnocConnector = {
	themeMapa: '',	
	refresh: 0,	
	codeNetGlobal : '',
	nodeGlobal : '',
	hostname : '',
	logout : '',
	ipserver : '',
	incidents : '',	
	
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) {	
		$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				url : invokeUrl,
				data : params,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				},
				success : function(response) {
					try {						
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboard/index.html";
						}
					} catch (err) {
						//console.log(invokeUrl);
						$.ajax({
							type : 'GET',
							dataType : 'jsonp',
							url : invokeUrl,
							data : params,
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
							},
							success : function(response) {
								//console.log(response);
								callback(response, divcontainer, divelements);
								$( "#" + divcontainer ).unmask();
							}
						});
					}
				}
			});
		} catch (error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},
	/*
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) {
		$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : invokeUrl,
				data : params,
				statusCode : {
					401 : function() {
						alert('Session Time Out');
						window.location = "/dashboardV2/index.html";
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				},
				success : function(response) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboardV2/index.html";
						}
					} catch (err) {
						$.ajax({
							type : 'GET',
							dataType : 'jsonp',
							url : invokeUrl,
							data : params,
							error : function(jqXHR, textStatus, errorThrown) { console.log(jqXHR); },
							success: function(response){
								callback(response, divcontainer,divelements);
								$( "#" + divcontainer ).unmask();
							}
						});
					}
				}
			});
		} catch(error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},*/
	drawGrid : function(container, divTable, rowsData, rowsHeaders, pagination) {
		jQuery("#" + container).empty();		
				
		var dTable;
		if(divTable === "listNodesG" || divTable ==="listNodeDetailG" || divTable === "listNodesP" || divTable === "listInterfacesG"){
			
			var scrollY = "330";
			if(divTable === "listNodesP"){
				scrollY = "330";
			}
			
			jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '">'+rowsData+'</table>');
			dTable = jQuery("#" + divTable).dataTable({
				"sDom": 'T<"clear">lfrtip',		
		        /*"oTableTools": {
		            "sSwfPath": "js/TableTools/swf/copy_csv_xls_pdf.swf"
		        },*/
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			        ]
			    },
				 "aoColumns" : rowsHeaders,
				 "sScrollX": "100%",
				 "sScrollXInner": "365%",
				 "sScrollY": scrollY,
				 "bScrollCollapse": true,
				 "bProcessing": true,
				 "iDisplayLength": 20
			});
			
			setTimeout(function(){
				 dTable.fnAdjustColumnSizing();
			 },10);
			
		}else{
			var scrollY = "200";
			if(divTable === "listCustomerCostosC"){
				scrollY = "320";
			}else if(divTable === "listBizserviceTi"){
				scrollY = "400";
			}
			
			if(divTable === "tableInventory"){
				scrollY = "600";
				
				jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '"></table>');
				dTable = jQuery("#" + divTable).dataTable({
					"aaData" : rowsData,
					"aoColumns" : rowsHeaders,
					"sDom": 'T<"clear">lfrtip',
					"oTableTools": {
				        "aButtons": [
				            "copy",
				            "csv",
				            "xls"
				            ]
				    },
					"sScrollX": "100%",
					"sScrollXInner": "100%",
					"sScrollY": scrollY,
					"bScrollCollapse": true,
					"bProcessing": true
				});				
			
			} else {
				jQuery("#" + container).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divTable + '"></table>');
				dTable = jQuery("#" + divTable).dataTable({
					"sDom": 'T<"clear">lfrtip',			
			        /*"oTableTools": {
			            "sSwfPath": "js/TableTools/swf/copy_csv_xls_pdf.swf"
			        },*/
					"oTableTools": {
				        "aButtons": [
				            "copy",
				            "csv",
				            "xls"
				            ]
				    },
					"aaData" : rowsData,
					"aoColumns" : rowsHeaders,
					"sScrollX": "100%",
					"sScrollXInner": "100%",
					"sScrollY": scrollY,
					"bScrollCollapse": true,
					"bProcessing": true
				});
			}
		
			 setTimeout(function(){
				 dTable.fnAdjustColumnSizing();
			 },10);
		}
		
		
		if(divTable === "listNodesP"){
			$("#" + divTable).delegate("tbody tr", "click", function () {					
				dTable.$('tr.row_selected').removeClass('row_selected');
				
				$(this).addClass('row_selected');
				
				var nTds = $('td', dTable.$('tr.row_selected'));
				var node = $(nTds[0]).text();
				$( "#nodeResources").mask("Waiting...");
				$(".form-control").val("");
				cnocConnector.invokeMashup(cnocConnector.service1, {"endpoint" : "http://10.237.7.25/omk/opCharts/nodes/"+node+"/resources/cbqos-out/indicies.json"},drawElementsPerformance.selectInterfaz, "SelectInterfaz", "cmbInterfazP");
			});
			
		}
		
		if(divTable === "listIncidentsI"){
			$("#" + divTable).delegate("tbody tr", "click", function () {					
				dTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');
				
				var nTds = $('td', dTable.$('tr.row_selected'));
				var id = $(nTds[3]).text();
				var idIncident = $(nTds[0]).text();

				$(".form-control").val("");
				cnocConnector.nodeGlobal = id;
				cnocConnector.invokeMashup(cnocConnector.serviceI18, {"node" : id},drawElementsIncidents.drawGetModel, "listNodeDetail", "listNodeDetailI");
				cnocConnector.invokeMashup(cnocConnector.serviceI15, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.detailIncidentsNode, "listIncidentsRelated", "listIncidentsRelatedI");
				cnocConnector.invokeMashup(cnocConnector.serviceI16, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.detailChangesNode, "listChangesRelated", "listChangesRelatedI");
				cnocConnector.invokeMashup(cnocConnector.serviceI17, {"incident_id" : idIncident},drawElementsIncidents.activitiesIncidents, "activitiesIncidents", "activitiesIncidentsI");
			});
		}
		
		if (divTable === "listBizserviceTi") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');					
					var nTds = $('td', dTable.$('tr.row_selected'));

					var modal = bootbox.dialog({
					    message: $("#frm").html(),
					    title: "Your awesome modal",
					    buttons: [{
					      label: "Save",
					      className: "btn btn-primary",
					      callback: function() {
					        var titleTicket = modal.find(".titleTicket").val();
					        var subtitleTicket = modal.find(".subtitleTicket").val();
					        var contactTicket = modal.find(".contactTicket").val();
					        
					        var data = {
									"network_code":$(nTds[0]).text(),
									"company":$(nTds[1]).text(),
									"sector":$(nTds[2]).text(),
									"logical_name":$(nTds[3]).text(),
									"unique_identifier":$(nTds[4]).text(),
									"location":$(nTds[5]).text(),
									"location_code":$(nTds[6]).text(),
									"titleTicket": titleTicket,
									"subtitleTicket": subtitleTicket,
									"contactTicket": contactTicket
								};					        
					        //console.log(data);
					        return false;
					      }
					    }, {
					      label: "Close",
					      className: "btn btn-default",
					      callback: function() {
					        console.log("just do something on close");
					      }
					    }],
					    show: false,
					    onEscape: function() {
					      modal.modal("hide");
					    }
					  });

					  modal.modal("show");
					
					//console.log(data);
									
					/*bootbox.dialog({
		                  message: $("#frm").html(),
		                  title: "Custom title",         
		                  buttons: {
		                    success: {
		                      label: "Success!",
		                      className: "btn-info",
		                      callback: function(event) {
		                    	  	//console.log($("#frm titleTicket"));
		                            console.log($("#frm .titleTicket").val);
		                    	  console.log(find("#frm .titleTicket").val);		                    	  
		                      }
		                    }
		                  }
		            });*/
					
			});
		}

		
		if (divTable === "listNodesG") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var id = $(nTds[0]).text();

					$(".form-control").val("");
					cnocConnector.nodeGlobal = id;
					
					cnocConnector.invokeMashup(cnocConnector.service24, {"node" : id},drawElementsGral.drawGetModel, "listNodeDetail", "listNodeDetailG");
					cnocConnector.invokeMashup(cnocConnector.service22, {"hostname" : id,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedIncidentsC", "relatedIncidentsCG");
					cnocConnector.invokeMashup(cnocConnector.service23, {"hostname" : id,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedChangesC", "relatedChangesCG");
			});
		}
		
		if (divTable === "changesListTable") {
			
			/* Add a click handler to the rows - this could be used as a callback */
			$("#" + divTable).delegate("tbody tr", "click", function () {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');		        
				} 
				else {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var id = $(nTds[0]).text();
					
					
					cnocConnector.invokeMashup(cnocConnector.service8, {"ci" : "'" + id + "'"}, 
							drawElements.formDetail, "detailForm1", "d");
					
					cnocConnector.invokeMashup(cnocConnector.service4, {"ci" : "'" + id + "'"}, 
							drawElements.gridChangesActivities, "tabsChangesActivities","changesListActivities");
					
					cnocConnector.invokeMashup(cnocConnector.service10, {"change_id" : id}, 
							drawElements.gridChangeTasks, "tabsChangesTasks", "changesListTasks");
				}
			});
		}
		
		if(container==="tTops"){
			modelView();
		}
		return dTable;
	},drawPanel : function(rowsData, container, idPanel) {
		jQuery("#" + container).empty();
		jQuery("#" + container).append(rowsData);
		return null;
	},drawHeader : function(rowsData, container, idHead) {
		jQuery("#" + container).append(
				'<h1 id="' + idHead
						+ '" style="text-align:center; color:#FFF">' + rowsData
						+ '</h1>');
		return null;
	},drawForm : function(container, divTable, rowsData, rowsHeaders) {
		for ( var i = 0; i < rowsData.length; i++) {
			jQuery("#detail" + i).val(rowsData[i].value);
		}

		return null;

	},drawChartGroups : function(type, container, nameChart, dataChart, categorias) {
		var optChart = {
				 chart: {
					 	renderTo : container,
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false,
		                type: type
		            },
		            title: {
		                text: null
		            },
		            xAxis: {
		                categories: categorias,
		                labels : {
							style : {
								fontSize : '8px',
								fontFamily : 'Verdana, sans-serif'
							}
						}
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'Total Nodes'
		                }
		            },
		            legend: {
		                reversed: true
		            },
		            plotOptions: {
		                series: {
		                    stacking: 'normal',
		                    events: {
		                        click: function(event) {
		                        	var status = "";
		                        	if(event.point.series.name==="Normal"){
		                        		status = "reachable";
		                        	}else if(event.point.series.name==="Warning"){
		                        		status = "degraded";
		                        	}else if(event.point.series.name==="Critical"){
		                        		status = "unreachable";
		                        	}
		                        	cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":event.point.category,"status":status},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
		                        }
		                      }
		                },
		                color: ['#FF0000','#000000']
		            },series: dataChart
		};
		return optChart;
	},drawChart : function(type, container, nameChart, dataChart, categorias) {
		var optChart = {
			chart : {
				renderTo : container,
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			},
			xAxis : {
				categories : categorias,
				labels : {
					style : {
						fontSize : '8px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			},
			credits : {
				enabled : false
			},

			title : null,/*{
				style : {
					fontWeight : 'bold',
					fontSize : '10px'
				}
			},*/
			tooltip : {
				formatter : function() {
					var s;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y;
					} else {
						s = '' + this.x + ': ' + this.y;
					}
					return s;
				}
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false
					},
					showInLegend : true
				},
				series : {
					cursor : 'pointer',
					point : {
						events : {
							click : null
						}
					}
				}
			},/*legend: {
				layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 50,
                //floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                shadow: true
			 },*/
			series : [ {
				type : type,
				name : nameChart,
				data : dataChart,
				dataLabels : {
					enabled : false,
					color : '#FFFFFF',
					align : 'right',
					style : {
						fontSize : '8px',
						fontFamily : 'Verdana, sans-serif',
						textShadow : '0 0 3px black'
					}
				}
			} ]
		};

		return optChart;
	},drawChartPerformance:function(series, container, otherMetrics){
		$('#'+container).highcharts({
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },credits: {
                enabled: false
            },title: {
                text: drawElementsPerformance.nodePerformance,
                x: -20 //center
            },
            subtitle: {
                text: drawElementsPerformance.subtitlePerformance,
                x: -20
            },xAxis: { 
            	type: 'datetime'
            },yAxis: {
            	title: {
                    text: drawElementsPerformance.metricUnit
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },exporting: {
                enabled: true,
                exportButton: {
                    enabled: true
                },
                buttons: 
                {
                    customButton:
                    {
                        //x: -600,
                    	enabled: otherMetrics,
                        symbol: 'url(http://cdn1.iconfinder.com/data/icons/fatcow/16/chart_bar.png)',
                        text: 'Metrics',
                        //x: -100,
                        symbolFill: '#B5C9DF',
                        hoverSymbolFill: '#779ABF',
                        menuItems: [
                                    {
                                        text: 'Errors Discards',
                                        onclick: function() {
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Errors Discards: ";
                                        	drawElementsPerformance.drawInterfaceErrors();
                                        }
                                    },{
                                        text: 'Interface Average',
                                        onclick: function() { 
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Interfaz Average: ";
                                        	drawElementsPerformance.drawInterfaceUtil(); 
                                        }
                                    },{
                                        text: 'PKTS_HC',
                                        onclick: function() { 
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Pkts HC: ";
                                        	drawElementsPerformance.drawInterfacePkts(); 
                                        }
                                    }                            
                                ]
                    }
                }
            },tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                borderWidth: 0
            },plotOptions: {
                spline: {
                    marker: {
                        radius: 0,
                        lineColor: '#666666',
                        lineWidth: 5
                    }
                }
            },
            series: series
        });
	},drawChartPerformanceGraph:function(series, container, otherMetrics){
		$('#'+container).highcharts({
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },credits: {
                enabled: false
            },title: {
                text: drawElementsPerformanceGraph.nodePerformance,
                x: -20 //center
            },
            subtitle: {
                text: drawElementsPerformanceGraph.subtitlePerformance,
                x: -20
            },xAxis: { 
            	type: 'datetime'
            },yAxis: {
            	title: {
                    text: drawElementsPerformanceGraph.metricUnit
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                borderWidth: 0
            },plotOptions: {
                spline: {
                    marker: {
                        radius: 0,
                        lineColor: '#666666',
                        lineWidth: 5
                    }
                }
            },
            series: series
        });
	},drawChartCostos:function(type, container, dataChart, categorias){
		var optChart = {
				chart : {
					type: type,
					renderTo : container,
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
				},
				xAxis : {
					categories : categorias,
					labels : {
						style : {
							fontSize : '8px',
							fontFamily : 'Verdana, sans-serif'
						}
					}
				},
				credits : {
					enabled : false
				},

				title : null,
				tooltip : {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	                footerFormat: '</table>',
	                shared: true,
	                useHTML: true
				},
				plotOptions : {
					column: {
	                    pointPadding: 0.2,
	                    borderWidth: 0
	                }
				},
				series : dataChart
			};

			return optChart;
	},drawSelect : function(datos, container, module) {

		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].network_code.toString() + "'>"
								+ datos.records.record[i].dept_name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option value='"
							+ datos.records.record.network_code.toString()
							+ "'>" + datos.records.record.dept_name.toString()
							+ "</option>");

		}

		$("#" + container).chosen({
			allow_single_deselect : true
		}).change(function() {
			cnocConnector.codeNetGlobal = $(this).val();
			if(module==="changes"){
				drawElements.init($(this).val());
			}else if(module==="general"){
				drawElementsGral.init($(this).val());
			}else if(module==="incidents"){
				drawElementsIncidents.init($(this).val());
			}else if(module==="performance"){
				drawElementsPerformance.init($(this).val());
			}else if(module==="performanceGraph"){
				drawElementsPerformanceGraph.init($(this).val());
			}else if(module==="tickets"){
				drawElementsTickets.init($(this).val());
			}			
		});
		cnocConnector.codeNetGlobal = $("#" + container).val();
	},drawSelectNodePerformance : function(datos, container, module) {
		
		$("#cmbNodesPerformance").empty();
		$("#cmbNodesPerformance").append("<select id='"+container+"' data-placeholder='Select Interfaz' style='width:100%; margin-left: 5%;' ><option id='' value=''></option></select>");
		//$( "#"+container ).chosen( 'destroy' );
		
		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].name.toString()+"|"+datos.records.record[i].nmisserver.toString() + "'>"
								+ datos.records.record[i].name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option rel='"+datos.records.record.nmisserver.toString()+"' value='"
							+ datos.records.record.name.toString()
							+ "'>" + datos.records.record.name.toString()
							+ "</option>");

		}
		
		/*
		if (datos.length > 1) {

			for ( var i = 0; i < datos.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos[i].toString() + "'>"
								+ datos[i].toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option value='"
							+ datos.toString()
							+ "'>" + datos.toString()
							+ "</option>");

		}*/
		
		/*$('#'+container).multiselect({
        	includeSelectAllOption: true,
        	enableFiltering: true,
        	maxHeight: 150
        });*/
		
		$("#" + container).chosen({
			allow_single_deselect : true
		}).change(function() {
			var data = $(this).val().split("|");
			var name = data[0];
			var nmis = data[1];
			//var nmis = "10.237.7.25";
			drawElementsPerformance.dataChartPerformance.length = 0;
			cnocConnector.invokeMashup(cnocConnector.service1, {
					"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json",
					"ip":nmis
				},drawElementsPerformance.selectInterfaz, "SelectInterfaz", "cmbInterfazP");			
			//drawElementsPerformance.drawChartCPU($(this).val(), "1404190800", "08-Jul-2014 00:00:00", "1404882000");
			
			drawElementsPerformance.nodePerformance = name;
			drawElementsPerformance.nmis = nmis;
			
			
			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
			var endDate = ((new Date().getTime()).toString()).substring(0,10);
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.endUnix = endDate;
			drawElementsPerformance.endDate = "";
			drawElementsPerformance.startDate = startDate;
			
			drawElementsPerformance.drawChartCPU();			
		});
		
		$( "#nodeResources").unmask();
		
	},drawSelectNodePerformanceGraph:function(datos, container, module){

		$("#cmbNodesPerformance").empty();
		$("#cmbNodesPerformance").append("<select id='"+container+"' data-placeholder='Select Interfaz' multiple='multiple' style='width:100%; margin-left: 5%;' ></select>");
		//$( "#"+container ).chosen( 'destroy' );
		
		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].name.toString()+"|"+datos.records.record[i].nmisserver.toString() + "'>"
								+ datos.records.record[i].name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option value='"
							+ datos.records.record.name.toString()
							+ "'>" + datos.records.record.name.toString()
							+ "</option>");

		}

		$('#'+container).multiselect({
        	includeSelectAllOption: true,
        	enableFiltering: true,
        	maxHeight: 450
        });

	},drawTree: function(idTree){
		drawElementsPerformance.idResourceInterfaz = "";
		$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
		$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function (e) {
			//alert($(this).text());
			var parentLi = ($(this).text()).trim();
			
			if(parentLi === "Performance" || parentLi === "Interface" || parentLi === "QOS" || parentLi === "Memory"){
				var children = $(this).parent('li.parent_li').find(' > ul > li');
		        if (children.is(':visible')) {
		    		children.hide('fast');
		    		$(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon glyphicon-plus').removeClass('glyphicon glyphicon-minus');
		        }
		        else {
		    		children.show('fast');
		    		$(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon glyphicon-minus').removeClass('glyphicon glyphicon-plus');
		        }
		        e.stopPropagation();
			}else{				
				/*drawElementsPerformance.dataChartPerformance.length = 0;
				var tmp = $(this).text().split("--");
				alert("arbol: "+tmp[2]);
				drawElementsPerformance.idResourceInterfaz = (tmp[2]).trim();
				drawElementsPerformance.drawInterfaceUtil();*/
			}

	    });
	}
};
