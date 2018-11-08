var mongoose=require('mongoose');

var oauthSchema=new mongoose.Schema({
    username:String,
    googleid:String,
    thumbnail:String
});

var Oauth=module.exports=mongoose.model('Oauth',oauthSchema);