/** 
 * @module GenreView renders the component that displays information about the genre
 */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
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
                <Button className="back-button" variant="info" onClick={() => { onBackClick(null) }}>
                    Back
                </Button>
                <Card className="genre-view">
                    <Card.Body>
                        <Card.Title>{genreObject.Name}</Card.Title>
                        <Card.Subtitle>Description</Card.Subtitle>
                        <Card.Text> {genreObject.Description}</Card.Text>
                    </Card.Body>
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