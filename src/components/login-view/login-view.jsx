import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {

    // Set initial value of login variable
    // useState() returns array of paired values that break down variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Update the user state of MainView and make the movies list appear
    const handleSubmit = (e) => {

        // Prevents submit button from causing page to refresh
        e.preventDefault();

        // log the username and password to console
        console.log(username, password);

        // Allow user to be automatically logged in regardless of credntials
        props.onLoggedIn(username);
    };

    return (
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


        // <form>
        //     <label>
        //         Username:
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <br />
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <br />
        //     <button type="submit" onClick={handleSubmit}>
        //         Login
        //     </button>
        // </form >
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};