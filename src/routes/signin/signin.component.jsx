import SignInForm from "../../components/signin/signin-form.component";
import {Link} from "react-router-dom";
import {SignInContainer} from "./signin.styles";

const SignIn = () => {

    return (
        <SignInContainer>
            <h1>Sign in</h1>
            <SignInForm />
            <Link to={'/sign-up'}>Dont have account?</Link>
        </SignInContainer>
    )
}

export default SignIn;
