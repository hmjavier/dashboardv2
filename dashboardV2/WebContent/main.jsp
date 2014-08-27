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
	
	<style>
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
			<h3 id="headerGridsDetailG" class="panel-title" style="font-size-adjust: inherit;"></h3>
		</div>
		<a class="boxclose" id="boxclose"></a>  
	  <div id="tTops"></div>
	</div>
    <div id="wrapper">
		<%@ include file="menu.jsp" %> 
        <div id="page-wrapper">

            <div class="container-fluid">
                <!-- /.row -->


                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
									<div class="col-xs-12 text-center">
                                        <div class="huge" id="countAll"></div>
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
                                        <div class="huge" id="countReachable"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Normal</span>
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
                                        <div class="huge" id="countDegraded"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Warning</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                        <div class="huge" id="countUnreachable"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Critical</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
				<div class="row">
				    <div class="col-lg-4">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Groups</h3>
						  	</div>
				    		<div id="chartGrupos" style="height: 500px;"></div>
				    	</div>		
				    </div>
				    <div class="col-lg-5">
				    	<div class="panel panel-primary" id="mapaAll">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Nodes By State</h3>
						  	</div>
				    		<div id="mapGral" class="mapGral"></div>
				    	</div>		
				    </div>
				    
				    <div class="col-lg-3">
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Services</h3>
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
								  <li class="tops list-group-item contadores" id="listIncidentG">				  	
								    <span class="badge" id="cIncident"></span>		    
								    <a href="#">Incidents</a>
								  </li>
								  <li class="tops list-group-item contadores" id="listChangesG">
								    <span class="badge" id="cOpen"></span>
								    <a href="#">Changes</a>
								  </li>
								  <!-- 
								  <li class="tops list-group-item">
								    <span class="badge" id="psOpen"></span>
								    <a href="#">PS</a>
								  </li>-->
					      </ul>
						  </div>
						</div>
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">TOPS</h3>
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
					        <li class="tops list-group-item contadores" id="tMemoryCountG"><a href="#">Top Memory</a></li>
					        <li class="tops list-group-item contadores" id="tCpuCountG"><a href="#">Top CPU</a></li>
					        <!-- <li class="tops list-group-item" id="tUtilCountG"><a href="#">Top Utilization</a></li>-->
					      </ul>
						  </div>
						</div>
				    </div>
			  	</div>
			<!-- /.row -->
			
				<br>
				  <div class="row">
				    <div class="col-lg-3">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Node List</h3>
						  	</div>
							<div id="listNodes" class="listNodes"></div>
							<br>
							<br>
						</div>   
				    </div>
				    <div class="col-lg-4">
				    	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Relationships</h3>
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
								  <li class="tops list-group-item contadores" id="relatedIncidents">				  	
								    <span class="badge" id="relatedIncidentsC"></span>		    
								    <a href="#">Related Incidents</a>
								  </li>
								  <li class="tops list-group-item contadores" id="relatedChanges">
								    <span class="badge" id="relatedChangesC"></span>
								    <a href="#">Related Changes</a>
								  </li>
					      </ul>
						  </div>
						</div>
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Node Resource</h3>
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
						  	<div id="treeContainerInterfaz"></div>
						  	<div id="treeContainerDetail"></div>  		  
						  </div>
						</div>						
				    </div>
				    
				    <div class="col-lg-5">
				    	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Node Detail</h3>
						  </div>
						  <div class="panel-body" style="font-size: 9px;">		  	
							<!-- <div id="listNodeDetail"></div>-->
							<!-- <div class="alert alert-info" style="display: none;" id="msgPingOnly">
							    <a href="#" class="close" data-dismiss="alert">&times;</a>
							    <strong>Note!</strong> Monitoring Ping Only.
							</div>-->
							<div id="msgPingOnly"></div>
							<div id="listNodeDetail">				
							  	<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-6 form-group has-success">
									  <label class="control-label" for="inputSuccess">Node Name:</label>
									  <input class="form-control" type="text" id="name">
									</div>
									
									<div class="col-lg-6 form-group has-success">
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
											<label class="control-label" for="inputSuccess"> </label>
								  			<a class="btn btn-primary btn-sm nodeDetailView form-control" href="#" role="button" id="nodeDetailView">View detail &raquo;</a>		
								  		</div>			  					  	
								</div>
								<!-- <div class="row" style="padding-left: 12px; padding-right: 7px;">
									
								</div>-->
								<div id="detalleNodo" class="detalleNodo row" style="display: none; padding-left: 14px; padding-right: 14px;">													
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4 form-group has-success">
								  			<label class="control-label" for="inputSuccess">Model:</label>
								    		<input class="form-control" type="text" id="model" >
								  		</div>	
										<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Serial Num:</label>
								    		<input class="form-control" type="text" id="serialnum">
								  		</div>
										<div class="col-lg-4  form-group has-success">
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
									<div class="row" style="padding-left: 12px; padding-right: 7px;">
										<a class="btn btn-primary btn-sm nodeDetailViewHide" href="#" role="button" id="nodeDetailViewHide">Hide Detail &laquo;</a>
									</div>
								</div>								
						  </div>
						  <br>
						  </div>
						</div> 
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
	<script src="js/drawElementsGral.js"></script>
	<script src="js/drawElementsPerformance.js"></script>
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
	
	<!-- TREE BOOTSTRAP -->
	<script src="js/bootstrap-tree.js" /></script>
	
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
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service5 = serviceC5;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service11 = serviceG1;
			    		cnocConnector.service12 = serviceG2;
			    		cnocConnector.service13 = serviceG3;
			    		cnocConnector.service14 = serviceG4;
			    		cnocConnector.service15 = serviceG5;
			    		cnocConnector.service16 = serviceG6;
			    		cnocConnector.service17 = serviceG7;
			    		cnocConnector.service18 = serviceG8;
			    		cnocConnector.service19 = serviceG9;
			    		cnocConnector.service20 = serviceG10;
			    		cnocConnector.service21 = serviceG11;
			    		cnocConnector.service22 = serviceG12;
			    		cnocConnector.service23 = serviceG13;
			    		cnocConnector.service24 = serviceG14;
			    		cnocConnector.service25 = serviceG15;
			    		cnocConnector.service26 = serviceG16;
			    		cnocConnector.service27 = serviceC1;
			    		cnocConnector.service28 = serviceG17;
			    		
			    }
			});
		
		 	//$( "#sortableLeft" ).sortable({revert: true});
		 
		 	$('#countAll').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":"","status":""},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			});
		 	
		 	$('#countReachable').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":"","status":"reachable"},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			});
	
		 	$('#countDegraded').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":"","status":"degraded"},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			});
		
		 	$('#countUnreachable').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":"","status":"unreachable"},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			});
			
		 	
		 	Highcharts.setOptions({
		 		//colors: ['#reachable', '#unreachable', 'degraded']
		        colors: ['#17FF00', '#FF0202', '#FFE400']		 	
		    });
		 	
		 	drawElementsGral.init();

		 	$(".tops").on("click", function() {
		    	$(".tops").removeClass("active");
		    	$(this).addClass("active");
		    });
			
		 	$('#tCpuCountG').click(function(e){
		 		$("#headerGridsDetailG").text("Top CPU");
				cnocConnector.invokeMashup(cnocConnector.service16, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.topGrid, "tTops", "tCpuG");			
			});
		 	
			$('#tMemoryCountG').click(function(e){
				$("#headerGridsDetailG").text("Top Memory");
				cnocConnector.invokeMashup(cnocConnector.service17, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.topGrid, "tTops", "tMemoryG");			
			});
			
			$('#listIncidentG').click(function(e){
				$("#headerGridsDetailG").text("Incident Detail");
				cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");			
			});
			
			$('#listChangesG').click(function(e){
				$("#headerGridsDetailG").text("Change Detail");
				cnocConnector.invokeMashup(cnocConnector.service27, {"code_net" : cnocConnector.codeNetGlobal,"flag_stat" : "'t'"},drawElementsGral.gridChangesList, "tTops", "changesListTableG");						
			});
			
			$('#relatedIncidents').click(function(e){
				$("#headerGridsDetailG").text("Incident Detail");
				//cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");
				cnocConnector.invokeMashup(cnocConnector.service22, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.detailIncidentsNode, "tTops", "listIncidentGNode");
			});
			
			$('#relatedChanges').click(function(e){
				$("#headerGridsDetailG").text("Incident Detail");
				//cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");
				cnocConnector.invokeMashup(cnocConnector.service23, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.detailChangesNode, "tTops", "listChangeGNode");
			});
			
			$( ".nodeDetailView").click(function(event){	
				viewNodeDetail();
			});
			
			$( ".nodeDetailViewHide").click(function(event){	
				hideNodeDetail();
			});
			
			$( ".logout").click(function(event){	
				logout();
			});
			
			$( ".back").click(function(event){
				home();
			});
			
			Highcharts.setOptions({
		        global: {
		            useUTC: false
		        }
		    });
			
			$(".themeW").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename, false);			
				Highcharts.setOptions(Highcharts.themeW);
				stylesMap = null;
				drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});

			var refresh = setInterval(function(){
				drawElementsGral.init();
			},300000);
	});
	</script>


</body>

</html>
