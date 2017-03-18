exports.start = start;

var express = require('express');

var app = express();

function start(root){
    app.get('/',function(req,res){
        res.sendFile(root + '/index.html');
    });

    app.get('/css/:file',function(req,res){
        res.sendFile(root + '/css/' + req.params['file']);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(root + '/javascripts/' + req.params['file']);
    });

    app.get('/articles/:file',function(req,res){
        res.sendFile(root + '/articles/' + req.params['file']);
    });


    var server = app.listen(80,function(){
        console.log('server start...');
    })
};