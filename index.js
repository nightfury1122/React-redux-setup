// a string that defined the type of action 
const CAKE_ORDERD = "CAKE_ORDERD"

// a simple Action wrapped in an action creator

function orderCake() {
    return {
        type: CAKE_ORDERD,
        quantity: 1,
    }
}
