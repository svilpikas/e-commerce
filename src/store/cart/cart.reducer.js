const INIT_STATE = {
    isCartOpen: false,
    totalQuantity: 0,
    cartTotal: 0,
    cartItems: [],
}

export const CART_ACTION_TYPE = {
    'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN',
    'SET_CART_ITEMS': 'SET_CART_ITEMS'
}
const cartReducer = (state = INIT_STATE, action) => {

    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {...state, ...payload};
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload};
        default:
            return state;
    }

}
