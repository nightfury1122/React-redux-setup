const redux = require('redux')
const createStore = redux.createStore
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED"
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}
const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: []
            }
        default:
            return state
    }
}

// async action creator 
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            // response.data is the array of users 
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSucceeded(users))
        })
            .catch(error => {
                dispatch(fetchUsersFailed(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log(store.getState())})

store.dispatch(fetchUsers())
