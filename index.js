const redux = require ('redux')
const createStore = redux.createStore 

// a string that defined the type of action 
const CAKE_ORDERD = "CAKE_ORDERD"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

// a simple Action wrapped in an action creator

function orderCake() {
    return {
        type: CAKE_ORDERD,
        quantity: 1,
    }
}

function restockCake(qty = 1) {
    return{
        type:CAKE_RESTOCKED,
        quantity: qty, 
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
        case CAKE_RESTOCKED :
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.quantity
            }
        
        default:
            return state
    }

}

const store = createStore(reducer)
console.log('initial State', store.getState())

const unsubscribe = store.subscribe (()=>
console.log('Updated State', store.getState())
)

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

unsubscribe()