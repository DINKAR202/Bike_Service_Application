// Import necessary dependencies and components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Toast } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { UserContext } from '../../../App';
import StripePayment from '../StripePayment/StripePayment';
import './Book.css';

// Create a functional component named Book
const Book = () => {
  // Access the selected service and name from the UserContext
  const { selectedService: { name, price } } = useContext(UserContext);
  
  // Initialize state variables
  const [show, setShow] = useState(true);
  const [services, setServices] = useState([]);

  // Define the Stripe promise for handling payments
  const stripePromise = loadStripe('pk_test_51O04DQSA2KZxfmUNRJy1bZrw4aBXYK9Z4yS4XzqpDgdgLnzQpAnQ5KKsFH0PpIsLiDrP890cqYRUdlG8iYYXF2SH00jOUf8dEh');

  // Create an array of options based on available services
  const options = services.map(service => ({ value: service.name, label: service.name, price: service.price }));
  
  // Determine the default selected option based on context or available options
  const defaultOption = name ? { value: name, label: name, price: price } : options[0] || { value: "Engine Repair", label: "Engine Repair", price: 2000 };
  
  // Initialize the selected option state
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  
  // Find the selected service details
  const orders = services.find(service => service.name === selectedOption.value);
  
  // Fetch available services from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:9090/all-services') // Replace with your actual API URL
      .then(res => setServices(res.data))
      .catch(error => toast.error(error.message));
  }, []);

  // Define custom styles for the Select component
  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: '#efeff5',
      border: "1px solid #17a2b8",
      '&:hover': { border: '1px solid #17a2b8' },
      height: "calc(2em + 0.75rem + 2px)",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? "#17a2b8" : isFocused ? "#16c8e48c" : null,
        color: isDisabled ? null : isSelected ? "white" : isFocused ? "black" : "black",
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': { ...styles[':active'], backgroundColor: !isDisabled && (isSelected ? "#17a2b8" : "#16c8e48c") },
      };
    },
  };

  // Render the user interface
  return (
    <section className='checkout'>
      <Container>
        <div className="bg-white p-5 shadow checkout-package" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
          <table className="checkout-table text-center">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Select onChange={option => setSelectedOption(option)} defaultValue={defaultOption} options={options} styles={colourStyles} />
                </td>
                <td> INR {price || selectedOption.price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Toast className="toast-right" style={{ marginLeft: 'auto' }} onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Header>
            <img src={""} className="rounded mr-2" alt="Info" /> {/* Add your image source */}
            <strong className="mr-auto">Important Info</strong>
          </Toast.Header>
          <Toast.Body className="text-center">
            Use this Card Number to test the payment
            <br />
            <b>4242 4242 4242 4242</b>
          </Toast.Body>
        </Toast>

        <div className="mt-5 bg-white shadow p-5" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
          <Elements stripe={stripePromise}>
            <StripePayment orders={orders} />
          </Elements>
        </div>
      </Container>
    </section>
  );
};

export default Book;
