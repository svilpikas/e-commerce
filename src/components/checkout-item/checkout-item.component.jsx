import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const {name, price, quantity, imageUrl} = cartItem;
    const {removeItemFromCart, addItemToCart} = useContext(CartContext);
    return (
        <div className={'checkout-item-container'}>
            <div className={'image-container'}>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className={'name'}>{name}</span>
            <span className={'quantity'}>
                <span className={'arrow'} onClick={() => removeItemFromCart(cartItem, false)}>&#10094;</span>
                <span className={'value'}>{quantity}</span>
                <span className={'arrow'} onClick={() => addItemToCart(cartItem)}>&#10095;</span>
            </span>
            <span className={'price'}>{price}</span>
            <div className={'remove-button'} onClick={() => removeItemFromCart(cartItem, true)}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem
