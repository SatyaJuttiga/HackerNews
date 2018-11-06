var express=require('express');
var router=express.Router();
var request=require('request');

router.get('/', function(req, res) {
    res.redirect('hackernews');
 });


 router.get('/login',function(req,res){
      res.render('login');
  });

  router.get('/signup',function(req,res){
      res.render('signup');
  });

  router.post('/signup',function(req,res){
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

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}),function(req,res){
});

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

router.get('/hackernews',function(req,res){
    request('https://newsapi.org/v2/everything?q=bitcoin&apiKey=696fa0e753bd4c25a7989630619891e0',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('hackernews',{data:data});
        }
    });
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
