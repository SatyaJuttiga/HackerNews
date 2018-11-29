var express=require('express'),
    router=express.Router(),
    request=require('request');

    
router.get('/',function(req,res){
    request('https://swapi.co/api/people/',function(error,response,body){
        if(!error && response.statusCode == 200){
            var data=JSON.parse(body)
            res.render('home',{data:data});
        }
    });
});



   

module.exports=router;    

   