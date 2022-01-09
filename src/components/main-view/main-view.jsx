import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import interstellarImage from '../temp-images/interstellar.jpg';
import inceptionImage from '../temp-images/inception.jpg';
import arrivalImage from '../temp-images/arrival.jpeg';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: "Interstellar",
                    Description: "Earths future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankinds survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
                    ImagePath: interstellarImage,
                    Director: {
                        Name: "Christopher Nolan",
                        Bio: "In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film."
                    },
                    Genre: {
                        Name: "Science Fiction",
                        Description: "Science fiction (once known as scientific romance) is similar to fantasy, except stories in this genre use scientific understanding to explain the universe that it takes place in. It generally includes or is centered on the presumed effects or ramifications of computers or machines; travel through space, time or alternate universes; alien lifeforms, genetic engineering, or other such things. The science or technology used may or may not be very thoroughly elaborated on."
                    }
                },
                {
                    _id: 2,
                    Title: "Inception",
                    Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO but his tragic past may doom the project and his team to disaster.",
                    ImagePath: inceptionImage,
                    Director: {
                        Name: "Christopher Nolan",
                        Bio: "In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film."
                    },
                    Genre: {
                        Name: "Science Fiction",
                        Description: "Science fiction (once known as scientific romance) is similar to fantasy, except stories in this genre use scientific understanding to explain the universe that it takes place in. It generally includes or is centered on the presumed effects or ramifications of computers or machines; travel through space, time or alternate universes; alien lifeforms, genetic engineering, or other such things. The science or technology used may or may not be very thoroughly elaborated on."
                    }
                },
                {
                    _id: 3,
                    Title: "Arrival",
                    Description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
                    ImagePath: arrivalImage,
                    Director: {
                        Name: "Denis Villeneuve",
                        Bio: "Denis Villeneuve is a French Canadian film director and writer. He was born in 1967, in Trois-Rivières, Québec, Canada. He started his career as a filmmaker at the National Film Board of Canada. He is best known for his feature films Arrival (2016), Sicario (2015), Prisoners (2013), Enemy (2013), and Incendies (2010). He is married to Tanya Lapointe."
                    },
                    Genre: {
                        Name: "Science Fiction",
                        Description: "Science fiction (once known as scientific romance) is similar to fantasy, except stories in this genre use scientific understanding to explain the universe that it takes place in. It generally includes or is centered on the presumed effects or ramifications of computers or machines; travel through space, time or alternate universes; alien lifeforms, genetic engineering, or other such things. The science or technology used may or may not be very thoroughly elaborated on."
                    }
                }
            ],
            selectedMovie: null
        }
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
            return <div className="main-view">The list is empty</div>;
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


    // return (
    //     <>
    //         <div className="main-view">
    //             <div>Inception</div>
    //             <div>The Shawshank Redemption</div>
    //             <div>Gladiator</div>
    //         </div>
    //         <button>Test</button>
    //     </>
    // );
}

export default MainView;