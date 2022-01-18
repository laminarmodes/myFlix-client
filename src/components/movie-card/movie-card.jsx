import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        // Access the movie data
        // This refers to the class component you are working on
        const { movieData, onMovieClick } = this.props;
        return (
            <Card className="movie-card">
                <Card.Img variant="top" src={movieData.ImagePath} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Subtitle>Directed by</Card.Subtitle>
                    <Card.Text>{movieData.Director.Name}</Card.Text>
                    <Button onClick={() => onMovieClick(movieData)} variant="link">
                        Open
                    </Button>
                </Card.Body>
            </Card>
        );
    }

}

// Enforce and validate data types based on apps configuration
MovieCard.propTypes = {
    // The movie prop may contain a title of type string
    // shape({}) means it is an actual object
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    // The props object must contain onMovieclick and it must be a function
    onMovieClick: PropTypes.func.isRequired
};



{/* <div className="movie-card" onClick={() => {
            onMovieClick(movieData);
            // console.log("movie was clicked");
        }}><div><img src={movieData.ImagePath} crossOrigin="true" /></div><div>{movieData.Title}</div>
            <br />
        </div>; */}