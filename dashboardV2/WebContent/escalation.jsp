<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>:::Customer Network Operation Center (CNOC):::</title>	
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link rel="shortcut icon" href="./images/favicon.ico"/>
	<link rel="icon" type="image/png" href="./images/favicon.ico"/>
	
	<script type="text/javascript" src="../presto/hub/jsapi/loader.js"></script>
	
	<link rel="stylesheet" type="text/css" href="../presto/hub/css/prestoweb.css"/>
      <script>
        Presto.loadLib("presto-core", null, true);			
        Presto.loadLib("presto-util", null, true);		
      </script>
	
	
	<style>
		body {
			/*background: #000000 url(css/images/fondo1.jpg);*/
		}
		
		.logoCnoc{
			/*background: url(css/images/logo.png);
			background-size:150px 75px;
			background-repeat:no-repeat;*/
			width: 30%;
			height: 100px;
			position: relative;
		    margin: 10% auto auto;
		    text-align: center;
		    
    /*border-radius: 0.4em;
    border: 1px solid #191919;
    box-shadow: 
        inset 0 0 2px 1px rgba(255,255,255,0.08), 
        0 16px 10px -8px rgba(0, 0, 0, 0.6);
		    
		}*/
	</style>
	<script>
	(function($){ 
		
		 // Set config variables
        var loc = window.location.search.toString(),
        returnUrl = loc.slice(loc.indexOf("return_url=") + 11),
        appName = "Presto",
        connection = new Presto.Connection({
        	prestoUrl: '/presto'
        }),
		cp = new Presto.Util.CookieProvider({
            expiry: Presto.REMEMBERMEDAYS * 24 * 60 * 60 * 1000
        }),
		savedUsername = cp.get("PrestoUsername");
        
		// Se comentan para tener varios main 
        /*
        if (!returnUrl || returnUrl === '') {
        	returnUrl = "/dashboard/main.jsp";
    	}
    	
		if ( window.location.hash.length ) {
    		returnUrl += window.location.hash;
		}*/
		
		$(document).ready(function(){
			Presto.REMEMBERMEDAYS = 7;
            Presto.Gfx.PNGfixImg();
            
            
            // check if user is authenticated		            
            checkIfAuthenticated();
            
            setLoginBoxFocus();
	    	

            /**
             * Login form handler
             */

			$(".main").find("form").submit(function(e){
	    		e.preventDefault();
	    		var self = $(this),
                username = self.find("input[name=username]").val(),
                password = self.find("input[name=password]").val();

	    		login(username, password);
	    		/*if( $.trim(username).length == 0 ){
		    		alert("Debe ingresar el usuario.");
		    	}
		    	else if( $.trim(password).length == 0 ){
		    		alert("Debe ingresar la clave.");
		    	}else{
		    		login(username, password);
		    	}*/
	    		
			});
			
		});// termina on ready
		
		// Set Focus on Username / Password field in LoginBox
        var setLoginBoxFocus = function(){
            if (savedUsername) {
            	$('#login-box').find("input[name=username]").val(savedUsername).removeAttr("autofocus");
                $('#login-box').find("input[name=password]").focus();
            }
        };
        
        
        
        // Check if User is already authenticated or not
        // If not, show login box. Else redirect to Home Page.
        var checkIfAuthenticated = function(){
            
            connection.isAuthenticated(function(response){
            	if (response) {
            		// Se comenta para tener varios main
                	//window.location.href = decodeURIComponent(returnUrl);
                }
                else {
                	setLoginBoxFocus();
                }
            });
             
        };
        
        
        
        // Authenticate the User.
        // After successful auth, redirect to respective page (ie. Hub / Appstore)
	var module="";
	var codenets="";
	var ou="";
	var name="";
	var usernameA ='ogescami';
	var passwordA ='oscarGtz86';
        var login = function(username, password){

			connection.login(usernameA, passwordA, {
            	onSuccess: function(){
            	    cp.set("PrestoUsername", usernameA);
            	    connection.request({
						url: "/presto/edge/api/rest/cnoc_user_ldap/Invoke?x-presto-resultFormat=json&user="+username,
                        type: "get",
                        contentType: "application/x-www-form-urlencoded"
                    }, {
                        onSuccess: function(response, responseHeaders) {
                            var result = response;
							module = response.aut.module;
							codenets=response.aut.codenet;
							ou = response.aut.typeuser;
							name = response.aut.name;
                            /*if(typeof response !== "string") {
				alert("entro");
                                result = Object.toJSON(response);
                            }*/
				//console.log(response);
				//console.log(responseHeaders);
				//alert(response.aut.module);
				//alert("despues");
/*****************************************************************************************************/
/* logout */
					$.ajax({
					        type: 'GET',
					        //dataType: 'jsonp',
					        url: "/presto/edge/api/rest/UserManagerService/logout",
					        error: function (jqXHR, textStatus, errorThrown) {
					            console.log(jqXHR);
					            window.location = "index.html";
					        },
					        success: function(response){
							//alert("Cerre session");
					        	//console.log(response);
					        	//window.location = "2.html";	
/*****************************************************************************************************/
/* SE INICIA SESSION CON USUARIO MORTAL */
ou = ou.substring(0, 11);
connection.login(username, password, {
            	onSuccess: function(){
            	    cp.set("PrestoUsername", username);
            	    connection.request({
                        sid : 'ms_set_NetCodes',
                        oid : 'Invoke',
                        params : {
                        	"username" : username,
                            "module": module,
                            "net_code":codenets,
                            "ou":ou,
                            "name":name

                        },
                        header : {}
		                }, {
                        onSuccess : function(response) {
                        	
							if(codenets === "N000333"){
                                 returnUrl = "/dashboard/mainsct.jsp";
                         	}else{
                                 returnUrl = "/dashboard/main.jsp";
                         	}
                         	window.location.href = returnUrl;

                        },
                        onFailure : function(response) {

                                       console.log(response);
                        },
                        scope : this
        				});

                },
                onFailure: function(e){
                	alert("Incorrect username and/or password");
                	/*var msg = (e && e.message);
					if (!msg) {
                        msg = "Incorrect username and/or password";
                    }
					*/
                    //$.growl.show({msg: msg});
                },
                scope: this
            });//end connection.login
/*****************************************************************************************************/
					        } 
					    });
/*****************************************************************************************************/
				
                        },
                        onFailure: function(e) {
                            jQuery("#result").val(e.message);
				alert(e.message);
                        }
        		});

                },
                onFailure: function(e){
                	alert("Incorrect username and/or password: "+e.message);
                },
                scope: this
            });//end connection.login
                
        }; // end login
		
	})(jQuery);

	</script>
</head>
<body>

	<div class="logoCnoc" id="logoCnoc"><img alt="logo" src="css/images/logo.png" width="150" height="75"></div>
	<!-- <div class="container">		
		<section class="main">				
				<form class="form-3">
				    <p class="clearfix">
				        <label for="login">Username</label>
				        <input type="text" name="username" id="username" placeholder="">
				    </p>
				    <p class="clearfix">
				        <label for="password">Password</label>
				        <input type="password" name="password" id="password" placeholder=""> 
				    </p>
				    <p class="clearfix">
				        <input type="checkbox" name="remember" id="remember">
				        <label for="remember">Remember me</label>
				    </p>
				    <p class="clearfix">
				        <input type="submit" name="send" value="Sign in" id="send" class="send">
				    </p>       
				</form>​
			</section>			
	</div>-->
			
	<div class="container">
    <div class="row">
    	<section class="main">
    		<div class="col-md-4 col-md-offset-4">
	            <div class="panel panel-default panel-default-login">
	                <div class="panel-heading">
	                    <span class="glyphicon glyphicon-lock"></span> Login</div>
	                <div class="panel-body">
	                    <form class="form-horizontal" role="form">
	                    <div class="form-group">
	                        <div class="col-sm-8 input-group">
	                        	<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
	                            <input type="text" name="username" id="username" class="form-control" style="height: 30px;" placeholder="Username" required >
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <div class="col-sm-8 input-group">
	                        	<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
	                            <input type="password" name="password" id="password" class="form-control" style="height: 30px;" placeholder="Password" required>
	                        </div>
	                    </div>
	                    <div class="form-group last">
	                        <div class="col-sm-offset-3 col-sm-9">
	                            <button type="submit" name="send" value="Sign in" id="send" class="btn btn-success btn-sm">Sign in</button>
	                            <button type="reset" class="btn btn-default btn-sm">Reset</button>
	                        </div>
	                    </div>
	                    </form>
	                </div>
	                <div class="panel-footer">
	                    <div class="copyright-info" style="color: #7D7F80; text-align: center; font-size: 9px;">
	                       Customer Network Operation Center (CNOC)<br> &copy; 2014 CNOC
	                       Tools .Todos los derechos reservados.                        
	               		</div>
	                </div>
	            </div>
	        </div>
    	</section>        
    </div>
</div>
	
	<div id="copyright" class="copyright">
               <table title="Click to Verify - This site chose Symantec SSL for secure e-commerce and confidential communications.">
                       <tr>
                               <td width="135" align="center" valign="top"><script  type="text/javascript" src="https://seal.verisign.com/getseal?host_name=dashboard-i2.cnoc.telmexit.com&amp;size=S&amp;use_flash=NO&amp;use_transparent=NO&amp;lang=en"></script><br />
                                       <a href="http://www.symantec.com/verisign/ssl-certificates" target="_blank" style="text-decoration: none; font: bold 7px verdana, sans-serif; letter-spacing: .5px; text-align: center; margin: 0px; padding: 0px;">ABOUT SSL CERTIFICATES</a>
                               </td>
                       </tr>
               </table>
       </div>
       <!-- end Copyright -->
</body>
</html>