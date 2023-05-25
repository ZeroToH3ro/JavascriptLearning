//Declare library for http, fs
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){
    //Check if the request is a GET request
    console.log("Server is openned at port 3000");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //read file
    fs.readFileSync('index.html', function(err, data){
        if (err){
            throw err;
        }
        console.log("Operation Success");
        res.end(data);
    })
}).listen(3000);
