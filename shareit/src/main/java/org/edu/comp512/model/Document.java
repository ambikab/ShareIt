package org.edu.comp512.model;

/**
 * 
 * @author AMBIKA BABUJI
 *
 */
public class Document {

	String docId;

	int shareCnt;
	
	public Document(String docId, int shareCnt, int clientId) {
		super();
		this.docId = docId;
		this.shareCnt = shareCnt;
	}

	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}

	public int getShareCnt() {
		return shareCnt;
	}

	public void setShareCnt(int shareCnt) {
		this.shareCnt = shareCnt;
	}

}
