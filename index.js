// a string that defined the type of action 
const CAKE_ORDERD = "CAKE_ORDERD"

// a simple Action wrapped in an action creator

function orderCake() {
    return {
        type: CAKE_ORDERD,
        quantity: 1,
    }
}

// initial state  
const initialState = {

    numOfCakes: 10,
    anotherProperty: 0,
}

// a reducer is what actually changes the state an action tells it to 
// a reducer required only two arguments 1. action 2. the previous state  

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case CAKE_ORDERD:
            return {
                // normally the state contains multiple items, we should make a copy using the spread operator and then update the required item
                ...state,
                numOfCakes: state.numOfCakes - 1,

            }
        default:
            return state
    }

}