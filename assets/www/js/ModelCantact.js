function ContactModel (list) {
    this._contactList = list;
}

ContactModel.prototype = {
    constructor: ContactModel,
    
	getContactList:function ()  {
        return this._contactList ;
    }

}