function PersonInformationModel (phoneNumber,username,password) {
    this._phoneNumber = phoneNumber;
	this._username = username;
	this._password = password;
}

PersonInformationModel.prototype = {
    constructor: PersonInformationModel,
    
	getPhoneNumber:function ()  {
        return this._phoneNumber ;
    },
    getUsername:function ()  {
        return this._username ;
    },
    getPassword:function () {
    	return this._password;
    }
}