/**
 This component represents the Cart Page where users can view and manage their cart items.
 It retrieves cart items from the server and allows users to remove items from the cart or empty the entire cart.
 The cart items are displayed in a responsive and visually appealing layout.
 */
import React, { useEffect, useState } from 'react';
import {Button} from "react-bootstrap";
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [expandedMovieIds, setExpandedMovieIds] = useState([]);

    /**
     * Fetches the cart contents from the server and updates the cartItems state.
     * This effect runs only once when the component mounts.
     */
    useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCartItems(data);
                } else {
                    console.error('Invalid response: expected an array');
                }
            })
            .catch((error) => {
                console.error('Error fetching cart contents:', error);
            });
    }, []);

    /**
     * Removes a movie from the cart.
     *
     * @param {number} movieId - The ID of the movie to be removed from the cart
     */
    const removeFromCart = (movieId) => {
        fetch(`/api/cart/${movieId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== movieId));
            })
            .catch((error) => {
                console.error('Error removing item from cart:', error);
            });
    };

    /**
     * Empties the cart by removing all items.
     */
    const emptyCart = () => {
        fetch('/api/cart', {
            method: 'DELETE',
        })
            .then(() => {
                setCartItems([]);
            })
            .catch((error) => {
                console.error('Error emptying cart:', error);
            });
    };

    /**
     * Renders the cart items.
     * Displays each item in a responsive container with movie details, image, and options to expand or collapse movie overview.
     * Provides functionality to read more or read less of the movie overview.
     *
     * @returns {JSX.Element} - JSX elements representing the cart items
     */
    const renderCartItems = () => {
        /**
         * Toggles the movie overview's expanded state.
         *
         * @param {number} movieId - The ID of the movie to toggle its overview
         */
        const toggleMovieOverview = (movieId) => {
            if (expandedMovieIds.includes(movieId)) {
                setExpandedMovieIds(expandedMovieIds.filter((id) => id !== movieId));
            } else {
                setExpandedMovieIds([...expandedMovieIds, movieId]);
            }
        };

        console.log(cartItems);
        if (cartItems.length === 0) {
            return <p className="text-center mt-5">Your cart is empty. Please go shopping first.</p>;
        }

        return <div className="container mt-4">
            {cartItems.map((item) => (
                <div key={item.id} className="row mb-4 container movie-container">
                    <div className="col-4 pt-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={`${item.title} Poster`}
                            className="img-fluid movie-image my-2"
                        />
                    </div>
                    <div className="col-8 text-left">
                        <h3 className="mt-2">{item.title}</h3>
                        <small className="movie-font">
                            {expandedMovieIds.includes(item.id)
                                ? item.overview
                                : item.overview.split(' ').slice(0, 20).join(' ') + '...'}
                            {item.overview.split(' ').length > 20 &&
                                (expandedMovieIds.includes(item.id) ? (
                                    <Button
                                        variant="link"
                                        className="text-decoration-none btn-black small-font"
                                        onClick={() => toggleMovieOverview(item.id)}
                                    >
                                        Read Less
                                    </Button>
                                ) : (
                                    <Button
                                        variant="link"
                                        className="text-decoration-none btn-black small-font"
                                        onClick={() => toggleMovieOverview(item.id)}
                                    >
                                        Read More
                                    </Button>
                                ))}
                        </small>
                        <p className="mt-2">
                            <small>Release date: {item.release_date}</small>
                        </p>
                        <p className="mt-2">
                            <small>Price: $3.99</small>
                            <Button
                                variant="link"
                                className="text-decoration-none btn-red small-font"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove from Cart
                            </Button>
                        </p>
                    </div>
                </div>
            ))}
            <div className={"text-center"}>
                <p>Total Cost: ${cartItems.length * 3.99}</p>
                <Button
                    variant="link"
                    className="text-decoration-none btn-red"
                    onClick={() => emptyCart()}
                >
                    Empty Cart
                </Button>
            </div>
        </div>
    };


    return (
        <div>
            {renderCartItems()}
        </div>
    );
};

export default CartPage;

