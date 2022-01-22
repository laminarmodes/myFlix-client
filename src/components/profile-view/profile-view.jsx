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

// export function ProfileView(movies, user, userObject, setUser, onLoggedOut, onBackClick) {

export function ProfileView(props) {

    const { movies, user, userObject, setUser, onLoggedOut, onBackClick } = props;

    //const { movies, user, setUser, onBackClick } = this.props;

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

    // constructor() {
    //     super();
    //     this.state = {
    //         Username: null,
    //         Password: null,
    //         Email: null,
    //         Birthday: null,
    //         FavoriteMovies: []
    //     };
    // }

    // componentDidMount() {
    //     this.getUser();
    // }

    // Access the user data and movie data
    // This refers to the class component you are working on



    const validate = () => {

        let isRequired = true;

        if (!registrationName) {
            setNameErr('Name is required')
            isRequired = false;
        }

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

    function getUser() {
        const userName = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        axios
            .get(`https://myflixappcf.herokuapp.com/users/${userName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // this.setState({
                //     Username: response.data.Username,
                //     Password: response.data.Password,
                //     Email: response.data.Email,
                //     Birthday: response.data.Birthday,
                //     FavoriteMovies: response.data.FavoriteMovies
                // });
                // console.log("got user")

                setUser(response.data);

            })
            .catch(function (error) {
                console.log("error in getUser");
                console.log(error);
            });
    }

    // setUsername(userName) {
    //     this.state.Username = userName;
    // }

    // setEmail(userEmail) {
    //     this.state.Email = userEmail;
    // }

    // setPassword(userPassword) {
    //     this.state.Password = userPassword;
    // }

    // setBirthday(userBirthday) {
    //     this.state.Birthday = userBirthday;
    // }

    const handleUpdate = (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.put(`https://myflixappcf.herokuapp.com/users/${userName}`, {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                // this.setState({
                //     Username: response.data.Username,
                //     Password: response.data.Password,
                //     Email: response.data.Email,
                //     Birthday: response.data.Birthday
                // });

                console.log(response);
                setUser(response.data);


                localStorage.setItem("user, this.state.Username");
                const date = response.data;
                alert(`Profile is updated with ${this.state.Username}, ${data}`)
            }).catch(function (error) {
                console.log(error);
            });
    };

    const deleteFavorite = (movieId) => {
        const userName = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://myflixappcf.herokuapp.com/users/${userName}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            console.log(response);
            // getUser???
            this.componentDidMount();
            alert("Movie has been deleted")

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

    //render() {

    //const { Username, Email, Birthday, FavoriteMovies } = this.state;


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

                {
                    userObject.FavoriteMovies.length && userObject.FavoriteMovies.map((movie) => (
                        <Col xs={12} sm={6} md={4} lg={6} xl={6} xxl={6} key={movie._id}>
                            <MovieCard
                                movieData={movies.find((m) => m._id === movie)} />
                            <Button type="danger" onClick={() => this.deleteFavorite((movies.find((m) => m._id === movie))._id)}>Delete</Button>
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
                            <Form.Control type="text" onChange={e => this.setRegistrationUsername(e.target.value)} />
                            {/* {usernameErr && <p>{usernameErr}</p>} */}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" onChange={e => this.setRegistrationEmail(e.target.value)} />
                            {/* {emailErr && <p>{emailErr}</p>} */}
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" onChange={e => this.setRegistrationBirthday(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={e => this.setRegistrationPassword(e.target.value)} />
                            {/* {passwordErr && <p>{passwordErr}</p>} */}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={e => this.setConfirmRegistrationPassword(e.target.value)} />
                            {/* {passwordErr && <p>{passwordErr}</p>} */}
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.handleUpdate}>
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
    //}


}

// // Enforce and validate data types based on apps configuration
// ProfileView.propTypes = {
//     // The movie prop may contain a title of type string
//     // shape({}) means it is an actual object
//     user: PropTypes.shape({
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