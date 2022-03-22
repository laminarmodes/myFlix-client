/** 
 * @module MovieCard renders a single movie card component
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return (
            <Card className="movie-card">
                <Card.Img variant="top" src={movieData.ImagePath} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Subtitle>Directed by</Card.Subtitle>
                    <Card.Text>{movieData.Director.Name}</Card.Text>
                </Card.Body>
                <div className="card-button">
                    <Link to={`/movies/${movieData._id}`}>
                        <Button variant="light" className="open-button">
                            Open
                        </Button>
                    </Link>
                </div>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
};