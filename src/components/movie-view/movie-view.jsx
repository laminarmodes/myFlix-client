import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

                        <Card.Subtitle>Plot</Card.Subtitle>
                        <Card.Text>{movieObject.Description}</Card.Text>

                        <Card.Subtitle>Genre</Card.Subtitle>
                        <Card.Text>{movieObject.Genre.Name}</Card.Text>

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


            // <div className="movie-view">
            //     <div className="movie-poster">
            //         <img src={movieObject.ImagePath} crossOrigin="true" />
            //     </div>
            //     <div className="movie-title">
            //         <span className="label">Title: </span>
            //         <span className="value">{movieObject.Title}</span>
            //     </div>
            //     <div className="movie-description">
            //         <span className="label">Description: </span>
            //         <span className="value">{movieObject.Description}</span>
            //     </div>
            //     <div className="movie-actors">
            //         <span className="label">Actors: </span>
            //         <span className="value">{movieObject.Actors}</span>
            //     </div>
            //     <div className="movie-directorName">
            //         <span className="label">Director Name: </span>
            //         <span className="value">{movieObject.Director.Name}</span>
            //     </div>
            //     <div className="movie-directorBio">
            //         <span className="label">Director Bio: </span>
            //         <span className="value">{movieObject.Director.Bio}</span>
            //     </div>
            //     <div className="movie-genreName">
            //         <span className="label">Genre: </span>
            //         <span className="value">{movieObject.Genre.Name}</span>
            //     </div>
            //     <div className="movie-genreDescription">
            //         <span className="label">Genre Description: </span>
            //         <span className="value">{movieObject.Genre.Description}</span>
            //     </div>
            //     <button onClick={() => {
            //         onBackClick(null);
            //     }}>Back</button>
            // </div>
        );
    }
}


/* <Card className="movie-card">
                <Card.Img variant="top" src={movieData.ImagePath} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movieData)} variant="link">
                        Open
                    </Button>
                </Card.Body>
            </Card> */


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