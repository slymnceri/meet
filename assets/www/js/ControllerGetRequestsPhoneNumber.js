function updateRequestStatus(phoneNumber,callBack)
{
    $.ajax(
    {
        url: baseUrl+"GetRequestPhoneNumber",
        type: "POST",
        data: "{'id':'"+phoneNumber+"' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(rsp)
        {
            var info = jQuery.parseJSON(rsp.d);
            callBack(info);
        },
        error: function()
        {
            callBack("error");
        }

    });


}