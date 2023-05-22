import {createContext, useReducer} from "react";

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

const addCartItem = (cartItems, product) => {
    const cartItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (cartItemIndex !== -1) {
        cartItems[cartItemIndex].quantity += 1;
        return [...cartItems];
    }
    return [...cartItems, {...product, quantity: 1}];
}

const decreaseCartItemQuantity = (cartItems, product, remove = false) => {
    const cartItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (cartItems[cartItemIndex].quantity === 1 || remove) {
        cartItems.splice(cartItemIndex, 1);
        return [...cartItems];
    }
    cartItems[cartItemIndex].quantity -= 1;
    return [...cartItems]
}

const cartReducer = (state, action) => {

    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {...state, ...payload};
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload};
        default:
            throw new Error(`Unhandled type ${type} in cart reducer`);
    }

}

export const CartContext = createContext({

    setIsCartOpen: (value) => {
    },
    addItemToCart: (value) => {
    },
    removeItemFromCart: (value, remove) => {
    }
})

export const CartProvider = ({children}) => {
    const [{cartItems, cartTotal, totalQuantity, isCartOpen}, dispatch] = useReducer(cartReducer, INIT_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalQuantity = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({
            type: CART_ACTION_TYPE.SET_CART_ITEMS,
            payload: {
                cartTotal: newCartTotal,
                cartItems: newCartItems,
                totalQuantity: newTotalQuantity
            }
        });
    }

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (product, remove) => {
        const newCartItems = decreaseCartItemQuantity(cartItems, product, remove);
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (value) => {
        dispatch({type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: value})
    }
    const value = {
        isCartOpen,
        cartItems,
        cartTotal,
        totalQuantity,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

