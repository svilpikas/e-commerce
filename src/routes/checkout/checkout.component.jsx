import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, TotalPrice} from "./checkout.styles";

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader className={'checkout-header'}>
                <HeaderBlock>
                    <span>product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems
                .map((product) =>
                    <CheckoutItem
                        key={product.id}
                        cartItem={product}
                    />)}
            <TotalPrice>total: {cartTotal}</TotalPrice>
        </CheckoutContainer>)
}

//TODO Headers move into interation

export default Checkout;
