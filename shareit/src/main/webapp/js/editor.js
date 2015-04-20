var logs = new Array(); //History buffer. Operations in this HB can be run to reproduce the editor's content.
var localCache = new Array(); //list of changes pending to be sent to the server.
var clockVal = new Array(); //representation of vector clocks.
var syncHead = 0; //tells how many operations are obtained from server so far.
var clientId = null; // unique ID for this particular session.
var docId = null; //unique id for the document this client is accessing
var clientCnt = 0;

function log(message) {
	//console.log(message);
}

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

	//return an array with max of vector1, vector2.
	function getMax(vector1, vector2) {
		if ((vector1 == undefined) || (vector1 == null)) return;
		if ((vector2 == undefined) || (vector2 == null)) return;
		var vector3 = [];
		for (var i = 0; i < vector1.length; i++)
			vector3[i] = max(vector1[i], vector2[i]);
		return vector3.slice(0);
	}

	//function for fetching the contents of the given docId and also sets an unique clientID.
	$('#docIdBtn').click(function() {
		docId = $('#docId').val();
		$.ajax({
			url: baseUrl + 'editor/' + docId,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				//initializes a vector of size data.shareCnt.
				var tempMax = [];
				clientCnt = data.shareCnt;
				for (var i = 0; i < parseInt(clientCnt); i++) {
					clockVal[i] = 0;
					tempMax[i] = 0; //temp vector.
				}

				docId = data.docId; //initializes the document id.
				var tmpSize = 0;
				clientId = data.activeClients; //initializes the client-id for this session.

				//extract the operations so far and build the opHeap.
				var opHeap = new MinHeap(null, function(operation1, operation2) {
					return comparator(operation1, operation2);
				});

				var jsonOp = data.history.operations;
				for (var index = 0; index < jsonOp.length; index++) {
					log(jsonOp[index]);
					if (jsonOp[index] != null) {
						tmpSize++;
						console.log(jsonOp);
						var tmpClk = jsonOp[index].vectorClk.vector.slice();
						tempMax = getMax(tempMax, tmpClk);
						opHeap.push(new Operation(jsonOp[index].type, jsonOp[index].index, jsonOp[index].character, jsonOp[index].clientId, tmpClk));
					}
				}
				if (tmpSize != 0) {
					maxVector(tempMax); //update the vector clk.
					syncHead = syncHead + tmpSize; //move the sync head to include the new operations.
					operationalTrans(opHeap); //transformation to hte buffer is made.
					applyChanges(); //apply the transformed changes to the editor.
				}
				setInterval(function () {sync();}, 15000); //UNCOMMENT THIS TO BEGIN POLLING.
			} ,
			error: function() {
				console.log('error in fetching document contets.');
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
			clockVal[clientId] = clockVal[clientId] + 1;
			var opVectorClock = new Vector(clockVal);
			operation = new Operation('i', from, text, clientId, opVectorClock);
			console.log(operation);
			localCache[localCache.length] = operation;
			break;
		case "+delete": //TODO: should be modified for del followed by insert. 
			clockVal[clientId] = clockVal[clientId] + 1;
			var opVectorClock = new Vector(clockVal);
			operation = new Operation('i', from, text, clientId, opVectorClock);
			localCache[localCache.length] = operation;
			break;
		}
	});

	//set up periodical polling for sync and update text.
	function sync() {
		//Step01: Set up heap.
		var opHeap =  new MinHeap(null, function(operation1, operation2) {
			return comparator(operation1, operation2);
		});

		//Step02: send local operations to the server.
		sendServer();

		//Step03. Get the difference from the server.
		var tempMax = [];
		for (var i = 0; i < parseInt(clientCnt); i++) {
			tempMax[i] = 0; //temp vector.
		}
		//send the local history and fetch the new operations from server.
		//forward the sync-head by the number of operations received from server.
		//forward the vector clock by the vector clock value received from the server.
		//apply the remote changes by transforming it locally.
		$.ajax({
			url: baseUrl + 'operations/sync/',
			type: 'POST',
			dataType: 'json',
			data: {'docId': docId, 'syncHead' : syncHead},
			success: function(data) {
				if ((data == undefined ) || (data == null)) {
					//sendServer();
					return;
				}
				console.log("fetched new data from server.");
				var jsonOps = data.operations;
				for (var i = 0; i < jsonOps.length; i++) {
					var jsonOp = jsonOps[i];
					var tmpVector = jsonOp.vectorClk.vector.slice();
					tempMax = getMax(tempMax, tmpVector);
					console.log(jsonOps[i]);
					console.log(tempMax);
					opHeap.push(new Operation(jsonOp.type, jsonOp.index, jsonOp.character, jsonOp.clientId, new Vector(tempMax)));
				}
				if (jsonOps.length != 0) {
					syncHead = syncHead + jsonOps.length;
					maxVector(tempMax); //update the site's clock to include operations from remote sites as well.
					operationalTrans(opHeap); //transform the remote operations before applying
					applyChanges(); // apply changes to the heap.
				}				
			}
		});
	}

	function sendServer() {
		log("sending local data to server");
		//Step04. send the local operations to the server.
		var localSize = localCache.length;
		if (localSize == 0) {
			log("no more operations here.");
			return 0;
		}
		var operations = {'docId' : docId , 'operations': localCache.splice(0, localSize)};
		$.ajax({
			url: baseUrl + 'operations/add/',
			type: 'POST',
			dataType: 'json',
			contentType:'application/json',
			data: JSON.stringify(operations),
			success: function(data) {
				console.log('success in sync-ing data to the server.');
			},
			error : function(){
				console.log('error in sending local data to server');
				//TODO: add the data back to the head of the local cache. 
			}
		});
	}

	//update the text in the editor.
	function applyChanges() {
		log('updating the editor');
		text = new Array();
		var i = 0;
		for (i = 0; i < logs.length; i++) {
			//console.log(logs[i]);
			if (logs[i].type == 'i') {
				text[i] = logs[i].character;
				logs[i].index = i;
			} else {
				text[i] = ' ';
			};
		};
		var contents = '';
		for (var i = 0;i < text.length; i++) {
			contents = contents + text[i];
		}
		editor.setValue(contents);
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
			var vectorPrio = isEquals(operation1.vectorClk, operation1.vectorClk);
			if (operation1.clientId == operation2.clientId) {
				if (vectorPrio == 0) return 0;
				return vectorPrio == 1 ? 2 : -2; 
			} else {
				if (vectorPrio == 0) return (operation1.clientId < operation2.clientId) ? 1 : -1;
			};
		};
	}

	//if vector1 is equal to vector2 returns 0;
	// vector1 > vector2 return 1
	//vector1 < vector2 return -1
	function isEquals(vector1, vector2) {
		var less = false; var great = false;
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

	//returns a new vector populated with the values:- maximum of vector1 and vector2
	function maxVector(vector1) {
		if ((vector1 == undefined) || (vector1 == null)) return;
		for (var cId in vector1) 
			clockVal[cId] = max(clockVal[cId], vector1[cId]);
	}

	function max(val1, val2) {
		if (val1 > val2) return val1;
		return val2;
	};

	//returns a vector with all the clock values initialized to zero.
	function initVector(size) {
		var vector1 = new Array();
		for (var i = 1; i <= size; i++)
			vector1[i] = 0;
		return vector1;
	};

	/*//transforms op1 with respect to op2.
	//returns -1 if op1 has to be inserted before op2.
	//returns 1 if op1 comes after op2.
	function transformation(op1, op2) {
		if (op1.index < op2.index) return -1;
		if (op1.index > op2.index) return 1;
		var vectorPrio = isEquals(op1.vectorClk, op2.vectorClk);
		if (vectorPrio == 0) {
			if (op1.clientId < op2.clientId) return -1;
			else if (op1.clientId > op2.clientId) return 1;
			else return 0; //discard this operation.
		} else if (vectorPrio == -1) return 2;
		else return -2;
	}*/

	function comparator(op1, op2) {
		var vectorPrio = isEquals(op1.vectorClk, op2.vectorClk);
		if (vectorPrio == 1) return 1;
		if (vectorPrio == -1) return -1;
		if(op1.index < op2.index) return 1;
		if(op1.index > op2.index) return -1;
		if(op1.clientId < op2.clientId) return -1;
		return 1;
	};

	function operationalTrans(opHeap) {
		while (opHeap.size() > 0) {
			var currentOp = opHeap.pop();
			var len = logs.length;
			if (len == 0) {
				logs.push(currentOp);
			} 
			else {
				var opHandled = false;
				for (var i = 0; i < len; i++) {
					// compare currOp to op in log
					// case 1 currOp is at a index > currlogOp
					if (currentOp.index > logs[i].index) {
						continue;
					}
					// case 2 currOp is at a index < currlogOp
					else if ( currentOp.index < logs[i].index ) {
						// example current op index 2 log[i] index is 4
						// handle and break
						opHandled = true;
						var tempLog = logs.slice(0, i - 1); // should handle logs of size 1
						tempLog.push(currentOp);
						tempLog.concat(logs.slice(i));
						logs = tempLog.slice(0);
						break;
					}
					// case 3 currOp is at a index = currlogOp
					else {
						// concurrent Operations at same Index
						var result = isEquals(currentOp.vectorClk, logs[i].vectorClk);
						console.log(result);
						if ( result == 0 ) { 
							// will be handled in the next case
							if (currentOp.clientId > logs[i].clientId) 
								continue;
							else if( currentOp.clientId < logs[i].clientId ) {
								// insert before current log op and break
								opHandled = true;
								var tempLog = logs.slice(0, i - 1); // should handle logs of size 1
								tempLog.push(currentOp);
								tempLog.concat(logs.slice(i));
								logs = tempLog.slice(0);
								break;
							}
							else { // same client and concurrent is not possible at all 
								console.log("Duplicate operation encountered..");
								opHandled = true;
								break;
							}
						} else { // non concurrent operations at same Index - something has to be replaced
							if (result == 1) { // current op happened later than logs operation at current index
								// replace log op
								logs[i] = currentOp;
							}
							else {
								// current Op is history ignore it				
							}
							opHandled = true;
							break;
						}
					}
				} // end for
				if (!opHandled) {
					logs.push(currentOp);
				}
			} // end else
		} // end while
	}
});