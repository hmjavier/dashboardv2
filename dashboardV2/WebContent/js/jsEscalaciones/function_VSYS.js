function build_VSYS (data, container) {
	
	var reportType = 'Vsys';
	
	var asunto = 'CNOC | ' + data.records.record.caso_cnoc + ' | ' + data.records.record.cliente_cnoc + ' | ' + data.records.record.sitio;	
	
	$ ( '#'+container ).append(
			'<table class="ui-widget ui-state-default ui-corner-all">' +
			    '<tbody>' + 
				    '<tr>' + 
					    '<td><b>Para:</b></td>' + 
					    '<td><input type="text" id="to_ES" class="form-control" maxlength="400" /></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td><b>CC:</b></td>' + 
					    '<td><input type="text" id="cc_ES" class="form-control" maxlength="400" /></td>' +
				    '</tr>' + 
				    '<tr>' + 
				    	'<td><b>Incluir Operaciones:</b></td>' + 
				    	'<td><select id="op_ES" class="form-control" multiple>' +
							'<option value="servcnoc@reduno.com.mx">SERVCNOC</option>' +
							'<option value="gobcnoc@reduno.com.mx">GOBERCNOC</option>' +
							'<option value="opercnoc@reduno.com.mx">OPERACIONES CNOC</option>' +
							'<option value="fincnoc@reduno.com.mx">FINCNOC</option>' +
							'<option value="supervision.cnoc@reduno.com.mx">SUPERVISI&Oacute;N CNOC</option>' +
							'<option value="voz.cnoc@reduno.com.mx">CNOC VOZ</option>' +
							'<option value="cnoc.bbva@reduno.com.mx">BANCOMER</option>' +
						'</select></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td><b>Asunto:</b></td>' + 
					    '<td><input type="text" id="asunto_ES" class="form-control" maxlength="130" value="' + asunto + '" /></td>' + 
				    '</tr>' +
				    '<tr>' +
			    		'<td>Quien Reporta:</td>' + 
						'<td><input type="text" id="atiende_ES" class="form-control" maxlength="130" value="' + data.records.record.atiende + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>Cr. Afectado:</td>' + 
					    '<td><input type="text" id="sitio_ES" class="form-control" maxlength="130" value="' + data.records.record.sitio + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>ID caso CNOC:</td>' + 
					    '<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>Descripci&oacute;n de la falla:</td>' + 
					    '<td><input type="text" id="falla_reportada_ES" class="form-control" maxlength="130" value="' + data.records.record.falla_reportada + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>Pruebas realizadas:</td>' +
					    '<td><textarea id="descripcion_pruebas_ES" class="form-control" cols="77" rows="10" maxlength="600">' + data.records.record.action + '</textarea></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>Contacto:</td>' + 
					    '<td><input type="text" id="contacto_person_ES" class="form-control" maxlength="130" value="' + data.records.record.contact_person + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Tel&eacute;fono:</td>' + 
					    '<td><input type="text" id="telefono_contacto_ES" class="form-control" maxlength="130" value="' + data.records.record.telefono_contacto + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>Calle:</td>' + 
					    '<td><input type="text" id="calle_ES" class="form-control" maxlength="130" value="' + data.records.record.calle + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>N&uacute;mero Exterior:</td>' + 
					    '<td><input type="text" id="num_exterior_ES" class="form-control" maxlength="130" value="' + data.records.record.num_exterior + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>N&uacute;mero Interior:</td>' + 
					    '<td><input type="text" id="num_interior_ES" class="form-control" maxlength="130" value="' + data.records.record.num_interior + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Colonia:</td>' + 
					    '<td><input type="text" id="colonia_ES" class="form-control" maxlength="130" value="' + data.records.record.colonia + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Estado:</td>' + 
					    '<td><input type="text" id="estado_ES" class="form-control" maxlength="130" value="' + data.records.record.estado + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Ciudad:</td>' + 
					    '<td><input type="text" id="ciudad_ES" class="form-control" maxlength="130" value="' + data.records.record.ciudad + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Delegaci&oacute;n / Municipio:</td>' + 
					    '<td><input type="text" id="del_mun_ES" class="form-control" maxlength="130" value="' + data.records.record.delegacion_municipio + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>C&oacute;digo Postal:</td>' + 
					    '<td><input type="text" id="codigo_ES" class="form-control" maxlength="130" value="' + data.records.record.codigo_postal + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Pa&iacute;s:</td>' + 
					    '<td><input type="text" id="pais_ES" class="form-control" maxlength="130" value="' + data.records.record.pais + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>Asignaci&oacute;n de Ventana para pruebas:</td>' + 
					    '<td><textarea id="observaciones_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese las observaciones..."></textarea></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>Severidad:</td>' + 
					    '<td><input type="text" id="prioridad_ES" class="form-control" maxlength="130" value="' + data.records.record.prioridad + '" /></td>' + 
				    '</tr>' +
			    '</tbody>' + 
			'</table><br>'
		);
	
	getEmails(reportType);
	
	$( '#'+container ).append( '&nbsp;<button id="send_es_button" type="button" class="btn btn-success glyphicon glyphicon-send">&nbsp;Send</button><br><br>' );	
	$( '#send_es_button' ).button().click(function(){
		
		var operationEmails = $( '#op_ES' ).val();
		var operationEmail = '';
		var cc = '';
		
		$(operationEmails).each(function(k, v) {
			operationEmail = operationEmail + "; " + v;
		});
		
		cc = $( "#cc_ES" ).val() + operationEmail;
		
		cnocConnector.invokeMashup(
				cnocConnector.service4,
				{
					report_type: reportType,
					to: $( "#to_ES" ).val(),
					cc: cc,
					subject: $( "#asunto_ES" ).val(),
					assignee: $( "#atiende_ES" ).val(),					
					location: $( "#sitio_ES" ).val(),
					im: $( "#caso_cnoc_ES" ).val(),
					title: $( "#falla_reportada_ES" ).val(),
					description: $( "#descripcion_pruebas_ES" ).val(),
					contact_person: $( "#contacto_person_ES" ).val(),
					phone: $( "#telefono_contacto_ES" ).val(),
					street: $( "#calle_ES" ).val(),
					num_ext: $( "#num_exterior_ES" ).val(),
					num_int: $( "#num_interior_ES" ).val(),
					colonia: $( "#colonia_ES" ).val(),
					state: $( "#estado_ES" ).val(),
					city: $( "#ciudad_ES" ).val(),
					borough: $( "#del_mun_ES" ).val(),
					zip: $( "#codigo_ES" ).val(),
					county: $( "#pais_ES" ).val(),
					testing: $( "#observaciones_ES" ).val(),
					priority: $( "#prioridad_ES" ).val()
					
				},
				function (result) {
					if (result == '' || result == null) { 
						bootbox.alert("No information Retrived");
						//alert("No information Retrived");
					}else {
						if (result == true) {
							bootbox.alert("Report sent");
							//alert("Report sent");
						} else {
							bootbox.alert("Can't send report");
							//alert("Can't send report");
						}
					}
				},
				"",
				"");
	});
}
