/**
 This component represents the Checkout Page where users can complete their purchase.
 It allows users to enter their personal information and submit the payment.
 The payment amount is calculated based on the items in the cart.
 After a successful purchase, the cart is emptied, and the user is navigated to the home page.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [payment, setPayment] = useState(0);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    /**
     * Fetches the cart items from the server and calculates the payment amount.
     * This effect runs only once when the component mounts.
     */
    useEffect(() => {
        // Fetch the cart items to calculate the payment amount
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPayment(data.length * 3.99);
                } else {
                    console.error('Invalid response: expected an array');
                }
            })
            .catch((error) => {
                console.error('Error fetching cart contents:', error);
            });
    }, []);

    /**
     * Handles form submission when the user clicks the "Complete Purchase" button.
     * Validates the form fields and sends the purchase information to the server.
     * Resets the cart and navigates to the home page after a successful purchase.
     *
     * @param {Object} e - The form submit event
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '') {
            // Handle form validation error
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('payment', payment);

        const resetCart = () => {
            fetch('/api/cart', {
                method: 'DELETE',
            })
                .then(() => {
                    // Reset cart items
                    setPayment(0);
                })
                .catch((error) => {
                    console.error('Error emptying cart:', error);
                });
        };

        fetch('/debug/purchases', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setPurchaseComplete(true);
            })
            .catch((error) => {
                // Handle error during purchase submission
            });

        resetCart();

        navigate('/');
    };


    // Render the form only if there are items in the cart
    if (payment === 0) {
        return (
            <div>
                <p className="text-center mt-5">Your cart is empty. Please go shopping first.</p>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="firstNameInput" className="col-sm-2 col-form-label">
                        First Name:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="firstNameInput"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="lastNameInput" className="col-sm-2 col-form-label">
                        Last Name:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="lastNameInput"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="emailInput" className="col-sm-2 col-form-label">
                        Email:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="paymentInput" className="col-sm-2 col-form-label">
                        Payment:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="number"
                            className="form-control"
                            id="paymentInput"
                            value={payment}
                            onChange={(e) => setPayment(parseFloat(e.target.value))}
                            disabled
                        />
                    </div>
                </div>
                <div className="text-center mb-3">
                    <button type="submit" className="btn btn-info">
                        Complete Purchase
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CheckoutPage;
