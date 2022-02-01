import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { NavBar } from '../navbar-view/navbar-view';
import { Link } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
            userObject: {}
        };
    }

    // selectedMovie: null,

    // This is called every time the user loads the page

    componentDidMount() {

        // Persist login data
        // Check if the user is logged in by checking localStorage
        // Get the value of the token from the localStorage
        let accessToken = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (accessToken !== null) {
            // If access key is present, user is logged in and can call getMovies method
            this.setState({

                user: localStorage.getItem('user')
            });
            // Make the get request only if the user is logged in
            this.getMovies(accessToken);
            this.getUser(accessToken, user);
        }

    }

    /*When a movie is clicked, this function is 
    invoked and updates the state of 
    the `selectedMovie` *property to that movie*/
    // setSelectedMovie(newSelectedMovie) {
    //     this.setState({
    //         selectedMovie: newSelectedMovie
    //     });
    // }

    getUser(token, userName) {
        //const userName = localStorage.getItem("user");
        //const token = localStorage.getItem("token");
        axios
            .get(`https://myflixappcf.herokuapp.com/users/${userName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    userObject: response.data
                });
                console.log("got user")
            })
            .catch(function (error) {
                console.log("error in getUser");
                console.log(error);
            });
    }

    setUser = (user) => {
        this.setState({
            userObject: user
        });
        localStorage.setItem('user', userObject.Username);

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

            user: authData.user.Username,
            userObject: authData.user
        });

        // The token and user are saved in localStorage, as key and value
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // Gets the movies from API once the user is logged in
        // Remember 'this' refers to the object itself (the MainView class)
        this.getMovies(authData.token);
        this.getUser(accessToken, user);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
            userObject: authData.user
        });
    }

    getMovies(token) {
        // User Axios to make a GET request to the "movies" endpoint of Node.js API
        axios.get('https://myflixappcf.herokuapp.com/movies', {
            // Passing in bearer authorization in header to make authenticated requests
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Assign the result to the state
            // this.setState({
            //     movies: response.data
            // });
            this.props.setMovies(response.data);
            //this.props.dispatch(setMovies(response.data));
        }).catch(function (error) {
            console.log("error in getMovies")
            console.log(error);
        });
    }

    render() {

        // const { movies, selectedMovie, user, userObject } = this.state;

        let { movies } = this.props;
        let { user, userObject } = this.state;

        console.log(`there are ${movies[0]}`)

        return (
            <Router>

                <NavBar onLoggedOut={() => this.onLoggedOut()} user={this.state.user} />

                <Container>
                    < Row className="justify-content-md-center" >

                        {/* Registration */}
                        <Route path="/register" render={() => {
                            if (user) {
                                return <Redirect to="/" />
                            }
                            return (
                                <Row className="justify-content-md-center">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Link to="/">
                                            Back to login
                                        </Link>
                                        <br />
                                        <RegistrationView />
                                    </Col>
                                </Row>
                            )
                        }} />

                        {/* Login */}
                        <Route exact path="/" render={() => {
                            if (!user) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                        }
                        } />


                        {/* Movie List */}
                        <Route exact path="/" render={() => {
                            return (
                                // movies.map(movie => (
                                //     <Col xs={12} sm={6} md={4} lg={3} xl={2} key={movie._id}>
                                //         <MovieCard
                                //             movieData={movie} />
                                //     </Col>
                                // ))
                                < MoviesList movies={movies} />
                                //<Col></Col>
                            )
                        }} />

                        {/* Single Movie View */}
                        < Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                            return (
                                <Col md={8}>
                                    <MovieView
                                        movieObject={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            )
                        }} />

                        {/* Genere View */}
                        < Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                            return (
                                <Col md={8}>
                                    <GenreView
                                        genreObject={movies.find(m => m.Genre.Name == match.params.name).Genre} onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            )
                        }} />

                        {/* Director View */}
                        < Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        directorObject={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            )
                        }} />

                        {/* Profile View */}
                        <Route path="/profile" render={({ match, history }) => {
                            if (!user) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                            return (
                                <Col>
                                    <ProfileView
                                        movies={movies}
                                        user={this.state.user}
                                        setUser={user => this.setUser(user)}
                                        userObject={userObject}
                                        onLoggedOut={() => this.onLoggedOut}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            )
                        }} />

                    </Row >

                </Container>


            </Router >
        );

    }
}

// Gets the state from the store
// and passes it as props to the component that is connected to a store
// instead of the component accessing the state directly, it accesses the state as props
let mapStateToProps = state => {
    // The movies is the prop
    // Passing movies as the prop of this component
    return { movies: state.movies }
}

// npm install react-router-dom@5.2.0
// export default MainView;

// setMovies is the action creator
// can now use this.props.setMovies
export default connect(mapStateToProps, { setMovies })(MainView);
