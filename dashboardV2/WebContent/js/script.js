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
