import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartContext} from "../../contexts/cart.context";
import {CartDropDownContainer, CartItems} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckOut = () => {
        setIsCartOpen(false);
        navigate('/check-out');
    }
    return (
        <CartDropDownContainer>
            <CartItems>
                {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)}
            </CartItems>
            <Button onClick={goToCheckOut}>Checkout</Button>
        </CartDropDownContainer>
    )
}
export default CartDropdown;
