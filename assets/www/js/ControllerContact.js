$(document).on('pageshow','#contactList',function() {
			
	var dataTosend='{"nList":'+JSON.stringify(jsonString.data)+'}'
	$.ajax({ 
   			 url: baseUrl+"GetContactList",
   			 type: "POST",
    		 data: dataTosend,
			contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(rsp){
				var info = jQuery.parseJSON(rsp.d);
				$('#contact_list').children().remove('li');
					for(var i=0; i<info.length; i++){
						$("#contact_list").append("<li><a id='"+info[i].phoneNumber+"' href='#track_info' data-ajax='false'>" + info[i].userName + "</a></li>");
					}
				$("#contact_list").listview('refresh');
    		
				$("#contact_list li a").on('click', function(){
					FriendPhoneNumber = $(this).attr('id');
					$.mobile.changePage($('#basic-map')); 
				});
    		},
    		error: function (xhr, ajaxOptions, thrownError) {
    	        alert(xhr.status);
    	        alert(thrownError);
    	      }
			
  	});
		
	
		
});

