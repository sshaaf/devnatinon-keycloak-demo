package org.acme;

import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import org.eclipse.microprofile.openapi.annotations.Operation;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.logging.Logger;

import static jakarta.ws.rs.core.MediaType.APPLICATION_JSON;
import org.jboss.resteasy.reactive.NoCache;
import jakarta.annotation.security.RolesAllowed;

@Path("/api/books")
@Tag(name = "books")
@Produces(APPLICATION_JSON)
public class BookResource {

    private static final Logger logger = Logger.getLogger(BookResource.class);
    @GET
    @RolesAllowed("user")
    @NoCache
    @Operation(summary = "Get all books")
    public Response getAll() {
        return Response.ok(Book.listAll()).build();

    }

    @GET
    @Path("/{isbn}")
    @RolesAllowed("user")
    @NoCache
    @Operation(summary = "Get one book by searching {isbn}")
    public Response getOne(@PathParam("isbn") String isbn) {
        Book entity = Book.findById(isbn);
        if (entity == null) {
            logger.debug("Book with id of " + isbn + " does not exist.");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(entity).build();
    }

    @POST
    @RolesAllowed("user")
    @NoCache
    @Operation(summary = "Create a new book")
    @Transactional
    @Consumes(APPLICATION_JSON)
    public Response create(@Valid Book book) {
        try {
            book.persist();
            return Response.status(Response.Status.CREATED).entity(book).build();
        }
        catch (PersistenceException pe){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @PUT
    @Path("/{isbn}")
    @RolesAllowed("confidential")
    @NoCache

    @Operation(summary = "Update the entire book taking {isbn} as a parameter")
    @Transactional
    public Response update(@Valid Book book, @PathParam("isbn") String isbn) {
        Book entity = Book.findById(isbn);
        if (entity == null) {
            logger.debug("Book with id of " + isbn + " does not exist.");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        else {
            entity.title = book.title;
            entity.genre = book.genre;
            entity.summary = book.summary;
            try {
                entity.persist();
                return Response.ok(entity).build();
                //return Response.status(Response.Status.NO_CONTENT).build();
            }
            catch (PersistenceException pe){
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        }
    }

    @DELETE
    @Path("/{isbn}")
    @RolesAllowed("user")
    @NoCache

    @Operation(summary = "Delete a book based on its {isbn}")
    @Transactional
    public Response deleteOne(@PathParam("isbn") String isbn) {
        Book entity = Book.findById(isbn);
        if (entity == null) {
            throw new WebApplicationException("Book with isbn of " + isbn + " does not exist.", Response.Status.NOT_FOUND);
        }
        entity.delete();
        return Response.status(Response.Status.CREATED).entity(entity).build();
        //return Response.noContent().build();
    }
}
