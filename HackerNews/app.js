var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose=require('mongoose');  

//var routes=require('./routes/index');
var User=require('./models/users');
var bodyParser=require('body-parser');
var request=require('request');
    passport=require('passport'),
    localStrategy=require('passport-local'),
    passportLocalMongoose=require('passport-local-mongoose');

    mongoose.connect('mongodb://localhost/hackernews');


//app.use('/', routes);
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


app.get('/', function(req, res) {
    res.redirect('hackernews');
 });


  app.get('/login',function(req,res){
      res.render('login');
  });

  app.get('/signup',function(req,res){
      res.render('signup');
  });

  app.post('/signup',function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/');
        });
    });
});

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}),function(req,res){
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

app.get('/hackernews',function(req,res){
    request('https://newsapi.org/v2/everything?q=bitcoin&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('hackernews',{data:data});
        }
    });
});

app.get('/ask',function(req,res){
    request('https://newsapi.org/v2/sources?apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('ask',{data:data});
        }
    });
});

app.get('/search',function(req,res){
    request('https://newsapi.org/v2/everything?q=bitcoin&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('search',{data:data});
        }
    });
});



app.get('/news',function(req,res){
    request('https://newsapi.org/v2/top-headlines?country=in&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('news',{data:data});
        }
    });
});


app.listen(3002,()=>{
    console.log('server started on 3002');
});
module.exports=app;

