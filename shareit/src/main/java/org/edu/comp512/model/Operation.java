package org.edu.comp512.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Model to represent every single operation in the logs.
 * @author AMBIKA BABUJI
 *
 */

@XmlRootElement
public class Operation {

	char type;

	int index;

	int clientId;
	
	VectorClocks vectorClk;

	char character;

	public Operation() {
		
	}
	
	public Operation(char operation, int index, int clientId, VectorClocks vectors, char text) {
		super();
		this.type = operation;
		this.index = index;
		this.clientId = clientId;
		this.vectorClk = vectors;
		this.character = text;
	}

	public char getType() {
		return type;
	}

	public void setType(char type) {
		this.type = type;
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

	public VectorClocks getVectorClk() {
		return vectorClk;
	}

	public void setVectorClk(VectorClocks vectorClk) {
		this.vectorClk = vectorClk;
	}

	public char getCharacter() {
		return character;
	}

	public void setCharacter(char character) {
		this.character = character;
	}

}