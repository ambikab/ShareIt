package org.edu.comp512.service;

import java.io.IOException;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.edu.comp512.model.History;
import org.edu.comp512.model.Operation;
import org.edu.comp512.model.Operations;
import org.edu.comp512.model.State;

/**
 * 
 * @author AMBIKA BABUJI
 *
 */
@Path("/operations")
public class SyncService {
		
	@POST	
	@Path("/sync")
	@Produces(MediaType.APPLICATION_JSON)
	public History getDifference(@FormParam("docId") String documentId, @FormParam("syncHead") int syncHead) {
		History history = State.getDocHistory(documentId);
		History result = history.getOperations(syncHead);
		if (result != null) System.out.println("number of new operations" + result.getOperations().size());
		return result;
	}

	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public void addOperations(Operations operations) throws JsonParseException, JsonMappingException, IOException {
		String docId = operations.getDocId();
		for (Operation newop : operations.getOperations()) //Only for debugging purpose. remove after debugging.
			System.out.println("Adding new operation from " + newop.getClientId() + " at index " 
							+ newop.getIndex() + " for character " + newop.getCharacter());
		//System.out.println("Adding " + operations.getOperations().size() + " operations to document " + docId);
		History history = State.getDocHistory(docId);
		history.addOperations(operations.getOperations());
	}		

}