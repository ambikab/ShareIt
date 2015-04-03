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
function Operation(operation, index, character, clientId, clockVal) {
	this.operation = operation ; 
	this.index= index;
	this.character = character;
	this.clientId = clientId;
	this.clockVal = clockVal;
}


var heappq = new MinHeap(null, function(operation1, operation2) {
	if (operation1.index == operation2.index) {
		if (operation1.clockVal == operation2.clockVal) {
			return operation1.clientId < operation2.clientId ? -1 : 1;
		} else {
			return operation1.clockVal < operation2.clockVal ? -1 : 1;
		}
	} else { 
		return operation1.index < operation2.index ? -1 : 1;
	}
});

