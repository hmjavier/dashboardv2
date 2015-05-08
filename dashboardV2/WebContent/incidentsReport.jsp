<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="OGE">

    <title>:::Customer Network Operation Center (CNOC):::</title>
	<link rel="icon" type="image/x-icon" href="cnoc.ico" />
	<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrapW.css">		

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

	<!-- jQuery multiselect -->
	<link href="css/bootstrap-multiselect.css" rel="stylesheet">
	
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	<link rel="stylesheet" type="text/css" href="js/TableTools/css/TableTools.css">
	
	<!-- PAGE THEME WHITE -->	
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
		
		div.dataTables_scroll { clear: both; }
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
		
		<!-- MENU  -->		
		<%@ include file="menu.jsp" %> 
		
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
							        <button class="btn btn-success glyphicon glyphicon-list-alt" type="button" id="selectGraph">  Get</button>
							      </span>
								</div>		    			    
							</div>			
				        </div>        			    	        
    				</div>
    				<div class="col-lg-3"></div>
                </div>
                <!-- /.row -->
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<h3 class="panel-title">Incidents</h3>
							</div>
							<div id="chartIncidents">
								<table id="tableIncidents" class="display" cellspacing="0" width="100%">
							        <thead>
							            <tr>
							                <th>Number</th>
							                <th>Interaction</th>
							                <th>Brief Description</th>
							                <th>Network Code</th>
							                <th>Company</th>
							                <th>Open Time</th>
							                <th>Last Update</th>
							                <th>Close Time</th>
							                <th>Hostname</th>
							                <th>Service Unique ID</th>
							                <th>Problem Status</th>
							                <th>Operator</th>
							                <th>Opened by</th>
							                <th>Closure Code</th>
							                <th>Service Type</th>
							            </tr>
							        </thead>
							 
							        <tfoot>
							            <tr>
							                <th>Number</th>
							                <th>Interaction</th>
							                <th>Brief Description</th>
							                <th>Network Code</th>
							                <th>Company</th>
							                <th>Open Time</th>
							                <th>Last Update</th>
							                <th>Close Time</th>
							                <th>Hostname</th>
							                <th>Service Unique ID</th>
							                <th>Problem Status</th>
							                <th>Operator</th>
							                <th>Opened by</th>
							                <th>Closure Code</th>
							                <th>Service Type</th>
							            </tr>
							        </tfoot>
							    </table>
							</div>
						</div>		
					</div>
				</div>
				<!-- /.row -->
            </div>
            <%@ include file="footer.jsp" %>
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
		
	<!-- Multiselect -->
	<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>	
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
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
	
	<!-- date Picker -->
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
		
	<!-- TREE BOOTSTRAP -->
	<script src="js/bootstrap-tree.js" /></script>
		
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
		    		cnocConnector.service1 = serviceHI1;
		    		cnocConnector.menu = serviceMenu;
		    		cnocConnector.nmis_urls = nmis_urls;
		    }
		});
		
		/*Genera Menu*/
		generateMenu();	
		cnocConnector.invokeMashup(
				cnocConnector.service9,
				{},
				function(datos){ cnocConnector.drawSelect(datos, "SelectCustomer", "hIncidents"); },
				"SelectCustomer",
				"opt"
			);

	 	$('.datesPerformance').datepicker({
	 		dateFormat: "dd-mm-yyyy",
			todayBtn: true,
		    autoclose: true,
		    todayHighlight: true//,
		    //startDate: '-5d'
		});
		
		$("#selectGraph").click(function(event) {
			
			var startDate = $( '#startDate' ).val();
			var endDate = $( '#endDate' ).val();
			var code_net = $( '#SelectCustomer' ).val();			
			
			$('#tableIncidents').dataTable( {
				"bDestroy": true,
				"sDom": 'T<"clear">lfrtip',
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			            ]
			    },			    
				"sScrollX": "100%",
				"bScrollCollapse": true,
				"bProcessing": true,
				"sPaginationType": "full_numbers",
				"sAjaxSource": cnocConnector.service1 + "&code_net=" + code_net + "&startDate=" + startDate + "&endDate=" + endDate,
				"sAjaxDataProp": "",
				"fnServerData": function( sUrl, aoData, fnCallback ) {
					$.ajax( {
						"url": sUrl,
						"data": aoData,
						"success": function(response) {
							fnCallback(response.records.record);
						},
						"dataType": "jsonp",
						"cache": false
					} );
				},
				aoColumns: [
					{ "mData": "number" },
					{ "mData": "interaction" },        
					{ "mData": "brief_description" },
					{ "mData": "network_code" },
					{ "mData": "company" },					
					{ "mData": "open_time" },		                      
					{ "mData": "last_update" },
					{ "mData": "close_time" },
					{ "mData": "hostname" },
					{ "mData": "service_uniqueid" },
					{ "mData": "problem_status" },
					{ "mData": "operator" },
					{ "mData": "opened_by" },
					{ "mData": "closure_code" },
					{ "mData": "service_type" }
				],
				"order": [[ 0, "desc" ]],
		    } );
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
		});
		
		$(".themeB").click(function(event){
			var filename = $(this).attr('rel');				
			themeChanges(filename,true);
		});
			
	});
	</script>

</body>
</html>
