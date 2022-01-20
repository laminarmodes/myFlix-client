import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    render() {
        const { movieObject, onBackClick } = this.props;

        return (

            <div>
                <Card className="movie-view">
                    <Card.Img variant="top" src={movieObject.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movieObject.Title}</Card.Title>
                        <Card.Subtitle>Directed by</Card.Subtitle>
                        <Card.Text> {movieObject.Director.Name}</Card.Text>

                        <Link to={`/directors/${movieObject.Director.Name}`}>
                            <Button variant="link">
                                Director Info
                            </Button>
                        </Link>

                        <Card.Subtitle>Plot</Card.Subtitle>
                        <Card.Text>{movieObject.Description}</Card.Text>

                        <Card.Subtitle>Genre</Card.Subtitle>
                        <Card.Text>{movieObject.Genre.Name}</Card.Text>

                        <Link to={`/genres/${movieObject.Genre.Name}`}>
                            <Button variant="link">
                                Genre Info
                            </Button>
                        </Link>

                    </Card.Body>

                    <Button onClick={() => { onBackClick(null) }}>
                        Back
                    </Button>
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