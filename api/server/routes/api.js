const express = require('express');
const router = express.Router();
var tds=require('./db')
var bodyParser=require('body-parser');
var jsonParser = bodyParser.json();


router.get('/',function(req,res){
    res.send("api works");
})
router.post('/Login',function(req,res){
   
    tds.Login(req,function(err,rows){
        if(err){
            console.log(err);
        }else if(rows){
           var result=rows;
           console.log(result);
            res.json({IsAuth:"true",UserName:result});
        }
        else
        { res.json({IsAuth:"false",UserName:""});}
    });
});

router.get('/Projects', function(req,res){
    tds.getProjects(req,function(err,rows)
    {
         if (err) {            
        } else if (rows) 
            {    
            var posts=rows;             
             res.json(posts);
            } else {
            }
    })
});
router.get('/Projects/:id', function(req,res){
    var pId=req.params.id;
    tds.getSelectedProject(pId,function(err,rows)
    {
         if (err) {            
        } else if (rows) 
            {    
            var posts=rows;    
            console.log(posts);    
             res.json(posts);
            } else {
                 res.json( "0" );
            }
    })
});
router.put('/projects/edit/:id',function(req,res){   
 tds.updateProject(req,function(err,rowCount)
   {
       if(err)
       {
           res.json({data:"error occured"});

       }else if(rowCount){
            res.json({data:"updated successfully"});
       }else{
           res.json({data:"updation failed"});
       }      
   })   
});



module.exports = router;