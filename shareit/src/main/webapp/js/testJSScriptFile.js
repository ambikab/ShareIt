/**
 * @fileOverview Implementation of a min heap.  Allows a comparator 
 * to be provided so that the heap may contain objects that involve a 
 * more complex comparison.
 */

/**
 * Implementation of a min heap allowing for a comparator 
 * to be provided so that the heap may contain objects that involve a 
 * more complex comparison.
 * <br>
 * This constructor constructs a MinHeap instance and takes two optional 
 * parameters: an array and comparator.  If the array is provided, it 
 * will be used as the backing store for the heap. Therefore, all 
 * operations on the heap will be reflected in the provided array.
 * Usage
 * @example
 * Sample Usage:
 var heapq = new MinHeap();
 heapq.push(5);
 heapq.push(2);
 heapq.push(1);
 heapq.pop()); // returns 1
 heapq.pop()); // returns 2
 * @param array Array to use heapify or null to start with an empty
 * heap.
 * @param comparator alternate comparator used to compare each 
 * item within the heap.  If not provided, the default will perform
 * a simple comparison on the item.
 *
 * @returns instance of MinHeap
 * @constructor
 */
function MinHeap(array, comparator) {
	/**
	 * Storage for heap. 
	 * @private
	 */
	this.heap = array || new Array();

	/**
	 * Default comparator used if an override is not provided.
	 * @private
	 */
	this.compare = comparator || function(item1, item2) {
		return item1 == item2 ? 0 : item1 < item2 ? -1 : 1;
	};

	/**
	 * Retrieve the index of the left child of the node at index i.
	 * @private
	 */
	this.left = function(i) {
		return 2 * i + 1;
	};
	/**
	 * Retrieve the index of the right child of the node at index i.
	 * @private
	 */
	this.right = function(i) {
		return 2 * i + 2;
	};
	/**
	 * Retrieve the index of the parent of the node at index i.
	 * @private
	 */
	this.parent = function(i) {
		return Math.ceil(i / 2) - 1;
	};

	/**
	 * Ensure that the contents of the heap don't violate the 
	 * constraint. 
	 * @private
	 */
	this.heapify = function(i) {
		var lIdx = this.left(i);
		var rIdx = this.right(i);
		var smallest;
		if (lIdx < this.heap.length
				&& this.compare(this.heap[lIdx], this.heap[i]) < 0) {
			smallest = lIdx;
		} else {
			smallest = i;
		}
		if (rIdx < this.heap.length
				&& this.compare(this.heap[rIdx], this.heap[smallest]) < 0) {
			smallest = rIdx;
		}
		if (i != smallest) {
			var temp = this.heap[smallest];
			this.heap[smallest] = this.heap[i];
			this.heap[i] = temp;
			this.heapify(smallest);
		}
	};

	/**
	 * Starting with the node at index i, move up the heap until parent value
	 * is less than the node.
	 * @private
	 */
	this.siftUp = function(i) {
		var p = this.parent(i);
		if (p >= 0 && this.compare(this.heap[p], this.heap[i]) > 0) {
			var temp = this.heap[p];
			this.heap[p] = this.heap[i];
			this.heap[i] = temp;
			this.siftUp(p);
		}
	};

	/**
	 * Heapify the contents of an array.
	 * This function is called when an array is provided.
	 * @private
	 */
	this.heapifyArray = function() {
//		for loop starting from floor size/2 going up and heapify each.
		var i = Math.floor(this.heap.length / 2) - 1;
		for (; i >= 0; i--) {
//			jstestdriver.console.log("i: ", i);
			this.heapify(i);
		}
	};

//	If an initial array was provided, then heapify the array.
	if (array != null) {
		this.heapifyArray();
	}
	;
}

/**
 * Place an item in the heap.  
 * @param item
 * @function
 */
MinHeap.prototype.push = function(item) {
	this.heap.push(item);
	this.siftUp(this.heap.length - 1);
};

/**
 * Insert an item into the heap.
 * @param item
 * @function
 */
MinHeap.prototype.insert = function(item) {
	this.push(item);
};

/**
 * Pop the minimum valued item off of the heap. The heap is then updated 
 * to float the next smallest item to the top of the heap.
 * @returns the minimum value contained within the heap.
 * @function
 */
MinHeap.prototype.pop = function() {
	var value;
	if (this.heap.length > 1) {
		value = this.heap[0];
//		Put the bottom element at the top and let it drift down.
		this.heap[0] = this.heap.pop();
		this.heapify(0);
	} else {
		value = this.heap.pop();
	}
	return value;
};

/**
 * Remove the minimum item from the heap.
 * @returns the minimum value contained within the heap.
 * @function
 */
MinHeap.prototype.remove = function() {
	return this.pop();
};


/**
 * Returns the minimum value contained within the heap.  This will
 * not remove the value from the heap.
 * @returns the minimum value within the heap.
 * @function
 */
MinHeap.prototype.getMin = function() {
	return this.heap[0];
};

/**
 * Return the current number of elements within the heap.
 * @returns size of the heap.
 * @function
 */
MinHeap.prototype.size = function() {
	return this.heap.length;
};

function Operation(operation, index, character, clientId, clockVal) {
	this.operation = operation ; 
	this.index= index;
	this.character = character;
	this.clientId = clientId;
	this.clockVal = clockVal;
}

var opHeap =  new MinHeap(null, function(operation1, operation2) {
			return comparator(operation1, operation2);
	});
		
	function comparator(op1, op2) {
		var vectorPrio = isEquals(op1.vectorClk, op2.vectorClk);
		if (vectorPrio == 1) return 1;
		if (vectorPrio == -1) return -1;
		if(op1.index < op2.index) return -1;
		if(op1.index > op2.index) return 1;
		if(op1.clientId < op2.clientId) return -1;
		return 1;

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
	}

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


function operationTransTest(opHeap) {
    while (opHeap.size() > 0) {
        var currentOp = opHeap.pop();
        var len = logs.length;
        if (len == 0) {
            logs.push(currentOp);
        } else {
            var opHandled = false;
            for (var i = 0; i < len; i++) {
                // compare currOp to op in log
                // case 1 currOp is at a index > currlogOp
                if (currentOp.index > logs[i].index) {
                    continue;
                }
                // case 2 currOp is at a index < currlogOp
                else if (currentOp.index < logs[i].index) {
                    // example current op index 2 log[i] index is 4
                    // handle and break
                    opHandled = true;
                    var tempLog = logs.slice(0, i - 1); // should handle logs of size 1
                    tempLog.append(currentOp);
                    tempLog.concat(logs.slice(i));
                    logs = tempLog.slice(0);
                    break;
                }
                // case 3 currOp is at a index = currlogOp
                else {
                    // concurrent Operations at same Index
					var vClkLen = currentOp.vectorClk.length;
					var greater = false;
					var lesser = false;
					for(var clkIndex = 0; clkIndex < vClkLen; clkIndex++) {
						if( currOp.vectorClk[clkIndex] > logs[i].vectorClk[clkIndex] ) {
							greater = true;
						}
						if( currOp.vectorClk[clkIndex] < logs[i].vectorClk[clkIndex] ) {
							lesser = true;
						}
					}
					var result = 0;
					if ( greater && lesser) result = 0;
					else if (greater) result = 1;
					else if (lesser) result = -1;
					else result = 0;
					
					console.log(result);
                    if ( result == 0 ) { 
                        // will be handled in the next case
                        if (currentOp.clientId > logs[i].clientId) {
                            continue;
                        }
						else if(currentOp.clientId < logs[i].clientId) {
							opHandled = true;
							// insert before current log op and break
							opHandled = true;
							var tempLog = logs.slice(0, i - 1); // should handle logs of size 1
							tempLog.append(currentOp);
							tempLog.concat(logs.slice(i));
							logs = tempLog.slice(0);
							break;
						}
						else { // same client and concurrent is not possible at all 
							console.log("SOME THING might be TERRIBLY WRONG.. can be a duplicate");
							opHandled = true;
							break;
						}
                    }
					else { // non concurrent operations at same Index - something has to be replaced
						if (result == 1) { // current op happenned later than logs operation at current index
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
	

var insert1 = new Operation('i', 1, 'a', 1, [1,0,0]);
var insert2 = new Operation('i', 2, 'b', 1, [2,0,0]);
var insert3 = new Operation('i', 1, 'c', 2, [0,1,0]);
var insert4 = new Operation('i', 2, 'd', 2, [0,2,0]);
//var insert5 = new Operation('i', 3, 'd', 1, [2,1,2]);
//var insert5 = new Operation('i', 1, 'm', 3, [2,2,1]);
//var insert6 = new Operation('i', 2, 'n', 3, [2,2,2]);
opHeap.push(insert1);
opHeap.push(insert2);
opHeap.push(insert3);
opHeap.push(insert4);
//opHeap.push(insert5);
//opHeap.push(insert6);
//opHeap.push(insert3);

var size = opHeap.size();
//for(var i =0; i < size; i++) {
//  console.log(opHeap.pop());//
//}
logs = [];
operationalTransTest(opHeap);
console.log(logs);
//opHeap.push(insert5);
//operationalTrans(opHeap);


/*var vClkLen = currentOp.vectorClk.length;
var greater = false;
var lesser = false;
for(var clkIndex = 0; clkIndex < vClkLen; clkIndex++) {
	if( currentOp.vectorClk[clkIndex] > logs[i].vectorClk[clkIndex] ) {
		greater = true;
	}
	if( currentOp.vectorClk[clkIndex] < logs[i].vectorClk[clkIndex] ) {
		lesser = true;
	}
}
var result = 0;
if ( greater && lesser) result = 0;
else if (greater) result = 1;
else if (lesser) result = -1;
else result = 0;*/