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

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	<link rel="stylesheet" type="text/css" href="js/TableTools/css/TableTools.css">
	
	<!-- PAGE THEME WHITE -->
	<link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">

	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">
	
	<style type="text/css">
		.chartCompaniesBySector{
			height: 570px;
		}
		
		.chartIncidentsGroups{
			height: 360px;
		}
		
		.listIncidents{
			height: 300px;
		}
		
		.listIncidentsRelated{
			height: 300px;
		}
		
		.tooltipMap{
			color: #000000;
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
			<h3 id="headerGridsDetailI" class="panel-title" style="font-size-adjust: inherit;"></h3>
		</div>
		<a class="boxclose" id="boxclose"></a>  
	  <div id="tDetailI"></div>
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
					<select id="SelectCustomer" data-placeholder="Select Customer" style="width:90%;" tabindex="2">
						<option id="clienteId" value=""></option>
					</select>
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
                	<div class="col-lg-2 col-md-6">
                	</div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
									<div class="col-xs-12 text-center">
                                        <div class="huge" id="countAllI"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Total</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                        <div class="huge" id="countOpenI"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Open</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                        <div class="huge" id="countClosedI"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Closed</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-1 col-md-6">
                        
                    </div>
                </div>
                <!-- /.row -->
				<div class="row">
					<div class="col-lg-3">
				    	<div class="panel panel-primary" id="containerChartSector">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Sector</h3>
						  	</div>
				    		<div id="chartSector" style="height: 150px;"></div>
				    	</div>
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents Phase</h3>
						  	</div>
				    		<div id="chartIncidentsPhase" style="height: 150px;"></div>
				    	</div>
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents By Status</h3>
						  	</div>
				    		<div id="chartIncidentsStatus" style="height: 150px;"></div>
				    	</div>		
				    </div>
				    <div class="col-lg-3">
				    	<div class="panel panel-primary" id="containerChartCompaniesSector">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Companies By Sector</h3>
						  	</div>
				    		<div id="chartCompaniesSector" class="chartCompaniesBySector"></div>		    		
				    	</div>
				    	<div class="panel panel-primary" id="containerChartIncidentsGroups" >
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents By Groups</h3>
						  	</div>
				    		<div id="chartIncidentsGroups" class="chartIncidentsGroups"></div>		    		
				    	</div>		
				    </div>
				    <div class="col-lg-6">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents By State</h3>
						  	</div>
				    		<div id="mapIncidents" class="chartCompaniesBySector"></div>		    		
				    	</div>		
				    </div>
				</div>
			<!-- /.row -->
			
				<br>
				<div class="row">
					<div class="col-lg-6">
			    		<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents Detail</h3>
						  	</div>
				    		<div id="listIncidents" class="listIncidents"></div>		    		
			    		</div>		
		    		</div>
				    <div class="col-lg-6">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incidents Activities</h3>
						  	</div>
				    		<div id="activitiesIncidents" class="listIncidents"></div>		    		
				    	</div>		
				    </div>
				</div>
				<!-- end/.row -->
				<div class="row">
				    <div class="col-lg-5">
				      	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Detail Node</h3>
						  </div>
						  <div class="panel-body">		  	
							<!-- <div id="listNodeDetail"></div>-->
							<div class="alert alert-info" style="display: none;" id="msgPingOnly">
							    <a href="#" class="close" data-dismiss="alert">&times;</a>
							    <strong>Note!</strong> Monitoring Ping Only.
							</div>
							<div id="listNodeDetail">	
							  	<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-12 form-group has-success">
									  <label class="control-label" for="inputSuccess">Node Name:</label>
									  <input class="form-control" type="text" id="name">
									</div>
								</div>		
										    
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-12 form-group has-success">
										<label class="control-label" for="inputSuccess">Sys Description:</label>
							    		<input class="form-control" type="text" id="sysdescr" >
							  		</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4 form-group has-success">
									  <label class="control-label" for="inputSuccess">Node Type:</label>
									  <input class="form-control" type="text" id="nodetype">
									</div>
									<div class="col-lg-4 form-group has-success">
										<label class="control-label" for="inputSuccess">Vendor:</label>
							    		<input class="form-control" type="text" id="nodevendor" >
							  		</div>
									<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Model:</label>
							    		<input class="form-control" type="text" id="model" >
							  		</div>			  					  	
								</div>				
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-6  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Serial Num:</label>
							    		<input class="form-control" type="text" id="serialnum">
							  		</div>
									<div class="col-lg-6  form-group has-success">
										<label class="control-label" for="inputSuccess">Sysname:</label>
							    		<input class="form-control" type="text" id="sysname" >
							  		</div>			  		
								</div>
								
								<div class="row" style="padding-left: 7px; padding-right: 7px;">					
							  		<!-- <div class="col-lg-6  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Last Update Sec:</label>
							    		<input class="form-control" type="text" id="lastupdatesec">
							  		</div>-->
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Sys Contact:</label>
							    		<input class="form-control" type="text" id="syscontact">
							  		</div>
									<div class="col-lg-4  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Up Time:</label>
							    		<input class="form-control" type="text" id="sysuptime">
							  		</div>
									<div class="col-lg-4  form-group has-success">
										<label class="control-label" for="inputSuccess">Last Update:</label>
							    		<input class="form-control" type="text" id="lastupdate">
							  		</div>
							  		<!-- <div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Time Column:</label>
							    		<input class="form-control" type="text" id="time_column">
							  		</div>-->
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4  form-group has-success">
										<label class="control-label" for="inputSuccess">Interface Collect:</label>
							    		<input class="form-control" type="text" id="intfcollect">
							  		</div>
							  		<div class="col-lg-4  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Processor Ram:</label>
							    		<input class="form-control" type="text" id="processorram">
							  		</div>
							  		<div class="col-lg-4  form-group has-success">
										<label class="control-label" for="inputSuccess">Memory Used I/O:</label>
							    		<input class="form-control" type="text" id="musedio">
							  		</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4  form-group has-success">
							  			<label class="control-label" for="inputSuccess">NRT:</label>
							    		<input class="form-control" type="text" id="nrt">
							  		</div>
									<div class="col-lg-4  form-group has-success">
										<label class="control-label" for="inputSuccess">Reachability:</label>
							    		<input class="form-control" type="text" id="reachability">
							  		</div>
							  		<div class="col-lg-4  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Availability:</label>
							    		<input class="form-control" type="text" id="availability">
							  		</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-6  form-group has-success">
										<label class="control-label" for="inputSuccess">Per Cpu:</label>
							    		<input class="form-control" type="text" id="per_cpu">
							  		</div>
							  		<div class="col-lg-6  form-group has-success">
							  			<label class="control-label" for="inputSuccess">Per Memory Used:</label>
							    		<input class="form-control" type="text" id="per_mused">
							  		</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-12  form-group has-success">
							    		<div id="listInterfaces"></div>
							  		</div>
								</div>
						  </div>
						  <br>
						  </div>
						</div>     
		    		</div>
		    		<div class="col-lg-7">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Related Incidents</h3>
						  	</div>
				    		<div id="listIncidentsRelated" class="listIncidentsRelated"></div>		    		
				    	</div>
				    	
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Related Changes</h3>
						  	</div>
				    		<div id="listChangesRelated" class="listIncidentsRelated"></div>		    		
				    	</div>		
				    </div>
		    		<!-- 
				    <div class="col-lg-12">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Sample</h3>
						  	</div>
				    		<div id="performance" class="placeholder" style="height: 400px;"></div>		    		
				    	</div>		
				    </div>-->
				</div>
				<!-- end/.row -->
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
	
	<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="js/TableTools/js/TableTools.js"></script>
	<script type="text/javascript" src="js/TableTools/js/ZeroClipboard.js"></script>
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsIncidents.js"></script>
	<script src="js/polygons.js"></script>
	
	<!-- higcharts -->
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/exporting.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	<!-- google maps -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>
	
	<script type="text/javascript">
	cnocConnector.refresh = <%=request.getParameter("refresh")%>
	</script>
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
			    		cnocConnector.getLdap = getLdap;
			    		cnocConnector.service1 = serviceI1;
			    		cnocConnector.service2 = serviceI2;
			    		cnocConnector.service3 = serviceI3;
			    		cnocConnector.service4 = serviceI4;
			    		cnocConnector.service5 = serviceI5;
			    		cnocConnector.service6 = serviceI6;
			    		cnocConnector.service7 = serviceI7;
			    		cnocConnector.service8 = serviceI8;
			    		cnocConnector.serviceI9 = serviceI9;
			    		cnocConnector.serviceI10 = serviceI10;
			    		cnocConnector.serviceI11 = serviceI11;
			    		cnocConnector.serviceI13 = serviceG9;
			    		cnocConnector.serviceI14 = serviceG11;
			    		cnocConnector.serviceI15 = serviceG12;
			    		cnocConnector.serviceI16 = serviceG13;
			    		cnocConnector.serviceI17 = serviceI13;
			    		cnocConnector.serviceI18 = serviceG14;
			    }
			});

			drawElementsIncidents.init();
		 	
			
			cnocConnector.invokeMashup(cnocConnector.getLdap,{},function (data){
				if(data.aut.module[0]==="CLIENTE"){
					//if(true){
					$("#containerChartCompaniesSector").remove();
					$("#containerChartSector").remove();
					$("#containerChartIncidentsGroups").show();
					$("#mapIncidents").removeClass("chartCompaniesBySector");
					$("#mapIncidents").addClass("chartIncidentsGroups");
				}else{
					$("#containerChartIncidentsGroups").hide();
				}
			}, null, null);
			 	
			
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
				stylesMap = null;
				drawElementsIncidents.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsIncidents.builder(cnocConnector.codeNetGlobal);
			});

			/*var refresh = setInterval(function(){
				drawElementsIncidents.init();
			},cnocConnector.refresh);*/
	});
	</script>


</body>

</html>
