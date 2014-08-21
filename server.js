var express = require("express");
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.port || 3000;
var router = express.Router();

var baseUrl = './api/';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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

router.get('/', function(req, res){
	res.send('base url for api');
});

app.use('/api', router);

router.get('/:input', function(req, res){
	var fileName = baseUrl + req.params.input + '.json';
	fs.readFile(fileName, 'utf-8', function(err, data){
		if(err) return res.send('status 500, file not found');
		data = JSON.parse(data);	
		res.json(data);
	});
});

router.post('/', function(req, res){
	var data = req.body;
	var fileName = baseUrl + data.name + '.json'
	fs.writeFile(fileName, JSON.stringify(data), function(err){
		if(err) return res.status(500);
		console.log('success!');
		res.json(data);
	});
});

app.listen(port, function(){
	console.log("Server Started on port "+ port);
});
