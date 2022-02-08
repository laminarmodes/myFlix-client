import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';
import { setUserObject } from '../../actions/actions';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    addToFavorites(movieId) {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.post(`https://myflixappcf.herokuapp.com/users/${userName}/movies/${movieId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            method: `POST`
        }).then((response) => {
            alert("Added movie to favorites");
            this.props.setUserObject(response.data);
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {

        const { userObject, movieObject, onBackClick } = this.props;
        //const { userObject } = this.props;
        const isFavorite = userObject.FavoriteMovies.some((favoriteMovie) => (favoriteMovie == movieObject._id));

        return (

            <div>
                {console.log("hi")}
                <Button variant="info" className="back-button" variant="info" onClick={() => { onBackClick(null) }}>
                    Back
                </Button>

                <Card className="movie-view">
                    <div className="card-contents">
                        <Card.Img variant="top" src={movieObject.ImagePath} />
                        <Card.Body>
                            <Card.Title>{movieObject.Title}</Card.Title>
                            <Card.Subtitle>Directed by</Card.Subtitle>
                            <br />
                            <Link to={`/directors/${movieObject.Director.Name}`}>
                                <Button variant="outline-info">
                                    {movieObject.Director.Name}
                                </Button>
                            </Link>
                            <br /><br />
                            <Card.Subtitle>Plot</Card.Subtitle>
                            <Card.Text>{movieObject.Description}</Card.Text>

                            <Card.Subtitle>Genre</Card.Subtitle>
                            <br />
                            <Link to={`/genres/${movieObject.Genre.Name}`}>
                                <Button variant="outline-info">
                                    {movieObject.Genre.Name}
                                </Button>
                            </Link>

                        </Card.Body>
                        <Button className="add-favorite" variant="info" disabled={isFavorite ? true : false} onClick={() => this.addToFavorites(movieObject._id)}>{isFavorite ? "Is Favorite" : "Add to Favoirites"}</Button>
                    </div>
                </Card>

                <Row>
                    {movieObject.Actors.map(actor => (
                        <Col md={3}>
                            <Card>
                                <Card.Title>Test</Card.Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

        );
    }



}

MovieView.propTypes = {
    movieObject: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};

let mapStateToProps = state => {
    const { isFavorite } = state;
    return {
        userObject: state.userObject,
        isFavorite
    }
}

export default connect(mapStateToProps, { setUserObject })(MovieView)