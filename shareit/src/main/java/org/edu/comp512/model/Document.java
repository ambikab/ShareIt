package org.edu.comp512.model;

import java.util.Vector;

/**
 * Representation of a shared editor. 
 * @author AMBIKA BABUJI
 *
 */
public class Document {

	//unique Id to identify the document.
	String docId;

	//number of clients permitted to share the document.
	int shareCnt;
	
	//stores all the operations performed on the document.
	History history;
	
	int activeClients; 
	
	public Document(String docId, int shareCnt) {
		super();
		this.docId = docId;
		this.shareCnt = shareCnt;
		this.history = new History(new Vector<Operation>());
		this.activeClients = 0;
	}

	public synchronized int addClient() {
		return ++this.activeClients;
	}
	
	public int getActiveClients() {
		return activeClients;
	}

	public void setActiveClients(int activeClients) {
		this.activeClients = activeClients;
	}

	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}

	public int getShareCnt() {
		return this.shareCnt;
	}

	public void setShareCnt(int shareCnt) {
		this.shareCnt = shareCnt;
	}
	
	public History getHistory() {
		return this.history;
	}
	
	public void setHistory(History history) {
		this.history = history;
	}
	

}