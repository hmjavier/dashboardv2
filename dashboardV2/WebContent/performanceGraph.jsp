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
	
	<!-- jQuery IMPRIMIR -->
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
	<div id="portada" class="portada" style="display: none;">
		<div class="row">
			<div class="col-lg-12">
				<div class="panel panel-primary" style="padding-left: 10px; padding-right: 10px;" >
					<div class="panel-heading">
						    <img alt="" src="css/images/logo.png" height="50px">
					</div>
					<div class="panel-body" style="margin-top: 45%; text-align: center;">
						<!-- <h1 class="clientPdf"></h1>-->					 
					 	<h1>Performace Charts</h1>
					 	<h4 class="startDatePdf"></h4>
					 	<h4 class="endDatePdf"></h4>
					</div>
					<div class="panel-footer" style="margin-top: 45%;">
                    	<div class="copyright-info" style="color: #7D7F80; text-align: center; font-size: 9px;">
	                       Customer Network Operation Center (CNOC)<br> &copy; 2014 CNOC
	                       Tools .Todos los derechos reservados.                        
	               		</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
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


                <div class="row dateRange">
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
				  <div class="row selectMetric">				  	
			        <div class="col-lg-12">   	
				      	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-list fa-fw"></i> Node Resources
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
							<div class="row" style="padding-left: 15px;">
								<div class="col-lg-4">
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="health" checked>
									    Health
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="cpu">
									    CPU
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="responsetime">
									    Response Time
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="memoryIO">
									    Memory IO
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="memoryProc">
									    Memory Proc
									  </label>
									</div>	    
									    Node Name: 
									    <div id="cmbNodesPerformanceC" style="height: 50px;">
									    	<div id="cmbNodesPerformance"></div>
									    </div>									    
									
								</div>
								<div class="col-lg-4">
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="utilisation">
									    Utilisation %AVG
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="utilisationavgbps">
									    Utilisation AVG bps
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="errorsdiscards">
									    Errors Discards
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="pktshc">
									    PKTS HC
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="qos">
									    QoS
									  </label>
									</div>
									Interface Name:
									<div id="cmbNodesPerformanceInterfazC" style="height: 50px;">
										<div id="cmbNodesPerformanceInterfaz"></div>
									</div>									
								</div>
							</div>	  
						  </div>
						</div>     
				    </div>
  				</div>
  				<div class="row">				  			    
				    <div class="col-lg-12" id="GraficasPerformance">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">
									<div class="row" >
										<div class="col-lg-10">
											<i class="fa fa-bar-chart-o fa-fw"></i> Charts
										</div>
										<div class="col-lg-2 headerCharts">											
											<div class="input-group input-group-sm">
										      <span class="input-group-btn">
										        <button class="btn btn-success glyphicon glyphicon-stats leermas imprimir" type="button"> Download PDF</button>								        
										      </span>								      
											</div>
										</div>
									</div>		    									    	
						    	</h3>
						  	</div>
						  	<div class="panel-body">
						  		<div id="containerChartPerformanceF">
						  			<div class="row" style="padding-left: 15px; padding-right: 15px;">
						  				<div class="col-lg-6" id="GraficasPerformance">
						  					<div id="containerChartPerformance1"></div>
						  				</div>
						  				<div class="col-lg-6" id="GraficasPerformance">
						  					<div id="containerChartPerformance2"></div>
						  				</div>
						  			</div>
						  			<div class="row" style="padding-left: 15px; padding-right: 15px;">
						  				<div class="col-lg-12">
						  					<div id="msgNoDisponible"></div>
						  				</div>
						  			</div>
						  		</div>
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
	
	<!-- Multiselect -->
	<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
	
	<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
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
			
		//$( "#cmbNodesPerformanceInterfaz" ).mask("Waiting...");
		
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service2 = serviceR3;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.service3 = serviceG18;			    		
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
				
		 	drawElementsPerformanceGraph.init();

		 	$('.datesPerformance').datepicker({
				format: "yyyy/mm/dd",
				todayBtn: true,
			    autoclose: true,
			    todayHighlight: true//,
			    //startDate: '-5d'
			});
			
		 	$("input[name=opciones]:radio").change(function () {
		 		drawElementsPerformanceGraph.dataChartInterface.length = 0;
		 		if( $(this).val() === "utilisation" || $(this).val() === "qos" || $(this).val() === "errorsdiscards" || $(this).val() === "pktshc" || $(this).val() === "utilisationavgbps"){
					$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
		 			cnocConnector.drawInterfaceGraph($(this).val());
		 		}else{
		 			$("#cmbNodesPerformanceInterfaz").empty();
		 		}
		    });
		 	

			$("#selectGraph").click(function(event){
				$("#msgNoDisponible").empty();
				$("#containerChartPerformance1").empty();
				$("#containerChartPerformance2").empty();

				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var metrics = $('input:radio[name=opciones]:checked').val();
								
				if(startDate === "" || endDate === "" ){
					alert("Elige un rango de fecha");
				}else{
					var nodes = ["IMSS_01180_C5_28_UMF_3_EL_CORA_817_RT01|10.237.7.11| ",
					             "IMSS_02080_C5_28_UMF27_ESTACION_ELREFUG_RT01|10.237.7.11| ",
					             "IMSS_02207_C5_21_OFNA_AUX_32_TEPAKAN_D_RT01|10.237.7.11| ",
					             "IMSS_00820_C5_21_OFNA_AUX_117_QUITUPAN_RT01|10.237.7.11| ",
					             "IMSS_00455_C5_28_UMF34_ARTURO_MARTINEZ_RT01|10.237.7.11| ",
					             "IMSS_01068_C5_28_UMF_10_JUNGAPEO_817_RT01|10.237.7.11| ",
					             "IMSS_70316_C4_28_UMF_LO_VEGA_RT01|10.237.7.11| ",
					             "IMSS_70315_C4_28_UMF_TETAROBA_RT01|10.237.7.11| ",
					             "IMSS_70072_C4_43_UMR_SAN_AGUSTIN_RT01|10.237.7.11| ",
					             "IMSS_70051_C4_43_UMR_LAGUNA_CANACHI_RT01|10.237.7.11| ",
					             "IMSS_70046_C4_43_UMR_AGUAJITO_LEON_EL_RT01|10.237.7.11| ",
					             "IMSS_70028_C4_43_UMR_SAN_RAFAEL_RT01|10.237.7.11| ",
					             "IMSS_70027_C4_43_UMR_CERRITO_LA_CRUZ_RT01|10.237.7.11| ",
					             "IMSS_00800_ C5_21_UMF_IXTLAHUACAN_MEM_RT01|10.237.7.11| ",
					             "IMSS_70319_C4_28_UMF_OCORONI_RT01|10.237.7.11| ",
					             "IMSS_70318_C4_28_UMF_JIQUILPAN_II_RT01|10.237.7.11| ",
					             "IMSS_70082_C4_28_UMF_8_XCALAK_RT01|10.237.7.11| ",
					             "IMSS_70060_C4_43_UMR_SANTIAGO_LOS_CABAL_RT01|10.237.7.11| ",
					             "IMSS_02696_C4_30_HRS_GUADALUPE_TEPEYAC_RT01|10.237.7.11| ",
					             "IMSS_02683_C4_30_HRS_BENEMERITO_LAS_AME_RT01|10.237.7.11| ",
					             "IMSS_70056_C4_43_UMR_MAYOS_LOS_RT01|10.237.7.11| ",
					             "IMSS_70035_C4_43_UMR_LABOR_VIEJA_RT01|10.237.7.11| ",
					             "IMSS_70339_C4_43_UMR_VADO_HONDO_RT01|10.237.7.11| ",
					             "IMSS_70030_C4_43_UMR_CODORNICES_RT01|10.237.7.11| ",
					             "IMSS_70007_C4_43_UMR_BONDOJITO_RT01|10.237.7.11| ",
					             "IMSS_70335_C4_43_UMR_SANTA_MARIA_RT01|10.237.7.11| ",
					             "IMSS_70334_C4_43_UMR_MALOYA_RT01|10.237.7.11| ",
					             "IMSS_70333_C4_43_UMR_CHELE_RT01|10.237.7.11| ",
					             "IMSS_70307_C4_43_UMR_BUYUBAMPO_RT01|10.237.7.11| ",
					             "IMSS_02817_C4_28_UMF10_APAXTLA_CASTREJO_RT01|10.237.7.11| ",
					             "IMSS_00260_C4_28_CSTORIO_MEDICO_EJIDO_1_RT01|10.237.7.11| ",
					             "IMSS_00314_C5_28_UMF_41_CFE_817_RT01|10.237.7.11| ",
					             "IMSS_00316_C5_28_UMF_42_PENITAS_817_RT01|10.237.7.11| ",
					             "IMSS_00435_C5_28_UMF3_SAN_MIGUEL_CRUCES_RT01|10.237.7.11| ",
					             "IMSS_02225_C5_28_UMF_21_SAMAHIL_817_RT01|10.237.7.11| ",
					             "IMSS_02267_C5_28_UMF_13_NOCHEBUENA_817_RT01|10.237.7.11| ",
					             "IMSS_02275_C5_28_UMF_17_LA_COLORADA_817_RT01|10.237.7.11| ",
					             "IMSS_02277_C5_28_UMF_18_SAN_MARTIN_817_RT01|10.237.7.11| ",
					             "IMSS_00275_C5_28_UMF20_LA_ANGOSTURA_817_RT01|10.237.7.11| ",
					             "IMSS_00450_C5_28_UMF24_PUEBLO_NUEVO_817_RT01|10.237.7.11| ",
					             "IMSS_70412_C5_21_OFNA_AUX_BENCEDORES_SA_RT01|10.237.7.11| ",
					             "IMSS_70413_C5_21_OFNA_AUX_LLANO_GRANDE_RT01|10.237.7.11| ",
					             "IMSS_00603_C5_28_UMF_17_UNION_817_RT01|10.237.7.11| ",
					             "IMSS_00742_C5_28_UMF_25_LA_SAUCEDA_817_RT01|10.237.7.11| ",
					             "IMSS_00790_C5_28_UMF106_SN_MARTIN_BOLAN_RT01|10.237.7.11| ",
					             "IMSS_01590_C5_28_UMF_48_LA_HINCADA_817_RT01|10.237.7.11| ",
					             "IMSS_01657_C5_28_UMF_24_BACHOCO_817_RT01|10.237.7.11| ",
					             "IMSS_01659_C5_28_UMF_26_LA_ENTRADA_817_RT01|10.237.7.11| ",
					             "IMSS_01721_C5_28_UMF_13_LA_PALMA_817_RT01|10.237.7.11| ",
					             "IMSS_01724_C5_28_UMF_16_SAN_PEDRO_817_RT01|10.237.7.11| ",
					             "IMSS_01728_C5_28_UMF_20_JUPARE_817_RT01|10.237.7.11| ",
					             "IMSS_01749_C5_28_UMF_39_ATOTONILCO_817_RT01|10.237.7.11| ",
					             "IMSS_01750_C5_28_UMF40_FRANCISCO_SARABI_RT01|10.237.7.11| ",
					             "IMSS_01751_C5_28_UMF41_PAREDON_COLORADO_RT01|10.237.7.11| ",
					             "IMSS_01760_C5_28_UMF_56_ESTACION_ORTIZ_RT01|10.237.7.11| ",
					             "IMSS_01815_C5_28_UMF7_PLUTARCO_ELIAS_CA_RT01|10.237.7.11| ",
					             "IMSS_01816_C5_28_UMF_8_EMILIANO_ZAPATA_RT01|10.237.7.11| ",
					             "IMSS_01817_C5_28_UMF9_BENITO_JUAREZ_817_RT01|10.237.7.11| ",
					             "IMSS_01818_C5_28_UMF_10_VICENTE_GUERRO_RT01|10.237.7.11| ",
					             "IMSS_01821_C5_28_UMF12_PEDRO_C_COLORADO_RT01|10.237.7.11| ",
					             "IMSS_01822_C5_28_UMF_13_FRANCISCO_VILLA_RT01|10.237.7.11| ",
					             "IMSS_01823_C5_28_UMF14_20_NOVIEMBRE_817_RT01|10.237.7.11| ",
					             "IMSS_01995_C5_28_UMF_25_COTAXTLA_817_RT01|10.237.7.11| ",
					             "IMSS_02072_C5_28_UMF17_LAGUNA_CHICA_817_RT01|10.237.7.11| ",
					             "IMSS_02078_C5_28_UMF_25_SAN_JOSE_ABAJO_RT01|10.237.7.11| ",
					             "IMSS_02087_C5_28_UMF_38_TENEJAPAN_817_RT01|10.237.7.11| ",
					             "IMSS_02161_C5_21_OF_AX_35_TEKAL_VENEGAS_RT01|10.237.7.11| ",
					             "IMSS_00129_C5_28_UMF_3_LA_JOYA_817_RT01|10.237.7.11| ",
					             "IMSS_02163_C5_21_OFNA_AUX_37_HOCABA_D_RT01|10.237.7.11| ",
					             "IMSS_00261_C5_28_UMF4_EJIDO_SANTO_DOMIN_RT01|10.237.7.11| ",
					             "IMSS_02164_C5_21_OFNA_AUX_38_TAHMEK_D_RT01|10.237.7.11| ",
					             "IMSS_02167_C5_21_OFNA_AUX_42_SEYE_D_RT01|10.237.7.11| ",
					             "IMSS_02168_C5_21_OFNA_AUX_43_TIMUCUY_D_RT01|10.237.7.11| ",
					             "IMSS_02169_C5_21_OFNA_AUX_44_TECOH_D_RT01|10.237.7.11| ",
					             "IMSS_02172_C5_21_OFNA_AUX_48_ABALA_D_RT01|10.237.7.11| ",
					             "IMSS_02178_C5_28_UMF_6_COLONIA_YUCATAN_RT01|10.237.7.11| ",
					             "IMSS_02196_C5_21_OF_AX_15_SAN_JOSE_TZAL_RT01|10.237.7.11| ",
					             "IMSS_02199_C5_21_OFNA_AUX_23_SINANCHE_D_RT01|10.237.7.11| ",
					             "IMSS_02200_C5_21_OFNA_AUX_24_DZEMUL_D_RT01|10.237.7.11| ",
					             "IMSS_00263_C5_28_UMF6_FINCA_CHAPULTEPEC_RT01|10.237.7.11| ",
					             "IMSS_02201_C5_21_OFNA_AUX_25_BACA_D_RT01|10.237.7.11| ",
					             "IMSS_02205_C5_21_OFNA_AUX_29_ZUMA_D_RT01|10.237.7.11| ",
					             "IMSS_00277_C5_28_UMF_21_CHICOASEN_817_RT01|10.237.7.11| ",
					             "IMSS_00296_C5_28_UMF_44_ESTACION_JUAREZ_RT01|10.237.7.11| ",
					             "IMSS_00310_C5_28_CSTORIO_MEDICO_SIMOJOV_RT01|10.237.7.11| ",
					             "IMSS_02269_C5_28_UMF_14_SALAVERNA_817_RT01|10.237.7.11| ",
					             "IMSS_00176_C5_28_UMF_67_FF_CC_817_RT01|10.237.7.11| ",
					             "IMSS_70049_C4_43_UMR_CABEZAS_LAS_VENUST_RT01|10.237.7.11| ",
					             "IMSS_70033_C4_43_UMR_ATOTONILCO_RT01|10.237.7.11| ",
					             "IMSS_70338_C4_43_UMR_LA_LOMA_GABRIEL_LE_RT01|10.237.7.11| ",
					             "IMSS_70337_C4_43_UMR_CIENAGA_CAMPANA_RT01|10.237.7.11| ",
					             "IMSS_70336_C4_43_UMR_POTRERILLOS_RT01|10.237.7.11| ",
					             "IMSS_70633_C4_C_A_M_F_NO_17_RT01|10.237.7.11| ",
					             "IMSS_70689_C4_43_PUESTO_FAB_EL_NOVILLO_RT01|10.237.7.11| ",
					             "IMSS_70330_C4_43_UMR_SANTA_LUCIA_RT01|10.237.7.11| ",
					             "IMSS_70328_C4_43_UMR_GUADALUPE_LOS_REYE_RT01|10.237.7.11| ",
					             "IMSS_70327_C4_43_UMR_POTRERO_BEJARANO_RT01|10.237.7.11| ",
					             "IMSS_70325_C4_28_UMF_TEGORIPA_RT01|10.237.7.11| ",
					             "IMSS_70324_C4_28_UMF_CIENAGA_LOS_LARA_RT01|10.237.7.11| ",
					             "IMSS_70323_C4_28_UMF_BACUBIRITO_RT01|10.237.7.11| ",
					             "IMSS_70320_C4_28_UMFAGUA_CALIENTE_CEBAD_RT01|10.237.7.11| ",
					             "IMSS_70317_C4_28_UMF_BATEBE_RT01|10.237.7.11| ",
					             "IMSS_70312_C4_28_UMF_SAUZ_VACA_RT01|10.237.7.11| ",
					             "IMSS_70311_C4_43_UMR_TASAJERA_RT01|10.237.7.11| ",
					             "IMSS_70310_C4_43_UMR_GUADALUPE_RT01|10.237.7.11| ",
					             "IMSS_70308_C4_43_UMR_CASAS_VIEJAS_RT01|10.237.7.11| ",
					             "IMSS_70647_C4_30_H_R_SN_JOSE_DEL_RINCON_RT01|10.237.7.11| ",
					             "IMSS_02855_C4_30_HRS_20_ISLAS_MARIAS_CS_RT01|10.237.7.11| ",
					             "IMSS_70085_C4_28_UMF12_PUERTO_AVENTURAS_RT01|10.237.7.11| ",
					             "IMSS_70084_C4_28_UMF_10_AKUMAL_RT01|10.237.7.11| ",
					             "IMSS_70083_C4_28_UMF_9_PUNTA_ALLEN_RT01|10.237.7.11| ",
					             "IMSS_70306_C4_43_UMR_JITZAMURY_RT01|10.237.7.11| ",
					             "IMSS_70585_C4_17_HOSPITAL_RURAL_UNION_RT01|10.237.7.11| ",
					             "IMSS_70077_C4_43_UMR_LAGUNA_BELTRANES_RT01|10.237.7.11| ",
					             "IMSS_70075_C4_43_UMR_PIAXTLA_ABAJO_RT01|10.237.7.11| ",
					             "IMSS_70074_C4_43_UMR_BARRAS_PIAXTLA_RT01|10.237.7.11| ",
					             "IMSS_70073_C4_43_UMR_AJOYA_RT01|10.237.7.11| ",
					             "IMSS_70071_C4_43_UMR_LIMON_LOS_PERAZA_E_RT01|10.237.7.11| ",
					             "IMSS_70069_C4_43_UMR_COLONIA_BUENOS_AIR_RT01|10.237.7.11| ",
					             "IMSS_70067_C4_43_UMR_SALADITO_EL_RT01|10.237.7.11| ",
					             "IMSS_70065_C4_43_UMR_TIGRES_LOS_RT01|10.237.7.11| ",
					             "IMSS_70064_C4_43_UMR_IPUCHA_RT01|10.237.7.11| ",
					             "IMSS_70062_C4_43_UMR_PUEBLO_ALAYA_RT01|10.237.7.11| ",
					             "IMSS_70061_C4_43_UMR_PALMARITO_EL_LAS_M_RT01|10.237.7.11| ",
					             "IMSS_70059_C4_43_UMR_SAN_JOSE_DEL_LLANO_RT01|10.237.7.11| ",
					             "IMSS_70058_C4_43_UMR_REFORMA_LA_RT01|10.237.7.11| ",
					             "IMSS_70057_C4_43_UMR_CARBONERAS_RT01|10.237.7.11| ",
					             "IMSS_70055_C4_43_UMR_TOMO_RT01|10.237.7.11| ",
					             "IMSS_70054_C4_43_UMR_TEPUCHE_EL_RT01|10.237.7.11| ",
					             "IMSS_70053_C4_43_UMR_SANALONA_RT01|10.237.7.11| ",
					             "IMSS_70050_C4_43_UMR_FLECHAS_LAS_RT01|10.237.7.11| ",
					             "IMSS_70048_C4_43_UMR_CAHUINAHUATO_RT01|10.237.7.11| ",
					             "IMSS_70047_C4_43_UMR_ZAPOTE_LOS_MOYA_EL_RT01|10.237.7.11| ",
					             "IMSS_70045_C4_43_UMR_SANTA_ROSALIA_RT01|10.237.7.11| ",
					             "IMSS_70044_C4_43_UMR_SITIO_ENMEDIO_RT01|10.237.7.11| ",
					             "IMSS_70042_C4_43_UMR_PASO_SAN_ANTONIO_RT01|10.237.7.11| ",
					             "IMSS_70040_C4_43_UMR_SAN_FRANCISCO_RT01|10.237.7.11| ",
					             "IMSS_70036_C4_43_UMR_SAN_MARTIN_ABAJO_RT01|10.237.7.11| ",
					             "IMSS_70032_C4_43_UMR_PALO_ALTO_RT01|10.237.7.11| ",
					             "IMSS_70031_C4_43_UMR_PITAHAYO_EL_RT01|10.237.7.11| ",
					             "IMSS_02532_C4_09_CTO_VAC_LA_MALINTZI_TL_RT01|10.237.7.11| ",
					             "IMSS_70029_C4_43_UMR_LAGUNA_VERDE_RT01|10.237.7.11| ",
					             "IMSS_70026_C4_43_UMR_AMOLADERAS_RT01|10.237.7.11| ",
					             "IMSS_70022_C4_43_UMR_SANTA_MARIA_MACUA_RT01|10.237.7.11| ",
					             "IMSS_70015_C4_43_UMR_ALJIBES_RT01|10.237.7.11| ",
					             "IMSS_70013_C4_43_UMR_DA_U_RT01|10.237.7.11| ",
					             "IMSS_70011_C4_43_UMR_TEPEITIC_RT01|10.237.7.11| ",
					             "IMSS_70009_C4_43_UMR_JONACAPA_RT01|10.237.7.11| ",
					             "IMSS_70008_C4_43_UMR_CARMEN_EL_RT01|10.237.7.11| ",
					             "IMSS_70006_C4_43_UMR_COLONIA_GUADALUPE_RT01|10.237.7.11| ",
					             "IMSS_70002_C4_43_UMR_XOTHE_RT01|10.237.7.11| ",
					             "IMSS_70001_C4_43_UMR_SAN_ANTONIO_TEZOQU_RT01|10.237.7.11| ",
					             "IMSS_70041_C4_43_UMR_ZAPOTE_EL_RT01|10.237.7.11| "];
					
					/*["IMSS_01180_C5_28_UMF_3_EL_CORA_817_RT01",
					             "IMSS_02080_C5_28_UMF27_ESTACION_ELREFUG_RT01",
					             "IMSS_02207_C5_21_OFNA_AUX_32_TEPAKAN_D_RT01",
					             "IMSS_00820_C5_21_OFNA_AUX_117_QUITUPAN_RT01",
					             "IMSS_00455_C5_28_UMF34_ARTURO_MARTINEZ_RT01",
					             "IMSS_01068_C5_28_UMF_10_JUNGAPEO_817_RT01",
					             "IMSS_70316_C4_28_UMF_LO_VEGA_RT01",
					             "IMSS_70315_C4_28_UMF_TETAROBA_RT01",
					             "IMSS_70072_C4_43_UMR_SAN_AGUSTIN_RT01",
					             "IMSS_70051_C4_43_UMR_LAGUNA_CANACHI_RT01",
					             "IMSS_70046_C4_43_UMR_AGUAJITO_LEON_EL_RT01",
					             "IMSS_70028_C4_43_UMR_SAN_RAFAEL_RT01",
					             "IMSS_70027_C4_43_UMR_CERRITO_LA_CRUZ_RT01",
					             "IMSS_00800_ C5_21_UMF_IXTLAHUACAN_MEM_RT01",
					             "IMSS_70319_C4_28_UMF_OCORONI_RT01",
					             "IMSS_70318_C4_28_UMF_JIQUILPAN_II_RT01",
					             "IMSS_70082_C4_28_UMF_8_XCALAK_RT01",
					             "IMSS_70060_C4_43_UMR_SANTIAGO_LOS_CABAL_RT01",
					             "IMSS_02696_C4_30_HRS_GUADALUPE_TEPEYAC_RT01",
					             "IMSS_02683_C4_30_HRS_BENEMERITO_LAS_AME_RT01",
					             "IMSS_70056_C4_43_UMR_MAYOS_LOS_RT01",
					             "IMSS_70035_C4_43_UMR_LABOR_VIEJA_RT01",
					             "IMSS_70339_C4_43_UMR_VADO_HONDO_RT01",
					             "IMSS_70030_C4_43_UMR_CODORNICES_RT01",
					             "IMSS_70007_C4_43_UMR_BONDOJITO_RT01",
					             "IMSS_70335_C4_43_UMR_SANTA_MARIA_RT01",
					             "IMSS_70334_C4_43_UMR_MALOYA_RT01",
					             "IMSS_70333_C4_43_UMR_CHELE_RT01",
					             "IMSS_70307_C4_43_UMR_BUYUBAMPO_RT01",
					             "IMSS_02817_C4_28_UMF10_APAXTLA_CASTREJO_RT01",
					             "IMSS_00260_C4_28_CSTORIO_MEDICO_EJIDO_1_RT01",
					             "IMSS_00314_C5_28_UMF_41_CFE_817_RT01",
					             "IMSS_00316_C5_28_UMF_42_PENITAS_817_RT01",
					             "IMSS_00435_C5_28_UMF3_SAN_MIGUEL_CRUCES_RT01",
					             "IMSS_02225_C5_28_UMF_21_SAMAHIL_817_RT01",
					             "IMSS_02267_C5_28_UMF_13_NOCHEBUENA_817_RT01",
					             "IMSS_02275_C5_28_UMF_17_LA_COLORADA_817_RT01",
					             "IMSS_02277_C5_28_UMF_18_SAN_MARTIN_817_RT01",
					             "IMSS_00275_C5_28_UMF20_LA_ANGOSTURA_817_RT01",
					             "IMSS_00450_C5_28_UMF24_PUEBLO_NUEVO_817_RT01",
					             "IMSS_70412_C5_21_OFNA_AUX_BENCEDORES_SA_RT01",
					             "IMSS_70413_C5_21_OFNA_AUX_LLANO_GRANDE_RT01",
					             "IMSS_00603_C5_28_UMF_17_UNION_817_RT01",
					             "IMSS_00742_C5_28_UMF_25_LA_SAUCEDA_817_RT01",
					             "IMSS_00790_C5_28_UMF106_SN_MARTIN_BOLAN_RT01",
					             "IMSS_01590_C5_28_UMF_48_LA_HINCADA_817_RT01",
					             "IMSS_01657_C5_28_UMF_24_BACHOCO_817_RT01",
					             "IMSS_01659_C5_28_UMF_26_LA_ENTRADA_817_RT01",
					             "IMSS_01721_C5_28_UMF_13_LA_PALMA_817_RT01",
					             "IMSS_01724_C5_28_UMF_16_SAN_PEDRO_817_RT01",
					             "IMSS_01728_C5_28_UMF_20_JUPARE_817_RT01",
					             "IMSS_01749_C5_28_UMF_39_ATOTONILCO_817_RT01",
					             "IMSS_01750_C5_28_UMF40_FRANCISCO_SARABI_RT01",
					             "IMSS_01751_C5_28_UMF41_PAREDON_COLORADO_RT01",
					             "IMSS_01760_C5_28_UMF_56_ESTACION_ORTIZ_RT01",
					             "IMSS_01815_C5_28_UMF7_PLUTARCO_ELIAS_CA_RT01",
					             "IMSS_01816_C5_28_UMF_8_EMILIANO_ZAPATA_RT01",
					             "IMSS_01817_C5_28_UMF9_BENITO_JUAREZ_817_RT01",
					             "IMSS_01818_C5_28_UMF_10_VICENTE_GUERRO_RT01",
					             "IMSS_01821_C5_28_UMF12_PEDRO_C_COLORADO_RT01",
					             "IMSS_01822_C5_28_UMF_13_FRANCISCO_VILLA_RT01",
					             "IMSS_01823_C5_28_UMF14_20_NOVIEMBRE_817_RT01",
					             "IMSS_01995_C5_28_UMF_25_COTAXTLA_817_RT01",
					             "IMSS_02072_C5_28_UMF17_LAGUNA_CHICA_817_RT01",
					             "IMSS_02078_C5_28_UMF_25_SAN_JOSE_ABAJO_RT01",
					             "IMSS_02087_C5_28_UMF_38_TENEJAPAN_817_RT01",
					             "IMSS_02161_C5_21_OF_AX_35_TEKAL_VENEGAS_RT01",
					             "IMSS_00129_C5_28_UMF_3_LA_JOYA_817_RT01",
					             "IMSS_02163_C5_21_OFNA_AUX_37_HOCABA_D_RT01",
					             "IMSS_00261_C5_28_UMF4_EJIDO_SANTO_DOMIN_RT01",
					             "IMSS_02164_C5_21_OFNA_AUX_38_TAHMEK_D_RT01",
					             "IMSS_02167_C5_21_OFNA_AUX_42_SEYE_D_RT01",
					             "IMSS_02168_C5_21_OFNA_AUX_43_TIMUCUY_D_RT01",
					             "IMSS_02169_C5_21_OFNA_AUX_44_TECOH_D_RT01",
					             "IMSS_02172_C5_21_OFNA_AUX_48_ABALA_D_RT01",
					             "IMSS_02178_C5_28_UMF_6_COLONIA_YUCATAN_RT01",
					             "IMSS_02196_C5_21_OF_AX_15_SAN_JOSE_TZAL_RT01",
					             "IMSS_02199_C5_21_OFNA_AUX_23_SINANCHE_D_RT01",
					             "IMSS_02200_C5_21_OFNA_AUX_24_DZEMUL_D_RT01",
					             "IMSS_00263_C5_28_UMF6_FINCA_CHAPULTEPEC_RT01",
					             "IMSS_02201_C5_21_OFNA_AUX_25_BACA_D_RT01",
					             "IMSS_02205_C5_21_OFNA_AUX_29_ZUMA_D_RT01",
					             "IMSS_00277_C5_28_UMF_21_CHICOASEN_817_RT01",
					             "IMSS_00296_C5_28_UMF_44_ESTACION_JUAREZ_RT01",
					             "IMSS_00310_C5_28_CSTORIO_MEDICO_SIMOJOV_RT01",
					             "IMSS_02269_C5_28_UMF_14_SALAVERNA_817_RT01",
					             "IMSS_00176_C5_28_UMF_67_FF_CC_817_RT01",
					             "IMSS_70049_C4_43_UMR_CABEZAS_LAS_VENUST_RT01",
					             "IMSS_70033_C4_43_UMR_ATOTONILCO_RT01",
					             "IMSS_70338_C4_43_UMR_LA_LOMA_GABRIEL_LE_RT01",
					             "IMSS_70337_C4_43_UMR_CIENAGA_CAMPANA_RT01",
					             "IMSS_70336_C4_43_UMR_POTRERILLOS_RT01",
					             "IMSS_70633_C4_C_A_M_F_NO_17_RT01",
					             "IMSS_70689_C4_43_PUESTO_FAB_EL_NOVILLO_RT01",
					             "IMSS_70330_C4_43_UMR_SANTA_LUCIA_RT01",
					             "IMSS_70328_C4_43_UMR_GUADALUPE_LOS_REYE_RT01",
					             "IMSS_70327_C4_43_UMR_POTRERO_BEJARANO_RT01",
					             "IMSS_70325_C4_28_UMF_TEGORIPA_RT01",
					             "IMSS_70324_C4_28_UMF_CIENAGA_LOS_LARA_RT01",
					             "IMSS_70323_C4_28_UMF_BACUBIRITO_RT01",
					             "IMSS_70320_C4_28_UMFAGUA_CALIENTE_CEBAD_RT01",
					             "IMSS_70317_C4_28_UMF_BATEBE_RT01",
					             "IMSS_70312_C4_28_UMF_SAUZ_VACA_RT01",
					             "IMSS_70311_C4_43_UMR_TASAJERA_RT01",
					             "IMSS_70310_C4_43_UMR_GUADALUPE_RT01",
					             "IMSS_70308_C4_43_UMR_CASAS_VIEJAS_RT01",
					             "IMSS_70647_C4_30_H_R_SN_JOSE_DEL_RINCON_RT01",
					             "IMSS_02855_C4_30_HRS_20_ISLAS_MARIAS_CS_RT01",
					             "IMSS_70085_C4_28_UMF12_PUERTO_AVENTURAS_RT01",
					             "IMSS_70084_C4_28_UMF_10_AKUMAL_RT01",
					             "IMSS_70083_C4_28_UMF_9_PUNTA_ALLEN_RT01",
					             "IMSS_70306_C4_43_UMR_JITZAMURY_RT01",
					             "IMSS_70585_C4_17_HOSPITAL_RURAL_UNION_RT01",
					             "IMSS_70077_C4_43_UMR_LAGUNA_BELTRANES_RT01",
					             "IMSS_70075_C4_43_UMR_PIAXTLA_ABAJO_RT01",
					             "IMSS_70074_C4_43_UMR_BARRAS_PIAXTLA_RT01",
					             "IMSS_70073_C4_43_UMR_AJOYA_RT01",
					             "IMSS_70071_C4_43_UMR_LIMON_LOS_PERAZA_E_RT01",
					             "IMSS_70069_C4_43_UMR_COLONIA_BUENOS_AIR_RT01",
					             "IMSS_70067_C4_43_UMR_SALADITO_EL_RT01",
					             "IMSS_70065_C4_43_UMR_TIGRES_LOS_RT01",
					             "IMSS_70064_C4_43_UMR_IPUCHA_RT01",
					             "IMSS_70062_C4_43_UMR_PUEBLO_ALAYA_RT01",
					             "IMSS_70061_C4_43_UMR_PALMARITO_EL_LAS_M_RT01",
					             "IMSS_70059_C4_43_UMR_SAN_JOSE_DEL_LLANO_RT01",
					             "IMSS_70058_C4_43_UMR_REFORMA_LA_RT01",
					             "IMSS_70057_C4_43_UMR_CARBONERAS_RT01",
					             "IMSS_70055_C4_43_UMR_TOMO_RT01",
					             "IMSS_70054_C4_43_UMR_TEPUCHE_EL_RT01",
					             "IMSS_70053_C4_43_UMR_SANALONA_RT01",
					             "IMSS_70050_C4_43_UMR_FLECHAS_LAS_RT01",
					             "IMSS_70048_C4_43_UMR_CAHUINAHUATO_RT01",
					             "IMSS_70047_C4_43_UMR_ZAPOTE_LOS_MOYA_EL_RT01",
					             "IMSS_70045_C4_43_UMR_SANTA_ROSALIA_RT01",
					             "IMSS_70044_C4_43_UMR_SITIO_ENMEDIO_RT01",
					             "IMSS_70042_C4_43_UMR_PASO_SAN_ANTONIO_RT01",
					             "IMSS_70040_C4_43_UMR_SAN_FRANCISCO_RT01",
					             "IMSS_70036_C4_43_UMR_SAN_MARTIN_ABAJO_RT01",
					             "IMSS_70032_C4_43_UMR_PALO_ALTO_RT01",
					             "IMSS_70031_C4_43_UMR_PITAHAYO_EL_RT01",
					             "IMSS_02532_C4_09_CTO_VAC_LA_MALINTZI_TL_RT01",
					             "IMSS_70029_C4_43_UMR_LAGUNA_VERDE_RT01",
					             "IMSS_70026_C4_43_UMR_AMOLADERAS_RT01",
					             "IMSS_70022_C4_43_UMR_SANTA_MARIA_MACUA_RT01",
					             "IMSS_70015_C4_43_UMR_ALJIBES_RT01",
					             "IMSS_70013_C4_43_UMR_DA_U_RT01",
					             "IMSS_70011_C4_43_UMR_TEPEITIC_RT01",
					             "IMSS_70009_C4_43_UMR_JONACAPA_RT01",
					             "IMSS_70008_C4_43_UMR_CARMEN_EL_RT01",
					             "IMSS_70006_C4_43_UMR_COLONIA_GUADALUPE_RT01",
					             "IMSS_70002_C4_43_UMR_XOTHE_RT01",
					             "IMSS_70001_C4_43_UMR_SAN_ANTONIO_TEZOQU_RT01",
					             "IMSS_70041_C4_43_UMR_ZAPOTE_EL_RT01"];*/
		            
					if(metrics === "utilisation" || metrics === "errorsdiscards" || metrics === "qos" || metrics === "pktshc" || metrics === "utilisationavgbps"){
						$('option:selected', $('#cmbInterfazGraph')).each(function() {
// 			            	nodes.push($(this).val());
			         	});
						
					}else if(metrics != "utilisation" && metrics != "utilisationavgbps"){
						 $('option:selected', $('#SelectNode')).each(function() {
// 				            	nodes.push($(this).val());
				         });
					}

					if(nodes.length<1){
						alert("Elija un nodo");
					}else{

						var sD = new Date(startDate+" 00:00:00");
						startDate = ((sD.getTime()/1000));
						
						var eD = new Date(endDate +" 00:00:00");
						endDate = ((eD.getTime()/1000));

						var idNum = 0;
						for(var idx=0; idx<nodes.length; idx++){

							var tmp = "";
							var name = "";
							var nmis = "";
							var idResource ="";
							var vendor = "";
							var referencia = "";
							
							if(metrics === "utilisation" || metrics === "qos" || metrics === "errorsdiscards" || metrics === "pktshc" || metrics === "utilisationavgbps"){
								tmp = nodes[idx].split("|");
								name = tmp[0];
								idResource = tmp[1];
								nmis = tmp[2];		
								referencia = tmp[3];
								vendor = tmp[4];
							}else{
								tmp = nodes[idx].split("|");
								name = tmp[0];
								nmis = tmp[1];
								vendor = tmp[2];
								referencia = tmp[3];
							}
							
							if(metrics === "cpu" && (name.indexOf("_UPS") > 0)){
								//idNum = idNum;
							}else{
								idNum ++;
							}
							
							drawElementsPerformanceGraph.containerChart = "containerChartPerformance-"+idNum;
							drawElementsPerformanceGraph.nmis = nmis;
							drawElementsPerformanceGraph.endUnix = endDate;
							drawElementsPerformanceGraph.endDate = "";
							drawElementsPerformanceGraph.startDate = startDate;

							if(vendor === "HuaweiRouter"){
								if(metrics === "health"){
									drawElementsPerformanceGraph.drawChartHealth(name);
								}else if(metrics === "cpu"){
									drawElementsPerformanceGraph.drawChartCPUHuawei(name);	
								}else if(metrics === "responsetime"){
									drawElementsPerformanceGraph.drawChartResponseTime(name);
								}else if(metrics === "memoryIO"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");	
								}else if(metrics === "memoryProc"){
									drawElementsPerformanceGraph.drawChartMemHuawei(name);								
								}else if(metrics === "utilisation"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "autil", referencia);								
								}else if(metrics === "utilisationavgbps"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "abits", referencia);								
								}else if(metrics === "errorsdiscards"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");								
								}else if(metrics === "pktshc"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");			
								}else if(metrics === "qos"){

									drawElementsPerformanceGraph.drawInterfaceQosHuawei(name, idResource, referencia);			
								}
							}else{
								if(metrics === "health"){
									drawElementsPerformanceGraph.drawChartHealth(name);
								}else if(metrics === "cpu"){
									drawElementsPerformanceGraph.drawChartCPU(name);	
								}else if(metrics === "responsetime"){
									drawElementsPerformanceGraph.drawChartResponseTime(name);
								}else if(metrics === "memoryIO"){
									drawElementsPerformanceGraph.drawChartMemoryIO(name);	
								}else if(metrics === "memoryProc"){
									drawElementsPerformanceGraph.drawChartMemoryProc(name);								
								}else if(metrics === "utilisation"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "autil", referencia);								
								}else if(metrics === "utilisationavgbps"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "abits", referencia);								
								}else if(metrics === "errorsdiscards"){
									drawElementsPerformanceGraph.drawInterfaceErrors(name, idResource);								
								}else if(metrics === "pktshc"){
									drawElementsPerformanceGraph.drawInterfacePkts(name, idResource);								
								}else if(metrics === "qos"){
									drawElementsPerformanceGraph.drawInterfaceQos(name, idResource);																	
								}
							}
							

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
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsPerformance.refreshChart();
			});
	});
	</script>


</body>

</html>
