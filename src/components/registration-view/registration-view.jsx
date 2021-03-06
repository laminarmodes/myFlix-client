/** 
 * @module RegistrationView renders the page for the user to register
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {

    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [confirmRegistrationPassword, setConfirmRegistrationPassword] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationBirthday, setRegistrationBirthday] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');


    const validate = () => {

        let isRequired = true;

        if (!registrationUsername) {
            setUsernameErr('Username is required')
            isRequired = false;
        }

        if (!registrationPassword) {
            setPasswordErr('Password is required')
            isRequired = false;
        }

        if (registrationPassword != confirmRegistrationPassword) {
            setPasswordErr('Passwords must match')
            isRequired = false;
        } else if (registrationPassword.length < 6) {
            setPasswordErr('Password must be at least 6 characters long')
            isRequired = false;
        }

        if (!registrationEmail) {
            setEmailErr('Email is required')
            isRequired = false;
        } else if (registrationEmail.indexOf('@') === -1) {
            setEmailErr('Must be a valid email')
            isRequired = false;
        }

        return isRequired;
    }

    const handleRegistration = (e) => {

        e.preventDefault();

        const isRequired = validate();

        if (isRequired) {
            axios.post('https://myflixappcf.herokuapp.com/users', {
                Username: registrationUsername,
                Password: registrationPassword,
                Email: registrationEmail,
                Birthday: registrationBirthday

            }).then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            }).catch(response => {
                console.error(response);
                alert('Unable to register');
            });
        }

    };

    return (
        <div>
            <Form>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username </Form.Label>
                    <Form.Control type="text" value={registrationUsername} placeholder="enter username" onChange={event => setRegistrationUsername(event.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" vaue={registrationPassword} onChange={e => setRegistrationPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmRegistrationPassword} onChange={e => setConfirmRegistrationPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)} />
                    {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" value={registrationBirthday} onChange={e => setRegistrationBirthday(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleRegistration}>
                    Register
                </Button>

            </Form>

        </div>

    )
}