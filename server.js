var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comments = [
{
	id:1,
	phrase: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis vulputate. Integer facilisis magna ac quam luctus suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis urna enim. Sed pulvinar, sem tincidunt molestie placerat, ipsum felis sagittis sapien, id commodo leo ipsum eget neque. Pellentesque sed egestas mauris. Pellentesque vel urna ac ex mattis feugiat. In finibus posuere lacus ac scelerisque. Donec in nunc egestas, commodo lorem in, molestie arcu.'
},
{
	id:2,
	phrase: 'Hello world.'
}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/comments', function(req, res){
	res.send({comments: comments});
})

app.post('/comments', function(req, res){
	var commentPhrase = req.body.phrase;
	currentId++;
	comments.push({
		id: currentId,
		phrase: commentPhrase
	});
	res.send('Successfully updated comment!');
});

app.listen(PORT, function(){
	console.log('Server lintening on ' + PORT);
});