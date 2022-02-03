import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USEROBJECT } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log("SET_MOVIES reducer reached");
            return action.value;
        default:
            return state;
    }
}

function userObject(state = [], action) {
    switch (action.type) {
        case SET_USEROBJECT:
            console.log("SET_USEROBJECT reducer reached");
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    userObject
});

export default moviesApp;