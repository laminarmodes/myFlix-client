import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import interstellarImage from '../temp-images/interstellar.jpg';
import inceptionImage from '../temp-images/inception.jpg';
import arrivalImage from '../temp-images/arrival.jpeg';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }

    componentDidMount() {
        axios.get('https://myflixappcf.herokuapp.com/movies').then(response => {
            this.setState({
                movies: response.data
            });
        }).catch(error => {
            console.log(error);
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        // const movies = this.state.movies;
        const { movies, selectedMovie } = this.state;

        // if (selectedMovie) {
        //     return (
        //         <MovieView movieObject={selectedMovie} />
        //     );
        // }

        if (movies.length === 0) {
            return <div className="main-view" />;
        } else {
            return (
                <div className="main-view">
                    {selectedMovie ?
                        // Display Single Movie View
                        <MovieView
                            movieObject={selectedMovie}
                            onBackClick={newSelectedMovie => {
                                this.setSelectedMovie(newSelectedMovie);
                            }} />
                        :
                        // Display full list of movies
                        movies.map(movie => (
                            <MovieCard
                                key={movie._id}
                                movieData={movie}
                                onMovieClick={movie => {
                                    this.setSelectedMovie(movie)
                                }} />))
                    }
                </div>
            );
        }

        // if (movies.length === 0) return <div className="main-view">The list is empty</div>;

        // return (
        //     <div className="main-view">
        //         {movies.map(movie => <MovieCard key={movie._id} movieData={movie} />)}
        //     </div>
        // );
    }



}

export default MainView;