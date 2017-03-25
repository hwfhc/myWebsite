exports.start = start;

var root = '/usr/local/Repositories/myWebsite/public';

function start(){
    var app = (require('express')());
    var server = require('add');

    server.start(app,root);
};
