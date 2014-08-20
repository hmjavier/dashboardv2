function removejscssfile(filename, filetype){
				 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
				 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
				 var allsuspects=document.getElementsByTagName(targetelement)
				 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
				  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
				   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
				}
			}
				 
function loadjscssfile(filename, filetype){
				 if (filetype=="js"){ //if filename is a external JavaScript file
				  var fileref=document.createElement('script');
				  fileref.setAttribute("type","text/javascript");
				  fileref.setAttribute("src", filename);
				 }
				 else if (filetype=="css"){ //if filename is an external CSS file
				  var fileref=document.createElement("link");
				  fileref.setAttribute("rel", "stylesheet");
				  fileref.setAttribute("type", "text/css");
				  fileref.setAttribute("href", filename);
				 }
				 if (typeof fileref!="undefined")
				  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function modelView(){
	  
	  jQuery('#overlay').fadeIn('fast',function(){
	    jQuery('#box').animate({'top':'50px'},500,function(){
	      
	      
	    });
	  });
	  jQuery('#boxclose').click(function(){
	    jQuery('#box').animate({'top':'-800px'},500,function(){
	      jQuery('#overlay').fadeOut('500');
	      $(".tops").removeClass("active");
	    });
	  });
	  
	}

function logout(){
	
	bootbox.confirm("<h3>Exit Dashboard CNOC</h3><br>Are you sure?", function(result) {
		if(result){
			$.ajax({
		        type: 'GET',
		        dataType: 'jsonp',
		        url: cnocConnector.logout,
		        error: function (jqXHR, textStatus, errorThrown) {
		            console.log(jqXHR);
		            window.location = "index.html";
		        },
		        success: function(response){
		        	window.location = "index.html";	
		        }
			});	
		}
	});	
}

function home(){
	window.location = "main.jsp";
}

function themeChanges(filename, flag){	
	removejscssfile("css/sb-admin.css", "css");
	loadjscssfile(filename, "css");
	loadjscssfile("css/sb-admin.css", "css");
	
	if(flag){
		removejscssfile("css/bootstrapW.css", "css");
		loadjscssfile("js/highChartsTheme1.js", "js");
	}else{
		removejscssfile("css/bootstrap.css", "css");
		removejscssfile("js/highChartsTheme1.js", "js");
	}
	
}

function generateMenu(){
	$.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: cnocConnector.menu,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            //window.location = "index.html";
        },
        success: function(response){
        	var menu = response.aut.module[2].split(";");
        	var customer = response.aut.module[0];

        	$(".nameCustomer").text(customer);
        	
        	$.each(menu, function( index, value ) {
        		console.log(index + ": " + value);
        		if(value === "gen=true"){
        			
        			var general = "<li><a href='main.jsp'><i class='fa fa-fw fa-home'></i> Home </a></li>";
        			general +="<li><a href='incidents.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
        			general +="<li><a href='changes.jsp'><i class='fa fa-fw fa-refresh'></i> Changes </a></li>";
        			general +="<li><a href='performance.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance </a></li>";
        			general +="<li><a href='performanceGraph.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance Report </a></li>";
        			
        			$(".menuCnoc").append(general);

        		}else if(value === "tck=true"){

        			var tickets = "<li><a href='tickets.jsp'><i class='fa fa-fw fa-tag'></i> Tickets </a></li>";
        			$(".menuCnoc").append(tickets);
        			
        		}else if(value === "inv=true"){

        			var inventory = "<li><a href='inventory.jsp'><i class='fa fa-fw fa-list-alt'></i> Inventory </a></li>";
        			$(".menuCnoc").append(inventory);
        			
        		}else if(value === "esc=true"){
        			
        			var esclations = "<li><a href='inventory.jsp'><i class='fa fa-fw fa-cloud-upload'></i> Escalaciones </a></li>";
        			$(".menuCnoc").append(esclations);
        		}
        	});
        }
	});	
}

function viewNodeDetail(){
	$(".detalleNodo").show();
	$(".nodeDetailView").hide();
}

function hideNodeDetail(){
	$(".detalleNodo").hide();
	$(".nodeDetailView").show();
}


$('.leermas.imprimir').click(function(){
	$(".startDatePdf").empty();
	$(".endDatePdf").empty();
	$(".startDatePdf").append("Start Date: "+$("#startDate").val());
	$(".endDatePdf").append("End Date: "+$("#endDate").val());
	
	$(".dateRange").hide();
	$(".selectMetric").hide();
	$(".headerCharts").hide();
	$(".portada").show();
	window.print();
	$(".portada").hide();
	$(".dateRange").show();
	$(".selectMetric").show();
	$(".headerCharts").show();
	
});