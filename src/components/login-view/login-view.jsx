import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
        </form >
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};