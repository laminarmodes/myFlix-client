/** 
 * @module MainView renders the main view that displays all the movies
 */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { setUserObject } from '../../actions/actions';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import Container from 'react-bootstrap/Container';
import { NavBar } from '../navbar-view/navbar-view';
import { Link } from "react-router-dom";

export class MainView extends React.Component {

    constructor() {
        super();

    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (accessToken !== null) {
            this.getMovies(accessToken);
            this.getUser(accessToken, user);
        }
    }

    onLoggedIn(authData) {
        this.props.setUserObject(authData.user);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(accessToken, authData.user.Username);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUserObject(authData.user);
    }

    getUser(token, userName) {
        axios
            .get(`https://myflixappcf.herokuapp.com/users/${userName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.props.setUserObject(response.data);
                console.log("got user")
            })
            .catch(function (error) {
                console.log("error in getUser");
                console.log(error);
            });
    }

    getMovies(token) {
        axios.get('https://myflixappcf.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
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
        let userIsLoggedIn = localStorage.getItem('user');

        return (
            <Router>
                <NavBar onLoggedOut={() => this.onLoggedOut()} userObject={userObject} />
                <Container>
                    < Row className="justify-content-md-center" >
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

                        <Route exact path="/" render={() => {
                            if (userIsLoggedIn) return (
                                < MoviesList />
                            )
                        }} />

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
                                        userObject={userObject} movieObject={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            )
                        }} />

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

let mapStateToProps = state => {
    return {
        movies: state.movies,
        userObject: state.userObject
    }
}

export default connect(mapStateToProps, { setMovies, setUserObject })(MainView);
