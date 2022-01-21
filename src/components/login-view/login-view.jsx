import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Link } from "react-router-dom";

// testuser4567
// testpassword4567
export function LoginView(props) {

    // Set initial value of login variable
    // useState() returns array of paired values that break down variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Update the user state of MainView and make the movies list appear
    const handleSubmit = (e) => {

        // Prevents submit button from causing page to refresh
        e.preventDefault();

        /* Send a request to the server for authentication */
        /* A POST request is made by sending the username and password to the
        login endpoint */
        axios.post('https://myflixappcf.herokuapp.com/login', {
            Username: username,
            Password: password
        }).then(response => {
            // If there is a match, the onLoggedIn method that was passed through the props is called
            const data = response.data;
            // Remember, data contains the token and username both?s
            props.onLoggedIn(data);
        }).catch(error => {
            console.log('no such user')
        });

        // log the username and password to console
        // console.log(username, password);

        // Allow user to be automatically logged in regardless of credntials
        // props.onLoggedIn(username);
    };

    return (

        <div>
            Login:

            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" placeholder="enter username" onChange={event => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="text" placeholder="enter password" onChange={event => setPassword(event.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>

            </Form>
            {/* <Link to="/register">
                <Button variant="link">
                    Register
                </Button>
            </Link> */}
        </div>

    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};