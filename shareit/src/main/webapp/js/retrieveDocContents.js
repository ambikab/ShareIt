$( document ).ready(function() {
	$('.dropdown-menu input').click(function(e) {
		e.stopPropagation();
	});
	
	$('#docIdBtn').click(function() {
		alert('value entered is :' + $('#docId').val());
	});
});