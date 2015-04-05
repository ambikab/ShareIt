//adds alert with the given message to a html page.
function addAlert(alertType, alertMsg) {
	//valid alertTypes are : success / error / warning / info
	var alertBegin;
	if (alertType === "warning") {
		alertBegin = "<div class = 'alert' >";
	} else {
		alertBegin = "<div class = 'alert alert-" + alertType + "'>";
	}
	var alertEnd = "</div>";
	var htmlAlertMsg = "<button type='button' class='close' data-dismiss='alert'>&times;</button> " 
		+ " <strong> " + alertType + "! </strong> "+ alertMsg;
	$(".notifications").append(alertBegin + htmlAlertMsg + alertEnd);
}
