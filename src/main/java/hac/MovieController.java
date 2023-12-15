/**
 This class represents a Movie Controller that handles API endpoints related to movie cart operations.
 The controller is responsible for adding, removing, and retrieving movies from the cart.
 The cart is stored in the user's session using HttpSession.
 */
package hac;

import hac.repo.Movie;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@SessionAttributes("cart")
public class MovieController {
    /**
     * Adds a movie to the cart.
     *
     * @param request  a map containing the movie to be added
     * @param session  the HttpSession object for the current user
     * @return the movie that was added to the cart
     */
    @PostMapping("/cart")
    public Movie addToCart(@RequestBody Map<String, Movie> request, HttpSession session) {
        Movie movie = request.get("movie");
        List<Movie> cart = getCart(session);
        if (!cart.contains(movie)) {
            cart.add(movie);
            session.setAttribute("cart", cart);
        }
        return movie;
    }

    /**
     * Removes a movie from the cart.
     *
     * @param movieId  the ID of the movie to be removed
     * @param session  the HttpSession object for the current user
     */
    @DeleteMapping("/cart/{movieId}")
    public void removeFromCart(@PathVariable("movieId") int movieId, HttpSession session) {
        List<Movie> cart = getCart(session);
        cart.removeIf(movie -> movie.getId() == movieId);
    }

    /**
     * Retrieves the contents of the cart.
     *
     * @param session  the HttpSession object for the current user
     * @return a list of movies in the cart
     */
    @GetMapping("/cart")
    public List<Movie> getCartContents(HttpSession session) {
        return getCart(session);
    }

    /**
     * Empties the cart by removing all movies.
     *
     * @param session  the HttpSession object for the current user
     */
    @DeleteMapping("/cart")
    public void emptyCart(HttpSession session) {
        List<Movie> cart = getCart(session);
        cart.clear();
    }

    /**
     * Retrieves the cart from the user's session.
     * If the cart does not exist, it creates a new empty cart.
     *
     * @param session  the HttpSession object for the current user
     * @return the cart as a list of movies
     */
    private List<Movie> getCart(HttpSession session) {
        List<Movie> cart = (List<Movie>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }
        return cart;
    }
}
