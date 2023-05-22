import {useEffect} from "react";
import {Routes, Route} from 'react-router-dom'
import {useDispatch} from "react-redux";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/signin/signin.component";
import SingUp from "./routes/signup/signup.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {createUserFromAuth, onUserAuthChangeListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onUserAuthChangeListener((user) => {
            if (user) {
                createUserFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    }, [dispatch]);

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='shop/*' element={<Shop/>}/>
                <Route path='sign-in' element={<SignIn/>}/>
                <Route path='sign-up' element={<SingUp/>}/>
                <Route path='check-out' element={<Checkout/>}/>
            </Route>
        </Routes>
    );
}

export default App;

//TODO migrate to tsx
//TODO finish migration from context to redux
//TODO finish scss to styled components
//TODO routes to routes enum
//TODO move strings to constants or enums
//TODO add tests
