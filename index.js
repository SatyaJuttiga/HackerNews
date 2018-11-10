var express = require('express'),
    path = require('path'),
    router = express.Router(),
     mongoose=require('mongoose'), 
     User=require('./models/user-model'),
     bodyParser=require('body-parser'),
     expressSession=require('express-session'),
     cookieSession=require('cookie-session'),
      env=require('dotenv'),
    request=require('request'),
    passport=require('passport'),
    localStrategy=require('passport-local'),
    passportLocalMongoose=require('passport-local-mongoose'),
    indexRoutes=require('./routes/index'),
    authRoutes=require('./routes/auth-routes');



var app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge:24 * 60 * 60 * 60 * 1000,
    keys: [env.session.cookieKey]
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

mongoose.connect(env.mongodb.dbURI,() => {
    console.log('connected to mongo db');
});


app.listen(3002,()=>{
    console.log('server started on 3002');
});


