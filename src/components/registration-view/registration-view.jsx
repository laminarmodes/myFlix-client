import React, { useState } from 'react';

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
        <form>
            <label>
                Username:
                <input type="text" value={registrationUsername} onChange={e => setRegistrationUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={registrationPassword} onChange={e => setRegistrationPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Confirm Password:
                <input type="password" value={confirmRegistrationPassword} onChange={e => setConfirmRegistrationPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Birthday:
                <input type="text" value={registrationBirthday} onChange={e => setRegistrationBirthday(e.target.value)} />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>
                Register
            </button>
        </form>
    )
}