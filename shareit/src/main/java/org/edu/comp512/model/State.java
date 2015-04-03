package org.edu.comp512.model;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Contains the live editor history.
 * @author GOWTHAM BABUJI
 *
 */
public class State {

	//keeps track of all document's operation history.
	static HashMap<String, History> historyCache = new HashMap<String, History>();

	static HashMap<String, Integer> clientId = new HashMap<String, Integer>();

	public static HashMap<String, History> getHistoryCache() {
		return historyCache;
	}

	public static void setHistoryCache(HashMap<String, History> historyCache) {
		State.historyCache = historyCache;
	}

	public static HashMap<String, Integer> getClientId() {
		return clientId;
	}

	public static void setClientId(HashMap<String, Integer> clientId) {
		State.clientId = clientId;
	}
	
	public static void createDoc(Document document) {
		History history = new History(document.docId, new ArrayList<Operation>(), new ArrayList<VectorClocks>());
		historyCache.put(document.getDocId(), history);
	}
	
	public static History getDocHistory(String documentId) {
		return historyCache.get(documentId);
	}
	
}
