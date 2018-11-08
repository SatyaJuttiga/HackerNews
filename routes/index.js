var express=require('express');
var router=express.Router();
var request=require('request');
var passport=require('passport');
var User=require('../models/user');

router.get('/', function(req, res) {
    res.redirect('hackernews');
 });

 const authCheck=(req,res,next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

 router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    //res.send(req.user);
    res.redirect('/hackernews');
});


router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

router.get('/hackernews',authCheck,function(req,res){
    request('https://newsapi.org/v2/everything?q=bitcoin&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('hackernews',{data:data});
        }
    });
    res.send('You are logged in as' + " " + req.user.username);
});

router.get('/breakingnews',function(req,res){
    request('https://newsapi.org/v2/sources?apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('breakingnews',{data:data});
        }
    });
});

router.get('/news',function(req,res){
    request('https://newsapi.org/v2/top-headlines?country=in&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('news',{data:data});
        }
    });
});

module.exports=router;
