export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export const SET_USER = 'SET_USER';
export const SET_USEROBJECT = 'SET_USEROBJECT';

export function setMovies(value) {
    console.log("SET_MOVIES action triggered");
    return {
        type: SET_MOVIES, value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER, value
    };
}

export function setUser(value) {
    return {
        type: SET_USER, value
    };
}

export function setUserObject(value) {
    return {
        type: SET_USEROBJECT, value
    };
}




