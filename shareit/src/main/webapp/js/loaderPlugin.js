//href:http://www.jqueryscript.net/loading/jQuery-Plugin-For-Creating-Loading-Overlay-with-CSS3-Animations-waitMe.html
//yet to dowload the plugin.
$(function(){

//	none, bounce, rotateplane, stretch, orbit, 
//	roundBounce, win8, win8_linear or ios
	var current_effect = 'bounce'; // 

	$('#demo').click(function(){
		run_waitMe(current_effect);
	});

	function run_waitMe(effect){
		$('#SELECTOR').waitMe({

//			none, rotateplane, stretch, orbit, roundBounce, win8, 
//			win8_linear, ios, facebook, rotation, timer, pulse, 
//			progressBar, bouncePulse or img
			effect: 'bounce',

//			place text under the effect (string).
			text: '',

//			background for container (string).
			bg: 'rgba(255,255,255,0.7)',

//			color for background animation and text (string).
			color: '#000',

//			change width for elem animation (string).
			sizeW: '',

//			change height for elem animation (string).
			sizeH: '',

//			url to image
			source: ''

		});
	}

});
