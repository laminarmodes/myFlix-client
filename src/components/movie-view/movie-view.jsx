import React from 'react';

export class MovieView extends React.Component {

    render() {
        const { movieObject, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movieObject.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movieObject.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movieObject.Description}</span>
                </div>
                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movieObject.Actors}</span>
                </div>
                <div className="movie-directorName">
                    <span className="label">Director Name: </span>
                    <span className="value">{movieObject.Director.Name}</span>
                </div>
                <div className="movie-directorBio">
                    <span className="label">Director Bio: </span>
                    <span className="value">{movieObject.Director.Bio}</span>
                </div>
                <div className="movie-genreName">
                    <span className="label">Genre: </span>
                    <span className="value">{movieObject.Genre.Name}</span>
                </div>
                <div className="movie-genreDescription">
                    <span className="label">Genre Description: </span>
                    <span className="value">{movieObject.Genre.Description}</span>
                </div>
                <button onClick={() => {
                    onBackClick(null);
                }}>Back</button>
            </div>
        );
    }
}