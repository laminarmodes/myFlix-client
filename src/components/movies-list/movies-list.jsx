import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect, useSelector } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { visibilityFilter } = props;
    const movies = useSelector((state) => state.movies);

    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) {
        console.log("No movies")
        return <div className="main-view" />
    }

    return (
        <>
            <Col md={12} style={{ margin: '1em' }}>
                <br /><br /><br /><br />
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
            {
                filteredMovies.map((m) => (
                    <Col md={3} key={m._id}>
                        <MovieCard movieData={m} />
                    </Col>
                ))
            }
        </>
    )
}

export default connect(mapStateToProps)(MoviesList)