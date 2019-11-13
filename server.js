/*
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { ImaAuthenticator} =  require('ibm-watson/auth');
const apiKEY = "ubaJkTLUceNf2YWATrxic-4L37bWnklTxRkxMTYpwvtj";
const apiURL = "https://stream.watsonplatform.net/text-to-speech/api";
*/
// API BEFORE THAT COMMENT



const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const Post = require('./models/Post')

// PORT
const PORT = process.env.PORT || 3000;

//Config
	// Template Engine
		app.engine('handlebars', handlebars({defaultLayout: 'main'}));
		app.set('view engine', 'handlebars');
	//Body Parser
		app.use(bodyParser.json());
	// CSS and JS files
		app.use(express.static(path.join(__dirname,"public")));


// Routes
	app.get('/comments', function(req, res){
		Post.findAll({
			order: [['id', 'DESC']]
		}).then(function(phrases){	
			res.render('comments', {phrases :phrases});
		})
	});

// *********************************************** 
//				RUN API CODE HERE BELOW	
// ***********************************************
	app.post('/new_comments', function(req, res){
		Post.create({
			phrase: req.body.phrase
		});
		res.render('comments');
	})

	app.get('/read_comments', function(req, res){
		Post.findAll({
			order:[['id', 'DESC']]
		}).then(function(data){
			res.jsonp(data)
		})
	})

// Server Listening
	app.listen(PORT, function(){
		console.log('Server lintening on ' + PORT);
	});