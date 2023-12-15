import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './SearchPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="row bg-dark">
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                    <div className="logo-container px-md-3">
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{ width: '60px', height: 'auto' }} alt="Logo" />
                    </div>
                    <div className="title-container">
                        <h1 className={"title ms-lg-5"}>The Movies Store</h1>
                    </div>
                </div>
                <div className="col-12 col-md-8 d-flex align-items-center justify-content-center">
                    <nav className="navbar">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/checkout">Checkout</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
};

export default App;
