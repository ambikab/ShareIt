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

function Vector(vector1) {
	this.vector = vector1.slice(0);
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

//-1 makes the operation swim up in the heap.
/*function comparator(operation1, operation2) {
	if (operation1.index == operation2.index) {
		var vectorPrio = isEquals(operation1.vectorClk, operation1.vectorClk);
		if (operation1.clientId == operation2.clientId)
			return operation1.vectorClk[clientId] < operation2.vectorClk[clientId] ? -1 : 1;  
		else {
			if (vectorPrio == 0) 
				return (operation1.clientId < operation2.clientId) ? -1 : 1;  
			else 
				return vectorPrio;
		}
	} else  
		return operation1.index < operation2.index ? -1 : 1;
}*/