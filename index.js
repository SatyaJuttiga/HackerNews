var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose=require('mongoose');  

var User=require('./models/user-model');
var bodyParser=require('body-parser');
var request=require('request');
    passport=require('passport'),
    localStrategy=require('passport-local'),
    passportLocalMongoose=require('passport-local-mongoose'),
    indexRoutes=require('./routes/index'),
    authRoutes=require('./routes/auth-routes');

    mongoose.connect('mongodb://localhost/hackernews');


var app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret:'bhavna juttiga',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.User;
    next();
});

app.use(indexRoutes);
app.use(authRoutes);


app.listen(3002,()=>{
    console.log('server started on 3002');
});


/*
body 
    {
      background-color:rgb(109, 25, 77);
      color:white;
      font-family:"Courier New";
      text-align:center;
    }
 */