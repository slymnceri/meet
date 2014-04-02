
$(document).on('pageshow','#user_info',function() {
	$('#submit').on('click',function(){
		
			var phoneNumber = $('#phone_number').val();
			var username = $('#username').val();
			var password = $('#password').val();
			
			$.ajax({ 
       			 url: baseUrl+"SaveUser",
       			 type: "POST",
        		 data: '{"phoneNumber":"'+phoneNumber+'","username":"'+username+'","password":"'+password+'"}',
				contentType: "application/json; charset=utf-8",
        		dataType: "json",
        		success: function(rsp){
					if(rsp.d != null){
					var info = jQuery.parseJSON(rsp.d);
					window.localStorage.setItem("PhoneNumber",info.phoneNumber);
					$('#msgsave').append("Successfully recorded :)")
					
					}
					else{
						alert("incorrect username or password")
						}
        		},
				error:function(){
					alert("error");
				}
				
      		});
					
	});
});