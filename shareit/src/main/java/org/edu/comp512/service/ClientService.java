package org.edu.comp512.service;

import java.util.UUID;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.edu.comp512.model.Document;
import org.edu.comp512.model.State;

/**
 * 
 * @author AMBIKA BABUJI
 *
 */
@Path("/editor")
public class ClientService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{docId}")
	public int setNewClient(String docId) {
		if (!State.getClientId().containsKey(docId))
			State.getClientId().put(docId, 1);
		else
			State.getClientId().put(docId, State.getClientId().get(docId) + 1);
		return State.getClientId().get(docId);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Document newDoc(int clientCount) {
		Document client = new Document(UUID.randomUUID().toString(), clientCount, 1);
		State.createDoc(client);		
		return client;
	}
}