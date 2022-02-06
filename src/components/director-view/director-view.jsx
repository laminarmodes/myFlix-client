import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    render() {
        const { directorObject, onBackClick } = this.props;

        return (

            <div>
                <Button variant="info" className="back-button" onClick={() => { onBackClick(null) }}>
                    Back
                </Button>
                <Card className="director-view">
                    <Card.Body>
                        <Card.Title>{directorObject.Name}</Card.Title>
                        <Card.Subtitle>Bio</Card.Subtitle>
                        <Card.Text> {directorObject.Bio}</Card.Text>
                    </Card.Body>


                </Card>
            </div>

        );
    }
}

DirectorView.propTypes = {
    directorObject: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};