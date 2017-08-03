const express = require("express");
const fs = require("fs");
const MongoClient= require('mongodb');
const app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

//body parser allows reading data from the api for use by app.put , app.post etc
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var schema = mongoose.Schema({
	
			"id": String,
			"issueId": String,
			"dateCreated": String,
			"summary": String,
			"description": String,
			"highPriority": String,
			"severity": String,
			"reporter": String,
			"assignedUser": String,
			"status": String
});

//create a new mongoose model using the schema above
var Bug = mongoose.model('bug', schema);

var bugsArray=[];

//set the port of server at 8081
app.set("port", process.env.PORT || 8081);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//gets mongodb collection 'bugs' and sends it to /api/bugs/
app.get('/api/bugs', (req,res)=>{
	MongoClient.connect('mongodb://localhost/local', function(err, db){
		const bugs = db.collection('bugs').find({}).toArray(function(err,docs){
			bugsArray = docs;
		})
	});
	const r = (() => {
	  return bugsArray;
  })();
  //handle response errors
  if (typeof r !== 'undefined') {
    res.json(r);
  } else {
    res.json([]);
  }
	
});
//app.post adds data to the database
app.post('/api/bugs', (req,res)=>{
	console.log('posting new bug');
	const bug = new Bug({
		'id': req.body.id,
		'issueId': req.body.issueId,
		'comments': req.body.comments,
		'dateCreated': req.body.dateCreated,
		'summary': req.body.summary,
		'description': req.body.description,
		'highPriority': req.body.highPriority,
		'severity': req.body.severity,
		'reporter': req.body.reporter,
		'assignedUser': req.body.assignedUser,
		'status': req.body.status	
	});
	bug.save();
});

//app.put changes data in a given collection
app.put('/api/bugs', (req,res)=>{
	console.log(req.body);
	console.log('put to bugs  '+req.body.id+ '  '+ req.body.issueId);
	MongoClient.connect('mongodb://localhost/local', function(err, db){
		//in this case, the collection is 'bugs' and the document to change will have a known _id
		const bugs = db.collection('bugs').update({id: req.body.id},{$push:{
			'id': req.body.id,
			'issueId': req.body.issueId,
			'date':req.body.date, 
			'priority':req.body.priority, 
			'summary':req.body.summary, 
			'severity':req.body.severity, 
			'description':req.body.description, 
			'reporter':req.body.reporter, 
			'assignedUser':req.body.assignedUser, 
			'status':req.body.status
	}}) 
	});
	
}); 

//have the app listening on the port and output to console
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
