import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    render() {
        const { genreObject, onBackClick } = this.props;

        return (

            <div>
                <Card className="genre-view">
                    <Card.Body>
                        <Card.Title>{genreObject.Name}</Card.Title>
                        <Card.Subtitle>Description</Card.Subtitle>
                        <Card.Text> {genreObject.Description}</Card.Text>
                    </Card.Body>

                    <Button onClick={() => { onBackClick(null) }}>
                        Back
                    </Button>
                </Card>
            </div>

        );
    }
}

GenreView.propTypes = {
    genreObject: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};