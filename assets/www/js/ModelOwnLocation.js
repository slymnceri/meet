function UserLocationModel (lat,long) {
    this._latitude = lat;
	this._longitude = long;
}

UserLocationModel.prototype = {
    constructor: UserLocationModel,
    
	getLatitude:function ()  {
        return this._latitude ;
    },
    getLongitude:function ()  {
        return this._longitude ;
    }
}