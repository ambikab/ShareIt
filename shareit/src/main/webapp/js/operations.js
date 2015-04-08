/**
 * Class template representation for each operation.
 * @param operation
 * @param index
 * @param character
 * @param clientId
 * @param clockVal
 * @returns
 */

//Usage: var insert= new Operation('i', 1, 'a', 1, 1);
//Usage: var del = new Operation('d', 1, 'a', 1, 1);
function Operation(type, index, character, clientId, vectorClk) {
	this.type = type; 
	this.index= index;
	this.character = character;
	this.clientId = clientId;
	this.vectorClk = vectorClk;
}

function Vector(vector) {
	this.vector = vector;
}

/** var heappq = new MinHeap(null, function(operation1, operation2) {
	if (operation1.index == operation2.index) {
		if (operation1.vectorClk == operation2.vectorClk) {
			return operation1.clientId < operation2.clientId ? -1 : 1;
		} else {
			return operation1.clockVal < operation2.clockVal ? -1 : 1;
		}
	} else { 
		return operation1.index < operation2.index ? -1 : 1;
	}
}); **/

