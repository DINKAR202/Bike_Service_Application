// Import necessary dependencies
import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { UserContext } from '../../../App';

// Define the AddAdmin component
const AddAdmin = () => {
    // Access the logged-in user's email from the context
    const { loggedInUser: { email } } = useContext(UserContext);

    // Initialize the form handling with react-hook-form
    const { register, handleSubmit, reset } = useForm();

    // Handle form submission
    const onSubmit = data => {
        if (email === "demo@admin.com"){
            // Display a message if the user's email is restricted
            return swal("Permission restriction!", "As a test-admin, you don't have this permission.", "info");
        }

        // Display a loading toast while the request is being processed
        const loading = toast.loading('Adding...Please wait!');

        // Send a POST request to add an admin
        axios.post('http://localhost:9090/add-admin', data)
            .then(res => {
                // Reset the form and dismiss the loading toast
                reset()
                toast.dismiss(loading);
                if (res.data) {
                    // Show a success message upon successful admin addition
                    return swal("Successfully Added",  `You Successfully Added  ${data.email}  as an admin.`, "success");
                }
                // Show an error message if something goes wrong
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                // Dismiss the loading toast and show an error message in case of a request error
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
            });
    }

    return (
        <Container>
    <Form onSubmit={handleSubmit(onSubmit)} className='admin-group'>
        {/* Container for the admin addition form */}
        <div className="p-5 mt-5 bg-white d-flex justify-content-center shadow" style={{ borderRadius: "15px"}}>
            {/* Stylish container with shadow effect */}
            <div className="py-md-4">
                {/* Form content container */}
                <Form.Label>Email</Form.Label>
                {/* Label for the email input field */}
                <Form.Row>
                    {/* Form row to organize form elements */}
                    <Form.Group as={Col} xs="auto" style={{ width: '25rem' }} >
                        {/* Form group for email input */}
                        <Form.Control type="text" {...register("email", { required: true })}  placeholder="Admin's Email Address" />
                        {/* Input field for entering admin's email */}
                    </Form.Group>
                    <Form.Group as={Col} xs="auto">
                        {/* Form group for the submit button */}
                        <Button type="submit"  variant='info' className='main-button' >Add Admin</Button>
                        {/* Submit button to add an admin */}
                    </Form.Group>
                </Form.Row>
            </div>
        </div>
    </Form>
</Container>

    );
};

export default AddAdmin;
