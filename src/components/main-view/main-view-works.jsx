import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import interstellarImage from '../temp-images/interstellar.jpg';
import inceptionImage from '../temp-images/inception.jpg';
import arrivalImage from '../temp-images/arrival.jpeg';

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

    onRegistered(userRegistering) {
        this.setState({
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


    onRegistering(userRegistering) {
        this.setState({
            userRegistering
        });
    }

    handleRegister(userRegistering) {
        this.setState({
            userRegistering
        });
        console.log(userRegistering)
    };

    render() {
        // const movies = this.state.movies;
        const { movies, selectedMovie, userLoggedIn, userRegistering } = this.state;


        if (userRegistering) return (
            <div>
                <button type="submit" onClick={
                    userRegistering => this.handleRegister(false)
                }>
                    Back to login
                </button>
                <br />
                <br />
                Register:
                <br />
                <RegistrationView onRegistered={userRegistering => this.onRegistered(userRegistering)} />


            </div>
        )

        /* If there is no user, the LoginView is rendered. 
        If there is a user logged in, 
        the user details are *passed as a prop to the LoginView*/

        if (!userLoggedIn) return (
            <div>
                Login:
                <br />
                <LoginView onLoggedIn={userLoggedIn => this.onLoggedIn(userLoggedIn)} />
                <br />
                <button type="submit" onClick={
                    userRegistering => this.handleRegister(true)
                }>
                    Register
                </button>
            </div >
        );

        if (movies.length === 0) {
            return <div className="main-view" />;
        } else {
            return (
                <div className="main-view">
                    {selectedMovie ?
                        // Display Single Movie View
                        <MovieView
                            movieObject={selectedMovie}
                            onBackClick={newSelectedMovie => {
                                this.setSelectedMovie(newSelectedMovie);
                            }} />
                        :
                        // Display full list of movies
                        movies.map(movie => (
                            <MovieCard
                                key={movie._id}
                                movieData={movie}
                                onMovieClick={movie => {
                                    this.setSelectedMovie(movie)
                                }} />))
                    }
                </div>
            );
        }

        // if (movies.length === 0) return <div className="main-view">The list is empty</div>;

        // return (
        //     <div className="main-view">
        //         {movies.map(movie => <MovieCard key={movie._id} movieData={movie} />)}
        //     </div>
        // );
    }



}

export default MainView;