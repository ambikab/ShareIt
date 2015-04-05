package org.edu.comp512.model;

import java.util.HashMap;

/**
 * Contains the live editor history.
 * @author AMBIKA BABUJI
 *
 */
public class State {

	//keeps track of all document's operation history.
	static HashMap<String, Document> queue = new HashMap<String, Document>();

	public static HashMap<String, Document> getHistoryCache() {
		return queue;
	}

	public static void setHistoryCache(HashMap<String, Document> historyCache) {
		State.queue = historyCache;
	}
	
	public static void createDoc(Document document) {
		queue.put(document.getDocId(), document);
	}
	
	public static Document getDocument(String documentId) {
		if (!queue.containsKey(documentId)) return null;
		return queue.get(documentId);
	}
	
	public static History getDocHistory(String documentId) {
		return queue.get(documentId).getHistory();
	}
	
}
