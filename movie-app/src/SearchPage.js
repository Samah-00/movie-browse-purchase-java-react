/**
 SearchPage Component
 This component renders a search page for movies. It includes a search form, genre dropdown, release year input,
 actor name input, popular movies checkbox, search history, and shopping cart. It also displays the search results.
 */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button, ListGroup } from 'react-bootstrap';
import './SearchPage.css'; // Import your custom CSS file

const SearchPage = () => {
    // State variables
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [popularMovies, setPopularMovies] = useState(false);
    const [actorName, setActorName] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [expandedMovieIds, setExpandedMovieIds] = useState([]);

    useEffect(() => {
        getShoppingCart().catch();
    }, []);

    // Fetch genre options from API (useEffect)
    useEffect(() => {
        const fetchGenreOptions = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=62341c4860412b13940aa029221319d2`
                );
                const data = await response.json();
                setGenreOptions(data.genres.filter(genre => ["Animation", "Music", "Family"].includes(genre.name)));
            } catch (error) {
                console.log('Error fetching genre options:', error);
            }
        };

        fetchGenreOptions().catch();
    }, []);

    /**
     * Handle search form submission
     * @param {Event} e - The form submission event
     */
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Perform search using TMDb API with searchQuery, selectedGenres, releaseYear, popularMovies and actorName.
            let url = `https://api.themoviedb.org/3/search/movie?api_key=62341c4860412b13940aa029221319d2&query=${searchQuery}&include_adult=false`;
            // Include selected genres in the API request
            if (selectedGenres.length > 0) {
                const genreIds = selectedGenres.join(",");
                url += `&with_genres=${genreIds}`;
            }
            if (releaseYear) {
                url += `&primary_release_year=${releaseYear}`;
            }
            if (popularMovies) {
                url += '&sort_by=popularity.desc';
            }
            if (actorName) {
                const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=62341c4860412b13940aa029221319d2&query=${actorName}`);
                const data = await response.json();
                if (data.results.length > 0) {
                    const actorId = data.results[0].id;
                    const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=62341c4860412b13940aa029221319d2&with_cast=${actorId}`);
                    const moviesData = await moviesResponse.json();
                    setSearchResults(moviesData.results);
                    setSearchHistory([...searchHistory, searchQuery]);
                    setSearchQuery('');
                    setSelectedGenres([]);
                    setReleaseYear('');
                    setPopularMovies(false);
                    setActorName('');
                    return;
                }
            }
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.results);
            console.log(data.results);
            setSearchHistory([...searchHistory, searchQuery]);
            setSearchQuery('');
            setSelectedGenres([]);
            setReleaseYear('');
            setPopularMovies(false);
            setActorName('');
        } catch (error) {
            console.log('Error performing search:', error);
        }
    };

    /**
     * Handles selecting/deselecting genres.
     *
     * @param {number} genreId - The ID of the genre.
     */
    const handleGenreChange = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    /**
     * Handles removing an item from the search history.
     *
     * @param {string} item - The item to be removed from the search history.
     */
    const handleRemoveFromHistory = (item) => {
        setSearchHistory(searchHistory.filter((historyItem) => historyItem !== item));
    };

    /**
     * Handles clearing the search history.
     */
    const handleClearHistory = () => {
        setSearchHistory([]);
    };



    /**
     * Handles clicking on a search history item.
     *
     * @param {string} searchItem - The search item that was clicked.
     */
    const handleSearchHistoryClick = async (searchItem) => {
        setSearchQuery(searchItem);
        setSelectedGenres([]);
        setReleaseYear('');
        setPopularMovies(false);
        setActorName('');

        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=62341c4860412b13940aa029221319d2&query=${searchItem}&include_adult=false`;
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.log('Error performing search:', error);
        }
    };


    /**
     * Handles adding a movie to the shopping cart.
     *
     * @param {Object} movie - The movie object to be added to the shopping cart.
     */
    const handleAddToCart = (movie) => {
        if (!shoppingCart.some((item) => item.id === movie.id)) {
            setShoppingCart([...shoppingCart, movie]);

            // Save movie data to the server
            fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie }), // Wrap the movie object in an outer object
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error saving movie data');
                    }
                })
                .then((data) => {
                    // Handle successful movie data submission
                    console.log('Movie data saved:', data);
                })
                .catch((error) => {
                    // Handle error during movie data submission
                    console.error('Error saving movie data:', error);
                });
        }
    };

    /**
     * Handles removing a movie from the shopping cart.
     *
     * @param {Object} movie - The movie object to be removed from the shopping cart.
     */
    const handleRemoveFromCart = (movie) => {
        fetch(`/api/cart/${movie.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setShoppingCart(shoppingCart.filter((item) => item.id !== movie.id));
            })
            .catch((error) => {
                console.error('Error removing item from cart:', error);
            });
    };

    /**
     * Renders the genre options.
     *
     * @returns {JSX.Element} The JSX element representing the genre options.
     */
    const renderGenreOptions = () => {
        return (
            <select multiple value={selectedGenres} onChange={handleGenreChange}>
                {genreOptions.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        );
    };

    /**
     * Renders the search history list.
     *
     * @returns {JSX.Element} The JSX element representing the search history list.
     */
    const renderSearchHistory = () => {
        return (
            <div>
                <ListGroup>
                    {searchHistory.map((item) => (
                        <ListGroup.Item key={item} className="d-flex justify-content-between align-items-center">
                            {item}
                            <div>
                                <Button variant="link" className="text-decoration-none btn-black" onClick={() => handleSearchHistoryClick(item)}>Search</Button>
                                <Button variant="link" className="text-decoration-none btn-black" onClick={() => handleRemoveFromHistory(item)}>Remove</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {searchHistory.length > 0 && (
                    <Button variant="link" className="text-decoration-none btn-black small-font" onClick={handleClearHistory}>Clear History</Button>
                )}
            </div>
        );
    };

    /**
     * Renders the search results.
     *
     * @returns {JSX.Element} The JSX element representing the search results.
     */
        const renderSearchResults = () => {

        /**
         * Toggles the movie overview visibility.
         *
         * @param {number} movieId - The ID of the movie.
         */
            const toggleMovieOverview = (movieId) => {
                if (expandedMovieIds.includes(movieId)) {
                    setExpandedMovieIds(expandedMovieIds.filter((id) => id !== movieId));
                } else {
                    setExpandedMovieIds([...expandedMovieIds, movieId]);
                }
            };

            return (
                <div>
                    {searchResults.map((movie) => (
                        <div key={movie.id} className="row mb-4 movie-container">
                            <div className="col-4 pt-4">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={`${movie.title} Poster`}
                                    className="img-fluid movie-image my-2"
                                />
                            </div>
                            <div className="col-8 text-left">
                                <h3 className="mt-2">{movie.title}</h3>
                                <small className="movie-font">
                                    {expandedMovieIds.includes(movie.id)
                                        ? movie.overview
                                        : movie.overview.split(' ').slice(0, 20).join(' ') + '...'}
                                    {movie.overview.split(' ').length > 20 &&
                                        (expandedMovieIds.includes(movie.id) ? (
                                            <Button
                                                variant="link"
                                                className="text-decoration-none btn-black small-font"
                                                onClick={() => toggleMovieOverview(movie.id)}
                                            >
                                                Read Less
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="link"
                                                className="text-decoration-none btn-black small-font"
                                                onClick={() => toggleMovieOverview(movie.id)}
                                            >
                                                Read More
                                            </Button>
                                        ))}
                                </small>
                                <p className="mt-2">
                                    <small>Release date: {movie.release_date}</small>
                                </p>
                                <p className="mt-2">
                                <small>Price: $3.99</small>
                                <Button
                                    variant="link"
                                    className="text-decoration-none btn-blue small-font"
                                    onClick={() => handleAddToCart(movie)}
                                >
                                    Add to Cart
                                </Button>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };


    /**
     * Fetches the shopping cart items from the server.
     */
    const getShoppingCart = async () => {
        try {
            const response = await fetch('/api/cart');
            const data = await response.json();
            setShoppingCart(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };


    return (
        <div className="container search-page-container text-center">
        <div className="row">
                {/* Search Col*/}
                <div className="col-12 col-lg-4 pt-3 bg-white">
                    <div className="row mb-4">
                        {/* Search input */}
                        <div className="col-10 col-lg-9">
                            <form className="search-form" onSubmit={handleSearch}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search movies"
                                    />
                                </div>
                            </form>
                        </div>
                        {/* Search button */}
                        <div className="col-2 col-lg-3 ps-2">
                            <button type="submit" className="btn btn-sm btn-info pb-2" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-4">
                            {/* Genre dropdown (select) */}
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="genreSelect">
                                    Genre
                                </label>
                                <Dropdown show={genreDropdownOpen} onToggle={(isOpen) => setGenreDropdownOpen(isOpen)}>
                                    <Dropdown.Toggle as={Button} variant="info" id="genreDropdownButton">
                                        Select Genre
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="genre-dropdown-menu">
                                        {/* Render genre options */}
                                        {renderGenreOptions()}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        {/* Release date input (optional) */}
                        <div className="col-12">
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="releaseYearInput">
                                    Release Year
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={releaseYear}
                                    onChange={(e) => setReleaseYear(e.target.value)}
                                    placeholder="Release Year"
                                />
                            </div>
                        </div>
                        {/* Actor name input */}
                        <div className="col-12">
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="actorNameInput">
                                    Actor Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={actorName}
                                    onChange={(e) => setActorName(e.target.value)}
                                    placeholder="Actor Name"
                                />
                            </div>
                        </div>
                        {/* Popular movies checkbox */}
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={popularMovies}
                                    onChange={(e) => setPopularMovies(e.target.checked)}
                                    id="popularMoviesCheckbox"
                                />
                                <label className="form-check-label small-font" htmlFor="popularMoviesCheckbox">
                                    Popular Movies
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {/* Render search history */}
                        <div className="col">
                            <small>Search History</small>
                            {renderSearchHistory()}</div>
                    </div>
                    <div className="row mt-5 pb-4">
                        {/* Shopping cart */}
                        <div className="col">
                            <small>Items in Cart: {shoppingCart.length}</small>
                            <ListGroup className="text-left">
                                {shoppingCart.map((movie) => (
                                    <ListGroup.Item
                                        key={movie.id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {movie.title}
                                        <Button
                                            variant="link"
                                            className="text-decoration-none btn-black"
                                            onClick={() => handleRemoveFromCart(movie)}
                                        >
                                            Remove
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
                {/* Search Results Col*/}
                <div className="col-12 col-lg-7 mx-lg-2 mt-4 mt-lg-0">
                    <div className="row">
                        {/* Render search results */}
                        <div className="col">{renderSearchResults()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;