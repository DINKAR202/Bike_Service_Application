import React, { useContext, useMemo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { UserContext } from '../../../App';
import './StripePayment.css';

// Define custom options for Stripe input elements
const useOptions = () => {
    const options = useMemo(() => ({
        style: {
            base: {
                color: '#101d2c',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    }), []);

    return options;
};

// Define the StripePayment component
const StripePayment = ({ orders }) => {
    const stripe = useStripe();  // Access the Stripe context for handling payments
    const elements = useElements();  // Access the Stripe input elements
    const options = useOptions();  // Apply custom styling to Stripe input elements
    const { loggedInUser } = useContext(UserContext);  // Access user information from the context

    // Handle the payment process when the form is submitted
    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return; // Return if Stripe or input elements are not available
        }

        const loading = toast.loading('Please wait...!');  // Display a loading toast

        try {
            // Create a payment method with card information
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
            });

            if (error) {
                toast.dismiss(loading);  // Dismiss the loading toast
                return swal('Failed!', error.message, 'error', { dangerMode: true });  // Display an error message using SweetAlert
            }

            // Prepare the booking information
            const bookingInfo = {
                payload: paymentMethod,
                order: orders,
                name: e.target.name.value,
                email: loggedInUser.email,
                city: e.target.address.value,
                paymentMethod: 'Credit Card',
                status: 'Pending',
                time: new Date().toDateString('dd/mm/yyyy'),
            };

            // Send the booking information to the server
            const response = await fetch('http://localhost:9090/add-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingInfo),
            });

            if (response.ok) {
                toast.dismiss(loading);  // Dismiss the loading toast
                swal('Successfully Ordered', `${loggedInUser.name} thank you for ordering ${orders.name} ....!!`, 'success');  // Display a success message using SweetAlert
            } else {
                toast.dismiss(loading);  // Dismiss the loading toast
                swal('Failed!', 'Something went wrong. Please try again later.', 'error', { dangerMode: true });  // Display an error message using SweetAlert
            }
        } catch (error) {
            toast.dismiss(loading);  // Dismiss the loading toast
            swal('Error!', 'An error occurred during payment processing. Please try again later.', 'error', { dangerMode: true });  // Display an error message using SweetAlert
        }
    };

    return (
        <Form onSubmit={handlePayment}>
            <Row>
                <Col md={6}>
                    <div className="admin-group">
                        <Form.Label htmlFor="name">Your Name</Form.Label>
                        <Form.Control name="name" id="name" type="text" value={loggedInUser.name} required />
                    </div>
                </Col>

                <Col md={6}>
                    <div className="admin-group">
                        <Form.Label htmlFor="email">Email Address</Form.Label>
                        <Form.Control name="email" id="email" type="email" value={loggedInUser.email} required />
                    </div>
                </Col>

                <Col md={6}>
                    <div className="admin-group mt-3">
                        <Form.Label htmlFor="address">Address (City)</Form.Label>
                        <Form.Control name="address" id="address" type="text" placeholder="Enter Your Address" required />
                    </div>
                </Col>

                <Col md={6} className="admin-group mt-3">
                    <Form.Label>
                        <span>Card number</span> <CardNumberElement options={options} />
                    </Form.Label>
                </Col>

                <Col md={6} className="admin-group mt-3">
                    <Form.Label>
                        <span>Expiration date</span> <CardExpiryElement options={options} />
                    </Form.Label>
                </Col>

                <Col md={6} className="admin-group mt-3">
                    <Form.Label>
                        <span>CVC</span> <CardCvcElement options={options} />
                    </Form.Label>
                </Col>
            </Row>

            <div className="text-center mt-3">
                <Button variant="info" type="submit" className="main-button" disabled={!stripe}>
                    Checkout
                </Button>
            </div>
        </Form>
    );
};

// Export the StripePayment component
export default StripePayment;
