/** 
 * @module LoginView renders the login page
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

export function LoginView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflixappcf.herokuapp.com/login', {
            Username: username,
            Password: password
        }).then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        }).catch(error => {
            console.log('no such user')
        });
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
            <Link to="/register">
                Register
            </Link>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};