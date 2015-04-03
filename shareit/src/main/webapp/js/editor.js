var logs = new Array();
var localCache = new Array(); //list of changes pending to be sent to the server.
var clockVal = {}; //representation of vector clocks.
var syncHead = 0;
var clientId = null;

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

	// function for fetching the contents of the given docId and also sets an unique clientID.
	$('#docIdBtn').click(function() {
		docId = $('#docId').val();
		$.ajax({
			url: baseUrl + 'editor/' + docId,
			type: 'GET',
			dataType: 'json',
			success: function(data) { 
				//Expected return values: clientId + editor contents + vector clock value.
				console.log(data.clientId);
				editor.setValue(data.contents);
				console.log(data.clockVal);
			}
		});
	});

	//based on the event generated create a log entry.
	editor.on('change',function(cMirror, event){
		var from = event.from.ch;
		var text = event.text[0];
		var operation = null;
		switch(event.origin) {
		case "+input":
			clockVal[clientId]++;
			operation = new Operation('i', from, text, clientId, clockVal);
			break;
		case "+delete":
			clockVal[clientId]++;
			operation = new Operation('i', from, text, clientId, clockVal);
			break;
		}
		localCache[localCache.length] = operation;
	});

	//set up periodical polling for sync and update text.
	function sync() {
		//Step01: Set up heap. TODO: validate the comparator.
		var opHeap = new MinHeap(null, function(operation1, operation2) {
			if (operation1.index == operation2.index) {
				var vectorPrio = isEquals(operation1.clockVal, operation1.clockVal);
				if (operation1.clientId == operation2.clientId)
					return operation1.clockVal[clientId] < operation2.clockVal[clientId] ? -1 : 1;  
				else {
					if (vectorPrio == 0) 
						return (operation1.clientId < operation2.clientId) ? -1 : 1;  
					else 
						return vectorPrio;
				}
			} else  
				return operation1.index < operation2.index ? -1 : 1;
		});

		//Step02. Get the local history and convert it to JSON.
		var servSize = 0;
		var localSize = localCache.length;
		jsonData = JSON.stringify(localCache.splice(0, localSize));

		//send the local history and fetch the new operations from server.
		//forward the sync-head by the number of operations received from server.
		//forward the vector clock by the vector clock value received from the server.
		$.ajax({
			url: baseUrl + 'sync/',
			type: 'POST',
			dataType: 'json',
			data: jsonData,
			success: function(data) {
				jQuery.each(data, function() {
					servSize++;
					vector = {};
					for (var clientIds in data.clockVal)
						vector[clientIds] = data.clockVal.clientIds;
					opHeap.push(new Operation(data.operation, data.index, data.text, data.clientId, vector));
				});
				syncHead = syncHead + servSize;
				clockVal = clockVal + servSize;
			}
		});

		//Step 03. We have the server side operations. These operations shuld be transformed w.r.to local operations.
		//USing operational transformation to update the local logs.
		operationalTrans(opHeap);
		//update the text to the editor
		applyChanges();
		setTimeout(sync, 5000);
	}

	//update the text in the editor.
	function applychanges() {
		text = new Array();
		var i = 0;
		for (i = 0; i < logs.length; i++) {
			if (logs[i].operation == 'i') {
				text[i] = logs[i].text;  
			} else {
				text[i] = ' ';
			};
		};
		editor.setValue(text.toString());
	};

	//returns 1 if operation1 is of higher priority than operation2.
	//returns -1 if operation2 is of higher priority than operation1.
	//returns 0 if operation1 is equal to operation1.
	//returns 2 if operation1 has to overwrite operation2
	//returns -2 if operation2 has to overwrite operation1
	function getPriority(operation1, operation2) {
		if (operation1.index < operation2.index) return 1;
		else if (operation1.index > operation2.index) return -1;
		else {
			var vectorPrio = isEquals(operation1.clockVal, operation1.clockVal);
			if (operation1.clientId == operation2.clientId) {
				if (vectorPrio == 0) return 0;
				return vectorPrio == 1 ? 2 : -2; 
			} else {
				if (vectorPrio == 0) return (operation1.clientId < operation2.clientId) ? 1 : -1;

			}
		}
	}

	//applies the changes(from server) to the local logs.
	//server changes are stored in heap and local changes are stored in stack.
	function operationalTrans(opHeap) {
		var head = 0;
		while (opHeap.size() > 0) {
			if (head >= logs.length) break;
			var serverOp = opHeap.pop();
			var priority = getPriority(serverOp, logs[head]);
			if (serverOp.index == logs[head].index) {
				if (priority == 1) {
					logs[head].index++;
					var tempOp = logs.splice(head, 0, serverOp);
					opHeap.push(tempOp);
				} else if (priority == -1) {
					serverOp.index++;
					opHeap.push(serverOp);
				} else
					continue;
			} else if (serverOp.index > logs[head].index)
				head++;
			else 
				head--;
		}
		while(opHeap.size() > 0) {
			logs[logs.length] = opHeap.pop();
		}
	}

	//if vector1 is equal to vector2 returns 0;
	// vector1 > vector2 return 1
	//vector1 < vector2 return -1
	function isEquals(vector1, vector2) {
		boolean less = false; boolean great = false;
		for (var clientIds in vector1) {
			if (vector1[clientIds] > vector2[clientIds])
				great = true;
			if (vector1[clientIds] < vector2[clientIds])
				less = true;
		}
		if (great && less) return 0;
		if (great) return 1;
		if (less) return -1;
		return 0;
	};


	function updateVector(vector1, vector2) {
		for (var cId in vector1) 
			vector2[cId] = max(vector1[cId], vector2[cId]);
		return vector2;
	}

	function max(val1, val2) {
		if (val1 > val2) return val1;
		return val2;
	};
	//	sync(); //UNCOMMENT THIS CALL TO BEGIN POLLING.
});