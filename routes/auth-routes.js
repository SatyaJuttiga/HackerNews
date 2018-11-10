const router = require('express').Router();
const passport = require('passport');
var User=require('../models/user-model');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}),function(req,res){
});

router.get('/signup',function(req,res){
    res.render('signup');
});

router.post('/signup',function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/hackernews')
        });
    });
  });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;