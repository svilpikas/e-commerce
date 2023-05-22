import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, totalQuantity} = useContext(CartContext);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon/>
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>)
}

export default CartIcon;
