$( document ).ready(function() {
	
	//create a new document ID.
	$('#createBtn').click(function(e) {
		var data = {};
		data['count'] = $("#shareCnt").val();
		var jsonData = JSON.stringify(data);
		$.ajax({
			url: baseUrl + 'editor/new' ,
			type: 'POST',
			dataType: 'json',
			data: jsonData,
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