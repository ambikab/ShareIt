package org.edu.comp512.model;

import java.util.List;

/**
 * Represents log entry for a single document.
 * @author AMBIKA BABUJI
 *
 */
public class History {

	List<Operation> operations;

	List<VectorClocks> operationCnt;

	public History(List<Operation> operations,
			List<VectorClocks> operationCnt) {
		super();
		this.operations = operations;
		this.operationCnt = operationCnt;
	}

	public List<Operation> getOperations() {
		return operations;
	}

	public void setOperations(List<Operation> operations) {
		this.operations = operations;
	}

	public List<VectorClocks> getOperationCnt() {
		return operationCnt;
	}

	public void setOperationCnt(List<VectorClocks> operationCnt) {
		this.operationCnt = operationCnt;
	}

	/**
	 * adds new operation to the document's log.
	 */
	public synchronized void addOperation(Operation newOp) {
		operations.add(newOp);
		VectorClocks curMax = null;
		if (operationCnt.size() == 0)
			curMax = (newOp.vectorClk);
		else
			curMax = newOp.vectorClk.getMaxVector(operationCnt.get(operationCnt.size() - 1));
		operationCnt.add(curMax);
	}

	public History getOperations(int frmIndex) {
		int toIndex = operationCnt.size(); 
		if (frmIndex >= toIndex) return null;
		History subLog = new History(operations.subList(frmIndex, toIndex), operationCnt.subList(toIndex - 1, toIndex));
		return subLog;
	}
}