const mongoose = require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});*/

var UserSchema= new mongoose.Schema({
    username:String,
    password:String,
});


UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User', UserSchema);