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
	<div  id="frm" style="visibility: hidden; height: 0px;">
		<div class="form-group">
			<div class="col-sm-8 input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-font"></i></span>
				<input type="text" id="titleTicket" class="form-control titleTicket" style="height: 30px;" placeholder="Title Ticket" required >
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-8 input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-font"></i></span>
				<input type="text" id="subtitleTicket" class="form-control subtitleTicket" style="height: 30px;" placeholder="Sub Title Ticket" required >
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-8 input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
				<input type="text" id="contactTicket" class="form-control contactTicket" style="height: 30px;" placeholder="Sub Title Ticket" required >
			</div>
		</div>
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
						<option></option>
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
					<div class="row">
				  			<div class="col-lg-12">
						    	<div class="panel panel-primary">
						    		<div class="panel-heading">
								    	<h3 class="panel-title">List CI's</h3>
								  	</div>
						    		<div id="listBizserviceT"></div>
						    	</div>		
					    	</div>
				  		</div>
                </div>
                <!-- /.row -->
				  <div class="row">
				
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
	<script src="js/drawElementsTickets.js"></script>
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
		    		cnocConnector.ipserver = ip_Server;
		    		cnocConnector.hostname = hostname_Server;
		    		cnocConnector.logout = serviceLogout;
		    		cnocConnector.incidents = incidentService;
		    		cnocConnector.getLdap = getLdap;
		    		cnocConnector.service9 = serviceC9;
		    		cnocConnector.service1 = serviceTic1;
		    }
		});
		
		drawElementsTickets.init();
		
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
				drawElements.builder();
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElements.builder();
			});

			/*
			var refresh = setInterval(function(){
				drawElements.init();
			},cnocConnector.refresh);*/

	});
	</script>


</body>

</html>
