$( document ).ready(function() {
	
	//create a new document ID.
	$('#createBtn').click(function(e) {
		$.ajax({
			url: baseUrl + 'editor/new' ,
			type: 'POST',
			dataType: 'json',
			data: {'count' : $("#shareCnt").val()},
			success: function(data) {
				addAlert('success', 'You can access your document using ID:' + data.docId);
			},
			error: function() {
				addAlert('error', "Error in creating document. Please try after sometime.");
			}
		});
		e.stopPropagation(); //prevents the form button to do a complete page submit & refresh.
	});

});