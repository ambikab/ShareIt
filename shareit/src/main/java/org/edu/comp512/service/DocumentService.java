package org.edu.comp512.service;

import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.edu.comp512.model.Document;
import org.edu.comp512.model.Operation;
import org.edu.comp512.model.State;
import org.edu.comp512.model.VectorClocks;

/**
 * Services to create a new document , adding new client to a document.
 * @author AMBIKA BABUJI
 *
 */
@Path("/editor")
public class DocumentService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{docId}")
	public Document addClient(@PathParam("docId") String docId) {
		Document document = State.getDocument(docId);
		if (document == null) return null;
		document.addClient();
		if (document.getHistory().getOperations() != null)
			System.out.println("document sent to new client. document has  " + document.getHistory().getOperations().size() + " operations performend on it.");
		return document;
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Path("/new")
	public Document newDoc(@FormParam("count") int clientCount) {
		//clientCount + 1 => accounting for the zero based index usage.
		Document document = new Document(UUID.randomUUID().toString(), clientCount + 1);
		State.createDoc(document);
		System.out.println("creating new document with docId" + document.getDocId());
		/**TODO: for building front end code. CRITICAL: REMOVE THIS ONCE DONE.
		History history = document.getHistory();
		history.addOperation(getSampleOperation());
		//TODO: REMOVAL END **/ 
		return document;
	}

	public static Operation getSampleOperation() {
		VectorClocks clock = new VectorClocks(4);
		clock.setClockVal(1, 0);
		clock.setClockVal(2, 0);
		Operation op = new Operation('i', 1, 1, clock, 'a');
		return op;
	}
}