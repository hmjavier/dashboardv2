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
	<link rel="stylesheet" type="text/css" href="css/general.css">
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Chosen -->
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">

	<!-- DataTables -->
	<link rel="stylesheet" type="text/css" href="js/DataTables-1.10.1/css/jquery.dataTables.min.css">
	
	<!-- DataTables Bootstrap-->
	<link rel="stylesheet" type="text/css" href="js/DataTables-Bootstrap/css/dataTables.bootstrap.css">
	
	<!-- TableTools -->
	<link rel="stylesheet" type="text/css" href="js/TableTools-2.2.2/css/dataTables.tableTools.min.css">
	
	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">

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
	                        <a href="#" class="themeW" rel="css/bootstrapW.css"><i class="fa fa-fw "></i> White </a>
	                    </li>
	                    <li>
	                        <a href="#" class="themeB" rel="css/bootstrap.css"><i class="fa fa-fw "></i> Black </a>
	                    </li>
                    </ul>
                </li>
    			<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-dashboard"></i> Dashboards <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
	                        <a href="main.jsp"><i class="fa fa-fw fa-home"></i> Home </a>
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
	                        <a href="performanceGraph.jsp"><i class="fa fa-fw fa-bar-chart-o"></i> Performance 2</a>
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
                	<div class="col-md-5 col-md-offset-4">
                		<div class="btn-group">    
					    	<button type="button" class="btn btn-info glyphicon glyphicon-road">Transport Inventory</button>
							<button type="button" class="btn btn-info glyphicon glyphicon-hdd">Equipment Inventory</button>		
						</div>
						<button id="go" type="button" class="btn btn-success glyphicon glyphicon-save">Get</button>
                	</div>					
                </div>
                <br>
                <div class="row">
					<div class="col-lg-12">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Inventory</h3>
						  	</div>
				    		<div id="chartInventory"></div>
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
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	
	<!-- Chosen -->
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>

	<!-- Bootstrap Core CSS -->
	<script src="js/bootstrap.js"></script>

	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsInventory.js"></script>

	<!-- DataTables -->
	<script type="text/javascript" src="js/DataTables-1.10.1/js/jquery.dataTables.min.js"></script>
	
	<!-- DataTables Bootstrap-->
	<script type="text/javascript" src="js/DataTables-Bootstrap/js/dataTables.bootstrap.js"></script>
	
	<!-- TableTools -->
	<script type="text/javascript" src="js/TableTools-2.2.2/js/dataTables.tableTools.min.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>	

	<script type="text/javascript">

	$(document).ready(function() {
		
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;		    		
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceINV1; // ms_inv_transport
			    		cnocConnector.service2 = serviceINV2; // ms_inv_equipment
			    }
			});
		 	
		 	drawElementsInventory.init();
		 	
		 	$("#go").click(function() {
		 		
		 		console.log(cnocConnector.codeNetGlobal);
			    
		 		var inventory = $('.btn-group > .btn.active').text();
			    
			    if (inventory == 'Transport Inventory') {
			    	console.log("if");
			    	cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"code_net" : cnocConnector.codeNetGlobal}, // Parameters
				    		drawElementsInventory.showInventory, // Callback
				    		"chartInventory", // Container
				    		"tableInventory" // Div
				    	);
			    } else {
			    	console.log("else");
			    	cnocConnector.invokeMashup(
				    		cnocConnector.service2, // Service ID
				    		{"code_net" : cnocConnector.codeNetGlobal}, // Parameters
				    		drawElementsInventory.showInventory, // Callback
				    		"chartInventory", // Container
				    		"tableInventory" // Div
				    	);
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
				//Highcharts.setOptions(Highcharts.themeW);
				//stylesMap = null;
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				//Highcharts.setOptions(Highcharts.themeB);
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
	});
	</script>


</body>

</html>
