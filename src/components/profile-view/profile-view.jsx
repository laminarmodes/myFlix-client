/** 
 * @module ProfileView renders the page that displays the user profile
 */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { connect, useSelector } from 'react-redux';
import { setUserObject } from '../../actions/actions';

export function ProfileView(props) {

    const { onBackClick } = props;
    const userObject = useSelector((state) => state.userObject);
    const movies = useSelector((state) => state.movies);
    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [confirmRegistrationPassword, setConfirmRegistrationPassword] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationBirthday, setRegistrationBirthday] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    const validate = () => {

        let isRequired = true;

        if (!registrationUsername) {
            setUsernameErr("Please enter a username");
            isRequired = false;
        }

        if (!registrationPassword) {
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
            setEmailErr("Please enter an email");
            isRequired = false;
        } else if (registrationEmail.indexOf('@') === -1) {
            setEmailErr('Must be a valid email')
            isRequired = false;
        }

        if (!registrationBirthday) {
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
                    props.setUserObject(response.data);
                    localStorage.setItem('user', data.Username);
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
            props.setUserObject(response.data);
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
            console.log(response);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.open(`/`, "_self");
            alert("User deleted");
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (

        <div>
            <Row>
                <Col>
                    <Button variant="light" className="back-button" onClick={() => { onBackClick(null) }}>
                        Back
                    </Button>
                </Col>
            </Row>

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
                            <Card.Text>{Date(userObject.Birthday).toString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {
                    userObject.FavoriteMovies.length ? userObject.FavoriteMovies.map((movie) => (
                        <Col xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                            <MovieCard movieData={movies.find((m) => m._id === movie)} key={movie._id} />
                            <Button variant="link" size="lg" className="delete-button" onClick={(e) => deleteFavorite((movies.find((m) => m._id === movie))._id)}>x remove</Button>
                        </Col>
                    )) : <p>No favorite movies</p>
                }
            </Row>

            <Row>
                <Col>
                    <Form className="update-info">
                        <Form.Group controlId="formUsername">
                            <h3>Update Information</h3>
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

                        <div>
                            <Button className="update-info-button" variant="info" type="submit" onClick={(e) => handleUpdate(e)}>
                                Update
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div>
                        <Button className="delete-user" variant="danger" onClick={(e) => deleteUser()}>
                            Delete my account
                        </Button>
                    </div>
                </Col>
            </Row>

        </div >
    );

}

let mapStateToProps = state => {
    return { userObject: state.userObject }
}

export default connect(mapStateToProps, { setUserObject })(ProfileView)