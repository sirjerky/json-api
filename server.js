var express = require("express");
var http = require('http');

var app = express();

http.createServer(app, function(req, res){
	console.log("Server Created");
});

app.get('/', function(req, res){
	res.send("Hello World");
});

app.get('/time', function(req, res){
	var d = new Date();
	var hour = d.getHours();
	var ampm = "am";
	if(hour === 0){
		hour = 12;
	};
	if(hour === 12){
		ampm = "pm";
	};
	if (hour > 12){
		hour = hour - 12;
		ampm = "pm";
	};
	res.send("The local time is " + hour + ':' + d.getMinutes() + " " + ampm);
});

app.get('/:input', function(req, res){
	//var name = req.url.split('/').pop();
	var data = {"msg": "Hello " + req.params.input + "!"};
	res.send(data);
});

app.listen(3000, function(){
	console.log("Server Started on port 3000");
});