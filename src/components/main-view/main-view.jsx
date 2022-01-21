import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import interstellarImage from '../temp-images/interstellar.jpg';
import inceptionImage from '../temp-images/inception.jpg';
import arrivalImage from '../temp-images/arrival.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import Button from 'react-bootstrap/Button';

import { NavBar } from '../navbar-view/navbar-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            userLoggedIn: null,
            userRegistering: null
        };
    }

    // This is called every time the user loads the page

    componentDidMount() {

        // Persist login data
        // Check if the user is logged in by checking localStorage
        // Get the value of the token from the localStorage
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            // If access key is present, user is logged in and can call getMovies method
            this.setState({
                userLoggedIn: localStorage.getItem('user')
            });
            // Make the get request only if the user is logged in
            this.getMovies(accessToken);
        }
    }

    /*When a movie is clicked, this function is 
    invoked and updates the state of 
    the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onRegistering(userRegistering) {
        this.setState({
            userRegistering
        });

    }

    onRegistered(userFinishedRegistering, userRegistering) {
        this.setState({
            userFinishedRegistering,
            userRegistering
        });
    }

    /* When a user successfully logs in, 
    this function updates the `user` property in 
    state to that *particular user*/
    // This method will be passed in as a prop with the same name to LoginView
    // It is called when the user logs in, by the handleSubmit method
    // When handleSubmit method is called, it updates the state with the logged in authData
    onLoggedIn(authData) {
        // auth data contains both user and token
        console.log(authData)
        this.setState({
            // The user's username is saved in the user state
            userLoggedIn: authData.user.Username
        });

        // The token and user are saved in localStorage, as key and value
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // Gets the movies from API once the user is logged in
        // Remember 'this' refers to the object itself (the MainView class)
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            userLoggedIn: null
        });
    }

    getMovies(token) {
        // User Axios to make a GET request to the "movies" endpoint of Node.js API
        axios.get('https://myflixappcf.herokuapp.com/movies', {
            // Passing in bearer authorization in header to make authenticated requests
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        }).catch(function (error) {
            console.log("error in getMovies")
            console.log(error);
        });
    }

    render() {
        // const movies = this.state.movies;
        const { movies, selectedMovie, userLoggedIn, userRegistering, userFinishedRegistering } = this.state;

        // Removed & !userFinishedRegistering
        if (userRegistering) return (
            <Row className="justify-content-md-center">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <button type="submit" onClick={
                        userRegistering => this.onRegistering(false)
                    }>
                        Back to login
                    </button>
                    <br />
                    <br />
                    Register:
                    <br />
                    <RegistrationView onRegistered={userFinishedRegistering => this.onRegistered(userFinishedRegistering)} />
                </Col>
            </Row>
        )

        /* If there is no user, the LoginView is rendered. 
        If there is a user logged in, 
        the user details are *passed as a prop to the LoginView*/

        if (!userLoggedIn) return (
            <Row className="justify-content-md-center">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    Login:
                    <br />
                    <LoginView onLoggedIn={userLoggedIn => this.onLoggedIn(userLoggedIn)} />
                    <br />
                    <button type="submit" onClick={
                        userRegistering => this.onRegistering(true)
                    }>
                        Register
                    </button>
                </Col>
            </Row>


        );

        if (movies.length === 0) {
            return <div className="main-view" />;
        } else {
            return (
                <Router>
                    <div className={"gradientBackground"}>
                        {/* <Row>
                            <Col>
                                <Button variant="primary" onClick={() => this.onLoggedOut()}>
                                    Logout
                                </Button>
                            </Col>
                        </Row> */}

                        <Route path="/" render={() => {
                            if (userLoggedIn) {
                                return (
                                    <Row>
                                        <Col md={12} style={{ padding: 0 }}>
                                            <NavBar onLoggedOut={() => this.onLoggedOut()} />
                                        </Col>
                                    </Row>
                                )
                            }
                        }} />

                        <Row className="justify-content-md-center">

                            <Route exact path="/" render={() => {
                                return (
                                    movies.map(movie => (
                                        <Col xs={12} sm={6} md={4} lg={3} xl={2} key={movie._id}>
                                            <MovieCard
                                                movieData={movie} />
                                        </Col>
                                    ))
                                )
                            }} />


                            <Route exact path="/movies/:movieId" render={({ match, history }) => {
                                return (
                                    <Col md={8}>
                                        <MovieView
                                            movieObject={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }} />

                            <Route exact path="/genres/:name" render={({ match, history }) => {
                                return (
                                    <Col md={8}>
                                        <GenreView
                                            genreObject={movies.find(m => m.Genre.Name == match.params.name).Genre} onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }} />

                            <Route exact path="/directors/:name" render={({ match, history }) => {
                                return (
                                    <Col md={8}>
                                        <DirectorView
                                            directorObject={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                )
                            }} />

                        </Row>

                    </div>
                </Router>
            );
        }
    }
}

// npm install react-router-dom@5.2.0
export default MainView;