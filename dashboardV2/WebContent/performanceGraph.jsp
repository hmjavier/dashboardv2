<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>:::Customer Network Operation Center (CNOC):::</title>
	<link rel="icon" type="image/x-icon" href="cnoc.ico" />
	<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrapW.css">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">
	
	<!-- jQuery multiselect -->
	<link href="css/bootstrap-multiselect.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	<link rel="stylesheet" type="text/css" href="js/TableTools/css/TableTools.css">
	
	<!-- PAGE THEME WHITE -->
	
	<!-- <link rel="stylesheet" type="text/css" href="css/performance.css">-->
	<link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">

	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">
	
	<!-- jQuery Datepicker -->
	<link rel="stylesheet" type="text/css" href="css/datepicker.css">
	
	
	<style>
		.tooltipMap{
			color: #000000;
		}	
		#tooltip{
			z-index: 9000;
		}
		.treeNode{
			font-size: 10px;
		}
		
		.treeNodeDetail{
			font-size: 9px;
		}
		
		.listNodesF{
			font-size: 10px;
		}
	</style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
	<div class="overlay" id="overlay" style="display:none;"></div>
	<div class="box panel panel-primary" id="box" >
		<div class="panel-heading">
			<h3 id="headerGridsDetailG" class="panel-title" style="font-size-adjust: inherit;"></h3>
		</div>
		<a class="boxclose" id="boxclose"></a>  
	  <div id="tTops"></div>
	</div>
    <div id="wrapper">
		
        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        	<!-- 
        	<div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Dashboard CNOC</a>
            </div>
            -->
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
				<div id="cmbCliente">
					</br>
					<select id="SelectCustomer" data-placeholder="Select Customer" style="width:90%;" tabindex="2"></select>
				</div>      
            </div>               
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">  
    			<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa "></i> Theme <b class="caret"></b></a>
                    <ul class="dropdown-menu" id="navTheme">
                        <li>
	                        <a href="#" class="themeW" rel="css/bootstrapW.css"><i class="fa fa-fw fa-dashboard"></i> White </a>
	                    </li>
	                    <li>
	                        <a href="#" class="themeB" rel="css/bootstrap.css"><i class="fa fa-fw fa-warning"></i> Black </a>
	                    </li>
                    </ul>
                </li>
    			<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-dashboard"></i> Dashboards <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
	                        <a href="main.jsp"><i class="fa fa-fw fa-dashboard"></i> Home </a>
	                    </li>
	                    <li>
	                        <a href="incidents.jsp"><i class="fa fa-fw fa-warning"></i> Incidents </a>
	                    </li>
	                    <li>
	                        <a href="changes.jsp"><i class="fa fa-fw fa-refresh"></i> Changes </a>
	                    </li>
	                    <li>
	                        <a href="performance.jsp"><i class="fa fa-fw fa-bar-chart-o"></i> Performance </a>
	                    </li>
	                    <li>
	                        <a href="performanceGraph.jsp"><i class="fa fa-fw fa-bar-chart-o"></i> Performance </a>
	                    </li>
	                    <li>
	                        <a href="inventory.jsp"><i class="fa fa-fw fa-briefcase"></i> Inventory </a>
	                    </li>
                    </ul>
                </li>
    			
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> Javier Hernandez <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#" class="back textColor"><i class="fa fa-fw fa-home"></i> Home</a>
                        </li>
                        <li>
                            <a href="#" class="logout textColor"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>                
            </ul>
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">

            <div class="container-fluid">
                <!-- /.row -->


                <div class="row">
                	<div class="col-lg-3"></div>
					<div class="col-lg-6">
				    	<div class="form-group">
							<div class="input-daterange input-group" >
							    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span><input type="text" class="input-sm form-control datesPerformance" id="startDate" placeholder="Start Date">
							    <span class="input-group-addon"> to </span>			    
							    <input type="text" class="input-sm form-control datesPerformance" id="endDate" placeholder="End Date"><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							    <div class="input-group input-group-sm">
							      <span class="input-group-btn">
							        <button class="btn btn-success glyphicon glyphicon-stats" type="button" id="selectGraph">  Graph</button>
							      </span>
								</div>		    			    
							</div>			
				        </div>        			    	        
    				</div>
    				<div class="col-lg-3"></div>
                </div>
                <!-- /.row -->
				  <div class="row">
			        <div class="col-lg-4">   	
				      	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Node Resource</h3>
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
						  	<div id="cmbNodesPerformance">
								
							</div>
						  	<div id="treeContainerInterfaz"></div>
						  	<div id="treeContainerDetail"></div>  		  
						  </div>
						</div>     
				    </div>
				    
				    <div class="col-lg-8" id="GraficasPerformance">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Chart</h3>
						  	</div>
						  	<div class="panel-body">
						  		<div id="containerChartPerformance"></div>
						  	</div>
				    	</div>
				    </div>
  				</div>
				<!-- /.row -->
            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

	<!-- jQuery Version 1.11.0 -->	
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>

	<!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.js"></script>
	
	<!-- Multiselect -->
	<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
	
	<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>
		

	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsPerformanceGraph.js"></script>
	
	<!-- higcharts -->
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/exporting.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
		
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>
	
	<!-- date Picker -->
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>

		
	<script type="text/javascript">
	
	var stylesMap = null;
	
	$(document).ready(function(){
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service2 = serviceG3;
			    		
			    }
			});
	
		 	drawElementsPerformanceGraph.init();

		 	$('.datesPerformance').datepicker({
				format: "dd-M-yyyy",
				todayBtn: true,
			    autoclose: true,
			    todayHighlight: true//,
			    //startDate: '-5d'
			});
			
			$("#selectGraph").click(function(event){
				
				$("#containerChartPerformance").empty();

				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();

				if(startDate === "" || endDate === "" ){
					alert("Elige un rango de fecha");
				}else{
					var nodes = [];
		            
		            $('option:selected', $('#SelectNode')).each(function() {
		            	nodes.push($(this).val());
		            });
					
					if(nodes.length<1){
						alert("Elija un nodo");
					}else{
						
						var sD = new Date(startDate);
						startDate = ((sD.getTime()/1000));
						
						var eD = new Date(endDate);
						endDate = ((eD.getTime()/1000));
						
						console.log(nodes);
						for(var idx=0; idx<nodes.length; idx++){
							var tmp = nodes[idx].split("|");
							var name = tmp[0];
							var nmis = tmp[1];
							drawElementsPerformanceGraph.containerChart = "containerChartPerformance"+idx;
							drawElementsPerformanceGraph.nodePerformance = name;
							drawElementsPerformanceGraph.nmis = nmis;
							//drawElementsPerformanceGraph.nmis = "10.237.7.25";
							drawElementsPerformanceGraph.dataChartPerformance.length = 0;
							drawElementsPerformanceGraph.endUnix = endDate;
							drawElementsPerformanceGraph.endDate = "";
							drawElementsPerformanceGraph.startDate = startDate;
							console.log(name);
							console.log(nmis);
							console.log(drawElementsPerformanceGraph.containerChart);
							//drawElementsPerformanceGraph.drawChartCPU(drawElementsPerformance.nodePerformance, drawElementsPerformance.startDate, drawElementsPerformance.endDate, drawElementsPerformance.endUnix);
							drawElementsPerformanceGraph.drawChartCPU();
						}					
					}
				}
			});
			
			Highcharts.setOptions({
		        global: {
		            useUTC: false
		        }
		    });
		 	
		 	
			$( ".logout").click(function(event){	
				logout();
			});
			
			$( ".back").click(function(event){
				home();
			});
			
			
			$(".themeW").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename, false);			
				Highcharts.setOptions(Highcharts.themeW);
				drawElementsPerformance.refreshChart();
				//stylesMap = null;
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsPerformance.refreshChart();
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});

			/*var refresh = setInterval(function(){
				drawElementsPerformance.refreshChart();
			},cnocConnector.refresh);*/
	});
	</script>


</body>

</html>
