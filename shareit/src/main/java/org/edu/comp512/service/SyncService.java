package org.edu.comp512.service;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.edu.comp512.model.Operation;
import org.edu.comp512.model.History;
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
	@Consumes(MediaType.APPLICATION_JSON)
	public History getDifference(String documentId, int syncHead) {
		History history = State.getDocHistory(documentId);
		return history.getOperations(syncHead);
	}

	@POST
	@Path("/add")
	public void addOperations(String documentId, List<Operation> operations) {
		History history = State.getDocHistory(documentId);
		for (Operation operation : operations)
			history.addOperation(operation);
	}		
	
}