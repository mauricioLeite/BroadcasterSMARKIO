
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const Comments = require('./models/Comments')


// API requires
const fs = require('fs');
const getStat = require('util').promisify(fs.stat);
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const apiKEY = "ubaJkTLUceNf2YWATrxic-4L37bWnklTxRkxMTYpwvtj";
const apiURL = "https://stream.watsonplatform.net/text-to-speech/api";


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
		Comments.findAll({
			order: [['id', 'DESC']]
		}).then(function(phrases){	
			res.render('comments', {phrases :phrases});
		})
	});

	app.post('/new_comments', function(req, res){
		Comments.create({
			phrase: req.body.phrase
		});
		Comments.findAll().then(function(comments){
			var id = comments.length+1;
			const textToSpeech = new TextToSpeechV1({
  				authenticator: new IamAuthenticator({
    				apikey: apiKEY,
  				}),
  				url: apiURL,
			});

			const params = {
			  	text: req.body.phrase,
			  	accept: 'audio/wav',
			  	voice: 'pt-BR_IsabelaV3Voice',
			};

			textToSpeech.synthesize(params).then(function(response){
			   	const audio = response.result;
			    return textToSpeech.repairWavHeaderStream(audio);
			}).then(function(repairedFile){
				var save_sound = "./public/audios/"+id+".wav";
			    fs.writeFileSync(save_sound, repairedFile);
			    console.log('audio written correctely.');
			}).catch(function(err){
			    console.log(err);
			});

		})
		res.render('comments');
	})

	app.get('/read_comments', function(req, res){
		Comments.findAll({
			order:[['id', 'DESC']]
		}).then(function(data){
			res.jsonp(data)
		})
	})

	app.post('/play_audio', async function(req, res){
		const filePath = './public/audios/'+req.body.identify+'.wav';
		const stat = await getStat(filePath);
		res.writeHead(200, {
        	'Content-Type': 'audio/wav',
        	'Content-Length': stat.size
    	});
    	console.log(filePath);
		const stream = fs.createReadStream(filePath);
	    stream.on('end', function(){
			console.log('Finish stream!');
	    })
	    stream.pipe(res);
	})

// Server Listening
	app.listen(PORT, function(){
		console.log('Server lintening on http://localhost:'+PORT+'/comments');
	});