import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { setUserObject } from '../../actions/actions';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import Container from 'react-bootstrap/Container';

import { NavBar } from '../navbar-view/navbar-view';
import { Link } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor() {
        super();

    }

    // This is called every time the user loads the page
    componentDidMount() {
        // Persist login data
        // Check if the user is logged in by checking localStorage
        // Get the value of the token from the localStorage
        let accessToken = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (accessToken !== null) {
            // If access key is present, user is logged in and can call getMovies method
            // this.setState({
            //     userName: localStorage.getItem('user')
            // });

            // Make the get request only if the user is logged in
            this.getMovies(accessToken);
            this.getUser(accessToken, user);
        }
    }



    // setUser = (userObject) => {
    //     this.setState({
    //         userObject: userObject
    //     });
    //     localStorage.setItem('user', userObject.Username);
    // }

    onLoggedIn(authData) {
        // auth data contains both user and token
        console.log(authData)
        // this.setState({
        //     // userName: authData.user.Username,
        //     userObject: authData.user
        // });

        this.props.setUserObject(authData.user);

        // The token and user are saved in localStorage, as key and value
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // Gets the movies from API once the user is logged in
        // Remember 'this' refers to the object itself (the MainView class)
        this.getMovies(authData.token);
        this.getUser(accessToken, authData.user.Username); //2nd argument used to be user
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // this.setState({
        //     // userName: null,
        //     userObject: authData.user
        // });
        this.props.setUserObject(authData.user);
    }

    // setUser(updateUser) {
    //     this.props.setUserObject(updateUser);
    // }

    getUser(token, userName) {
        //const userName = localStorage.getItem("user");
        //const token = localStorage.getItem("token");
        axios
            .get(`https://myflixappcf.herokuapp.com/users/${userName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // this.setState({
                //     userObject: response.data
                // });
                this.props.setUserObject(response.data);
                console.log("got user")
            })
            .catch(function (error) {
                console.log("error in getUser");
                console.log(error);
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
        }).catch(function (error) {
            console.log("error in getMovies")
            console.log(error);
        });
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    render() {

        let { movies, userObject } = this.props;
        // let { userName, userObject } = this.state;
        // let { userObject } = this.state;

        let userIsLoggedIn = localStorage.getItem('user');

        return (
            <Router>

                {/* <NavBar onLoggedOut={() => this.onLoggedOut()} userName={this.state.userObject.Username} /> */}

                <NavBar onLoggedOut={() => this.onLoggedOut()} userObject={userObject} />

                <Container>
                    < Row className="justify-content-md-center" >

                        {/* Registration */}
                        <Route path="/register" render={() => {
                            if (userIsLoggedIn) {
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
                            if (!userIsLoggedIn) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                        }
                        } />


                        {/* Movie List */}
                        <Route exact path="/" render={() => {
                            if (userIsLoggedIn) return (
                                // < MoviesList movies={movies} />
                                < MoviesList />
                            )
                        }} />

                        {/* Single Movie View */}
                        < Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!userIsLoggedIn) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
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
                            if (!userIsLoggedIn) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
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
                            if (!userIsLoggedIn) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
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
                            if (!userIsLoggedIn) return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
                                </Col>
                            );
                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }
                            return (
                                <Col>
                                    {/* <ProfileView movies={movies} userObject={userObject} onBackClick={() => history.goBack()}
                                    /> */}
                                    <ProfileView onBackClick={() => history.goBack()}
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
    return {
        movies: state.movies,
        userObject: state.userObject
    }
}

// npm install react-router-dom@5.2.0
// export default MainView;

// setMovies is the action creator
// can now use this.props.setMovies
export default connect(mapStateToProps, { setMovies, setUserObject })(MainView);
