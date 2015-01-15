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
	<link rel="stylesheet" type="text/css" href="css/general.css">
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Chosen -->
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	
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
		
        <!-- MENU  -->		
		<%@ include file="menu.jsp" %>

        <div id="page-wrapper">
        
        <div class="container-fluid">
                
                <!-- /.row -->
				  <div class="row">
				  	<div class="col-lg-12" style="padding-left: 20px; padding-right: 20px;">
				  		<div class="row">
				  			<div class="col-lg-9">
						    	<form class="form-horizontal" role="form">
						    		<fieldset>
						    		<!-- Form Name -->
									<legend>Change Password</legend>
						    	
								  <div class="form-group">
								    <label class="col-sm-2 control-label">Current password</label>
								    <div class="col-sm-10">
								      <input id="currentPassword" name="currentPassword" type="password" placeholder="current password" maxlength="50" size="20">
								    </div>
								  </div>
								  <div class="form-group">
								    <label for="inputPassword3" class="col-sm-2 control-label">New password</label>
								    <div class="col-sm-10">
								      <input id="newPassword" name="newPassword" type="password" placeholder="new password" maxlength="50" size="20">
								    </div>
								  </div>
								  <div class="form-group">
								    <label for="inputPassword3" class="col-sm-2 control-label">Retype password</label>
								    <div class="col-sm-10">
								      <input id="retypePassword" name="retypePassword" type="password" placeholder="retype password" maxlength="50" size="20">
								    </div>
								  </div>								  
								  <div class="form-group">
								    <div class="col-sm-offset-2 col-sm-10">
								      <button id="changePwdButton" type="button" class="btn btn-success glyphicon glyphicon-floppy-disk">&nbsp;Change</button>
								    </div>
								  </div>
								  </fieldset>
								</form>
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
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>	
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>

	<!-- Bootstrap Core CSS -->
	<script src="js/bootstrap.js"></script>
	
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>

	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsEscalation.js"></script>
	
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
			    		cnocConnector.service1 = serviceESC1;
			    		cnocConnector.service2 = serviceESC2;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
		 	
			drawElementsEscalation.init();
		 	
		 	$("#changePwdButton").click(function() {
		 		
		 		var currentPassword = $('#currentPassword').val();
		 		var newPassword = $('#newPassword').val();
		 		var retypePassword = $('#retypePassword').val();		 		
		 		
		 		if (newPassword.length < 10 ) {
		 			bootbox.alert("Password length must be at least ten (10)");
		 			
		 		} else if (currentPassword == '') {
		 			bootbox.alert("Please insert your current password");
		 		
		 		} else if (newPassword == '') {
		 			bootbox.alert("Please insert your new password");
		 		
		 		} else if (retypePassword == '') {
		 			bootbox.alert("Please retype your new password");
		 		
		 		} else if (newPassword != retypePassword) {
		 			bootbox.alert("Password confirmation doesn't match");
		 		
		 		} else {
		 			
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
