function sendComment(comment){
	$.ajax({
 		url: '/new_comments',
 		method: 'POST',
 		contentType: 'application/json',
 		data: JSON.stringify({ phrase: comment }),
 		error: function(xhr, ajaxOptions, thrownError){
 			alert(xhr+" - "+ ajaxOptions+" : "+thrownError);
 		}
 	}).then(function(){
 		const comments = $.ajax({
 			url: '/read_comments',
 			jsonpCallback: "update_page",
 		}).then(function(data){
 			console.log(data)
 			update_page(data);
 		})
 	});
}

// PUT SONGS ID'S BELOW
function update_page(forecast){
	var html = '';
	for (comments of forecast){
		html += '<tr><th class="phrase">' + comments.phrase + '</th><th><button class="listen">Ouvir</button></th></tr>'
	}
	document.getElementById("tablePhrases").innerHTML = html;
}


/*
$(function(){
 	// CREATE / POST
 	$('#comment-form').on('submit', function(event){
 		event.preventDefault();

 		var createComment = $('#create-comment');
 		$.ajax({
 			url: '/new_comments',
 			method: 'POST',
 			contentType: 'application/json',
 			data: JSON.stringify({ phrase: createComment.val() }),
 			success: function(response){
 				console.log(response);
 				createComment.val('');
 			},
 			error: function(xhr, ajaxOptions, thrownError){
 				console.log(data);
 			}
 		});
 	});
});
*/