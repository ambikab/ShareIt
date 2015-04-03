package org.edu.comp512.model;

/**
 * Model to represent every single operation in the logs.
 * @author AMBIKA BABUJI
 *
 */
public class Operation {

	char type;

	int index;

	int clientId;

	VectorClocks vectors;

	char text;

	public Operation(char operation, int index, int clientId, VectorClocks vectors, char text) {
		super();
		this.type = operation;
		this.index = index;
		this.clientId = clientId;
		this.vectors = vectors;
		this.text = text;
	}

	public char getOperation() {
		return type;
	}

	public void setOperation(char operation) {
		this.type = operation;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public VectorClocks getVectors() {
		return vectors;
	}

	public void setVectors(VectorClocks vectors) {
		this.vectors = vectors;
	}

	public char getText() {
		return text;
	}

	public void setText(char text) {
		this.text = text;
	}

}