package org.edu.comp512.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author GOWTHAM BABUJI
 *
 */

@XmlRootElement
public class Operations {
	
	@XmlElement(name="docId")
	String docId;
	
	@XmlElement(name = "operations")
	List<Operation> operations;

	public Operations () {
		this.operations = new ArrayList<Operation>();
	}
	
	public Operations(List<Operation> operations) {
		this.operations = operations;
	}
	
	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}

	public List<Operation> getOperations() {
		return operations;
	}

	public void setOperations(List<Operation> operations) {
		this.operations = operations;
	}
	
}
