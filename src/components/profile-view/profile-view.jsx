import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import { Link } from "react-router-dom";

export function ProfileView(props) {

    const { movies, user, userObject, setUser, onLoggedOut, onBackClick } = props;

    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [confirmRegistrationPassword, setConfirmRegistrationPassword] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationBirthday, setRegistrationBirthday] = useState('');

    // Form validation
    const [nameErr, setNameErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    const [favorites, setFavorites] = useState(userObject.FavoriteMovies);

    const validate = () => {

        let isRequired = true;

        if (!registrationUsername) {
            //setRegistrationUsername(userObject.Username);
            setUsernameErr("Please enter a username");
            isRequired = false;
        }

        if (!registrationPassword) {
            //setRegistrationPassword(userObject.Password);
            setPasswordErr("Please enter a password");
            isRequired = false;
        } else {
            if (registrationPassword != confirmRegistrationPassword) {
                setPasswordErr('Passwords must match')
                isRequired = false;
            } else if (registrationPassword.length < 6) {
                setPasswordErr('Password must be at least 6 characters long')
                isRequired = false;
            }
        }

        if (!registrationEmail) {
            //setRegistrationEmail(userObject.Email);
            setEmailErr("Please enter an email");
            isRequired = false;
        } else if (registrationEmail.indexOf('@') === -1) {
            setEmailErr('Must be a valid email')
            isRequired = false;
        }

        if (!registrationBirthday) {
            // setRegistrationBirthday(getDate())
            setBirthdayErr("Please enter a birthday");
            isRequired = false;
        }

        return isRequired;
    }

    function handleUpdate(e) {
        e.preventDefault();
        const isRequired = validate();
        if (isRequired) {
            e.preventDefault();
            const userName = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            axios.put(`https://myflixappcf.herokuapp.com/users/${userName}`, {
                Username: registrationUsername,
                Password: registrationPassword,
                Email: registrationEmail,
                Birthday: registrationBirthday
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((response) => {

                    const data = response.data;
                    console.log(data);
                    /* Question
                    The component should rerender when there is a change in state
                    The state change right here, so it should rerender the view of user info? */
                    setUser(response.data);
                    //userObject.setState(response.data);
                    localStorage.setItem('user', data.Username);
                    alert(`Profile is updated with ${this.state.Username}, ${data}`);
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("Input is not validated");
        }
    };

    function deleteFavorite(movieId) {
        console.log("deleteFavorite reached")
        const userName = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://myflixappcf.herokuapp.com/users/${userName}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            console.log(response);
            alert("Movie has been deleted")
            onFavoriteDelete(movieId);
            // Using this to change the state of "favorites"
            setFavorites(userObject.FavoriteMovies);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const deleteUser = () => {
        const userName = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://myflixappcf.herokuapp.com/users/${userName}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            alert("User deleted");
            console.log(reponse);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.open(`/`, "_self");
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>

            <Row>
                <Col>
                    <Card className="profile-view">
                        <Card.Body>
                            <Card.Title>Profile Informaion</Card.Title>
                            <Card.Subtitle>Username</Card.Subtitle>
                            <Card.Text>{userObject.Username}</Card.Text>
                            <Card.Subtitle>Email</Card.Subtitle>
                            <Card.Text>{userObject.Email}</Card.Text>
                            <Card.Subtitle>Birthday</Card.Subtitle>
                            <Card.Text>{userObject.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <br />
            <Row>

                {/* Using the userObject prop */}
                {
                    // userObject.FavoriteMovies.length && userObject.FavoriteMovies.map((movie) => (
                    //     <Col xs={12} sm={6} md={4} lg={6} xl={6} xxl={6} key={movie._id}>
                    //         <MovieCard
                    //             movieData={movies.find((m) => m._id === movie)} key={movie} />
                    //         <Button type="danger" onClick={(e) => deleteFavorite((movies.find((m) => m._id === movie))._id)}>Delete</Button>
                    //     </Col>
                    // ))
                }

                {/* Using the state variable "favorites" */}
                {
                    favorites.length && favorites.map((movie) => (
                        <Col xs={12} sm={6} md={4} lg={6} xl={6} xxl={6} key={movie._id}>
                            <MovieCard
                                movieData={movies.find((m) => m._id === movie)} key={movie} />
                            <Button type="danger" onClick={(e) => deleteFavorite((movies.find((m) => m._id === movie))._id)}>Delete</Button>
                        </Col>
                    ))
                }

            </Row>
            <br /><br /><br /><br />
            <Row>
                <Col>
                    Update Information
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" onChange={e => setRegistrationUsername(e.target.value)} />
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" onChange={e => setRegistrationEmail(e.target.value)} />
                            {emailErr && <p>{emailErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" onChange={e => setRegistrationBirthday(e.target.value)} />
                            {birthdayErr && <p>{birthdayErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={e => setRegistrationPassword(e.target.value)} />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={e => setConfirmRegistrationPassword(e.target.value)} />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={(e) => handleUpdate(e)}>
                            Update
                        </Button>
                        <br />
                        <br />
                        <br />
                        <Button variant="danger" onClick={() => this.deleteUser()}>
                            Delete my account
                        </Button>
                    </Form>
                </Col>
            </Row>

        </div >
    );

}

// // Enforce and validate data types based on apps configuration
// ProfileView.propTypes = {
//     // The movie prop may contain a title of type string
//     // shape({}) means it is an actual object
//     userObject: PropTypes.shape({
//         Username: PropTypes.string.isRequired,
//         Email: PropTypes.string.isRequired,
//         Password: PropTypes.string.isRequired,
//         Birthday: PropTypes.string,
//         FavoriteMovies: PropTypes.array
//     }).isRequired,
//     setUser: PropTypes.func.isRequired,
//     // The props object must contain onMovieclick and it must be a function
//     //onMovieClick: PropTypes.func.isRequired
// };