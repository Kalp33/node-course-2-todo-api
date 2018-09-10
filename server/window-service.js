var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'Todo API Service',
    description: 'ToDo API Service',
    script: '.\\server.js',
});


svc.on('install',function(){
    svc.start();
});

svc.install();
