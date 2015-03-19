
$( document ).ready(function() {
	var editor = CodeMirror.fromTextArea(document.getElementById("textEditor"), {
		lineWrapping: true,
		lineNumbers: true,
	    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
	    foldGutter: true,
	    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	    mode: "simplemode"
	});
	editor.setSize(900, 400);
	//editor.foldCode(CodeMirror.Pos(40, 0));
});