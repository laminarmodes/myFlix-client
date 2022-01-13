import React from 'react';

export class MovieCard extends React.Component {
    render() {
        // Access the movie data
        // This refers to the class component you are working on
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => {
            onMovieClick(movieData);
            // console.log("movie was clicked");
        }}><div><img src={movieData.ImagePath} crossOrigin="true" /></div><div>{movieData.Title}</div>
        </div>;
    }
}