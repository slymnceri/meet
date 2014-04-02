function getlocationFunction(callBack)
	{
		$.ajax({ 
       			 url: baseUrl+"GetLocation",
       			 type: "POST",
        		 data: "{'id':'"+FriendPhoneNumber+"'}",
				contentType: "application/json; charset=utf-8",
        		dataType: "json",
        		success: function(rsp){
					var info = jQuery.parseJSON(rsp.d);
					callBack(info);
        		},
				error:function(){
					callBack("error");
				}
      	});
}