import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {

    // Set initial value of login variable
    // useState() returns array of paired values that break down variables
    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [confirmRegistrationPassword, setConfirmRegistrationPassword] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationBirthday, setRegistrationBirthday] = useState('');

    // Update the user state of MainView and make the movies list appear
    const handleSubmit = (e) => {

        // Prevents submit button from causing page to refresh
        e.preventDefault();

        // log the username and password to console
        console.log(registrationUsername, registrationPassword);

        // Allow user to be automatically registered in regardless of credntials
        props.onRegistered(registrationUsername);
    };

    return (

        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username </Form.Label>
                <Form.Control type="text" value={registrationUsername} placeholder="enter username" onChange={event => setRegistrationUsername(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" vaue={registrationPassword} onChange={e => setRegistrationPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" value={confirmRegistrationPassword} onChange={e => setConfirmRegistrationPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="text" value={registrationBirthday} onChange={e => setRegistrationBirthday(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Register
            </Button>
        </Form>


        // <form>
        //     <label>
        //         Username:
        //         <input type="text" value={registrationUsername} onChange={e => setRegistrationUsername(e.target.value)} />
        //     </label>
        //     <br />
        //     <label>
        //         Password:
        //         <input type="password" value={registrationPassword} onChange={e => setRegistrationPassword(e.target.value)} />
        //     </label>
        //     <br />
        //     <label>
        //         Confirm Password:
        //         <input type="password" value={confirmRegistrationPassword} onChange={e => setConfirmRegistrationPassword(e.target.value)} />
        //     </label>
        //     <br />
        //     <label>
        //         Email:
        //         <input type="email" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)} />
        //     </label>
        //     <br />
        //     <label>
        //         Birthday:
        //         <input type="text" value={registrationBirthday} onChange={e => setRegistrationBirthday(e.target.value)} />
        //     </label>
        //     <br />
        //     <button type="submit" onClick={handleSubmit}>
        //         Register
        //     </button>
        // </form>

    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired
};