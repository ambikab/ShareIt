package org.edu.comp512.model;

import java.util.List;
import java.util.Vector;

/**
 * Represents log entry for a single document.
 * @author AMBIKA BABUJI
 *
 */
public class History {

	Vector<Operation> operations;

	//Vector<VectorClocks> operationCnt;

	public History(Vector<Operation> operations) {
		super();
		this.operations = operations;
		//this.operationCnt = operationCnt;
	}

	public Vector<Operation> getOperations() {
		return operations;
	}

	public void setOperations(Vector<Operation> operations) {
		this.operations = operations;
	}

	public void addOperations(List<Operation> newOps) {
		operations.addAll(newOps);
	}

	/**
	 * adds new operation to the document's log.
	 */
	public synchronized void addOperation(Operation newOp) {
		operations.add(newOp);
	}

	public History getOperations(int frmIndex) {
		int toIndex = operations.size(); 
		if (frmIndex >= toIndex) return null;
		Vector<Operation> subOperations = new Vector<Operation>();
		List<Operation> subList1 = operations.subList(frmIndex, toIndex);
		for (Operation operation : subList1)
			subOperations.add(operation);
		History subLog = new History(subOperations);
		return subLog;
	}
}