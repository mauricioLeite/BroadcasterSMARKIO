function sendComment(comment){
	$.ajax({
 		url: '/new_comments',
 		method: 'POST',
 		contentType: 'application/json',
 		data: JSON.stringify({ phrase: comment }),
 		error: function(xhr, ajaxOptions, err){
 			alert(xhr+" - "+ ajaxOptions+" : "+err);
 		}
 	}).then(function(){
 		const comments = $.ajax({
 			url: '/read_comments',
 			jsonpCallback: "update_page",
 		}).then(function(data){
 			update_page(data);
 		})
 	});
}

function update_page(forecast){
	var html = '';
	for (comments of forecast){
		html += '<tr><th class="phrase"><p>' + comments.phrase + '</p></th><th class="listen" id="'+comments.id+'" onClick="playAudio(this.id)" ><button>Ouvir</button></th></tr>'		
	}
	document.getElementById("tablePhrases").innerHTML = html;
}

function playAudio(id){
	var html = '';
	html += '<audio controls>'
    html += '<source src="./audios/'+id+'.wav" type="audio/wav">'
    html += '</audio>'
	document.getElementById(id).innerHTML = html;
	$.ajax({
 		url: '/play_audio',
 		method: 'POST',
 		contentType: 'application/json',
 		data: JSON.stringify({ identify: id }),
 		error: function(xhr, ajaxOptions, err){
 			alert(xhr+" - "+ ajaxOptions+" : "+err); 			
 		}
	});
}