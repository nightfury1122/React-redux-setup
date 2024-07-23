const redux = require('redux')
const createStore = redux.createStore
const bindActiocreator = redux.bindActionCreators
const combineReducers = redux.combineReducers

// a string that defined the type of action 
const CAKE_ORDERD = "CAKE_ORDERD"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

// a simple Action wrapped in an action creator

function orderCake() {
    return {
        type: CAKE_ORDERD,
        quantity: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        quantity: qty,
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        quantity: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        quantity: qty,
    }
}


// initial state cake
const initialStateCakes = {
    numOfCakes: 10,
}

// initial state icecream
const initialStateIcecream = {

    numOfIceCreams: 20,

}


// a reducer is what actually changes the state an action tells it to 
// a reducer required only two arguments 1. action 2. the previous state  

const Cakereducer = (state = initialStateCakes, action) => {

    switch (action.type) {
        case CAKE_ORDERD:
            return {
                // normally the state contains multiple items, we should make a copy using the spread operator and then update the required item
                ...state,
                numOfCakes: state.numOfCakes - 1,

            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.quantity
            }

        default:
            return state
    }

}
const IceCreamreducer = (state = initialStateIcecream, action) => {

    switch (action.type) {

        case ICECREAM_ORDERED:
            return {
                // normally the state contains multiple items, we should make a copy using the spread operator and then update the required item
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,

            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.quantity
            }

        default:
            return state
    }

}

// combining all reducers
const rootReducer = combineReducers({
    cake: Cakereducer,
    iceCream: IceCreamreducer
})

// the createStore method can only accept one reducer so we need to use combine reducers here 
const store = createStore(rootReducer)
console.log('initial State', store.getState())

const unsubscribe = store.subscribe(() =>
    console.log('Updated State', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

//just another way to dispatch actions(not necessary)
actions = bindActiocreator({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIcecream()
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(3)

unsubscribe()