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
