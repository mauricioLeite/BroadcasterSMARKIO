function loadComments(){
	$.ajax({
		url: '/comments',
		contentType: 'application/json',
		success: function(response){
			var tbodyEl = $('tbody');
			tbodyEl.html('');
			response.comments.forEach(function(comments){
				tbodyEl.append('\
					<tr>\
						<td class="phrases"><p>'+comments.phrase+'</p></td>\
						<td>\
							<button class="listen">Ouvir</button>\
						</td>\
					</tr>\
				');
			})
		}
	});

};

$(function(){
	//	GET/READ
	loadComments();

 	// CREATE / POST

 	$('#comment-form').on('submit', function(event){
 		event.preventDefault();

 		var createComment = $('#create-comment');
 		$.ajax({
 			url: '/comments',
 			method: 'POST',
 			contentType: 'application/json',
 			data: JSON.stringify({ phrase: createComment.val() }),
 			success: function(response){
 				console.log(response);
 				createComment.val('');
 				loadComments();
 			},
 			error: function(xhr, ajaxOptions, thrownError){
 				console.log(data);
 			}
 		});
 	});
});