var express=require('express'),
request=require('request');


var app=express();

const port = process.env.PORT || 8080;
var indexRoutes=require('./routes/index');

app.set('view engine','ejs');

//app.use(bodyparser.urlencoded({extended:true}));
//app.use(express.static(__dirname + '/public'));

app.use(indexRoutes);


app.listen(port,()=>{
    console.log('server started on port' + port);
});
