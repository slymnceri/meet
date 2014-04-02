function FriendLocationModel (lat,long) {
    this._latitude = lat;
	this._longitude = long;
}

FriendLocationModel.prototype = {
    constructor: FriendLocationModel,
    
	getLatitude:function ()  {
        return this._latitude ;
    },
    getLongitude:function ()  {
        return this._longitude ;
    }
}