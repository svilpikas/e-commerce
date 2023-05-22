import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Footer, Name, Price, ProductCardButton, ProductCardContainer, ProductCardImg} from "./product-card.styles";
import {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const addItemToCartList = () => {
        addItemToCart(product)
    }
    return (<ProductCardContainer>
        <ProductCardImg src={product.imageUrl} alt={`${product.name}`}/>
        <Footer>
            <Name>{product.name}</Name>
            <Price>{product.price}</Price>
        </Footer>
        <ProductCardButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItemToCartList}>Add to card</ProductCardButton>
    </ProductCardContainer>)
}

export default ProductCard;
