package hac.repo;

/**
 * Represents a movie.
 */
public class Movie {
    private int id;
    private String title;
    private String overview;
    private String release_date;
    private String poster_path;
    private int quantity;

    /**
     * Default constructor for the Movie class.
     */
    public Movie() {
    }

    /**
     * Constructor for the Movie class.
     *
     * @param id           The ID of the movie.
     * @param title        The title of the movie.
     * @param overview     The overview/description of the movie.
     * @param release_date The release date of the movie.
     * @param poster_path  The path to the movie's poster image.
     * @param quantity     The quantity of the movie.
     */
    public Movie(int id, String title, String overview, String release_date, String poster_path, int quantity) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.release_date = release_date;
        this.quantity = quantity;
        this.poster_path = poster_path;
    }

    /**
     * Gets the ID of the movie.
     *
     * @return The ID of the movie.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the ID of the movie.
     *
     * @param id The ID of the movie.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the path to the movie's poster image.
     *
     * @return The path to the movie's poster image.
     */
    public String getPoster_path() {
        return poster_path;
    }


    /**
     * Sets the path to the movie's poster image.
     *
     * @param poster_path The path to the movie's poster image.
     */
    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    /**
     * Gets the title of the movie.
     *
     * @return The title of the movie.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the movie.
     *
     * @param title The title of the movie.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the overview/description of the movie.
     *
     * @return The overview/description of the movie.
     */
    public String getOverview() {
        return overview;
    }

    /**
     * Sets the overview/description of the movie.
     *
     * @param overview The overview/description of the movie.
     */
    public void setOverview(String overview) {
        this.overview = overview;
    }

    /**
     * Gets the release date of the movie.
     *
     * @return The release date of the movie.
     */
    public String getRelease_date() {
        return release_date;
    }

    /**
     * Sets the release date of the movie.
     *
     * @param release_date The release date of the movie.
     */
    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    /**
     * Gets the quantity of the movie.
     *
     * @return The quantity of the movie.
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the quantity of the movie.
     *
     * @param quantity The quantity of the movie.
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
