import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import interstellarImage from '../temp-images/interstellar.jpg';
import inceptionImage from '../temp-images/inception.jpg';
import arrivalImage from '../temp-images/arrival.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

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

    componentDidMount() {
        axios.get('https://myflixappcf.herokuapp.com/movies').then(response => {
            this.setState({
                movies: response.data
            });
        }).catch(error => {
            console.log(error);
        });
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
    onLoggedIn(userLoggedIn) {
        this.setState({
            userLoggedIn
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
            return <div class="main-view" />;
        } else {
            return (
                <div className={"gradientBackground"}>
                    <Row className="justify-content-md-center">
                        {selectedMovie ? (
                            // Display Single Movie View

                            <Col md={8}>
                                <MovieView
                                    movieObject={selectedMovie}
                                    onBackClick={newSelectedMovie => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }} />
                            </Col>)

                            :
                            // Display full list of movies


                            movies.map(movie => (
                                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <MovieCard
                                        key={movie._id}
                                        movieData={movie}
                                        onMovieClick={movie => {
                                            this.setSelectedMovie(movie)
                                        }} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            );
        }
    }
}

export default MainView;