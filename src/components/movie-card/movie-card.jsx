import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        // Access the movie data
        // This refers to the class component you are working on
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => {
            onMovieClick(movieData);
            // console.log("movie was clicked");
        }}><div><img src={movieData.ImagePath} crossOrigin="true" /></div><div>{movieData.Title}</div>
            <br />
        </div>;
    }

}

// Enforce and validate data types based on apps configuration
MovieCard.PropTypes = {
    // The movie prop may contain a title of type string
    // shape({}) means it is an actual object
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.String.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    // The props object must contain onMovieclick and it must be a function
    onMovieClick: PropTypes.func.isRequired
};