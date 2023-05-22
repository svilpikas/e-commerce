import {Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";
import {NavigationContainer, NavLink, NavLinksContainer, LogoContainer} from "./navigation.styles";

const Navigation = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={'/'}>
                    <CrownLogo className={'logo'}/>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={'/shop'}>Shop</NavLink>
                    {currentUser
                        ? <NavLink as={'span'} onClick={signOutUser}>Sign out</NavLink>
                        : (<NavLink to={'/sign-in'}>Sign in</NavLink>)
                    }
                    <CartIcon/>
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;
