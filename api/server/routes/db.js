var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var bodyParser=require('body-parser');

var  resultarray=[];
var config = {    
    userName: 'swaasadmin', 
    password: 'Swaas@321',  
    server: 'auqfucppcw.database.windows.net',   
 // server: '127.0.0.1',   
    options: {     
        database: 'Kangle_09052017',
        encrypt:true,
        port:1433,      
        rowCollectionOnDone:true
        }
}

module.exports={
connect:function (req,callback)
{
    var newdata = [];
    var dataset = [];
    var connection = new Connection(config);

  connection.on('connect', function(err) {      
      if (err) {
        console.log(err);
      } else {
        console.log("connected");        
      }      
    }
  );
},

Login:function(req,callback){
     var newdata = "";
    var dataset = [];
    var connection=new Connection(config);

    connection.on('connect',function(err){
        if(err){
            console.log(err);
        }else{
            checkUser(req);
        }

    });

    function checkUser(req){
      request=new Request("select @name=userName from tblUsers where userName=@uName and passWord=@pWord", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
             if (rowCount ==0) {
                callback(null, false);
            }
            else
            {
                console.log("connected");
                callback(null, newdata);
            }
           
      }
    });
     request.addParameter('uName',TYPES.VarChar,req.body.usrName);
     request.addParameter('pWord',TYPES.VarChar,req.body.passwrd);
     request.addOutputParameter('name', TYPES.VarChar);
     request.on('returnValue', function(parameterName, value, metadata) {
        console.log(parameterName + ' = ' + value);    
        newdata=value;     
    });

    //  request.on('row', function(columns) {           
    //          var rowObject={};
    //         columns.forEach(function(column){
    //             rowObject[column.metadata.colName]=column.value;
    //         });
    //         newdata.push(rowObject);     
    //     });   

     connection.execSql(request); 

    }
},

getProjects:function(req,callback){
 var newdata = [];
    var dataset = [];
    var connection = new Connection(config);

  connection.on('connect', function(err) {      
      if (err) {
        console.log(err);
      } else {
        console.log("connected");
         getAllProjects(req);
      }      
    }
  );

  function getAllProjects(req) {
     
    request = new Request("select * from tblProjects", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
             if (rowCount ==0) {
                callback(null, false);
            }
            else
            {
                 callback(null, newdata);
            }
      }
    });
       request.on('row', function(columns) {           
             var rowObject={};
            columns.forEach(function(column){
                rowObject[column.metadata.colName]=column.value;
            });
            newdata.push(rowObject);     
        });              
             
    connection.execSql(request);      
  }          
},

getSelectedProject:function(req,callback){    
 var newdata = [];
    var dataset = [];
    var connection = new Connection(config);

  connection.on('connect', function(err) {      
      if (err) {
        console.log(err);
      } else {
        console.log("connected");
         getAllProjects(req);
      }      
    }
  );

  function getAllProjects(req) {
     
    request = new Request("select * from tblProjects where projectId=@id", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
             if (rowCount ==0) {
                callback(null, false);
            }
            else
            {
                 callback(null, newdata);
            }
      }
    });
     request.addParameter('id',TYPES.Int,req);
       request.on('row', function(columns) {           
             var rowObject={};
            columns.forEach(function(column){
                rowObject[column.metadata.colName]=column.value;
            });
            newdata=rowObject;
            console.log(newdata);  
        });              
             
    connection.execSql(request);      
  }          
},

updateProject:function(req,callback){
   
    var newdata = [];
    var dataset = [];
    var connection = new Connection(config);

  connection.on('connect', function(err) {      
      if (err) {
        console.log(err);
      } else {
        console.log("connected");
         updateProject(req);
      }      
    });

    function updateProject(req) {
     
    request = new Request("update tblProjects set projectName=@Name,projectCode=@Code,category=@cat,"+
                          "projectOwner=@owner,contributors=@cont,startDate=@sDate,completionDate=@cDate,"+
                          "description=@desc,status=@sta where projectId=@id", 
    function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
             if (rowCount < 1) {
                callback(null, false);
            }
            else
            {
                console.log(rowCount);
                 callback(null, rowCount);
            }
      }
    });
    request.addParameter('id',TYPES.Int,req.params.id);
    request.addParameter('Name',TYPES.VarChar,req.body.projectName);
    request.addParameter('Code',TYPES.VarChar,req.body.projectCode);
    request.addParameter('cat',TYPES.VarChar,req.body.category);
    request.addParameter('owner',TYPES.Int,req.body.projectOwner);
    request.addParameter('sDate',TYPES.VarChar,req.body.startDate);
    request.addParameter('cDate',TYPES.VarChar,req.body.completionDate);
    request.addParameter('cont',TYPES.Bit,req.body.contributors);
    request.addParameter('desc',TYPES.VarChar,req.body.description);
    request.addParameter('sta',TYPES.VarChar,req.body.status);    
    connection.execSql(request);      
  }       
}
}



