jQuery(document).ready(

$( function() {
    var dialog, dialogThx ,  form;
    
   
 /*
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      phone = $( "#phone" ),
      email = $( "#email" ),
      allFields = $( [] ).add( email ).add( phone ),
      tips = $( ".validateTips" );
 */     
      
	var  askForProductDialogTimmer , askForProductDelayTimmer;  





  
    function dataSend() {
		
      var valid = true;      
		//alert ($( "form" , "#dialog-form"  ).serialize()); 
			//alert ($( "form"  ).serialize()); 
      //var str = $( "form" ).serialize();
		var ret  = true; 
		var val = ($( "#slider-hours" ).slider("values"));
		$('input[name="hoursStart"]').val(val[0]);  
		$('input[name="hoursStop"]').val(val[1]);  
		var val = ($( "#slider-days" ).slider("values"));
		$('input[name="daysStart"]').val(val[0]);  
		$('input[name="daysStop"]').val(val[1]);  		
	
	//console.log($( "#slider-days" ).slider("values"));
	//console.log($( "#slider-hours" ).slider("values"));	
		
		$.ajax({
			async: false, 
			type: 'POST',	
			cache : false , 
			dataType: "json", 		
			url: url ,
			data: $( "form" , "#dialog-form"  ).serialize() , //{"json" : "json"} /*'id_product={/literal}{$id_product}{literal}&id_product_attribute='+$('#idCombination').val()+'&askforprice_email='+email+'&askforprice_price='+price*/
			success: function (msg) {		
				//console.log(msg);			
				$('#erorsaskforproduct').html('');		
				if(msg.errors != undefined ){		
								
					var str = '';
					$.each( msg.errors, function( key, value ) {
						str += '<div class="errorAaskForPrice">'+value+'</div>'
					});
					$('#erorsaskforproduct').html(str);
					$('#erorsaskforproduct').show();	
					ret  = false; 
					valid = false;
				}else{
					$('#erorsaskforproduct').hide();
				}
				//$('#askforpriceContainer').hide();  to jak bez dialogu 
			}, 
			error:function (msg) {		
				//console.log(msg);
			}
		});		
		//return ret;      
    
      
      
      /*allFields.removeClass( "ui-state-error" );
       
     valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );      

 
      //valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      //valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      
      valid = valid && checkLength( phone, "phone", 8, 12 );
      valid = valid && checkRegexp( phone, /^([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})$/, "phone nr only " );
      
 ///alert (valid) ; 
 */
      if ( valid ) {  
		 dialog.dialog( "close" );         
		  // wyłączyć button na określony czas 
		$('#ask-for-product').prop('disabled', true);		
		setTimeout(enablAaskForProductButton, delay)
		//askForProductDelayTimmer		  		  
		  // po zamknięciu dialog wyświetlić podziekowanie 
		askForProductDialogTimmer  = setInterval(timmerFunction, 100);        
		
        dialog.dialog( "close" );                
        
      }
      return valid;
    }    
	function enablAaskForProductButton(){
		$('#ask-for-product').prop('disabled', false);		
	}    
    
	function timmerFunction() {
		if	(! dialog.dialog( "isOpen" )){			
			clearInterval(askForProductDialogTimmer);
			showTHX();
		};
	}    
	
	// wyświetla podziękowanai 
    function showTHX(){		
		dialogThx.dialog("open");
		//.ui-button-text css error  padding 
	};			
    
   


    $( "#slider-hours" ).slider({
      range: true,      
      min: 0,
      max: 23,
      step: 1,   
      values:[ 8, 17],
      slide: function( event, ui ) {        
        $( "#hours" ).html(  hours[ui.values[ 0 ]] + " - " +  hours [ui.values[ 1 ]] );       
      }
      
    });
	$( "#hours" ).html(  hours[8] + " - " +  hours [17] );       
      
    $( "#slider-days" ).slider({
      range: true,
      min: 0,
      max: 6,
      values: [ 0, 4 ],
      slide: function( event, ui ) {
		 $( "#days" ).html(  days[ui.values[ 0 ]] + " - " +  days[ui.values[ 1 ]] );         
      }
    });
    $( "#days" ).html(  days[0] + " - " +  days[4] );       







	dialogThx = $( "#dialogThx" ).dialog({autoOpen: false});
     
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      //height: 500,
      draggable: false,
	  dialogClass: 'fixed-dialog', 
      minWidth: 600 ,
      modal: true,
      buttons: {
        "Send": dataSend,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      }
    });
 
 
    $( "#ask-for-product" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
  } )


);





 
