function updateRequestStatus(position,callBack)
{
    $.ajax(
    {
        url: "http://10.8.41.89:5000/Service1.asmx/UpdateRequestStatus",
        type: "POST",
        data: "{'id':2 }",
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