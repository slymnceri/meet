var FriendPhoneNumber = "";
var jsonString=null;
var baseUrl = "http://suleymanceri-001-site1.myasp.net/Service1.asmx/"
var userPhoneNumber = null;
	
$(document).ready(function(e) {
    document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady()
		{	
			//userPhoneNumber = window.localStorage.getItem("PhoneNumber");
			//alert(userPhoneNumber);
			//if(userPhoneNumber==null){
			//	$("#btn_startMeet").parent().hide();
			//	$("#btn_updateInfo").parent().hide();
			//	$('#btn_register').on('click',function(){
			//		$.mobile.changePage($('#user_info')); //page navigation the update own information
			//	});
			//}
			//else{
				//$("#btn_register").parent().hide();
				$('#btn_startMeet').on('click',function(){
					window.alertBack("", function(json) {
						jsonString=json
						//alert(json.requestNo)
						//if(json.requestNo!=""){
						//	$.mobile.changePage($('#contactList')); //page navigation the select friend from contact list
						//}
						//else{
						//	FriendPhoneNumber=json.requestNo;
							$.mobile.changePage($('#basic-map')); //page navigation the mapping view
						//}
					});
				
				});
				$('#btn_updateInfo').on('click',function(){
					$.mobile.changePage($('#user_info')); //page navigation the update own information
				});		
			}
				
		

});
