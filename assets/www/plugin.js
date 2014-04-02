window.alertBack = function(str, callback) {
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "AlertBack", "alertBack", [str]);
};